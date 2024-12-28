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
import { defineComponent, h, onMounted, onUnmounted, PropType } from 'vue';
import BytedeskWeb from '../main';
import { BytedeskConfig } from '../main';

export const BytedeskVue = defineComponent({
  name: 'BytedeskVue',
  props: {
    theme: {
      type: Object as PropType<BytedeskConfig['theme']>,
      default: () => ({
        primaryColor: '#2e88ff',
        secondaryColor: '#ffffff',
        textColor: '#333333',
        backgroundColor: '#ffffff'
      })
    },
    window: {
      type: Object as PropType<BytedeskConfig['window']>,
      default: () => ({})
    },
    text: {
      type: Object,
      default: () => ({})
    },
    tabs: {
      type: Object as PropType<BytedeskConfig['tabs']>,
      default: () => ({
        home: false,
        messages: true,
        help: false,
        news: false
      })
    },
    showSupport: {
      type: Boolean,
      default: true
    },
    chatParams: {
      type: Object,
      default: () => ({})
    },
    onInit: {
      type: Function,
      default: () => {}
    }
  },

  setup(props) {
    let instance: BytedeskWeb | null = null;

    onMounted(() => {
      const config: BytedeskConfig = {
        theme: props.theme,
        window: props.window,
        text: props.text,
        tabs: props.tabs,
        showSupport: props.showSupport,
        chatParams: props.chatParams
      };

      instance = new BytedeskWeb(config);
      instance.init();

      if (props.onInit) {
        props.onInit(instance);
      }
    });

    onUnmounted(() => {
      if (instance) {
        instance.destroy();
        instance = null;
      }
    });

    return () => h('div');
  }
});

export type { BytedeskConfig }; 