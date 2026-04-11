declare module 'bytedesk-web/react' {
  import { FC } from 'react';

  export interface ButtonConfig {
    show?: boolean;
    icon?: string;
    text?: string;
    width?: number;
    height?: number;
    action?: 'chat' | 'thread' | 'webrtc' | 'call';
    previewImageUrl?: string;
    previewImageAlt?: string;
    onClick?: () => void;
  }

  export interface BytedeskConfig {
    isDebug?: boolean; // 是否开启调试模式
    forceRefresh?: boolean; // 是否强制刷新页面
    apiUrl?: string; // API基础URL
    htmlUrl?: string; // Html基础URL，推荐传站点根地址
    chatPath?: string; // 文本聊天页面路径，默认 /chat
    threadPath?: string; // 历史会话页面路径，默认 /chat/thread
    webrtcPath?: string; // 音视频通话页面路径，默认 /webrtc
    callPath?: string; // 呼叫中心页面路径，默认 /call
    placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
    marginBottom?: number; // 底部边距
    marginSide?: number; // 侧边边距
    autoPopup?: boolean; // 是否自动弹出
    autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
    draggable?: boolean; // 是否可拖动
    locale?: string; // 语言
    inviteConfig?: {
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
    };
    tabsConfig?: {
      home?: boolean; // 首页
      messages?: boolean; // 消息
      help?: boolean; // 帮助
      news?: boolean; // 新闻
    };
    bubbleConfig?: {
      show?: boolean; // 是否显示气泡
      icon?: string; // 气泡图标
      title?: string; // 气泡标题
      subtitle?: string; // 气泡副标题
      messages?: Array<{ icon?: string; title?: string; subtitle?: string }>; // 多条气泡消息
      autoRotate?: boolean; // 是否自动轮播消息
      rotateInterval?: number; // 轮播间隔, 单位: 毫秒
      switchMode?: 'fade' | 'slide-up' | 'ticker'; // 消息切换方式
    };
    buttonConfig?: ButtonConfig; // 单按钮配置
    buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
    chatConfig?: {
      org: string; // 组织ID
      t: string; // 类型
      sid: string; // 会话ID
      uid?: string; // 系统自动生成用户ID，不要自定义
      visitorUid?: string; // 自定义访客Uid，支持自定义
      nickname?: string; // 自定义昵称，支持自定义
      avatar?: string; // 自定义头像，支持自定义
      mobile?: string; // 自定义手机号，支持自定义
      email?: string; // 自定义邮箱，支持自定义
      note?: string; // 自定义备注，支持自定义
      extra?: string; // 自定义扩展字段，支持自定义
      goodsInfo?: string; // 商品信息
      orderInfo?: string; // 订单信息
      vipLevel?: string; // 会员等级
      [key: string]: string | number | undefined;
    };
    browseConfig?: {
      referrer?: string; // 来源  
      url?: string; // 页面URL
      title?: string; // 页面标题
      [key: string]: string | number | undefined;
    };
    animation?: {
      enabled?: boolean; // 是否启用动画
      duration?: number; // 动画持续时间, 单位: 毫秒
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
    };
    window?: {
      width?: number; // 窗口宽度
      height?: number; // 窗口高度
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system'; // 主题模式
      textColor?: string; // 导航文本颜色
      backgroundColor?: string; // 导航背景颜色
    };
    onInit?: () => void; // 初始化回调
    onShowChat?: () => void; // 显示聊天回调
    onHideChat?: () => void; // 隐藏聊天回调
    onMessage?: (message: string, type: string) => void; // 消息回调
    onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
    onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
  }

  export const BytedeskReact: FC<BytedeskConfig>;
}

declare module 'bytedesk-web/vue' {
  import { DefineComponent } from 'vue';

  export interface ButtonConfig {
    show?: boolean;
    icon?: string;
    text?: string;
    width?: number;
    height?: number;
    action?: 'chat' | 'thread' | 'webrtc' | 'call';
    previewImageUrl?: string;
    previewImageAlt?: string;
    onClick?: () => void;
  }

