/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-22 13:19:31
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 15:11:13
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
'use client';

// @ts-ignore
import { BytedeskNextjs } from '@bytedesk/web/adapters/nextjs';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';
import { useState } from 'react';

export default function Home() {
  const [config] = useState<BytedeskConfig>({
    htmlUrl: 'http://127.0.0.1:9006',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    inviteConfig: {
      show: true,
      delay: 1000, // 首次弹出延迟时间, 单位: 毫秒
      loop: true, // 是否启用循环
      loopDelay: 10000, // 循环间隔, 单位: 毫秒
      loopCount: 3, // 循环次数, 设置为0表示无限循环
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: 'Need help?',
      subtitle: 'Click to chat'
    },
    theme: {
      mode: 'system',
      backgroundColor: '#ff4d4f',
      textColor: '#ffffff'
    },
    chatConfig: {
      org: 'df_org_uid',
      t: "2",
      sid: 'df_rt_uid'
    }
  });

  const handleInit = () => {
    console.log('BytedeskNextjs initialized');
  };

  const showChat = () => {
    (window as any).bytedesk?.showChat();
  };

  const hideChat = () => {
    (window as any).bytedesk?.hideChat();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bytedesk Next.js Demo</h1>
      <p className="text-gray-600 mb-6">This demo uses local development files</p>

      <div className="space-x-4">
        <button 
          onClick={showChat}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Open Chat
        </button>

        <button 
          onClick={hideChat}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Close Chat
        </button>
      </div>

      <BytedeskNextjs 
        {...config}
        onInit={handleInit}
      />
      
      <InstallGuide />
    </div>
  );
} 