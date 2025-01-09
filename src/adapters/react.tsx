/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:57
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 10:59:03
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

const BytedeskComponent = (props: BytedeskReactProps) => {
  const bytedeskRef = useRef<BytedeskWeb | null>(null);

  useEffect(() => {
    bytedeskRef.current = new BytedeskWeb(props);
    bytedeskRef.current.init();
    
    props.onInit?.();

    (window as any).bytedesk = bytedeskRef.current;

    return () => {
      bytedeskRef.current?.destroy();
      delete (window as any).bytedesk;
    };
  }, [props]);

  return null;
}; 