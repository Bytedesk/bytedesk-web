import { en } from './en';
const basicDemoFieldDocs = {
  isDebug: '開発時のデバッグログを有効にします。通常、本番環境では無効にします。',
  forceRefresh: 'チャットページまたは iframe リソースを強制更新し、キャッシュ問題を確認します。',
  apiUrl: '訪問者初期化、未読数、フィードバック送信などに使う API サーバーのルート URL です。',
  htmlUrl: 'チャットページのサイトルート URL です。ページ種別は chatPath などの各 path で切り替えます。',
  chatPath: 'テキストチャットページのパスです。showChat() で使われます。',
  threadPath: '履歴会話ページのパスです。showThread() で使われます。',
  webrtcPath: '音声・ビデオページのパスです。showWebrtc() で使われます。',
  callPath: 'コールセンターページのパスです。showCall() で使われます。',
  locale: '表示言語です。chat URL の lang パラメータにも反映されます。',
  placement: 'ボタンとチャットウィンドウの配置位置です。bottom-left と bottom-right をサポートします。',
  marginBottom: 'ボタンの下端からの余白です。単位は px です。',
  marginSide: '左右端からの余白です。単位は px です。',
  autoPopup: '初期化後にチャットウィンドウを自動表示するかどうかです。',
  autoPopupDelay: '自動表示までの遅延時間です。単位はミリ秒です。',
  draggable: '入口ボタンをドラッグ可能にするかどうかです。',
  tabsConfig: 'help、thread、messages の表示制御です。',
  bubbleConfig: '入口上の案内バブルのタイトル、サブタイトル、ローテーション表示などを設定します。',
  buttonConfig: '単一入口ボタンの設定です。入口が 1 つの場合に使います。',
  buttonsConfig: '複数入口ボタンの配列です。buttonConfig より優先されます。',
  inviteConfig: '招待ダイアログの表示タイミング、ループ、文言、コールバック設定です。',
  theme: 'light、dark、system と色設定を含むテーマ構成です。',
  animation: 'チャットウィンドウ表示・非表示時のアニメーション設定です。',
  window: 'デスクトップ時のチャットウィンドウサイズです。',
  onInit: 'SDK 初期化完了後に呼ばれるコールバックです。',
  onShowChat: 'チャットウィンドウ表示時に呼ばれます。',
  onHideChat: 'チャットウィンドウ非表示時に呼ばれます。',
  onMessage: 'iframe または SDK からメッセージを受け取ったときに呼ばれます。',
  onConfigChange: '設定更新後に呼ばれます。',
  onVisitorInfo: '訪問者初期化後に uid と visitorUid を返します。',
  'theme.mode': 'テーマモードです。light、dark、system を選べます。',
  'theme.textColor': 'ボタンやモジュール内テキストの色です。',
  'theme.backgroundColor': 'ボタンやナビゲーションの主背景色です。',
  'bubble.show': '入口上のバブルを表示するかどうかです。',
  'bubble.icon': '単一バブルのデフォルトアイコンです。',
  'bubble.title': '単一バブルのタイトルです。',
  'bubble.subtitle': '単一バブルのサブタイトルです。',
  'bubble.messages': '複数バブルの配列です。単一設定より優先されます。',
  'bubble.autoRotate': '複数バブルを自動ローテーションするかどうかです。',
  'bubble.rotateInterval': 'バブル切り替え間隔です。単位はミリ秒です。',
  'bubble.switchMode': 'バブル切り替え方式です。fade、slide-up、ticker を選べます。',
  'button.show': 'この入口ボタンを表示するかどうかです。',
  'button.icon': 'ボタンアイコンです。通常は emoji や短い記号を使います。',
  'button.text': 'ボタンテキストです。単一円形ボタンでは省略推奨です。',
  'button.width': 'ボタン幅です。単位は px です。',
  'button.height': 'ボタン高さです。単位は px です。',
  'button.action': '組み込み入口タイプです。chat、thread、webrtc、call を使えます。',
  'button.previewImageUrl': 'ホバー時に表示する画像 URL です。QR コード入口に向いています。',
  'button.previewImageAlt': 'プレビュー画像下に表示する説明文です。',
  'button.onClick': '既定動作を上書きするカスタムクリック処理です。',
  'invite.show': '招待ダイアログを有効にするかどうかです。',
  'invite.text': '招待文言です。',
  'invite.icon': '招待ダイアログのアイコンです。',
  'invite.delay': '最初の招待表示までの遅延時間です。',
  'invite.loop': '招待ダイアログを繰り返し表示するかどうかです。',
  'invite.loopDelay': '繰り返し表示間隔です。',
  'invite.loopCount': '繰り返し回数です。',
  'invite.acceptText': '承諾ボタンの文言です。',
  'invite.rejectText': '拒否ボタンの文言です。',
  'invite.onAccept': 'ユーザーが承諾したときに呼ばれます。',
  'invite.onReject': 'ユーザーが拒否したときに呼ばれます。',
  'invite.onClose': '招待ダイアログが閉じたときに呼ばれます。',
  'invite.onOpen': '招待ダイアログが開いたときに呼ばれます。',
  'chat.org': '組織 ID です。必須です。',
  'chat.t': '会話タイプです。必須です。t=0 は 1 対 1 の客服、t=1 はワークグループ、t=2 はロボットを表します。',
  'chat.sid': '会話対象 ID です。必須です。',
  'chat.uid': '内部ユーザー ID で、通常は SDK が管理します。',
  'chat.visitorUid': '業務側で使う訪問者一意 ID です。',
  'chat.nickname': '訪問者ニックネームです。',
  'chat.avatar': '訪問者アバター URL です。',
  'chat.mobile': '訪問者の携帯番号です。',
  'chat.email': '訪問者メールアドレスです。',
  'chat.note': '客服側で見えるメモです。',
  'chat.channel': '流入チャネルです。',
  'chat.goodsInfo': '商品情報です。',
  'chat.orderInfo': '注文情報です。',
  'chat.extra': '追加拡張フィールドです。通常は JSON 文字列を渡します。',
  'chat.vipLevel': '会員レベルです。',
  'chat.debug': 'テスト環境と本番環境を区別する業務フラグです。',
  'chat.draft': '段階リリース用フラグで、URL に draft=1 として渡されます。',
  'chat.settingsUid': '設定デバッグに使う一意 ID です。',
  'chat.loadHistory': '履歴メッセージを読み込むかどうかです。loadHistory=1 でチャットページを開く際に履歴を自動読み込みします。',
  'chat.threadDetail': 'スレッド詳細ボタンを表示するかどうかです。threadDetail=1 で表示し、既定では非表示です。',
  'chat.visitorProfile': '訪問者プロフィールボタンを表示するかどうかです。visitorProfile=1 で表示し、既定では非表示です。',
  'chat.custom': '追加の業務フィールドを URL パラメータとして付与できます。',
  'browse.referrer': '遷移元ページ URL です。',
  'browse.url': '現在ページ URL です。',
  'browse.title': '現在ページタイトルです。',
  'browse.custom': 'ページ ID などの追加閲覧情報を渡せます。',
  'feedback.enabled': 'ドキュメントフィードバック機能を有効にするかどうかです。',
  'feedback.trigger': '起動方法です。selection、button、both を選べます。',
  'feedback.showOnSelection': 'テキスト選択時に入口を表示するかどうかです。',
  'feedback.selectionText': 'テキスト選択時の案内文です。',
  'feedback.buttonText': '固定フィードバックボタン文言です。',
  'feedback.dialogTitle': 'フィードバックダイアログのタイトルです。',
  'feedback.placeholder': '入力欄のプレースホルダーです。',
  'feedback.submitText': '送信ボタン文言です。',
  'feedback.cancelText': 'キャンセルボタン文言です。',
  'feedback.successMessage': '送信成功後の文言です。',
  'feedback.categoryNames': '問題カテゴリ一覧です。',
  'feedback.requiredTypes': 'カテゴリ選択を必須にするかどうかです。',
  'feedback.typesSectionTitle': 'カテゴリ領域のタイトルです。',
  'feedback.typesDescription': 'カテゴリ領域の補足説明です。',
  'feedback.submitScreenshot': 'スクリーンショットも一緒に送るかどうかです。',
  'feedback.onSubmit': 'カスタム送信処理です。',
  'feedback.onCancel': 'キャンセル時に呼ばれます。',
  'animation.enabled': 'チャットウィンドウアニメーションを有効にするかどうかです。',
  'animation.duration': 'アニメーション時間です。単位はミリ秒です。',
  'animation.type': 'イージング種別です。',
  'window.width': 'デスクトップチャットウィンドウ幅です。',
  'window.height': 'デスクトップチャットウィンドウ高さです。',
  'tabs.messages': 'messages タブを表示するかどうかです。',
  'tabs.thread': 'thread 履歴タブを表示するかどうかです。',
  'tabs.help': 'help タブを表示するかどうかです。',
} as const;

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
      'th-th': 'ไทย'
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
    voiceAgentDemo: '🎙️ 音声エージェント',
    videoConferenceDemo: '🎬 ビデオ会議',
    documentFeedbackDemo: '📝 ドキュメントフィードバック',
    flightBookingDemo: '✈️ 航空券予約'
  },
  pages: {
    ...en.pages,
    proactiveDemo: {
      ...en.pages.proactiveDemo,
      title: 'プロアクティブ獲得デモ',
      description: 'このページはデフォルトのワークフローに接続し、チャットを開くと学歴確認、要望確認、連絡先収集の流れに直接入ります。',
      tags: {
        mobileValidation: '携帯番号検証',
        multiTurnQa: '複数ターンQ&A'
      },
      alertTitle: '検証フロー',
      alertDescription: '会話に入ると、まず学歴と相談意図を確認し、その後に都市、相談シーン、携帯番号を収集します。携帯番号が中国本土の11桁形式に合わない場合、フォームは送信されません。毎回の起動で新しいワークフロースレッドを強制作成します。',
      workflowCardTitle: 'デフォルトのプロアクティブワークフロー',
      workflowCardTag: '学歴確認 + 要望確認 + 連絡先収集',
      bubbleTitle: 'プロアクティブ獲得',
      bubbleSubtitle: 'デフォルトワークフローのリード獲得デモ',
      buttons: {
        openWorkflowChat: 'デフォルトワークフローを開く',
        closeChat: 'チャットウィンドウを閉じる'
      },
      urlParamsTitle: 'ワークフロー URL パラメータ',
      urlDescription: '独立ウィンドウの完全 URL は locale、テーマモード、訪問者識別パラメータに応じて変化します。forceNewThread は SDK からワークフローを開く際に新しいスレッドを保証するためのものなので、下の埋め込みコードに残しています。',
      urlParams: [
        'org: ワークフロー所属組織の一意 ID',
        't: セッション種別。17 はワークフローセッションを表します',
        'sid: どのデフォルトワークフローを開くかを決めるワークフロー一意 ID',
        'lang: 現在のデモ locale に従う会話言語',
        'mode: 現在のライト / ダーク設定に従うテーマモード',
        'navbar: 上部ナビゲーション表示フラグ。1 で表示',
        'visitorUid: 実名モードで訪問者履歴を紐付けるための訪問者一意 ID',
        'nickname: 実名モードでチャットページに渡す訪問者ニックネーム',
        'avatar: 実名モードで表示に使う訪問者アバター URL'
      ],
      embedCodeTitle: '現在の埋め込みコード',
      embedCodeDescription: '下の埋め込みコードはこのページの実際の設定と一致しており、そのまま固定ワークフローのリード導線として利用できます。'
    },
    voiceAgentDemo: {
      ...en.pages.voiceAgentDemo,
      title: '音声アシスタントデモ'
    },
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
      navbarLabel: '上部ナビを隠す',      draggableLabel: 'ドラッグ可能なボタン/会話を続ける',      navbarHidden: 'オン',
      navbarShown: 'オフ',
      navbarParamPurpose: '上部ナビゲーションバーを非表示にするかどうかです。navbar=0 で非表示になります。',
      qrCodeParamLabel: 'QRボタンを表示',
      threadDetailParamLabel: 'スレッド詳細ボタンを表示',
      visitorProfileParamLabel: '訪問者プロフィールボタンを表示',
      loadHistoryLabel: '履歴メッセージを読み込む',
      loadHistoryEnabled: 'オン',
      loadHistoryDisabled: 'オフ',
      defaultColorLabel: 'デフォルト',
      defaultTextColorLabel: 'デフォルト',
      currentConfigTitle: '現在の設定',
      copyConfig: '設定 JSON をコピー',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'サードパーティー業務システムユーザー情報連携デモ',
      description: 'サードパーティー業務システム内のユーザー情報（visitorUid、nickname、avatar など）を設定経由で渡し、オペレーターが現在の訪問者をすぐに識別して業務コンテキストを同期できるようにします。下のボタンでサンプル業務ユーザーを切り替えられます。',
      switchUser: 'ユーザーを切り替え',
      switchToUserLabel: '{{name}} に切り替え',
      switchAnonymousUserLabel: '匿名ユーザーに切り替え',
      anonymousUserLabel: '匿名ユーザー',
      anonymousUserHint: '匿名テストモード: visitorUid、nickname、avatar などのユーザー情報は送信されません。',
      currentUserTitle: '現在の業務システムユーザー情報',
      currentUserIdLabel: 'ユーザー ID',
      currentUidLabel: 'uid',
      currentVisitorUidLabel: 'visitorUid',
      currentUserNicknameLabel: 'ニックネーム',
      contactSupport: 'サポートに相談',
      inviteText: 'こんにちは。どのようにお手伝いできますか？',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: 'サードパーティー業務システムユーザー情報連携ドキュメントを見る',
        reactExample: 'React サードパーティー業務システムユーザー情報サンプル',
        vueExample: 'Vue サードパーティー業務システムユーザー情報サンプル'
      },
      controlPanel: {
        ...en.pages.userInfoDemo.controlPanel,
        title: 'Bytedesk コントロールパネル',
        chatWindow: 'チャットウィンドウ操作',
        button: 'ボタン操作',
        bubble: 'バブル操作',
        invite: '招待ダイアログ操作'
      },
      urlGuideTitle: '現在の独立ウィンドウ完全 URL + クエリパラメータ利用方法',
      urlTemplateLabel: '共通 URL テンプレート',
      urlParamsTitle: 'パラメータ一覧（/chat 用）',
      sampleUrlLabel: '現在の設定から生成したサンプル URL',
      apiHintPrefix: 'API 呼び出し:',
      users: {
        user1: 'ユーザー Xiao Ming',
        user2: 'ユーザー Xiao Hong',
        user3: 'ユーザー Xiao Mei'
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
        ...en.pages.unreadCountDemo.buttons,
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
    ticketDemo: {
      ...en.pages.ticketDemo,
      title: '訪問者チケットデモ',
      description: 'Bytedesk Web SDK の入口を visitorTicket の履歴、作成、状態確認、詳細確認、通知ルートへ切り替える方法を示します。iframe 埋め込みを前提とした構成です。',
      bubbleTitle: 'チケットセンター',
      bubbleSubtitle: '訪問者チケットルートを開く',
      currentPathLabel: '現在の入口パス',
      currentPathHint: '/ticket ルートを切り替えながら、org、sid、訪問者、言語、テーマのパラメータを維持します。',
      selectedScenarioTitle: 'チケットシナリオ',
      detailTicketIdLabel: '詳細ルート用チケット ID',
      detailTicketIdPlaceholder: '実在するチケット UID を入力すると詳細ドロワーを自動表示します',
      usageTitle: 'デモメモ',
      buttons: {
        closeTicket: 'チケットウィンドウを閉じる'
      },
      docLinks: {
        ...en.pages.ticketDemo.docLinks,
        visitorTicketRef: 'visitorTicket ルート実装を見る',
        reactExample: 'React チケットデモソース'
      }
    },
    ratingDemo: {
      ...en.pages.ratingDemo,
      title: '訪問者満足度評価デモ',
      description: '履歴会話入口を使って満足度評価フローへ入る方法を示します。未評価履歴と追評価対応は現在どちらも /chat/thread を利用します。',
      bubbleTitle: 'サービス評価',
      bubbleSubtitle: '評価関連の履歴会話を開く',
      currentPathLabel: '現在の入口パス',
      currentPathHint: '通常の対話開始と、未評価/既評価の履歴会話入口を切り替えられます。',
      selectedScenarioTitle: '評価シナリオ',
      usageTitle: 'デモメモ',
      routeRows: {
        chat: {
          label: '通常の対話開始',
          purpose: '通常のチャット画面を開き、評価気泡から送信した評価は前回内容を上書きします。',
          example: '/chat'
        },
        pending: {
          label: '未評価の会話一覧',
          purpose: '未評価の履歴会話を開き、初回評価を行います。',
          example: '/chat/thread?ratingIntent=pending'
        },
        followup: {
          label: '既評価の会話一覧',
          purpose: '既評価の履歴会話を開き、コメント追記のみを許可します。',
          example: '/chat/thread?ratingIntent=followup'
        }
      },
      docLinks: {
        rateBubbleRef: 'visitor RateBubble 実装を見る',
        reactExample: 'React 満足度評価デモソース'
      }
    },
    platformDemo: {
      ...en.pages.platformDemo,
      title: 'プラットフォームサポートデモ',
      description: 'orgUid=df_org_uid をプラットフォーム客服とみなし、それ以外の orgUid を店舗客服として扱う構成を説明します。各組織は售前・售後など複数の相談入口を持てます。',
      bubbleTitle: 'プラットフォーム客服',
      bubbleSubtitle: 'プラットフォームまたは店舗の入口を切り替える'
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