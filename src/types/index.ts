/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 11:07:38
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 15:48:03
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
export interface NavbarPreset {
  backgroundColor: string;
  textColor: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  position?: 'left' | 'right';
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
  position?: 'left' | 'right';
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
  t: string
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