<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:08:41
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-22 10:47:56
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# bytedesk-web

- [在线显示地址](https://www.weiyuai.cn/reactdemo)

- [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web)
- [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web)
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

在线客服web/js-sdk插件:

- [React Guide](examples/react-demo/readme.md)
- [Next.js Guide](examples/nextjs-demo/readme.md)
- [Vue Guide](examples/vue-demo/readme.md)
- [Svelte Guide](examples/svelte-demo/readme.md)
- [Angular Guide](examples/angular-demo/readme.md)
- [JavaScript Guide](examples/javascript-demo/readme.md)

![admin](images/admin/chat.png)

## 基本设置

![chat](images/chat/basicsettings.png)

## 用户系统对接

![userinfo](images/chat/userinfo.png)

## 商品信息对接

![goodsInfo](images/chat/goodsinfo.png)

## 订单信息对接

![orderInfo](images/chat/orderinfo.png)

## 未读消息数

![unread](images/chat/unread_count.png)

## 文档反馈

![unread](images/chat/doc-feedback.png)

## 文档反馈功能 ✨ 新功能

文档反馈功能是一个创新性功能，允许用户直接针对页面内容提交精准的反馈意见。

### 功能特点

- **智能文本检测**：自动监听页面文本选择事件
- **实时截图生成**：基于 html2canvas 技术自动截取页面状态
- **精准定位**：记录用户选中的具体文字内容
- **友好界面**：简洁美观的反馈对话框
- **灵活配置**：支持多种触发方式和自定义样式

### 使用方法

1. 用鼠标选中页面中的任意文字
2. 自动弹出"文档反馈"提示按钮
3. 点击按钮打开反馈对话框
4. 查看选中文字和页面截图
5. 输入反馈内容并提交

### 配置示例

```javascript
const config = {
  feedbackConfig: {
    enabled: true, // 启用文档反馈功能
    trigger: 'selection', // 触发方式
    showOnSelection: true, // 选中文本时显示提示
    selectionText: '文档反馈',
    dialogTitle: '提交意见反馈',
    placeholder: '请描述您的问题或优化建议',
    onSubmit: (feedbackData) => {
      console.log('收到反馈数据:', feedbackData);
      // 自定义提交逻辑
    }
  }
};
```

### 依赖安装

文档反馈功能需要 html2canvas 库支持截图功能：

```bash
npm install html2canvas
```

[English Document](./readme.md)

- [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web)
- [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web)
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

## Installation Steps

### 开发环境

```bash
# Angular 21 / Vite 8 需要的 Node.js 版本
nvm use 22.12.0

# 本仓库使用 pnpm，请勿改用其他包管理器
pnpm install
```

## React 快速对接

React 接入建议按下面 5 步完成：

1. 安装 `bytedesk-web`
2. 导入 `BytedeskReact` 和 `BytedeskConfig`
3. 先用最小配置跑通 `org`、`t`、`sid`
4. 再补充主题、入口按钮、访客信息、浏览上下文等可选项
5. 通过 `(window as any).bytedesk` 调用运行时方法，实现动态打开、切换会话和隐藏窗口

如果你只是想先接起来，直接使用下方“最小接入示例”即可；如果要和实际业务系统对接，继续看“推荐接入示例”和“运行时方法”。

### 1. 安装依赖

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 2. 导入组件

```ts
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';
```

### 3. 最小接入示例

这是最小可运行配置。`org`、`t`、`sid` 为必填项，先保证这 3 个值能正确打开会话。

```ts
const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
  },
};
```

说明：

- `org`：企业 UID
- `t`：会话类型，常见值为 `0` 一对一、`1` 工作组、`2` 机器人、`16` 历史会话
- `sid`：会话 ID，对应客服 UID、工作组 UID、机器人 UID 等

### 4. 推荐接入示例

正式环境一般至少会补齐以下几类配置：

- 基础地址：`apiUrl`、`htmlUrl`
- UI：`placement`、`bubbleConfig`、`buttonConfig`、`theme`
- 会话：`chatConfig` 中的访客信息、业务扩展字段
- 上下文：`browseConfig`
- 行为：`inviteConfig`、`autoPopup`、`draggable`

```ts
const config: BytedeskConfig = {
  isDebug: false,
  forceRefresh: false,
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://www.weiyuai.cn/chat',
  locale: 'zh-cn',

  chatPath: '/chat',
  threadPath: '/chat/thread',
  webrtcPath: '/webrtc',
  callPath: '/call',

  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  autoPopupDelay: 3000,
  draggable: true,

  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
    title: '在线咨询',
    visitorUid: 'user_10001',
    nickname: '张三',
    avatar: 'https://example.com/avatar.jpg',
    mobile: '13800138000',
    email: 'zhangsan@example.com',
    note: '来自 React 官网接入',
    channel: 'WEB_VISITOR',
    vipLevel: '2',
    goodsInfo: '',
    orderInfo: '',
    extra: JSON.stringify({
      source: 'react-web',
      plan: 'pro',
    }),
    loadHistory: true,
  },

  browseConfig: {
    referrer: document.referrer,
    url: window.location.href,
    title: document.title,
  },

  inviteConfig: {
    show: false,
    text: '需要帮助吗？',
    icon: '👋',
    delay: 1000,
    loop: true,
    loopDelay: 10000,
    loopCount: 3,
    acceptText: '开始对话',
    rejectText: '稍后再说',
  },

  bubbleConfig: {
    show: true,
    icon: '💬',
    title: '需要帮助吗？',
    subtitle: '点击开始对话',
  },

  buttonConfig: {
    show: true,
    width: 60,
    height: 60,
    action: 'chat',
  },

  theme: {
    mode: 'light',
    textColor: '#ffffff',
    backgroundColor: '#0066FF',
  },

  onVisitorInfo: (uid, visitorUid) => {
    console.log('visitor info', uid, visitorUid);
  },
};
```

### 5. 在组件中使用

```tsx
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';

const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
  },
};

export default function App() {
  return (
    <div>
      <BytedeskReact
        {...config}
        onInit={() => {
          console.log('BytedeskReact initialized');
        }}
      />

      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打开聊天
      </button>
    </div>
  );
}
```

## 常见对接方式

### 直接嵌入 React 页面

这是最常见方式。页面挂载 `BytedeskReact` 后，SDK 会自动创建气泡、按钮和聊天窗口。

适用场景：

- 官网右下角客服入口
- 帮助中心文档页
- 营销落地页
- SaaS 控制台内嵌客服

### 打开独立聊天页

如果你不想直接在 React 页内嵌，也可以使用独立 URL 打开聊天页。

```bash
https://www.weiyuai.cn/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&mode=light&backgroundColor=%230066FF&textColor=%23ffffff&visitorUid=user_10001&nickname=%E5%BC%A0%E4%B8%89&avatar=https%3A%2F%2Fexample.com%2Favatar.jpg&loadHistory=1
```

更多 URL 参数说明请参考 [访客端开发文档](./docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/development/chat.md)。

## 运行时方法

挂载完成后，可以通过全局对象动态控制客服入口和窗口行为。

```ts
// 显示 / 隐藏聊天窗口
(window as any).bytedesk?.showChat();
(window as any).bytedesk?.hideChat();

// 动态切换会话并打开聊天窗口
(window as any).bytedesk?.showChat({
  chatConfig: {
    org: 'df_org_uid',
    t: '1',
    sid: 'df_wg_uid',
    visitorUid: 'user_10001',
    nickname: '张三',
  },
});

// 直接打开其他内置入口
(window as any).bytedesk?.showThread();
(window as any).bytedesk?.showWebrtc();
(window as any).bytedesk?.showCall();

// 显示 / 隐藏按钮
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

// 显示 / 隐藏气泡
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

// 显示 / 隐藏邀请对话框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();

// 获取 / 清空未读消息
const unreadCount = (window as any).bytedesk?.getUnreadMessageCount();
(window as any).bytedesk?.clearUnreadMessages();
```

## 运行示例

```bash
nvm use
pnpm install
pnpm demo:react    # Run React demo
pnpm demo:vue      # Run Vue demo
pnpm demo:svelte   # Run Svelte demo
pnpm demo:vanilla  # Run Vanilla JS demo
pnpm demo:angular  # Run Angular demo
pnpm demo:nextjs   # Run Next.js demo

# JavaScript demo requires build first
pnpm build
pnpm demo:javascript
```

## 服务器

- [Bytedesk](https://github.com/Bytedesk/bytedesk)

## 开源Demo + SDK

|Project|Description|Forks|Stars|
|---|---|---|---|
|[iOS](https://github.com/bytedesk/bytedesk-swift)|iOS|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-swift)|![GitHub Repo stars](https://img.shields.io/github/stars/Bytedesk/bytedesk-swift)|
|[Android](https://github.com/bytedesk/bytedesk-android)|Android|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-android)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-android)|
|[Flutter](https://github.com/bytedesk/bytedesk-flutter)|Flutter|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-flutter)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-flutter)|
|[UniApp](https://github.com/bytedesk/bytedesk-uniapp)|Uniapp|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-uniapp)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-uniapp)|
|[Web](https://github.com/bytedesk/bytedesk-web)|Vue/React/Angular/Next.js/JQuery/...|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-web)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-web)|
|[Wordpress](https://github.com/bytedesk/bytedesk-wordpress)|Wordpress|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-wordpress)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-wordpress)|
|[Woocommerce](https://github.com/bytedesk/bytedesk-woocommerce)|woocommerce|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-woocommerce)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-woocommerce)|
|[Magento](https://github.com/bytedesk/bytedesk-magento)|Magento|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-magento)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-magento)|
|[Prestashop](https://github.com/bytedesk/bytedesk-prestashop)|Prestashop|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-prestashop)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-prestashop)|
|[Shopify](https://github.com/bytedesk/bytedesk-shopify)|Shopify|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-shopify)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-shopify)|
|[Opencart](https://github.com/bytedesk/bytedesk-opencart)|Opencart|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-opencart)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-opencart)|
|[Laravel](https://github.com/bytedesk/bytedesk-laravel)|Laravel|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-laravel)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-laravel)|
|[Django](https://github.com/bytedesk/bytedesk-django)|Django|![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-django)|![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-django)|
