<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 11:58:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-24 14:49:20
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
-->
<template>
  <div class="install-guide">
    <h2>安装步骤</h2>
    
    <div class="section">
      <h3>1. 安装依赖</h3>
      <pre><code>npm install bytedesk-web
# 或
yarn add bytedesk-web</code></pre>
    </div>

    <div class="section">
      <h3>2. 导入组件</h3>
      <pre><code>import { BytedeskVue } from 'bytedesk-web/vue';
import type { BytedeskConfig } from 'bytedesk-web/vue';</code></pre>
    </div>

    <div class="section">
      <h3>3. 配置参数</h3>
      
      <div class="subsection">
        <h4>最小参数配置 (必需)</h4>
        <pre class="minimal-config"><code>const config = ref&lt;BytedeskConfig&gt;({
  // 聊天配置 (必需)
  chatConfig: {
    org: 'df_org_uid',  // 组织ID (必需，请替换为您的组织ID)
    t: "2",             // 类型 (必需，0：一对一，1：工作组，2：机器人)
    sid: 'df_rt_uid',   // 会话ID (必需，请替换为您的会话ID)
  },
});</code></pre>
        <p class="note">
          <strong>注意：</strong>以上三个参数是启动聊天功能的最小配置，请务必替换为您自己的实际参数值。
        </p>
      </div>

      <div class="subsection">
        <h4>完整配置参数 (可选)</h4>
        <pre><code>const config = ref&lt;BytedeskConfig&gt;({
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
  onInit: () => console.log('BytedeskVue initialized'),
  onShowChat: () => console.log('聊天窗口显示'),
  onHideChat: () => console.log('聊天窗口隐藏'),
  onMessage: (message: string, type: string) => console.log('收到消息:', message, type),
  onConfigChange: (config: BytedeskConfig) => console.log('配置变更:', config),
  onVisitorInfo: (uid: string, visitorUid: string) => console.log('访客信息:', uid, visitorUid),
});</code></pre>
      </div>
    </div>

    <div class="section">
      <h3>4. 使用组件</h3>
      <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;BytedeskVue v-bind="config" @init="handleInit" /&gt;
    &lt;button @click="handleShowChat"&gt;打开聊天&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { BytedeskVue } from 'bytedesk-web/vue';
import type { BytedeskConfig } from 'bytedesk-web/vue';

const bytedeskInstance = ref(null);

const handleInit = (instance) => {
  bytedeskInstance.value = instance;
  console.log('BytedeskVue initialized');
};

const handleShowChat = () => {
  bytedeskInstance.value?.showChat();
};
&lt;/script&gt;</code></pre>
    </div>

    <div class="section">
      <h3>5. 可用方法</h3>
      <ul>
        <li><code>bytedeskInstance.value?.showButton()</code> - 显示按钮</li>
        <li><code>bytedeskInstance.value?.hideButton()</code> - 隐藏按钮</li>
        <li><code>bytedeskInstance.value?.showBubble()</code> - 显示气泡消息</li>
        <li><code>bytedeskInstance.value?.hideBubble()</code> - 隐藏气泡消息</li>
        <li><code>bytedeskInstance.value?.showChat()</code> - 显示聊天窗口</li>
        <li><code>bytedeskInstance.value?.hideChat()</code> - 隐藏聊天窗口</li>
        <li><code>bytedeskInstance.value?.showInviteDialog()</code> - 显示邀请对话框</li>
        <li><code>bytedeskInstance.value?.hideInviteDialog()</code> - 隐藏邀请对话框</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InstallGuide'
});
</script>

<style scoped>
.install-guide {
  margin-top: 40px;
  max-width: 800px;
}

.section {
  margin-bottom: 20px;
}

.subsection {
  margin-bottom: 15px;
}

.minimal-config {
  background: #f0f8ff !important;
  border: 1px solid #b0d4f1 !important;
}

.note {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: monospace;
}

ul {
  line-height: 1.6;
}
</style> 