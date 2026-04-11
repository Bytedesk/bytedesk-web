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

const BytedeskComponent = (props: BytedeskReactProps) => {
  const bytedeskRef = useRef<BytedeskWeb | null>(null);
  const didCallInitRef = useRef(false);
  const { onInit, ...config } = props;
  const configSignature = createConfigSignature(config);

  useEffect(() => {
    activeComponentCount++;

    if (!globalBytedeskInstance) {
      globalBytedeskInstance = new BytedeskWeb(config);
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
      bytedeskRef.current = globalBytedeskInstance;
      (window as any).bytedesk = globalBytedeskInstance;
      globalBytedeskInstance.setConfig(config);

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
            delete (window as any).bytedesk;
            activeComponentCount = 0;
          }
        }, 100);
      }
    };
  }, [configSignature]);



  return null;
}; 