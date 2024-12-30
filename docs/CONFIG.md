<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 14:39:05
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 14:44:03
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# BytedeskWeb Configuration

[中文文档](./CONFIG.zh.md)

## Required Parameters

```typescript
interface ChatParams {
  org: string;    // Organization ID
  t: number;      // Type
  sid: string;    // Session ID
}
```

## Full Configuration

```typescript
interface BytedeskConfig {
  // Theme configuration
  theme?: {
    primaryColor?: string;      // Primary color
    secondaryColor?: string;    // Secondary color
    textColor?: string;         // Text color
    backgroundColor?: string;   // Background color
    position?: 'left' | 'right'; // Position
    navbar?: {
      backgroundColor?: string; // Navbar background color
      textColor?: string;      // Navbar text color
    };
  };

  // Window configuration
  window?: {
    title?: string;            // Window title
    width?: number;            // Window width
    height?: number;           // Window height
    position?: 'left' | 'right'; // Window position
  };

  // Bubble configuration
  bubbleConfig?: {
    show?: boolean;            // Show bubble
    icon?: string;            // Bubble icon
    title?: string;           // Bubble title
    subtitle?: string;        // Bubble subtitle
  };

  // Margin configuration
  marginBottom?: number;       // Bottom margin
  marginSide?: number;        // Side margin

  // Callback
  onInit?: (instance: any) => void; // Initialization callback
}
```

## Instance Methods

```typescript
// Show chat window
bytedesk.showChat();

// Hide chat window
bytedesk.hideChat();

// Destroy instance
bytedesk.destroy();
```