  export interface BytedeskConfig {
    isDebug?: boolean; // 是否开启调试模式
    forceRefresh?: boolean; // 是否强制刷新页面
    apiUrl?: string; // API基础URL
    htmlUrl?: string; // Html基础URL，推荐传站点根地址
    chatPath?: string; // 文本聊天页面路径，默认 /chat
    threadPath?: string; // 历史会话页面路径，默认 /chat/thread
    webrtcPath?: string; // 音视频通话页面路径，默认 /webrtc
    callPath?: string; // 呼叫中心页面路径，默认 /call
    placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
    marginBottom?: number; // 底部边距
    marginSide?: number; // 侧边边距
    autoPopup?: boolean; // 是否自动弹出
    autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
    draggable?: boolean; // 是否可拖动
    locale?: string; // 语言
    inviteConfig?: {
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
    };
    tabsConfig?: {
      home?: boolean; // 首页
      messages?: boolean; // 消息
      help?: boolean; // 帮助
      news?: boolean; // 新闻
    };
    bubbleConfig?: {
      show?: boolean; // 是否显示气泡
      icon?: string; // 气泡图标
      title?: string; // 气泡标题
      subtitle?: string; // 气泡副标题
      messages?: Array<{ icon?: string; title?: string; subtitle?: string }>; // 多条气泡消息
      autoRotate?: boolean; // 是否自动轮播消息
      rotateInterval?: number; // 轮播间隔, 单位: 毫秒
      switchMode?: 'fade' | 'slide-up' | 'ticker'; // 消息切换方式
    };
    buttonConfig?: ButtonConfig; // 单按钮配置
    buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
    chatConfig?: {
      org: string; // 组织ID
      t: string; // 类型
      sid: string; // 会话ID
      uid?: string; // 系统自动生成用户ID，不要自定义
      visitorUid?: string; // 自定义访客Uid，支持自定义
      nickname?: string; // 自定义昵称，支持自定义
      avatar?: string; // 自定义头像，支持自定义
      mobile?: string; // 自定义手机号，支持自定义
      email?: string; // 自定义邮箱，支持自定义
      note?: string; // 自定义备注，支持自定义
      extra?: string; // 自定义扩展字段，支持自定义
      goodsInfo?: string; // 商品信息
      orderInfo?: string; // 订单信息
      vipLevel?: string; // 会员等级
      [key: string]: string | number | undefined;
    };
    browseConfig?: {
      referrer?: string; // 来源  
      url?: string; // 页面URL
      title?: string; // 页面标题
      [key: string]: string | number | undefined;
    };
    animation?: {
      enabled?: boolean; // 是否启用动画
      duration?: number; // 动画持续时间, 单位: 毫秒
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
    };
    window?: {
      width?: number; // 窗口宽度
      height?: number; // 窗口高度
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system'; // 主题模式
      textColor?: string; // 导航文本颜色
      backgroundColor?: string; // 导航背景颜色
    };
    onInit?: () => void; // 初始化回调
    onShowChat?: () => void; // 显示聊天回调
    onHideChat?: () => void; // 隐藏聊天回调
    onMessage?: (message: string, type: string) => void; // 消息回调
    onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
    onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
  }

  export const BytedeskVue: DefineComponent<BytedeskConfig>;
}

declare module 'bytedesk-web/svelte' {
  import type { SvelteComponent } from 'svelte';

  export interface ButtonConfig {
    show?: boolean;
    icon?: string;
    text?: string;
    width?: number;
    height?: number;
    action?: 'chat' | 'thread' | 'webrtc' | 'call';
    previewImageUrl?: string;
    previewImageAlt?: string;
    onClick?: () => void;
  }

  export interface BytedeskConfig {
    isDebug?: boolean; // 是否开启调试模式
    forceRefresh?: boolean; // 是否强制刷新页面
    apiUrl?: string; // API基础URL
    htmlUrl?: string; // Html基础URL，推荐传站点根地址
    chatPath?: string; // 文本聊天页面路径，默认 /chat
    threadPath?: string; // 历史会话页面路径，默认 /chat/thread
    webrtcPath?: string; // 音视频通话页面路径，默认 /webrtc
    callPath?: string; // 呼叫中心页面路径，默认 /call
    placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
    marginBottom?: number; // 底部边距
    marginSide?: number; // 侧边边距
    autoPopup?: boolean; // 是否自动弹出
    autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
    draggable?: boolean; // 是否可拖动
    locale?: string; // 语言
    inviteConfig?: {
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
    };
    tabsConfig?: {
      home?: boolean; // 首页
      messages?: boolean; // 消息
      help?: boolean; // 帮助
      news?: boolean; // 新闻
    };
    bubbleConfig?: {
      show?: boolean; // 是否显示气泡
      icon?: string; // 气泡图标
      title?: string; // 气泡标题
      subtitle?: string; // 气泡副标题
      messages?: Array<{ icon?: string; title?: string; subtitle?: string }>; // 多条气泡消息
      autoRotate?: boolean; // 是否自动轮播消息
      rotateInterval?: number; // 轮播间隔, 单位: 毫秒
      switchMode?: 'fade' | 'slide-up' | 'ticker'; // 消息切换方式
    };
    buttonConfig?: ButtonConfig; // 单按钮配置
    buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
    chatConfig?: {
      org: string; // 组织ID
      t: string; // 类型
      sid: string; // 会话ID
      uid?: string; // 系统自动生成用户ID，不要自定义
      visitorUid?: string; // 自定义访客Uid，支持自定义
      nickname?: string; // 自定义昵称，支持自定义
      avatar?: string; // 自定义头像，支持自定义
      mobile?: string; // 自定义手机号，支持自定义
      email?: string; // 自定义邮箱，支持自定义
      note?: string; // 自定义备注，支持自定义
      extra?: string; // 自定义扩展字段，支持自定义
      goodsInfo?: string; // 商品信息
      orderInfo?: string; // 订单信息
      vipLevel?: string; // 会员等级
      [key: string]: string | number | undefined;
    };
    browseConfig?: {
      referrer?: string; // 来源  
      url?: string; // 页面URL
      title?: string; // 页面标题
      [key: string]: string | number | undefined;
    };
    animation?: {
      enabled?: boolean; // 是否启用动画
      duration?: number; // 动画持续时间, 单位: 毫秒
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
    };
    window?: {
      width?: number; // 窗口宽度
      height?: number; // 窗口高度
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system'; // 主题模式
      textColor?: string; // 导航文本颜色
      backgroundColor?: string; // 导航背景颜色
    };
    onInit?: () => void; // 初始化回调
    onShowChat?: () => void; // 显示聊天回调
    onHideChat?: () => void; // 隐藏聊天回调
    onMessage?: (message: string, type: string) => void; // 消息回调
    onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
    onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
  }

