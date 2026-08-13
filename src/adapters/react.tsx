/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:57
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 14:46:25
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { useEffect, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';
import { messages } from '../locales';

interface BytedeskReactProps extends BytedeskConfig {
  onInit?: () => void;
}

const getContainerIdentity = (container: BytedeskConfig['container']) => {
  if (typeof container === 'string') {
    return container;
  }

  if (container instanceof HTMLElement) {
    return container;
  }

  return null;
};

const normalizeConfigValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(normalizeConfigValue);
  }

  if (typeof value === 'function') {
    return value.toString();
  }

  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = normalizeConfigValue((value as Record<string, unknown>)[key]);
        return result;
      }, {});
  }

  return value;
};

const createConfigSignature = (config: BytedeskConfig) => JSON.stringify(normalizeConfigValue(config));

export const BytedeskReact = ({ locale = 'zh-cn', ...props }: BytedeskReactProps) => {
  return (
    <IntlProvider 
      messages={messages[locale as keyof typeof messages] as any} 
      locale={locale}
      defaultLocale="zh-cn"
    >
      <BytedeskComponent {...props} locale={locale} />
    </IntlProvider>
  );
};

// 全局单例实例
let globalBytedeskInstance: BytedeskWeb | null = null;
let activeComponentCount = 0;
let globalInstanceMode: BytedeskConfig['mode'] = 'floating';
let globalInstanceContainer: string | HTMLElement | null = null;
// 适配器期望的显示模式（由 iframe 内 ChatHeader“切换显示模式”按钮触发）。
// 一旦被置位，将覆盖宿主传入的 mode，确保适配器与 SDK 实例的 mode 始终一致，
// 避免宿主重渲染时通过 setConfig 把实例的 mode 覆盖回 floating（导致切换失效）。
let globalDesiredMode: BytedeskConfig['mode'] | undefined = undefined;

const BytedeskComponent = (props: BytedeskReactProps) => {
  const bytedeskRef = useRef<BytedeskWeb | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const didCallInitRef = useRef(false);
  const { onInit, ...config } = props;
  const configSignature = createConfigSignature(config);

  useEffect(() => {
    // 适配器期望的显示模式：切换按钮触发后会覆盖宿主传入的 mode
    const resolvedMode = globalDesiredMode ?? config.mode;
    const shouldUseHostContainer = resolvedMode === 'inline' && config.inlineConfig?.mode !== 'fixed-right';
    // 构建实际生效的配置：固定 mode 为 resolvedMode，并补一个默认的 onToggleViewMode（除非宿主已提供）
    const effectiveConfig: BytedeskConfig = {
      ...config,
      mode: resolvedMode,
      ...(shouldUseHostContainer
        ? { container: config.container || containerRef.current || undefined }
        : {}),
      ...(typeof config.onToggleViewMode === 'function'
        ? {}
        : {
            onToggleViewMode: (nextMode: 'floating' | 'inline') => {
              // 默认切换处理：由 SDK 内部重建 UI，并同步适配器的全局状态，
              // 使后续重渲染不会撤销切换（避免把实例 mode 覆盖回 floating）。
              globalDesiredMode = nextMode;
              globalInstanceMode = nextMode;
              const instance = globalBytedeskInstance;
              if (instance && typeof instance.applyViewMode === 'function') {
                // 重建为新模式（销毁旧 UI + 按新模式重建并展示对话）
                instance.applyViewMode(nextMode);
              }
            },
          }),
    };
    const nextMode = effectiveConfig.mode || 'floating';
    const nextContainerIdentity = getContainerIdentity(effectiveConfig.container);

    activeComponentCount++;

    if (
      globalBytedeskInstance &&
      (
        globalInstanceMode !== nextMode ||
        (nextMode === 'inline' && globalInstanceContainer !== nextContainerIdentity)
      )
    ) {
      globalBytedeskInstance.destroy();
      globalBytedeskInstance = null;
      delete (window as any).bytedesk;
    }

    if (!globalBytedeskInstance) {
      globalBytedeskInstance = new BytedeskWeb(effectiveConfig);
      globalInstanceMode = nextMode;
      globalInstanceContainer = nextContainerIdentity;
      bytedeskRef.current = globalBytedeskInstance;
      (window as any).bytedesk = globalBytedeskInstance;

      globalBytedeskInstance.init().then(() => {
        didCallInitRef.current = true;
        onInit?.();
      }).catch((error) => {
        console.error('BytedeskWeb 初始化失败:', error);
        didCallInitRef.current = true;
        onInit?.();
      });
    } else {
      globalInstanceMode = nextMode;
      globalInstanceContainer = nextContainerIdentity;
      bytedeskRef.current = globalBytedeskInstance;
      (window as any).bytedesk = globalBytedeskInstance;
      globalBytedeskInstance.setConfig(effectiveConfig, { replaceChatConfig: true, replaceTabsConfig: true });

      if (!didCallInitRef.current) {
        didCallInitRef.current = true;
        onInit?.();
      }
    }

    return () => {
      activeComponentCount--;
      // console.log('BytedeskReact: 组件卸载，当前活跃组件数:', activeComponentCount);
      bytedeskRef.current = null;
      
      // 如果没有活跃组件了，清理全局实例
      if (activeComponentCount <= 0) {
        // console.log('BytedeskReact: 没有活跃组件，清理全局实例');
        setTimeout(() => {
          if (globalBytedeskInstance && activeComponentCount <= 0) {
            globalBytedeskInstance.destroy();
            globalBytedeskInstance = null;
            globalInstanceMode = 'floating';
            globalInstanceContainer = null;            globalDesiredMode = undefined;            delete (window as any).bytedesk;
            activeComponentCount = 0;
          }
        }, 100);
      }
    };
  }, [configSignature]);

  if ((globalDesiredMode ?? config.mode) === 'inline' && config.inlineConfig?.mode !== 'fixed-right') {
    return (
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
    );
  }

  return null;
}; 