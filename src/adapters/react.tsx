/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:57
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 11:41:29
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
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';

interface BytedeskReactProps extends BytedeskConfig {
  onInit?: () => void;
  placement: 'bottom-right' | 'bottom-left';
}

export const BytedeskReact: React.FC<BytedeskReactProps> = ({ placement, ...props }) => {
  const bytedeskRef = useRef<any>(null);

  useEffect(() => {
    if (bytedeskRef.current) {
      bytedeskRef.current.destroy();
      const position = placement === 'bottom-left' ? 'left' : 'right';
      const config: BytedeskConfig = {
        ...props,
        placement,
        theme: {
          ...props.theme,
          position
        },
        window: {
          ...props.window,
          position
        }
      };
      bytedeskRef.current = new BytedeskWeb(config);
      bytedeskRef.current.init();
    }
  }, [placement]);

  useEffect(() => {
    console.log('Creating BytedeskWeb instance...');
    bytedeskRef.current = new BytedeskWeb({
      ...props,
      placement
    });
    
    if (bytedeskRef.current) {
      console.log('BytedeskWeb instance created, initializing...');
      bytedeskRef.current.init();
      
      (window as any).bytedesk = bytedeskRef.current;
      console.log('BytedeskWeb instance exposed to window.bytedesk');
      
      props.onInit?.();
    }

    return () => {
      console.log('Cleaning up BytedeskWeb instance...');
      if (bytedeskRef.current) {
        bytedeskRef.current.destroy();
        bytedeskRef.current = null;
        delete (window as any).bytedesk;
      }
    };
  }, []);

  return null;
}; 