import { en } from './en';

export const jaJp = {
  ...en,
  common: {
    ...en.common,
    languageLabel: '言語',
    languageOptions: {
      en: 'English',
      'zh-cn': '簡体字中国語',
      'zh-tw': '繁体字中国語',
      'ja-jp': '日本語',
      'ko-kr': '韓国語',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'スペイン語',
      'fr-fr': 'フランス語',
      'th-th': 'タイ語（タイ）'
    },
    themeLabel: 'テーマ',
    themeOptions: {
      light: 'ライト',
      dark: 'ダーク',
      system: 'システムに従う'
    },
    officialSiteLabel: 'Bytedesk 公式サイト',
    resetAnonymousVisitorLabel: '匿名訪問者をリセット',
    resetAnonymousVisitorSuccess: '匿名訪問者をリセットしました',
    docLinks: {
      ...en.common.docLinks,
      react: 'React 統合ドキュメントを見る',
      vue: 'Vue 統合ドキュメントを見る',
      reactExample: 'React 基本統合コード例',
      vueExample: 'Vue 基本統合コード例',
      userInfo: 'ユーザー情報連携ドキュメントを見る',
      goodsInfo: '商品情報連携ドキュメントを見る',
      orderInfo: '注文情報連携ドキュメントを見る',
      vipLevel: 'パーソナライズ連携ドキュメントを見る',
      unreadCount: 'React 未読件数サンプル',
      documentFeedback: 'ドキュメントフィードバック機能ガイド'
    },
    buttons: {
      ...en.common.buttons,
      openChat: 'チャットを開く',
      openChatWithParams: 'パラメータ付きで開く',
      closeChat: 'チャットを閉じる',
      showButton: 'ボタンを表示',
      hideButton: 'ボタンを非表示',
      showBubble: 'バブルを表示',
      hideBubble: 'バブルを非表示',
      showInvite: '招待を表示',
      hideInvite: '招待を非表示',
      togglePlacement: '位置を切り替え',
      toggleThemeColor: 'テーマカラーを切り替え',
      reset: 'リセット',
      copy: 'コピー',
      submit: '送信',
      cancel: 'キャンセル',
      openInNewWindow: 'ポップアップで開く',
      openInNewTab: '新しいタブで開く'
    },
    apiHintPrefix: 'API 呼び出し:'
  },
  nav: {
    ...en.nav,
    more: 'その他',
    basicDemo: '⚙️ 基本設定',
    userInfoDemo: '👤 ユーザー情報',
    goodsInfoDemo: '🛒 商品情報',
    orderInfoDemo: '📦 注文情報',
    vipLevelDemo: '👑 パーソナライズ',
    unreadCountDemo: '🔔 未読件数',
    threadHistoryDemo: '🧵 履歴スレッド',
    videoSupportDemo: '🎥 ビデオサポート',
    webrtcDemo: '📹 WebRTC デモ',
    callCenterDemo: '📞 コールセンター',
    proactiveDemo: '🎯 プロアクティブ獲得',
    videoConferenceDemo: '🎬 ビデオ会議',
    documentFeedbackDemo: '📝 ドキュメントフィードバック',
    flightBookingDemo: '✈️ 航空券予約'
  },
  pages: {
    ...en.pages,
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'Bytedesk 基本設定',
      intro: '下のクイックアクションで Bytedesk Web SDK の代表的な機能をすぐに試せます。',
      themeButtonLabel: 'ナビ色を切り替え',
      themeTextButtonLabel: 'ナビ文字色を切り替え',
      bubbleTitle: 'お困りですか？',
      bubbleSubtitle: 'クリックして会話を開始',
      placement: {
        bottomLeft: '左下',
        bottomRight: '右下'
      },
      navbarLabel: '上部ナビを隠す',
      navbarHidden: 'オン',
      navbarShown: 'オフ',
      navbarParamPurpose: '上部ナビゲーションバーを非表示にするかどうかです。navbar=0 で非表示になります。',
      loadHistoryLabel: '履歴メッセージを読み込む',
      loadHistoryEnabled: 'オン',
      loadHistoryDisabled: 'オフ',
      defaultColorLabel: 'デフォルト',
      defaultTextColorLabel: 'デフォルト',
      currentConfigTitle: '現在の設定',
      copyConfig: '設定 JSON をコピー'
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'ユーザー情報連携デモ',
      description: 'visitorUid、nickname、avatar などのユーザー情報を設定経由で渡し、オペレーターが利用者をすぐに識別できるようにします。下のボタンでサンプルユーザーを切り替えられます。',
      switchUser: 'ユーザーを切り替え',
      switchToUserLabel: '{{name}} に切り替え',
      switchAnonymousUserLabel: '匿名ユーザーに切り替え',
      anonymousUserLabel: '匿名ユーザー',
      anonymousUserHint: '匿名テストモード: visitorUid、nickname、avatar などのユーザー情報は送信されません。',
      currentUserTitle: '現在のユーザー情報',
      currentUserIdLabel: 'ユーザー ID',
      currentUserNicknameLabel: 'ニックネーム',
      contactSupport: 'サポートに相談',
      inviteText: 'こんにちは。どのようにお手伝いできますか？',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: 'ユーザー情報連携ドキュメントを見る',
        reactExample: 'React ユーザー情報サンプル',
        vueExample: 'Vue ユーザー情報サンプル'
      },
      controlPanel: {
        ...en.pages.userInfoDemo.controlPanel,
        title: 'Bytedesk コントロールパネル',
        chatWindow: 'チャットウィンドウ操作',
        button: 'ボタン操作',
        bubble: 'バブル操作',
        invite: '招待ダイアログ操作'
      },
      urlGuideTitle: 'URL + クエリパラメータ利用方法',
      urlTemplateLabel: '共通 URL テンプレート',
      urlParamsTitle: 'パラメータ一覧（/chat 用）',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      apiHintPrefix: 'API 呼び出し:',
      users: {
        user1: '訪問者 Xiao Ming',
        user2: '訪問者 Xiao Hong',
        user3: '訪問者 Xiao Li'
      }
    },
    goodsInfoDemo: {
      ...en.pages.goodsInfoDemo,
      title: '商品情報連携デモ',
      description: '商品 ID、名称、画像、説明、価格、リンク、タグをチャットセッションへ渡し、オペレーターがすぐに商品文脈を把握できるようにします。',
      docLinks: {
        ...en.pages.goodsInfoDemo.docLinks,
        goodsDoc: '商品情報ガイドを見る',
        reactExample: 'React 商品情報サンプル',
        vueExample: 'Vue 商品情報サンプル'
      },
      infoCardTitle: '商品詳細',
      tagsLabel: 'タグ',
      descriptionLabel: '説明',
      priceLabel: '価格',
      contactSupport: 'サポートに相談'
    },
    orderInfoDemo: {
      ...en.pages.orderInfoDemo,
      title: '注文情報連携デモ',
      description: '会話ごとに注文情報を埋め込み、アフターサポートや問い合わせ対応をより迅速にします。',
      sections: {
        statusTimeline: '注文ステータス',
        orderInfo: '注文情報',
        goodsInfo: '商品概要',
        shippingInfo: '配送情報'
      },
      labels: {
        orderId: '注文番号',
        orderTime: '注文日時',
        orderStatus: 'ステータス',
        paymentMethod: '支払い方法',
        totalAmount: '合計金額',
        unitPrice: '単価',
        quantity: '数量',
        receiver: '受取人',
        phone: '電話番号',
        address: '住所'
      },
      statusText: {
        pending: '支払い待ち',
        paid: '支払い済み',
        shipped: '発送済み',
        delivered: '完了'
      },
      urlGuideTitle: 'URL + クエリパラメータ利用方法',
      urlTemplateLabel: '共通 URL テンプレート',
      urlParamsTitle: 'パラメータ一覧（/chat 用）',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      payloadGuideTitle: 'orderInfo の構成と変換',
      payloadObjectLabel: 'Step 1: ビジネスオブジェクト',
      payloadJsonLabel: 'Step 2: JSON 文字列（JSON.stringify）',
      payloadEncodedLabel: 'Step 3: URL エンコード結果（encodeURIComponent）',
      payloadNotesTitle: '補足'
    },
    vipLevelDemo: {
      ...en.pages.vipLevelDemo,
      title: 'パーソナライズデモ',
      description: 'vipLevel などのカスタムフィールドを渡して、より豊かな顧客プロフィールと差別化されたサポート体験を実現します。',
      vipLabel: 'VIP レベル',
      normalLabel: '一般ユーザー',
      switchButtonLabel: '{{name}} に切り替え',
      users: {
        user1: '一般プロフィール',
        user2: 'VIP1 プロフィール',
        user3: 'VIP2 プロフィール'
      },
      urlGuideTitle: 'URL + クエリパラメータ利用方法',
      urlTemplateLabel: '共通 URL テンプレート',
      urlParamsTitle: 'パラメータ一覧',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      payloadGuideTitle: 'vipLevel の構成と変換',
      payloadObjectLabel: 'Step 1: ビジネスオブジェクト',
      payloadJsonLabel: 'Step 2: JSON 文字列（JSON.stringify）',
      payloadEncodedLabel: 'Step 3: URL エンコード結果（encodeURIComponent）',
      payloadNotesTitle: '補足'
    },
    unreadCountDemo: {
      ...en.pages.unreadCountDemo,
      title: '未読件数デモ',
      description: 'getUnreadMessageCount と clearUnreadMessages を使って現在ユーザーの未読状態と同期します。',
      currentCount: '現在の未読件数',
      docLinks: {
        ...en.pages.unreadCountDemo.docLinks,
        unreadDoc: '未読件数連携ガイドを見る',
        reactExample: 'React 未読件数サンプル',
        vueExample: 'Vue 未読件数サンプル'
      },
      buttons: {
        markAllRead: 'すべて既読にする',
        refresh: '未読件数を更新'
      },
      usageNotesTitle: 'ヒント',
      urlGuideTitle: 'API URL + パラメータ利用方法',
      countApiLabel: '未読件数エンドポイント（GET）',
      clearApiLabel: '未読クリアエンドポイント（POST）',
      urlParamsTitle: '共通パラメータ（SDK と同じ）',
      sampleUrlLabel: '未読件数取得用サンプル URL',
      sampleBodyLabel: '未読クリア用サンプル POST Body',
      apiNotesTitle: '実装メモ'
    },
    threadHistoryDemo: {
      ...en.pages.threadHistoryDemo,
      title: '訪問者履歴スレッドデモ',
      description: '訪問者 ThreadList ページをベースに、SDK アイコンから /chat/thread を開いて履歴スレッドを読み込みます。',
      bubbleTitle: '履歴スレッド',
      bubbleSubtitle: 'クリックして履歴一覧を開く',
      anonymousUserLabel: '匿名ユーザー',
      anonymousUserHint: '匿名テストモード: visitorUid、nickname、avatar は送信されません。',
      pathAlert: 'このページでは chatPath=/chat/thread を有効にしています。アイコンをクリックすると /chat ではなく履歴一覧が開きます。',
      currentPathLabel: '現在の入り口パス',
      currentPathHint: '/chat と比べて変わるのはパスだけです。',
      usageTitle: 'デモメモ',
      buttons: {
        openHistoryPage: '履歴ページを開く',
        switchAnonymousUser: '匿名ユーザーに切り替え'
      },
      urlGuideTitle: 'URL + クエリパラメータ利用方法',
      urlTemplateLabel: '共通 URL テンプレート',
      urlParamsTitle: 'パラメータ一覧（/chat と同じ）',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      docLinks: {
        ...en.pages.threadHistoryDemo.docLinks,
        threadDoc: '履歴スレッド連携ガイドを見る',
        visitorRef: '訪問者 ThreadList リファレンス',
        reactExample: 'React 履歴スレッドデモソース'
      }
    },
    callCenterDemo: {
      ...en.pages.callCenterDemo,
      title: 'コールセンターデモ',
      description: '標準チャットのパスを維持したまま sid を切り替え、ユーザーをコールセンターのワークグループへ振り分ける方法を示します。',
      bubbleTitle: 'コールセンター',
      bubbleSubtitle: 'キューと転送に対応',
      anonymousUserHint: '匿名テストモード: visitorUid、nickname、avatar は送信されません。',
      pathAlert: 'このページでは chatPath=/chat を維持しつつ、call-center 用 sid に接続してキューアクセスを再現します。',
      currentPathLabel: '現在の入り口パス',
      currentPathHint: 'ルートは /call のままで、chatConfig.sid がキューを決定します。',
      usageTitle: 'デモメモ',
      buttons: {
        openCallCenter: 'コールセンターを開く',
        switchAnonymousUser: '匿名ユーザーに切り替え'
      },
      urlGuideTitle: 'URL + クエリパラメータ利用方法',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      docLinks: {
        ...en.pages.callCenterDemo.docLinks,
        reactDoc: 'React 統合ドキュメントを見る',
        vueDoc: 'Vue 統合ドキュメントを見る',
        reactExample: 'React コールセンターデモソース'
      },
      runtime: {
        ...en.pages.callCenterDemo.runtime,
        title: 'ランタイムパネル（SIP.js 風）',
        description: '接続、待機、割り当て、完了を疑似再現し、コールセンター入口フローを素早く検証できます。'
      }
    },
    webrtcDemo: {
      ...en.pages.webrtcDemo,
      title: '音声 / 映像オペレーターデモ',
      description: '右下のフローティングボタンから WebRTC のリアルタイム音声・映像サポートを体験できます。通話モードと訪問者情報は /webrtc ページに URL パラメータとして渡されます。',
      modeLimitNotice: '現在ロボットモードには未対応です。人による音声対応と映像対応のみ利用できます。',
      pathAlert: 'フローティングボタンは既定で音声モード（audio=1&video=0）です。下のボタンで映像モードに切り替えられます。',
      currentPathLabel: '入り口パス',
      currentPathHint: 'ルートは常に /webrtc で、音声 / 映像パラメータで通話種別を制御します。',
      anonymousUserHint: '匿名テストモード: visitorUid、nickname、avatar は送信されません。',
      callMode: '現在の通話モード',
      callModeAudio: '🎙️ 音声オペレーター（audio=1, video=0）',
      callModeVideo: '📹 映像オペレーター（audio=1, video=1）',
      bubbleTitleAudio: '音声オペレーター',
      bubbleTitleVideo: '映像オペレーター',
      bubbleSubtitleAudio: 'クリックして音声通話を開始',
      bubbleSubtitleVideo: 'クリックして映像通話を開始',
      docLinks: {
        ...en.pages.webrtcDemo.docLinks,
        reactDoc: 'React WebRTC ドキュメントを見る',
        vueDoc: 'Vue WebRTC ドキュメントを見る',
        reactExample: 'React WebRTC デモソース'
      },
      usageTitle: 'デモメモ',
      buttons: {
        audioMode: '🎙️ 音声モードへ切り替え',
        videoMode: '📹 映像モードへ切り替え',
        switchAnonymousUser: '匿名ユーザーに切り替え'
      },
      urlGuideTitle: 'URL + パラメータ一覧',
      sampleUrlLabel: '現在の設定のサンプル URL',
      urlParamsTitle: 'パラメータ一覧'
    },
    documentFeedbackDemo: {
      ...en.pages.documentFeedbackDemo,
      title: 'ドキュメントフィードバックデモ',
      subtitle: 'テキスト選択、スクリーンショット取得、構造化フィードバック送信をページ離脱なしで試せます。',
      docLinks: {
        ...en.pages.documentFeedbackDemo.docLinks,
        reactDoc: 'React 統合ガイドを見る',
        vueDoc: 'Vue 統合ガイドを見る',
        reactExample: 'この React デモソースを見る'
      },
      setupStepsTitle: 'クイックスタート',
      highlightsTitle: 'ドキュメントフィードバックの動作',
      controlPanel: {
        ...en.pages.documentFeedbackDemo.controlPanel,
        title: 'トラブルシューティングパネル'
      },
      exampleSection: {
        ...en.pages.documentFeedbackDemo.exampleSection,
        title: 'デモ記事'
      },
      logs: {
        ...en.pages.documentFeedbackDemo.logs,
        title: 'フィードバックログ',
        empty: 'まだフィードバックはありません。本文を選択するか手動トリガーを使ってサンプルデータを生成してください。',
        selectedText: '選択テキスト',
        categories: 'カテゴリ',
        feedback: 'フィードバック内容'
      },
      feedbackConfigText: {
        ...en.pages.documentFeedbackDemo.feedbackConfigText,
        selectionText: 'ドキュメントフィードバック',
        dialogTitle: 'ドキュメントフィードバック',
        placeholder: '問題点や改善案を詳しく入力してください。',
        submitText: '送信',
        cancelText: 'キャンセル',
        successMessage: 'ありがとうございます。内容を確認し、順次対応します。'
      },
      manualTriggerMessage: 'ワークフロー確認用に手動で発火したサンプルフィードバックです。',
      testSelectionText: 'サンプルの選択テキスト',
      tooltipFallbackText: 'テスト用フィードバックツールチップ'
    }
  },
  components: {
    ...en.components,
    installGuide: {
      ...en.components.installGuide,
      title: 'インストールガイド'
    }
  }
};