/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 15:08:00
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
import { onMount, onDestroy } from 'svelte';
import { init, addMessages, getLocaleFromNavigator } from 'svelte-i18n';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';
import { messages } from '../locales';
import logger from '../utils/logger';

// 初始化 i18n
Object.entries(messages).forEach(([locale, msgs]) => {
  addMessages(locale, msgs);
});

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
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

export const BytedeskSvelte = (node: HTMLElement, config: BytedeskConfig & { locale?: string }) => {
  logger.debug('config', config, node);

  const setupInstance = (cfg: BytedeskConfig & { locale?: string }) => {
    const shouldUseHostContainer = cfg.mode === 'inline' && cfg.inlineConfig?.mode !== 'fixed-right';
    const effectiveConfig = shouldUseHostContainer
      ? { ...cfg, container: cfg.container || node }
      : { ...cfg };

    const fullConfig = {
      ...effectiveConfig,
      locale: cfg.locale || getLocaleFromNavigator() || 'zh-cn',
    };

    const nextMode = fullConfig.mode || 'floating';
    const nextContainerIdentity = getContainerIdentity(fullConfig.container);

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

    globalInstanceMode = nextMode;
    globalInstanceContainer = nextContainerIdentity;

    if (!globalBytedeskInstance) {
      globalBytedeskInstance = new BytedeskWeb(fullConfig);
      (window as any).bytedesk = globalBytedeskInstance;
      globalBytedeskInstance.init();
    } else {
      (window as any).bytedesk = globalBytedeskInstance;
      globalBytedeskInstance.setConfig(fullConfig, { replaceChatConfig: true, replaceTabsConfig: true });
    }
  };

  onMount(() => {
    activeComponentCount++;
    setupInstance(config);
  });

  onDestroy(() => {
    activeComponentCount--;

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

  return {
    update(nextConfig: BytedeskConfig & { locale?: string }) {
      setupInstance(nextConfig);
    },
    destroy() {
      // Cleanup handled by onDestroy
    }
  };
}; 