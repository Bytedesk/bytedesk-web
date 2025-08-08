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

  useEffect(() => {
    activeComponentCount++;
    
    // 检查是否已经存在全局实例
    if (globalBytedeskInstance) {
      // console.log('BytedeskReact: 使用现有全局实例，当前活跃组件数:', activeComponentCount);
      bytedeskRef.current = globalBytedeskInstance;
      (window as any).bytedesk = globalBytedeskInstance;
      props.onInit?.();
      return;
    }

    // 创建新的全局实例
    // console.log('BytedeskReact: 创建新的全局实例');
    globalBytedeskInstance = new BytedeskWeb(props);
    bytedeskRef.current = globalBytedeskInstance;
    
    globalBytedeskInstance.init();
    props.onInit?.();
    (window as any).bytedesk = globalBytedeskInstance;

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
  }, [props]);



  return null;
}; 