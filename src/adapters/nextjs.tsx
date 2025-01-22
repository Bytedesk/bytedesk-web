/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-22 13:19:24
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 13:29:14
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
import type { BytedeskConfig } from '../types';

// 使用 dynamic import 并禁用 SSR
const BytedeskNextjs = dynamic(() => Promise.resolve(({ config }: { config: BytedeskConfig }) => {
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    // 动态导入 BytedeskWeb，避免服务端渲染时的 window 未定义问题
    import('../main').then(({ default: BytedeskWeb }) => {
      if (!instanceRef.current) {
        instanceRef.current = new BytedeskWeb(config);
        instanceRef.current.init();
        (window as any).bytedesk = instanceRef.current;
      }
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        delete (window as any).bytedesk;
        instanceRef.current = null;
      }
    };
  }, [config]);

  return null;
}), {
  ssr: false // 禁用服务端渲染
});

export { BytedeskNextjs }; 