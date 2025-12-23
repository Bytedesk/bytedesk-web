export const en = {
  common: {
    languageLabel: 'Language',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Simplified Chinese',
      'zh-tw': 'Traditional Chinese'
    },
    themeLabel: 'Theme Mode',
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    officialSiteLabel: 'Official site',
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
      cancel: 'Cancel'
    },
    apiHintPrefix: 'API calls:'
  },
  nav: {
    localDemo: '⚙️ Basic Setup',
    userInfoDemo: '👤 User Info',
    goodsInfoDemo: '🛒 Goods Info',
    orderInfoDemo: '📦 Order Info',
    vipLevelDemo: '👑 Personalization',
    unreadCountDemo: '🔔 Unread Counter',
    documentFeedbackDemo: '📝 Doc Feedback',
    flightBookingDemo: '✈️ Flight Booking'
  },
  pages: {
    localDemo: {
      title: 'Bytedesk Basic Setup',
      intro: 'Use the quick actions below to experience common Bytedesk Web SDK features.',
      themeButtonLabel: 'Switch theme color',
      bubbleTitle: 'Need help?',
      bubbleSubtitle: 'Click to start chat',
      placement: {
        bottomLeft: 'Bottom Left',
        bottomRight: 'Bottom Right'
      },
      defaultColorLabel: 'Default',
      currentConfigTitle: 'Current Config',
      copyConfig: 'Copy Config JSON'
    },
    userInfoDemo: {
      title: 'User Info Integration Demo',
      description:
        'Pass visitorUid, nickname, avatar and more through the config object so agents instantly recognize the user. Use the buttons to switch between mock users.',
      switchUser: 'Switch user',
      switchToUserLabel: 'Switch to {{name}}',
      currentUserTitle: 'Current User',
      currentUserIdLabel: 'User ID',
      currentUserNicknameLabel: 'Nickname',
      contactSupport: 'Contact Support',
      inviteText: 'Hello, how can we help you?',
      docLinks: {
        userInfoDoc: 'View user info integration docs',
        reactExample: 'React user info sample',
        vueExample: 'Vue user info sample'
      },
      controlPanel: {
        title: 'Bytedesk Control Panel',
        chatWindow: 'Chat window controls',
        button: 'Button controls',
        bubble: 'Bubble controls',
        invite: 'Invite dialog controls'
      },
      apiHintPrefix: 'API calls:',
      users: {
        user1: 'Visitor Xiao Ming',
        user2: 'Visitor Xiao Hong'
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
      }
    },
    unreadCountDemo: {
      title: 'Unread Counter Demo',
      description: 'Call getUnreadMessageCount and clearUnreadMessages to stay in sync with the current user state.',
      currentCount: 'Current unread count',
      docLinks: {
        reactDoc: 'View React integration guide',
        vueDoc: 'View Vue integration guide',
        reactExample: 'React unread counter example',
        vueExample: 'Vue unread counter example'
      },
      buttons: {
        markAllRead: 'Mark all as read',
        refresh: 'Refresh unread count'
      },
      usageNotesTitle: 'Tips',
      usageNotes: [
        'Use getUnreadMessageCount() whenever you need a fresh total.',
        'Call clearUnreadMessages() after the customer reads messages.'
      ]
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
