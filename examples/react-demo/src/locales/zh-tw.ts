export const zhTw = {
  common: {
    languageLabel: '語言',
    languageOptions: {
      en: 'English',
      'zh-cn': '簡體中文',
      'zh-tw': '繁體中文'
    },
    themeLabel: '主題模式',
    themeOptions: {
      light: '淺色',
      dark: '深色',
      system: '跟隨系統'
    },
    officialSiteLabel: '官方網站',
    resetAnonymousVisitorLabel: '重設匿名訪客',
    resetAnonymousVisitorSuccess: '匿名訪客已重設',
    docLinks: {
      react: '查看 React 集成文件',
      vue: '查看 Vue 集成文件',
      reactExample: 'React 基礎範例程式',
      vueExample: 'Vue 基礎範例程式',
      userInfo: '查看使用者資訊對接文件',
      goodsInfo: '查看商品資訊對接文件',
      orderInfo: '查看訂單資訊對接文件',
      vipLevel: '查看千人千面文件',
      unreadCount: 'React 未讀訊息範例',
      documentFeedback: '文件回饋功能說明'
    },
    buttons: {
      openChat: '開啟對話',
      openChatWithParams: '帶參數開啟對話',
      closeChat: '關閉對話',
      showButton: '顯示按鈕',
      hideButton: '隱藏按鈕',
      showBubble: '顯示氣泡',
      hideBubble: '隱藏氣泡',
      showInvite: '顯示邀請',
      hideInvite: '隱藏邀請',
      togglePlacement: '切換位置',
      toggleThemeColor: '切換主題色',
      reset: '重設',
      copy: '複製',
      submit: '提交',
      cancel: '取消'
    },
    apiHintPrefix: '呼叫程式：'
  },
  nav: {
    more: '更多',
    basicDemo: '⚙️ 基本設定',
    userInfoDemo: '👤 使用者資訊對接',
    goodsInfoDemo: '🛒 商品資訊對接',
    orderInfoDemo: '📦 訂單資訊對接',
    vipLevelDemo: '👑 千人千面',
    unreadCountDemo: '🔔 未讀訊息對接',
    threadHistoryDemo: '🧵 歷史會話示範',
    documentFeedbackDemo: '📝 文件回饋示範',
    flightBookingDemo: '✈️ 機票預訂示範'
  },
  pages: {
    basicDemo: {
      title: '微語基本設定',
      intro: '透過下方按鈕即可快速體驗 Bytedesk Web SDK 的常見能力。',
      themeButtonLabel: '切換主題色',
      bubbleTitle: '需要幫忙嗎？',
      bubbleSubtitle: '點擊開始對話',
      placement: {
        bottomLeft: '左下角',
        bottomRight: '右下角'
      },
      loadHistoryLabel: '載入歷史訊息',
      loadHistoryEnabled: '開啟',
      loadHistoryDisabled: '關閉',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: '預設',
      currentConfigTitle: '目前設定',
      copyConfig: '複製配置 JSON'
    },
    userInfoDemo: {
      title: '使用者資訊對接示範',
      description:
        '此示例展示如何透過設定檔將 visitorUid、暱稱與頭像傳入客服元件，並透過按鈕切換不同的測試使用者。',
      switchUser: '切換使用者',
      switchToUserLabel: '切換到 {{name}}',
      switchAnonymousUserLabel: '切換到匿名使用者',
      anonymousUserLabel: '匿名使用者',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar 等使用者資訊',
      currentUserTitle: '目前使用者資訊',
      currentUserIdLabel: '使用者 ID',
      currentUserNicknameLabel: '暱稱',
      contactSupport: '聯絡客服',
      inviteText: '您好，請問有什麼可以協助您？',
      docLinks: {
        userInfoDoc: '查看使用者資訊對接文件',
        reactExample: 'React 使用者資訊範例程式',
        vueExample: 'Vue 使用者資訊範例程式'
      },
      controlPanel: {
        title: '微語介面控制台',
        chatWindow: '聊天視窗控制',
        button: '按鈕控制',
        bubble: '氣泡控制',
        invite: '邀請對話框控制'
      },
      apiHintPrefix: '呼叫程式：',
      users: {
        user1: '訪客小明',
        user2: '訪客小紅',
        user3: '訪客小李'
      }
    },
    goodsInfoDemo: {
      title: '商品資訊對接示範',
      description:
        '將商品編號、名稱、圖片、描述、價格、連結與標籤同步到客服對話中，協助顧問快速掌握商品背景。',
      docLinks: {
        goodsDoc: '查看商品資訊對接文件',
        reactExample: 'React 商品資訊範例程式',
        vueExample: 'Vue 商品資訊範例程式'
      },
      infoCardTitle: '商品詳情',
      tagsLabel: '標籤',
      descriptionLabel: '商品介紹',
      priceLabel: '售價',
      contactSupport: '聯絡客服',
      product: {
        title: '比亞迪 仰望U7 豪華純電轎車',
        description:
          '仰望 U7 採用最新刀片電池平台，最大續航 1000 公里，支援 L3 智駕並配置全景天窗與豪華內裝。',
        tags: ['新能源', '豪華房車', '智慧駕駛', '長續航']
      },
      controlPanel: {
        title: '微語介面控制台',
        chatWindow: '聊天視窗控制'
      }
    },
    orderInfoDemo: {
      title: '訂單資訊對接示範',
      description: '把訂單編號、狀態、付款方式與收件資訊同步到對話裡，協助客服加速售後流程。',
      docLinks: {
        orderDoc: '查看訂單資訊對接文件',
        reactExample: 'React 訂單資訊範例程式',
        vueExample: 'Vue 訂單資訊範例程式'
      },
      sections: {
        statusTimeline: '訂單狀態',
        orderInfo: '訂單資訊',
        goodsInfo: '商品資訊',
        shippingInfo: '收貨資訊'
      },
      labels: {
        orderId: '訂單編號',
        orderTime: '下單時間',
        orderStatus: '訂單狀態',
        paymentMethod: '付款方式',
        totalAmount: '訂單金額',
        unitPrice: '單價',
        quantity: '數量',
        receiver: '收貨人',
        phone: '聯絡電話',
        address: '收貨地址'
      },
      statusText: {
        pending: '待付款',
        paid: '已付款',
        shipped: '已出貨',
        delivered: '已完成'
      }
    },
    vipLevelDemo: {
      title: '千人千面示範',
      description:
        '傳入 vipLevel 與自訂欄位，即可在客服端顯示會員等級並提供差異化互動。',
      docLinks: {
        vipDoc: '查看千人千面文件',
        reactExample: 'React 千人千面範例程式',
        vueExample: 'Vue 千人千面範例程式'
      },
      vipLabel: 'VIP 等級',
      normalLabel: '一般會員',
      vipPrefix: 'VIP',
      switchButtonLabel: '切換到 {{name}}',
      users: {
        user1: '一般體驗帳號',
        user2: 'VIP1 體驗帳號',
        user3: 'VIP2 體驗帳號'
      }
    },
    unreadCountDemo: {
      title: '未讀訊息計數示範',
      description: '示範如何呼叫 getUnreadMessageCount 與 clearUnreadMessages 以同步目前使用者狀態。',
      currentCount: '目前未讀數',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: 'React 未讀訊息範例程式',
        vueExample: 'Vue 未讀訊息範例程式'
      },
      buttons: {
        markAllRead: '全部標記已讀',
        refresh: '重新整理未讀數'
      },
      usageNotesTitle: '使用提示',
      usageNotes: [
        '需要即時總數時呼叫 getUnreadMessageCount()。',
        '閱讀完成後可呼叫 clearUnreadMessages() 歸零未讀數。'
      ]
    },
    threadHistoryDemo: {
      title: '訪客歷史會話拉取示範',
      description: '參考 visitor 專案 ThreadList，示範如何讓 SDK 圖示點擊後進入 /chat/thread 歷史會話頁。',
      bubbleTitle: '歷史會話',
      bubbleSubtitle: '點擊查看歷史會話列表',
      anonymousUserLabel: '匿名使用者',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar',
      pathAlert: '本頁已啟用 chatPath=/chat/thread，點擊右下角圖示會開啟歷史會話頁而非 /chat。',
      currentPathLabel: '目前入口路徑',
      currentPathHint: '其餘參數與 /chat 頁面一致',
      usageTitle: '示範說明',
      usageNotes: [
        '1. 設定 chatPath 為 /chat/thread 後，圖示點擊與 showChat() 都會進入歷史會話頁。',
        '2. /chat/thread 與 /chat 使用相同參數，例如 org、t、sid、visitorUid、nickname、avatar。',
        '3. 支援直接使用 URL + 參數方式整合，不需要額外 SDK 呼叫。'
      ],
      buttons: {
        openHistoryPage: '開啟歷史會話頁',
        switchAnonymousUser: '切換到匿名使用者'
      },
      urlGuideTitle: 'URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明（與 /chat 一致）',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型，0/1/2',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（建議）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        visitorRef: '參考 visitor ThreadList 實作',
        reactExample: 'React 歷史會話示範原始碼'
      }
    },
    documentFeedbackDemo: {
      title: '文件回饋示範',
      subtitle: '讓讀者高亮文字、帶著截圖直接回報問題，串連文件品質與客服支持。',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: '查看本頁 React 原始碼'
      },
      setupStepsTitle: '快速上手清單',
      setupSteps: [
        '安裝 SDK 並建立 BytedeskConfig 設定。',
        '在 feedbackConfig 啟用文件回饋與文字選取觸發。',
        '在畫面中渲染 <BytedeskReact {...config} />。',
        '選取下方任一段落即可看到「文件回饋」提示按鈕。'
      ],
      highlightsTitle: '文件回饋運作方式',
      highlights: [
        '選中文字即會顯示懸浮提示並攜帶內容。',
        'SDK 會自動截圖，方便還原使用者視角。',
        '分類標籤與佔位文字協助產出可執行的建議。'
      ],
      controlPanel: {
        title: '除錯工具面板',
        buttons: {
          forceInit: '強制初始化回饋',
          manualTrigger: '手動觸發回饋',
          testSelection: '測試文字選取',
          statusCheck: '檢查功能狀態',
          clearLogs: '清空回饋紀錄',
          inspectState: '檢視執行狀態'
        },
        statusLabel: '初始化狀態',
        initialized: '✅ 已就緒',
        initializing: '⏳ 等待 SDK...'
      },
      exampleSection: {
        title: '示例文章',
        paragraphs: [
          'BytedeskWeb 結合即時客服、機器人與文件回饋。使用者可精準標記句子、附上截圖並即時送出意見。',
          '懸浮提示支援亮/暗色系與自訂圖示，特別適合文件中心、知識庫與長篇內容。',
          '每筆回饋附帶選中文字、座標、分類與可選截圖，協助內容與客服團隊迅速定位問題。'
        ],
        tip: '試著選取上方任一段落，立即體驗提示氣泡。'
      },
      logs: {
        title: '回饋紀錄',
        empty: '尚無資料，請選取內容或點擊「手動觸發回饋」。',
        selectedText: '選中文字',
        categories: '問題類型',
        feedback: '回饋內容'
      },
      feedbackConfigText: {
        selectionText: '文件回饋',
        dialogTitle: '文件回饋',
        placeholder: '請描述問題或改善建議',
        submitText: '提交回饋',
        cancelText: '取消',
        successMessage: '感謝您的意見，我們會儘速處理。',
        categoryNames: [
          '錯字／翻譯問題',
          '連結異常',
          '文件與產品不符',
          '內容難以理解',
          '其他建議'
        ],
        typesSectionTitle: '問題類型',
        typesDescription: '（可多選）'
      },
      manualTriggerMessage: '這是一則手動觸發的文件回饋示例。',
      testSelectionText: '測試選取的文字內容',
      tooltipFallbackText: '📝 測試回饋提示',
      alerts: {
        missingInstance: '找不到 BytedeskWeb 實例，請先初始化元件。',
        showFeedbackMissing: '目前實例未提供 showDocumentFeedback 方法。',
        retryTimeout: '等候實例初始化逾時，請重新整理後再試。',
        forceInitSuccess: '回饋功能已完成初始化，歡迎測試。',
        forceInitFailed: '強制初始化失敗，請查看主控台訊息。',
        statusReportTitle: '功能狀態檢查',
        statusReportFooter: '詳細資訊已輸出至主控台。',
        available: '可用',
        missing: '不可用',
        statusLabels: {
          bytedeskInstance: 'BytedeskWeb 實例',
          html2canvas: 'html2canvas 函式庫',
          feedbackFunction: '文件回饋方法',
          feedbackEnabled: '回饋設定啟用',
          tooltipElement: '提示框元素',
          dialogElement: '對話框元素',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: '提示框顯示狀態',
          currentSelection: '目前選中文字'
        }
      }
    },
    flightBookingDemo: {
      title: '機票預訂示範',
      description: '透過 AI 智慧對話實現機票預訂、退票、改簽等全流程服務。使用者可直接與 AI 客服對話完成航班查詢、座位選擇、訂單修改等操作，無需繁瑣的表單填寫。',
      bubbleTitle: '需要協助嗎？',
      bubbleSubtitle: '機票預訂/退票/改簽',
      sections: {
        flightStatus: '航班狀態',
        flightInfo: '航班資訊',
        bookingInfo: '訂單資訊',
        passengerInfo: '乘客資訊'
      },
      labels: {
        departure: '出發',
        arrival: '抵達',
        flightDate: '出發日期',
        cabinClass: '艙等',
        flightStatus: '航班狀態',
        ticketPrice: '票價',
        perPerson: '人',
        bookingNo: '訂單編號',
        bookingTime: '下單時間',
        paymentStatus: '付款狀態',
        paymentMethod: '付款方式',
        passengerCount: '乘客人數',
        totalAmount: '訂單總額',
        person: '人',
        passenger: '乘客',
        passengerName: '姓名',
        idType: '證件類型',
        idNumber: '證件號碼',
        phone: '聯絡電話'
      },
      statusText: {
        scheduled: '待起飛',
        boarding: '登機中',
        departed: '已起飛',
        arrived: '已抵達',
        cancelled: '已取消'
      },
      paymentStatusText: {
        pending: '待付款',
        paid: '已付款',
        refunded: '已退款'
      },
      buttons: {
        contactSupport: '諮詢客服',
        viewItinerary: '查看行程單',
        changeBooking: '改簽機票',
        cancelBooking: '取消訂單'
      },
      flight: {
        airlines: {
          airChina: '中國國際航空',
          chinaEastern: '中國東方航空',
          chinaSouthern: '中國南方航空'
        },
        cities: {
          beijing: '北京',
          shanghai: '上海',
          guangzhou: '廣州',
          shenzhen: '深圳'
        },
        airports: {
          pek: '首都國際機場 T3',
          pvg: '浦東國際機場 T2',
          can: '白雲國際機場 T2',
          szx: '寶安國際機場 T3'
        },
        cabinClasses: {
          economy: '經濟艙',
          business: '商務艙',
          first: '頭等艙'
        }
      },
      passenger: {
        samplePassenger1: '張三',
        samplePassenger2: '李四',
        idTypes: {
          idCard: '身分證',
          passport: '護照',
          other: '其他'
        }
      },
      booking: {
        paymentMethods: {
          alipay: '支付寶',
          wechat: '微信支付',
          card: '銀行卡'
        }
      }
    },
    onlineDemo: {
      title: '線上 SDK 示範',
      description: '此示例直接載入 npm 套件，啟用邀請、氣泡與文件回饋並提供快速控制按鈕。',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: 'React 線上示範原始碼',
        vueExample: 'Vue 線上示範原始碼'
      },
      docLinksTitle: '參考文件',
      feedbackSectionTitle: '文件回饋體驗',
      usageTitle: '體驗步驟',
      usageSteps: [
        '選取下方任一句話。',
        '游標旁會出現「文件回饋」提示按鈕。',
        '點擊按鈕閱讀選中文字並提交回饋。'
      ],
      exampleParagraphs: [
        'BytedeskWeb 將即時客服、機器人與文件回饋整合於單一元件。',
        '每次選取文字都會自動截圖，讓客服精準還原情境。',
        '使用下方按鈕可控制聊天元件或手動觸發文件回饋。'
      ],
      manualTriggerButton: '手動觸發文件回饋',
      manualTriggerMessage: '線上示範所產生的文件回饋內容。',
      controlPanelTitle: '常用控制面板',
      controlPanelDescription: '使用這些按鈕直接呼叫 SDK 介面，觀察主題切換與彈窗行為。'
    }
  },
  components: {
    installGuide: {
      title: '安裝步驟',
      sections: {
        installDeps: {
          title: '1. 安裝依賴',
          code: 'npm install bytedesk-web\n# 或\nyarn add bytedesk-web'
        },
        importComponent: {
          title: '2. 匯入元件',
          code: "import { BytedeskReact } from 'bytedesk-web/react';\nimport type { BytedeskConfig } from 'bytedesk-web/react';"
        },
        config: {
          title: '3. 設定參數',
          minimalTitle: '最小參數設定（必填）',
          minimalCode: `const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
  },
};`,
          minimalNote: 'org / t / sid 為必要欄位，請替換成您自己的組織與路由資訊。',
          fullTitle: '完整參數設定（可選）',
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
    text: '需要幫忙嗎？',
    icon: '👋',
    delay: 1000,
    loop: true,
    loopDelay: 10000,
    loopCount: 3,
    acceptText: '開始對話',
    rejectText: '稍後再說',
    onAccept: () => console.log('使用者接受邀請'),
    onReject: () => console.log('使用者拒絕邀請'),
    onClose: () => console.log('邀請視窗關閉'),
    onOpen: () => console.log('邀請視窗開啟'),
  },
  feedbackConfig: {
    enabled: true,
    trigger: 'selection',
    showOnSelection: true,
    selectionText: '文件回饋',
    buttonText: '文件回饋',
    dialogTitle: '提交意見回饋',
    placeholder: '請描述你的問題或建議',
    submitText: '提交回饋',
    cancelText: '取消',
    successMessage: '回饋已送出，感謝你的意見！',
    onSubmit: (feedbackData) => console.log('收到回饋資料:', feedbackData),
    onCancel: () => console.log('使用者取消回饋'),
  },
  bubbleConfig: {
    show: true,
    icon: '💬',
    title: '需要幫忙嗎？',
    subtitle: '點擊開始對話',
  },
  buttonConfig: {
    show: true,
    icon: '💬',
    text: '線上客服',
    width: 60,
    height: 60,
    onClick: () => console.log('按鈕被點擊'),
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
  onShowChat: () => console.log('聊天視窗顯示'),
  onHideChat: () => console.log('聊天視窗隱藏'),
  onMessage: (message: string, type: string) => console.log('收到訊息:', message, type),
  onConfigChange: (nextConfig: BytedeskConfig) => console.log('設定變更:', nextConfig),
  onVisitorInfo: (uid: string, visitorUid: string) => console.log('訪客資訊:', uid, visitorUid),
};`
        },
        usage: {
          title: '4. 使用元件',
          code: `const App = () => {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <div>
      <BytedeskReact {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        開啟對話
      </button>
    </div>
  );
};`
        },
        methods: {
          title: '5. 可用方法',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: '顯示按鈕' },
            { code: '(window as any).bytedesk?.hideButton()', description: '隱藏按鈕' },
            { code: '(window as any).bytedesk?.showBubble()', description: '顯示氣泡訊息' },
            { code: '(window as any).bytedesk?.hideBubble()', description: '隱藏氣泡訊息' },
            { code: '(window as any).bytedesk?.showChat()', description: '顯示聊天視窗' },
            { code: '(window as any).bytedesk?.hideChat()', description: '隱藏聊天視窗' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: '顯示邀請視窗' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: '隱藏邀請視窗' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: '顯示文件回饋對話框（新功能）' }
          ]
        },
        feedback: {
          title: '6. 文件回饋功能說明',
          intro: '文件回饋協助使用者標記文字、附帶截圖並回報問題，讓支援與內容團隊快速閉環。',
          bullets: [
            '自動偵測文字選取並顯示「文件回饋」提示。',
            '整合 html2canvas 進行螢幕截圖，保留畫面上下文。',
            '記錄精準選中文字，方便工程或技術人員定位。',
            '支援選取觸發、按鈕觸發或混合使用。',
            '提供 onSubmit / onCancel 回呼，可串接自有後端。'
          ],
          tip: '請安裝 html2canvas 以啟用自動截圖：',
          tipCommand: 'npm install html2canvas'
        }
      }
    }
  }
};
