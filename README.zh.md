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

### Install Dependencies

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 导入组件

```bash
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';
```

### 配置参数

```bash
const config: BytedeskConfig = {
  chatPath: '/chat', // 默认 /chat，历史会话页使用 /chat/thread
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  bubbleConfig: {
    show: true,
    icon: '👋',
    title: 'Need help?',
    subtitle: 'Click to chat'
  },
  buttonConfig: {
    show: true,
    width: 60,
    height: 60,
    // icon: '👋',
    // text: '需要帮助吗？',
  },
  chatConfig: {
    org: 'df_org_uid',  // 替换为您的组织ID
    t: "2",
    sid: 'df_rt_uid'      // 替换为您的SID
  }
};
```

### 历史会话页面（`/chat/thread`）

将 `chatPath` 设置为 `/chat/thread` 后，点击 icon 和调用 `showChat()` 都会打开访客历史会话页面。

```bash
const config: BytedeskConfig = {
  htmlUrl: 'https://cdn.weiyuai.cn/chat',
  chatPath: '/chat/thread',
  chatConfig: {
    org: 'df_org_uid',
    t: '1',
    sid: 'df_wg_uid',
    visitorUid: 'visitor_001',
    nickname: '访客小明',
    avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
  }
};
```

也可直接使用 URL + 参数方式接入（参数与 `/chat` 一致）：

```bash
https://cdn.weiyuai.cn/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=%E8%AE%BF%E5%AE%A2%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=zh-cn&mode=light
```

### 使用组件

```bash
const App = () => {
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
};
```

### 可用方法

```bash
# 显示/隐藏按钮
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

# 显示/隐藏气泡消息
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

# 显示/隐藏聊天窗口
(window as any).bytedesk?.showChat();
(window as any).bytedesk?.hideChat();

# 显示/隐藏邀请对话框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();
 
# 获取未读消息数
(window as any).bytedesk?.getUnreadMessageCount()
# 清空所有未读消息
(window as any).bytedesk?.clearUnreadMessages()
```

## 运行示例

```bash
yarn install 
yarn demo:react    # Run React demo
yarn demo:vue      # Run Vue demo
yarn demo:svelte   # Run Svelte demo
yarn demo:vanilla  # Run Vanilla JS demo
yarn demo:angular  # Run Angular demo
yarn demo:nextjs   # Run Next.js demo

# JavaScript demo requires build first
yarn build
yarn demo:javascript
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
