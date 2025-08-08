/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-22 14:22:31
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 14:51:08
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IntlProvider } from 'react-intl';
import type { BytedeskConfig } from '../types';
import { messages } from '../locales';

interface BytedeskNextjsProps extends BytedeskConfig {
  onInit?: () => void;
}

// 全局单例实例
let globalBytedeskInstance: any = null;
let activeComponentCount = 0;

// 使用动态导入包装组件
const BytedeskNextjs = dynamic(() => Promise.resolve(({ locale = 'zh-cn', ...props }: BytedeskNextjsProps) => {
  return (
    <IntlProvider 
      messages={messages[locale as keyof typeof messages] as any} 
      locale={locale}
      defaultLocale="zh-cn"
    >
      <BytedeskComponent {...props} locale={locale} />
    </IntlProvider>
  );
}), {
  ssr: false // 禁用服务端渲染
});

const BytedeskComponent = (props: BytedeskNextjsProps) => {
  const bytedeskRef = useRef<any>(null);

  useEffect(() => {
    activeComponentCount++;
    
    // 动态导入 BytedeskWeb
    import('../main').then(({ default: BytedeskWeb }) => {
      // 检查是否已经存在全局实例
      if (globalBytedeskInstance) {
        // console.log('BytedeskNextjs: 使用现有全局实例，当前活跃组件数:', activeComponentCount);
        bytedeskRef.current = globalBytedeskInstance;
        (window as any).bytedesk = globalBytedeskInstance;
        props.onInit?.();
        return;
      }

      // 创建新的全局实例
      // console.log('BytedeskNextjs: 创建新的全局实例');
      globalBytedeskInstance = new BytedeskWeb(props);
      bytedeskRef.current = globalBytedeskInstance;
      
      globalBytedeskInstance.init();
      props.onInit?.();
      (window as any).bytedesk = globalBytedeskInstance;
    });

    return () => {
      activeComponentCount--;
      console.log('BytedeskNextjs: 组件卸载，当前活跃组件数:', activeComponentCount);
      bytedeskRef.current = null;
      
      // 如果没有活跃组件了，清理全局实例
      if (activeComponentCount <= 0) {
        console.log('BytedeskNextjs: 没有活跃组件，清理全局实例');
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

export { BytedeskNextjs }; 