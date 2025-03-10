declare module 'bytedesk-web/react' {
  import { FC } from 'react';

  export interface BytedeskConfig {
    isDebug?: boolean;
    isPreload?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
    autoPopup?: boolean;
    autoPopupDelay?: number;
    inviteConfig?: {
      show?: boolean;
      text?: string;
      icon?: string;
      delay?: number;
      loop?: boolean;
      loopDelay?: number;
      loopCount?: number;
      onAccept?: () => void;
      onReject?: () => void;
      onClose?: () => void;
      onOpen?: () => void;
    };
    tabsConfig?: {
      home?: boolean;
      messages?: boolean;
      help?: boolean;
      news?: boolean;
    };
    bubbleConfig?: {
      show?: boolean;
      icon?: string;
      title?: string;
      subtitle?: string;
    };
    buttonConfig?: {
      show?: boolean; // 是否显示按钮
      icon?: string; // 按钮图标
      text?: string; // 按钮文本
      width?: number; // 按钮宽度
      height?: number; // 按钮高度
      onClick?: () => void; // 点击回调
    };
    showSupport?: boolean;
    chatConfig?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseConfig?: {
      referrer?: string;
      url?: string;
      title?: string;
      [key: string]: any;
    };
    draggable?: boolean;
    animation?: {
      enabled?: boolean;
      duration?: number;
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window?: {
      width?: number;
      height?: number;
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system';
      textColor?: string;
      backgroundColor?: string;
    };
    onInit?: () => void;
    onShowChat?: () => void;
    onHideChat?: () => void;
    onMessage?: (message: string, type: string) => void;
  }

  export const BytedeskReact: FC<BytedeskConfig>;
}

declare module 'bytedesk-web/vue' {
  import { DefineComponent } from 'vue';

  export interface BytedeskConfig {
    isDebug?: boolean;
    isPreload?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
    autoPopup?: boolean;
    autoPopupDelay?: number;
    inviteConfig?: {
      show?: boolean;
      text?: string;
      icon?: string;
      delay?: number;
      loop?: boolean;
      loopDelay?: number;
      loopCount?: number;
      onAccept?: () => void;
      onReject?: () => void;
      onClose?: () => void;
      onOpen?: () => void;
    };
    tabsConfig?: {
      home?: boolean;
      messages?: boolean;
      help?: boolean;
      news?: boolean;
    };
    bubbleConfig?: {
      show?: boolean;
      icon?: string;
      title?: string;
      subtitle?: string;
    };
    buttonConfig?: {
      show?: boolean; // 是否显示按钮
      icon?: string; // 按钮图标
      text?: string; // 按钮文本
      width?: number; // 按钮宽度
      height?: number; // 按钮高度
      onClick?: () => void; // 点击回调
    };
    showSupport?: boolean;
    chatConfig?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseConfig?: {
      referrer?: string;
      url?: string;
      title?: string;
      [key: string]: any;
    };
    draggable?: boolean;
    animation?: {
      enabled?: boolean;
      duration?: number;
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window?: {
      width?: number;
      height?: number;
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system';
      textColor?: string;
      backgroundColor?: string;
    };  
    onInit?: () => void;
    onShowChat?: () => void;
    onHideChat?: () => void;
    onMessage?: (message: string, type: string) => void;
  }

  export const BytedeskVue: DefineComponent<BytedeskConfig>;
}

declare module 'bytedesk-web/svelte' {
  import type { SvelteComponent } from 'svelte';

  export interface BytedeskConfig {
    isDebug?: boolean;
    isPreload?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
    autoPopup?: boolean;
    autoPopupDelay?: number;
    inviteConfig?: {
      show?: boolean;
      text?: string;
      icon?: string;
      delay?: number;
      loop?: boolean;
      loopDelay?: number;
      loopCount?: number;
      onAccept?: () => void;
      onReject?: () => void;
      onClose?: () => void;
      onOpen?: () => void;
    };
    tabsConfig?: {
      home?: boolean;
      messages?: boolean;
      help?: boolean;
      news?: boolean;
    };
    bubbleConfig?: {
      show?: boolean;
      icon?: string;
      title?: string;
      subtitle?: string;
    };
    buttonConfig?: {
      show?: boolean; // 是否显示按钮
      icon?: string; // 按钮图标
      text?: string; // 按钮文本
      width?: number; // 按钮宽度
      height?: number; // 按钮高度
      onClick?: () => void; // 点击回调
    };
    showSupport?: boolean;
    chatConfig?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseConfig?: {
      referrer?: string;
      url?: string;
      title?: string;
      [key: string]: any;
    };
    draggable?: boolean;
    animation?: {
      enabled?: boolean;
      duration?: number;
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window?: {
      width?: number;
      height?: number;
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system';
      textColor?: string;
      backgroundColor?: string;
    };
    onInit?: () => void;
    onShowChat?: () => void;
    onHideChat?: () => void;
    onMessage?: (message: string, type: string) => void;
  }

  export class BytedeskSvelte extends SvelteComponent<BytedeskConfig> {}
} 

declare module 'bytedesk-web/angular' {
  import { Component } from '@angular/core';

  export interface BytedeskConfig {
    isDebug?: boolean;
    isPreload?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
    autoPopup?: boolean;
    autoPopupDelay?: number;
    inviteConfig?: {
      show?: boolean;
      text?: string;
      icon?: string;
      delay?: number;
      loop?: boolean;
      loopDelay?: number;
      loopCount?: number;
      onAccept?: () => void;
      onReject?: () => void;
      onClose?: () => void;
      onOpen?: () => void;
    };
    tabsConfig?: {
      home?: boolean;
      messages?: boolean;
      help?: boolean;
      news?: boolean;
    };
    bubbleConfig?: {
      show?: boolean;
      icon?: string;
      title?: string;
      subtitle?: string;
    };
    buttonConfig?: {
      show?: boolean; // 是否显示按钮
      icon?: string; // 按钮图标
      text?: string; // 按钮文本
      width?: number; // 按钮宽度
      height?: number; // 按钮高度
      onClick?: () => void; // 点击回调
    };
    showSupport?: boolean;
    chatConfig?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseConfig?: {
      referrer?: string;
      url?: string;
      title?: string;
      [key: string]: any;
    };
    draggable?: boolean;
    animation?: {
      enabled?: boolean;
      duration?: number;
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window?: {
      width?: number;
      height?: number;
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system';
      textColor?: string;
      backgroundColor?: string;
    };
    onInit?: () => void;
    onShowChat?: () => void;
    onHideChat?: () => void;
    onMessage?: (message: string, type: string) => void;
  }

  // export class BytedeskAngularComponent extends Component<BytedeskConfig> {
  //   constructor(config: BytedeskConfig) {
  //     super(config);
  //   }
  // }
}

declare module 'bytedesk-web/nextjs' {
  import { FC } from 'react';
  
  export interface BytedeskConfig {
    isDebug?: boolean;
    isPreload?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
    autoPopup?: boolean;
    autoPopupDelay?: number;
    inviteConfig?: {
      show?: boolean;
      text?: string;
      icon?: string;
      delay?: number;
      loop?: boolean;
      loopDelay?: number;
      loopCount?: number;
      onAccept?: () => void;
      onReject?: () => void;
      onClose?: () => void;
      onOpen?: () => void;
    };
    tabsConfig?: {
      home?: boolean;
      messages?: boolean;
      help?: boolean;
      news?: boolean;
    };
    bubbleConfig?: {
      show?: boolean;
      icon?: string;
      title?: string;
      subtitle?: string;
    };
    buttonConfig?: {
      show?: boolean; // 是否显示按钮
      icon?: string; // 按钮图标
      text?: string; // 按钮文本
      width?: number; // 按钮宽度
      height?: number; // 按钮高度
      onClick?: () => void; // 点击回调
    };
    showSupport?: boolean;
    chatConfig?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseConfig?: {
      referrer?: string;
      url?: string;
      title?: string;
      [key: string]: any;
    };
    draggable?: boolean;
    animation?: {
      enabled?: boolean;
      duration?: number;
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window?: {
      width?: number;
      height?: number;
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system';
      textColor?: string;
      backgroundColor?: string;
    };
    onInit?: () => void;
    onShowChat?: () => void;
    onHideChat?: () => void;
    onMessage?: (message: string, type: string) => void;
  }

  // 导出 Next.js 专用组件
  export const BytedeskNextjs: FC<BytedeskConfig>;
}
