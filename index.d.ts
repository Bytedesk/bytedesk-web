
declare module 'bytedesk-web/react' {
  import { FC } from 'react';

  export interface BytedeskConfig {
    preset: string;
    placement: 'bottom-left' | 'bottom-right';
    marginBottom: number;
    marginSide: number;
    tabsConfig: {
      home: boolean;
      messages: boolean;
      help: boolean;
      news: boolean;
    };
    bubbleConfig: {
      show: boolean;
      icon: string;
      title: string;
      subtitle: string;
    };
    showSupport: boolean;
    chatParams: {
      org: string;
      t: string
      sid: string;
      [key: string]: any;
    };
    navbarPreset: string;
    customColor: string;
    navbarColor: string;
    navbarTextColor: string;
    margins: {
      bottom: number;
      right: number;
      left: number;
    };
    animation: {
      enabled: boolean;
      duration: number;
      type: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window: {
      width: number;
      height: number;
      title: string;
      position?: 'left' | 'right';
    };
    theme: {
      primaryColor: string;
      secondaryColor: string;
      textColor: string;
      backgroundColor: string;
      position?: 'left' | 'right';
      navbar: {
        backgroundColor: string;
        textColor: string;
      };
    };
  }

  export const BytedeskReact: FC<BytedeskConfig>;
}

declare module 'bytedesk-web/vue' {
  import { DefineComponent } from 'vue';

  export interface BytedeskConfig {
    preset: string;
    placement: 'bottom-left' | 'bottom-right';
    marginBottom: number;
    marginSide: number;
    tabsConfig: {
      home: boolean;
      messages: boolean;
      help: boolean;
      news: boolean;
    };
    bubbleConfig: {
      show: boolean;
      icon: string;
      title: string;
      subtitle: string;
    };
    showSupport: boolean;
    chatParams: {
      org: string;
      t: string
      sid: string;
      [key: string]: any;
    };
    navbarPreset: string;
    customColor: string;
    navbarColor: string;
    navbarTextColor: string;
    margins: {
      bottom: number;
      right: number;
      left: number;
    };
    animation: {
      enabled: boolean;
      duration: number;
      type: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window: {
      width: number;
      height: number;
      title: string;
      position?: 'left' | 'right';
    };
    theme: {
      primaryColor: string;
      secondaryColor: string;
      textColor: string;
      backgroundColor: string;
      position?: 'left' | 'right';
      navbar: {
        backgroundColor: string;
        textColor: string;
      };
    };
  }

  export const BytedeskVue: DefineComponent<BytedeskConfig>;
}

declare module 'bytedesk-web/svelte' {
  import type { SvelteComponent } from 'svelte';

  export interface BytedeskConfig {
    preset: string;
    placement: 'bottom-left' | 'bottom-right';
    marginBottom: number;
    marginSide: number;
    tabsConfig: {
      home: boolean;
      messages: boolean;
      help: boolean;
      news: boolean;
    };
    bubbleConfig: {
      show: boolean;
      icon: string;
      title: string;
      subtitle: string;
    };
    showSupport: boolean;
    chatParams: {
      org: string;
      t: string
      sid: string;
      [key: string]: any;
    };
    navbarPreset: string;
    customColor: string;
    navbarColor: string;
    navbarTextColor: string;
    margins: {
      bottom: number;
      right: number;
      left: number;
    };
    animation: {
      enabled: boolean;
      duration: number;
      type: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    };
    window: {
      width: number;
      height: number;
      title: string;
      position?: 'left' | 'right';
    };
    theme: {
      primaryColor: string;
      secondaryColor: string;
      textColor: string;
      backgroundColor: string;
      position?: 'left' | 'right';
      navbar: {
        backgroundColor: string;
        textColor: string;
      };
    };
  }

  export class BytedeskSvelte extends SvelteComponent<BytedeskConfig> {}
} 