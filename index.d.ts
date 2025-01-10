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
    inviteParams?: {
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
    showSupport?: boolean;
    chatParams?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseParams?: {
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
    inviteParams?: {
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
    showSupport?: boolean;
    chatParams?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseParams?: {
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
    inviteParams?: {
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
    showSupport?: boolean;
    chatParams?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseParams?: {
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
    inviteParams?: {
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
    showSupport?: boolean;
    chatParams?: {
      org?: string;
      t?: string
      sid?: string;
      [key: string]: any;
    };
    browseParams?: {
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
