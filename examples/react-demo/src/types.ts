// 创建新文件定义类型

export interface NavbarPreset {
  backgroundColor: string;
  textColor: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  navbar: NavbarPreset;
}

export interface BubbleConfig {
  show: boolean;
  icon: string;
  title: string;
  subtitle: string;
}

export interface TabsConfig {
  home: boolean;
  messages: boolean;
  help: boolean;
  news: boolean;
}

export interface WindowConfig {
  width: number;
  height: number;
  title: string;
}

export interface Margins {
  bottom: number;
  right: number;
  left: number;
}

export interface Animation {
  enabled: boolean;
  duration: number;
  type: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface ChatParams {
  org: string;
  t: number;
  sid: string;
  [key: string]: string | number;
}

export interface BytedeskConfig {
  preset: string;
  placement: 'bottom-left' | 'bottom-right';
  marginBottom: number;
  marginSide: number;
  tabsConfig: TabsConfig;
  bubbleConfig: BubbleConfig;
  showSupport: boolean;
  chatParams: ChatParams;
  navbarPreset: string;
  customColor: string;
  navbarColor: string;
  navbarTextColor: string;
  margins: Margins;
  animation: Animation;
  window: WindowConfig;
  theme: Theme;
}

export type Language = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

export interface LocaleMessages {
  [key: string]: {
    title: string;
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
    buttons: {
      copy: string;
      reset: string;
      openChat: string;
    };
  };
} 