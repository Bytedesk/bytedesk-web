<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:45:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 15:41:12
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

[中文文档](readme.zh.md)

## Installation Steps

### Install Dependencies

```bash
npm install bytedesk-web
# or
yarn add bytedesk-web
```

### Import Component

```bash
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';
```

### Configure Parameters

```bash
const config: BytedeskConfig = {
  chatPath: '/chat', // default: /chat, thread history: /chat/thread
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
    org: 'df_org_uid',  // Replace with your organization ID
    t: "2",
    sid: 'df_rt_uid'      // Replace with your SID
  }
};
```

### Thread History Page (`/chat/thread`)

Set `chatPath` to `/chat/thread` to open the visitor history thread page when clicking the icon or calling `showChat()`.

```bash
const config: BytedeskConfig = {
  chatPath: '/chat/thread',
  chatConfig: {
    org: 'df_org_uid',
    t: '1',
    sid: 'df_wg_uid',
    visitorUid: 'visitor_001',
    nickname: 'Visitor',
    avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
  }
};
```

Direct URL usage (same params as `/chat`):

```bash
https://cdn.weiyuai.cn/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=Visitor&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=en&mode=light
```

### Use Component

```bash
const App = () => {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div>
      <BytedeskReact {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        Open Chat
      </button>
    </div>
  );
};
```

### Available Methods

```bash
(window as any).bytedesk?.showChat() - Show chat window
(window as any).bytedesk?.hideChat() - Hide chat window
```

## Run Examples

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
