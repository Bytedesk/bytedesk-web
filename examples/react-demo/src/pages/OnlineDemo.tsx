/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:22:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 11:39:57
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import React, { useState } from 'react';
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';
import InstallGuide from '../components/InstallGuide';

const OnlineDemo = () => {
  const [config] = useState<BytedeskConfig>({
    // baseUrl: 'https://ai.bytedesk.com',
    // placement: 'bottom-right',
    // marginBottom: 20,
    // marginSide: 20,
    // tabsConfig: {
    //   home: false,
    //   messages: true,
    //   help: false,
    //   news: false
    // },
    // bubbleConfig: {
    //   show: true,
    //   icon: '👋',
    //   title: '需要帮助吗？',
    //   subtitle: '点击开始对话'
    // },
    // showSupport: true,
    // chatParams: {
    //   org: 'your_org_id',  // 替换为您的组织ID
    //   t: "2",
    //   sid: 'your_sid'      // 替换为您的SID
    // },
    // theme: {
    //   mode: 'light',
    //   backgroundColor: '#ffffff',
    //   textColor: '#333333'
    // },
    // window: {
    //   width: 380,
    //   height: 640
    // }
  });

  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bytedesk Online Demo</h1>
      <p>This demo uses the published npm package</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => (window as any).bytedesk?.showChat()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Open Chat
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => (window as any).bytedesk?.hideChat()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close Chat
        </button>
      </div>

      <BytedeskReact 
        {...config}
        onInit={handleInit}
      />
      
      <InstallGuide />
    </div>
  );
};

export default OnlineDemo; 