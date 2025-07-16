/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 11:07:38
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-12 09:28:01
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
export interface Theme {
  mode?: 'light' | 'dark' | 'system'; // 主题模式
  textColor?: string; // 导航文本颜色
  backgroundColor?: string; // 导航背景颜色
}

export interface BubbleConfig {
  show?: boolean; // 是否显示气泡
  icon?: string; // 气泡图标
  title?: string; // 气泡标题
  subtitle?: string; // 气泡副标题
}

export interface TabsConfig {
  home?: boolean; // 首页
  messages?: boolean; // 消息
  help?: boolean; // 帮助
  news?: boolean; // 新闻
}

export interface WindowConfig {
  width?: number; // 窗口宽度
  height?: number; // 窗口高度
}

export interface Animation {
  enabled?: boolean; // 是否启用动画
  duration?: number; // 动画持续时间, 单位: 毫秒
  type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
}

export interface ChatConfig {
  org: string; // 组织ID
  t: string; // 类型
  sid: string; // 会话ID
  // 
  uid?: string; // 系统自动生成用户ID，不要自定义
  visitorUid?: string; // 自定义访客Uid，支持自定义
  nickname?: string; // 自定义昵称，支持自定义
  avatar?: string; // 自定义头像，支持自定义
  mobile?: string; // 自定义手机号，支持自定义
  email?: string; // 自定义邮箱，支持自定义
  note?: string; // 自定义备注，支持自定义
  extra?: string; // 自定义扩展字段，支持自定义
  // 
  goodsInfo?: string; // 商品信息
  orderInfo?: string; // 订单信息
  vipLevel?: string; // 会员等级
  // 其他自定义字段
  [key: string]: string | number | undefined;
} 

export interface BrowseConfig {
  referrer?: string; // 来源  
  url?: string; // 页面URL
  title?: string; // 页面标题
  [key: string]: string | number | undefined;
}

export interface InviteConfig {
  show?: boolean; // 是否显示邀请
  text?: string; // 邀请文本
  icon?: string; // 邀请图标
  delay?: number; // 邀请延迟时间, 单位: 毫秒
  loop?: boolean; // 是否循环 
  loopDelay?: number; // 循环延迟时间, 单位: 毫秒
  loopCount?: number; // 循环次数
  acceptText?: string; // 接受文本
  rejectText?: string; // 拒绝文本
  onAccept?: () => void; // 接受回调
  onReject?: () => void; // 拒绝回调
  onClose?: () => void; // 关闭回调
  onOpen?: () => void; // 打开回调
}

export interface ButtonConfig {
  show?: boolean; // 是否显示按钮
  icon?: string; // 按钮图标
  text?: string; // 按钮文本
  // size?: number; // 按钮大小
  width?: number; // 按钮宽度
  height?: number; // 按钮高度
  onClick?: () => void; // 点击回调
}

export interface BytedeskConfig {
  isDebug?: boolean; // 是否开启调试模式
  // isPreload?: boolean; // 是否预加载  
  forceRefresh?: boolean; // 是否强制刷新页面
  baseUrl?: string; // 基础URL
  apiUrl?: string; // API基础URL
  placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
  marginBottom?: number; // 底部边距
  marginSide?: number; // 侧边边距
  autoPopup?: boolean; // 是否自动弹出
  autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
  draggable?: boolean; // 是否可拖动
  locale?: string; // 语言
  inviteConfig?: InviteConfig; // 邀请配置
  tabsConfig?: TabsConfig; // 标签配置
  bubbleConfig?: BubbleConfig; // 气泡配置
  buttonConfig?: ButtonConfig; // 按钮配置
  chatConfig?: ChatConfig; // 聊天配置
  browseConfig?: BrowseConfig; // 浏览配置
  animation?: Animation; // 动画配置
  window?: WindowConfig; // 窗口配置
  theme?: Theme; // 主题配置
  onInit?: () => void; // 初始化回调
  onShowChat?: () => void; // 显示聊天回调
  onHideChat?: () => void; // 隐藏聊天回调
  onMessage?: (message: string, type: string) => void; // 消息回调
  onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
  onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
}

export type Language = 'zh-cn' | 'zh-tw' | 'en' | 'ja' | 'ko';

export interface LocaleMessages {
  [key: string]: {
    title?: string;
    settings?: {
      position?: string;
      tabs?: string;
      bubble?: string;
      navbar?: string;
      theme?: string;
      window?: string;
      margins?: string;
      animation?: string;
      other?: string;
      embed?: string;
    };
    buttons: {
      copy?: string;
      reset?: string;
      openChat?: string;
    };
  };
} 