/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 11:53:47
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-01 16:00:51
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import React from 'react';

const InstallGuide = () => {
  return (
    <div style={{ marginTop: '40px', maxWidth: '800px' }}>
      <h2>安装步骤</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>1. 安装依赖</h3>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
          {`npm install bytedesk-web\n# 或\nyarn add bytedesk-web`}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. 导入组件</h3>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
          {`import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';`}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>3. 配置参数</h3>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
          {`const config: BytedeskConfig = {
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  chatParams: {
    org: 'df_org_uid',  // 替换为您的组织ID
    t: "2",
    sid: 'df_rt_uid'      // 替换为您的SID
  }
};`}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>4. 使用组件</h3>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
          {`const App = () => {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div>
      <BytedeskReact {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打开聊天
      </button>
    </div>
  );
};`}
        </pre>
      </div>

      <div>
        <h3>5. 可用方法</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><code>(window as any).bytedesk?.showChat()</code> - 显示聊天窗口</li>
          <li><code>(window as any).bytedesk?.hideChat()</code> - 隐藏聊天窗口</li>
        </ul>
      </div>
    </div>
  );
};

export default InstallGuide; 