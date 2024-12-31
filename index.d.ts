declare module 'bytedesk-web/react' {
  import { FC } from 'react';

  export interface BytedeskConfig {
    isDebug?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
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
  }

  export const BytedeskReact: FC<BytedeskConfig>;
}

declare module 'bytedesk-web/vue' {
  import { DefineComponent } from 'vue';

  export interface BytedeskConfig {
    isDebug?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
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
  }

  export const BytedeskVue: DefineComponent<BytedeskConfig>;
}

declare module 'bytedesk-web/svelte' {
  import type { SvelteComponent } from 'svelte';

  export interface BytedeskConfig {
    isDebug?: boolean;
    baseUrl?: string;
    placement?: 'bottom-left' | 'bottom-right';
    marginBottom?: number;
    marginSide?: number;
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
  }

  export class BytedeskSvelte extends SvelteComponent<BytedeskConfig> {}
} 