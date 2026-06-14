import { en } from './en';

const basicDemoFieldDocs = {
  isDebug: '是否啟用偵錯日誌。開發聯調時建議啟用，生產環境通常關閉。',
  forceRefresh: '是否強制重新整理聊天頁或 iframe 資源，適合偵測快取問題。',
  apiUrl: '介面服務根位址。用於訪客初始化、未讀數、反饋上傳等 API 請求。',
  htmlUrl: '聊天頁面站點根位址。建議只傳站點根路徑，由 chatPath/threadPath/webrtcPath/callPath 控制頁面類型。',
  chatPath: '文字聊天頁面路徑，showChat() 預設使用該路徑。',
  threadPath: '歷史會話頁面路徑，showThread() 會切換到該路徑。',
  webrtcPath: '音視訊頁面路徑，showWebrtc() 會切換到該路徑。',
  callPath: '呼叫中心頁面路徑，showCall() 會切換到該路徑。',
  locale: '介面語言，例如 zh-cn、en、ja-jp。會寫入聊天 URL 的 lang 參數。',
  placement: '入口按鈕與聊天視窗停靠位置，支援 bottom-left 和 bottom-right。',
  marginBottom: '入口距離底部的間距，單位 px。',
  marginSide: '入口距離左右邊緣的間距，單位 px。',
  autoPopup: '初始化完成後是否自動彈出聊天視窗。',
  autoPopupDelay: '自動彈出的延遲時間，單位毫秒。',
  draggable: '是否允許拖動入口模組。啟用後用戶可拖動按鈕位置。',
  tabsConfig: '控制聊天頁內置 tab 的顯隱，包括 help、thread、messages。',
  bubbleConfig: '控制入口上方提示氣泡，包括標題、副標題、多條輪播、切換方式等。',
  buttonConfig: '單入口按鈕設定。只有一個入口時通常使用這個物件。',
  buttonsConfig: '多入口按鈕陣列。設定後優先級高於 buttonConfig，用於同時展示 chat、thread、webrtc、call、二維碼等入口。',
  inviteConfig: '邀請彈窗設定，可控制顯示時機、迴圈、按鈕文案與回調。',
  theme: '主題與配色設定，包括 light/dark/system 模式、文字色和背景色。',
  animation: '聊天視窗顯示/隱藏時的動畫時長和緩動函式。',
  window: '聊天視窗寬高設定，桌面端以該尺寸渲染。',
  onInit: 'SDK 初始化完成回調。適合記錄埋點或通知宿主頁面。',
  onShowChat: '聊天視窗顯示後觸發。',
  onHideChat: '聊天視窗隱藏後觸發。',
  onMessage: '接收 iframe 或 SDK 內部訊息時觸發，可用於聯動頁面狀態。',
  onConfigChange: '設定被更新後觸發，方便監測設定變更。',
  onVisitorInfo: '訪客初始化完成後傳回 uid 與 visitorUid，適合保存到業務系統。',
  'theme.mode': '主題模式，可選 light、dark、system。',
  'theme.textColor': '入口按鈕或模組內文字顏色。',
  'theme.backgroundColor': '入口按鈕、導覽或模組背景主色。',
  'bubble.show': '是否顯示入口上方提示氣泡。',
  'bubble.icon': '單條氣泡預設圖示。',
  'bubble.title': '單條氣泡標題。',
  'bubble.subtitle': '單條氣泡副標題。',
  'bubble.messages': '多條氣泡文案陣列。設定後優先於 icon/title/subtitle 單條設定。',
  'bubble.autoRotate': '是否自動輪播多條氣泡訊息。',
  'bubble.rotateInterval': '氣泡輪播間隔，單位毫秒。',
  'bubble.switchMode': '輪播方式，可選 fade、slide-up、ticker。',
  'button.show': '是否顯示該入口按鈕。',
  'button.icon': '按鈕圖示，通常使用 emoji 或簡短符號。',
  'button.text': '按鈕文字。單入口圓形按鈕建議不傳，多入口矩形模組建議傳入。',
  'button.width': '按鈕寬度，單位 px。',
  'button.height': '按鈕高度，單位 px。',
  'button.action': '內置入口類型，可選 chat、thread、webrtc、call。未傳 onClick 時按 action 自動呼叫對應入口。',
  'button.previewImageUrl': '滑鼠懸浮時展示的圖片位址，適合放企微/個微二維碼。',
  'button.previewImageAlt': '預覽圖片說明文案，會顯示在二維碼大圖下方。',
  'button.onClick': '自訂點擊邏輯。傳入後會覆寫預設 action 行為。',
  'invite.show': '是否啟用邀請彈窗。',
  'invite.text': '邀請內容文案。',
  'invite.icon': '邀請彈窗圖示。',
  'invite.delay': '首次顯示邀請彈窗的延遲時間。',
  'invite.loop': '是否迴圈顯示邀請彈窗。',
  'invite.loopDelay': '迴圈顯示的間隔時間。',
  'invite.loopCount': '迴圈顯示次數。',
  'invite.acceptText': '接受邀請按鈕文案。',
  'invite.rejectText': '拒絕邀請按鈕文案。',
  'invite.onAccept': '使用者接受邀請時觸發。',
  'invite.onReject': '使用者拒絕邀請時觸發。',
  'invite.onClose': '邀請彈窗關閉時觸發。',
  'invite.onOpen': '邀請彈窗開啟時觸發。',
  'chat.org': '組織 ID，必填。',
  'chat.t': '會話類型，必填。t=0 代表客服一對一，t=1 代表工作組，t=2 代表機器人。',
  'chat.sid': '會話目標 ID，必填。',
  'chat.uid': '系統內部使用者 ID，通常由 SDK 自動維護，不建議手動傳。',
  'chat.visitorUid': '業務側自訂訪客唯一標識，用於跨端辨識同一訪客。',
  'chat.nickname': '訪客暱稱。',
  'chat.avatar': '訪客頭像位址。',
  'chat.mobile': '訪客手機號。',
  'chat.email': '訪客電子郵件。',
  'chat.note': '客服側可見的備註資訊。',
  'chat.channel': '渠道來源標識，例如官網、App、小程式。',
  'chat.goodsInfo': '商品資訊，適合電商場景透傳。',
  'chat.orderInfo': '訂單資訊，適合售後或訂單諮詢場景。',
  'chat.extra': '額外擴充欄位，通常傳 JSON 字串。',
  'chat.vipLevel': '會員等級。',
  'chat.debug': '區分本地測試和線上環境的業務標記。',
  'chat.draft': '灰度標識，會透傳為 URL draft=1。',
  'chat.settingsUid': '設定唯一 ID，主要用於偵錯設定。',
  'chat.loadHistory': '是否載入歷史訊息。loadHistory=1 時開啟對話頁面預設載入歷史聊天記錄。',
  'chat.threadDetail': '是否顯示會話詳情按鈕。threadDetail=1 時顯示，預設不顯示。',
  'chat.visitorProfile': '是否顯示訪客資料按鈕。visitorProfile=1 時顯示，預設不顯示。',
  'chat.custom': '支援繼續追加其他自訂業務欄位，都會被拼入聊天 URL 參數。',
  'browse.referrer': '來源頁面位址。',
  'browse.url': '目前頁面 URL。',
  'browse.title': '目前頁面標題。',
  'browse.custom': '支援繼續追加業務瀏覽資訊，例如頁面 ID、活動來源等。',
  'feedback.enabled': '是否啟用文件反饋能力。',
  'feedback.trigger': '觸發方式，可選 selection、button、both。',
  'feedback.showOnSelection': '選中文字時是否展示反饋入口。',
  'feedback.selectionText': '選中文字時的提示文案。',
  'feedback.buttonText': '固定反饋按鈕文案。',
  'feedback.dialogTitle': '反饋對話框標題。',
  'feedback.placeholder': '反饋輸入框占位文字。',
  'feedback.submitText': '提交按鈕文案。',
  'feedback.cancelText': '取消按鈕文案。',
  'feedback.successMessage': '提交成功後的提示文案。',
  'feedback.categoryNames': '反饋問題分類清單。',
  'feedback.requiredTypes': '是否強制至少選擇一個問題分類。',
  'feedback.typesSectionTitle': '分類區域標題。',
  'feedback.typesDescription': '分類說明文案，例如「可多選」。',
  'feedback.submitScreenshot': '是否連同螢幕擷取畫面一起提交。',
  'feedback.onSubmit': '自訂反饋提交流程。',
  'feedback.onCancel': '取消反饋時觸發。',
  'animation.enabled': '是否啟用聊天視窗動畫。',
  'animation.duration': '動畫持續時間，單位毫秒。',
  'animation.type': '緩動類型，可選 ease、linear、ease-in、ease-out、ease-in-out。',
  'window.width': '桌面端聊天視窗寬度。',
  'window.height': '桌面端聊天視窗高度。',
  'tabs.messages': '是否顯示訊息 tab。',
  'tabs.thread': '是否顯示歷史會話 tab。',
  'tabs.help': '是否顯示說明 tab。',
} as const;

