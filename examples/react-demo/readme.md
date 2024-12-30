# React Demo

[中文文档](./README.zh.md)

## Installation

```bash
npm install bytedesk-web
# or
yarn add bytedesk-web
```

## TypeScript Support

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "bytedesk-web/*": ["./node_modules/bytedesk-web/*"]
    }
  }
}
```

## Usage Example

```tsx
import React from 'react';
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';

const ChatWidget: React.FC = () => {
  const config: BytedeskConfig = {
    theme: {
      primaryColor: '#2e88ff',
      position: 'right'
    },
    window: {
      title: 'Customer Service',
      width: 380,
      height: 640
    },
    chatParams: {
      org: 'your_org_id',
      t: 2,
      sid: 'your_sid'
    }
  };

  return <BytedeskReact {...config} />;
};

export default ChatWidget;
```

## Configuration

[View Full Configuration](../../docs/CONFIG.md)

## Local Development

```bash
yarn install
yarn dev
```
