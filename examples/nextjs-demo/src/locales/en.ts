const basicDemoFieldDocs = {
  isDebug: 'Enable debug logging for development troubleshooting; typically disabled in production.',
  forceRefresh: 'Force refresh chat page or iframe resources to debug caching issues.',
  apiUrl: 'API server root URL for visitor initialization, unread counts, and feedback requests.',
  htmlUrl: 'Chat page site root URL; pass only the root path and use chatPath/threadPath/webrtcPath/callPath to control page types.',
  chatPath: 'Text chat page path; used by showChat() by default.',
  threadPath: 'History conversation page path; showThread() switches to this path.',
  webrtcPath: 'Audio/video page path; showWebrtc() switches to this path.',
  callPath: 'Call center page path; showCall() switches to this path.',
  locale: 'UI language such as zh-cn, en, or ja-jp; written to chat URL as lang parameter.',
  placement: 'Button and chat window dock position: bottom-left or bottom-right.',
  marginBottom: 'Distance from entry button to bottom edge in pixels.',
  marginSide: 'Distance from entry button to left or right edge in pixels.',
  autoPopup: 'Auto-open chat window after SDK initialization.',
  autoPopupDelay: 'Delay before auto-popup in milliseconds.',
  draggable: 'Allow dragging the entry button; when enabled, users can reposition it.',
  tabsConfig: 'Control visibility of built-in tabs: help, thread, messages.',
  bubbleConfig: 'Configure entry bubble with title, subtitle, carousel messages, and switch modes.',
  buttonConfig: 'Single entry button configuration; use this for one entry point.',
  buttonsConfig: 'Multiple entry button array; higher priority than buttonConfig for showing chat, thread, webrtc, call, and QR entries.',
  inviteConfig: 'Invite dialog configuration for timing, loops, button text, and callbacks.',
  theme: 'Theme and color configuration including light, dark, or system modes, text color, and background color.',
  animation: 'Animation duration and easing for chat window show or hide transitions.',
  window: 'Desktop chat window dimensions.',
  onInit: 'Runs after SDK initialization completes.',
  onShowChat: 'Runs when the chat window becomes visible.',
  onHideChat: 'Runs when the chat window is hidden.',
  onMessage: 'Runs when iframe or SDK internal messages are received.',
  onConfigChange: 'Runs after configuration updates.',
  onVisitorInfo: 'Returns uid and visitorUid after visitor initialization.',
  'theme.mode': 'Theme mode: light, dark, or system.',
  'theme.textColor': 'Text color for entry button or module content.',
  'theme.backgroundColor': 'Primary background color for entry button, navigation, or modules.',
  'bubble.show': 'Show or hide the prompt bubble above the entry point.',
  'bubble.icon': 'Default icon for a single bubble message.',
  'bubble.title': 'Title for a single bubble message.',
  'bubble.subtitle': 'Subtitle for a single bubble message.',
  'bubble.messages': 'Multiple bubble messages; takes priority over icon, title, and subtitle.',
  'bubble.autoRotate': 'Auto-rotate multiple bubble messages.',
  'bubble.rotateInterval': 'Bubble rotation interval in milliseconds.',
  'bubble.switchMode': 'Bubble switch mode: fade, slide-up, or ticker.',
  'button.show': 'Show or hide this entry button.',
  'button.icon': 'Button icon, usually an emoji or short symbol.',
  'button.text': 'Button text; omit for single circular entry, include for multi-entry stack.',
  'button.width': 'Button width in pixels.',
  'button.height': 'Button height in pixels.',
  'button.action': 'Built-in entry type: chat, thread, webrtc, or call.',
  'button.previewImageUrl': 'Image shown on hover, useful for QR code entries.',
  'button.previewImageAlt': 'Caption displayed under the preview image.',
  'button.onClick': 'Custom click behavior that overrides the default action.',
  'invite.show': 'Enable or disable the invite dialog.',
  'invite.text': 'Invite content text.',
  'invite.icon': 'Invite dialog icon.',
  'invite.delay': 'Delay before the first invite appears.',
  'invite.loop': 'Repeat the invite dialog after it closes.',
  'invite.loopDelay': 'Delay between repeated invites.',
  'invite.loopCount': 'Maximum number of repeated invites.',
  'invite.acceptText': 'Accept button text.',
  'invite.rejectText': 'Reject button text.',
  'invite.onAccept': 'Runs when the user accepts the invite.',
  'invite.onReject': 'Runs when the user rejects the invite.',
  'invite.onClose': 'Runs when the invite dialog closes.',
  'invite.onOpen': 'Runs when the invite dialog opens.',
  'chat.org': 'Organization ID, required.',
  'chat.t': 'Conversation type, required. t=0 means one-on-one agent chat, t=1 means workgroup, and t=2 means robot.',
  'chat.sid': 'Conversation target ID, required.',
  'chat.uid': 'Internal user ID usually maintained by the SDK.',
  'chat.visitorUid': 'Custom visitor identifier used across devices.',
  'chat.nickname': 'Visitor nickname.',
  'chat.avatar': 'Visitor avatar URL.',
  'chat.mobile': 'Visitor mobile number.',
  'chat.email': 'Visitor email address.',
  'chat.note': 'Internal note visible to customer service.',
  'chat.channel': 'Channel source such as website, app, or mini program.',
  'chat.goodsInfo': 'Product information for commerce scenarios.',
  'chat.orderInfo': 'Order information for after-sales or order inquiry flows.',
  'chat.extra': 'Extra extension fields, usually JSON text.',
  'chat.vipLevel': 'Membership tier.',
  'chat.debug': 'Business flag to distinguish test and production environments.',
  'chat.draft': 'Gray-release flag passed as draft=1 in the URL.',
  'chat.settingsUid': 'Unique settings identifier mainly for config debugging.',
  'chat.loadHistory': 'Whether to load historical messages. loadHistory=1 loads chat history by default when opening the chat page.',
  'chat.threadDetail': 'Whether to show the thread detail button. threadDetail=1 shows it; hidden by default.',
  'chat.visitorProfile': 'Whether to show the visitor profile button. visitorProfile=1 shows it; hidden by default.',
  'chat.custom': 'Additional custom business fields appended into chat URL parameters.',
  'browse.referrer': 'Referring page URL.',
  'browse.url': 'Current page URL.',
  'browse.title': 'Current page title.',
  'browse.custom': 'Additional browse metadata such as page ID or campaign source.',
  'feedback.enabled': 'Enable or disable document feedback.',
  'feedback.trigger': 'Trigger mode: selection, button, or both.',
  'feedback.showOnSelection': 'Show feedback entry when text is selected.',
  'feedback.selectionText': 'Prompt shown for selected text.',
  'feedback.buttonText': 'Fixed feedback button label.',
  'feedback.dialogTitle': 'Feedback dialog title.',
  'feedback.placeholder': 'Feedback input placeholder.',
  'feedback.submitText': 'Submit button label.',
  'feedback.cancelText': 'Cancel button label.',
  'feedback.successMessage': 'Message shown after successful submission.',
  'feedback.categoryNames': 'List of feedback categories.',
  'feedback.requiredTypes': 'Require at least one selected category.',
  'feedback.typesSectionTitle': 'Category section title.',
  'feedback.typesDescription': 'Category helper text, for example multiple selection hint.',
  'feedback.submitScreenshot': 'Submit a screenshot together with feedback.',
  'feedback.onSubmit': 'Custom feedback submission flow.',
  'feedback.onCancel': 'Runs when feedback is cancelled.',
  'animation.enabled': 'Enable or disable chat window animation.',
  'animation.duration': 'Animation duration in milliseconds.',
  'animation.type': 'Easing type: ease, linear, ease-in, ease-out, or ease-in-out.',
  'window.width': 'Desktop chat window width.',
  'window.height': 'Desktop chat window height.',
  'tabs.messages': 'Show or hide the messages tab.',
  'tabs.thread': 'Show or hide the thread history tab.',
  'tabs.help': 'Show or hide the help tab.',
} as const;

