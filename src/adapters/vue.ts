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
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import type { BytedeskConfig } from '../types';
import BytedeskWeb from '../main';

export const BytedeskVue = defineComponent({
  name: 'BytedeskVue',
  props: {
    placement: {
      type: String,
      required: true,
      validator: (value: string) => ['bottom-left', 'bottom-right'].includes(value)
    },
    onInit: {
      type: Function,
      default: null
    }
  },
  setup(props, { attrs }) {
    const bytedeskRef = ref<BytedeskWeb | null>(null);

    onMounted(() => {
      const config = {
        ...attrs,
        placement: props.placement
      } as BytedeskConfig;

      bytedeskRef.value = new BytedeskWeb(config);
      bytedeskRef.value.init();
      
      if (props.onInit) {
        props.onInit();
      }
    });

    onUnmounted(() => {
      if (bytedeskRef.value) {
        bytedeskRef.value.destroy();
        bytedeskRef.value = null;
      }
    });

    return () => null;
  }
}); 