  export class BytedeskSvelte extends SvelteComponent<BytedeskConfig> {}
} 

declare module 'bytedesk-web/angular' {
  import { Component } from '@angular/core';

  export interface ButtonConfig {
    show?: boolean;
    icon?: string;
    text?: string;
    width?: number;
    height?: number;
    action?: 'chat' | 'thread' | 'webrtc' | 'call';
    previewImageUrl?: string;
    previewImageAlt?: string;
    onClick?: () => void;
  }

  export interface BytedeskConfig {
    isDebug?: boolean; // 是否开启调试模式
    forceRefresh?: boolean; // 是否强制刷新页面
    apiUrl?: string; // API基础URL
    htmlUrl?: string; // Html基础URL，推荐传站点根地址
    chatPath?: string; // 文本聊天页面路径，默认 /chat
    threadPath?: string; // 历史会话页面路径，默认 /chat/thread
    webrtcPath?: string; // 音视频通话页面路径，默认 /webrtc
    callPath?: string; // 呼叫中心页面路径，默认 /call
    placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
    marginBottom?: number; // 底部边距
    marginSide?: number; // 侧边边距
    autoPopup?: boolean; // 是否自动弹出
    autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
    draggable?: boolean; // 是否可拖动
    locale?: string; // 语言
    inviteConfig?: {
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
    };
    tabsConfig?: {
      home?: boolean; // 首页
      messages?: boolean; // 消息
      help?: boolean; // 帮助
      news?: boolean; // 新闻
    };
    bubbleConfig?: {
      show?: boolean; // 是否显示气泡
      icon?: string; // 气泡图标
      title?: string; // 气泡标题
      subtitle?: string; // 气泡副标题
      messages?: Array<{ icon?: string; title?: string; subtitle?: string }>; // 多条气泡消息
      autoRotate?: boolean; // 是否自动轮播消息
      rotateInterval?: number; // 轮播间隔, 单位: 毫秒
      switchMode?: 'fade' | 'slide-up' | 'ticker'; // 消息切换方式
    };
    buttonConfig?: ButtonConfig; // 单按钮配置
    buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
    chatConfig?: {
      org: string; // 组织ID
      t: string; // 类型
      sid: string; // 会话ID
      uid?: string; // 系统自动生成用户ID，不要自定义
      visitorUid?: string; // 自定义访客Uid，支持自定义
      nickname?: string; // 自定义昵称，支持自定义
      avatar?: string; // 自定义头像，支持自定义
      mobile?: string; // 自定义手机号，支持自定义
      email?: string; // 自定义邮箱，支持自定义
      note?: string; // 自定义备注，支持自定义
      extra?: string; // 自定义扩展字段，支持自定义
      goodsInfo?: string; // 商品信息
      orderInfo?: string; // 订单信息
      vipLevel?: string; // 会员等级
      [key: string]: string | number | undefined;
    };
    browseConfig?: {
      referrer?: string; // 来源  
      url?: string; // 页面URL
      title?: string; // 页面标题
      [key: string]: string | number | undefined;
    };
    animation?: {
      enabled?: boolean; // 是否启用动画
      duration?: number; // 动画持续时间, 单位: 毫秒
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
    };
    window?: {
      width?: number; // 窗口宽度
      height?: number; // 窗口高度
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system'; // 主题模式
      textColor?: string; // 导航文本颜色
      backgroundColor?: string; // 导航背景颜色
    };
    onInit?: () => void; // 初始化回调
    onShowChat?: () => void; // 显示聊天回调
    onHideChat?: () => void; // 隐藏聊天回调
    onMessage?: (message: string, type: string) => void; // 消息回调
    onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
    onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
  }

