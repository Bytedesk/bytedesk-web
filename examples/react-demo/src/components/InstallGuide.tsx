/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 11:53:47
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-24 14:49:20
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
        <div>
        <h3>5. 可用方法</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><code>(window as any).bytedesk?.showButton()</code> - 显示按钮</li>
          <li><code>(window as any).bytedesk?.hideButton()</code> - 隐藏按钮</li>
          <li><code>(window as any).bytedesk?.showBubble()</code> - 显示气泡消息</li>
          <li><code>(window as any).bytedesk?.hideBubble()</code> - 隐藏气泡消息</li>
          <li><code>(window as any).bytedesk?.showChat()</code> - 显示聊天窗口</li>
          <li><code>(window as any).bytedesk?.hideChat()</code> - 隐藏聊天窗口</li>
          <li><code>(window as any).bytedesk?.showInviteDialog()</code> - 显示邀请对话框</li>
          <li><code>(window as any).bytedesk?.hideInviteDialog()</code> - 隐藏邀请对话框</li>
          <li><code>(window as any).bytedesk?.showDocumentFeedback(selectedText?)</code> - 显示文档反馈对话框 (新功能)</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>6. 文档反馈功能说明</h3>
        <p style={{ marginBottom: '12px' }}>文档反馈功能是一个全新的特色功能，可以让用户针对页面内容提交精准的反馈意见：</p>
        <ul style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          <li><strong>自动检测文本选择：</strong>当用户选中页面中的文字时，自动显示"文档反馈"提示</li>
          <li><strong>智能截图：</strong>自动截取当前页面状态，为反馈提供视觉上下文</li>
          <li><strong>精准定位：</strong>记录用户选中的具体文字内容，方便开发者快速定位问题</li>
          <li><strong>多种触发方式：</strong>支持文本选择触发、按钮触发或两者结合</li>
          <li><strong>自定义处理：</strong>支持自定义提交逻辑，可以发送到自己的服务器</li>
        </ul>
        
        <div style={{ backgroundColor: '#e7f3ff', padding: '12px', borderRadius: '6px', border: '1px solid #b3d8ff' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#0066cc' }}>
            <strong>💡 提示：</strong>文档反馈功能需要安装 <code>html2canvas</code> 库来支持截图功能：
          </p>
          <pre style={{ background: '#f8f9fa', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '12px' }}>
            {`npm install html2canvas`}
          </pre>
        </div>
      </div>e aware of the BSL license restrictions before installing Bytedesk IM – 
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
        
        <div style={{ marginBottom: '15px' }}>
          <h4>最小参数配置 (必需)</h4>
          <pre style={{ background: '#f0f8ff', padding: '15px', borderRadius: '4px', border: '1px solid #b0d4f1' }}>
            {`const config: BytedeskConfig = {
  // 聊天配置 (必需)
  chatConfig: {
    org: 'df_org_uid',  // 组织ID (必需，请替换为您的组织ID)
    t: "2",             // 类型 (必需，0：一对一，1：工作组，2：机器人)
    sid: 'df_rt_uid',   // 会话ID (必需，请替换为您的会话ID)
  },
};`}
          </pre>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            <strong>注意：</strong>以上三个参数是启动聊天功能的最小配置，请务必替换为您自己的实际参数值。
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>完整配置参数 (可选)</h4>
          <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
            {`const config: BytedeskConfig = {
  // 基础配置
  isDebug: false, // 是否开启调试模式
  forceRefresh: false, // 是否强制刷新页面
  apiUrl: 'https://api.weiyuai.cn', // API基础URL
  htmlUrl: 'https://www.weiyuai.cn/chat', // 对话页面Html基础URL
  locale: 'zh-cn', // 语言: 'zh-cn' | 'zh-tw' | 'en' | 'ja' | 'ko'
  
  // 位置和布局配置
  placement: 'bottom-right', // 弹出位置: 'bottom-left' | 'bottom-right'
  marginBottom: 20, // 底部边距
  marginSide: 20, // 侧边边距
  draggable: true, // 是否可拖动
  
  // 自动弹出配置
  autoPopup: false, // 是否自动弹出
  autoPopupDelay: 3000, // 自动弹出延迟时间, 单位: 毫秒
  
  // 聊天配置 (必需)
  chatConfig: {
    org: 'df_org_uid',  // 组织ID (必需，请替换为您的组织ID)
    t: "2",             // 类型 (必需，0：一对一，1：工作组，2：机器人)
    sid: 'df_rt_uid',   // 会话ID (必需，请替换为您的会话ID)
    
    // 可选用户信息
    visitorUid: '', // 自定义访客Uid，支持自定义
    nickname: '', // 自定义昵称，支持自定义
    avatar: '', // 自定义头像，支持自定义
    mobile: '', // 自定义手机号，支持自定义
    email: '', // 自定义邮箱，支持自定义
    note: '', // 自定义备注，支持自定义
    extra: '', // 自定义扩展字段，支持自定义
    
    // 业务信息
    goodsInfo: '', // 商品信息
    orderInfo: '', // 订单信息
    vipLevel: '', // 会员等级
  },
  
  // 浏览配置
  browseConfig: {
    referrer: '', // 来源
    url: window.location.href, // 页面URL
    title: document.title, // 页面标题
  },
  
  // 邀请配置
  inviteConfig: {
    show: false, // 是否显示邀请
    text: '需要帮助吗？', // 邀请文本
    icon: '👋', // 邀请图标
    delay: 1000, // 首次弹出延迟时间, 单位: 毫秒
    loop: true, // 是否启用循环
    loopDelay: 10000, // 循环间隔, 单位: 毫秒
    loopCount: 3, // 循环次数, 设置为0表示无限循环
    acceptText: '开始对话', // 接受文本
    rejectText: '稍后再说', // 拒绝文本
    onAccept: () => console.log('用户接受邀请'),
    onReject: () => console.log('用户拒绝邀请'),
    onClose: () => console.log('邀请对话框关闭'),
    onOpen: () => console.log('邀请对话框打开'),
  },
  
  // 文档反馈配置 (新功能)
  feedbackConfig: {
    enabled: true, // 是否启用文档反馈功能
    trigger: 'selection', // 触发方式: 'selection' | 'button' | 'both'
    showOnSelection: true, // 是否在选中文本时显示提示
    selectionText: '文档反馈', // 选中文本时显示的提示文字
    buttonText: '文档反馈', // 按钮文字
    dialogTitle: '提交意见反馈', // 反馈对话框标题
    placeholder: '请描述您的问题或优化建议', // 反馈内容输入框占位符
    submitText: '提交反馈', // 提交按钮文字
    cancelText: '取消', // 取消按钮文字
    successMessage: '反馈已提交，感谢您的意见！', // 提交成功提示
    onSubmit: (feedbackData) => {
      console.log('收到反馈数据:', feedbackData);
      // 自定义提交逻辑，可以发送到自己的服务器
    },
    onCancel: () => console.log('用户取消了反馈'),
  },
  
  // 气泡配置
  bubbleConfig: {
    show: true, // 是否显示气泡
    icon: '💬', // 气泡图标
    title: '需要帮助吗？', // 气泡标题
    subtitle: '点击开始对话', // 气泡副标题
  },
  
  // 按钮配置
  buttonConfig: {
    show: true, // 是否显示按钮
    icon: '💬', // 按钮图标
    text: '在线客服', // 按钮文本
    width: 60, // 按钮宽度
    height: 60, // 按钮高度
    onClick: () => console.log('按钮被点击'),
  },
  
  // 标签配置
  tabsConfig: {
    home: true, // 首页
    messages: true, // 消息
    help: true, // 帮助
    news: false, // 新闻
  },
  
  // 主题配置
  theme: {
    mode: 'light', // 主题模式: 'light' | 'dark' | 'system'
    textColor: '#333333', // 导航文本颜色
    backgroundColor: '#ffffff', // 导航背景颜色
  },
  
  // 窗口配置
  window: {
    width: 400, // 窗口宽度
    height: 600, // 窗口高度
  },
  
  // 动画配置
  animation: {
    enabled: true, // 是否启用动画
    duration: 300, // 动画持续时间, 单位: 毫秒
    type: 'ease-in-out', // 动画类型: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
  },
  
  // 事件回调
  onInit: () => console.log('BytedeskReact initialized'),
  onShowChat: () => console.log('聊天窗口显示'),
  onHideChat: () => console.log('聊天窗口隐藏'),
  onMessage: (message: string, type: string) => console.log('收到消息:', message, type),
  onConfigChange: (config: BytedeskConfig) => console.log('配置变更:', config),
  onVisitorInfo: (uid: string, visitorUid: string) => console.log('访客信息:', uid, visitorUid),
};`}
          </pre>
        </div>
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
          <li><code>(window as any).bytedesk?.showButton()</code> - 显示按钮</li>
          <li><code>(window as any).bytedesk?.hideButton()</code> - 隐藏按钮</li>
          <li><code>(window as any).bytedesk?.showBubble()</code> - 显示气泡消息</li>
          <li><code>(window as any).bytedesk?.hideBubble()</code> - 隐藏气泡消息</li>
          <li><code>(window as any).bytedesk?.showChat()</code> - 显示聊天窗口</li>
          <li><code>(window as any).bytedesk?.hideChat()</code> - 隐藏聊天窗口</li>
          <li><code>(window as any).bytedesk?.showInviteDialog()</code> - 显示邀请对话框</li>
          <li><code>(window as any).bytedesk?.hideInviteDialog()</code> - 隐藏邀请对话框</li>
        </ul>
      </div>
    </div>
  );
};

export default InstallGuide; 