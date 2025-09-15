/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:22:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-30 17:07:31
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
import type { BytedeskConfig, FeedbackData } from 'bytedesk-web/react';
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
    // 文档反馈功能配置
    feedbackConfig: {
      enabled: true, // 启用文档反馈功能
      trigger: 'selection', // 选中文本时触发
      showOnSelection: true, // 选中文本时显示提示
      selectionText: '文档反馈',
      dialogTitle: '提交意见反馈',
      placeholder: '请描述您的问题或优化建议',
      submitText: '提交反馈',
      cancelText: '取消',
      successMessage: '反馈已提交，感谢您的意见！',
      onSubmit: (feedbackData: FeedbackData) => {
        console.log('收到反馈数据:', feedbackData);
        // 这里可以自定义提交逻辑，比如发送到自己的服务器
      },
      onCancel: () => {
        console.log('用户取消了反馈');
      }
    },
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
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginBottom: '10px' }}>
          <a href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/react" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            查看 React 集成文档
          </a>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <a href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            查看 Vue 集成文档
          </a>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/OnlineDemo.tsx" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            React 在线演示代码示例
          </a>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/OnlineDemo.vue" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            Vue 在线演示代码示例
          </a>
        </p>
      </div>

      {/* 文档反馈功能演示内容 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ color: '#333', marginBottom: '16px' }}>📝 文档反馈功能演示</h3>
        <p style={{ lineHeight: '1.6', color: '#666', marginBottom: '12px' }}>
          <strong>如何使用文档反馈功能：</strong>
        </p>
        <ol style={{ lineHeight: '1.6', color: '#666', paddingLeft: '20px' }}>
          <li>用鼠标选中下面的任意文字</li>
          <li>会自动弹出"文档反馈"提示按钮</li>
          <li>点击按钮即可提交反馈，系统会自动截图并记录选中的文字</li>
        </ol>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: 'white', 
          borderRadius: '6px', 
          border: '1px solid #e9ecef' 
        }}>
          <p style={{ lineHeight: '1.8', color: '#333', marginBottom: '12px' }}>
            这是一段示例文档内容。BytedeskWeb 是一个强大的客服插件，支持实时聊天、智能机器人、文档反馈等多种功能。
            您可以选中这段文字来体验文档反馈功能的便利性。
          </p>
          <p style={{ lineHeight: '1.8', color: '#333', marginBottom: '12px' }}>
            当您选中文字时，系统会自动检测到文本选择，并在鼠标附近显示一个蓝色的"文档反馈"按钮。
            点击按钮后，会打开反馈对话框，显示您选中的文字内容和当前页面的截图。
          </p>
          <p style={{ lineHeight: '1.8', color: '#333' }}>
            这个功能特别适用于文档网站、帮助中心、产品介绍页面等需要收集用户反馈的场景。
            用户可以直接针对特定内容提出问题或建议，极大提升了反馈的精准度和开发者的响应效率。
          </p>
        </div>
      </div>

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
        <button
          onClick={() => (window as any).bytedesk?.showDocumentFeedback('这是手动触发的反馈功能演示')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📝 手动触发文档反馈
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