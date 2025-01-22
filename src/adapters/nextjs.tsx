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
    // 动态导入 BytedeskWeb
    import('../main').then(({ default: BytedeskWeb }) => {
      if (!bytedeskRef.current) {
        bytedeskRef.current = new BytedeskWeb(props);
        bytedeskRef.current.init();
        props.onInit?.();
        (window as any).bytedesk = bytedeskRef.current;
      }
    });

    return () => {
      if (bytedeskRef.current) {
        bytedeskRef.current.destroy();
        delete (window as any).bytedesk;
        bytedeskRef.current = null;
      }
    };
  }, [props]);

  return null;
};

export { BytedeskNextjs }; 