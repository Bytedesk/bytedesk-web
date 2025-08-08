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
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
});

// 全局单例实例
let globalBytedeskInstance: BytedeskWeb | null = null;
let activeComponentCount = 0;

export const BytedeskSvelte = (node: HTMLElement, config: BytedeskConfig & { locale?: string }) => {
  console.log('config', config, node);

  onMount(() => {
    activeComponentCount++;
    
    const fullConfig = {
      ...config,
      locale: config.locale || getLocaleFromNavigator() || 'zh-cn'
    };

    // 检查是否已经存在全局实例
    if (globalBytedeskInstance) {
      // console.log('BytedeskSvelte: 使用现有全局实例，当前活跃组件数:', activeComponentCount);
      return;
    }

    // 创建新的全局实例
    // console.log('BytedeskSvelte: 创建新的全局实例');
    globalBytedeskInstance = new BytedeskWeb(fullConfig);
    
    globalBytedeskInstance.init();
  });

  onDestroy(() => {
    activeComponentCount--;
    // console.log('BytedeskSvelte: 组件卸载，当前活跃组件数:', activeComponentCount);
    
    // 如果没有活跃组件了，清理全局实例
    if (activeComponentCount <= 0) {
      // console.log('BytedeskSvelte: 没有活跃组件，清理全局实例');
              setTimeout(() => {
          if (globalBytedeskInstance && activeComponentCount <= 0) {
            globalBytedeskInstance.destroy();
            globalBytedeskInstance = null;
            activeComponentCount = 0;
          }
        }, 100);
    }
  });

  return {
    destroy() {
      // 这里不需要调用 destroy，因为 onDestroy 已经处理了
    }
  };
}; 