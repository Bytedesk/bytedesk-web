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
  [key in 'zh-cn' | 'zh-tw' | 'en' | 'ja' | 'ja-jp']: {
    title: string;
    actions: {
      continueChat: string;
    };
    bubble: {
      title: string;
      subtitle: string;
    };
    tabs: {
      messages: string;
      thread: string;
      help: string;
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
    actions: {
      continueChat: '继续对话'
    },
    bubble: {
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    tabs: {
      messages: '消息',
      thread: '历史会话',
      help: '帮助',
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
    actions: {
      continueChat: '繼續對話'
    },
    bubble: {
      title: '需要幫助嗎？',
      subtitle: '點擊開始對話'
    },
    tabs: {
      messages: '消息',
      thread: '歷史會話',
      help: '幫助',
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
    actions: {
      continueChat: 'Continue chat'
    },
    bubble: {
      title: 'Need help?',
      subtitle: 'Click to start chat'
    },
    tabs: {
      messages: 'Messages',
      thread: 'History',
      help: 'Help',
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
  },
  'ja': {
    title: 'オンラインサポート',
    actions: {
      continueChat: '会話を続ける'
    },
    bubble: {
      title: 'お困りですか？',
      subtitle: 'クリックして会話を開始'
    },
    tabs: {
      messages: 'メッセージ',
      thread: '履歴',
      help: 'ヘルプ',
    },
    settings: {
      position: '位置',
      tabs: 'タブ',
      bubble: 'バブル',
      navbar: 'ナビゲーション',
      theme: 'テーマ',
      window: 'ウィンドウ',
      margins: '余白',
      animation: 'アニメーション',
      other: 'その他',
      embed: '埋め込みコード'
    }
  },
  'ja-jp': {
    title: 'オンラインサポート',
    actions: {
      continueChat: '会話を続ける'
    },
    bubble: {
      title: 'お困りですか？',
      subtitle: 'クリックして会話を開始'
    },
    tabs: {
      messages: 'メッセージ',
      thread: '履歴',
      help: 'ヘルプ',
    },
    settings: {
      position: '位置',
      tabs: 'タブ',
      bubble: 'バブル',
      navbar: 'ナビゲーション',
      theme: 'テーマ',
      window: 'ウィンドウ',
      margins: '余白',
      animation: 'アニメーション',
      other: 'その他',
      embed: '埋め込みコード'
    }
  }
}; 

export const getLocaleMessages = (locale?: string): Messages[keyof Messages] => {
  const normalizedLocale = (locale || 'zh-cn').toLowerCase();

  return messages[normalizedLocale as keyof Messages]
    || messages[normalizedLocale.split('-')[0] as keyof Messages]
    || messages['zh-cn'];
};