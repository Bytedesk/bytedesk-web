/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:38:01
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-28 20:13:29
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { defineComponent, onMounted, onUnmounted, h } from 'vue';
import { createI18n } from 'vue-i18n';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';
import { messages } from '../locales';

const i18n = createI18n({
  locale: 'zh-cn',
  messages
});

// 全局单例实例
let globalBytedeskInstance: BytedeskWeb | null = null;
let activeComponentCount = 0;

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

    onMounted(() => {
      activeComponentCount++;
      i18n.global.locale = props.locale as 'zh-cn' | 'en';
      
      const config = {
        ...(attrs as unknown as BytedeskConfig),
        locale: props.locale
      };

      // 检查是否已经存在全局实例
      if (globalBytedeskInstance) {
        console.log('BytedeskVue: 使用现有全局实例，当前活跃组件数:', activeComponentCount);
        instance = globalBytedeskInstance;
        emit('init', instance);
        return;
      }

      // 创建新的全局实例
      console.log('BytedeskVue: 创建新的全局实例');
      globalBytedeskInstance = new BytedeskWeb(config);
      instance = globalBytedeskInstance;
      
      globalBytedeskInstance.init();
      emit('init', instance);
    });

    onUnmounted(() => {
      activeComponentCount--;
      console.log('BytedeskVue: 组件卸载，当前活跃组件数:', activeComponentCount);
      instance = null;
      
      // 如果没有活跃组件了，清理全局实例
      if (activeComponentCount <= 0) {
        console.log('BytedeskVue: 没有活跃组件，清理全局实例');
        setTimeout(() => {
          if (globalBytedeskInstance && activeComponentCount <= 0) {
            globalBytedeskInstance.destroy();
            globalBytedeskInstance = null;
            activeComponentCount = 0;
          }
        }, 100);
      }
    });

    return () => h('div', { style: { display: 'none' } });
  }
});

// BytedeskVue.i18n = i18n;