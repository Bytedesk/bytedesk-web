/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:22:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-04 09:13:00
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
// @ts-ignore
import type { BytedeskConfig } from 'bytedesk-web/react';
import InstallGuide from '../components/InstallGuide';

const OnlineDemo = () => {
  const [config] = useState<BytedeskConfig>({
    isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    inviteConfig: {
      show: true,
      delay: 1000, // 首次弹出延迟时间, 单位: 毫秒
      loop: true, // 是否启用循环
      loopDelay: 10000, // 循环间隔, 单位: 毫秒
      loopCount: 3, // 循环次数, 设置为0表示无限循环
    },
    tabsConfig: {
      home: false,
      messages: true,
      help: false,
      news: false
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    showSupport: true,
    chatConfig: {
      org: 'df_org_uid',
      t: "2",
      sid: 'df_rt_uid'
    }
  });

  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bytedesk Online Demo</h1>
      <p>This demo uses the published npm package</p>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
        <button
          onClick={() => (window as any).bytedesk?.showButton()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Button
        </button>
        <button
          onClick={() => (window as any).bytedesk?.hideButton()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Hide Button
        </button>
        <button
          onClick={() => (window as any).bytedesk?.showBubble()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Bubble
        </button>
        <button
          onClick={() => (window as any).bytedesk?.hideBubble()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Hide Bubble
        </button>
        <button
          onClick={() => (window as any).bytedesk?.showInviteDialog()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Invite
        </button>
        <button
          onClick={() => (window as any).bytedesk?.hideInviteDialog()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Hide Invite
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