export const zhTw = {
  common: {
    languageLabel: '語言',
    languageOptions: {
      en: 'English',
      'zh-cn': '簡體中文',
      'zh-tw': '繁體中文',
      'ja-jp': '日本語',
      'ko-kr': '한국어',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Español',
      'fr-fr': 'Français',
      'th-th': 'ไทย'
    },
    themeLabel: '主題模式',
    themeOptions: {
      light: '淺色',
      dark: '深色',
      system: '跟隨系統'
    },
    officialSiteLabel: '微語官方網站',
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
      cancel: '取消',
      openInNewWindow: '彈窗獨立視窗',
      openInNewTab: '在新分頁開啟'
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
    helpcenterDemo: '❔ 幫助中心示範',
    videoSupportDemo: '🎥 影片客服示範',
    webrtcDemo: '📹 音視訊客服示範',
    callCenterDemo: '📞 电话客服示範',
    proactiveDemo: '🎯 主動獲客示範',
    voiceAgentDemo: '🎙️ 語音助手示範',
    videoConferenceDemo: '🎬 視訊會議示範',
    documentFeedbackDemo: '📝 文件回饋示範',
    flightBookingDemo: '✈️ 機票預訂示範'
  },
  pages: {
    basicDemo: {
      title: '微語基本設定',
      intro: '透過下方按鈕即可快速體驗 Bytedesk Web SDK 的常見能力。',
      themeButtonLabel: '切換導航顏色',
      themeTextButtonLabel: '切換導航字體顏色',
      bubbleTitle: '需要幫忙嗎？',
      bubbleSubtitle: '點擊開始對話',
      placement: {
        bottomLeft: '左下角',
        bottomRight: '右下角'
      },
      navbarLabel: '隱藏上方導覽',
      navbarHidden: '是',
      navbarShown: '否',
      navbarParamPurpose: '是否隱藏頂部導覽列。navbar=0 時隱藏導覽。',
      qrCodeParamLabel: '顯示 QR Code 按鈕',
      threadDetailParamLabel: '顯示會話詳情按鈕',
      visitorProfileParamLabel: '顯示訪客資料按鈕',
      loadHistoryLabel: '載入歷史訊息',
      loadHistoryEnabled: '開啟',
      loadHistoryDisabled: '關閉',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: '預設',
      defaultTextColorLabel: '預設',
      currentConfigTitle: '目前設定',
      copyConfig: '複製配置 JSON',
      urlParamsTitle: '參數說明',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（客服 / 工作組 / 機器人）',
        'visitorUid：傳給獨立頁的自訂訪客 ID（可選）',
        'nickname / avatar：聊天頁展示的訪客資訊（可選）',
        'lang：獨立頁使用的語言參數',
        'mode：主題模式（light / dark）',
        'backgroundColor / textColor：浮動入口主題顏色',
        'navbar：是否隱藏頂部導覽列',
        'qrcode：是否顯示當前對話 QR Code 按鈕（1：顯示，0：隱藏）',
        'threadDetail：是否顯示會話詳情按鈕（1：顯示，預設不顯示）',
        'visitorProfile：是否顯示訪客資料按鈕（1：顯示，預設不顯示）',
        'loadHistory：是否載入歷史會話訊息',
        'title：啟用後傳入自訂聊天標題',
        'browse：傳給頁面的瀏覽上下文 JSON'
      ],
      manualEncodeHint: '手動拼接 URL 時，建議對 nickname、avatar、title 與 browse JSON 使用 encodeURIComponent 編碼。',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      title: '第三方業務系統使用者資訊對接示範',
      description:
        '此示例展示如何將第三方業務系統中的使用者資訊（visitorUid、暱稱、頭像等）透過設定參數傳入客服元件，協助客服快速辨識目前訪客並串聯業務上下文。可透過下方按鈕切換不同的業務系統測試使用者。',
      switchUser: '切換使用者',
      switchToUserLabel: '切換到 {{name}}',
      switchAnonymousUserLabel: '切換到匿名使用者',
      anonymousUserLabel: '匿名使用者',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar 等使用者資訊',
      currentUserTitle: '目前業務系統使用者資訊',
      currentUserIdLabel: '使用者 ID',
      currentUserNicknameLabel: '暱稱',
      contactSupport: '聯絡客服',
      inviteText: '您好，請問有什麼可以協助您？',
      docLinks: {
        userInfoDoc: '查看第三方業務系統使用者資訊對接文件',
        reactExample: 'React 第三方業務系統使用者資訊範例程式',
        vueExample: 'Vue 第三方業務系統使用者資訊範例程式'
      },
      controlPanel: {
        title: '微語介面控制台',
        chatWindow: '聊天視窗控制',
        button: '按鈕控制',
        bubble: '氣泡控制',
        invite: '邀請對話框控制'
      },
      urlGuideTitle: '目前獨立視窗完整 URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明（用於 /chat）',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（建議）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'mobile/email/note：使用者附加資訊（選填）',
        'extra：自訂擴充欄位，建議傳 JSON 字串（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      parameterLabel: '參數',
      currentValueLabel: '目前值',
      purposeLabel: '說明',
      requiredLabel: '必填',
      optionalLabel: '選填',
      manualEncodeHint: '手動組裝 URL 時，建議對 nickname、avatar、email、note、extra 使用 encodeURIComponent 編碼。',
      switchApiTitle: '切換使用者後的 API 呼叫（僅嵌入式整合）',
      switchApiDescription: '以下說明僅適用於以嵌入式方式整合 bytedesk-web SDK 的情境。在你自己的應用程式中更新 chatConfig 時，目前傳給 SDK 的訪客參數會改變，但 SDK 仍會把訪客身份快取到 localStorage。切換使用者後，建議再次呼叫訪客初始化介面，讓 SDK 依最新 visitorUid 重新比對並刷新快取身份。',
      switchApiNotes: [
        '實名使用者切換：更新 visitorUid、nickname、avatar 後，呼叫 initVisitor()，讓 SDK 用最新使用者資訊重新執行一次訪客初始化。',
        '匿名使用者切換：先呼叫 resetAnonymousVisitor() 清除已快取的訪客 UID，再呼叫 initVisitor() 重新初始化匿名訪客。',
        '如果你是透過 showChat(...)、新分頁或新視窗開啟會話，建議在切換使用者並完成上述呼叫後再開啟，確保產生的 URL 與目前使用者資訊一致。'
      ],
      apiHintPrefix: '呼叫程式：',
      users: {
        user1: '用戶小明',
        user2: '用戶小紅',
        user3: '用戶小美'
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
      },
      urlGuideTitle: 'URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明（用於 /chat）',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（選填）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'goodsInfo：商品資訊 JSON 字串（建議）',
        'extra：擴充欄位 JSON 字串（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      payloadGuideTitle: 'goodsInfo 參數組成與轉換',
      payloadObjectLabel: 'Step 1：業務物件（Object）',
      payloadJsonLabel: 'Step 2：JSON 字串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 編碼結果（encodeURIComponent）',
      payloadNotesTitle: '轉換說明',
      payloadNotes: [
        '建議先以物件組裝 goodsInfo，再透過 JSON.stringify 傳入 chatConfig。',
        'URL 直連可傳編碼後的 goodsInfo；使用 URLSearchParams 時會自動編碼。',
        'goodsInfo.extra 通常為字串化 JSON，用於承載 sku、庫存等附加資訊。',
        '若欄位過多，優先保留 uid/title/image/price 等核心欄位，避免 URL 過長。'
      ],
      shopGoodsCardTitle: '店鋪與商品（緊湊列表）',
      currentShopLabel: '目前店鋪',
      consultGoodsBtn: '諮詢該商品',
      consultParamsLabel: '諮詢參數',
      goodsPayloadCardTitle: '目前發送的商品參數',
      goodsStringifyHint: '如何將商品物件轉為字串並傳入設定：',
      urlParamsCardTitle: '目前 URL 參數列表',
      standaloneUrlLabel: '獨立視窗 / 新分頁 URL',
      paramNameCol: '參數名',
      paramValueCol: '目前值',
      paramPurposeCol: '參數說明',
      requiredLabel: '必填',
      optionalLabel: '選填',
      goodsUrlHint: '如何將商品參數加入 URL：',
      urlParamPurposes: {
        org: '租戶識別碼（Org UID）',
        t: '會話類型。t=0 客服一對一，t=1 工作組，t=2 機器人',
        sid: '客服 UID / 工作組 UID / 機器人 UID',
        visitorUid: '訪客唯一識別碼',
        nickname: '訪客暱稱',
        avatar: '訪客頭像 URL',
        goodsInfo: '商品資訊（JSON 字串），包含商品名稱、圖片、價格、連結等。需使用 JSON.stringify 轉換後傳入',
        extra: '自訂擴充參數（JSON）',
        lang: '介面語言',
        mode: '顏色主題模式（light / dark / auto）',
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
      },
      urlGuideTitle: 'URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明（用於 /chat）',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（選填）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'orderInfo：訂單資訊 JSON 字串（建議）',
        'extra：擴充欄位 JSON 字串（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      payloadGuideTitle: 'orderInfo 參數組成與轉換',
      payloadObjectLabel: 'Step 1：業務物件（Object）',
      payloadJsonLabel: 'Step 2：JSON 字串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 編碼結果（encodeURIComponent）',
      payloadNotesTitle: '轉換說明',
      payloadNotes: [
        '建議先組裝完整訂單物件，再透過 JSON.stringify 傳入 chatConfig。',
        'URL 直連可傳編碼後的 orderInfo；使用 URLSearchParams 時會自動編碼。',
        '建議在 orderInfo.goods 與 shippingAddress 中保留核心欄位，便於客服快速定位問題。',
        'status 建議使用穩定列舉值（如 paid/shipped），statusText 用於顯示文案。'
      ],
      currentDemoUserLabel: '目前 demo-user',
      orderListCardTitle: '訂單列表（緊湊）',
      currentUserLabel: '目前用戶',
      currentIndicator: '【目前】',
      noOrdersText: '目前用戶暫無訂單',
      consultOrderBtn: '諮詢該訂單',
      anonymousNoOrderAlert: '匿名用戶無訂單資料，本次諮詢不會帶入訂單參數',
      consultParamsLabel: '諮詢參數',
      orderPayloadCardTitle: '目前發送的訂單參數',
      orderStringifyHint: '如何將訂單物件轉為字串並傳入設定：',
      urlParamsCardTitle: '目前 URL 參數列表',
      standaloneUrlLabel: '獨立視窗 / 新分頁 URL',
      paramNameCol: '參數名',
      paramValueCol: '目前值',
      paramPurposeCol: '參數說明',
      requiredLabel: '必填',
      optionalLabel: '選填',
      orderUrlHint: '如何將訂單參數加入 URL：',
      urlParamPurposes: {
        org: '租戶識別碼（Org UID）',
        t: '會話類型。t=0 客服一對一，t=1 工作組，t=2 機器人',
        sid: '客服 UID / 工作組 UID / 機器人 UID',
        visitorUid: '訪客唯一識別碼',
        nickname: '訪客暱稱',
        avatar: '訪客頭像 URL',
        orderInfo: '訂單資訊（JSON 字串），包含訂單號、商品、金額、收貨地址等。需使用 JSON.stringify 轉換後傳入',
        extra: '自訂擴充參數（JSON）',
        lang: '介面語言',
        mode: '顏色主題模式（light / dark / auto）',
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
      },
      urlGuideTitle: 'URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（建議）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'vipLevel：訪客 VIP 等級（建議 0-10 整數）',
        'extra：擴展欄位 JSON 字串（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      payloadGuideTitle: 'vipLevel 參數組成與轉換',
      payloadObjectLabel: 'Step 1：業務物件（Object）',
      payloadJsonLabel: 'Step 2：JSON 字串（JSON.stringify）',
      payloadEncodedLabel: 'Step 3：URL 編碼結果（encodeURIComponent）',
      payloadNotesTitle: '轉換說明',
      payloadNotes: [
        'vipLevel 建議使用穩定整數等級（如 0-10），便於客服端套用分層策略。',
        'extra 建議先組裝為物件，再透過 JSON.stringify 傳入 chatConfig。',
        'URL 直連可傳編碼後的 extra；使用 URLSearchParams 時會自動編碼。',
        '當會員等級變更時，建議重新初始化元件或刷新會話參數。'
      ]
    },
    unreadCountDemo: {
      title: '未讀訊息計數示範',
      description: '示範如何呼叫 getUnreadMessageCount 與 clearUnreadMessages 以同步目前使用者狀態，並支援業務端手動控制懸浮按鈕角標。',
      currentCount: '目前未讀數',
      manualTitle: '手動角標控制',
      manualCountLabel: '未讀數',
      currentBadgeMode: '目前角標模式',
      badgeModes: {
        hidden: '不顯示',
        dot: '紅點',
        count: '數字'
      },
      docLinks: {
        unreadDoc: '查看未讀訊息對接文件',
        reactExample: 'React 未讀訊息範例程式',
        vueExample: 'Vue 未讀訊息範例程式'
      },
      buttons: {
        markAllRead: '全部標記已讀',
        refresh: '重新整理未讀數',
        applyManualCount: '設定未讀數',
        showDot: '顯示紅點',
        clearBadge: '清空角標'
      },
      usageNotesTitle: '使用提示',
      usageNotes: [
        '需要即時總數時呼叫 getUnreadMessageCount()。',
        '閱讀完成後可呼叫 clearUnreadMessages() 歸零未讀數。',
        '如需手動同步業務端未讀總數，可呼叫 setUnreadMessageCount(count) 直接更新懸浮按鈕角標。',
        '如只需提示有新訊息而不顯示具體數字，可呼叫 showUnreadDot() 顯示紅點。',
        '如不需發請求、只想本地移除角標，可呼叫 clearUnreadBadge()。'
      ],
      urlGuideTitle: '介面 URL + 參數使用說明',
      countApiLabel: '取得未讀數介面（GET）',
      clearApiLabel: '清空未讀數介面（POST）',
      manualCountApiLabel: '手動設定數字角標介面',
      showDotApiLabel: '顯示紅點介面',
      clearBadgeApiLabel: '清空角標介面',
      urlParamsTitle: '共用參數說明（與 SDK 內部實作一致）',
      urlParams: [
        'uid：系統訪客 UID（來自本地 BYTEDESK_UID）',
        'visitorUid：前端自訂訪客 UID（選填，建議傳）',
        'orgUid：組織 ID（來自 chatConfig.org）',
        'client：客戶端類型（SDK 內部固定追加 WEB_FLOAT）'
      ],
      sampleUrlLabel: '取得未讀數示例請求 URL',
      sampleBodyLabel: '清空未讀數示例請求體（POST Body）',
      apiNotesTitle: '實作說明',
      apiNotes: [
        'getUnreadMessageCount() 對應 GET /visitor/api/v1/message/unread/count。',
        'clearUnreadMessages() 對應 POST /visitor/api/v1/message/unread/clear。',
        'setUnreadMessageCount()、showUnreadDot()、clearUnreadBadge() 屬於本地角標控制介面，不會發送 HTTP 請求。',
        'SDK 會先從 localStorage 讀取 BYTEDESK_UID，再結合 chatConfig.visitorUid/chatConfig.org 組裝參數。',
        '當 uid 為空時，getUnreadMessageCount() 會直接回傳 0，不會發送請求。'
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
      apiGuide: en.pages.threadHistoryDemo.apiGuide,
      responseGuide: en.pages.threadHistoryDemo.responseGuide,
      urlGuideTitle: 'URL + 參數使用說明',
      urlTemplateLabel: '通用 URL 範本',
      urlParamsTitle: '參數說明（與 /chat 一致）',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（工作組/機器人/客服）',
        'visitorUid：自訂訪客 ID（建議）',
        'nickname/avatar：訪客顯示資訊（選填）',
        'lang/mode：語言與主題參數（選填）'
      ],
      sampleUrlLabel: '依目前設定產生的示例 URL',
      docLinks: {
        threadDoc: '查看歷史會話對接文件',
        visitorRef: '參考 visitor ThreadList 實作',
        reactExample: 'React 歷史會話示範原始碼'
      }
    },
    videoSupportDemo: {
      title: '影片客服示範',
      description: '透過切換 chatConfig.sid 到影片客服工作組，示範網頁入口如何進入影片客服服務場景。',
      bubbleTitle: '影片客服',
      bubbleSubtitle: '連線影片客服專席',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar',
      pathAlert: '本頁使用 chatPath=/chat，並以影片客服 sid 區分業務場景；點擊圖示會進入一般聊天頁。',
      currentPathLabel: '目前入口路徑',
      currentPathHint: '路徑固定為 /chat，業務分流由 sid 與 t 控制。',
      usageTitle: '示範說明',
      usageNotes: [
        '1. 保持 chatPath=/chat，並將 chatConfig.sid 設定為影片客服隊列 ID。',
        '2. 建議傳 visitorUid/nickname/avatar，方便客服快速辨識訪客。',
        '3. 可透過 showChat() 或 URL 參數直連方式進入此場景。'
      ],
      buttons: {
        openVideoSupport: '開啟影片客服',
        switchAnonymousUser: '切換到匿名使用者'
      },
      urlGuideTitle: 'URL + 參數使用說明',
      sampleUrlLabel: '依目前設定產生的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: 'React 影片客服示範原始碼'
      }
    },
    helpcenterDemo: {
      title: '幫助中心 Tab 示範',
      description: '透過 tabsConfig 控制嵌入式客服視窗底部多個 tab 的顯示與隱藏，用於在同一個小窗中切換對話視窗、歷史會話視窗和幫助文件視窗。',
      controlsTitle: 'Tab 開關',
      previewTitle: '嵌入式視窗效果',
      codeTitle: '設定範例',
      currentChatProfile: '目前諮詢參數',
      openChatButton: '開啟多 Tab 客服視窗',
      openHelpcenterButton: '單獨開啟幫助中心',
      helpHiddenText: 'help tab 已關閉',
      windowHint: '點擊按鈕後查看右下角嵌入式視窗，底部會顯示已啟用的 tab。messages 開啟對話視窗，thread 開啟歷史會話視窗，help 開啟幫助文件視窗。',
      embeddedWindowDescription: '本頁不直接渲染 visitor 的 Helpcenter 頁面，只示範 BytedeskConfig.tabsConfig 如何影響嵌入式視窗底部 tab。',
      enabledTabsTitle: '目前將顯示的底部 tab',
      bubbleTitle: '查看多 Tab 視窗',
      bubbleSubtitle: '開啟客服視窗體驗 help、thread、messages tab',
      tabs: {
        messages: '訊息 tab',
        thread: '歷史會話 tab',
        help: '幫助 tab',
      }
    },
    callCenterDemo: {
      title: '呼叫中心示範',
      description: '透過切換 sid 到呼叫中心工作組，示範如何將網頁訪客統一路由到呼叫中心排隊入口。',
      bubbleTitle: '呼叫中心',
      bubbleSubtitle: '排隊與轉接場景',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar',
      pathAlert: '本頁維持 chatPath=/chat，透過呼叫中心 sid 模擬統一排隊入口。',
      currentPathLabel: '目前入口路徑',
      currentPathHint: '路徑固定為 /call，排隊隊列由 chatConfig.sid 決定。',
      usageTitle: '示範說明',
      usageNotes: [
        '1. 將 sid 設定為呼叫中心工作組 ID，可讓會話進入同一排隊池。',
        '2. 使用不同 visitorUid 可模擬多位訪客同時排隊。',
        '3. 正式環境可依售前/售後/技術線拆分不同 sid。'
      ],
      buttons: {
        openCallCenter: '開啟呼叫中心',
        switchAnonymousUser: '切換到匿名使用者'
      },
      urlGuideTitle: 'URL + 參數使用說明',
      sampleUrlLabel: '依目前設定產生的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: 'React 呼叫中心示範原始碼'
      },
      runtime: {
        title: '執行面板（參考 SIP.js Demo）',
        description: '模擬連線、排隊、分派與完結等狀態，快速驗證呼叫中心入口的聯動流程。',
        statusLabels: {
          sdkReady: 'SDK 就緒狀態',
          queueState: '隊列狀態',
          activeSessionCount: '進行中會話數',
          lastActionAt: '最近操作時間'
        },
        statusValues: {
          ready: '已就緒',
          notReady: '未就緒'
        },
        queueState: {
          idle: '閒置',
          queueing: '排隊中',
          serving: '服務中'
        },
        buttons: {
          openQueue: '開啟排隊入口',
          simulateAssign: '模擬分派坐席',
          completeSession: '完成本次服務',
          clearLogs: '清空日誌'
        },
        logTitle: '事件日誌',
        emptyLogs: '暫無事件，請先使用上方快捷操作。',
        logTemplates: {
          switchedAnonymous: '已切換為匿名模式。',
          switchedUser: '已切換訪客：{{name}}。',
          openQueue: '已開啟呼叫中心入口並進入排隊。',
          closeQueue: '已關閉聊天面板。',
          assignSession: '已模擬排隊成功並分派到坐席。',
          completeSession: '服務完成，本次會話已結束。'
        }
      }
    },
    webrtcDemo: {
      title: '音視訊客服示範',
      description: '透過右下角懸浮按鈕（bubble）體驗 WebRTC 即時音視訊通話客服，支援音訊客服與視訊客服兩種模式，參數透過 URL 傳遞給 /webrtc 頁面。',
      modeLimitNotice: '暫不支援機器人模式，僅支援人工語音客服與人工視訊客服。',
      pathAlert: '右下角懸浮按鈕預設觸發音訊客服（audio=1&video=0），可透過下方按鈕切換為視訊客服模式。',
      currentPathLabel: '目前入口路徑',
      currentPathHint: '路徑固定為 /webrtc，通話類型由 audio / video 參數決定。',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar',
      callMode: '目前呼叫模式',
      callModeAudio: '🎙️ 音訊客服（audio=1,video=0）',
      callModeVideo: '📹 視訊客服（audio=1,video=1）',
      bubbleTitleAudio: '音訊客服',
      bubbleTitleVideo: '視訊客服',
      bubbleSubtitleAudio: '點擊連線音訊客服',
      bubbleSubtitleVideo: '點擊連線視訊客服',
      docLinks: {
        reactDoc: '查看 React 音視訊客服文件',
        vueDoc: '查看 Vue 音視訊客服文件',
        reactExample: 'React 音視訊客服示範原始碼'
      },
      usageTitle: '示範說明',
      usageNotes: [
        '1. 右下角懸浮按鈕 / 氣泡即為音視訊客服入口，點擊後在內嵌視窗中開啟 /webrtc 頁面。',
        '2. 音訊客服（audio=1&video=0）：僅使用麥克風和喇叭，無需攝影機。',
        '3. 視訊客服（audio=1&video=1）：同時啟用攝影機與麥克風進行雙向視訊通話。',
        '4. 正式環境預設使用 CDN 網址 https://cdn.weiyuai.cn/webrtc，本機開發使用 http://127.0.0.1:9018/webrtc。',
        '5. org、t、sid 參數與聊天介面保持一致，無需額外對接設定。'
      ],
      buttons: {
        audioMode: '🎙️ 切換為音訊客服',
        videoMode: '📹 切換為視訊客服',
        switchAnonymousUser: '切換為匿名使用者'
      },
      urlGuideTitle: 'URL + 參數說明',
      sampleUrlLabel: '目前設定產生的示例 URL',
      urlParamsTitle: '參數說明',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組）',
        'sid：客服 / 工作組 ID（必填）',
        'audio：是否啟用音訊（1 啟用，0 停用）',
        'video：是否啟用視訊（1 啟用，0 停用）',
        'lang：語言（zh-cn / en 等）',
        'visitorUid：自訂訪客 ID（選填）',
        'nickname / avatar：訪客顯示資訊（選填）'
      ]
    },
    videoConferenceDemo: {
      title: '視訊會議示範',
      description: '透過會議專用 sid 示範會議接入流程，聊天面板可作為會前引導與身份確認入口。',
      bubbleTitle: '視訊會議',
      bubbleSubtitle: '進入會議服務',
      anonymousUserHint: '目前為匿名測試：不傳 visitorUid、nickname、avatar',
      pathAlert: '本頁使用 chatPath=/chat，並以會議 sid 區分場景，適合會前諮詢與接入引導。',
      currentPathLabel: '目前入口路徑',
      currentPathHint: '路徑固定為 /chat，會議上下文由 chatConfig.sid 提供。',
      usageTitle: '示範說明',
      usageNotes: [
        '1. 可依會議室或活動場次分配不同 sid，以利流量隔離。',
        '2. 建議傳入訪客身份欄位，方便主持側做入會前確認。',
        '3. 此模式適合作為視訊會議前置諮詢入口，再跳轉到你的會議系統。'
      ],
      buttons: {
        openVideoConference: '開啟視訊會議',
        switchAnonymousUser: '切換到匿名使用者'
      },
      urlGuideTitle: 'URL + 參數使用說明',
      sampleUrlLabel: '依目前設定產生的示例 URL',
      docLinks: {
        reactDoc: '查看 React 集成文件',
        vueDoc: '查看 Vue 集成文件',
        reactExample: 'React 視訊會議示範原始碼'
      }
    },
    proactiveDemo: {
      title: '主動獲客示範',
      description: '這個頁面接入預設工作流，點擊按鈕後會直接進入學歷篩查、訴求確認與聯絡方式採集流程。',
      tags: {
        mobileValidation: '手機號校驗',
        multiTurnQa: '多輪問答'
      },
      alertTitle: '驗證路徑',
      alertDescription: '進入對話後會依序收集學歷、訴求，再要求填寫城市、諮詢場景與手機號。當手機號不符合 11 位中國大陸手機格式時，表單不會提交。每次打開都會強制新建工作流會話。',
      workflowCardTitle: '預設主動獲客工作流',
      workflowCardTag: '學歷篩查 + 訴求確認 + 聯絡方式採集',
      bubbleTitle: '主動獲客',
      bubbleSubtitle: '預設工作流留資示範',
      buttons: {
        openWorkflowChat: '打開預設工作流對話',
        closeChat: '關閉會話視窗'
      },
      urlParamsTitle: '工作流參數說明',
      urlDescription: '目前獨立視窗完整 URL 會跟隨 locale、主題模式與訪客身份參數變化；forceNewThread 用於 SDK 打開會話時強制新建 workflow 執行緒，因此保留在下方嵌入程式碼中展示。',
      urlParams: [
        'org: 組織唯一標識，指定工作流所屬組織',
        't: 會話類型，17 表示 workflow 工作流會話',
        'sid: 工作流唯一標識，決定進入哪條預設工作流',
        'lang: 會話語言，跟隨當前示例頁 locale',
        'mode: 主題模式，跟隨當前淺色或深色配置',
        'navbar: 頂部導航顯示開關，1 表示顯示',
        'visitorUid: 訪客唯一標識，實名模式下用於綁定歷史訪客',
        'nickname: 訪客暱稱，實名模式下透傳到會話頁',
        'avatar: 訪客頭像位址，實名模式下用於展示頭像'
      ],
      embedCodeTitle: '目前嵌入程式碼',
      embedCodeDescription: '目前嵌入程式碼與本頁實際接入設定一致，複製後可直接作為固定 workflow 留資入口使用。'
    },
    voiceAgentDemo: {
      title: '語音助手示範',
      description: '參考 visitor 專案中的 VoiceAgent 實作，這個頁面演示如何透過 Bytedesk Web SDK 將入口直接導向 /chat/voice，體驗語音輸入、文字回退、狀態提示與全屏語音助手介面。',
      bubbleTitle: '語音助手',
      bubbleSubtitle: '按住說話，或切換為文字輸入',
      pathAlert: '本頁將 chatPath 設為 /chat/voice。點擊右下角入口、呼叫 showChat()，或直接打開 URL，都會進入語音助手頁。',
      currentPathLabel: '當前入口路徑',
      currentPathHint: '路徑固定為 /chat/voice；組織與會話身份仍由 org / t / sid 控制。',
      anonymousUserHint: '當前為匿名測試：不傳 visitorUid、nickname、avatar',
      recommendedProfileNotice: '建議優先使用機器人測試配置來模擬語音助手場景；如需驗證其他接待目標，也可沿用當前 org / t / sid。',
      capabilityTitle: '對齊 visitor 語音頁的能力',
      capabilityItems: [
        '狀態提示：ready、connecting、listening、processing、error 等階段會在語音頁內即時顯示。',
        '雙輸入模式：支援按住說話，也支援切換為文字輸入作為備援。',
        '訊息流佈局：語音頁會顯示使用者訊息、AI 回覆與助手草稿內容。',
        '錄音遮罩層：長按錄音時會顯示音量回饋、錄音時長與操作提示。'
      ],
      usageTitle: '示範說明',
      usageNotes: [
        '1. 保持 htmlUrl 為站點根地址，僅透過 chatPath=/chat/voice 切換到語音助手頁。',
        '2. 右下角懸浮按鈕仍使用 chat action，因此不需要擴充新的 SDK action 類型。',
        '3. popup、新分頁與 iframe 內嵌小窗三種入口會使用同一組 URL 參數。',
        '4. 建議傳入 visitorUid / nickname / avatar，方便語音頁識別與回填訪客身份。'
      ],
      urlGuideTitle: 'URL + 參數說明',
      sampleUrlLabel: '當前配置生成的示例 URL',
      urlParamsTitle: '參數說明',
      urlParams: [
        'org：組織 ID（必填）',
        't：會話類型（0：一對一，1：工作組，2：機器人）',
        'sid：會話目標 ID（客服 / 工作組 / 機器人）',
        'visitorUid：自訂訪客 ID（建議）',
        'nickname / avatar：訪客展示資訊（可選）',
        'lang：語言',
        'mode：主題模式（light / dark / system）',
        'navbar：是否顯示語音頁導覽列'
      ],
      buttons: {
        openVoiceAgent: '打開語音助手',
        switchAnonymousUser: '切換到匿名用戶'
      },
      docLinks: {
        reactDoc: '查看 React 集成文檔',
        vueDoc: '查看 Vue 集成文檔',
        reactExample: 'React 語音助手演示源碼'
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
