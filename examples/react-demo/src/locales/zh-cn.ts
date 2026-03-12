export const zhCn = {
  common: {
    languageLabel: '语言',
    languageOptions: {
      en: 'English',
      'zh-cn': '简体中文',
      'zh-tw': '繁体中文'
    },
    themeLabel: '主题模式',
    themeOptions: {
      light: '浅色',
      dark: '深色',
      system: '跟随系统'
    },
    officialSiteLabel: '官网',
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
      cancel: '取消'
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
    videoSupportDemo: '🎥 视频客服演示',
    callCenterDemo: '📞 呼叫中心演示',
    videoConferenceDemo: '🎬 视频会议演示',
    documentFeedbackDemo: '📝 文档反馈演示',
    flightBookingDemo: '✈️ 机票预定演示'
  },
  pages: {
    basicDemo: {
      title: '微语基本设置',
      intro: '通过下方按钮可以快速体验 Bytedesk Web SDK 的常见能力。',
      themeButtonLabel: '切换主题色',
      bubbleTitle: '需要帮助吗？',
      bubbleSubtitle: '点击开始对话',
      placement: {
        bottomLeft: '左下角',
        bottomRight: '右下角'
      },
      loadHistoryLabel: '加载历史消息',
      loadHistoryEnabled: '开启',
      loadHistoryDisabled: '关闭',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: '默认',
      currentConfigTitle: '当前配置',
      copyConfig: '复制配置 JSON'
    },
    userInfoDemo: {
      title: '用户信息对接演示',
      description:
        '本示例演示如何通过配置参数传入用户信息（visitorUid、nickname、avatar）到客服组件中，点击下方按钮可以切换不同的用户。',
      switchUser: '切换用户',
      switchToUserLabel: '切换到 {{name}}',
      switchAnonymousUserLabel: '切换到匿名用户',
      anonymousUserLabel: '匿名用户',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar 等用户信息',
      currentUserTitle: '当前用户信息',
      currentUserIdLabel: '用户ID',
      currentUserNicknameLabel: '昵称',
      contactSupport: '咨询客服',
      inviteText: '您好，请问有什么可以帮您？',
      docLinks: {
        userInfoDoc: '查看用户信息对接文档',
        reactExample: 'React 用户信息对接代码示例',
        vueExample: 'Vue 用户信息对接代码示例'
      },
      controlPanel: {
        title: '微语接口控制面板',
        chatWindow: '聊天窗口控制',
        button: '按钮控制',
        bubble: '气泡消息控制',
        invite: '邀请对话框控制'
      },
      urlGuideTitle: 'URL + 参数调用说明',
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
      apiHintPrefix: '调用代码：',
      users: {
        user1: '访客小明',
        user2: '访客小红',
        user3: '访客小李'
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
      ]
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
      ]
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
      description: '演示如何调用 getUnreadMessageCount 与 clearUnreadMessages，保证页面与客服端状态一致。',
      currentCount: '当前未读消息数',
      docLinks: {
        unreadDoc: '查看未读消息对接文档',
        reactExample: 'React 未读消息演示源码',
        vueExample: 'Vue 未读消息演示源码'
      },
      buttons: {
        markAllRead: '标记全部已读',
        refresh: '刷新未读消息数'
      },
      usageNotesTitle: '使用提示',
      usageNotes: [
        '在需要时调用 getUnreadMessageCount() 以获取最新未读数。',
        '阅读完成后可调用 clearUnreadMessages() 将未读数清零。'
      ],
      urlGuideTitle: '接口 URL + 参数调用说明',
      countApiLabel: '获取未读数接口（GET）',
      clearApiLabel: '清空未读数接口（POST）',
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
      urlGuideTitle: 'URL + 参数调用说明',
      urlTemplateLabel: '通用 URL 模板',
      urlParamsTitle: '参数说明（与 /chat 一致）',
      urlParams: [
        'org：组织 ID（必填）',
        't：会话类型（0：一对一，1：工作组，2：机器人）',
        'sid：会话目标 ID（工作组/机器人/客服）',
        'visitorUid：自定义访客 ID（推荐）',
        'nickname/avatar：访客展示信息（可选）',
        'lang/mode：语言与主题参数（可选）'
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
    callCenterDemo: {
      title: '呼叫中心演示',
      description: '通过切换 sid 到呼叫中心工作组，演示如何将网页访客统一路由到呼叫中心排队入口。',
      bubbleTitle: '呼叫中心',
      bubbleSubtitle: '排队与转接场景',
      anonymousUserHint: '当前为匿名测试：不传 visitorUid、nickname、avatar',
      pathAlert: '本页保持 chatPath=/chat，通过呼叫中心 sid 模拟统一排队入口。',
      currentPathLabel: '当前入口路径',
      currentPathHint: '路径固定为 /chat，排队队列由 chatConfig.sid 决定。',
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
        reactExample: 'React 呼叫中心演示源码'
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
    home: true,
    messages: true,
    help: true,
    news: false,
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
