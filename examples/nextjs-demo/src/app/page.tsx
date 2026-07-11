'use client';

// @ts-ignore
import { BytedeskNextjs } from '@bytedesk/web/adapters/nextjs';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import { useState } from 'react';

type ChatType = 'agent' | 'workgroup' | 'robot';

const CHAT_CONFIGS: Record<ChatType, { t: string; sid: string; label: string }> = {
  agent: { t: '0', sid: 'df_rt_uid', label: '一对一客服' },
  workgroup: { t: '1', sid: 'df_wg_uid', label: '工作组' },
  robot: { t: '2', sid: 'df_rt_uid', label: '机器人' },
};

export default function Home() {
  const [chatType, setChatType] = useState<ChatType>('robot');
  const [themeColor, setThemeColor] = useState('#1677ff');
  const [showBubble, setShowBubble] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const currentChatConfig = CHAT_CONFIGS[chatType];

  const config: BytedeskConfig = {
    isDebug: true,
    htmlUrl: 'http://127.0.0.1:9006',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    inviteConfig: {
      show: false,
      delay: 1000,
      loop: true,
      loopDelay: 10000,
      loopCount: 3,
    },
    bubbleConfig: {
      show: showBubble,
      icon: '👋',
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    buttonConfig: {
      show: showButton,
      width: 60,
      height: 60,
    },
    theme: {
      mode: 'light',
      backgroundColor: themeColor,
      textColor: '#ffffff'
    },
    chatConfig: {
      org: 'df_org_uid',
      t: currentChatConfig.t,
      sid: currentChatConfig.sid,
      loadHistory: true,
    },
    locale: 'zh-cn',
  };

  const showChat = () => (window as any).bytedesk?.showChat();
  const hideChat = () => (window as any).bytedesk?.hideChat();
  const showButtonFn = () => (window as any).bytedesk?.showButton();
  const hideButtonFn = () => (window as any).bytedesk?.hideButton();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>微语 Next.js Demo</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>This demo shows the Bytedesk Next.js integration with full control panel</p>

      {/* Chat Type Selector */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>选择客服类型</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(Object.keys(CHAT_CONFIGS) as ChatType[]).map((type) => (
            <button
              key={type}
              onClick={() => setChatType(type)}
              style={{
                padding: '8px 20px',
                border: chatType === type ? '2px solid #1677ff' : '1px solid #d9d9d9',
                borderRadius: 6,
                background: chatType === type ? '#e6f4ff' : '#fff',
                color: chatType === type ? '#1677ff' : '#333',
                cursor: 'pointer',
                fontWeight: chatType === type ? 600 : 400,
              }}
            >
              {CHAT_CONFIGS[type].label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Color */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>主题色</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {['#1677ff', '#ff4d4f', '#52c41a', '#faad14', '#722ed1'].map((color) => (
            <button
              key={color}
              onClick={() => setThemeColor(color)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: color,
                border: themeColor === color ? '3px solid #333' : '2px solid #d9d9d9',
                cursor: 'pointer',
              }}
            />
          ))}
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            style={{ width: 32, height: 32, border: 'none', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>控制面板</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={showChat} style={btnStyle('#1677ff')}>打开聊天</button>
          <button onClick={hideChat} style={btnStyle('#ff4d4f')}>关闭聊天</button>
          <button onClick={showButtonFn} style={btnStyle('#52c41a')} disabled={showButton}>显示按钮</button>
          <button onClick={hideButtonFn} style={btnStyle('#faad14')} disabled={!showButton}>隐藏按钮</button>
          <button onClick={() => { setShowBubble(!showBubble); }} style={btnStyle('#722ed1')}>
            {showBubble ? '隐藏' : '显示'}气泡
          </button>
        </div>
      </div>

      {/* Embed Info */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px' }}>当前配置摘要</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6, fontSize: 12, overflow: 'auto' }}>
{`import { BytedeskNextjs } from '@bytedesk/web/adapters/nextjs';

<BytedeskNextjs
  chatConfig={{
    org: "df_org_uid",
    t: "${currentChatConfig.t}",
    sid: "${currentChatConfig.sid}"
  }}
  theme={{
    mode: "light",
    backgroundColor: "${themeColor}"
  }}
/>`}
        </pre>
      </div>

      <BytedeskNextjs {...config} />
    </div>
  );
}

const btnStyle = (color: string, disabled?: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  background: disabled ? '#f5f5f5' : color,
  color: disabled ? '#999' : '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: 13,
  fontWeight: 500,
}); 