/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:20:19
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-22 10:31:18
 */
import { useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';

const LocalDemo = () => {
  const [config] = useState<BytedeskConfig>({
    isDebug: false, // 是否开启调试模式, 默认: false, 生产环境请设置为false
    ...(process.env.NODE_ENV === 'development' 
      ? { 
        htmlUrl: 'http://127.0.0.1:9006', 
        apiUrl: 'http://127.0.0.1:9003' 
      } 
      : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true, // 是否可拖拽，默认不可拖拽
    // showSupport: true, // 是否显示微语技术支持，默认显示，付费功能，免费用户请勿使用
    inviteConfig: {
      show: false,
      delay: 1000, // 首次弹出延迟时间, 单位: 毫秒
      loop: true, // 是否启用循环
      loopDelay: 10000, // 循环间隔, 单位: 毫秒
      loopCount: 3, // 循环次数, 设置为0表示无限循环
      // acceptText: '接受',
      // rejectText: '拒绝',
      // onAccept: () => {
      //   console.log('accept');
      // },
      // onReject: () => {
      //   console.log('reject');
      // },
      // onClose: () => {
      //   console.log('close');
      // },
      // onOpen: () => {
      //   console.log('open');
      // }
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      // icon: '👋',
      // text: '需要帮助吗？',
    },
    // window: {
    //   width: 800,
    //   height: 600
    // },
    chatConfig: {
      org: 'df_org_uid', // 替换为您的组织ID
      t: "2", // 0: 一对一对话；1：工作组对话；2：机器人对话
      sid: 'df_rt_uid', // 替换为您的SID
    },
    theme: {
      mode: 'light', // dark || light || system
    },
    // en || zh-cn || zh-tw || ja || ko
    locale: 'zh-cn',
    // 添加 onVisitorInfo 回调
    onVisitorInfo: (uid: string, visitorUid: string) => {
      console.log('LocalDemo 收到访客信息:', { uid, visitorUid });
    },
  });

  const handleInit = () => {
    console.log('BytedeskReact initialized LocalDemo');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>微语基本设置</h1>
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
          <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/LocalDemo.tsx" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            React 基础集成代码示例
          </a>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/LocalDemo.vue" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: '#2e88ff', textDecoration: 'none' }}>
            Vue 基础集成代码示例
          </a>
        </p>
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
          打开聊天
        </button>
        <button 
          onClick={() => (window as any).bytedesk?.showChat({
            chatConfig: {
              org: 'df_org_uid',
              t: "1",
              sid: 'df_wg_uid'
            }
          })}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e88ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          带参数打开聊天
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
          关闭聊天
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
          显示按钮
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
          隐藏按钮
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
          显示气泡
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
          隐藏气泡
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
          显示邀请
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
          隐藏邀请
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