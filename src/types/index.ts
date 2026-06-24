/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 11:07:38
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-15 16:53:31
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
  messages?: BubbleMessageItem[]; // 多条气泡消息，配置后将优先按列表展示
  autoRotate?: boolean; // 是否自动轮播 messages（默认 true）
  rotateInterval?: number; // 轮播间隔，单位: 毫秒（默认 3000）
  switchMode?: BubbleSwitchMode; // 多条消息切换方式
}

export interface BubbleMessageItem {
  icon?: string; // 单条气泡图标
  title?: string; // 单条气泡标题
  subtitle?: string; // 单条气泡副标题
}

export type BubbleSwitchMode = 'fade' | 'slide-up' | 'ticker';

export interface TabsConfig {
  messages?: boolean; // 消息
  thread?: boolean; // 历史会话
  help?: boolean; // 帮助
}

export interface WindowConfig {
  width?: number; // 窗口宽度
  height?: number; // 窗口高度
}

export interface MinimizedBarConfig {
  text?: string; // 最小化恢复条文案，未配置时使用 locale 默认文案
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
  title?: string; // 自定义当前聊天页面浏览器tab标题
  // 
  uid?: string; // 系统自动生成用户ID，不要自定义
  visitorUid?: string; // 自定义访客Uid，支持自定义
  nickname?: string; // 自定义昵称，支持自定义
  avatar?: string; // 自定义头像，支持自定义
  mobile?: string; // 自定义手机号，支持自定义
  email?: string; // 自定义邮箱，支持自定义
  note?: string; // 自定义备注，支持自定义
  channel?: string; // 自定义渠道，优先使用 ChannelEnum 常量
  // 
  goodsInfo?: string; // 商品信息
  orderInfo?: string; // 订单信息
  extra?: string; // 自定义扩展字段，支持自定义
  // 
  vipLevel?: string; // 会员等级
  debug?: boolean; // 用于区分本地测试还是线上环境
  draft?: boolean; // 灰度测试标识（将透传到URL参数中：draft=1）
  settingsUid?: string; // 设置唯一ID, 主要用于调试模式
  loadHistory?: boolean; // 是否加载历史消息
  threadDetail?: string | boolean; // 是否显示会话详情按钮
  visitorProfile?: string | boolean; // 是否显示访客资料按钮
  // 其他自定义字段
  [key: string]: string | number | boolean | undefined;
} 

export interface BrowseConfig {
  referer?: string; // 来源，将被序列化到 browse.referer
  referrer?: string; // referer 兼容别名
  url?: string; // 页面URL
  title?: string; // 来源页面标题，将被序列化到 browse.title
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
  action?: 'chat' | 'thread' | 'webrtc' | 'call' | 'ticket'; // 按钮点击后触发的内置会话类型
  previewImageUrl?: string; // 鼠标悬浮时展示的图片地址，例如企业微信二维码
  previewImageAlt?: string; // 悬浮图片说明文案
  onClick?: () => void; // 点击回调
}

export interface FeedbackConfig {
  enabled?: boolean; // 是否启用文档反馈功能
  trigger?: 'selection' | 'button' | 'both'; // 触发方式：选中文本、按钮、或两者
  showOnSelection?: boolean; // 是否在选中文本时显示提示
  selectionText?: string; // 选中文本时显示的提示文字
  buttonText?: string; // 按钮文字
  dialogTitle?: string; // 反馈对话框标题
  placeholder?: string; // 反馈内容输入框占位符
  submitText?: string; // 提交按钮文字
  cancelText?: string; // 取消按钮文字
  successMessage?: string; // 提交成功提示
  categoryNames?: string[]; // 反馈类型选项（字符串数组）
  requiredTypes?: boolean; // 是否必须选择至少一个类型
  typesSectionTitle?: string; // 反馈类型区域标题
  typesDescription?: string; // 反馈类型描述
  submitScreenshot?: boolean; // 是否提交截图
  onSubmit?: (feedback: FeedbackData) => void; // 提交回调
  onCancel?: () => void; // 取消回调
}

export interface FeedbackData {
  selectedText: string; // 选中的文本
  images?: string[]; // 上传图片URL列表（可选）
  content: string; // 用户反馈内容
  categoryNames?: string; // 反馈类型，多个类型用逗号分隔（可选）
  url: string; // 当前页面URL
  title: string; // 当前页面标题
  userAgent: string; // 用户代理信息
  visitorUid?: string; // 访客ID（可选）
  orgUid?: string; // 组织ID（可选）
}

export interface MessageBubbleClickEvent {
  uid?: string; // 被点击消息的唯一 ID
  type?: string; // 被点击消息的消息类型，而不是 postMessage 事件名
  content?: unknown; // 被点击消息的消息内容
  navigateToPath?: string | null; // 已拼接 payload 参数的跳转地址，宿主可直接解析并执行跳转
  extra?: unknown; // 被点击消息的扩展字段
  position?: string; // 被点击消息在对话中的位置
  status?: string; // 被点击消息的发送/处理状态
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
  ticketPath?: string; // 工单页面路径，默认 /ticket/history
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
  buttonsConfig?: ButtonConfig[]; // 多按钮配置，配置后优先按数组渲染多个入口按钮
  feedbackConfig?: FeedbackConfig; // 文档反馈配置
  chatConfig?: ChatConfig; // 聊天配置
  browseConfig?: BrowseConfig; // 浏览配置
  animation?: Animation; // 动画配置
  window?: WindowConfig; // 窗口配置
  minimizedBarConfig?: MinimizedBarConfig; // 最小化恢复条配置
  theme?: Theme; // 主题配置
  onInit?: () => void; // 初始化回调
  onShowChat?: () => void; // 显示聊天回调
  onHideChat?: () => void; // 隐藏聊天回调
  onMessage?: (message: string, type: string) => void; // 消息回调
  onMessageBubbleClick?: (event: MessageBubbleClickEvent) => void; // 消息气泡点击回调，event.type 为消息类型
  onConfigChange?: (config: BytedeskConfig) => void; // 配置变更回调
  onVisitorInfo?: (uid: string, visitorUid: string) => void; // localStorage 数据回调
}

export type Language = 'zh-cn' | 'zh-tw' | 'en' | 'ja' | 'ja-jp' | 'ko' | 'ko-kr' | 'vi-vn' | 'ms-my' | 'es-es' | 'fr-fr';

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