document.getElementById("app-wrapper").style.display = '';
var options = {
    fullscreenEl: false, //关闭全屏按钮
};
Vue.use(vuePhotoPreview, options);
// 准备翻译的语言环境信息
const messages = {
    en: {
        title: 'Live Chat',
        contactAgent: 'contact agent',
        typing: 'typing...',
        sendLink: 'send link',
        agentChat: 'agent chat',
        viewFile: 'view file',
        arrived: 'arrived',
        readed: 'readed',
        sending: 'sending',
        error: 'error',
        leaveWord: 'leave message',
        name: 'name',
        inputName: 'input name',
        mobile: 'mobile',
        inputMobile: 'input mobile',
        leaveContent: 'leave content',
        email: 'email',
        inputEmail: 'input email',
        age: 'age',
        inputAge: 'input age',
        job: 'job',
        inputJob: 'input job',
        pleaseRate: 'please rate',
        veryGood: 'very good',
        good: 'good',
        average: 'average',
        notGood: 'not good',
        bad: 'very bad',
        submit: 'submit',
        inviteRate: "invite rate",
        rateResult: "rated",
        rate: 'rate',
        rateContent: 'rate content',
        pleaseInput: 'please input',
        rateAgain: 'cant rate again',
        continueChat: 'continue',
        agentCloseThread: "agent close thread",
        visitorCloseThread: "visitor close thread",
        autoCloseThread: "system close thread",
        agentOffline: "agent offline, please leave message",
        nonWorkingTime: "non working time",
        // systemUser: 'system user',
        postScriptPrefix: '<postScript>:',
        send: 'send',
        joinQueueThread: 'start chat',
        cancel: 'cancel',
        image: 'image',
        restart: 'restart',
        wrongMobileNum: 'wrong mobile number',
        ageMustBeNum: 'age must be number',
        contentMustNotNull: 'content must not be null',
        contentTooLong: 'content too long',
        wrongWid: 'wrong wid',
        queuing: 'queuing, please wait',
        networkDisconnected: 'network disconnected',
        networkConnected: 'network connected',
        helpfull: 'Helpfull',
        helpless: 'Helpless',
        copySuccess: 'Copy Success',
        requestForm: 'Request Form',
        moreHistory: 'More History',
        video: 'Video',
        file: 'File',
        // 

        //
        "i18n.app.title": "Bytedesk",
        "i18n.app.support": "support",
        "i18n.app.url": "https://www.weiyuai.cn",
        //
        "i18n.faq": "Faq",
        "i18n.rate": "Rate",
        "i18n.input.placeholder": "Please input",
        "i18n.load.more": "Load more",
        "i18n.typing": "Typing",
        "i18n.guess.faq": "Guess",
        "i18n.hot.faq": "Hot",
        "i18n.change.faq": "Change",
        //
        "i18n.file.assistant": "file assistant",
        "i18n.thread.content.image": "image",
        "i18n.thread.content.file": "file",
        "i18n.system.notification": "notification",
        //
        "i18n.top.tip": "Top Tip",
        "i18n.leavemsg.tip": "Leave a message",
        "i18n.welcome.tip": "What can i help you?",
        "i18n.reenter.tip": "continue chat",
        "i18n.under.development": "Under development",
        "i18n.user.description": "User Description",
        "i18n.robot.nickname": "DefaultRobot",
        "i18n.robot.description": "Default Robot Description",
        "i18n.robot.noreply": "Answer Not Found",
        "i18n.robot.agent.assistant.nickname": "DefaultAssistant",
        "i18n.llm.prompt":
            "You are a smart and helpful artificial intelligence, capable of providing useful, detailed, and polite answers to human questions.",
        "i18n.agent.nickname": "DefaultAgent",
        "i18n.agent.description": "Default Agent Description",
        "i18n.workgroup.nickname": "DefaultWorkgroup",
        "i18n.workgroup.description": "Default Workgroup Description",
        //
        "i18n.contact": "Ask Contact",
        "i18n.thanks": "Thanks",
        "i18n.welcome": "Welcome",
        "i18n.bye": "Bye",
        //
        "i18n.contact.title":
            "If it's convenient, please provide your contact number so that I can communicate with you via phone for a more intuitive conversation.",
        "i18n.contact.content":
            "If it's convenient, please provide your contact number so that I can communicate with you via phone for a more intuitive conversation.",
        "i18n.thanks.title":
            "Thank you for visiting, we look forward to seeing you again.",
        "i18n.thanks.content":
            "Thank you for visiting, we look forward to seeing you again.",
        "i18n.welcome.title": "Hello, how can I assist you?",
        "i18n.welcome.content": "Hello, how can I assist you?",
        "i18n.bye.title":
            "Your satisfaction is always our goal. If you have any questions, please feel free to contact us.",
        "i18n.bye.content":
            "Your satisfaction is always our goal. If you have any questions, please feel free to contact us.",
        "i18n.vip.api": "VIP API",
        "i18n.faq.category.demo.1": "CategoryDemo1",
        "i18n.faq.category.demo.2": "CategoryDemo2",
        "i18n.faq.demo.title.1": "FaqTitleText1",
        "i18n.faq.demo.content.1": "FaqContentText1",
        "i18n.faq.demo.title.2": "FaqTitleImage2",
        "i18n.faq.demo.content.2": "https://www.weiyuai.cn/logo.png",
        "i18n.quick.button.demo.title.1": "QuickButtonTitleText1",
        "i18n.quick.button.demo.content.1": "QuickButtonContentText1",
        "i18n.quick.button.demo.title.2": "QuickButtonTitleUrl2",
        "i18n.quick.button.demo.content.2": "https://www.weiyuai.cn",
        //
        "i18n.preview.title": "Preview",
        "i18n.cancel": "Cancel",
        "i18n.confirm": "Confirm",
        "i18n.send": "Send",
        "i18n.transferToAgent": "Transfer to Agent",
        "i18n.auto.closed": "Auto closed",
        "i18n.agent.closed": "Agent closed",
    },
    cn: {
        title: '在线客服',
        contactAgent: '联系客服',
        typing: '对方正在输入...',
        sendLink: '发送链接',
        agentChat: '人工客服',
        viewFile: '查看文件',
        arrived: '送达',
        readed: '已读',
        sending: '发送中',
        error: '错误',
        leaveWord: '留言',
        name: '姓名',
        inputName: '请输入姓名',
        mobile: '手机号',
        inputMobile: '请输入手机号',
        leaveContent: '留言内容',
        email: '邮箱',
        inputEmail: '请输入邮箱',
        age: '年龄',
        inputAge: '请输入年龄',
        job: '职业',
        inputJob: '请输入职业',
        pleaseRate: '请对我们服务做出评价',
        veryGood: '非常满意',
        good: '满意',
        average: '一般',
        notGood: '不满意',
        bad: '非常不满意',
        submit: '提交',
        inviteRate: "邀请评价",
        rateResult: "已评价",
        rate: '评价',
        rateContent: '评价内容',
        pleaseInput: '请简单描述您的问题',
        rateAgain: '不能重复评价',
        continueChat: '继续会话',
        agentCloseThread: "客服关闭会话",
        visitorCloseThread: "访客关闭会话",
        autoCloseThread: "长时间没有对话，系统自动关闭会话",
        agentOffline: "当前无客服在线，请留言",
        nonWorkingTime: "当前非工作时间，请自助查询或留言",
        // systemUser: '系统通知',
        postScriptPrefix: '<附言>:',
        send: '发送',
        joinQueueThread: '接入会话',
        cancel: '取消',
        image: '图片',
        restart: '重新开始',
        wrongMobileNum: '手机号错误',
        ageMustBeNum: '年龄必须为数字',
        contentMustNotNull: '消息不能为空',
        contentTooLong: '消息长度太长，请分多次发送',
        wrongWid: 'siteId或者工作组id错误',
        queuing: '排队中，请稍后',
        networkDisconnected: '网络断开',
        networkConnected: '网络恢复',
        helpfull: '有帮助',
        helpless: '没帮助',
        copySuccess: '复制成功',
        requestForm: '请求表单',
        moreHistory: '更多聊天记录',
        video: '视频',
        file: '文件',

        //
        "i18n.app.title": "微语",
        "i18n.app.support": "提供技术支持",
        "i18n.app.url": "https://www.weiyuai.cn",
        //
        "i18n.faq": "常见问题",
        "i18n.rate": "评价",
        "i18n.input.placeholder": "请输入内容",
        "i18n.load.more": "加载更多",
        "i18n.typing": "对方正在输入...",
        "i18n.guess.faq": "猜你相问",
        "i18n.hot.faq": "热门问题",
        "i18n.change.faq": "换一换",
        //
        "i18n.file.assistant": "文件助手",
        "i18n.thread.content.image": "图片",
        "i18n.thread.content.file": "文件",
        "i18n.system.notification": "系统通知",
        //
        "i18n.top.tip": "默认置顶语",
        "i18n.leavemsg.tip": "当前无客服在线，请留下联系方式",
        "i18n.welcome.tip": "您好，有什么可以帮您的?",
        "i18n.reenter.tip": "继续会话",
        "i18n.under.development": "开发中...",
        "i18n.user.description": "默认用户描述",
        "i18n.robot.nickname": "默认机器人",
        "i18n.robot.description": "默认机器人描述",
        "i18n.robot.noreply": "未找到相应答案",
        "i18n.robot.agent.assistant.nickname": "客服助手",
        "i18n.llm.prompt":
            "你是一个聪明、对人类有帮助的人工智能，你可以对人类提出的问题给出有用、详细、礼貌的回答",
        "i18n.agent.nickname": "默认客服",
        "i18n.agent.description": "默认客服描述",
        "i18n.workgroup.nickname": "默认技能组",
        "i18n.workgroup.description": "默认技能组描述",
        //
        "i18n.contact": "询问联系方式",
        "i18n.thanks": "感谢",
        "i18n.welcome": "问候",
        "i18n.bye": "告别",
        //
        "i18n.contact.title":
            "方便的话请您提供一下您的联系电话，我电话给您沟通一下，这样更加直观",
        "i18n.contact.content":
            "方便的话请您提供一下您的联系电话，我电话给您沟通一下，这样更加直观",
        "i18n.thanks.title": "感谢光临，欢迎再来",
        "i18n.thanks.content": "感谢光临，欢迎再来",
        "i18n.welcome.title": "您好，有什么可以帮您的",
        "i18n.welcome.content": "您好，有什么可以帮您的",
        "i18n.bye.title": "您的满意一直是我们的目标，如果有任何疑问欢迎您随时联系",
        "i18n.bye.content": "您的满意一直是我们的目标，如果有任何疑问欢迎您随时联系",
        "i18n.vip.api": "VIP接口，暂无权限，请联系：weiyuai.cn",
        "i18n.faq.category.demo.1": "常见问题分类Demo1",
        "i18n.faq.category.demo.2": "常见问题分类Demo2",
        "i18n.faq.demo.title.1": "常见问题文字Demo1",
        "i18n.faq.demo.content.1": "常见问题文字Demo1",
        "i18n.faq.demo.title.2": "常见问题图片Demo2",
        "i18n.faq.demo.content.2": "https://www.weiyuai.cn/logo.png",
        "i18n.quick.button.demo.title.1": "快捷按钮文字Demo1",
        "i18n.quick.button.demo.content.1": "快捷按钮文字Demo1",
        "i18n.quick.button.demo.title.2": "快捷按钮链接Demo2",
        "i18n.quick.button.demo.content.2": "https://www.weiyuai.cn",
        //
        "i18n.preview.title": "预览",
        "i18n.cancel": "取消",
        "i18n.confirm": "确定",
        "i18n.send": "发送",
        "i18n.transferToAgent": "转人工服务",
        "i18n.auto.closed": "会话自动关闭",
        "i18n.agent.closed": "客服关闭会话",
    }
};
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'cn', // 设置地区
    messages, // 设置地区信息
});
var app = new Vue({
    el: '#app',
    i18n,
    name: 'chat',
    data() {
        return {
            // 本地调试
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
            title: "微语",
            // 
            HTTP_CLIENT: 'web_h5',
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
            agentNickname: '',
            agentAvatar: 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images2/20230304103316icon-140.png',
            isInputingVisible: false,
            localPreviewContent: '',
            //
            imageDialogVisible: false,
            currentImageUrl: '',
            currentVoiceUrl: '',
            // show_emoji: false,
            inputContent: '',
            messages: [],
            //
            // 留言 + 表单
            realname: '',
            mobile: '',
            email: '',
            age: 0,
            job: '',
            content: '',
            //
            showRealname: false,
            showMobile: false,
            showEmail: false,
            showAge: false,
            showJob: false,
            showContent: false,
            // 仅允许评价一次
            isRated: false,
            // 是否客服邀请评价
            isInviteRate: false,
            // 满意度评分
            rateScore: 5,
            rateValue: '非常满意',
            // 满意度附言
            rateContent: '',
            //
            isLoading: false,
            stompClient: '',
            sessionId: '',
            preSessionId: '',
            browseInviteBIid: '',
            //
            access_token: '',
            passport: {
                token: {
                    access_token: '',
                }
            },
            // adminUid: '',
            workGroupWid: '',
            subDomain: '',
            client: 'web_h5',
            thread: {
                id: 0,
                uid: '',
                topic: '',
                type: '',
                visitor: {
                    uid: '',
                    nickname: 'visitor',
                    avatar: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/visitor_default_avatar.png'
                }
            },
            // 已经订阅的topic
            subscribedTopics: [],
            // 加载聊天记录offset
            page: 0,
            // 是否是最后一批聊天记录
            last: false,
            // workGroup/visitor/contact/group
            type: 'workGroup',
            // 指定客服
            agentUid: '',
            // 当前访客用户名
            selfuser: "0",
            uid: '',
            username: '',
            password: '',
            nickname: '',
            avatar: '',
            // 本地存储access_token的key
            token: 'bd_kfe_token',
            isConnected: false,
            answers: [],
            isRobot: false,
            isQueuing: false,
            isThreadStarted: false,
            isThreadClosed: false,
            isManulRequestThread: false,
            isRequestAgent: false,
            // focusStatus: true,
            leaveMessageTip: '',
            loadHistory: '0',
            robotUser: {
                uid: '',
                nickname: '',
                avatar: ''
            },
            //
            postscript: '',
            showScript: false,
            // 
            hideNav: false,
            // showEmbedNav: false,
            isEmbed: false,
            backUrl: '',
            topTip: '',
            showTopTip: false,
            closable: false,
            //
            showMessage: true,
            showInputBar: true,
            showLeaveMessage: false,
            showRate: false,
            showForm: false,
            //
            insertMessage: {},
            //
            showInputToolBar: true,
            showTransferButton: false,
            showPlusButton: true,
            showPlusPanel: false,
            showSendButton: false,
            showRestartPanel: false,
            //
            lang: 'cn',
            color: "#ffffff",
            background: "#007bff",
            v2robot: '0',
            //
            loadMoreVisible: false,
            loadHistoryTimer: '',
            sendMessageTimer: '',
            // 快捷按钮
            quickButtonArrow: '↓',
            showQuickButton: false,
            showQuickButtonItem: true,
            quickButtons: [],
            // 转人工关键词
            transferWords: [],
            // 是否在微信内运行
            isWeixinBrowser: false,
            isNetworkDisconnected: false,
            // 长按复制
            toucheX: 0,
            toucheY: 0,
            timeOutEvent: '',
            //
            emotionBaseUrl: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
            // 表情
            emotionMap: {
                '[微笑]': '100.gif',
                '[撇嘴]': '101.gif',
                '[色]': '102.gif',
                '[发呆]': '103.gif',
                '[得意]': '104.gif',
                '[流泪]': '105.gif',
                '[害羞]': '106.gif',
                '[闭嘴]': '107.gif',
                '[睡]': '108.gif',
                '[大哭]': '109.gif',

                '[尴尬]': '110.gif',
                '[发怒]': '111.gif',
                '[调皮]': '112.gif',
                '[呲牙]': '113.gif',
                '[惊讶]': '114.gif',
                '[难过]': '115.gif',
                '[酷]': '116.gif',
                '[冷汗]': '117.gif',
                '[抓狂]': '118.gif',
                '[吐]': '119.gif',

                '[偷笑]': '120.gif',
                '[愉快]': '121.gif',
                '[白眼]': '122.gif',
                '[傲慢]': '123.gif',
                '[饥饿]': '124.gif',
                '[困]': '125.gif',
                '[惊恐]': '126.gif',
                '[流汗]': '127.gif',
                '[憨笑]': '128.gif',
                '[悠闲]': '129.gif',

                '[奋斗]': '130.gif',
                '[咒骂]': '131.gif',
                '[疑问]': '132.gif',
                '[嘘]': '133.gif',
                '[晕]': '134.gif',
                '[疯了]': '135.gif',
                '[衰]': '136.gif',
                '[骷髅]': '137.gif',
                '[敲打]': '138.gif',
                '[再见]': '139.gif',

                '[擦汗]': '140.gif',
                '[抠鼻]': '141.gif',
                '[鼓掌]': '142.gif',
                '[糗大了]': '143.gif',
                '[坏笑]': '144.gif',
                '[左哼哼]': '145.gif',
                '[右哼哼]': '146.gif',
                '[哈欠]': '147.gif',
                '[鄙视]': '148.gif',
                '[委屈]': '149.gif',

                '[快哭]': '150.gif',
                '[阴险]': '151.gif',
                '[亲亲]': '152.gif',
                '[吓]': '153.gif',
                '[可怜]': '154.gif',
                '[菜刀]': '155.gif',
                '[西瓜]': '156.gif',
                '[啤酒]': '157.gif',
                '[篮球]': '158.gif',
                '[乒乓]': '159.gif',

                '[咖啡]': '160.gif',
                '[饭]': '161.gif',
                '[猪头]': '162.gif',
                '[玫瑰]': '163.gif',
                '[凋谢]': '164.gif',
                '[嘴唇]': '165.gif',
                '[爱心]': '166.gif',
                '[心碎]': '167.gif',
                '[蛋糕]': '168.gif',
                '[闪电]': '169.gif',

                '[炸弹]': '170.gif',
                '[刀]': '171.gif',
                '[足球]': '172.gif',
                '[瓢虫]': '173.gif',
                '[便便]': '174.gif',
                '[月亮]': '175.gif',
                '[太阳]': '176.gif',
                '[礼物]': '177.gif',
                '[拥抱]': '178.gif',
                '[强]': '179.gif',

                '[弱]': '180.gif',
                '[握手]': '181.gif',
                '[胜利]': '182.gif',
                '[抱拳]': '183.gif',
                '[勾引]': '184.gif',
                '[拳头]': '185.gif',
                '[差劲]': '186.gif',
                '[爱你]': '187.gif',
                '[No]': '188.gif',
                '[OK]': '189.gif',

                '[爱情]': '190.gif',
                '[飞吻]': '191.gif',
                '[跳跳]': '192.gif',
                '[发抖]': '193.gif',
                '[怄火]': '194.gif',
                '[转圈]': '195.gif',
                '[磕头]': '196.gif',
                '[回头]': '197.gif',
                '[跳绳]': '198.gif',
                '[投降]': '199.gif',

                '[激动]': '201.gif',
                '[乱舞]': '202.gif',
                '[献吻]': '203.gif',
                '[左太极]': '204.gif',
                '[右太极]': '205.gif'
            },
            // emoji表情, code代表来自微信端的表情字符，目前已经在服务器端处理替换为title字段，故code字段暂无用途
            emojis: [
                { title: '[微笑]', file: '100.gif' },
                { title: '[撇嘴]', file: '101.gif' },
                { title: '[色]', file: '102.gif' },
                { title: '[发呆]', file: '103.gif' },
                { title: '[得意]', file: '104.gif' },
                { title: '[流泪]', file: '105.gif' },
                { title: '[害羞]', file: '106.gif' },
                { title: '[闭嘴]', file: '107.gif' },
                { title: '[睡]', file: '108.gif' },
                { title: '[大哭]', file: '109.gif' },

                { title: '[尴尬]', file: '110.gif' },
                { title: '[发怒]', file: '111.gif' },
                { title: '[调皮]', file: '112.gif' },
                { title: '[呲牙]', file: '113.gif' },
                { title: '[惊讶]', file: '114.gif' },
                { title: '[难过]', file: '115.gif' },
                { title: '[酷]', file: '116.gif' },
                { title: '[冷汗]', file: '117.gif' },
                { title: '[抓狂]', file: '118.gif' },
                { title: '[吐]', file: '119.gif' },

                { title: '[偷笑]', file: '120.gif' },
                { title: '[愉快]', file: '121.gif' },
                { title: '[白眼]', file: '122.gif' },
                { title: '[傲慢]', file: '123.gif' },
                { title: '[饥饿]', file: '124.gif' },
                { title: '[困]', file: '125.gif' },
                { title: '[惊恐]', file: '126.gif' },
                { title: '[流汗]', file: '127.gif' },
                { title: '[憨笑]', file: '128.gif' },
                { title: '[悠闲]', file: '129.gif' },

                { title: '[奋斗]', file: '130.gif' },
                { title: '[咒骂]', file: '131.gif' },
                { title: '[疑问]', file: '132.gif' },
                { title: '[嘘]', file: '133.gif' },
                { title: '[晕]', file: '134.gif' },
                { title: '[疯了]', file: '135.gif' },
                { title: '[衰]', file: '136.gif' },
                { title: '[骷髅]', file: '137.gif' },
                { title: '[敲打]', file: '138.gif' },
                { title: '[再见]', file: '139.gif' },

                { title: '[擦汗]', file: '140.gif' },
                { title: '[抠鼻]', file: '141.gif' },
                { title: '[鼓掌]', file: '142.gif' },
                { title: '[糗大了]', file: '143.gif' },
                { title: '[坏笑]', file: '144.gif' },
                { title: '[左哼哼]', file: '145.gif' },
                { title: '[右哼哼]', file: '146.gif' },
                { title: '[哈欠]', file: '147.gif' },
                { title: '[鄙视]', file: '148.gif' },
                { title: '[委屈]', file: '149.gif' },

                { title: '[快哭]', file: '150.gif' },
                { title: '[阴险]', file: '151.gif' },
                { title: '[亲亲]', file: '152.gif' },
                { title: '[吓]', file: '153.gif' }
            ]
        };
    },
    watch: {
        inputContent: function (content) {
            // console.log('watch:', content)
            if (content.length > 0) {
                this.showPlusButton = false;
                this.showSendButton = true;
                this.showTransferButton = false
            } else {
                this.showSendButton = false;
                if (this.isRobot) {
                    this.showTransferButton = true
                } else {
                    this.showPlusButton = true;
                }
            }
            if (this.isRobot || this.isThreadClosed) {
                return;
            }
            this.localPreviewContent = content
            this.delaySendPreviewMessage()
        }
    },
    computed: {
        topTitle() {
            if (this.isInputingVisible) {
                return this.$t("typing")
            } else {
                return this.title
            }
        },
        disabled() {
            return this.thread.uid === '';
        },
        sendButtonDisabled() {
            return this.inputContent.trim().length === 0;
        },
        threadTopic() {
            return this.thread.topic.replace(/\//g, ".");
            //replaceAll(/\//ig, ".");//replace(/\//, ".");
        },
        show_header() {
            return true;
        },
        connectedImage() {
            return this.isConnected ? 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connected.png'
                : 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/disconnected.png';
        },
        leaveWordTip() {
            return this.$t('leaveWord');
        },
        nameTip() {
            return this.$t("name");
        },
        inputNameTip() {
            return this.$t("inputName")
        },
        mobileTip() {
            return this.$t("mobile")
        },
        inputMobileTip() {
            return this.$t("inputMobile")
        },
        leaveContentTip() {
            return this.$t("leaveContent")
        },
        emailTip() {
            return this.$t("email")
        },
        inputEmailTip() {
            return this.$t("inputEmail")
        },
        ageTip() {
            return this.$t("age")
        },
        inputAgeTip() {
            return this.$t("inputAge")
        },
        jobTip() {
            return this.$t("job")
        },
        inputJobTip() {
            return this.$t("inputJob")
        },
        pleaseRateTip() {
            return this.$t("pleaseRate")
        },
        veryGoodTip() {
            return this.$t("veryGood")
        },
        goodTip() {
            return this.$t("good")
        },
        averageTip() {
            return this.$t("average");
        },
        notGoodTip() {
            return this.$t("notGood");
        },
        badTip() {
            return this.$t("bad");
        },
        pleaseInputTip() {
            return this.$t("pleaseInput");
        },
        rateTip() {
            return this.$t('rate');
        },
        rateContentTip() {
            return this.$t('rateContent')
        },
        postScriptPrefixTip() {
            return this.$t('postScriptPrefix')
        },
        networkDisconnectedTip() {
            return this.$t('networkDisconnected')
        },
        networkConnectedTip() {
            return this.$t('networkConnected')
        }
    },
    methods: {
        closePage() {
            // console.log('closePage')
            window.parent.postMessage("bytedesk-close", '*');
        },
        switchPlusPanel() {
            this.showPlusPanel = !this.showPlusPanel
        },
        // TODO: 实现imageClicked函数
        switchAgent() {
            this.showLeaveMessage = false;
            this.isRobot = false;
            this.requestThread();
        },
        switchLeaveMessage() {
            this.showMessage = false;
            this.showInputBar = false;
            this.showLeaveMessage = true;
        },
        switchForm() {
            this.showMessage = false;
            this.showInputBar = false;
            this.showForm = true;
        },
        switchRate() {
            this.showMessage = false
            this.showInputBar = false
            this.showRate = true
        },
        switchMessage() {
            this.showMessage = true
            this.showInputBar = true
            this.showRate = false
            this.showForm = false
            this.showLeaveMessage = false
        },
        // switchRobot() {
        //     console.log('robot')
        //     this.showLeaveMessage = false;
        //     this.isRobot = true;
        //     this.requestRobot();
        // },
        imageClicked(imageUrl) {
            // console.log('image clicked:', imageUrl)
            window.open(imageUrl);
        },
        fileClicked(fileUrl) {
            window.open(fileUrl);
        },
        voiceClicked(voiceUrl) {
            window.open(voiceUrl);
        },
        videoClicked(videoOrShortUrl) {
            window.open(videoOrShortUrl);
        },
        is_self(message) {
            if (message.user == null) {
                return false
            }
            return message.user.uid === this.uid;
        },
        // 发送状态
        is_sending(message) {
            return message.status === this.MESSAGE_STATUS_SENDING
        },
        is_stored(message) {
            return message.status === this.MESSAGE_STATUS_SUCCESS
        },
        is_received(message) {
            return message.status === this.MESSAGE_STATUS_DELIVERED
        },
        is_error(message) {
            return message.status === this.MESSAGE_STATUS_ERROR
        },
        is_read(message) {
            return message.status === this.MESSAGE_STATUS_READ
        },
        can_recall(message) {
            return (
                this.callRecallMessage(message) &&
                this.is_self(message) &&
                (message.type === 'text' || message.type === 'image')
            );
        },
        // 检测是否在3分钟之内，允许撤回消息
        callRecallMessage(message) {
            let now = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
            let createdAt = moment(message.createdAt, "YYYY-MM-DD HH:mm:ss");
            let seconds = now.diff(createdAt, "seconds");
            // 现在距消息发送的时间差
            // console.log('seconds passed: ', seconds)
            if (seconds < 180) {
                return true;
            }
            return false;
        },
        // 消息类型
        is_type_text(message) {
            return message.type === this.MESSAGE_TYPE_WELCOME
				|| message.type === this.MESSAGE_TYPE_TEXT
        },
        is_type_robot(message) {
            return message.type === 'robot'
        },
        is_type_image(message) {
            return message.type === this.MESSAGE_TYPE_IMAGE
        },
        is_type_file(message) {
            return message.type === this.MESSAGE_TYPE_FILE
        },
        is_type_voice(message) {
            return message.type === this.MESSAGE_TYPE_AUDIO
        },
        is_type_video(message) {
            return message.type === this.MESSAGE_TYPE_VIDEO
        },
        is_type_notification(message) {
            return message.type === this.MESSAGE_TYPE_SYSTEM 
            || message.type === this.MESSAGE_TYPE_CONTINUE 
            || message.type === this.MESSAGE_TYPE_AUTO_CLOSED 
            || message.type === this.MESSAGE_TYPE_AGENT_CLOSED
        },
        my_uid() {
            return this.uid
        },
        my_username() {
            return this.username
        },
        thread_nickname() {
            return this.nickname.trim().length > 0 ? this.nickname : this.thread.user.nickname
        },
        my_nickname() {
            return this.nickname.trim().length > 0 ? this.nickname : this.thread.user.nickname
        },
        my_avatar() {
            return this.avatar.trim().length > 0 ? this.avatar : this.thread.user.avatar
        },
        jsonObject(content) {
            // console.log('parse json:', content);
            return content === null ? '{"categoryCode":"","content":"","id":"0","imageUrl":"","price":"","title":"","type":"commodity","url":""}' : JSON.parse(content)
        },
        // 识别链接, FIXME: 对于不带http(s)前缀的url，会被识别为子链接，点击链接无法跳出
        replaceUrl(content) {
            if (!content) {
                return content;
            }
            const urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[()~#&\-=?+%/.\w]+)?/g;
            return content.replace(urlPattern, (url) => {
                // console.log('url:', url)
                return `<a href="${url}" target="_blank">${url}</a>`;
            })
        },
        replaceUrlScheme(text) {
            const urlRegex = /(\b[a-z]+:\/\/\S+)/gi;
            return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        },
        //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
        //  再经过v-html 渲染成真正的图片
        replaceFace(content) {
            if (content === null || content === undefined) {
                return ''
            }
            // 识别链接
            let replaceUrl = this.replaceUrlScheme(content)
            //
            var emotionMap = this.emotionMap;
            var reg = /\[[\u4E00-\u9FA5NoOK]+\]/g
            var matchresult = replaceUrl.match(reg)
            var result = replaceUrl
            if (matchresult) {
                for (var i = 0; i < matchresult.length; i++) {
                    result = result.replace(matchresult[i], '<img height=\'25px\' width=\'25px\' style=\'margin-bottom:4px;\' src=\'' + this.emotionBaseUrl + emotionMap[matchresult[i]] + '\'>')
                }
            }
            return result
        },
        escapeHTML(content) {
            return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        handleImageDialogClose(done) {
            done()
        },
        scrollToBottom() {
            // 聊天记录滚动到最底部
            let vm = this;
            this.$nextTick(() => {
                const ulm = vm.$refs.listm;
                if (ulm != null) {
                    ulm.scrollTop = ulm.scrollHeight
                }
            })
        },
        // 长按弹出上拉操作面板
        onTouchStart(message, e) {
            // console.log('onTouchStart')
            this.toucheX = e.targetTouches[0].screenX
            this.toucheY = e.targetTouches[0].screenY
            // 开启定时器前先清除定时器，防止重复触发
            this.timeOutEvent && clearTimeout(this.timeOutEvent)
            // 显示上拉面板
            this.timeOutEvent = setTimeout(() => { 
                // 复制内容
                if (app.is_type_text(message)) {
                    app.copyToClip(message.content)
                } else if (app.is_type_image(message)) {
                    app.copyToClip(message.imageUrl);
                } else if (app.is_type_file(message)) {
                    app.copyToClip(message.fileUrl);
                } else if (app.is_type_voice(message)) {
                    app.copyToClip(message.voiceUrl);
                } else if (app.is_type_video(message)) {
                    app.copyToClip(message.videoOrShortUrl);
                } else {
                    app.copyToClip(message.content)
                }
             }, 500)
            e.preventDefault() // 阻止系统默认事件
        },
        onTouchMove(e) {
            // console.log('onTouchMove')
            const moveX = e.targetTouches[0].screenX
            const moveY = e.targetTouches[0].screenY
            // 解决vivo机型，手指没有move，touchmove事件仍然会调用而导致setTimeout被clear
            if (this.toucheX !== moveX || this.toucheY !== moveY) {
                // 手指滑动，清除定时器，中断长按逻辑
                this.timeOutEvent && clearTimeout(this.timeOutEvent)
            }
        },
        onTouchEnd() {
            // console.log('onTouchEnd')
            // 清除定时器，结束长按逻辑
            this.timeOutEvent && clearTimeout(this.timeOutEvent)
            // 若手指离开屏幕，时间小于我们设置的长按时间，则为点击事件
        },
        copyToClip(content) {
            //
            content = content.replaceAll("amp;", "");
            //
            var aux = document.createElement("input");
            aux.setAttribute("value", content);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            //
            app.$toast(this.$t('copySuccess'));
        },
        pushToMessageArray(message) {
            // 判断是否已经存在, 删除掉
            // let contains = false
            for (var i = this.messages.length - 1; i > 0; i--) {
                let msg = this.messages[i]
                if (msg.uid === message.uid) {
                    // contains = true
                    this.messages.splice(i, 1)
                }
            }
            // 保存
            // if (!contains) {
            this.messages.push(message);
            // 排序
            this.messages.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                    return 1
                }
                if (a.createdAt < b.createdAt) {
                    return -1
                }
                return 0
            });
            // }
            // 消息持久化到 localStorage, 当前消息条数大于100时，清空数据
            if (this.messages.length > 100) {
                localStorage.setItem(this.threadTopic, "")
            } else {
                let localMessages = JSON.stringify(this.messages);
                localStorage.setItem(this.threadTopic, localMessages)
            }
            // 查看大图刷新
            if (message.type === 'image') {
                app.$previewRefresh()
            }
        },
        // 获取URL参数
        getUrlParam(name) {
            // console.log('window.location:', window.location)
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null)
                return decodeURIComponent(r[2]);
            return null; //返回参数值
        },
        // 判断是否是在微信浏览器中打开
        isWeixin() {
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            if (isWeixin) {
                return true;
            } else {
                return false;
            }
        },
        // 初始化用户信息
        init () {
            let uid = localStorage.getItem(this.VISITOR_UID);
            let nickname = localStorage.getItem(this.VISITOR_NICKNAME);
            let avatar = localStorage.getItem(this.VISITOR_AVATAR);
            //
            let app = this
            $.ajax({
                url: app.BASE_URL + "/visitor/api/v1/init",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    'orgUid': app.org,
                    'uid': uid,
                    'nickname': nickname,
                    'avatar': avatar,
                    'client': app.HTTP_CLIENT
                },
                success: function (response) {
                    console.log('init:', uid, nickname, avatar, response)
                    //
                    app.uid = response.data.uid;
                    app.nickname = response.data.nickname;
                    app.avatar = response.data.avatar;
                    // 本地存储
                    localStorage.setItem(app.VISITOR_UID, app.uid);
                    localStorage.setItem(app.VISITOR_NICKNAME, app.nickname);
                    localStorage.setItem(app.VISITOR_AVATAR, app.avatar);
                    // 
                    app.requestThread(false)
                },
                error: function (error) {
                    console.log('init:', error);
                    //Do Something to handle error
                    // app.printLog(error);
                }
            });
        },
        requestThread(forceAgent = false) {
            this.$indicator.open();
            //
            $.ajax({
                url: this.BASE_URL +  "/visitor/api/v1/thread",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    'orgUid': this.org,
                    'type': this.t,
                    'sid': this.sid,
                    // 
                    'uid': this.uid,
                    'nickname': this.nickname,
                    'avatar': this.avatar,
                    // 
                    'forceAgent': forceAgent,
                    'client': this.HTTP_CLIENT
                },
                success: function (response) {
                    console.log('requestThread:', response);
                    // app.printLog('requestThread:' + JSON.stringify(response));
                    app.$indicator.close();
                    // 
                    app.dealWithThread(response)
                },
                error: function (error) {
                    console.log(error);
                }
            });
            // 发送指纹
            // this.fingerPrint2();
        },

        dealWithThread(response) {
            // console.log('dealWithThread:', response);
            let message = response.data;
            this.insertMessage = message
            //
            if (response.code === 200) {
                // 
                app.pushToMessageArray(message);
                // 1. 保存thread
                app.thread = message.thread;
            }
            // 设置窗口标题
            app.title = message.user.nickname;
            document.title = app.title;
            // 
            app.scrollToBottom();
            // 建立长连接
            app.byteDeskConnect();
            // 更新浏览记录
            // app.browse()
        },






        /**
         * 获取设备指纹
         */
        fingerPrint2() {
            // #获取全部
            var deviceInfo = DeviceInfo.getDeviceInfo({ domain: '' })
            // console.log(deviceInfo);
            var url = window.location.href;
            url = url.endsWith("#") ? url.substring(0, url.length - 1) : url;
            // console.log('fingerPrint2:', url, document.referrer)
            // 
            $.ajax({
                url: this.BASE_URL + "/api/fingerprint2/browser",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    browserInfo: encodeURI(deviceInfo.browserInfo),
                    deviceType: encodeURI(deviceInfo.deviceType),
                    fingerprint: encodeURI(deviceInfo.fingerprint),
                    language: encodeURI(deviceInfo.language),
                    os: encodeURI(deviceInfo.os),
                    osVersion: encodeURI(deviceInfo.osVersion),
                    referrer: encodeURI(document.referrer),
                    url: encodeURI(url),
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    console.log("fingerprint2: ", response);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        browse() {
            var url = window.location.href;
            url = url.endsWith("#") ? url.substring(0, url.length - 1) : url;
            //
            // console.log('browse uid:', this.thread.uid)
            // console.log('browse url: ', url);
            // console.log('browse preUrl: ', document.referrer);
            // console.log('browse title:', document.title)
            // 
            var title = document.title
            if (title && title.length > 6) {
                title = title.substring(0, 6)
            }
            // console.log('browse title2:', title)
            //
            $.ajax({
                url: this.BASE_URL +
                    "/api/thread/set/url",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    uid: app.thread.uid,
                    preUrl: encodeURI(document.referrer),
                    url: encodeURI(url),
                    title: encodeURI(title)
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    // console.log('response: ', response)
                },
                error: function (error) {
                    // bd_kfe_utils.printLog(error);
                    console.log(error);
                }
            });
        },
        // 手动点击请求会话
        manulRequestThread() {
            this.isManulRequestThread = true
            this.requestThread()
        },
        
        
        // 满意度评价
        rate() {
            // 隐藏满意度评价
            this.switchMessage()
            // 判断是否已经评价过，避免重复评价
            if (app.isRated) {
                // this.$message({ message: this.$t('rateAgain'), type: 'warning' });
                app.$toast(this.$t('rateAgain'))
                return;
            }
            if (this.rateValue === this.veryGoodTip) {
                this.rateScore = 5
            } else if (this.rateValue === this.goodTip) {
                this.rateScore = 4
            } else if (this.rateValue === this.averageTip) {
                this.rateScore = 3
            } else if (this.rateValue === this.notGoodTip) {
                this.rateScore = 2
            } else if (this.rateValue === this.badTip) {
                this.rateScore = 1
            }
            $.ajax({
                url: this.BASE_URL +
                    "/api/rate/do",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    uid: this.thread.uid,
                    score: this.rateScore,
                    note: this.rateContent,
                    invite: this.isInviteRate,
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    // console.log("rate: ", response);
                    app.isRated = true;
                },
                error: function (error) {
                    console.log(error);
                    
                }
            });
        },
        loadMoreMessages() {
            // console.log('loadMoreMessages')
            this.page += 1
            app.loadHistoryMessagesByTopic(app.thread.topic);
        },
        loadHistoryMessagesByTopic(topic) { 
            //
            if (this.isRequestAgent || this.isManulRequestThread || this.loadHistory === '0') {
                return;
            }
            $.ajax({
                url: this.BASE_URL +
                    "/api/messages/topic",
                type: "get",
                data: {
                    topic: topic,
                    page: this.page,
                    size: 10,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    console.log('loadHistoryMessagesByTopic: ', response);
                    if (response.status_code === 200) {
                        app.loadMoreVisible = !response.data.last
                        app.dealWithHistoryMessages(response)
                    } else if (app.loadHistory === '1') {
                        app.pushToMessageArray(app.insertMessage);
                    }
                    // app.scrollToBottom()
                    app.$previewRefresh()
                },
                error: function (error) {
                    console.log(error);
                    
                }
            });
        },
        // 加载最新10条消息，用于定时拉取最新消息
        loadLatestMessage() { 
            //
            let count = app.loadHistory ? 10 : 1
            $.ajax({
                url: this.BASE_URL + "/api/messages/topic",
                type: "get",
                data: {
                    topic: app.thread.topic,
                    page: 0,
                    size: count,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    // console.log('loadLatestMessage: ', response);
                    if (response.status_code === 200) {
                        app.dealWithHistoryMessages(response)
                    }
                    app.scrollToBottom()
                    app.$previewRefresh()
                },
                error: function (error) {
                    console.log(error);
                    
                }
            });
        },
        // 拉取未读消息
        loadMessagesUnread() {
            // 长链接正常 或 机器人状态下，不需要拉取
            if (app.isConnected || app.isRobot) {
                return
            }
            // 仅在长链接断开人工客服状态下拉取
            // $.ajax({
            //     url: this.BASE_URL + "/api/messages/unread/message/visitor/schedule",
            //     type: "get",
            //     data: {
            //         page: 0,
            //         size: 10,
            //         client: this.client
            //     },
            //     beforeSend: function (xhr) {
            //         xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
            //     },
            //     success: function (response) {
            //         // console.log('loadMessagesUnread: ', response);
            //         if (response.status_code === 200) {
            //             app.dealWithHistoryMessages(response)
            //         }
            //         app.scrollToBottom()
            //         app.$previewRefresh()
            //     },
            //     error: function (error) {
            //         console.log(error);
            //         // token过期
            //         app.login()
            //     }
            // });
        },
        // 
        dealWithHistoryMessages(response) {
            for (let i = 0; i < response.data.content.length; i++) {
                const message = response.data.content[i]
                // console.log('message:', message);
                if (message.type === 'notification_thread_reentry') {
                    // 连续的 ‘继续会话’ 消息，只显示最后一条
                    if (i + 1 < length) {
                        var nextmsg = response.data.content[i + 1];
                        if (nextmsg.type === 'notification_thread_reentry') {
                            continue
                        } else {
                            app.pushToMessageArray(message)
                        }
                    }
                } else {
                    app.pushToMessageArray(message)
                }
            }
        },
        // 切换
        switchQuickButtonItems() {
            this.showQuickButtonItem = !this.showQuickButtonItem
            if (this.showQuickButtonItem) {
                this.quickButtonArrow = '↓'
            } else {
                this.quickButtonArrow = '↑'
            }
        },
        quickButtonItemClicked(item) {
            // console.log(item)
        },
        // 拉取技能组-快捷按钮
        getQuickButtons() {
        },
        // 拉取技能组-转人工关键词
        getTransferWords() {
        },
        // 技能组设置
        getPrechatSettings() {
            //
            if (this.type !== 'workGroup') {
                return
            }
            $.ajax({
                url: this.BASE_URL + "/visitor/api/prechat/settings",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    wid: this.workGroupWid,
                    client: this.client
                },
                success: function (response) {
                    // console.log("fetch pre setting success:", response);
                    if (response.status_code === 200) {
                        //
                        app.showTopTip = response.data.showTopTip
                        app.topTip = response.data.topTip
                        //
                        if (response.data.showForm) {
                            app.showRealname = true
                            app.showMobile = true
                            app.switchForm()
                        }
                    }
                },
                error: function (error) {
                    console.log("fetch pre setting error:", error);
                    
                }
            });
        },
        // 留言
        leaveMessage() {
            //
            if (this.mobile.trim().length !== 11) {
                this.$toast('手机号错误');
                return
            }
            if (this.content.trim().length === 0) {
                this.$toast('留言内容不能为空');
                return
            }
            // 隐藏留言页面
            this.switchMessage()
            $.ajax({
                url: this.BASE_URL + "/api/leavemsg/save",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    wid: this.workGroupWid,
                    aid: this.agentUid,
                    type: this.type,
                    mobile: this.mobile,
                    email: '',
                    content: this.content,
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.bd_kfe_access_token);
                },
                success: function (response) {
                    // console.log("leave message: ", response);
                    if (response.status_code === 200) {
                        // 留言写到聊天记录
                        app.sendTextMessage(app.mobile + ':' + app.content)
                        app.$toast('留言成功');
                    } else {
                        app.$toast(response.message);
                    }
                },
                error: function (error) {
                    console.log(error);
                    app.$toast('留言失败');
                    
                }
            });
        },
        currentTimestamp(time = +new Date()) {
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ');
            // return moment().format('YYYY-MM-DD HH:mm:ss')
            // return ''
        },
        guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
            // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
            let timestamp = moment(new Date()).format('YYYYMMDDHHmmss')
            return timestamp + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
        },
        timeUuid() {
            return moment(new Date()).format('YYYYMMDDHHmmss')
        },
        cancelForm() {
            this.switchMessage()
        },
        submitForm() {
            // console.log('submit form')
            let formContent = JSON.stringify({
                'form': {
                    'realname': this.realname,
                    'mobile': this.mobile,
                    'email': this.email,
                    'age': this.age,
                    'job': this.job,
                }
            })
            if (this.mobile.length > 0 && this.mobile.length !== 11) {
                app.$toast(this.$t('wrongMobileNum'));
                return;
            }
            if (this.age.length > 0 && isNaN(this.age)) {
                app.$toast(this.$t('ageMustBeNum'));
                return;
            }
            var json = {
                "uid": this.guid(),
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'notification_form_result',
                "status": "stored",
                "user": {
                    "uid": this.my_uid(),
                    "username": this.my_username(),
                    "nickname": this.my_nickname(),
                    "avatar": this.my_avatar()
                },
                "form": {
                    "content": formContent
                },
                "thread": {
                    "uid": this.thread.uid,
                    "type": this.thread.type,
                    "content": "[表单]",
                    "nickname": this.my_nickname(),
                    "avatar": this.my_avatar(),
                    "topic": this.threadTopic,
                    "client": this.client,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            // console.log('form:', JSON.stringify(json))
            this.doSendMessage(json);
            //
            this.switchMessage()
            this.showRealname = false
            this.showMobile = false
            this.showEmail = false
            this.showAge = false
            this.showJob = false
        },
        // 发送消息
        // 必须添加前缀 '/topic/'
        subscribeTopic(topic) {
            // 防止重复订阅
            if (this.subscribedTopics.includes(topic)) {
                return;
            }
            this.subscribedTopics.push(topic);
            //
            this.stompClient.subscribe('/topic/' + topic, function (message) {
                // console.log('message :', message, 'body:', message.body);
                var messageObject = JSON.parse(message.body);
                app.onMessageReceived(messageObject);
            });
        },
        onMessageReceived(messageObject) {
            // console.log('received:', JSON.stringify(messageObject))
            if (!this.is_self(messageObject)) {
				switch (messageObject.type) {
					case this.MESSAGE_TYPE_READ:
					case this.MESSAGE_TYPE_DELIVERED:
						console.log("receive receipt message:", messageObject);
						this.updateMessageStatus(messageObject);
						return;
					case this.MESSAGE_TYPE_TYPING:
						// 通知界面显示typing
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_TYPING);
						return;
					case this.MESSAGE_TYPE_PROCESSING:
						// 通知界面显示processing
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_PROCESSING);
						return;
					case this.MESSAGE_TYPE_PREVIEW:
						return;
					case this.MESSAGE_TYPE_STREAM:
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_STREAM);
						break;
					default:
				}
				// 播放声音
				// playAudio();
				// 发送消息送达回执到服务器
				// sendReceiptMessage(orgUid, messageObject);
			} else {
				if (this.shouldReturn(messageObject)) {
					return;
				}
			}
			// 
			this.pushToMessageArray(messageObject);
			this.scrollToBottom()
        },
        updateMessageStatus(messageObject) {
			let app = this
			for (let i = app.messages.length - 1; i >= 0; i--) {
				const msg = app.messages[i]
				console.log('uid:', msg.uid, messageObject.uid)
				if (msg.uid === messageObject.content) {
					// 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
					// if (app.messages[i].status === 'read' ||
					// 	app.messages[i].status === 'received') {
					// 	return
					// }
					console.log("updateMessageStatus", messageObject.uid, messageObject.type)
					Vue.set(app.messages[i], 'status', messageObject.type)
					return
				}
			}
		},
        shouldReturn(message) {
            if (
              message.type === this.MESSAGE_TYPE_READ ||
              message.type === this.MESSAGE_TYPE_DELIVERED ||
              message.type === this.MESSAGE_TYPE_TYPING ||
              message.type === this.MESSAGE_TYPE_PREVIEW
            ) {
              return true;
            }
            return false;
        },
        // 输入框变化
        onInputChange(content) {
            // console.log(content);
            if (this.isRobot || this.isThreadClosed) {
                return;
            }
            this.localPreviewContent = content
            this.delaySendPreviewMessage()
        },
        sendPreviewMessage() {
        },
        // 发送消息
        onKeyUp(e) {
            if (e.keyCode === 13 && this.inputContent.trim().length > 0) {
                this.inputContent = this.inputContent.trim();
                this.sendTextMessage()
            }
        },
        sendTextMessage() {
            // 内容为空，则直接返回
            if (this.inputContent.trim().length === 0) {
                app.$toast(this.$t('contentMustNotNull'));
                return;
            }
            // 长度不能超过500
            if (this.inputContent.trim().length > 500) {
                app.$toast(this.$t('contentTooLong'));
                return;
            }
            // 发送/广播会话消息
			this.sendMessage(this.MESSAGE_TYPE_TEXT, this.inputContent)
            // 清空输入框
            this.inputContent = "";
            // 设置焦点
            setTimeout(function () {
                $("input")[1].focus()
            }, 100);
        },
        sendImageMessage(content) {
			this.sendMessage(this.MESSAGE_TYPE_IMAGE, content)
		},
        sendVoiceMessage(content) {
            this.sendMessage(this.MESSAGE_TYPE_VOICE, content)
        },
        sendVideoMessage(content) {
            this.sendMessage(this.MESSAGE_TYPE_VIDEO, content)
        },
        sendFileMessage(content) {
            this.sendMessage(this.MESSAGE_TYPE_FILE, content)
        },
        // 消息回执：收到消息之后回复给消息发送方 消息content字段存放status: 1. received, 2. read
        sendReceiptMessage(uid, status) {
        },
        // 消息撤回
        sendRecallMessage(uid) {
        },
        // 重新发送
        sendMessageJsonRest(uid, type, content) {
        },
        sendMessage(type, content) {
			//
			var messageExtra = {
				orgUid: this.orgUid
			}
			var json = {
				"uid": this.guid(),
				"type": type,
				"content": content,
				"status": this.MESSAGE_STATUS_SENDING,
				"createdAt": this.currentTimestamp(),
				"client": this.HTTP_CLIENT,
				"extra": JSON.stringify(messageExtra),
				"user": {
					"uid": this.uid,
					"nickname": this.nickname,
					"avatar": this.avatar
				},
				"thread": {
					"uid": this.thread.uid,
					"topic": this.thread.topic,
					"type": this.thread.type,
					"state": this.thread.state,
					"user": this.thread.user
				}
			};
			this.doSendMessage(json);
        },
        // 发送消息
        doSendMessage(jsonObject) {
            console.log("send message: ", jsonObject);
            //
            if (app.isConnected) {
                // 发送长连接消息
                app.stompClient.send("/app/" + this.threadTopic, {},
                    JSON.stringify(jsonObject)
                );
            } else {
                // 调用rest接口发送消息
                app.sendRestMessage(JSON.stringify(jsonObject))
            }
            // 先插入本地
            this.onMessageReceived(jsonObject)
        },
        // 在长连接断开的情况下，发送消息
        sendRestMessage(json) {
            if (app.isNetworkDisconnected) {
                app.$toast(this.networkDisconnectedTip)
                // return
            }
            $.ajax({
                url: this.BASE_URL + "/visitor/api/v1/message/send",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    json: json, 
                    client: this.HTTP_CLIENT
                }),
                success: function (response) {
                    // 更新消息发送状态
                    console.log("send rest message: ", response.data);
                    // 
                    let message = JSON.parse(response.data)
                    for (let i = app.messages.length - 1; i >= 0; i--) {
                        const msg = app.messages[i]
                        // console.log('uid:', msg.uid, message.uid)
                        if (msg.uid === message.uid) {
                            // 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
                            if (app.messages[i].status === 'read' ||
                                app.messages[i].status === 'received') {
                                return
                            }
                            Vue.set(app.messages[i], 'status', 'stored')
                            return;
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        // 重新发送
        resendButtonClicked(message) {
            // 5秒没有发送成功，则尝试使用http rest接口发送
            let content = ''
            if (message.type === 'text') {
                content = message.content
            } else if (message.type === 'image') {
                content = message.imageUrl
            } else if (message.type === 'file') {
                content = message.fileUrl
            } else if (message.type === 'voice') {
                content = message.voiceUrl
            } else if (message.type === 'video') {
                content = message.videoOrShortUrl
            } else if (message.type === 'commodity') {
                content = message.content
            } else {
                // 暂时仅重发上述类型消息
                return
            }
            this.sendMessageJsonRest(message.uid, message.type, content)
        },
        // 消息撤回
        recallButtonClicked(message) {
            this.$messagebox.confirm('确定要撤回消息?').then(action => {
                console.log('撤回:', action)
                if (action === 'confirm') {
                    app.sendRecallMessage(message.uid)
                }
            });
        },
        // 检测-消息是否超时发送失败
        checkTimeoutMessage() {
            for (let i = 0; i < this.messages.length; i++) {
                const message = this.messages[i];
                if (this.is_self(message) && this.is_sending(message)) {
                    let timestamp = moment(message.createdAt);
                    let now = moment(new Date());
                    let diff = now.diff(timestamp, "seconds");
                    // console.log('diff:', diff)
                    if (diff > 15) {
                        // 超时15秒，设置为消息状态为error
                        // this.messages[i].status = 'error'
                        Vue.set(this.messages[i], 'status', 'error')
                    } else if (diff > 3) {
                        // 5秒没有发送成功，则尝试使用http rest接口发送
                        this.resendButtonClicked(message)
                    }
                }
            }
        },
        //
        byteDeskConnect() {
            // var socket = new SockJS(this.STOMP_SOCKJS_URL);
            // this.stompClient = Stomp.over(socket);

            // https://jmesnil.net/stomp-websocket/doc/
            // https://github.com/pengjinning/stomp-websocket
            this.stompClient = Stomp.client(this.STOMP_WS_URL);
            this.stompClient.reconnect_delay = 1000;
            // client will send heartbeats every 10000ms, default 10000
            this.stompClient.heartbeat.outgoing = 20000;
            // client does not want to receive heartbeats from the server, default 10000
            this.stompClient.heartbeat.incoming = 20000;
            // 上线时打开下面注释，to disable logging, set it to an empty function:
            if (!this.IS_DEBUG) {
                this.stompClient.debug = function (value) { }
            }
            // 连接bytedesk，如果后台开启了登录，需要登录之后才行
            this.stompClient.connect({}, function (frame) {
                // console.log('stompConnected: ' + frame + " username：" + frame.headers['user-name']);
                app.isConnected = true;
                // 获取 websocket 连接的 sessionId
                // FIXME: Uncaught TypeError: Cannot read property '1' of null
                // app.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
                // console.log("connected, session id: " + app.sessionId);
                // 订阅会话消息，处理断开重连的情况
                if (app.thread.uid !== null && app.thread.uid !== undefined && app.thread.uid !== '') {
                    app.subscribeTopic(app.threadTopic);
                }
                // // 发送附言
                // if (app.postscript !== null && app.postscript !== undefined && app.postscript !== '') {
                //     let postcontent = app.postScriptPrefixTip + app.postscript
                //     app.sendTextMessageSync(postcontent)
                // }
                // // 技能组设置
                // app.getPrechatSettings();
                // 更新浏览记录
                // app.browse()
                // 接受通知
                // app.subscribeQueue('notification');
                // 订阅错误消息
                // app.subscribeQueue('errors');
            }, function (error) {
                console.log('连接断开【' + error + '】');
                app.isConnected = false;
                // 为断开重连做准备
                app.subscribedTopics = [];
                // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
                setTimeout(function () {
                    console.log("reconnecting...");
                    app.byteDeskConnect();
                }, 5000);
            })
        },
        // 打印log
        printLog(content) {
            if (this.IS_DEBUG) {
                console.log(content)
            }
        },
        uploadImageButtonClicked() {
            // console.log('click upload image button')
            // TODO: 待优化，去掉jquery依赖
            $('input[id=imagefile]').click();
        },
        uploadImage() {
            // console.log('uploadImage')
            var file = $('input[id=imagefile]')[0].files[0];
            this.uploadImage2(file)
        },
        uploadImage2(file) {
            // console.log('uploadImage2:', file.name)
            //
            this.compressImage(file, function (newFile) {
                console.log('compressImage callback:', newFile)
                // 
                var filename = app.timeUuid() + "_" + app.username + "_" + file.name;
                var formdata = new FormData();
                // 
                formdata.append("file", newFile);
                formdata.append("file_name", filename);
                formdata.append("file_type", newFile.type);
                formdata.append("is_avatar", "false");
                formdata.append("kb_type", app.UPLOAD_TYPE_CHAT);
                //
                formdata.append("visitor_uid", localStorage.getItem(app.VISITOR_UID));
                formdata.append("nickname", localStorage.getItem(app.VISITOR_NICKNAME));
                formdata.append("avatar", localStorage.getItem(app.VISITOR_AVATAR));
                //
                formdata.append("org_uid", localStorage.getItem(app.VISITOR_ORGUID));
                formdata.append("client", app.HTTP_CLIENT);
                //
                $.ajax({
                    url: app.UPLOAD_FILE_URL,
                    contentType: false,
                    cache: false,
                    processData: false,
                    mimeTypes: "multipart/form-data",
                    type: "post",
                    data: formdata,
                    success: function (response) {
                        // app.printLog('upload response:' + JSON.stringify(response.data))
                        console.log('upload image response:', response)
                        var imageUrl = response.data;
                        app.sendImageMessage(imageUrl);
                    },
                    error: function (error) {
                        app.printLog(error);
                        // token过期
                        app.login()
                    }
                });
            })
        },
        uploadVideoButtonClicked() {
            console.log('click upload video button')
            // TODO: 待优化，去掉jquery依赖
            $('input[id=videofile]').click();
        },
        uploadVideo() {
            var file = $('input[id=videofile]')[0].files[0];
            // TODO: 先在界面显示文件，并显示上传loading
            console.log('uploadVideo:', file)
            //
            var filename = app.timeUuid() + "_" + app.username + "_" + file.name;
            var formdata = new FormData();
            // 
            formdata.append("file", file);
            formdata.append("file_name", filename);
            formdata.append("file_type", file.type);
            formdata.append("is_avatar", "false");
            formdata.append("kb_type", app.UPLOAD_TYPE_CHAT);
            //
            formdata.append("visitor_uid", localStorage.getItem(app.VISITOR_UID));
            formdata.append("nickname", localStorage.getItem(app.VISITOR_NICKNAME));
            formdata.append("avatar", localStorage.getItem(app.VISITOR_AVATAR));
            //
            formdata.append("org_uid", localStorage.getItem(app.VISITOR_ORGUID));
            formdata.append("client", app.HTTP_CLIENT);
            //
            $.ajax({
                url: app.UPLOAD_FILE_URL,
                contentType: false,
                cache: false,
                processData: false,
                mimeTypes: "multipart/form-data",
                type: "post",
                data: formdata,
                success: function (response) {
                    // app.printLog('upload video response:' + JSON.stringify(response.data))
                    console.log('upload video response:', response)
                    var videoUrl = response.data;
                    app.sendVideoMessage(videoUrl);
                },
                error: function (error) {
                    app.printLog(error);
                }
            });
        },
        uploadFileButtonClicked() {
            console.log('click upload file button')
            // TODO: 待优化，去掉jquery依赖
            $('input[id=filefile]').click();
        },
        // 上传并发送文件
        uploadFile() {
            // TODO: 先在界面显示文件，并显示上传loading
            var file = $('input[id=filefile]')[0].files[0];
            console.log('uploadFile:', file)
            //
            var filename = app.timeUuid() + "_" + app.username + "_" + file.name;
            var formdata = new FormData();
            // 
            formdata.append("file", file);
            formdata.append("file_name", filename);
            formdata.append("file_type", file.type);
            formdata.append("is_avatar", "false");
            formdata.append("kb_type", app.UPLOAD_TYPE_CHAT);
            //
            formdata.append("visitor_uid", localStorage.getItem(app.VISITOR_UID));
            formdata.append("nickname", localStorage.getItem(app.VISITOR_NICKNAME));
            formdata.append("avatar", localStorage.getItem(app.VISITOR_AVATAR));
            //
            formdata.append("org_uid", localStorage.getItem(app.VISITOR_ORGUID));
            formdata.append("client", app.HTTP_CLIENT);
            //
            $.ajax({
                url: app.UPLOAD_FILE_URL,
                contentType: false,
                cache: false,
                processData: false,
                mimeTypes: "multipart/form-data",
                type: "post",
                data: formdata,
                success: function (response) {
                    // app.printLog('upload response:' + JSON.stringify(response.data))
                    console.log('upload file response:', response)
                    var fileUrl = response.data;
                    if (file.type.startsWith("image")) {
                        app.sendImageMessage(fileUrl);
                    } else if (file.type.startsWith("audio")) {
                        app.sendVoiceMessage(fileUrl);
                    } else if (file.type.startsWith("video")) {
                        app.sendVideoMessage(fileUrl);
                    } else {
                        app.sendFileMessage(fileUrl);
                    }
                },
                error: function (error) {
                    app.printLog(error);
                }
            });
        },
        compressImage(file, callback) {
            // 判断文件大小
            if (file.size > 1024 * 1024 * 1) {
                app.printLog('图片大于1M进行压缩')
                //
                app.canvasDataURL(file, function (blob) {
                    //
                    var newFile = new File([blob], file.name, {
                        type: file.type
                    })
                    var isLt1M;
                    if (file.size < newFile.size) {
                        isLt1M = file.size
                    } else {
                        isLt1M = newFile.size
                    }
                    app.printLog('file.size:' + (file.size / 1024 / 1024))
                    app.printLog('newFile.size: ' + (newFile.size / 1024 / 1024))
                    // 
                    if (file.size < newFile.size) {
                        callback(file)
                    }
                    callback(newFile)
                })
            } else {
                app.printLog('图片小于1M直接上传')
                // 
                return callback(file)
            }
        },
        // 图片压缩方法
        canvasDataURL(file, callback) {
            this.printLog('canvasDataURL')
            //
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
                const img = new Image()
                const quality = 0.3 // 图像质量
                const canvas = document.createElement('canvas')
                const drawer = canvas.getContext('2d')
                img.src = this.result
                img.onload = function () {
                    canvas.width = img.width
                    canvas.height = img.height
                    drawer.drawImage(img, 0, 0, canvas.width, canvas.height)
                    // 
                    return app.convertBase64UrlToBlob(canvas.toDataURL("image/jpeg", quality), callback);
                }
            }
        },
        // 将以base64的图片url数据转换为Blob
        convertBase64UrlToBlob(urlData, callback) {
            this.printLog('convertBase64UrlToBlob')
            // 
            var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
            //处理异常,将ascii码小于0的转换为大于0  
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            var blob = new Blob([ab], { type: 'image/jpeg' });
            // 
            callback(blob)
        },
        // 拖拽上传初始化
        initDragUpload() {
            // 拖拽上传发送文件
            var oDragWrap = document.body;
            //拖进
            oDragWrap.addEventListener(
                "dragenter",
                function (e) {
                    e.preventDefault();
                    // console.log('dragenter:')
                    // console.log(e)
                },
                false
            );
            //拖离
            oDragWrap.addEventListener(
                "dragleave",
                function (e) {
                    e.preventDefault();
                    // dragleaveHandler(e);
                    // console.log('dragleave:')
                    // console.log(e)
                },
                false
            );
            //拖来拖去 , 一定要注意dragover事件一定要清除默认事件
            //不然会无法触发后面的drop事件
            oDragWrap.addEventListener(
                "dragover",
                function (e) {
                    e.preventDefault();
                    // console.log('dragover:')
                    // console.log(e)
                },
                false
            );
            //扔
            oDragWrap.addEventListener(
                "drop",
                function (e) {
                    dropHandler(e);
                    // console.log('drop:')
                    // console.log(e)
                },
                false
            );
            var dropHandler = function (e) {
                // 将本地图片拖拽到页面中后要进行的处理都在这
                e.preventDefault(); //获取文件列表
                // console.log('dropHandler:')
                // console.log(e)
                // 
                var fileList = e.dataTransfer.files;
                // 检测是否是拖拽文件到页面的操作
                if (fileList.length == 0) {
                    return;
                }
                // 检测文件是不是图片
                if (fileList[0].type.indexOf("image") === -1) {
                    return;
                }
                // 上传文件，并发送
                let file = fileList[0]
                if (/\.(gif|jpg|jpeg|png|webp|GIF|JPG|PNG|WEBP)$/.test(file.name)) {
                    // 发送图片
                    app.uploadImage2(file)
                    return
                }
                // 发送其他文件
                app.uploadFile(file)
            };
        },
        initPasteUpload() {
            // 监听输入框粘贴图片，支持qq、微信等截图
            document.getElementById('input-without-transfer').addEventListener('paste', function (e) {
                // 添加到事件对象中的访问系统剪贴板的接口
                var clipboardData = e.clipboardData,
                    i = 0,
                    items, item, types;
                if (clipboardData) {
                    items = clipboardData.items;
                    if (!items) {
                        return;
                    }
                    item = items[0];
                    // 保存在剪贴板中的数据类型
                    types = clipboardData.types || [];
                    for (; i < types.length; i++) {
                        if (types[i] === 'Files') {
                            item = items[i];
                            break;
                        }
                    }
                    // 判断是否为图片数据
                    if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                        // bd_kfe_utils.imgReader(item);
                        var file = item.getAsFile();
                        app.uploadImage2(file)
                    }
                }
            });
        }
    },
    directives: {
        focus: {
            // When the bound element is inserted into the DOM...
            inserted: function (el) {
                el.focus()
            }
        }
    },
    created() {
        // 
        this.org = this.getUrlParam("org");
        this.t = this.getUrlParam("t");
        this.sid = this.getUrlParam("sid");
        this.lang = this.getUrlParam("lang") === null ? 'cn' : this.getUrlParam("lang");
        this.ref = this.getUrlParam("ref") === null ? '' : this.getUrlParam("ref");
        this.navbar = this.getUrlParam("navbar") === null ? '0' : this.getUrlParam("navbar");
        this.theme = this.getUrlParam("theme") === null ? 'system' : this.getUrlParam("theme");
        // 
        this.init()
        // 
        // console.log("created:", localStorage.iframe);
        // this.subDomain = this.getUrlParam("sub");
        // this.type = this.getUrlParam("type");
        // this.thread.type = this.type.toLowerCase();
        // //
        // this.workGroupWid = this.getUrlParam("wid") === null ? '' : this.getUrlParam("wid");
        // this.agentUid = this.getUrlParam("aid") === null ? '' : this.getUrlParam("aid");
        // this.nickname = this.getUrlParam("nickname") === null ? '' : this.getUrlParam("nickname");
        // this.avatar = this.getUrlParam("avatar") === null ? '' : this.getUrlParam("avatar");
        // this.loadHistory = this.getUrlParam("history");
        // if (this.loadHistory === '1') {
        //     this.loadMoreVisible = true
        // }
        // this.postscript = this.getUrlParam("postscript");
        // this.showScript = this.getUrlParam("showScript") === '1' ? true : false;
        // // this.hideNav = this.getUrlParam("hidenav") === '0' ? false : true;
        // this.hideNav = this.getUrlParam("hidenav") === '1' ? true : false;
        // this.isEmbed = this.getUrlParam("isembed") === '1' ? true : false;
        // this.closable = this.getUrlParam("closable") === '1' ? true : false;
        // this.backUrl = (this.getUrlParam("backurl") === null || this.getUrlParam("backurl") === '') ? document.referrer : this.getUrlParam("backurl");
        // this.lang = this.getUrlParam("lang") === null ? 'cn' : this.getUrlParam("lang");
        // this.color = this.getUrlParam("color") === null ? '#ffffff' : this.getUrlParam("color");
        // this.background = this.getUrlParam("background") === null ? '#007bff' : this.getUrlParam("background");
        // this.v2robot = this.getUrlParam("v2robot") === null ? '0' : this.getUrlParam("v2robot");
        // this.$i18n.locale = this.lang
        this.delaySendPreviewMessage = _.debounce(this.sendPreviewMessage, 1500)
        // //
        // $("#page-header").css("color", this.color);
        // $("#page-header").css("background-color", this.background);
        // // 
        // this.selfuser = this.getUrlParam("selfuser");
    },
    mounted() {
        // 使ie支持startsWith
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            };
        }
        // 使ie支持includes
        if (!String.prototype.includes) {
            String.prototype.includes = function (str) {
                var returnValue = false;
                if (this.indexOf(str) !== -1) {
                    returnValue = true;
                }
                return returnValue;
            };
        }
        // 使ie支持endsWith
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
        }
        // 防止长连接断开，则定时刷新聊天记录
        // this.loadHistoryTimer = setInterval(this.loadLatestMessage, 1000 * 10);
        // TODO: 智能调节时长，如果长时间没有未读消息，则拉取时间间隔逐渐加长
        this.loadHistoryTimer = setInterval(this.loadMessagesUnread, 1000 * 5);
        this.sendMessageTimer = setInterval(this.checkTimeoutMessage, 1000);
        // console.log('h5 websiteUrl:', window.location.href, 'h5 refererUrl:', document.referrer)
        // 初始化拖拽上传
        this.initDragUpload()
        // ctrl + v粘贴到输入框
        this.initPasteUpload()
        // 
        let app = this
        document.addEventListener("WeixinJSBridgeReady", function () {
            console.log('WeixinJSBridgeReady')
            app.isWeixinBrowser = true
        }, false);
        // 监听网络状态
        window.addEventListener("online", function () {
            // console.log("网络恢复");
            app.isNetworkDisconnected = false
            app.$toast(app.networkConnectedTip)
            $("#input-without-transfer").attr("placeholder", app.pleaseInputTip)
            // 拉取未读消息
            app.loadMessagesUnread()
        });
        window.addEventListener("offline", function () {
            // console.log("网络已断开");
            app.isNetworkDisconnected = true
            app.$toast(app.networkDisconnectedTip)
            $("#input-without-transfer").attr("placeholder", app.networkDisconnectedTip)
        });
    },
    beforeDestroy() {
        clearInterval(this.loadHistoryTimer);
        clearInterval(this.sendMessageTimer);
    }
});
