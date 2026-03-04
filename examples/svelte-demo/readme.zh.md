<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:08:41
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 15:43:07
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

Online customer service SDK, supporting multiple frameworks:

- [React Guide](examples/react-demo/readme.md)
- [Vue Guide](examples/vue-demo/readme.md)
- [Svelte Guide](examples/svelte-demo/readme.md)
- [JavaScript Guide](examples/javascript-demo/readme.md)

[English Document](readme.md)

## Installation Steps

### Install Dependencies

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 导入组件

```bash
import { BytedeskSvelte } from 'bytedesk-web/svelte';
import type { BytedeskConfig } from 'bytedesk-web/svelte';
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
  chatConfig: {
    org: 'df_org_uid',  // 替换为您的组织ID
    t: "2",
    sid: 'df_rt_uid'      // 替换为您的SID
  }
};
```

### 历史会话页面（`/chat/thread`）

将 `chatPath` 设置为 `/chat/thread` 后，点击 icon 或调用 `showChat()` 会打开访客历史会话页面。

```bash
const config: BytedeskConfig = {
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

也可以直接用 URL + 参数接入（参数与 `/chat` 一致）：

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
(window as any).bytedesk?.showChat() - 显示聊天窗口
(window as any).bytedesk?.hideChat() - 隐藏聊天窗口
```

## 运行示例

```bash
yarn install
yarn demo:react    # Run React demo
yarn demo:vue      # Run Vue demo
yarn demo:svelte   # Run Svelte demo
yarn demo:vanilla  # Run Vanilla JS demo

# JavaScript demo requires build first
yarn build
yarn demo:javascript
```
