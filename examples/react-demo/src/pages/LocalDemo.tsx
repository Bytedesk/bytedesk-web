/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:20:19
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 11:55:00
 */
import React, { useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';

const LocalDemo = () => {
  const [config] = useState<BytedeskConfig>({
    baseUrl: 'http://127.0.0.1:9006',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
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
    chatParams: {
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
      <h1>Bytedesk Local Demo</h1>
      <p>This demo uses local development files</p>

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

export default LocalDemo; 