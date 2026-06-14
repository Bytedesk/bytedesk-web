const basicDemoFieldDocs = {
  isDebug: '是否开启调试日志。开发联调时建议开启，生产环境通常关闭。',
  forceRefresh: '是否强制刷新聊天页或 iframe 资源，适合调试缓存问题。',
  apiUrl: '接口服务根地址，用于访客初始化、未读数、反馈上传等 API 请求。',
  htmlUrl: '聊天页面站点根地址。推荐只传站点根路径，由 chatPath/threadPath/webrtcPath/callPath 控制页面类型。',
  chatPath: '文本聊天页面路径，showChat() 默认使用该路径。',
  threadPath: '历史会话页面路径，showThread() 会切换到该路径。',
  webrtcPath: '音视频页面路径，showWebrtc() 会切换到该路径。',
  callPath: '呼叫中心页面路径，showCall() 会切换到该路径。',
  locale: '界面语言，例如 zh-cn、en、ja-jp。会写入聊天 URL 的 lang 参数。',
  placement: '入口按钮与聊天窗停靠位置，支持 bottom-left 和 bottom-right。',
  marginBottom: '入口距离底部的间距，单位 px。',
  marginSide: '入口距离左右边缘的间距，单位 px。',
  autoPopup: '初始化完成后是否自动弹出聊天窗口。',
  autoPopupDelay: '自动弹出的延迟时间，单位毫秒。',
  draggable: '是否允许拖动入口模块。开启后用户可拖动按钮位置。',
  tabsConfig: '控制聊天页内置 tab 的显隐，包括 help、thread、messages。',
  bubbleConfig: '控制入口上方提示气泡，包括标题、副标题、多条轮播、切换方式等。',
  buttonConfig: '单入口按钮配置。只有一个入口时通常使用这个对象。',
  buttonsConfig: '多入口按钮数组。配置后优先级高于 buttonConfig，用于同时展示 chat、thread、webrtc、call、二维码等入口。',
  inviteConfig: '邀请弹窗配置，可控制显示时机、循环、按钮文案与回调。',
  theme: '主题与配色配置，包括 light/dark/system 模式、文字色和背景色。',
  animation: '聊天窗口显示/隐藏时的动画时长和缓动函数。',
  window: '聊天窗口宽高配置，桌面端以该尺寸渲染。',
  onInit: 'SDK 初始化完成回调。适合记录埋点或通知宿主页面。',
  onShowChat: '聊天窗口显示后触发。',
  onHideChat: '聊天窗口隐藏后触发。',
  onMessage: '接收 iframe 或 SDK 内部消息时触发，可用于联动页面状态。',
  onConfigChange: '配置被更新后触发，方便观测配置变更。',
  onVisitorInfo: '访客初始化完成后返回 uid 与 visitorUid，适合保存到业务系统。',
  'theme.mode': '主题模式，可选 light、dark、system。',
  'theme.textColor': '入口按钮或模块内文字颜色。',
  'theme.backgroundColor': '入口按钮、导航或模块背景主色。',
  'bubble.show': '是否显示入口上方提示气泡。',
  'bubble.icon': '单条气泡默认图标。',
  'bubble.title': '单条气泡标题。',
  'bubble.subtitle': '单条气泡副标题。',
  'bubble.messages': '多条气泡文案数组。配置后优先于 icon/title/subtitle 单条配置。',
  'bubble.autoRotate': '是否自动轮播多条气泡消息。',
  'bubble.rotateInterval': '气泡轮播间隔，单位毫秒。',
  'bubble.switchMode': '轮播方式，可选 fade、slide-up、ticker。',
  'button.show': '是否显示该入口按钮。',
  'button.icon': '按钮图标，通常使用 emoji 或简短符号。',
  'button.text': '按钮文字。单入口圆形按钮建议不传，多入口矩形模块建议传入。',
  'button.width': '按钮宽度，单位 px。',
  'button.height': '按钮高度，单位 px。',
  'button.action': '内置入口类型，可选 chat、thread、webrtc、call。未传 onClick 时按 action 自动调用对应入口。',
  'button.previewImageUrl': '鼠标悬浮时展示的图片地址，适合放企微/个微二维码。',
  'button.previewImageAlt': '预览图片说明文案，会显示在二维码大图下方。',
  'button.onClick': '自定义点击逻辑。传入后会覆盖默认 action 行为。',
  'invite.show': '是否启用邀请弹窗。',
  'invite.text': '邀请内容文案。',
  'invite.icon': '邀请弹窗图标。',
  'invite.delay': '首次显示邀请弹窗的延迟时间。',
  'invite.loop': '是否循环显示邀请弹窗。',
  'invite.loopDelay': '循环显示的间隔时间。',
  'invite.loopCount': '循环显示次数。',
  'invite.acceptText': '接受邀请按钮文案。',
  'invite.rejectText': '拒绝邀请按钮文案。',
  'invite.onAccept': '用户接受邀请时触发。',
  'invite.onReject': '用户拒绝邀请时触发。',
  'invite.onClose': '邀请弹窗关闭时触发。',
  'invite.onOpen': '邀请弹窗打开时触发。',
  'chat.org': '组织 ID，必填。',
  'chat.t': '会话类型，必填。t=0 代表客服一对一，t=1 代表工作组，t=2 代表机器人。',
  'chat.sid': '会话目标 ID，必填。',
  'chat.uid': '系统内部用户 ID，通常由 SDK 自动维护，不建议手动传。',
  'chat.visitorUid': '业务侧自定义访客唯一标识，用于跨端识别同一访客。',
  'chat.nickname': '访客昵称。',
  'chat.avatar': '访客头像地址。',
  'chat.mobile': '访客手机号。',
  'chat.email': '访客邮箱。',
  'chat.note': '客服侧可见的备注信息。',
  'chat.channel': '渠道来源标识，例如官网、App、小程序。',
  'chat.goodsInfo': '商品信息，适合电商场景透传。',
  'chat.orderInfo': '订单信息，适合售后或订单咨询场景。',
  'chat.extra': '额外扩展字段，通常传 JSON 字符串。',
  'chat.vipLevel': '会员等级。',
  'chat.debug': '区分本地测试和线上环境的业务标记。',
  'chat.draft': '灰度标识，会透传为 URL draft=1。',
  'chat.settingsUid': '设置唯一 ID，主要用于调试配置。',
  'chat.loadHistory': '是否加载历史消息。loadHistory=1 时打开对话页面默认加载历史聊天记录。',
  'chat.threadDetail': '是否显示会话详情按钮。threadDetail=1 时显示，默认不显示。',
  'chat.visitorProfile': '是否显示访客资料按钮。visitorProfile=1 时显示，默认不显示。',
  'chat.custom': '支持继续追加其他自定义业务字段，都会被拼入聊天 URL 参数。',
  'browse.referrer': '来源页面地址。',
  'browse.url': '当前页面 URL。',
  'browse.title': '当前页面标题。',
  'browse.custom': '支持继续追加业务浏览信息，例如页面 ID、活动来源等。',
  'feedback.enabled': '是否启用文档反馈能力。',
  'feedback.trigger': '触发方式，可选 selection、button、both。',
  'feedback.showOnSelection': '选中文本时是否展示反馈入口。',
  'feedback.selectionText': '选中文字时的提示文案。',
  'feedback.buttonText': '固定反馈按钮文案。',
  'feedback.dialogTitle': '反馈对话框标题。',
  'feedback.placeholder': '反馈输入框占位文本。',
  'feedback.submitText': '提交按钮文案。',
  'feedback.cancelText': '取消按钮文案。',
  'feedback.successMessage': '提交成功后的提示文案。',
  'feedback.categoryNames': '反馈问题分类列表。',
  'feedback.requiredTypes': '是否强制至少选择一个问题分类。',
  'feedback.typesSectionTitle': '分类区域标题。',
  'feedback.typesDescription': '分类说明文案，例如“可多选”。',
  'feedback.submitScreenshot': '是否连同截图一起提交。',
  'feedback.onSubmit': '自定义反馈提交流程。',
  'feedback.onCancel': '取消反馈时触发。',
  'animation.enabled': '是否启用聊天窗口动画。',
  'animation.duration': '动画持续时间，单位毫秒。',
  'animation.type': '缓动类型，可选 ease、linear、ease-in、ease-out、ease-in-out。',
  'window.width': '桌面端聊天窗口宽度。',
  'window.height': '桌面端聊天窗口高度。',
  'tabs.messages': '是否显示消息 tab。',
  'tabs.thread': '是否显示历史会话 tab。',
  'tabs.help': '是否显示帮助 tab。',
} as const;

