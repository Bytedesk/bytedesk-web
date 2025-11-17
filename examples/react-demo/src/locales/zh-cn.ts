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
    localDemo: '基本配置',
    userInfoDemo: '用户信息对接',
    goodsInfoDemo: '商品信息对接',
    orderInfoDemo: '订单信息对接',
    vipLevelDemo: '千人千面对接',
    unreadCountDemo: '未读消息数对接',
    documentFeedbackDemo: '📝 文档反馈演示'
  },
  pages: {
    localDemo: {
      title: '微语基本设置',
      intro: '通过下方按钮可以快速体验 Bytedesk Web SDK 的常见能力。',
      themeButtonLabel: '切换主题色',
      bubbleTitle: '需要帮助吗？',
      bubbleSubtitle: '点击开始对话',
      placement: {
        bottomLeft: '左下角',
        bottomRight: '右下角'
      },
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
      apiHintPrefix: '调用代码：',
      users: {
        user1: '访客小明',
        user2: '访客小红'
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
      }
    },
    unreadCountDemo: {
      title: '微语未读消息计数示例',
      description: '演示如何调用 getUnreadMessageCount 与 clearUnreadMessages，保证页面与客服端状态一致。',
      currentCount: '当前未读消息数',
      docLinks: {
        reactDoc: '查看 React 集成文档',
        vueDoc: '查看 Vue 集成文档',
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
      ]
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
