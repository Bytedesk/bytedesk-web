/**
 * bytedesk.com
 */
var bd_kfe_data = {
  // 调试
  // IS_DEBUG: true,
  // BASE_HOST: "127.0.0.1:9003",
  // BASE_URL: "http://127.0.0.1:9003",
  // STOMP_WS_URL: "ws://127.0.0.1:9003/stomp",
  // UPLOAD_FILE_URL: "http://127.0.0.1:9003/visitor/api/v1/upload/file",
  // 线上
  IS_DEBUG: false,
  BASE_HOST: "api.weiyuai.cn",
  BASE_URL: "https://api.weiyuai.cn",
  STOMP_WS_URL: "wss://api.weiyuai.cn/stomp",
  UPLOAD_FILE_URL: "https://api.weiyuai.cn/visitor/api/v1/upload/file",
  // 
  VISITOR_UID: "bytedesk_visitor_uid",
  VISITOR_NICKNAME: "bytedesk_visitor_nickname",
  VISITOR_AVATAR: "bytedesk_visitor_avatar",
  VISITOR_ORGUID: "bytedesk_visitor_orguid",
  VISITOR_DEVICEUID: "bytedesk_visitor_deviceuid",
  // 
  // URL参数
  org: "", // 组织
  t: "0", // 类型: 0: 一对一，1：技能组
  sid: "", // 唯一id
  lang: "zh-cn", // 语言: zh-cn/zh-tw/en, 默认：zh-cn
  ref: "", // 来源
  navbar: "1", // 是否显示导航，默认显示，0：隐藏
  theme: "system", // 颜色主题: light/dark/system，默认: system
  // 
  HTTP_CLIENT: 'web_pc',
  PLATFORM: "weiyuai",
  LOCALE: "locale",  
  I18N_PREFIX: "i18n.",
  // 登录超时
  EVENT_BUS_LOGIN_TIMEOUT: "EVENT_BUS_LOGIN_TIMEOUT",
  // 用户名或密码错误
  EVENT_BUS_LOGIN_ERROR_400: "EVENT_BUS_LOGIN_ERROR_400",
  // 服务器错误500
  EVENT_BUS_SERVER_ERROR_500: "EVENT_BUS_SERVER_ERROR_500",
  // token失效
  EVENT_BUS_TOKEN_INVALID: "EVENT_BUS_TOKEN_INVALID",
  EVENT_BUS_SWITCH_THEME: "EVENT_BUS_SWITCH_THEME",
  //
  EVENT_BUS_MESSAGE_TYPE_STATUS: "EVENT_BUS_MESSAGE_TYPE_STATUS",
  EVENT_BUS_MESSAGE_TYPE_TYPING: "EVENT_BUS_MESSAGE_TYPE_TYPING",
  EVENT_BUS_MESSAGE_TYPE_PROCESSING: "EVENT_BUS_MESSAGE_TYPE_PROCESSING",
  EVENT_BUS_MESSAGE_TYPE_STREAM: "EVENT_BUS_MESSAGE_TYPE_STREAM",
  EVENT_BUS_MESSAGE_TYPE_PREVIEW: "EVENT_BUS_MESSAGE_TYPE_PREVIEW",
  EVENT_BUS_MESSAGE_TYPE_CONTENT: "EVENT_BUS_MESSAGE_TYPE_CONTENT",
  //
  THEME_MODE_TYPE: "THEME_MODE_TYPE",
  THEME_MODE_TYPE_LIGHT: "light",
  THEME_MODE_TYPE_DARK: "dark",
  THEME_MODE_TYPE_SYSTEM: "system",
  //
  THEME_NAME_TYPE: "THEME_NAME_TYPE",
  THEME_NAME_TYPE_DARK: "dark",
  THEME_NAME_TYPE_LIGHT: "light",
  //
  PLAY_AUDIO: "PLAY_AUDIO",
  //
  CONFIG_ENABLED: "CONFIG_ENABLED",
  CONFIG_API_HOST: "CONFIG_API_HOST",
  CONFIG_HTML_HTML: "CONFIG_HTML_HOST",
  //
  USER_TYPE_AGENT: "AGENT",
  USER_TYPE_SYSTEM: "SYSTEM",
  USER_TYPE_VISITOR: "VISITOR",
  USER_TYPE_ROBOT: "ROBOT",
  USER_TYPE_MEMBER: "MEMBER",
  USER_TYPE_ASSISTANT: "ASSISTANT",
  USER_TYPE_CHANNEL: "CHANNEL",
  USER_TYPE_LOCAL: "LOCAL",
  USER_TYPE_USER: "USER",
  //
  // 会话类型:工作组会话、访客跟客服一对一、同事一对一、群组会话
  THREAD_TYPE_AGENT: "AGENT",
  THREAD_TYPE_WORKGROUP: "WORKGROUP",
  THREAD_TYPE_KB: "KB",
  THREAD_TYPE_LLM: "LLM",
  THREAD_TYPE_MEMBER: "MEMBER",
  THREAD_TYPE_GROUP: "GROUP",
  THREAD_TYPE_LEAVEMSG: "LEAVEMSG",
  THREAD_TYPE_FEEDBACK: "FEEDBACK",
  THREAD_TYPE_ASSISTANT: "ASSISTANT",
  THREAD_TYPE_CHANNEL: "CHANNEL",
  THREAD_TYPE_LOCAL: "LOCAL",
  //
  THREAD_STATUS_QUEUING: "QUEUING", // 排队中
  THREAD_STATUS_NORMAL: "NORMAL", // 正常
  THREAD_STATUS_REENTER: "REENTER", // 会话进行中，访客关闭会话页面之后，重新进入
  THREAD_STATUS_REOPEN: "REOPEN", // 会话关闭之后，重新进入
  THREAD_STATUS_OFFLINE: "OFFLINE", // 客服不在线
  THREAD_STATUS_RATED: "RATED", // rated, prevent repeated rate
  THREAD_STATUS_AUTO_CLOSED: "AUTO_CLOSED",
  THREAD_STATUS_AGENT_CLOSED: "AGENT_CLOSED",
  THREAD_STATUS_DISMISSED: "DISMISSED", // 会话解散
  THREAD_STATUS_MUTED: "MUTED", // 会话静音
  THREAD_STATUS_FORBIDDEN: "FORBIDDEN", // 会话禁言
  THREAD_STATUS_MONITORED: "MONITORED", // 会话监控
  // 消息发送状态
  // 发送中
  MESSAGE_STATUS_SENDING: "SENDING", // sending
  MESSAGE_STATUS_TIMEOUT: "TIMEOUT", // network send failed
  MESSAGE_STATUS_BLOCKED: "BLOCKED", // in black list
  MESSAGE_STATUS_NOTFRIEND: "NOTFRIEND", // not friend
  MESSAGE_STATUS_ERROR: "ERROR", // other send error
  MESSAGE_STATUS_SUCCESS: "SUCCESS", // send success
  MESSAGE_STATUS_RECALL: "RECALL", // recall back
  MESSAGE_STATUS_DELIVERED: "DELIVERED", // send to the other client
  MESSAGE_STATUS_READ: "READ", // read by the other client
  MESSAGE_STATUS_DESTROYED: "DESTROYED", // destroyed after read
  MESSAGE_STATUS_UNPRECESSED: "UNPRECESSED", // not processed
  MESSAGE_STATUS_PROCESSED: "PROCESSED", // leave message processed
  MESSAGE_STATUS_LEAVE_MSG_SUBMIT: "LEAVE_MSG_SUBMIT", // 提交留言
  MESSAGE_STATUS_RATE_SUBMIT: "RATE_SUBMIT", // 提交会话评价
  MESSAGE_STATUS_RATE_CANCEL: "RATE_CANCEL", // 取消评价会话
  MESSAGE_STATUS_RATE_UP: "RATE_UP", // 评价消息up
  MESSAGE_STATUS_RATE_DOWN: "RATE_DOWN", // 评价消息down
  //
  // 消息类型
  MESSAGE_TYPE_WELCOME: "WELCOME",
  MESSAGE_TYPE_CONTINUE: "CONTINUE",
  MESSAGE_TYPE_SYSTEM: "SYSTEM",
  MESSAGE_TYPE_TEXT: "TEXT", // 文本消息类型
  MESSAGE_TYPE_IMAGE: "IMAGE", // 图片消息类型
  MESSAGE_TYPE_FILE: "FILE", // 文件消息类型
  MESSAGE_TYPE_AUDIO: "AUDIO", // 语音消息类型
  MESSAGE_TYPE_VIDEO: "VIDEO", // 视频消息类型
  MESSAGE_TYPE_MUSIC: "MUSIC",
  MESSAGE_TYPE_LOCATION: "LOCATION",
  MESSAGE_TYPE_GOODS: "GOODS",
  MESSAGE_TYPE_CARD: "CARD",
  MESSAGE_TYPE_EVENT: "EVENT",
  //
  MESSAGE_TYPE_GUESS: "GUESS", // 猜你想问
  MESSAGE_TYPE_HOT: "HOT", // 热门问题
  MESSAGE_TYPE_SHORTCUT: "SHORTCUT", // 快捷路径
  MESSAGE_TYPE_ORDER: "ORDER", // 订单
  MESSAGE_TYPE_POLL: "POLL", // 投票
  MESSAGE_TYPE_FORM: "FORM", // 表单：询前表单
  MESSAGE_TYPE_LEAVE_MSG: "LEAVE_MSG", // 留言
  MESSAGE_TYPE_LEAVE_MSG_SUBMIT: "LEAVE_MSG_SUBMIT", // 留言提交
  MESSAGE_TYPE_TICKET: "TICKET", // 客服工单
  MESSAGE_TYPE_TYPING: "TYPING", // 正在输入
  MESSAGE_TYPE_PROCESSING: "PROCESSING", // 正在处理，等待大模型回复中
  MESSAGE_TYPE_STREAM: "STREAM", // 流式消息TEXT，大模型回复
  MESSAGE_TYPE_PREVIEW: "PREVIEW", // 消息预知
  MESSAGE_TYPE_RECALL: "RECALL", // 撤回
  MESSAGE_TYPE_DELIVERED: "DELIVERED", // 回执: 已送达
  MESSAGE_TYPE_READ: "READ", // 回执: 已读
  MESSAGE_TYPE_QUOTATION: "QUOTATION", // qoute message
  MESSAGE_TYPE_KICKOFF: "KICKOFF", // kickoff other clients
  MESSAGE_TYPE_SHAKE: "SHAKE", // shake window
  //
  MESSAGE_TYPE_FAQ: "FAQ", // 常见问题FAQ
  MESSAGE_TYPE_FAQ_Q: "FAQ_Q", // 常见问题FAQ-问题
  MESSAGE_TYPE_FAQ_A: "FAQ_A", // 常见问题FAQ-答案
  MESSAGE_TYPE_FAQ_UP: "FAQ_UP", // 常见问题答案评价:UP
  MESSAGE_TYPE_FAQ_DOWN: "FAQ_DOWN", // 常见问题答案评价:DOWN
  MESSAGE_TYPE_ROBOT: "ROBOT", // 机器人
  MESSAGE_TYPE_ROBOT_UP: "ROBOT_UP", // 机器人答案评价:UP
  MESSAGE_TYPE_ROBOT_DOWN: "ROBOT_DOWN", // 机器人答案评价:DOWN
  //
  MESSAGE_TYPE_RATE: "RATE", // 访客主动评价
  MESSAGE_TYPE_RATE_INVITE: "RATE_INVITE", // 客服邀请评价
  MESSAGE_TYPE_RATE_SUBMIT: "RATE_SUBMIT", // 访客提交评价
  MESSAGE_TYPE_RATE_CANCEL: "RATE_CANCEL", // 访客取消评价
  //
  MESSAGE_TYPE_AUTO_CLOSED: "AUTO_CLOSED", // 自动关闭
  MESSAGE_TYPE_AGENT_CLOSED: "AGENT_CLOSED", // 客服关闭
  //
  MESSAGE_TYPE_TRANSFER: "TRANSFER", // 转接
  MESSAGE_TYPE_TRANSFER_ACCEPT: "TRANSFER_ACCEPT", // 转接-接受
  MESSAGE_TYPE_TRANSFER_REJECT: "TRANSFER_REJECT", // 转接-拒绝
  //
  MESSAGE_TYPE_INVITE: "INVITE", // 邀请
  MESSAGE_TYPE_INVITE_ACCEPT: "INVITE_ACCEPT", // 邀请-接受
  MESSAGE_TYPE_INVITE_REJECT: "INVITE_REJECT", // 邀请-拒绝
  //
  TOPIC_FILE_ASSISTANT: "file",
  TOPIC_SYSTEM_NOTIFICATION: "system",
  // 注意：没有 '/' 开头，防止stomp主题中奖 '/' 替换为 '.'之后，在最前面多余一个 '.'
  TOPIC_USER_PREFIX: "user/",
  // TOPIC_PRIVATE_PREFIX:"private/",
  // TOPIC_GROUP_PREFIX:"group/",
  TOPIC_FILE_PREFIX: "file/",
  TOPIC_SYSTEM_PREFIX: "system/",
  // TOPIC_ROBOT_PREFIX:"robot/",
  //
  TOPIC_ORGNIZATION_PREFIX: "org/",
  TOPIC_ORG_MEMBER_PREFIX: "org/member/",
  TOPIC_ORG_DEPARTMENT_PREFIX: "org/department/",
  TOPIC_ORG_GROUP_PREFIX: "org/group/",
  TOPIC_ORG_PRIVATE_PREFIX: "org/private/",
  TOPIC_ORG_ROBOT_PREFIX: "org/robot/",
  TOPIC_ORG_AGENT_PREFIX: "org/agent/",
  TOPIC_ORG_WORKGROUP_PREFIX: "org/workgroup/",
  TOPIC_ORG_KB_PREFIX: "org/kb/",
  TOPIC_ORG_KBDOC_PREFIX: "org/kbdoc/",
  //
  KB_TYPE_ASSISTANT: "ASSISTANT",
  KB_TYPE_HELPDOC: "HELPDOC",
  KB_TYPE_LLM: "LLM",
  KB_TYPE_KEYWORD: "KEYWORD",
  KB_TYPE_FAQ: "FAQ",
  KB_TYPE_QUICKREPLY: "QUICKREPLY",
  KB_TYPE_AUTOREPLY: "AUTOREPLY",
  KB_TYPE_BLOG: "BLOG",
  KB_TYPE_EMAIL: "EMAIL",
  KB_TYPE_TABOO: "TABOO",
  //
  UPLOAD_TYPE_CHAT: "CHAT",
  //
  AUTO_REPLY_TYPE_FIXED: "FIXED",
  AUTO_REPLY_TYPE_KEYWORD: "KEYWORD",
  AUTO_REPLY_TYPE_LLM: "LLM",
  // 
  EVENT_BUS_MESSAGE: 'BYTEDESK_EVENT_BUS_MESSAGE',
  // 连接中
  CONNECTION_STATUS_CONNECTING: 'connecting',
  // 连接成功
  CONNECTION_STATUS_CONNECTED: 'connected',
  // 连接断开
  CONNECTION_STATUS_DISCONNECTED: 'disconnncted',
  // 长连接状态
  EVENT_BUS_CONNECTION_STATUS: 'EVENT_BUS_CONNECTION_STATUS',




  // 
  // 下面的不动
  CHAT_URL: "",
  closable: "0",
  column: "1",
  history: "0",
  lang: "cn",
  color: "#ffffff",
  background: "#007bff",
  voiceMuted: false,
  v2robot: "0",
  // 短链
  shortCode: "",
  //
  hidden: false,
  browserTitle: "",
  websiteUrl: "",
  websiteTitle: "",
  refererUrl: "",
  preload: "0",
  //
  // uni_wid: "",
  // 是否还有更多历史记录
  hasMoreHistoryMessage: true,
  imageDialogVisible: false,
  currentImageUrl: "",
  currentVoiceUrl: "",
  // 表情面板
  show_emoji: false,
  emojiBaseUrl: "https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/",
  inputContent: "",
  messages: [],
  // 上传图片相关参数
  upload_headers: {
    "X-CSRF-TOKEN": "",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    Authorization: "Bearer "
  },
  upload_data: {
    file_name: "test.png",
    username: ""
  },
  upload_name: "file",
  // 接收图片服务器地址
  uploadImageServerUrl: "https://cdn.bytedesk.com/visitor/api/upload/image",
  // 上传图片结果集, 格式：{name: "", url: ""}
  uploadedImageList: [],
  //
  inputTipVisible: false,
  // 仅允许评价一次
  isRated: false,
  // 是否客服邀请评价
  isInviteRate: false,
  // 满意度评价对话框是否可见
  // rateDialogVisible: false,
  // 满意度评分
  rateScore: 5,
  // 满意度附言
  rateContent: "",
  // 留言
  showLeaveMessage: false,
  leaveMessageForm: {
    mobile: "",
    email: "",
    content: ""
  },
  //
  isLoading: false,
  stompClient: "",
  sessionId: "",
  preSessionId: "",
  browseInviteBIid: "",
  passport: {
    token: {
      access_token: "",
      expires_in: 0,
      jti: "",
      refresh_token: "",
      scope: "",
      token_type: ""
    }
  },
  // 左上角标题title
  title: "",
  adminUid: "",
  workGroupWid: "",
  workGroupNickname: "",
  workGroupAvatar: "",
  workGroupDescription: "",
  subDomain: "",
  client: "web_pc",
  //
  agentAvatar: '',
  agentNickname: '',
  agentDescription: "描述",
  thread: {
    id: 0,
    tid: "",
    topic: "",
    visitor: {
      uid: "",
      username: "",
      nickname: "",
      avatar: ""
    }
  },
  // 已经订阅的topic
  subscribedTopics: [],
  // 加载聊天记录offset
  page: 0,
  // 是否是最后一批聊天记录
  last: false,
  // workGroup/visitor/contact/group
  type: "workGroup",
  // 指定客服
  agentUid: "",
  // 当前访客用户名
  selfuser: "0",
  uid: "",
  avatar: "https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/chrome_default_avatar.png",
  username: "",
  password: "",
  nickname: "",
  access_token: "",
  // 本地存储access_token的key
  token: "bd_kfe_token",
  isConnected: false,
  answers: [],
  isRobot: false,
  // isAutoPop: false,
  // isThreadStarted: false,
  isThreadClosed: true,
  // 默认不自动请求会话
  noRequestThread: false,
  // 
  postscript: '',
  postScriptPrefix: '<附言>:',
  // 转人工关键词
  transferWords: [],
  //
  browserTitle: "",
  browserTabHidden: false,
  //
  questionnaireItemItems: Object,
  //
  emotionBaseUrl: "https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/",
  // 表情
  emotionMap: {
    "[微笑]": "100.gif",
    "[撇嘴]": "101.gif",
    "[色]": "102.gif",
    "[发呆]": "103.gif",
    "[得意]": "104.gif",
    "[流泪]": "105.gif",
    "[害羞]": "106.gif",
    "[闭嘴]": "107.gif",
    "[睡]": "108.gif",
    "[大哭]": "109.gif",

    "[尴尬]": "110.gif",
    "[发怒]": "111.gif",
    "[调皮]": "112.gif",
    "[呲牙]": "113.gif",
    "[惊讶]": "114.gif",
    "[难过]": "115.gif",
    "[酷]": "116.gif",
    "[冷汗]": "117.gif",
    "[抓狂]": "118.gif",
    "[吐]": "119.gif",

    "[偷笑]": "120.gif",
    "[愉快]": "121.gif",
    "[白眼]": "122.gif",
    "[傲慢]": "123.gif",
    "[饥饿]": "124.gif",
    "[困]": "125.gif",
    "[惊恐]": "126.gif",
    "[流汗]": "127.gif",
    "[憨笑]": "128.gif",
    "[悠闲]": "129.gif",

    "[奋斗]": "130.gif",
    "[咒骂]": "131.gif",
    "[疑问]": "132.gif",
    "[嘘]": "133.gif",
    "[晕]": "134.gif",
    "[疯了]": "135.gif",
    "[衰]": "136.gif",
    "[骷髅]": "137.gif",
    "[敲打]": "138.gif",
    "[再见]": "139.gif",

    "[擦汗]": "140.gif",
    "[抠鼻]": "141.gif",
    "[鼓掌]": "142.gif",
    "[糗大了]": "143.gif",
    "[坏笑]": "144.gif",
    "[左哼哼]": "145.gif",
    "[右哼哼]": "146.gif",
    "[哈欠]": "147.gif",
    "[鄙视]": "148.gif",
    "[委屈]": "149.gif",

    "[快哭]": "150.gif",
    "[阴险]": "151.gif",
    "[亲亲]": "152.gif",
    "[吓]": "153.gif",
    "[可怜]": "154.gif",
    "[菜刀]": "155.gif",
    "[西瓜]": "156.gif",
    "[啤酒]": "157.gif",
    "[篮球]": "158.gif",
    "[乒乓]": "159.gif",

    "[咖啡]": "160.gif",
    "[饭]": "161.gif",
    "[猪头]": "162.gif",
    "[玫瑰]": "163.gif",
    "[凋谢]": "164.gif",
    "[嘴唇]": "165.gif",
    "[爱心]": "166.gif",
    "[心碎]": "167.gif",
    "[蛋糕]": "168.gif",
    "[闪电]": "169.gif",

    "[炸弹]": "170.gif",
    "[刀]": "171.gif",
    "[足球]": "172.gif",
    "[瓢虫]": "173.gif",
    "[便便]": "174.gif",
    "[月亮]": "175.gif",
    "[太阳]": "176.gif",
    "[礼物]": "177.gif",
    "[拥抱]": "178.gif",
    "[强]": "179.gif",

    "[弱]": "180.gif",
    "[握手]": "181.gif",
    "[胜利]": "182.gif",
    "[抱拳]": "183.gif",
    "[勾引]": "184.gif",
    "[拳头]": "185.gif",
    "[差劲]": "186.gif",
    "[爱你]": "187.gif",
    "[No]": "188.gif",
    "[OK]": "189.gif",

    "[爱情]": "190.gif",
    "[飞吻]": "191.gif",
    "[跳跳]": "192.gif",
    "[发抖]": "193.gif",
    "[怄火]": "194.gif",
    "[转圈]": "195.gif",
    "[磕头]": "196.gif",
    "[回头]": "197.gif",
    "[跳绳]": "198.gif",
    "[投降]": "199.gif",

    "[激动]": "201.gif",
    "[乱舞]": "202.gif",
    "[献吻]": "203.gif",
    "[左太极]": "204.gif",
    "[右太极]": "205.gif"
  },
  // emoji表情, code代表来自微信端的表情字符，目前已经在服务器端处理替换为title字段，故code字段暂无用途
  emojis: [
    { title: "[微笑]", file: "100.gif" },
    { title: "[撇嘴]", file: "101.gif" },
    { title: "[色]", file: "102.gif" },
    { title: "[发呆]", file: "103.gif" },
    { title: "[得意]", file: "104.gif" },
    { title: "[流泪]", file: "105.gif" },
    { title: "[害羞]", file: "106.gif" },
    { title: "[闭嘴]", file: "107.gif" },
    { title: "[睡]", file: "108.gif" },
    { title: "[大哭]", file: "109.gif" },

    { title: "[尴尬]", file: "110.gif" },
    { title: "[发怒]", file: "111.gif" },
    { title: "[调皮]", file: "112.gif" },
    { title: "[呲牙]", file: "113.gif" },
    { title: "[惊讶]", file: "114.gif" },
    { title: "[难过]", file: "115.gif" },
    { title: "[酷]", file: "116.gif" },
    { title: "[冷汗]", file: "117.gif" },
    { title: "[抓狂]", file: "118.gif" },
    { title: "[吐]", file: "119.gif" },

    { title: "[偷笑]", file: "120.gif" },
    { title: "[愉快]", file: "121.gif" },
    { title: "[白眼]", file: "122.gif" },
    { title: "[傲慢]", file: "123.gif" },
    { title: "[饥饿]", file: "124.gif" },
    { title: "[困]", file: "125.gif" },
    { title: "[惊恐]", file: "126.gif" },
    { title: "[流汗]", file: "127.gif" },
    { title: "[憨笑]", file: "128.gif" },
    { title: "[悠闲]", file: "129.gif" },

    { title: "[奋斗]", file: "130.gif" },
    { title: "[咒骂]", file: "131.gif" },
    { title: "[疑问]", file: "132.gif" },
    { title: "[嘘]", file: "133.gif" },
    { title: "[晕]", file: "134.gif" },
    { title: "[疯了]", file: "135.gif" },
    { title: "[衰]", file: "136.gif" },
    { title: "[骷髅]", file: "137.gif" },
    { title: "[敲打]", file: "138.gif" },
    { title: "[再见]", file: "139.gif" },

    { title: "[擦汗]", file: "140.gif" },
    { title: "[抠鼻]", file: "141.gif" },
    { title: "[鼓掌]", file: "142.gif" },
    { title: "[糗大了]", file: "143.gif" },
    { title: "[坏笑]", file: "144.gif" },
    { title: "[左哼哼]", file: "145.gif" },
    { title: "[右哼哼]", file: "146.gif" },
    { title: "[哈欠]", file: "147.gif" },
    { title: "[鄙视]", file: "148.gif" },
    { title: "[委屈]", file: "149.gif" },

    { title: "[快哭]", file: "150.gif" },
    { title: "[阴险]", file: "151.gif" },
    { title: "[亲亲]", file: "152.gif" },
    { title: "[吓]", file: "153.gif" }
  ],
  //
  showEmoji: function () {
    return !bd_kfe_data.disabled() && bd_kfe_data.show_emoji;
  },
  disabled: function () {
    return bd_kfe_data.thread.tid === "";
  },
  sendButtonDisabled: function () {
    return bd_kfe_data.inputContent.trim().length === 0;
  },
  threadTopic: function () {
    return bd_kfe_data.thread.topic.replace(/\//g, ".");
  },
  show_header: function () {
    return true;
  },
  my_uid() {
    return bd_kfe_data.uid;
  },
  my_username() {
    return bd_kfe_data.username;
  },
  thread_nickname() {
    return (bd_kfe_data.nickname !== "null" && bd_kfe_data.nickname.trim().length > 0) ? bd_kfe_data.nickname : bd_kfe_data.thread.visitor.nickname;
  },
  my_nickname() {
    return (bd_kfe_data.nickname !== "null" && bd_kfe_data.nickname.trim().length > 0) ? bd_kfe_data.nickname : bd_kfe_data.thread.visitor.nickname;
  },
  my_avatar() {
    return (bd_kfe_data.avatar !== "null" && bd_kfe_data.avatar.trim().length > 0) ? bd_kfe_data.avatar : bd_kfe_data.thread.visitor.avatar;
  },
  connectedImage: function () {
    return bd_kfe_data.isConnected
      ? "https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connected.png"
      : "https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/disconnected.png";
  },
  // pc链接转h5链接
  getH5Url: function () {
    if (bd_kfe_data.type === 'appointed') {
      return bd_kfe_data.CHAT_URL + "/chat/h5/index.html?type=appointed&aid=" + bd_kfe_data.agentUid + "&selfuser=2&uid=" + bd_kfe_data.uid + "&p"
    } else {
      return bd_kfe_data.CHAT_URL + "/chat/h5/index.html?type=workGroup&wid=" + bd_kfe_data.workGroupWid + "&selfuser=2&uid=" + bd_kfe_data.uid + "&p"
    }
  }
};