export const zhCn = {
  common: {
    languageLabel: '语言',
    languageOptions: {
      en: 'English',
      'zh-cn': '简体中文',
      'zh-tw': '繁体中文',
      'ja-jp': '日本語',
      'ko-kr': '한국어',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Español',
      'fr-fr': 'Français',
      'th-th': 'ไทย'
    },
    themeLabel: '主题模式',
    themeOptions: {
      light: '浅色',
      dark: '深色',
      system: '跟随系统'
    },
    officialSiteLabel: '微语官网',
    resetAnonymousVisitorLabel: '重置匿名访客',
    resetAnonymousVisitorSuccess: '匿名访客已重置',
    docLinks: {
      react: '查看 React 集成文档',
      vue: '查看 Vue 集成文档',
      reactExample: 'React 基础集成代码示例',
      vueExample: 'Vue 基础集成代码示例',
      userInfo: '查看用户信息对接文档',
      goodsInfo: '查看商品信息对接文档',
      orderInfo: '查看订单信息对接文档',
      vipLevel: '查看千人千面对接文档',
      unreadCount: 'React 未读消息计数代码示例',
      documentFeedback: '文档反馈功能说明'
    },
    buttons: {
      openChat: '打开聊天',
      openChatWithParams: '带参数打开聊天',
      closeChat: '关闭聊天',
      showButton: '显示按钮',
      hideButton: '隐藏按钮',
      showBubble: '显示气泡',
      hideBubble: '隐藏气泡',
      showInvite: '显示邀请',
      hideInvite: '隐藏邀请',
      togglePlacement: '切换位置',
      toggleThemeColor: '切换主题色',
      reset: '重置',
      copy: '复制',
      submit: '提交',
      cancel: '取消',
      openInNewWindow: '弹窗单独窗口',
      openInNewTab: '打开新Tab页'
    },
    apiHintPrefix: '调用代码：'
  },
  nav: {
    more: '更多',
    basicDemo: '⚙️ 基本配置',
    userInfoDemo: '👤 用户信息对接',
    goodsInfoDemo: '🛒 商品信息对接',
    orderInfoDemo: '📦 订单信息对接',
    vipLevelDemo: '👑 千人千面对接',
    unreadCountDemo: '🔔 未读消息数对接',
    threadHistoryDemo: '🧵 历史会话演示',
    helpcenterDemo: '❔ 帮助中心演示',
    videoSupportDemo: '🎥 视频客服演示',
    webrtcDemo: '📹 音视频客服演示',
    callCenterDemo: '📞 电话客服演示',
    proactiveDemo: '🎯 主动获客演示',
    voiceAgentDemo: '🎙️ 语音助手演示',
    videoConferenceDemo: '🎬 视频会议演示',
    documentFeedbackDemo: '📝 文档反馈演示',
    flightBookingDemo: '✈️ 机票预定演示'
  },
  pages: {
    basicDemo: {
      title: '微语基本设置',
      intro: '通过下方按钮可以快速体验 Bytedesk Web SDK 的常见能力。',
      themeButtonLabel: '切换导航颜色',
      themeTextButtonLabel: '切换导航字体颜色',
      bubbleTitle: '需要帮助吗？',
      bubbleSubtitle: '点击开始对话',
      placement: {
        bottomLeft: '左下角',
        bottomRight: '右下角'
      },
      navbarLabel: '隐藏上方导航',
      navbarHidden: '是',
      navbarShown: '否',
      navbarParamPurpose: '是否隐藏顶部导航栏。navbar=0 时隐藏导航。',
      qrCodeParamLabel: '显示二维码按钮',
      threadDetailParamLabel: '显示会话详情按钮',
      visitorProfileParamLabel: '显示访客资料按钮',
      loadHistoryLabel: '加载历史消息',
      loadHistoryEnabled: '是',
      loadHistoryDisabled: '否',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: '默认',
      defaultTextColorLabel: '默认',
      currentConfigTitle: '当前配置',
      copyConfig: '复制配置 JSON',
      urlParamsTitle: '参数说明',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（客服 / 工作组 / 机器人）',
        'visitorUid：传给独立页的自定义访客 ID（可选）',
        'nickname / avatar：聊天页展示的访客信息（可选）',
        'lang：独立页使用的语言参数',
        'mode：主题模式（light / dark）',
        'backgroundColor / textColor：悬浮入口主题颜色',
        'navbar：是否隐藏顶部导航栏',
        'qrcode：是否显示当前对话二维码按钮（1：显示，0：隐藏）',
        'threadDetail：是否显示会话详情按钮（1：显示，默认不显示）',
        'visitorProfile：是否显示访客资料按钮（1：显示，默认不显示）',
        'loadHistory：是否加载历史会话消息',
        'title：启用后传入自定义聊天标题',
        'browse：传给页面的浏览上下文 JSON'
      ],
      manualEncodeHint: '手动拼接 URL 时，建议对 nickname、avatar、title 和 browse JSON 使用 encodeURIComponent 编码。',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      title: '第三方业务系统用户信息对接演示',
      description:
        '本示例演示如何将第三方业务系统中的用户信息（visitorUid、nickname、avatar 等）通过配置参数传入客服组件，方便客服快速识别当前访客并关联业务上下文。点击下方按钮可以切换不同的业务系统测试用户。',
      switchUser: '切换用户',
      switchToUserLabel: '切换到 {{name}}',
      switchAnonymousUserLabel: '切换到匿名用户',
      anonymousUserLabel: '匿名用户',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar 等用户信息',
      currentUserTitle: '当前业务系统用户信息',
      currentUserIdLabel: '用户ID',
      currentUserNicknameLabel: '昵称',
      contactSupport: '咨询客服',
      inviteText: '您好，请问有什么可以帮您？',
      docLinks: {
        userInfoDoc: '查看第三方业务系统用户信息对接文档',
        reactExample: 'React 第三方业务系统用户信息对接代码示例',
        vueExample: 'Vue 第三方业务系统用户信息对接代码示例'
      },
      controlPanel: {
        title: '微语接口控制面板',
        chatWindow: '聊天窗口控制',
        button: '按钮控制',
        bubble: '气泡消息控制',
        invite: '邀请对话框控制'
      },
      urlGuideTitle: '当前独立窗口完整 URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明（用于 /chat）',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（推荐）',
        'nickname/avatar：访客展示信息（可选）',
        'mobile/email/note：用户附加信息（可选）',
        'extra：自定义扩展字段，建议传 JSON 字符串（可选）',
        'lang/mode：语言与主题参数（可选）'
      ],
      sampleUrlLabel: '当前配置生成的示例 URL',
      parameterLabel: '参数',
      currentValueLabel: '当前值',
      purposeLabel: '说明',
      requiredLabel: '必填',
      optionalLabel: '可选',
      manualEncodeHint: '手动拼接 URL 时，建议对 nickname、avatar、email、note、extra 使用 encodeURIComponent 编码。',
      switchApiTitle: '切换用户后的接口调用（仅嵌入式集成）',
      switchApiDescription: '以下说明仅适用于以嵌入式方式集成 bytedesk-web SDK 的场景。在你自己的应用中更新 chatConfig 时，当前传给 SDK 的访客参数会变化，但 SDK 仍会把访客身份缓存到 localStorage。切换用户后，建议再调用一次访客初始化接口，让 SDK 按最新 visitorUid 重新校验并刷新缓存身份。',
      switchApiNotes: [
        '实名用户切换：更新 visitorUid、nickname、avatar 后，调用 initVisitor()，让 SDK 用最新用户信息重新走一遍访客初始化接口。',
        '匿名用户切换：先调用 resetAnonymousVisitor() 清掉已缓存的访客 UID，再调用 initVisitor() 重新初始化匿名访客。',
        '如果你是通过 showChat(...)、新标签页或新窗口打开会话，建议在切换用户并完成上述调用后再打开，这样生成的 URL 和当前用户信息保持一致。'
      ],
      apiHintPrefix: '调用代码：',
      users: {
        user1: '用户小明',
        user2: '用户小红',
        user3: '用户小美'
      }
    },
    goodsInfoDemo: {
      title: '商品信息对接演示',
      description:
        '通过配置参数将商品编号、名称、图片、描述、价格、链接与标签传入客服组件，方便客服即时了解商品上下文。',
      docLinks: {
        goodsDoc: '查看商品信息对接文档',
        reactExample: 'React 商品信息演示源码',
        vueExample: 'Vue 商品信息演示源码'
      },
      infoCardTitle: '商品详情',
      tagsLabel: '标签',
      descriptionLabel: '商品介绍',
      priceLabel: '售价',
      contactSupport: '咨询客服',
      product: {
        title: '比亚迪 仰望U7 豪华纯电轿车',
        description:
          '仰望U7 采用最新一代刀片电池平台，续航里程最高可达 1000 公里，支持 L3 级智能驾驶，内饰配备全景天窗与豪华材质。',
        tags: ['新能源', '豪华轿车', '智能驾驶', '长续航']
      },
      controlPanel: {
        title: '微语接口控制面板',
        chatWindow: '聊天窗口控制'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明（用于 /chat）',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（可选）',
        'nickname/avatar：访客展示信息（可选）',
        'goodsInfo：商品信息 JSON 字符串（推荐）',
        'extra：扩展字段 JSON 字符串（可选）',
        'lang/mode：语言与主题参数（可选）'
      ],
      sampleUrlLabel: '当前配置生成的示例 URL',
      payloadGuideTitle: 'goodsInfo 参数组成与转换',
      payloadObjectLabel: 'Step 1：业务对象（Object）',
      payloadJsonLabel: 'Step 2：JSON 字符串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 编码结果（encodeURIComponent）',
      payloadNotesTitle: '转换说明',
      payloadNotes: [
        'goodsInfo 建议先按对象组装，再 JSON.stringify 后传入 chatConfig。',
        'URL 直连场景可直接传编码后的 goodsInfo；SDK 内部使用 URLSearchParams 时会自动编码。',
        'goodsInfo.extra 通常是字符串化 JSON，用于承载 sku/库存等附加字段。',
        '若字段较多，优先保留 uid/title/image/price 等核心字段，避免 URL 过长。'
      ],
      shopGoodsCardTitle: '店铺与商品（紧凑列表）',
      currentShopLabel: '当前店铺',
      consultGoodsBtn: '咨询该商品',
      consultParamsLabel: '咨询参数',
      goodsPayloadCardTitle: '当前发送的商品参数',
      goodsStringifyHint: '如何将商品对象转为字符串并传入配置：',
      urlParamsCardTitle: '当前 URL 参数列表',
      standaloneUrlLabel: '单独窗口 / 新标签页 URL',
      paramNameCol: '参数名',
      paramValueCol: '当前值',
      paramPurposeCol: '参数说明',
      requiredLabel: '必填',
      optionalLabel: '可选',
      goodsUrlHint: '如何将商品参数拼接到 URL 中：',
      urlParamPurposes: {
        org: '租户标识（Org UID）',
        t: '会话类型。t=0 客服一对一，t=1 工作组，t=2 机器人',
        sid: '客服 UID / 工作组 UID / 机器人 UID',
        visitorUid: '访客唯一标识',
        nickname: '访客昵称',
        avatar: '访客头像 URL',
        goodsInfo: '商品信息（JSON 字符串），包含商品名称、图片、价格、链接等。需使用 JSON.stringify 转换后传入',
        extra: '自定义扩展参数（JSON）',
        lang: '界面语言',
        mode: '颜色主题模式（light / dark / auto）',
      }
    },
    orderInfoDemo: {
      title: '订单信息对接演示',
      description:
        '向对话中同步订单编号、状态、支付方式与收货信息，帮助客服更快处理售后问题。',
      docLinks: {
        orderDoc: '查看订单信息对接文档',
        reactExample: 'React 订单信息演示源码',
        vueExample: 'Vue 订单信息演示源码'
      },
      sections: {
        statusTimeline: '订单状态',
        orderInfo: '订单信息',
        goodsInfo: '商品信息',
        shippingInfo: '收货信息'
      },
      labels: {
        orderId: '订单编号',
        orderTime: '下单时间',
        orderStatus: '订单状态',
        paymentMethod: '支付方式',
        totalAmount: '订单金额',
        unitPrice: '单价',
        quantity: '数量',
        receiver: '收货人',
        phone: '联系电话',
        address: '收货地址'
      },
      statusText: {
        pending: '待支付',
        paid: '已支付',
        shipped: '已发货',
        delivered: '已完成'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明（用于 /chat）',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（可选）',
        'nickname/avatar：访客展示信息（可选）',
        'orderInfo：订单信息 JSON 字符串（推荐）',
        'extra：扩展字段 JSON 字符串（可选）',
        'lang/mode：语言与主题参数（可选）'
      ],
      sampleUrlLabel: '当前配置生成的示例 URL',
      payloadGuideTitle: 'orderInfo 参数组成与转换',
      payloadObjectLabel: 'Step 1：业务对象（Object）',
      payloadJsonLabel: 'Step 2：JSON 字符串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 编码结果（encodeURIComponent）',
      payloadNotesTitle: '转换说明',
      payloadNotes: [
        'orderInfo 建议先组装完整订单对象，再 JSON.stringify 后传入 chatConfig。',
        'URL 直连场景可传编码后的 orderInfo；使用 URLSearchParams 拼接时会自动编码。',
        'orderInfo.goods 与 orderInfo.shippingAddress 建议保留关键字段，便于客服快速定位问题。',
        'status 建议使用稳定枚举值（如 paid/shipped），statusText 用于展示文案。'
      ],
      currentDemoUserLabel: '当前 demo-user',
      orderListCardTitle: '订单列表（紧凑）',
      currentUserLabel: '当前用户',
      currentIndicator: '【当前】',
      noOrdersText: '当前用户暂无订单',
      consultOrderBtn: '咨询该订单',
      anonymousNoOrderAlert: '匿名用户无订单数据，当前咨询不会携带订单参数',
      consultParamsLabel: '咨询参数',
      orderPayloadCardTitle: '当前发送的订单参数',
      orderStringifyHint: '如何将订单对象转为字符串并传入配置：',
      urlParamsCardTitle: '当前 URL 参数列表',
      standaloneUrlLabel: '单独窗口 / 新标签页 URL',
      paramNameCol: '参数名',
      paramValueCol: '当前值',
      paramPurposeCol: '参数说明',
      requiredLabel: '必填',
      optionalLabel: '可选',
      orderUrlHint: '如何将订单参数拼接到 URL 中：',
      urlParamPurposes: {
        org: '租户标识（Org UID）',
        t: '会话类型。t=0 客服一对一，t=1 工作组，t=2 机器人',
        sid: '客服 UID / 工作组 UID / 机器人 UID',
        visitorUid: '访客唯一标识',
        nickname: '访客昵称',
        avatar: '访客头像 URL',
        orderInfo: '订单信息（JSON 字符串），包含订单号、商品、金额、收货地址等。需使用 JSON.stringify 转换后传入',
        extra: '自定义扩展参数（JSON）',
        lang: '界面语言',
        mode: '颜色主题模式（light / dark / auto）',
      }
    },
    vipLevelDemo: {
      title: '千人千面对接演示',
      description:
        '传入 vipLevel 等自定义字段，在客服端呈现会员等级，打造差异化体验。',
      docLinks: {
        vipDoc: '查看千人千面对接文档',
        reactExample: 'React 千人千面演示源码',
        vueExample: 'Vue 千人千面演示源码'
      },
      vipLabel: 'VIP 等级',
      normalLabel: '普通用户',
      vipPrefix: 'VIP',
      switchButtonLabel: '切换到 {{name}}',
      users: {
        user1: '普通体验账号',
        user2: 'VIP1 体验账号',
        user3: 'VIP2 体验账号'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（推荐）',
        'nickname/avatar：访客展示信息（可选）',
        'vipLevel：访客 VIP 等级（建议传 0-10 的整数）',
        'extra：扩展字段 JSON 字符串（可选）',
        'lang/mode：语言与主题参数（可选）'
      ],
      sampleUrlLabel: '当前配置生成的示例 URL',
      payloadGuideTitle: 'vipLevel 参数组成与转换',
      payloadObjectLabel: 'Step 1：业务对象（Object）',
      payloadJsonLabel: 'Step 2：JSON 字符串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 编码结果（encodeURIComponent）',
      payloadNotesTitle: '转换说明',
      payloadNotes: [
        'vipLevel 建议使用稳定整数等级（如 0-10），便于客服侧命中分层策略。',
        'extra 建议先组装对象，再 JSON.stringify 后传入 chatConfig。',
        'URL 直连场景可传编码后的 extra；使用 URLSearchParams 拼接时会自动编码。',
        '当用户等级变更时，建议重新初始化组件或刷新会话参数。'
      ]
    },
    unreadCountDemo: {
      title: '微语未读消息计数示例',
      description: '演示如何调用 getUnreadMessageCount 与 clearUnreadMessages，保证页面与客服端状态一致，并支持业务侧手动控制悬浮按钮角标。',
      currentCount: '当前未读消息数',
      manualTitle: '手动角标控制',
      manualCountLabel: '未读数',
      currentBadgeMode: '当前角标模式',
      badgeModes: {
        hidden: '不显示',
        dot: '红点',
        count: '数字'
      },
      docLinks: {
        unreadDoc: '查看未读消息对接文档',
        reactExample: 'React 未读消息演示源码',
        vueExample: 'Vue 未读消息演示源码'
      },
      buttons: {
        markAllRead: '标记全部已读',
        refresh: '刷新未读消息数',
        applyManualCount: '设置未读数',
        showDot: '显示红点',
        clearBadge: '清空角标'
      },
      usageNotesTitle: '使用提示',
      usageNotes: [
        '在需要时调用 getUnreadMessageCount() 以获取最新未读数。',
        '阅读完成后可调用 clearUnreadMessages() 将未读数清零。',
        '如需手动同步业务侧未读总数，可调用 setUnreadMessageCount(count) 直接更新悬浮按钮角标。',
        '如只需提醒有新消息而不暴露具体数量，可调用 showUnreadDot() 显示红点。',
        '如无需发请求、只想本地移除角标，可调用 clearUnreadBadge()。'
      ],
      urlGuideTitle: '接口 URL + 参数调用说明',
      countApiLabel: '获取未读数接口（GET）',
      clearApiLabel: '清空未读数接口（POST）',
      manualCountApiLabel: '手动设置数字角标接口',
      showDotApiLabel: '显示红点接口',
      clearBadgeApiLabel: '清空角标接口',
      urlParamsTitle: '公共参数说明（与 SDK 内部实现一致）',
      urlParams: [
        'uid：系统访客 UID（来自本地 BYTEDESK_UID）',
        'visitorUid：前端自定义访客 UID（可选，建议传）',
        'orgUid：组织 ID（来自 chatConfig.org）',
        'client：客户端类型（SDK 内部固定追加 WEB_FLOAT）'
      ],
      sampleUrlLabel: '获取未读数示例请求 URL',
      sampleBodyLabel: '清空未读数示例请求体（POST Body）',
      apiNotesTitle: '实现说明',
      apiNotes: [
        'getUnreadMessageCount() 对应 GET /visitor/api/v1/message/unread/count。',
        'clearUnreadMessages() 对应 POST /visitor/api/v1/message/unread/clear。',
        'setUnreadMessageCount()、showUnreadDot()、clearUnreadBadge() 属于本地角标控制接口，不会发起 HTTP 请求。',
        'SDK 会先从 localStorage 读取 BYTEDESK_UID，并结合 chatConfig.visitorUid/chatConfig.org 组装参数。',
        '当 uid 为空时，getUnreadMessageCount() 会直接返回 0，不发起请求。'
      ]
    },
    threadHistoryDemo: {
      title: '访客历史会话拉取示例',
      description: '参考 visitor 项目中的 ThreadList，演示如何让 SDK 图标点击后进入 /chat/thread 历史会话页面。',
      bubbleTitle: '历史会话',
      bubbleSubtitle: '点击查看历史会话列表',
      anonymousUserLabel: '匿名用户',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      pathAlert: '本页已启用 chatPath=/chat/thread，点击右下角图标会打开历史会话页面而不是聊天页。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '其余参数与 /chat 页面保持一致',
      usageTitle: '演示说明',
      usageNotes: [
        '1. 配置 chatPath 为 /chat/thread 后，icon 点击和 showChat() 都会进入历史会话页面。',
        '2. /chat/thread 使用与 /chat 相同的参数，例如 org、t、sid、visitorUid、nickname、avatar。',
        '3. 支持直接拼接 URL + 参数方式接入，无需额外 SDK 调用。'
      ],
      buttons: {
        openHistoryPage: '打开历史会话页面',
        switchAnonymousUser: '切换到匿名用户'
      },
      apiGuide: {
        title: 'ThreadList 接口直调说明（不依赖组件）',
        endpointLabel: '接口 URL',
        fullUrlPage1Label: '完整请求 URL（第 1 页）',
        fullUrlPage2Label: '完整请求 URL（第 2 页）',
        queryParamsTitle: '请求参数（Query）',
        pagingMappingTitle: '分页与调用行为',
        curlExampleTitle: 'curl 示例',
        fetchExampleTitle: 'fetch 示例',
        anonymousHint: '匿名模式下如果已经持有稳定 visitorUid，直接只传 visitorUid 就可以查询全部历史会话；如果连 visitorUid 都没有，仍需先完成 initVisitor 拿到 uid/visitorUid。',
        queryParams: [
          'visitorUid: string（推荐传，访客业务 uid；单独传即可拉取该访客全部历史会话）',
          'orgUid: string（可选，仅当你想限制在某个组织内查询时再传）',
          'pageNumber: number（必填，后端从 0 开始；前端第 1 页传 0）',
          'pageSize: number（必填，示例默认 10）',
          'searchText: string（可选，按关键词筛选会话）'
        ],
        pagingMapping: [
          'UI current=1 -> pageNumber=0',
          'UI current=2 -> pageNumber=1',
          '默认 requestKey 可理解为 visitorUid|pageNumber|pageSize|searchText；如果显式传了 orgUid，也会一起参与区分',
          '只要 visitorUid 稳定可复用，ThreadList 可只传 visitorUid；如果同时持有 uid，也可以一并传入兼容历史数据',
          '命中 403 时前端会对相同请求做 30s 冷却（FORBIDDEN_COOLDOWN_MS）'
        ]
      },
      responseGuide: {
        title: '返回结果结构说明',
        topLevelTitle: '顶层结构',
        dataFieldsTitle: 'data 分页字段',
        threadItemFieldsTitle: 'data.content[] 单条会话（Thread）字段',
        topLevelFields: [
          'message: string — 响应描述，如 "查询成功"',
          'code: number — HTTP 状态码，200 表示成功',
          'data: object — 分页数据对象（见下方字段说明）'
        ],
        dataFields: [
          'content: Thread[] — 会话列表，见下方单条会话字段说明',
          'total / totalElements: number — 总记录数',
          'totalPages: number — 总页数',
          'first: boolean — 是否第一页',
          'last: boolean — 是否最后一页',
          'numberOfElements: number — 当前页实际条数',
          'size: number — 每页大小（对应请求参数 pageSize）',
          'number: number — 当前页号（从 0 开始，对应请求参数 pageNumber）',
          'empty: boolean — 当前页是否为空'
        ],
        threadItemFields: [
          'uid: string — 会话唯一 ID',
          'userUid: string — 接待客服（坐席）的 uid',
          'orgUid: string — 组织 uid',
          'level: string — 层级，ORGANIZATION 表示组织级',
          'platform: string — 平台标识，固定为 BYTEDESK',
          'createdAt: string — 会话创建时间，格式 yyyy-MM-dd HH:mm:ss',
          'updatedAt: string — 会话最后更新时间',
          'topic: string — 会话 topic，格式：org/agent/{agentUid}/{visitorEntityUid}',
          'content: string — 最后一条消息的原始内容（i18n key 或文本）',
          'contentObject.msgType: string — 消息类型枚举，如 TEXT / AGENT_CLOSED / AUTO_CLOSED / INVITE_AUDIO_CANCEL 等',
          'contentObject.preview: string — 用于列表展示的预览文本',
          'contentObject.payload: string — 消息实际内容（文本或 JSON 字符串）',
          'contentObject.displayText: string — 最终展示文本',
          'type: string — 会话类型：AGENT=人工客服，ROBOT=机器人，WORKGROUP=工作组',
          'status: string — 会话状态：OPEN=进行中，CLOSED=已关闭',
          'transferStatus: string — 转接状态：NONE=未转接',
          'closeType: string — 关闭方式：AGENT=客服手动关闭，AUTO=超时自动关闭，VISITOR=访客关闭',
          'channel: string — 渠道来源，WEB_VISITOR=Web 访客',
          'top: boolean — 是否置顶',
          'unread: boolean — 客服侧是否有未读消息',
          'unreadCount: number — 客服侧未读消息数',
          'visitorUnreadCount: number — 访客侧未读消息数',
          'mute: boolean — 是否静音',
          'hide: boolean — 是否隐藏',
          'star: number — 星标等级（0=未标记）',
          'fold: boolean — 是否折叠',
          'offline: boolean — 是否离线消息',
          'tagList: string[] — 标签列表',
          'note: string | null — 会话备注',
          'extra: string — JSON 字符串，包含会话扩展配置（autoCloseMin / toolbar / requireLogin 等）',
          'valid: boolean — 是否有效会话：访客有实际回复时为 true，仅系统消息时为 false',
          'allMessageCount: number — 会话总消息数（访客 + 客服 + 系统 + 机器人）',
          'visitorMessageCount: number — 访客发送消息数',
          'agentMessageCount: number — 客服发送消息数',
          'systemMessageCount: number — 系统消息数',
          'robotMessageCount: number — 机器人消息数',
          'robotToAgent: boolean — 是否从机器人转人工',
          'queueMeta: object | null — 排队元信息，未排队时为 null',
          'user: object — 访客信息（uid / nickname / avatar / type / extra）',
          'owner: object — 会话拥有者信息（通常为管理员）',
          'agent: string — 客服信息 JSON 字符串（uid / nickname / avatar / type）',
          'robot: string — 机器人信息 JSON 字符串，无机器人时为 "{}"',
          'workgroup: string — 工作组信息 JSON 字符串，无工作组时为 "{}"',
          'agentProtobuf: object — 客服结构化信息对象',
          'workgroupProtobuf: object — 工作组结构化信息对象',
          'robotProtobuf: object — 机器人结构化信息对象',
          'transfer: object | null — 转接信息，未发生转接时为 null',
          'invites: object[] — 邀请相关用户列表',
          'monitors: object[] — 监控相关用户列表',
          'assistants: object[] — 协助相关用户列表',
          'ticketors: object[] — 工单相关用户列表',
          'processInstanceId / processEntityUid: string | null — 工单流程相关 ID，不涉及工单时为 null'
        ]
      },
      urlGuideTitle: 'URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明（与 /chat 一致）',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（推荐）',
        'nickname/avatar：访客展示信息（可选）',
        'lang/mode：语言与主题参数（可选）',
        'threadDetail：打开历史会话后是否显示会话详情按钮（1：显示，默认隐藏）'
      ],
      sampleUrlLabel: '当前配置生成的示例 URL',
      docLinks: {
        threadDoc: '查看历史会话对接文档',
        visitorRef: '参考 visitor ThreadList 实现',
        reactExample: 'React 历史会话演示源码'
      }
    },
    videoSupportDemo: {
      title: '视频客服演示',
      description: '通过切换 chatConfig.sid 到视频客服工作组，演示网页入口如何进入视频客服接待场景。',
      bubbleTitle: '视频客服',
      bubbleSubtitle: '连接视频客服专席',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      pathAlert: '本页使用 chatPath=/chat，通过视频客服 sid 区分业务场景；点击图标会进入普通聊天页。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /chat，业务分流通过 sid 与 t 控制。',
      usageTitle: '演示说明',
      usageNotes: [
        '1. 保持 chatPath=/chat，并将 chatConfig.sid 设置为视频客服队列 ID。',
        '2. 建议传 visitorUid/nickname/avatar，便于客服快速识别访客身份。',
        '3. 可通过 showChat() 或 URL 参数直连方式进入该场景。'
      ],
      buttons: {
        openVideoSupport: '打开视频客服',
        switchAnonymousUser: '切换到匿名用户'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      sampleUrlLabel: '当前配置生成的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: 'React 视频客服演示源码'
      }
    },
    helpcenterDemo: {
      title: '帮助中心 Tab 演示',
      description: '通过 tabsConfig 控制嵌入式客服窗口底部多个 tab 的显示与隐藏，用于在同一个小窗中切换对话窗口、历史会话窗口和帮助文档窗口。',
      controlsTitle: 'Tab 开关',
      previewTitle: '嵌入式窗口效果',
      codeTitle: '配置示例',
      currentChatProfile: '当前咨询参数',
      openChatButton: '打开多 Tab 客服窗口',
      openHelpcenterButton: '单独打开帮助中心',
      helpHiddenText: 'help tab 已关闭',
      windowHint: '点击按钮后查看右下角嵌入式窗口，底部会显示已开启的 tab。help 打开帮助文档窗口，thread 打开历史会话窗口，messages 打开对话窗口。',
      embeddedWindowDescription: '本页不直接渲染 visitor 的 Helpcenter 页面，只演示 BytedeskConfig.tabsConfig 如何影响嵌入式窗口底部 tab。',
      enabledTabsTitle: '当前将显示的底部 tab',
      bubbleTitle: '查看多 Tab 窗口',
      bubbleSubtitle: '打开客服窗口体验 help、thread、messages tab',
      tabs: {
        messages: '消息 tab',
        thread: '历史会话 tab',
        help: '帮助 tab',
      }
    },
    callCenterDemo: {
      title: '电话客服演示',
      description: '通过切换 sid 到呼叫中心工作组，演示如何将网页访客统一路由到呼叫中心排队入口。',
      bubbleTitle: '呼叫中心',
      bubbleSubtitle: '排队与转接场景',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      pathAlert: '本页保持 chatPath=/chat，通过呼叫中心 sid 模拟统一排队入口。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /call，排队队列由 chatConfig.sid 决定。',
      usageTitle: '演示说明',
      usageNotes: [
        '1. 将 sid 配置为呼叫中心工作组 ID，可让会话进入同一排队池。',
        '2. 使用不同 visitorUid 可模拟多访客并发进入队列。',
        '3. 生产环境可按售前/售后/技术线拆分不同 sid。'
      ],
      buttons: {
        openCallCenter: '打开呼叫中心',
        switchAnonymousUser: '切换到匿名用户'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      sampleUrlLabel: '当前配置生成的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: 'React 电话客服演示源码'
      },
      runtime: {
        title: '运行面板（参考 SIP.js Demo）',
        description: '模拟连接、排队、分配、完结等关键状态，帮助你快速验证呼叫中心入口联动逻辑。',
        statusLabels: {
          sdkReady: 'SDK 就绪状态',
          queueState: '队列状态',
          activeSessionCount: '活动会话数',
          lastActionAt: '最近动作时间'
        },
        statusValues: {
          ready: '已就绪',
          notReady: '未就绪'
        },
        queueState: {
          idle: '空闲',
          queueing: '排队中',
          serving: '服务中'
        },
        buttons: {
          openQueue: '打开排队入口',
          simulateAssign: '模拟分配坐席',
          completeSession: '完成本次服务',
          clearLogs: '清空日志'
        },
        logTitle: '事件日志',
        emptyLogs: '暂无事件，先试试上方快捷动作。',
        logTemplates: {
          switchedAnonymous: '已切换为匿名模式。',
          switchedUser: '已切换访客：{{name}}。',
          openQueue: '已打开呼叫中心入口并进入排队。',
          closeQueue: '已关闭聊天面板。',
          assignSession: '模拟排队成功，已分配到坐席。',
          completeSession: '服务完成，本次会话已结束。'
        }
      }
    },
    proactiveDemo: {
      title: '主动获客演示',
      description: '这个页面接入默认工作流，点击按钮后会直接进入学历筛查、诉求确认与联系方式采集流程。',
      tags: {
        mobileValidation: '手机号校验',
        multiTurnQa: '多轮问答'
      },
      alertTitle: '验证路径',
      alertDescription: '进入对话后会依次收集学历、诉求，再要求填写城市、咨询场景、手机号。手机号不符合 11 位大陆手机号格式时，表单不会提交。每次打开都会强制新建工作流会话。',
      workflowCardTitle: '默认主动获客工作流',
      workflowCardTag: '学历筛查 + 诉求确认 + 联系方式采集',
      bubbleTitle: '主动获客',
      bubbleSubtitle: '默认工作流留资演示',
      buttons: {
        openWorkflowChat: '打开默认工作流对话',
        closeChat: '关闭会话窗口'
      },
      urlParamsTitle: '工作流参数说明',
      urlDescription: '当前独立窗口完整 URL 会跟随 locale、主题模式和访客身份参数变化；forceNewThread 用于 SDK 打开会话时强制新建 workflow 线程，因此保留在下方嵌入代码中展示。',
      urlParams: [
        'org: 组织唯一标识，指定工作流所属组织',
        't: 会话类型，17 表示 workflow 工作流会话',
        'sid: 工作流唯一标识，决定进入哪条默认工作流',
        'lang: 会话语言，跟随当前示例页 locale',
        'mode: 主题模式，跟随当前浅色或深色配置',
        'navbar: 顶部导航显示开关，1 表示显示',
        'visitorUid: 访客唯一标识，实名模式下用于绑定历史访客',
        'nickname: 访客昵称，实名模式下透传到会话页',
        'avatar: 访客头像地址，实名模式下用于展示头像'
      ],
      embedCodeTitle: '当前嵌入代码',
      embedCodeDescription: '当前嵌入代码与本页实际接入配置一致，复制后可直接作为固定 workflow 留资入口使用。'
    },
    webrtcDemo: {
      title: '音视频客服演示',
      description: '通过右下角悬浮按钮（bubble）体验 WebRTC 实时音视频通话客服，支持音频客服与视频客服两种模式，参数通过 URL 传递给 /webrtc 页面。',
      modeLimitNotice: '暂不支持机器人模式，仅支持人工音频客服和人工视频客服。',
      pathAlert: '右下角悬浮按钮默认触发音频客服（audio=1&video=0），可通过下方按钮切换为视频客服模式。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /webrtc，通话类型由 audio / video 参数决定。',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      callMode: '当前呼叫模式',
      callModeAudio: '🎙️ 发起音频客服（audio=1,video=0）',
      callModeVideo: '📹 发起视频客服（audio=1,video=1）',
      bubbleTitleAudio: '音频客服',
      bubbleTitleVideo: '视频客服',
      bubbleSubtitleAudio: '点击连线音频客服',
      bubbleSubtitleVideo: '点击连线视频客服',
      docLinks: {
        reactDoc: '查看 React 音视频客服文档',
        vueDoc: '查看 Vue 音视频客服文档',
        reactExample: 'React 音视频客服演示源码'
      },
      usageTitle: '演示说明',
      usageNotes: [
        '1. 右下角悬浮按钮/气泡 即为音视频客服入口，点击后在内嵌窗口中打开 /webrtc 页面。',
        '2. 音频客服（audio=1&video=0）：仅使用麦克风和扬声器，无需摄像头。',
        '3. 视频客服（audio=1&video=1）：同时开启摄像头与麦克风进行双向视频通话。',
        '4. 生产环境默认使用 CDN 地址 https://cdn.weiyuai.cn/webrtc，本地开发使用 http://127.0.0.1:9018/webrtc。',
        '5. org、t、sid 参数与聊天接口保持一致，无需额外对接配置。'
      ],
      buttons: {
        audioMode: '🎙️ 切换为音频客服',
        videoMode: '📹 切换为视频客服',
        switchAnonymousUser: '切换到匿名用户'
      },
      urlGuideTitle: 'URL + 参数说明',
      sampleUrlLabel: '当前配置生成的示例 URL',
      urlParamsTitle: '参数说明',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组）',
        'sid：客服 / 工作组 ID（必填）',
        'audio：是否启用音频（1 启用，0 禁用）',
        'video：是否启用视频（1 启用，0 禁用）',
        'lang：语言（zh-cn / en 等）',
        'visitorUid：自定义访客 ID（可选）',
        'nickname / avatar：访客显示信息（可选）'
      ]
    },
    videoConferenceDemo: {
      title: '视频会议演示',
      description: '通过会议专用 sid 演示会议接入场景，聊天面板可作为会前引导和身份确认入口。',
      bubbleTitle: '视频会议',
      bubbleSubtitle: '进入会议服务',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      pathAlert: '本页使用 chatPath=/chat，并通过会议 sid 区分场景，适用于会前咨询与接入引导。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /chat，会议上下文由 chatConfig.sid 提供。',
      usageTitle: '演示说明',
      usageNotes: [
        '1. 可按会议房间或活动场次分配不同 sid，便于流量隔离。',
        '2. 建议传入访客身份字段，便于主持侧做入会前确认。',
        '3. 该模式适合作为视频会议前置咨询入口，再跳转到你的会议系统。'
      ],
      buttons: {
        openVideoConference: '打开视频会议',
        switchAnonymousUser: '切换到匿名用户'
      },
      urlGuideTitle: 'URL + 参数调用说明',
      sampleUrlLabel: '当前配置生成的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: 'React 视频会议演示源码'
      }
    },
    voiceAgentDemo: {
      title: '语音助手演示',
      description: '参考 visitor 项目中的 VoiceAgent 实现，这个页面演示如何通过 Bytedesk Web SDK 将入口直接指向 /chat/voice，体验语音输入、文字回退、状态提示和全屏语音助手界面。',
      bubbleTitle: '语音助手',
      bubbleSubtitle: '按住说话，或切换为文字输入',
      pathAlert: '本页将 chatPath 设置为 /chat/voice。点击右下角入口、调用 showChat()，或直接打开 URL，都会进入语音助手页面。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /chat/voice；组织与会话身份仍由 org / t / sid 控制。',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      recommendedProfileNotice: '建议优先使用机器人测试配置来模拟语音助手场景；如果需要验证其他接待目标，也可以沿用当前 org / t / sid。',
      capabilityTitle: '对齐 visitor 语音页的能力',
      capabilityItems: [
        '状态提示：ready、connecting、listening、processing、error 等阶段会在语音页内实时展示。',
        '双输入模式：支持按住说话，也支持切换为文字输入作为兜底。',
        '消息流布局：语音页会显示用户消息、AI 回复和助手草稿内容。',
        '录音遮罩层：长按录音时会显示音量反馈、录音时长和操作提示。'
      ],
      usageTitle: '演示说明',
      usageNotes: [
        '1. 保持 htmlUrl 为站点根地址，仅通过 chatPath=/chat/voice 切换到语音助手页。',
        '2. 右下角悬浮按钮仍使用 chat action，因此不需要扩展新的 SDK action 类型。',
        '3. popup、新标签页与 iframe 内嵌小窗三种入口会使用同一组 URL 参数。',
        '4. 建议传入 visitorUid / nickname / avatar，方便语音页识别和回填访客身份。'
      ],
      urlGuideTitle: 'URL + 参数说明',
      sampleUrlLabel: '当前配置生成的示例 URL',
      urlParamsTitle: '参数说明',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（客服 / 工作组 / 机器人）',
        'visitorUid：自定义访客 ID（推荐）',
        'nickname / avatar：访客展示信息（可选）',
        'lang：语言',
        'mode：主题模式（light / dark / system）',
        'navbar：是否显示语音页导航栏'
      ],
      buttons: {
        openVoiceAgent: '打开语音助手',
        switchAnonymousUser: '切换到匿名用户'
      },
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: 'React 语音助手演示源码'
      }
    },
    documentFeedbackDemo: {
      title: '文档反馈演示',
      subtitle: '让读者选中文本、自动截图并提交结构化反馈，无缝闭环文档质量与客服支持。',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: '查看本页面 React 源码'
      },
      setupStepsTitle: '快速上手清单',
      setupSteps: [
        '安装 SDK 并准备 BytedeskConfig 配置。',
        '在 feedbackConfig 中启用文档反馈与选中文本触发。',
        '在页面中渲染 <BytedeskReact {...config} />。',
        '选中下面任意段落，即可看到“文档反馈”提示按钮。'
      ],
      highlightsTitle: '文档反馈如何工作',
      highlights: [
        '选中文本后会出现悬浮提示按钮，并携带选中内容。',
        'SDK 自动生成截图，支持查看用户的真实上下文。',
        '类别标签与占位提示引导用户输出可执行反馈。'
      ],
      controlPanel: {
        title: '排障工具面板',
        buttons: {
          forceInit: '强制初始化反馈',
          manualTrigger: '手动触发反馈',
          testSelection: '测试文本选择',
          statusCheck: '检查功能状态',
          clearLogs: '清空反馈记录',
          inspectState: '检查运行状态'
        },
        statusLabel: '初始化状态',
        initialized: '✅ 已就绪',
        initializing: '⏳ 等待 SDK...'
      },
      exampleSection: {
        title: '示例文章',
        paragraphs: [
          'BytedeskWeb 集成在线客服、机器人与文档反馈功能。用户可以精准高亮句子、附带截图，并在不刷新页面的前提下完成反馈。',
          '悬浮提示跟随明暗主题，支持自定义图标、文案与触发方式，特别适合文档站、知识库与长文内容。',
          '每条反馈都会附带选中文本、坐标、分类与可选截图，帮助文档与客服团队快速定位问题。'
        ],
        tip: '尝试选中上方任意文字，立即体验提示气泡。'
      },
      logs: {
        title: '反馈记录',
        empty: '暂无反馈，选择内容或点击“手动触发反馈”生成示例数据。',
        selectedText: '选中文字',
        categories: '问题类型',
        feedback: '反馈内容'
      },
      feedbackConfigText: {
        selectionText: '文档反馈',
        dialogTitle: '文档反馈',
        placeholder: '请描述问题或优化建议',
        submitText: '提交反馈',
        cancelText: '取消',
        successMessage: '感谢您的反馈，我们会尽快处理。',
        categoryNames: [
          '错别字 / 翻译问题',
          '链接异常',
          '文档与产品不符',
          '难以理解',
          '其他建议'
        ],
        typesSectionTitle: '问题类型',
        typesDescription: '（可多选）'
      },
      manualTriggerMessage: '这是一次手动触发的文档反馈，用于验证流程。',
      testSelectionText: '测试选中的文字内容',
      tooltipFallbackText: '📝 测试反馈提示',
      alerts: {
        missingInstance: '未找到 BytedeskWeb 实例，请先初始化组件。',
        showFeedbackMissing: '当前实例未提供 showDocumentFeedback 方法。',
        retryTimeout: '等待实例初始化超时，请刷新页面后重试。',
        forceInitSuccess: '反馈功能已初始化，可以开始测试。',
        forceInitFailed: '强制初始化失败，请查看控制台日志。',
        statusReportTitle: '功能状态检查',
        statusReportFooter: '详细日志已输出到控制台。',
        available: '可用',
        missing: '不可用',
        statusLabels: {
          bytedeskInstance: 'BytedeskWeb 实例',
          html2canvas: 'html2canvas 库',
          feedbackFunction: '文档反馈方法',
          feedbackEnabled: '反馈配置启用',
          tooltipElement: '提示框元素',
          dialogElement: '对话框元素',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: '提示框是否可见',
          currentSelection: '当前选中文字'
        }
      }
    },
    flightBookingDemo: {
      title: '机票预定演示',
      description: '通过 AI 智能对话实现机票预定、退票、改签等全流程服务。用户可直接与 AI 客服对话完成航班查询、座位选择、订单修改等操作，无需繁琐的表单填写。',
      bubbleTitle: '需要帮助吗？',
      bubbleSubtitle: '机票预定/退票/改签',
      sections: {
        flightStatus: '航班状态',
        flightInfo: '航班信息',
        bookingInfo: '订单信息',
        passengerInfo: '乘客信息'
      },
      labels: {
        departure: '出发',
        arrival: '到达',
        flightDate: '出发日期',
        cabinClass: '舱位等级',
        flightStatus: '航班状态',
        ticketPrice: '票价',
        perPerson: '人',
        bookingNo: '订单编号',
        bookingTime: '下单时间',
        paymentStatus: '支付状态',
        paymentMethod: '支付方式',
        passengerCount: '乘客人数',
        totalAmount: '订单总额',
        person: '人',
        passenger: '乘客',
        passengerName: '姓名',
        idType: '证件类型',
        idNumber: '证件号码',
        phone: '联系电话'
      },
      statusText: {
        scheduled: '待起飞',
        boarding: '登机中',
        departed: '已起飞',
        arrived: '已到达',
        cancelled: '已取消'
      },
      paymentStatusText: {
        pending: '待支付',
        paid: '已支付',
        refunded: '已退款'
      },
      buttons: {
        contactSupport: '咨询客服',
        viewItinerary: '查看行程单',
        changeBooking: '改签机票',
        cancelBooking: '取消订单'
      },
      flight: {
        airlines: {
          airChina: '中国国际航空',
          chinaEastern: '中国东方航空',
          chinaSouthern: '中国南方航空'
        },
        cities: {
          beijing: '北京',
          shanghai: '上海',
          guangzhou: '广州',
          shenzhen: '深圳'
        },
        airports: {
          pek: '首都国际机场 T3',
          pvg: '浦东国际机场 T2',
          can: '白云国际机场 T2',
          szx: '宝安国际机场 T3'
        },
        cabinClasses: {
          economy: '经济舱',
          business: '商务舱',
          first: '头等舱'
        }
      },
      passenger: {
        samplePassenger1: '张三',
        samplePassenger2: '李四',
        idTypes: {
          idCard: '身份证',
          passport: '护照',
          other: '其他'
        }
      },
      booking: {
        paymentMethods: {
          alipay: '支付宝',
          wechat: '微信支付',
          card: '银行卡'
        }
      }
    },
    onlineDemo: {
      title: '在线 SDK 演示',
      description: '该示例直接引用 npm 发布包，开启邀请、气泡与文档反馈，并提供常用控制按钮。',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
        reactExample: 'React 在线演示源码',
        vueExample: 'Vue 在线演示源码'
      },
      docLinksTitle: '相关文档',
      feedbackSectionTitle: '文档反馈体验',
      usageTitle: '体验步骤',
      usageSteps: [
        '选中下方任意一句话。',
        '光标附近会出现“文档反馈”提示按钮。',
        '点击按钮查看选中文本，并提交你的意见。'
      ],
      exampleParagraphs: [
        'BytedeskWeb 将在线客服、机器人与文档反馈融合在同一组件中。',
        '每次选择都会自动截图，方便客服准确还原用户视角。',
        '可通过下方按钮控制聊天窗口，或手动触发文档反馈。'
      ],
      manualTriggerButton: '手动触发文档反馈',
      manualTriggerMessage: '在线演示触发的文档反馈示例。',
      controlPanelTitle: '常用控制面板',
      controlPanelDescription: '使用这些按钮直接调用 SDK 接口，体验不同主题与弹窗效果。'
    }
  },
  components: {
    installGuide: {
      title: '安装步骤',
      sections: {
        installDeps: {
          title: '1. 安装依赖',
          code: 'npm install bytedesk-web\n# 或\nyarn add bytedesk-web'
        },
        importComponent: {
          title: '2. 导入组件',
          code: "import { BytedeskReact } from 'bytedesk-web/react';\nimport type { BytedeskConfig } from 'bytedesk-web/react';"
        },
        config: {
          title: '3. 配置参数',
          minimalTitle: '最小参数配置（必需）',
          minimalCode: `const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
  },
};`,
          minimalNote: 'org / t / sid 为必填项，请替换为您自己的组织与路由参数。',
          fullTitle: '完整配置参数（可选）',
          fullCode: `const config: BytedeskConfig = {
  isDebug: false,
  forceRefresh: false,
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://www.weiyuai.cn/chat',
  locale: 'zh-cn',
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  draggable: true,
  autoPopup: false,
  autoPopupDelay: 3000,
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
    visitorUid: '',
    nickname: '',
    avatar: '',
    mobile: '',
    email: '',
    note: '',
    extra: '',
    goodsInfo: '',
    orderInfo: '',
    vipLevel: '',
  },
  browseConfig: {
    referrer: '',
    url: window.location.href,
    title: document.title,
  },
  inviteConfig: {
    show: false,
    text: '需要帮助吗？',
    icon: '👋',
    delay: 1000,
    loop: true,
    loopDelay: 10000,
    loopCount: 3,
    acceptText: '开始对话',
    rejectText: '稍后再说',
    onAccept: () => console.log('用户接受邀请'),
    onReject: () => console.log('用户拒绝邀请'),
    onClose: () => console.log('邀请对话框关闭'),
    onOpen: () => console.log('邀请对话框打开'),
  },
  feedbackConfig: {
    enabled: true,
    trigger: 'selection',
    showOnSelection: true,
    selectionText: '文档反馈',
    buttonText: '文档反馈',
    dialogTitle: '提交意见反馈',
    placeholder: '请描述您的问题或优化建议',
    submitText: '提交反馈',
    cancelText: '取消',
    successMessage: '反馈已提交，感谢您的意见！',
    onSubmit: (feedbackData) => console.log('收到反馈数据:', feedbackData),
    onCancel: () => console.log('用户取消反馈'),
  },
  bubbleConfig: {
    show: true,
    icon: '💬',
    title: '需要帮助吗？',
    subtitle: '点击开始对话',
  },
  buttonConfig: {
    show: true,
    icon: '💬',
    text: '在线客服',
    width: 60,
    height: 60,
    onClick: () => console.log('按钮被点击'),
  },
  tabsConfig: {
    help: true,
    thread: true,
    messages: true,
  },
  theme: {
    mode: 'light',
    textColor: '#333333',
    backgroundColor: '#ffffff',
  },
  window: {
    width: 400,
    height: 600,
  },
  animation: {
    enabled: true,
    duration: 300,
    type: 'ease-in-out',
  },
  onInit: () => console.log('BytedeskReact initialized'),
  onShowChat: () => console.log('聊天窗口显示'),
  onHideChat: () => console.log('聊天窗口隐藏'),
  onMessage: (message: string, type: string) => console.log('收到消息:', message, type),
  onConfigChange: (nextConfig: BytedeskConfig) => console.log('配置变更:', nextConfig),
  onVisitorInfo: (uid: string, visitorUid: string) => console.log('访客信息:', uid, visitorUid),
};`
        },
        usage: {
          title: '4. 使用组件',
          code: `const App = () => {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div>
      <BytedeskReact {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打开聊天
      </button>
    </div>
  );
};`
        },
        methods: {
          title: '5. 可用方法',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: '显示按钮' },
            { code: '(window as any).bytedesk?.hideButton()', description: '隐藏按钮' },
            { code: '(window as any).bytedesk?.showBubble()', description: '显示气泡消息' },
            { code: '(window as any).bytedesk?.hideBubble()', description: '隐藏气泡消息' },
            { code: '(window as any).bytedesk?.showChat()', description: '显示聊天窗口' },
            { code: '(window as any).bytedesk?.hideChat()', description: '隐藏聊天窗口' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: '显示邀请对话框' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: '隐藏邀请对话框' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: '显示文档反馈对话框（新增）' }
          ]
        },
        feedback: {
          title: '6. 文档反馈功能说明',
          intro: '文档反馈可以让用户针对页面内容精准选中、附带截图，并提交结构化建议。',
          bullets: [
            '自动检测文本选择，浮出“文档反馈”提示按钮。',
            '集成 html2canvas 自动截图，方便还原上下文。',
            '记录选中文字，帮助开发者快速定位问题。',
            '支持选中文本触发、按钮触发或组合触发。',
            '提供 onSubmit/onCancel 回调，便于将数据发送到自有服务。'
          ],
          tip: '文档反馈需要安装 html2canvas 以支持截图：',
          tipCommand: 'npm install html2canvas'
        }
      }
    }
  }
};
