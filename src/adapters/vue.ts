/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:38:01
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2026-08-08 22:00:00
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { defineComponent, onMounted, onUnmounted, h, ref, watch } from 'vue';
import { createI18n } from 'vue-i18n';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';
import { messages } from '../locales';

const i18n = createI18n({
  locale: 'zh-cn',
  messages
});

const getContainerIdentity = (container: BytedeskConfig['container']) => {
  if (typeof container === 'string') {
    return container;
  }
  if (container instanceof HTMLElement) {
    return container;
  }
  return null;
};

// 全局单例实例
let globalBytedeskInstance: BytedeskWeb | null = null;
let activeComponentCount = 0;
let globalInstanceMode: BytedeskConfig['mode'] = 'floating';
let globalInstanceContainer: string | HTMLElement | null = null;

export const BytedeskVue = defineComponent({
  name: 'BytedeskVue',
  props: {
    locale: {
      type: String,
      default: 'zh-cn'
    }
  },
  emits: ['init'],
  setup(props, { attrs, emit }) {
    let instance: BytedeskWeb | null = null;
    const containerRef = ref<HTMLDivElement | null>(null);

    const getRawConfig = (): BytedeskConfig => ({
      ...(attrs as unknown as BytedeskConfig),
      locale: props.locale
    });

    const resolveEffectiveConfig = (rawConfig: BytedeskConfig): BytedeskConfig => {
      const shouldUseHostContainer = rawConfig.mode === 'inline' && rawConfig.inlineConfig?.mode !== 'fixed-right';
      if (shouldUseHostContainer) {
        return {
          ...rawConfig,
          container: rawConfig.container || containerRef.value || undefined,
        };
      }
      return rawConfig;
    };

    const setupOrUpdateInstance = (rawConfig: BytedeskConfig) => {
      const config = resolveEffectiveConfig(rawConfig);
      const nextMode = config.mode || 'floating';
      const nextContainerIdentity = getContainerIdentity(config.container);

      // Mode or container changed → destroy and recreate
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
        globalBytedeskInstance = new BytedeskWeb(config);
        globalInstanceMode = nextMode;
        globalInstanceContainer = nextContainerIdentity;
        instance = globalBytedeskInstance;
        (window as any).bytedesk = globalBytedeskInstance;
        globalBytedeskInstance.init();
        emit('init', instance);
      } else {
        globalInstanceMode = nextMode;
        globalInstanceContainer = nextContainerIdentity;
        instance = globalBytedeskInstance;
        (window as any).bytedesk = globalBytedeskInstance;
        globalBytedeskInstance.setConfig(config, { replaceChatConfig: true, replaceTabsConfig: true });
        emit('init', instance);
      }
    };

    onMounted(() => {
      activeComponentCount++;
      i18n.global.locale = props.locale as 'zh-cn' | 'en';
      setupOrUpdateInstance(getRawConfig());
    });

    // Watch attrs changes to support config hot-update
    watch(
      () => ({ ...(attrs as Record<string, unknown>), locale: props.locale }),
      () => {
        if (globalBytedeskInstance) {
          setupOrUpdateInstance(getRawConfig());
        }
      },
      { deep: true }
    );

    onUnmounted(() => {
      activeComponentCount--;
      instance = null;

      if (activeComponentCount <= 0) {
        setTimeout(() => {
          if (globalBytedeskInstance && activeComponentCount <= 0) {
            globalBytedeskInstance.destroy();
            globalBytedeskInstance = null;
            globalInstanceMode = 'floating';
            globalInstanceContainer = null;
            delete (window as any).bytedesk;
            activeComponentCount = 0;
          }
        }, 100);
      }
    });

    return () => {
      const rawConfig = getRawConfig();
      if (rawConfig.mode === 'inline' && rawConfig.inlineConfig?.mode !== 'fixed-right') {
        return h('div', {
          ref: containerRef,
          style: {
            width: '100%',
            height: '100%',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden',
          }
        });
      }
      return h('div', { style: { display: 'none' } });
    };
  }
});