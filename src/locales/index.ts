/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 16:58:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-07 23:05:49
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
type Messages = {
  [key in 'zh-cn' | 'zh-tw' | 'en']: {
    title: string;
    bubble: {
      title: string;
      subtitle: string;
    };
    tabs: {
      home: string;
      messages: string;
      help: string;
      news: string;
    };
    settings: {
      position: string;
      tabs: string;
      bubble: string;
      navbar: string;
      theme: string;
      window: string;
      margins: string;
      animation: string;
      other: string;
      embed: string;
    };
  };
};

export const messages: Messages = {
  'zh-cn': {
    title: '在线客服',
    bubble: {
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    tabs: {
      home: '首页',
      messages: '消息',
      help: '帮助',
      news: '新闻'
    },
    settings: {
      position: '位置',
      tabs: '标签页',
      bubble: '气泡',
      navbar: '导航栏',
      theme: '主题',
      window: '窗口',
      margins: '边距',
      animation: '动画',
      other: '其他',
      embed: '嵌入代码'
    }
  },
  'zh-tw': {
    title: '線上客服',
    bubble: {
      title: '需要幫助嗎？',
      subtitle: '點擊開始對話'
    },
    tabs: {
      home: '首頁',
      messages: '消息',
      help: '幫助',
      news: '新聞'
    },
    settings: {
      position: '位置',
      tabs: '標籤頁',
      bubble: '氣泡',
      navbar: '導航欄',
      theme: '主題',
      window: '窗口',
      margins: '邊距',
      animation: '動畫',
      other: '其他',
      embed: '嵌入代碼'
    }
  },
  'en': {
    title: 'Online Support',
    bubble: {
      title: 'Need help?',
      subtitle: 'Click to start chat'
    },
    tabs: {
      home: 'Home',
      messages: 'Messages',
      help: 'Help',
      news: 'News'
    },
    settings: {
      position: 'Position',
      tabs: 'Tabs',
      bubble: 'Bubble',
      navbar: 'Navbar',
      theme: 'Theme',
      window: 'Window',
      margins: 'Margins',
      animation: 'Animation',
      other: 'Other',
      embed: 'Embed Code'
    }
  }
}; 