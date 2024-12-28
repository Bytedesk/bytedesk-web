/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:57
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-28 21:39:10
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
import BytedeskWeb, { BytedeskConfig } from '../main';

interface BytedeskReactProps extends BytedeskConfig {
  onInit?: () => void;
  placement: string;
}

export const BytedeskReact: React.FC<BytedeskReactProps> = ({ placement, ...props }) => {
  const bytedeskRef = useRef<any>(null);

  useEffect(() => {
    if (bytedeskRef.current) {
      bytedeskRef.current.destroy();
      const position = placement === 'bottom-left' ? 'left' : 'right';
      const config: BytedeskConfig = {
        theme: {
          primaryColor: props.theme?.primaryColor || '#2e88ff',
          secondaryColor: props.theme?.secondaryColor || '#ffffff',
          textColor: props.theme?.textColor || '#333333',
          backgroundColor: props.theme?.backgroundColor || '#ffffff',
          position,
          ...props.theme
        },
        window: {
          title: props.window?.title || '在线客服',
          width: props.window?.width || 380,
          height: props.window?.height || 640,
          position,
          ...props.window
        },
        ...props
      };
      bytedeskRef.current = new BytedeskWeb(config);
      bytedeskRef.current.init();
    }
  }, [placement]);

  useEffect(() => {
    // 创建实例并保存引用
    console.log('Creating BytedeskWeb instance...'); // 添加调试日志
    bytedeskRef.current = new BytedeskWeb(props);
    
    // 确保实例被正确创建
    if (bytedeskRef.current) {
      console.log('BytedeskWeb instance created, initializing...'); // 添加调试日志
      bytedeskRef.current.init();
      
      // 暴露实例到全局
      (window as any).bytedesk = bytedeskRef.current;
      console.log('BytedeskWeb instance exposed to window.bytedesk'); // 添加调试日志
      
      props.onInit?.();
    }

    // 清理函数
    return () => {
      console.log('Cleaning up BytedeskWeb instance...'); // 添加调试日志
      if (bytedeskRef.current) {
        bytedeskRef.current.destroy();
        bytedeskRef.current = null;
        delete (window as any).bytedesk;
      }
    };
  }, []); // 确保只在组件挂载时运行一次

  return null;
}; 