export const en = {
  common: {
    languageLabel: 'Language',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Simplified Chinese',
      'zh-tw': 'Traditional Chinese',
      'ja-jp': 'Japanese',
      'ko-kr': 'Korean',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Spanish',
      'fr-fr': 'French',
      'th-th': 'ไทย'
    },
    themeLabel: 'Theme Mode',
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    officialSiteLabel: 'Bytedesk Official Site',
    resetAnonymousVisitorLabel: 'Reset anonymous visitor',
    resetAnonymousVisitorSuccess: 'Anonymous visitor reset',
    docLinks: {
      react: 'View React integration docs',
      vue: 'View Vue integration docs',
      reactExample: 'React starter code sample',
      vueExample: 'Vue starter code sample',
      userInfo: 'View user info integration docs',
      goodsInfo: 'View goods info integration docs',
      orderInfo: 'View order info integration docs',
      vipLevel: 'View personalization docs',
      unreadCount: 'React unread counter example',
      documentFeedback: 'Document feedback guide'
    },
    buttons: {
      openChat: 'Open chat',
      openChatWithParams: 'Open chat with params',
      closeChat: 'Close chat',
      showButton: 'Show button',
      hideButton: 'Hide button',
      showBubble: 'Show bubble',
      hideBubble: 'Hide bubble',
      showInvite: 'Show invite',
      hideInvite: 'Hide invite',
      togglePlacement: 'Toggle placement',
      toggleThemeColor: 'Switch theme color',
      reset: 'Reset',
      copy: 'Copy',
      submit: 'Submit',
      cancel: 'Cancel',
      openInNewWindow: 'Open in popup window',
      openInNewTab: 'Open in new tab'
    },
    apiHintPrefix: 'API calls:'
  },
  nav: {
    more: 'More',
    basicDemo: '⚙️ Basic Setup',
    userInfoDemo: '👤 User Info',
    goodsInfoDemo: '🛒 Goods Info',
    orderInfoDemo: '📦 Order Info',
    vipLevelDemo: '👑 Personalization',
    unreadCountDemo: '🔔 Unread Counter',
    threadHistoryDemo: '🧵 Thread History',
    helpcenterDemo: '❔ Help Center',
    videoSupportDemo: '🎥 Video Support',
    webrtcDemo: '📹 WebRTC Demo',
    callCenterDemo: '📞 Call Center',
    ticketDemo: '🎫 Ticket Demo',
    ratingDemo: '⭐ Rating Demo',
    platformDemo: '🏬 Platform Demo',
    proactiveDemo: '🎯 Proactive Acquisition',
    voiceAgentDemo: '🎙️ Voice Agent',
    videoConferenceDemo: '🎬 Video Conference',
    documentFeedbackDemo: '📝 Doc Feedback',
    flightBookingDemo: '✈️ Flight Booking'
  },
  pages: {
    basicDemo: {
      title: 'Bytedesk Basic Setup',
      intro: 'Use the quick actions below to experience common Bytedesk Web SDK features.',
      themeButtonLabel: 'Switch nav color',
      themeTextButtonLabel: 'Switch nav text color',
      bubbleTitle: 'Need help?',
      bubbleSubtitle: 'Click to start chat',
      placement: {
        bottomLeft: 'Bottom Left',
        bottomRight: 'Bottom Right'
      },
      navbarLabel: 'Hide top nav',
      navbarHidden: 'ON',
      navbarShown: 'OFF',
      navbarParamPurpose: 'Whether to hide the top navigation bar. navbar=0 hides the navbar.',
      qrCodeParamLabel: 'Show QR button',
      threadDetailParamLabel: 'Show thread detail button',
      visitorProfileParamLabel: 'Show visitor profile button',
      loadHistoryLabel: 'Load history',
      loadHistoryEnabled: 'Yes',
      loadHistoryDisabled: 'No',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: 'Default',
      defaultTextColorLabel: 'Default',
      currentConfigTitle: 'Current Config',
      copyConfig: 'Copy Config JSON',
      urlParamsTitle: 'Parameter reference',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target session ID (agent / workgroup / bot)',
        'visitorUid: custom visitor ID passed to the standalone page (optional)',
        'nickname / avatar: visitor profile shown in the chat page (optional)',
        'lang: locale value used by the standalone page',
        'mode: theme mode (light / dark)',
        'backgroundColor / textColor: floating entry theme colors',
        'navbar: whether to hide the top navbar',
        'qrcode: whether to show the current chat QR code button (1: show, 0: hide)',
        'threadDetail: whether to show the thread detail button (1: show, hidden by default)',
        'visitorProfile: whether to show the visitor profile button (1: show, hidden by default)',
        'loadHistory: whether to load previous thread messages',
        'title: custom chat title when enabled',
        'browse: serialized browse context passed to the page'
      ],
      manualEncodeHint: 'When manually building the URL, use encodeURIComponent for nickname, avatar, title, and browse JSON values.',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      title: 'Third-Party Business User Integration Demo',
      description:
        'Pass user data from your third-party business system, including visitorUid, nickname, avatar and more, into the config object so agents can immediately identify the current visitor and keep business context in sync. Use the buttons below to switch between mock business users.',
      switchUser: 'Switch user',
      switchToUserLabel: 'Switch to {{name}}',
      switchAnonymousUserLabel: 'Switch to anonymous user',
      anonymousUserLabel: 'Anonymous user',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, avatar and other user fields are omitted.',
      currentUserTitle: 'Current Business User',
      currentUserIdLabel: 'User ID',
      currentUidLabel: 'uid',
      currentVisitorUidLabel: 'visitorUid',
      currentUserNicknameLabel: 'Nickname',
      contactSupport: 'Contact Support',
      inviteText: 'Hello, how can we help you?',
      docLinks: {
        userInfoDoc: 'View third-party business user integration docs',
        reactExample: 'React third-party business user sample',
        vueExample: 'Vue third-party business user sample'
      },
      controlPanel: {
        title: 'Bytedesk Control Panel',
        chatWindow: 'Chat window controls',
        button: 'Button controls',
        bubble: 'Bubble controls',
        invite: 'Invite dialog controls'
      },
      urlGuideTitle: 'Current Standalone Window Full URL + Query usage',
      urlTemplateLabel: 'Generic URL template',
      urlParamsTitle: 'Parameter reference (for /chat)',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target thread ID (workgroup/bot/agent)',
        'visitorUid: custom visitor ID (recommended)',
        'nickname/avatar: visitor profile (optional)',
        'mobile/email/note: extra visitor info (optional)',
        'extra: custom extension field, pass JSON string (optional)',
        'lang/mode: locale and theme mode (optional)'
      ],
      sampleUrlLabel: 'Generated sample URL from current config',
      parameterLabel: 'Parameter',
      currentValueLabel: 'Current Value',
      purposeLabel: 'Purpose',
      requiredLabel: 'Required',
      optionalLabel: 'Optional',
      manualEncodeHint: 'When manually building URL strings, use encodeURIComponent for nickname, avatar, email, note, and extra.',
      switchApiTitle: 'API to call after switching user (embedded only)',
      switchApiDescription: 'The following guidance only applies when bytedesk-web SDK is integrated in embedded mode. Updating chatConfig in your own application changes the current visitor payload, but visitor identity is also cached in localStorage. After switching users, call the visitor init API again so the SDK can compare visitorUid and refresh the cached identity.',
      switchApiNotes: [
        'Named user switch: after updating visitorUid, nickname, and avatar, call initVisitor() to refresh the cached visitor identity.',
        'Anonymous switch: call resetAnonymousVisitor() first to clear the cached visitor UID, then call initVisitor() to initialize the anonymous visitor again.',
        'If you open chat with showChat(...) or a new tab/new window, do it after the user switch is applied so the generated URL matches the latest user info.'
      ],
      apiHintPrefix: 'API calls:',
      users: {
        user1: 'User Xiao Ming',
        user2: 'User Xiao Hong',
        user3: 'User Xiao Mei'
      }
    },
    goodsInfoDemo: {
      title: 'Goods Info Integration Demo',
      description:
        'Attach product metadata (uid, title, image, description, price, url, tags) to the chat session so agents can review context without leaving the console.',
      docLinks: {
        goodsDoc: 'View goods info guide',
        reactExample: 'React goods info example',
        vueExample: 'Vue goods info example'
      },
      infoCardTitle: 'Product details',
      tagsLabel: 'Tags',
      descriptionLabel: 'Description',
      priceLabel: 'Price',
      contactSupport: 'Contact Support',
      product: {
        title: 'BYD Yangwang U7 luxury EV',
        description:
          'The Yangwang U7 uses BYD’s latest blade battery platform with up to 1,000 km of range, L3 driver assistance, and a premium leather interior with a panoramic roof.',
        tags: ['New energy', 'Luxury sedan', 'Smart driving', 'Long range']
      },
      controlPanel: {
        title: 'Bytedesk Control Panel',
        chatWindow: 'Chat window controls'
      },
      urlGuideTitle: 'URL + Query usage',
      urlTemplateLabel: 'Generic URL template',
      urlParamsTitle: 'Parameter reference (for /chat)',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target thread ID (workgroup/bot/agent)',
        'visitorUid: custom visitor ID (optional)',
        'nickname/avatar: visitor profile (optional)',
        'goodsInfo: goods payload as JSON string (recommended)',
        'extra: extension payload as JSON string (optional)',
        'lang/mode: locale and theme mode (optional)'
      ],
      sampleUrlLabel: 'Generated sample URL from current config',
      payloadGuideTitle: 'goodsInfo composition and conversion',
      payloadObjectLabel: 'Step 1: business object',
      payloadJsonLabel: 'Step 2: JSON string (JSON.stringify)',
      payloadEncodedLabel: 'Step 3: URL-encoded value (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Build goodsInfo as an object first, then serialize it with JSON.stringify before passing to chatConfig.',
        'For direct URL integration, pass encoded goodsInfo; URLSearchParams in SDK flow encodes automatically.',
        'goodsInfo.extra is usually a JSON string for extra fields such as SKU and stock.',
        'Keep key fields (uid/title/image/price) when payload gets large to avoid oversized URLs.'
      ],
      shopGoodsCardTitle: 'Store & Products (compact list)',
      currentShopLabel: 'Current store',
      consultGoodsBtn: 'Consult this product',
      consultParamsLabel: 'Consult params',
      goodsPayloadCardTitle: 'Current goods payload',
      goodsStringifyHint: 'How to convert the goods object to a string and pass it to the config:',
      urlParamsCardTitle: 'Current URL parameters',
      standaloneUrlLabel: 'Standalone window / new tab URL',
      paramNameCol: 'Param name',
      paramValueCol: 'Current value',
      paramPurposeCol: 'Description',
      requiredLabel: 'Required',
      optionalLabel: 'Optional',
      goodsUrlHint: 'How to append goods params to the URL:',
      urlParamPurposes: {
        org: 'Tenant identifier (Org UID)',
        t: 'Session type: t=0 one-to-one, t=1 workgroup, t=2 bot',
        sid: 'Agent UID / Workgroup UID / Bot UID',
        visitorUid: 'Visitor unique identifier',
        nickname: 'Visitor nickname',
        avatar: 'Visitor avatar URL',
        goodsInfo: 'Product info (JSON string), includes title, image, price, URL, etc. Use JSON.stringify before passing.',
        extra: 'Custom extension params (JSON)',
        lang: 'Interface language',
        mode: 'Color theme mode (light / dark / auto)',
      }
    },
    orderInfoDemo: {
      title: 'Order Info Integration Demo',
      description: 'Embed order details in each conversation to accelerate after-sales support and troubleshooting.',
      docLinks: {
        orderDoc: 'View order info guide',
        reactExample: 'React order info example',
        vueExample: 'Vue order info example'
      },
      sections: {
        statusTimeline: 'Order status',
        orderInfo: 'Order details',
        goodsInfo: 'Product summary',
        shippingInfo: 'Shipping info'
      },
      labels: {
        orderId: 'Order ID',
        orderTime: 'Created at',
        orderStatus: 'Status',
        paymentMethod: 'Payment method',
        totalAmount: 'Total amount',
        unitPrice: 'Unit price',
        quantity: 'Quantity',
        receiver: 'Receiver',
        phone: 'Phone',
        address: 'Address'
      },
      statusText: {
        pending: 'Pending payment',
        paid: 'Paid',
        shipped: 'Shipped',
        delivered: 'Delivered'
      },
      urlGuideTitle: 'URL + Query usage',
      urlTemplateLabel: 'Generic URL template',
      urlParamsTitle: 'Parameter reference (for /chat)',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target thread ID (workgroup/bot/agent)',
        'visitorUid: custom visitor ID (optional)',
        'nickname/avatar: visitor profile (optional)',
        'orderInfo: order payload as JSON string (recommended)',
        'extra: extension payload as JSON string (optional)',
        'lang/mode: locale and theme mode (optional)'
      ],
      sampleUrlLabel: 'Generated sample URL from current config',
      payloadGuideTitle: 'orderInfo composition and conversion',
      payloadObjectLabel: 'Step 1: business object',
      payloadJsonLabel: 'Step 2: JSON string (JSON.stringify)',
      payloadEncodedLabel: 'Step 3: URL-encoded value (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Build a complete order object first, then serialize it with JSON.stringify before passing to chatConfig.',
        'For direct URL integration, pass encoded orderInfo; URLSearchParams in SDK flow encodes automatically.',
        'Keep essential fields in orderInfo.goods and orderInfo.shippingAddress for faster agent context.',
        'Use stable enum values for status (e.g. paid/shipped), and use statusText for display text.'
      ],
      currentDemoUserLabel: 'Current demo-user',
      orderListCardTitle: 'Order list (compact)',
      currentUserLabel: 'Current user',
      currentIndicator: '[Current]',
      noOrdersText: 'No orders for this user',
      consultOrderBtn: 'Consult this order',
      anonymousNoOrderAlert: 'Anonymous users have no order data. Consultation will not include order params.',
      consultParamsLabel: 'Consult params',
      orderPayloadCardTitle: 'Current order payload',
      orderStringifyHint: 'How to convert the order object to a string and pass it to the config:',
      urlParamsCardTitle: 'Current URL parameters',
      standaloneUrlLabel: 'Standalone window / new tab URL',
      paramNameCol: 'Param name',
      paramValueCol: 'Current value',
      paramPurposeCol: 'Description',
      requiredLabel: 'Required',
      optionalLabel: 'Optional',
      orderUrlHint: 'How to append order params to the URL:',
      urlParamPurposes: {
        org: 'Tenant identifier (Org UID)',
        t: 'Session type: t=0 one-to-one, t=1 workgroup, t=2 bot',
        sid: 'Agent UID / Workgroup UID / Bot UID',
        visitorUid: 'Visitor unique identifier',
        nickname: 'Visitor nickname',
        avatar: 'Visitor avatar URL',
        orderInfo: 'Order info (JSON string), includes order ID, goods, amount, shipping address, etc. Use JSON.stringify before passing.',
        extra: 'Custom extension params (JSON)',
        lang: 'Interface language',
        mode: 'Color theme mode (light / dark / auto)',
      }
    },
    vipLevelDemo: {
      title: 'Personalization Demo',
      description:
        'Provide vipLevel and other custom fields to render richer customer profiles and deliver personalized support experiences.',
      docLinks: {
        vipDoc: 'View personalization guide',
        reactExample: 'React VIP demo source',
        vueExample: 'Vue VIP demo source'
      },
      vipLabel: 'VIP Level',
      normalLabel: 'Standard user',
      vipPrefix: 'VIP',
      switchButtonLabel: 'Switch to {{name}}',
      users: {
        user1: 'Standard profile',
        user2: 'VIP 1 profile',
        user3: 'VIP 2 profile'
      },
      urlGuideTitle: 'URL + Query usage',
      urlTemplateLabel: 'Generic URL template',
      urlParamsTitle: 'Parameter reference',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target thread ID (workgroup/bot/agent)',
        'visitorUid: custom visitor ID (recommended)',
        'nickname/avatar: visitor profile (optional)',
        'vipLevel: visitor VIP level (recommend integer 0-10)',
        'extra: JSON string for custom fields (optional)',
        'lang/mode: locale and theme mode (optional)'
      ],
      sampleUrlLabel: 'Generated sample URL from current config',
      payloadGuideTitle: 'vipLevel composition and conversion',
      payloadObjectLabel: 'Step 1: business object',
      payloadJsonLabel: 'Step 2: JSON string (JSON.stringify)',
      payloadEncodedLabel: 'Step 3: URL-encoded value (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Use stable integer levels for vipLevel (such as 0-10) to align with segmentation strategy.',
        'Build extra as an object first, then serialize with JSON.stringify before passing to chatConfig.',
        'For direct URL integration, pass encoded extra; URLSearchParams in SDK flow encodes automatically.',
        'When level changes, reinitialize the widget or refresh thread parameters to apply the new profile.'
      ]
    },
    unreadCountDemo: {
      title: 'Unread Counter Demo',
      description: 'Call getUnreadMessageCount and clearUnreadMessages to stay in sync with the current user state, or manually drive the widget badge for custom business flows.',
      currentCount: 'Current unread count',
      manualTitle: 'Manual badge control',
      manualCountLabel: 'Unread',
      currentBadgeMode: 'Current badge mode',
      badgeModes: {
        hidden: 'Hidden',
        dot: 'Red dot',
        count: 'Count'
      },
      docLinks: {
        unreadDoc: 'View unread count integration guide',
        reactExample: 'React unread counter example',
        vueExample: 'Vue unread counter example'
      },
      buttons: {
        markAllRead: 'Mark all as read',
        refresh: 'Refresh unread count',
        applyManualCount: 'Apply unread count',
        showDot: 'Show red dot',
        clearBadge: 'Clear badge'
      },
      usageNotesTitle: 'Tips',
      usageNotes: [
        'Use getUnreadMessageCount() whenever you need a fresh total.',
        'Call clearUnreadMessages() after the customer reads messages.',
        'Use setUnreadMessageCount(count) to directly sync a server-pushed unread total to the floating button.',
        'Use showUnreadDot() when you only need an attention marker without exposing the exact count.',
        'Call clearUnreadBadge() to remove the badge without sending any network request.'
      ],
      urlGuideTitle: 'API URL + parameter usage',
      countApiLabel: 'Unread count endpoint (GET)',
      clearApiLabel: 'Clear unread endpoint (POST)',
      manualCountApiLabel: 'Manual unread badge API',
      showDotApiLabel: 'Red dot badge API',
      clearBadgeApiLabel: 'Clear badge API',
      urlParamsTitle: 'Shared parameters (same as SDK internals)',
      urlParams: [
        'uid: system visitor UID (from local BYTEDESK_UID)',
        'visitorUid: custom visitor UID from frontend (optional, recommended)',
        'orgUid: organization ID (from chatConfig.org)',
        'client: client type (SDK appends WEB_FLOAT automatically)'
      ],
      sampleUrlLabel: 'Sample URL for unread count request',
      sampleBodyLabel: 'Sample POST body for clearing unread',
      apiNotesTitle: 'Implementation notes',
      apiNotes: [
        'getUnreadMessageCount() maps to GET /visitor/api/v1/message/unread/count.',
        'clearUnreadMessages() maps to POST /visitor/api/v1/message/unread/clear.',
        'setUnreadMessageCount(), showUnreadDot(), and clearUnreadBadge() are local widget APIs and do not send HTTP requests.',
        'SDK reads BYTEDESK_UID from localStorage and combines it with chatConfig.visitorUid/chatConfig.org.',
        'When uid is empty, getUnreadMessageCount() returns 0 directly without sending request.'
      ]
    },
    threadHistoryDemo: {
      title: 'Visitor Thread History Demo',
      description: 'Based on the visitor ThreadList page, this demo opens /chat/thread from the SDK icon to load history threads.',
      bubbleTitle: 'Thread History',
      bubbleSubtitle: 'Click to open history list',
      anonymousUserLabel: 'Anonymous User',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      pathAlert: 'This page enables chatPath=/chat/thread. Clicking the icon opens thread history instead of /chat.',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'All other parameters are the same as /chat',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. Set chatPath to /chat/thread so icon click and showChat() both enter thread history.',
        '2. /chat/thread accepts the same params as /chat, such as org, t, sid, visitorUid, nickname, avatar.',
        '3. You can integrate directly with URL + query params without extra SDK calls.'
      ],
      buttons: {
        openHistoryPage: 'Open thread history page',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      apiGuide: {
        title: 'ThreadList API usage without widget',
        endpointLabel: 'Endpoint URL',
        fullUrlPage1Label: 'Full request URL (page 1)',
        fullUrlPage2Label: 'Full request URL (page 2)',
        queryParamsTitle: 'Query parameters',
        pagingMappingTitle: 'Paging and request behavior',
        curlExampleTitle: 'curl example',
        fetchExampleTitle: 'fetch example',
        anonymousHint: 'If anonymous mode already has a stable visitorUid, passing visitorUid alone is enough to query all history threads. If visitorUid is not available yet, initialize the visitor first to obtain uid/visitorUid.',
        queryParams: [
          'visitorUid: string (recommended; business visitor uid, sufficient by itself to fetch all history threads)',
          'orgUid: string (optional; only pass it when you need to limit the query to one organization)',
          'pageNumber: number (required; backend starts from 0, so UI page 1 should pass 0)',
          'pageSize: number (required; demo default is 10)',
          'searchText: string (optional; filter threads by keyword)'
        ],
        pagingMapping: [
          'UI current=1 -> pageNumber=0',
          'UI current=2 -> pageNumber=1',
          'The default requestKey can be understood as visitorUid|pageNumber|pageSize|searchText; orgUid is also included when explicitly provided.',
          'As long as visitorUid is stable, ThreadList can query with visitorUid only; if uid is also available, you can pass both for historical compatibility.',
          'A 403 response triggers a 30s cooldown for the same request on the frontend (FORBIDDEN_COOLDOWN_MS).'
        ]
      },
      responseGuide: {
        title: 'Response structure reference',
        topLevelTitle: 'Top-level fields',
        dataFieldsTitle: 'data paging fields',
        threadItemFieldsTitle: 'data.content[] thread fields',
        topLevelFields: [
          'message: string - response description, for example "Query succeeded"',
          'code: number - HTTP status code, 200 means success',
          'data: object - paged payload object (see field details below)'
        ],
        dataFields: [
          'content: Thread[] - thread list; see the single-thread fields below',
          'total / totalElements: number - total records',
          'totalPages: number - total pages',
          'first: boolean - whether this is the first page',
          'last: boolean - whether this is the last page',
          'numberOfElements: number - actual item count in the current page',
          'size: number - page size (maps to request parameter pageSize)',
          'number: number - current page number starting from 0 (maps to request parameter pageNumber)',
          'empty: boolean - whether the current page is empty'
        ],
        threadItemFields: [
          'uid: string - thread unique ID',
          'userUid: string - assigned agent uid',
          'orgUid: string - organization uid',
          'level: string - hierarchy level, ORGANIZATION means organization-level',
          'platform: string - platform identifier, fixed as BYTEDESK',
          'createdAt: string - thread creation time in yyyy-MM-dd HH:mm:ss format',
          'updatedAt: string - last updated time',
          'topic: string - thread topic, format: org/agent/{agentUid}/{visitorEntityUid}',
          'content: string - raw content of the latest message (i18n key or plain text)',
          'contentObject.msgType: string - message type enum such as TEXT / AGENT_CLOSED / AUTO_CLOSED / INVITE_AUDIO_CANCEL',
          'contentObject.preview: string - preview text for list rendering',
          'contentObject.payload: string - actual message content (text or JSON string)',
          'contentObject.displayText: string - final text shown to users',
          'type: string - thread type: AGENT, ROBOT, or WORKGROUP',
          'status: string - thread status: OPEN or CLOSED',
          'transferStatus: string - transfer status, NONE means no transfer',
          'closeType: string - close source: AGENT, AUTO, or VISITOR',
          'channel: string - source channel, WEB_VISITOR for web visitors',
          'top: boolean - whether pinned',
          'unread: boolean - whether the agent side has unread messages',
          'unreadCount: number - unread count on the agent side',
          'visitorUnreadCount: number - unread count on the visitor side',
          'mute: boolean - whether muted',
          'hide: boolean - whether hidden',
          'star: number - star level, 0 means none',
          'fold: boolean - whether folded',
          'offline: boolean - whether offline message',
          'tagList: string[] - tag list',
          'note: string | null - thread note',
          'extra: string - JSON string for extended config such as autoCloseMin / toolbar / requireLogin',
          'valid: boolean - whether the thread is valid; true after real visitor replies, false when it only contains system messages',
          'allMessageCount: number - total message count across visitor, agent, system, and robot',
          'visitorMessageCount: number - visitor message count',
          'agentMessageCount: number - agent message count',
          'systemMessageCount: number - system message count',
          'robotMessageCount: number - robot message count',
          'robotToAgent: boolean - whether this thread escalated from robot to agent',
          'queueMeta: object | null - queue metadata, null when not queued',
          'user: object - visitor profile object (uid / nickname / avatar / type / extra)',
          'owner: object - thread owner object, usually an administrator',
          'agent: string - agent profile JSON string (uid / nickname / avatar / type)',
          'robot: string - robot profile JSON string, "{}" when absent',
          'workgroup: string - workgroup profile JSON string, "{}" when absent',
          'agentProtobuf: object - structured agent info object',
          'workgroupProtobuf: object - structured workgroup info object',
          'robotProtobuf: object - structured robot info object',
          'transfer: object | null - transfer info, null when no transfer happened',
          'invites: object[] - invited users list',
          'monitors: object[] - monitoring users list',
          'assistants: object[] - assisting users list',
          'ticketors: object[] - ticket-related users list',
          'processInstanceId / processEntityUid: string | null - workflow IDs for ticket flows, null when not applicable'
        ]
      },
      urlGuideTitle: 'URL + Query usage',
      urlTemplateLabel: 'Generic URL template',
      urlParamsTitle: 'Parameter reference (same as /chat)',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup, 2: bot)',
        'sid: target thread ID (workgroup/bot/agent)',
        'visitorUid: custom visitor ID (recommended)',
        'nickname/avatar: visitor profile (optional)',
        'lang/mode: locale and theme mode (optional)',
        'threadDetail: whether to show the thread detail button after opening a history session (1: show, hidden by default)'
      ],
      sampleUrlLabel: 'Generated sample URL from current config',
      docLinks: {
        threadDoc: 'View thread history integration guide',
        visitorRef: 'Visitor ThreadList reference',
        reactExample: 'React thread history demo source'
      }
    },
    ticketDemo: {
      title: 'Visitor Ticket Demo',
      description: 'Demonstrates how to route the Bytedesk Web SDK entry into the visitorTicket app for ticket history, ticket submission, status lookup, detail lookup, and notification follow-up in an iframe-friendly flow.',
      bubbleTitle: 'Ticket Center',
      bubbleSubtitle: 'Open visitor ticket routes',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'The floating entry switches between dedicated /ticket routes while keeping org, sid, visitor, locale, and theme params in the query string.',
      selectedScenarioTitle: 'Ticket scenarios',
      detailTicketIdLabel: 'Ticket ID for detail route',
      detailTicketIdPlaceholder: 'Enter a real ticket UID to auto-open the detail drawer',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. Pass showNavBar=0 in chatConfig so the embedded route hides the top navigation and behaves like an in-widget page.',
        '2. The create route opens the visitor submission drawer on mount, which is suitable for AI fallback or offline handoff flows.',
      ],
      buttons: {
        closeTicket: 'Close ticket window'
      },
      routeTableTitle: 'Available visitorTicket routes',
      routeTable: {
        routeLabel: 'Route',
        purposeLabel: 'Purpose',
        exampleLabel: 'Path example'
      },
      routeRows: {
        history: {
          label: 'History tickets',
          purpose: 'List the tickets submitted by the current visitor or logged-in user.',
          example: '/ticket/history'
        },
        create: {
          label: 'Create ticket',
          purpose: 'Open the ticket submission drawer immediately after the route loads.',
          example: '/ticket/create'
        },
        notifications: {
          label: 'Message notifications',
          purpose: 'Open the same visitor ticket shell as a notification landing route for replies and status changes.',
          example: '/ticket/notifications'
        }
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from the current scenario',
      urlParamsTitle: 'Shared parameters for /ticket routes',
      urlParams: [
        'org: organization ID (required)',
        'sid: ticket workgroup ID (required)',
        't: session type inherited from the current chat profile',
        'visitorUid / nickname / avatar: optional visitor identity used to match visitor-side tickets',
        'showNavBar: pass 0 to hide the top navigation in iframe mode',
        'showHeader: pass 0 to hide TicketHeader, or 1 to show TicketHeader',
        'lang / mode: locale and theme mode (optional)',
        'backgroundColor / textColor: customize the embedded page primary color and text color to match the host theme',
        'ticketId: optional for detail route; can be passed in /ticket/detail/:ticketId or as a query parameter'
      ],
      docLinks: {
        visitorTicketRef: 'VisitorTicket route implementation',
        reactExample: 'React ticket demo source',
        agentTicketDocs: 'Agent/admin ticket docs',
        visitorTicketDocs: 'Visitor/client ticket docs',
        ticketDemoPreview: 'Ticket demo preview link'
      },
      notificationApiTitle: 'Notification Unread Count API',
      notificationApiDescription: 'Query the unread notification count for the current visitor, used to display a Badge on the notification entry button.',
      notificationApiEndpointLabel: 'Endpoint',
      notificationApiMethodLabel: 'Method',
      notificationApiParamsTitle: 'Parameters',
      notificationApiNoteTitle: '💡 Note',
      notificationApiNoteContent: 'It is recommended to use visitorUid + orgUid for direct query (the backend resolves it via a native query join on the visitor table). Passing the system userUid is also supported — use either one.',
      notificationApiRequestExample: 'Request Example',
      notificationApiResponseExample: 'Response Example',
      notificationApiParams: [
        'visitorUid: Frontend custom visitor identifier, e.g. visitor_001 (recommended, use with orgUid)',
        'orgUid: Organization ID (required when using visitorUid)',
        'channel: Channel identifier, always "HTTP" (required)',
        'userUid: System-generated visitor uid (optional, from visitor init data.uid)'
      ]
    },
    ratingDemo: {
      title: 'Visitor Rating Demo',
      description: 'Shows how to enter visitor history threads for rating-related flows. Pending rating and follow-up rating both reuse the history thread surface because rating is completed inside thread messages and history drawers rather than on a standalone page.',
      bubbleTitle: 'Service Rating',
      bubbleSubtitle: 'Open rating-related history threads',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'Supports a normal chat entry and two history-thread rating entry modes.',
      selectedScenarioTitle: 'Rating scenarios',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. There is no standalone visitor rating route today; rating is rendered inside chat and history-thread messages.',
        '2. Normal chat starts from /chat, while pending-rated and already-rated thread lists open through /chat/thread.',
        '3. ratingIntent=pending loads threads awaiting rating, and ratingIntent=followup loads already-rated threads in append-comment mode.',
        '4. threadDetail=1 is enabled so the embedded history page can expose more conversation details before rating or follow-up comment submission.'
      ],
      routeTableTitle: 'Rating entry scenario',
      routeTable: {
        routeLabel: 'Scenario',
        purposeLabel: 'Purpose',
        exampleLabel: 'Path example'
      },
      routeRows: {
        chat: {
          label: 'Normal chat',
          purpose: 'Used to demonstrate in-conversation rating during a normal chat session.',
          example: '/chat'
        },
        pending: {
          label: 'Pending rating threads',
          purpose: 'Used to demonstrate post-conversation rating from the pending rating thread list.',
          example: '/chat/thread?ratingIntent=pending'
        },
        followup: {
          label: 'Rated threads',
          purpose: 'Used to demonstrate follow-up rating from the rated thread list.',
          example: '/chat/thread?ratingIntent=followup'
        }
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from the current scenario',
      urlParamsTitle: 'Shared parameters for rating-related history entry',
      urlParams: [
        'org: organization ID (required)',
        'sid: workgroup or agent target ID (required)',
        't: session type inherited from the current chat profile',
        'visitorUid / nickname / avatar: visitor identity used to load the correct history threads',
        'lang / mode: locale and theme mode (optional)',
        'threadDetail: pass 1 to expose more thread details from the history view',
        'ratingIntent: pending or followup, used to switch between pending and rated thread lists'
      ],
      docLinks: {
        rateBubbleRef: 'Visitor RateBubble implementation',
        reactExample: 'React rating demo source'
      }
    },
    platformDemo: {
      title: 'Platform Routing Demo',
      description: 'Explains how to distinguish platform support from store support. Use the default organization orgUid=df_org_uid as the platform support tenant, treat every other orgUid as a store support tenant, and note that platform support can view all platform data.',
      bubbleTitle: 'Platform Support',
      bubbleSubtitle: 'Switch platform or store service entries',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'All scenarios keep /chat; routing is determined by org + sid + title.',
      mappingAlertTitle: 'Platform and store routing rule',
      mappingAlertDescription: 'Use orgUid=df_org_uid for platform-wide customer service. Platform support can view all platform data. Any other orgUid should be considered a store tenant, and each store tenant can publish multiple consultation entries such as presales, aftersales, logistics, or VIP support.',
      selectedScenarioTitle: 'Support entry scenarios',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. The default organization orgUid=df_org_uid represents the platform customer-service entry.',
        '2. Platform support under df_org_uid can access and view all platform-level data.',
        '3. Any orgUid other than df_org_uid should be treated as a store service tenant.',
        '4. One organization can configure multiple consultation entries by assigning different sid values, such as presales, aftersales, logistics, or membership care.',
        '5. Platform and store entries still use /chat; the actual routing comes from org, t, sid, and an optional title field.',
        '6. The store orgUid and sid values in this explanation are placeholders. Replace them with real store organization and workgroup IDs before production use.'
      ],
      routeTableTitle: 'Organization and entry examples',
      routeTable: {
        routeLabel: 'Entry',
        purposeLabel: 'Purpose',
        exampleLabel: 'Sample org/sid'
      },
      routeRows: {
        platform: {
          label: 'Platform customer service',
          purpose: 'Use the default orgUid=df_org_uid as the platform-level support tenant.',
          example: 'org=df_org_uid&sid=df_wg_uid'
        },
        presales: {
          label: 'Store presales support',
          purpose: 'Use a non-default orgUid plus a dedicated sid to route visitors to a store presales entry.',
          example: 'org=store_demo_org_uid&sid=store_presales_wg_uid'
        },
        aftersales: {
          label: 'Store aftersales support',
          purpose: 'Reuse the same store orgUid with another sid to expose a separate aftersales support entry.',
          example: 'org=store_demo_org_uid&sid=store_aftersales_wg_uid'
        }
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from the current scenario',
      urlParamsTitle: 'Shared parameters for platform/store routing',
      urlParams: [
        'org: organization ID. df_org_uid means platform support; any other value means a store tenant.',
        't: session type. Workgroup routing usually uses t=1.',
        'sid: consultation entry ID. Use different sid values for presales, aftersales, logistics, etc.',
        'title: optional browser or page title for the current entry point.',
        'visitorUid / nickname / avatar: optional visitor identity passed into the chat page.',
        'lang / mode: locale and theme mode (optional)'
      ],
      docLinks: {
        chatProfileRef: 'Demo chat-profile examples',
        reactExample: 'React platform demo source'
      }
    },
    videoSupportDemo: {
      title: 'Video Support Demo',
      description: 'Use a dedicated video support queue in chatConfig to let visitors request video-based customer service from the web entry.',
      bubbleTitle: 'Video Support',
      bubbleSubtitle: 'Connect with a video specialist',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      pathAlert: 'This page uses chatPath=/chat and a video-support sid. Click the icon to open the regular chat page in video support context.',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'Route stays /chat; business scenario is identified by sid and t.',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. Keep chatPath as /chat and set chatConfig.sid to your video support queue ID.',
        '2. Pass visitor identity (visitorUid/nickname/avatar) whenever possible for faster agent verification.',
        '3. You can open this scene via showChat() or direct URL query parameters.'
      ],
      buttons: {
        openVideoSupport: 'Open video support',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from current config',
      docLinks: {
        reactDoc: 'View React integration docs',
        vueDoc: 'View Vue integration docs',
        reactExample: 'React video support demo source'
      }
    },
    helpcenterDemo: {
      title: 'Help Center Tab Demo',
      description: 'Use tabsConfig to control multiple bottom tabs inside the embedded support window, switching between the chat window, thread history window, and help documentation window.',
      controlsTitle: 'Tab switches',
      previewTitle: 'Embedded window behavior',
      codeTitle: 'Config sample',
      currentChatProfile: 'Current chat params',
      openChatButton: 'Open chat with multiple tabs',
      openHelpcenterButton: 'Open Help Center alone',
      helpHiddenText: 'The help tab is disabled',
      windowHint: 'Click the button and check the embedded window in the bottom-right corner. messages opens chat, thread opens thread history, and help opens the help documentation tab.',
      embeddedWindowDescription: 'This page does not render the visitor Helpcenter directly. It demonstrates how BytedeskConfig.tabsConfig changes the embedded window bottom tabs.',
      enabledTabsTitle: 'Bottom tabs enabled now',
      bubbleTitle: 'Open multi-tab window',
      bubbleSubtitle: 'Open chat to try messages, thread, and help tabs',
      tabs: {
        messages: 'Messages tab',
        thread: 'Thread History tab',
        help: 'Help tab',
      }
    },
    callCenterDemo: {
      title: 'Call Center Demo',
      description: 'Demonstrates how to route users into a call center workgroup by switching sid while keeping the standard chat page path.',
      bubbleTitle: 'Call Center',
      bubbleSubtitle: 'Queue and transfer ready',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      pathAlert: 'This page keeps chatPath=/chat and targets a call-center sid to simulate queue access from web entry.',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'Route stays /call; queue is determined by chatConfig.sid.',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. Configure sid to your call center workgroup ID so all sessions enter the same queue.',
        '2. Use different visitorUid values to simulate concurrent queue users.',
        '3. For production, bind sid by business line (sales, support, after-sales) to improve routing.'
      ],
      buttons: {
        openCallCenter: 'Open call center',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from current config',
      docLinks: {
        reactDoc: 'View React integration docs',
        vueDoc: 'View Vue integration docs',
        reactExample: 'React call center demo source'
      },
      runtime: {
        title: 'Runtime Panel (SIP.js-inspired)',
        description: 'Simulate connect, queue, assignment, and completion states to validate your call-center entry workflow quickly.',
        statusLabels: {
          sdkReady: 'SDK readiness',
          queueState: 'Queue state',
          activeSessionCount: 'Active sessions',
          lastActionAt: 'Last action time'
        },
        statusValues: {
          ready: 'Ready',
          notReady: 'Not ready'
        },
        queueState: {
          idle: 'Idle',
          queueing: 'Queueing',
          serving: 'Serving'
        },
        buttons: {
          openQueue: 'Open queue entry',
          simulateAssign: 'Simulate agent assignment',
          completeSession: 'Complete current session',
          clearLogs: 'Clear logs'
        },
        logTitle: 'Activity logs',
        emptyLogs: 'No activity yet. Try the quick actions above.',
        logTemplates: {
          switchedAnonymous: 'Switched to anonymous mode.',
          switchedUser: 'Switched visitor: {{name}}.',
          openQueue: 'Opened call center entry and moved to queueing.',
          closeQueue: 'Closed the chat panel.',
          assignSession: 'Queue assignment simulated. Session is now serving.',
          completeSession: 'Service completed and session closed.'
        }
      }
    },
    proactiveDemo: {
      title: 'Proactive Acquisition Demo',
      description: 'This page connects to the default workflow and jumps directly into education screening, demand confirmation, and contact collection after opening the chat.',
      tags: {
        mobileValidation: 'Mobile validation',
        multiTurnQa: 'Multi-turn Q&A'
      },
      alertTitle: 'Validation path',
      alertDescription: 'After entering the conversation, the workflow asks for education level and intent first, then collects city, consultation scenario, and mobile number. The form will not submit if the phone number is not a valid 11-digit mainland China mobile number. Every open forces a new workflow thread.',
      workflowCardTitle: 'Default proactive workflow',
      workflowCardTag: 'Education screening + demand confirmation + contact collection',
      bubbleTitle: 'Proactive Acquisition',
      bubbleSubtitle: 'Default workflow lead capture demo',
      buttons: {
        openWorkflowChat: 'Open default workflow chat',
        closeChat: 'Close chat window'
      },
      urlParamsTitle: 'Workflow URL parameters',
      urlDescription: 'The full standalone URL changes with locale, theme mode, and visitor identity parameters. forceNewThread is kept in the SDK embed example below because it is only used when opening the workflow through the SDK to guarantee a new workflow thread.',
      urlParams: [
        'org: organization unique identifier that owns the workflow',
        't: session type; 17 means a workflow session',
        'sid: workflow unique identifier that decides which default workflow to open',
        'lang: conversation language following the current demo locale',
        'mode: theme mode following the current light or dark setting',
        'navbar: top navigation visibility flag; 1 means visible',
        'visitorUid: visitor unique identifier used to bind visitor history in identified mode',
        'nickname: visitor nickname passed through to the chat page in identified mode',
        'avatar: visitor avatar URL used for display in identified mode'
      ],
      embedCodeTitle: 'Current embed code',
      embedCodeDescription: 'The embed code below matches the live configuration on this page and can be copied directly as a fixed workflow lead-capture entry.'
    },
    webrtcDemo: {
      title: 'Audio / Video Agent Demo',
      description: 'Use the floating bubble button in the bottom-right corner to experience WebRTC real-time audio or video customer service. Call mode and visitor info are passed as URL parameters to the /webrtc page.',
      modeLimitNotice: 'Robot mode is not supported for now. Only human audio agent and human video agent are supported.',
      pathAlert: 'The floating button defaults to audio agent mode (audio=1&video=0). Use the buttons below to switch to video agent mode.',
      currentPathLabel: 'Entry path',
      currentPathHint: 'Route is always /webrtc; call type is controlled by the audio / video params.',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      callMode: 'Current call mode',
      callModeAudio: '🎙️ Audio agent (audio=1, video=0)',
      callModeVideo: '📹 Video agent (audio=1, video=1)',
      bubbleTitleAudio: 'Audio Agent',
      bubbleTitleVideo: 'Video Agent',
      bubbleSubtitleAudio: 'Click to start audio call',
      bubbleSubtitleVideo: 'Click to start video call',
      docLinks: {
        reactDoc: 'View React WebRTC docs',
        vueDoc: 'View Vue WebRTC docs',
        reactExample: 'React WebRTC demo source'
      },
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. The floating button / bubble in the bottom-right is the WebRTC entry point — clicking it opens /webrtc inside an embedded window.',
        '2. Audio agent (audio=1&video=0): microphone and speaker only — no camera needed.',
        '3. Video agent (audio=1&video=1): camera and microphone are both enabled.',
        '4. In production the CDN URL https://cdn.weiyuai.cn/webrtc is used by default; locally it points to http://127.0.0.1:9018/webrtc.',
        '5. org, t, and sid share the same values as the chat integration — no extra setup required.'
      ],
      buttons: {
        audioMode: '🎙️ Switch to audio agent',
        videoMode: '📹 Switch to video agent',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      urlGuideTitle: 'URL + Parameter reference',
      sampleUrlLabel: 'Sample URL for current config',
      urlParamsTitle: 'Parameter reference',
      urlParams: [
        'org: organization ID (required)',
        't: session type (0: one-to-one, 1: workgroup)',
        'sid: agent / workgroup ID (required)',
        'audio: enable audio (1 = on, 0 = off)',
        'video: enable video (1 = on, 0 = off)',
        'lang: locale (zh-cn, en, etc.)',
        'visitorUid: custom visitor ID (optional)',
        'nickname / avatar: visitor profile (optional)'
      ]
    },
    videoConferenceDemo: {
      title: 'Video Conference Demo',
      description: 'Demonstrates conference-style session access by assigning visitors to a dedicated meeting sid and opening chat as the entry panel.',
      bubbleTitle: 'Video Conference',
      bubbleSubtitle: 'Join meeting service',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      pathAlert: 'This page uses chatPath=/chat and switches sid to a meeting scenario, suitable for pre-meeting guidance workflows.',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'Route stays /chat; conference context is provided by chatConfig.sid.',
      usageTitle: 'Demo notes',
      usageNotes: [
        '1. Map each conference room or event to a distinct sid for clear traffic separation.',
        '2. Include visitor profile fields to simplify host-side identity checks.',
        '3. Use this mode as an entry layer before users move to your native video room.'
      ],
      buttons: {
        openVideoConference: 'Open video conference',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      urlGuideTitle: 'URL + Query usage',
      sampleUrlLabel: 'Generated sample URL from current config',
      docLinks: {
        reactDoc: 'View React integration docs',
        vueDoc: 'View Vue integration docs',
        reactExample: 'React video conference demo source'
      }
    },
    voiceAgentDemo: {
      title: 'Voice Assistant Demo',
      description: 'This page follows the visitor VoiceAgent implementation and shows how to route the Bytedesk Web SDK entry directly to /chat/voice, including voice input, text fallback, runtime status, and a full-screen voice assistant experience.',
      bubbleTitle: 'Voice Assistant',
      bubbleSubtitle: 'Hold to talk or switch to text input',
      pathAlert: 'This demo sets chatPath to /chat/voice. Clicking the floating entry, calling showChat(), or opening the direct URL all lead to the voice assistant page.',
      currentPathLabel: 'Current entry path',
      currentPathHint: 'The route is fixed to /chat/voice; org / t / sid still define the conversation target.',
      anonymousUserHint: 'Anonymous test mode: visitorUid, nickname, and avatar are omitted.',
      recommendedProfileNotice: 'Using the bot profile is recommended for a typical voice-assistant scenario, but you can keep the current org / t / sid to validate other targets as well.',
      capabilityTitle: 'Capabilities aligned with the visitor voice page',
      capabilityItems: [
        'Runtime status indicators for ready, connecting, listening, processing, error, and disconnected states.',
        'Dual input modes: press-to-talk for voice and text input as a fallback path.',
        'Message stream layout showing user messages, assistant replies, and assistant draft output.',
        'Recording overlay with live level feedback, elapsed duration, and operation guidance.'
      ],
      usageTitle: 'How this demo works',
      usageNotes: [
        '1. Keep htmlUrl as the site root and switch only chatPath to /chat/voice.',
        '2. The floating trigger still uses the chat action, so no new SDK action type is required.',
        '3. Popup, new-tab, and iframe widget flows all reuse the same URL parameters.',
        '4. Passing visitorUid / nickname / avatar is recommended so the voice page can identify the visitor context.'
      ],
      urlGuideTitle: 'URL + parameter guide',
      sampleUrlLabel: 'Sample URL generated from current config',
      urlParamsTitle: 'Parameter reference',
      urlParams: [
        'org: organization ID (required)',
        't: conversation type (0: 1:1, 1: workgroup, 2: bot)',
        'sid: target conversation ID (agent / workgroup / bot)',
        'visitorUid: custom visitor ID (recommended)',
        'nickname / avatar: visitor profile data (optional)',
        'lang: locale',
        'mode: theme mode (light / dark / system)',
        'navbar: whether to show the page navigation bar'
      ],
      buttons: {
        openVoiceAgent: 'Open voice assistant',
        switchAnonymousUser: 'Switch to anonymous user'
      },
      docLinks: {
        reactDoc: 'View React integration docs',
        vueDoc: 'View Vue integration docs',
        reactExample: 'React voice assistant demo source'
      }
    },
    documentFeedbackDemo: {
      title: 'Document Feedback Demo',
      subtitle: 'Invite readers to highlight any text, capture screenshots automatically, and submit structured feedback without leaving the page.',
      docLinks: {
        reactDoc: 'View React integration guide',
        vueDoc: 'View Vue integration guide',
        reactExample: 'View this React demo source'
      },
      setupStepsTitle: 'Quick start checklist',
      setupSteps: [
        'Install the SDK and prepare a BytedeskConfig object.',
        'Enable the document feedback feature via feedbackConfig.',
        'Render <BytedeskReact {...config} /> inside your app.',
        'Select any paragraph below to open the floating feedback tooltip.'
      ],
      highlightsTitle: 'How document feedback works',
      highlights: [
        'Select text to summon a floating “Document feedback” button that carries the selection.',
        'The SDK captures a screenshot automatically so agents see what the user saw.',
        'Category chips and rich placeholders guide users to provide actionable detail.'
      ],
      controlPanel: {
        title: 'Troubleshooting panel',
        buttons: {
          forceInit: 'Force initialize feedback',
          manualTrigger: 'Trigger feedback manually',
          testSelection: 'Test selection tooltip',
          statusCheck: 'Run status check',
          clearLogs: 'Clear feedback logs',
          inspectState: 'Inspect runtime state'
        },
        statusLabel: 'Initialization status',
        initialized: 'Ready',
        initializing: 'Waiting for SDK...'
      },
      exampleSection: {
        title: 'Demo article',
        paragraphs: [
          'BytedeskWeb ships live chat, bots, and document feedback in one lightweight widget. Users can highlight painfully specific sentences, submit screenshots, and keep reading without page reloads.',
          'The floating tooltip respects dark/light themes and supports custom icons, copy, and trigger modes. It is perfect for docs portals, knowledge bases, and long-form marketing pages.',
          'Each submission arrives with the selected text, coordinates, categories, and optional screenshots so support and docs teams can resolve issues quickly.'
        ],
        tip: 'Try highlighting any passage above to see the tooltip in action.'
      },
      logs: {
        title: 'Feedback logs',
        empty: 'No feedback yet. Highlight the content or use the manual trigger button to generate sample data.',
        selectedText: 'Selected text',
        categories: 'Categories',
        feedback: 'Feedback'
      },
      feedbackConfigText: {
        selectionText: 'Document feedback',
        dialogTitle: 'Document feedback',
        placeholder: 'Describe the issue or improvement idea in detail.',
        submitText: 'Submit feedback',
        cancelText: 'Cancel',
        successMessage: 'Thanks! We will review your feedback shortly.',
        categoryNames: [
          'Typo or translation issue',
          'Broken link',
          'Doc does not match product',
          'Hard to understand',
          'Other suggestions'
        ],
        typesSectionTitle: 'Issue types',
        typesDescription: '(multiple choice)'
      },
      manualTriggerMessage: 'This feedback was triggered manually to verify the workflow.',
      testSelectionText: 'Sample highlighted text',
      tooltipFallbackText: 'Test feedback tooltip',
      alerts: {
        missingInstance: 'BytedeskWeb instance not found. Please initialize the widget first.',
        showFeedbackMissing: 'showDocumentFeedback is unavailable on the current instance.',
        retryTimeout: 'Timed out while waiting for BytedeskWeb to initialize. Refresh the page and try again.',
        forceInitSuccess: 'Feedback feature initialized. You can start testing now.',
        forceInitFailed: 'Force initialization failed. Check the console for details.',
        statusReportTitle: 'Feature status',
        statusReportFooter: 'Open the browser console for a verbose log.',
        available: 'Available',
        missing: 'Missing',
        statusLabels: {
          bytedeskInstance: 'BytedeskWeb instance',
          html2canvas: 'html2canvas library',
          feedbackFunction: 'Document feedback API',
          feedbackEnabled: 'Feedback config enabled',
          tooltipElement: 'Tooltip element',
          dialogElement: 'Dialog element',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: 'Tooltip visibility',
          currentSelection: 'Current selection'
        }
      }
    },
    flightBookingDemo: {
      title: 'Flight Booking Demo',
      description: 'Complete flight booking, cancellation, and rebooking through AI-powered conversations. Users can interact with the AI assistant to search flights, select seats, modify orders, and more - no tedious forms required.',
      bubbleTitle: 'Need help?',
      bubbleSubtitle: 'Book/Cancel/Change flights',
      sections: {
        flightStatus: 'Flight Status',
        flightInfo: 'Flight Information',
        bookingInfo: 'Booking Details',
        passengerInfo: 'Passenger Information'
      },
      labels: {
        departure: 'Departure',
        arrival: 'Arrival',
        flightDate: 'Flight Date',
        cabinClass: 'Cabin Class',
        flightStatus: 'Flight Status',
        ticketPrice: 'Ticket Price',
        perPerson: 'person',
        bookingNo: 'Booking No.',
        bookingTime: 'Booking Time',
        paymentStatus: 'Payment Status',
        paymentMethod: 'Payment Method',
        passengerCount: 'Passengers',
        totalAmount: 'Total Amount',
        person: 'person(s)',
        passenger: 'Passenger',
        passengerName: 'Name',
        idType: 'ID Type',
        idNumber: 'ID Number',
        phone: 'Phone'
      },
      statusText: {
        scheduled: 'Scheduled',
        boarding: 'Boarding',
        departed: 'Departed',
        arrived: 'Arrived',
        cancelled: 'Cancelled'
      },
      paymentStatusText: {
        pending: 'Pending',
        paid: 'Paid',
        refunded: 'Refunded'
      },
      buttons: {
        contactSupport: 'Contact Support',
        viewItinerary: 'View Itinerary',
        changeBooking: 'Change Flight',
        cancelBooking: 'Cancel Booking'
      },
      flight: {
        airlines: {
          airChina: 'Air China',
          chinaEastern: 'China Eastern',
          chinaSouthern: 'China Southern'
        },
        cities: {
          beijing: 'Beijing',
          shanghai: 'Shanghai',
          guangzhou: 'Guangzhou',
          shenzhen: 'Shenzhen'
        },
        airports: {
          pek: 'Capital Intl Airport T3',
          pvg: 'Pudong Intl Airport T2',
          can: 'Baiyun Intl Airport T2',
          szx: 'Bao\'an Intl Airport T3'
        },
        cabinClasses: {
          economy: 'Economy',
          business: 'Business',
          first: 'First Class'
        }
      },
      passenger: {
        samplePassenger1: 'John Smith',
        samplePassenger2: 'Jane Doe',
        idTypes: {
          idCard: 'ID Card',
          passport: 'Passport',
          other: 'Other'
        }
      },
      booking: {
        paymentMethods: {
          alipay: 'Alipay',
          wechat: 'WeChat Pay',
          card: 'Credit Card'
        }
      }
    },
    onlineDemo: {
      title: 'Online SDK Demo',
      description: 'This sample loads the published npm package, enables invite/bubble/feedback features, and exposes quick control buttons.',
      docLinks: {
        reactDoc: 'View React integration guide',
        vueDoc: 'View Vue integration guide',
        reactExample: 'React online demo source',
        vueExample: 'Vue online demo source'
      },
      docLinksTitle: 'Documentation links',
      feedbackSectionTitle: 'Document feedback walkthrough',
      usageTitle: 'How to try it',
      usageSteps: [
        'Highlight any sentence below.',
        'A floating tooltip labeled “Document feedback” appears near your cursor.',
        'Click the tooltip to open the dialog, review the selected text, and submit your note.'
      ],
      exampleParagraphs: [
        'BytedeskWeb blends live chat, bots, and contextual document feedback to close the loop between docs and support.',
        'Selections automatically capture screenshots so the support team sees the exact context.',
        'Use the buttons below to toggle chat UI elements or manually trigger document feedback.'
      ],
      manualTriggerButton: 'Trigger document feedback',
      manualTriggerMessage: 'A sample feedback payload triggered from the online demo.',
      controlPanelTitle: 'Control panel',
      controlPanelDescription: 'Call common SDK helpers to toggle chat UI elements and verify theme behavior.'
    }
  },
  components: {
    installGuide: {
      title: 'Installation guide',
      sections: {
        installDeps: {
          title: '1. Install dependencies',
          code: 'npm install bytedesk-web\n# or\nyarn add bytedesk-web'
        },
        importComponent: {
          title: '2. Import the component',
          code: "import { BytedeskReact } from 'bytedesk-web/react';\nimport type { BytedeskConfig } from 'bytedesk-web/react';"
        },
        config: {
          title: '3. Configure parameters',
          minimalTitle: 'Minimal config (required)',
          minimalCode: `const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
  },
};`,
          minimalNote: 'org, t, and sid are mandatory. Replace them with your own organization and routing IDs.',
          fullTitle: 'Full config (optional)',
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
    text: 'Need help?',
    icon: '👋',
    delay: 1000,
    loop: true,
    loopDelay: 10000,
    loopCount: 3,
    acceptText: 'Start chat',
    rejectText: 'Maybe later',
    onAccept: () => console.log('Invite accepted'),
    onReject: () => console.log('Invite rejected'),
    onClose: () => console.log('Invite closed'),
    onOpen: () => console.log('Invite opened'),
  },
  feedbackConfig: {
    enabled: true,
    trigger: 'selection',
    showOnSelection: true,
    selectionText: 'Document feedback',
    buttonText: 'Document feedback',
    dialogTitle: 'Submit feedback',
    placeholder: 'Describe the issue or suggestion',
    submitText: 'Submit',
    cancelText: 'Cancel',
    successMessage: 'Thank you for the feedback!',
    onSubmit: (feedbackData) => console.log('Feedback:', feedbackData),
    onCancel: () => console.log('Feedback canceled'),
  },
  bubbleConfig: {
    show: true,
    icon: '💬',
    title: 'Need help?',
    subtitle: 'Click to chat',
  },
  buttonConfig: {
    show: true,
    icon: '💬',
    text: 'Support',
    width: 60,
    height: 60,
    onClick: () => console.log('Launcher clicked'),
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
  onShowChat: () => console.log('Chat opened'),
  onHideChat: () => console.log('Chat hidden'),
  onMessage: (message: string, type: string) => console.log('Message:', message, type),
  onConfigChange: (nextConfig: BytedeskConfig) => console.log('Config changed:', nextConfig),
  onVisitorInfo: (uid: string, visitorUid: string) => console.log('Visitor info:', uid, visitorUid),
};`
        },
        usage: {
          title: '4. Use the component',
          code: `const App = () => {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div>
      <BytedeskReact {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        Open chat
      </button>
    </div>
  );
};`
        },
        methods: {
          title: '5. Available methods',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: 'Show the floating launcher button' },
            { code: '(window as any).bytedesk?.hideButton()', description: 'Hide the launcher button' },
            { code: '(window as any).bytedesk?.showBubble()', description: 'Display the bubble message' },
            { code: '(window as any).bytedesk?.hideBubble()', description: 'Hide the bubble message' },
            { code: '(window as any).bytedesk?.showChat()', description: 'Open the chat window' },
            { code: '(window as any).bytedesk?.hideChat()', description: 'Close the chat window' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: 'Show the invite dialog' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: 'Hide the invite dialog' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: 'Open the document feedback dialog (new)' }
          ]
        },
        feedback: {
          title: '6. Document feedback overview',
          intro: 'Document feedback lets users highlight snippets on any page, capture a screenshot automatically, and file contextual requests.',
          bullets: [
            'Automatically detects text selections and surfaces a "Document feedback" tooltip.',
            'Captures the current screen with html2canvas to provide visual context.',
            'Records the exact selection so developers can jump directly to the issue.',
            'Supports text-selection triggers, manual buttons, or both.',
            'Expose onSubmit/onCancel hooks so you can forward payloads to your own backend.'
          ],
          tip: 'Install html2canvas to enable automatic screenshots:',
          tipCommand: 'npm install html2canvas'
        }
      }
    }
  }
};
