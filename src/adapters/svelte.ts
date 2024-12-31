/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 15:08:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 17:06:57
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

// 初始化 i18n
Object.entries(messages).forEach(([locale, msgs]) => {
  addMessages(locale, msgs);
});

init({
  fallbackLocale: 'en-US',
  initialLocale: getLocaleFromNavigator()
});

export const BytedeskSvelte = (node: HTMLElement, config: BytedeskConfig & { locale?: string }) => {
  let instance: BytedeskWeb | null = null;
  console.log('config', config, node);

  onMount(() => {
    instance = new BytedeskWeb({
      ...config,
      locale: config.locale || getLocaleFromNavigator() || 'zh-CN'
    });
    instance.init();
  });

  onDestroy(() => {
    instance?.destroy();
  });

  return {
    destroy() {
      instance?.destroy();
    }
  };
}; 