  // export class BytedeskAngularComponent extends Component<BytedeskConfig> {
  //   constructor(config: BytedeskConfig) {
  //     super(config);
  //   }
  // }
}

declare module 'bytedesk-web/nextjs' {
  import { FC } from 'react';

  export interface ButtonConfig {
    show?: boolean;
    icon?: string;
    text?: string;
    width?: number;
    height?: number;
    action?: 'chat' | 'thread' | 'webrtc' | 'call';
    previewImageUrl?: string;
    previewImageAlt?: string;
    onClick?: () => void;
  }
  
  export interface BytedeskConfig {
    isDebug?: boolean; // 是否开启调试模式
    forceRefresh?: boolean; // 是否强制刷新页面
    apiUrl?: string; // API基础URL
    htmlUrl?: string; // Html基础URL，推荐传站点根地址
    chatPath?: string; // 文本聊天页面路径，默认 /chat
    threadPath?: string; // 历史会话页面路径，默认 /chat/thread
    webrtcPath?: string; // 音视频通话页面路径，默认 /webrtc
    callPath?: string; // 呼叫中心页面路径，默认 /call
    placement?: 'bottom-left' | 'bottom-right'; // 弹出位置
    marginBottom?: number; // 底部边距
    marginSide?: number; // 侧边边距
    autoPopup?: boolean; // 是否自动弹出
    autoPopupDelay?: number; // 自动弹出延迟时间, 单位: 毫秒
    draggable?: boolean; // 是否可拖动
    locale?: string; // 语言
    inviteConfig?: {
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
    };
    tabsConfig?: {
      home?: boolean; // 首页
      messages?: boolean; // 消息
      help?: boolean; // 帮助
      news?: boolean; // 新闻
    };
    bubbleConfig?: {
      show?: boolean; // 是否显示气泡
      icon?: string; // 气泡图标
      title?: string; // 气泡标题
      subtitle?: string; // 气泡副标题
      messages?: Array<{ icon?: string; title?: string; subtitle?: string }>; // 多条气泡消息
      autoRotate?: boolean; // 是否自动轮播消息
      rotateInterval?: number; // 轮播间隔, 单位: 毫秒
      switchMode?: 'fade' | 'slide-up' | 'ticker'; // 消息切换方式
    };
    buttonConfig?: ButtonConfig; // 单按钮配置
    buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
    chatConfig?: {
      org: string; // 组织ID
      t: string; // 类型
      sid: string; // 会话ID
      uid?: string; // 系统自动生成用户ID，不要自定义
      visitorUid?: string; // 自定义访客Uid，支持自定义
      nickname?: string; // 自定义昵称，支持自定义
      avatar?: string; // 自定义头像，支持自定义
      mobile?: string; // 自定义手机号，支持自定义
      email?: string; // 自定义邮箱，支持自定义
      note?: string; // 自定义备注，支持自定义
      extra?: string; // 自定义扩展字段，支持自定义
      goodsInfo?: string; // 商品信息
      orderInfo?: string; // 订单信息
      vipLevel?: string; // 会员等级
      [key: string]: string | number | undefined;
    };
    browseConfig?: {
      referrer?: string; // 来源  
      url?: string; // 页面URL
      title?: string; // 页面标题
      [key: string]: string | number | undefined;
    };
    animation?: {
      enabled?: boolean; // 是否启用动画
      duration?: number; // 动画持续时间, 单位: 毫秒
      type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // 动画类型
    };
    window?: {
      width?: number; // 窗口宽度
      height?: number; // 窗口高度
    };
    theme?: {
      mode?: 'light' | 'dark' | 'system'; // 主题模式
      textColor?: string; // 导航文本颜色
      backgroundColor?: string; // 导航背景颜色
    };
    onInit?: () => void; // 初始化回调
    onShowChat?: () => void; // 显示聊天回调
    onHideChat?: () => void; // 隐藏聊天回调
    onMessage?: (message: string, type: string) => void; // 消息回调
    onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
    onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
  }

  // 导出 Next.js 专用组件
  export const BytedeskNextjs: FC<BytedeskConfig>;
}
