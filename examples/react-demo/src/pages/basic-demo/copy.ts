import type { DemoLanguage } from '../../locales';
import {
  LANG_EN,
  LANG_ES_ES,
  LANG_FR_FR,
  LANG_JA_JP,
  LANG_KO_KR,
  LANG_MS_MY,
  LANG_VI_VN,
  LANG_ZH_TW,
} from './constants';

export type BubbleSwitchMode = 'fade' | 'slide-up' | 'ticker';

export interface BasicDemoLocalizedCopy {
  bubbleAgentTitle: string;
  bubbleAgentSubtitle: string;
  bubbleWebrtcTitle: string;
  bubbleWebrtcSubtitle: string;
  multiBubbleLabel: string;
  switchModeLabel: string;
  apiMessageLabel: string;
  consultParamsLabel: string;
  entrySelectorLabel: string;
  entryChatLabel: string;
  entryThreadLabel: string;
  entryWebrtcLabel: string;
  entryCallLabel: string;
  entryQrLabel: string;
  qrInputLabel: string;
  qrInputPlaceholder: string;
  bubbleDemoLabel: string;
  popupUrlTitle: string;
  popupUrlParamsTitle: string;
  popupParamNameTitle: string;
  popupParamValueTitle: string;
  popupParamPurposeTitle: string;
  popupParamUnknownPurpose: string;
}

export interface ConfigGuideCopy {
  minimalConfigTitle: string;
  minimalConfigDescription: string;
  recommendedConfigTitle: string;
  recommendedConfigDescription: string;
  configExampleTitle: string;
  configExampleDescription: string;
  configGuideTitle: string;
  configGuideDescription: string;
  baseSectionTitle: string;
  uiSectionTitle: string;
  callbackSectionTitle: string;
  themeSectionTitle: string;
  bubbleSectionTitle: string;
  buttonSectionTitle: string;
  inviteSectionTitle: string;
  chatSectionTitle: string;
  browseSectionTitle: string;
  feedbackSectionTitle: string;
  animationSectionTitle: string;
  windowSectionTitle: string;
  tabsSectionTitle: string;
}

export interface ExampleCopy {
  routeComment: string;
  entryComment: string;
  multiEntryComment: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  aiTitle: string;
  aiSubtitle: string;
  chatText: string;
  threadText: string;
  webrtcText: string;
  callText: string;
  qrText: string;
  inviteText: string;
  inviteAcceptText: string;
  inviteRejectText: string;
  feedbackText: string;
  feedbackDialogTitle: string;
  feedbackPlaceholder: string;
  feedbackSubmitText: string;
  feedbackCancelText: string;
  feedbackSuccessText: string;
  feedbackTypeTitle: string;
  feedbackTypeDescription: string;
  completeInit: string;
  chatOpened: string;
  chatHidden: string;
  configChanged: string;
  visitorInfo: string;
}

export const getLocaleValueHint = (locale: DemoLanguage) => {
  if (locale === LANG_VI_VN) {
    return 'Gia tri locale ho tro: zh-cn(Gian the) | zh-tw(Phon the) | en(English) | ja-jp(Tieng Nhat) | ko-kr(Tieng Han) | vi-vn(Tieng Viet) | ms-my(Bahasa Melayu)';
  }
  if (locale === LANG_MS_MY) {
    return 'Nilai locale yang disokong: zh-cn(Cina Ringkas) | zh-tw(Cina Tradisional) | en(English) | ja-jp(Bahasa Jepun) | ko-kr(Bahasa Korea) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu)';
  }
  if (locale === LANG_ES_ES) {
    return 'Valores de locale compatibles: zh-cn(Chino simplificado) | zh-tw(Chino tradicional) | en(Inglés) | ja-jp(Japonés) | ko-kr(Coreano) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Francés)';
  }
  if (locale === LANG_FR_FR) {
    return 'Valeurs de locale prises en charge : zh-cn(Chinois simplifie) | zh-tw(Chinois traditionnel) | en(Anglais) | ja-jp(Japonais) | ko-kr(Coreen) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Espagnol) | fr-fr(Francais)';
  }
  if (locale === LANG_EN) {
    return 'Supported locale values: zh-cn(Simplified Chinese) | zh-tw(Traditional Chinese) | en(English) | ja-jp(Japanese) | ko-kr(Korean) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Spanish) | fr-fr(French)';
  }
  if (locale === LANG_JA_JP) {
    return '対応する locale 値: zh-cn(簡体字中国語) | zh-tw(繁体字中国語) | en(English) | ja-jp(日本語) | ko-kr(韓国語) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(スペイン語) | fr-fr(フランス語)';
  }
  if (locale === LANG_KO_KR) {
    return '지원되는 locale 값: zh-cn(중국어 간체) | zh-tw(중국어 번체) | en(영어) | ja-jp(일본어) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(스페인어) | fr-fr(프랑스어)';
  }
  if (locale === LANG_ZH_TW) {
    return 'locale 可選值: zh-cn(簡體中文) | zh-tw(繁體中文) | en(English) | ja-jp(日本語) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Français)';
  }
  return 'locale 可选值: zh-cn(简体中文) | zh-tw(繁體中文) | en(English) | ja-jp(日本語) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Français)';
};

export const getLocalizedCopy = (
  locale: DemoLanguage,
  isMultiBubbleDemo: boolean,
  bubbleSwitchMode: BubbleSwitchMode,
): BasicDemoLocalizedCopy => {
  switch (locale) {
    case LANG_VI_VN:
      return {
        bubbleAgentTitle: 'Ho tro AI Agent',
        bubbleAgentSubtitle: 'Meo bong thong bao tu dong chuyen',
        bubbleWebrtcTitle: 'San sang WebRTC',
        bubbleWebrtcSubtitle: 'Dich vu audio va video da san sang',
        multiBubbleLabel: `Demo nhieu bong: ${isMultiBubbleDemo ? 'BAT' : 'TAT'}`,
        switchModeLabel: `Kieu chuyen bong: ${bubbleSwitchMode === 'fade' ? 'Mo dan' : bubbleSwitchMode === 'slide-up' ? 'Truot len' : 'Bang thong bao'}`,
        apiMessageLabel: 'API hien tai:',
        consultParamsLabel: 'Tham so tu van:',
        entrySelectorLabel: 'Demo nhieu loi vao',
        entryChatLabel: 'Van ban',
        entryThreadLabel: 'Lich su',
        entryWebrtcLabel: 'Video',
        entryCallLabel: 'Tong dai',
        entryQrLabel: 'Ma QR WeChat',
        qrInputLabel: 'Dia chi anh QR:',
        qrInputPlaceholder: 'Nhap URL hinh QR',
        bubbleDemoLabel: `Demo bong: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: 'URL cua cua so rieng hien tai:',
        popupUrlParamsTitle: 'Danh sach tham so URL hien tai:',
        popupParamNameTitle: 'Tham so',
        popupParamValueTitle: 'Gia tri',
        popupParamPurposeTitle: 'Cong dung',
        popupParamUnknownPurpose: 'Tham so URL mo rong tuy chinh.'
      };
    case LANG_MS_MY:
      return {
        bubbleAgentTitle: 'Sokongan Ejen AI',
        bubbleAgentSubtitle: 'Petua gelembung bertukar secara automatik',
        bubbleWebrtcTitle: 'WebRTC Tersedia',
        bubbleWebrtcSubtitle: 'Perkhidmatan audio dan video sedia digunakan',
        multiBubbleLabel: `Demo berbilang gelembung: ${isMultiBubbleDemo ? 'HIDUP' : 'MATI'}`,
        switchModeLabel: `Mod pertukaran gelembung: ${bubbleSwitchMode === 'fade' ? 'Pudar' : bubbleSwitchMode === 'slide-up' ? 'Gelongsor naik' : 'Pita ticker'}`,
        apiMessageLabel: 'API semasa:',
        consultParamsLabel: 'Parameter rundingan:',
        entrySelectorLabel: 'Demo pelbagai pintu masuk',
        entryChatLabel: 'Teks',
        entryThreadLabel: 'Sejarah',
        entryWebrtcLabel: 'Video',
        entryCallLabel: 'Pusat panggilan',
        entryQrLabel: 'QR WeChat',
        qrInputLabel: 'URL imej QR:',
        qrInputPlaceholder: 'Masukkan URL imej QR',
        bubbleDemoLabel: `Demo gelembung: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: 'URL tetingkap berasingan semasa:',
        popupUrlParamsTitle: 'Senarai parameter URL semasa:',
        popupParamNameTitle: 'Parameter',
        popupParamValueTitle: 'Nilai',
        popupParamPurposeTitle: 'Tujuan',
        popupParamUnknownPurpose: 'Parameter URL tambahan tersuai.'
      };
    case LANG_ES_ES:
      return {
        bubbleAgentTitle: 'Soporte de agente con IA',
        bubbleAgentSubtitle: 'Consejos del globo con cambio automatico',
        bubbleWebrtcTitle: 'WebRTC disponible',
        bubbleWebrtcSubtitle: 'Servicio de audio y video listo',
        multiBubbleLabel: `Demo de multiples globos: ${isMultiBubbleDemo ? 'ACTIVADO' : 'DESACTIVADO'}`,
        switchModeLabel: `Cambio de globo: ${bubbleSwitchMode === 'fade' ? 'Desvanecer' : bubbleSwitchMode === 'slide-up' ? 'Deslizar hacia arriba' : 'Ticker'}`,
        apiMessageLabel: 'API actual:',
        consultParamsLabel: 'Parametros de consulta:',
        entrySelectorLabel: 'Demo de entradas multiples',
        entryChatLabel: 'Texto',
        entryThreadLabel: 'Historial',
        entryWebrtcLabel: 'Video',
        entryCallLabel: 'Llamada',
        entryQrLabel: 'QR de WeChat',
        qrInputLabel: 'URL de imagen QR:',
        qrInputPlaceholder: 'Introduce la URL de la imagen QR',
        bubbleDemoLabel: `Demo de globo: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: 'URL completa actual de la ventana independiente:',
        popupUrlParamsTitle: 'Lista actual de parametros URL:',
        popupParamNameTitle: 'Parametro',
        popupParamValueTitle: 'Valor',
        popupParamPurposeTitle: 'Uso',
        popupParamUnknownPurpose: 'Parametro URL personalizado adicional.'
      };
    case LANG_FR_FR:
      return {
        bubbleAgentTitle: 'Assistance agent IA',
        bubbleAgentSubtitle: 'Bulles d aide avec rotation automatique',
        bubbleWebrtcTitle: 'WebRTC disponible',
        bubbleWebrtcSubtitle: 'Service audio et video pret',
        multiBubbleLabel: `Demo multi-bulles : ${isMultiBubbleDemo ? 'ACTIVEE' : 'DESACTIVEE'}`,
        switchModeLabel: `Changement de bulle : ${bubbleSwitchMode === 'fade' ? 'Fondu' : bubbleSwitchMode === 'slide-up' ? 'Glissement vers le haut' : 'Bandeau'}`,
        apiMessageLabel: 'API actuelle :',
        consultParamsLabel: 'Parametres de consultation :',
        entrySelectorLabel: 'Demo multi-entrees',
        entryChatLabel: 'Texte',
        entryThreadLabel: 'Historique',
        entryWebrtcLabel: 'Video',
        entryCallLabel: 'Appel',
        entryQrLabel: 'QR WeChat',
        qrInputLabel: 'URL de l image QR :',
        qrInputPlaceholder: 'Saisissez l URL de l image QR',
        bubbleDemoLabel: `Demo de bulle : bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: 'URL complete actuelle de la fenetre independante :',
        popupUrlParamsTitle: 'Liste actuelle des parametres URL :',
        popupParamNameTitle: 'Parametre',
        popupParamValueTitle: 'Valeur',
        popupParamPurposeTitle: 'Usage',
        popupParamUnknownPurpose: 'Parametre URL personnalise supplementaire.'
      };
    case LANG_EN:
      return {
        bubbleAgentTitle: 'AI Agent Support',
        bubbleAgentSubtitle: 'Auto switch bubble tips',
        bubbleWebrtcTitle: 'WebRTC Available',
        bubbleWebrtcSubtitle: 'Audio and video service ready',
        multiBubbleLabel: `Multi Bubble Demo: ${isMultiBubbleDemo ? 'ON' : 'OFF'}`,
        switchModeLabel: `Bubble Switch: ${bubbleSwitchMode === 'fade' ? 'Fade' : bubbleSwitchMode === 'slide-up' ? 'Slide Up' : 'Ticker'}`,
        apiMessageLabel: 'Current API:',
        consultParamsLabel: 'Consultation params:',
        entrySelectorLabel: 'Multi-entry demo',
        entryChatLabel: 'Text',
        entryThreadLabel: 'History',
        entryWebrtcLabel: 'Video',
        entryCallLabel: 'Call',
        entryQrLabel: 'WeChat QR',
        qrInputLabel: 'QR image URL:',
        qrInputPlaceholder: 'Enter QR image URL',
        bubbleDemoLabel: `Bubble demo: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: 'Current standalone window full URL:',
        popupUrlParamsTitle: 'Current URL parameter list:',
        popupParamNameTitle: 'Parameter',
        popupParamValueTitle: 'Value',
        popupParamPurposeTitle: 'Purpose',
        popupParamUnknownPurpose: 'Additional custom URL parameter.'
      };
    case LANG_JA_JP:
      return {
        bubbleAgentTitle: 'AI エージェント対応',
        bubbleAgentSubtitle: 'ヒントバブルを自動で切り替えます',
        bubbleWebrtcTitle: 'WebRTC 利用可能',
        bubbleWebrtcSubtitle: '音声・映像サポートの準備ができています',
        multiBubbleLabel: `マルチバブルデモ: ${isMultiBubbleDemo ? 'オン' : 'オフ'}`,
        switchModeLabel: `バブル切替: ${bubbleSwitchMode === 'fade' ? 'フェード' : bubbleSwitchMode === 'slide-up' ? '上方向スライド' : 'ティッカー'}`,
        apiMessageLabel: '現在の API:',
        consultParamsLabel: '相談パラメータ:',
        entrySelectorLabel: '複数入口デモ',
        entryChatLabel: 'テキスト',
        entryThreadLabel: '履歴',
        entryWebrtcLabel: '映像',
        entryCallLabel: '通話',
        entryQrLabel: 'WeChat QR',
        qrInputLabel: 'QR画像 URL:',
        qrInputPlaceholder: 'QR画像のURLを入力',
        bubbleDemoLabel: `バブルデモ: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: '現在の独立ウィンドウ完全 URL:',
        popupUrlParamsTitle: '現在の URL パラメータ一覧:',
        popupParamNameTitle: 'パラメータ',
        popupParamValueTitle: '値',
        popupParamPurposeTitle: '用途',
        popupParamUnknownPurpose: '追加のカスタム URL パラメータです。'
      };
    case LANG_KO_KR:
      return {
        bubbleAgentTitle: 'AI 에이전트 지원',
        bubbleAgentSubtitle: '안내 버블이 자동으로 전환됩니다',
        bubbleWebrtcTitle: 'WebRTC 사용 가능',
        bubbleWebrtcSubtitle: '음성 및 영상 서비스가 준비되었습니다',
        multiBubbleLabel: `멀티 버블 데모: ${isMultiBubbleDemo ? '켜짐' : '꺼짐'}`,
        switchModeLabel: `버블 전환: ${bubbleSwitchMode === 'fade' ? '페이드' : bubbleSwitchMode === 'slide-up' ? '위로 슬라이드' : '티커'}`,
        apiMessageLabel: '현재 API:',
        consultParamsLabel: '상담 파라미터:',
        entrySelectorLabel: '다중 진입 데모',
        entryChatLabel: '텍스트',
        entryThreadLabel: '기록',
        entryWebrtcLabel: '영상',
        entryCallLabel: '통화',
        entryQrLabel: 'WeChat QR',
        qrInputLabel: 'QR 이미지 URL:',
        qrInputPlaceholder: 'QR 이미지 URL 입력',
        bubbleDemoLabel: `버블 데모: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: '현재 독립 창 전체 URL:',
        popupUrlParamsTitle: '현재 URL 파라미터 목록:',
        popupParamNameTitle: '파라미터',
        popupParamValueTitle: '값',
        popupParamPurposeTitle: '용도',
        popupParamUnknownPurpose: '추가 사용자 정의 URL 파라미터입니다.'
      };
    case LANG_ZH_TW:
      return {
        bubbleAgentTitle: 'AI 智慧客服',
        bubbleAgentSubtitle: '支援多條提示自動切換',
        bubbleWebrtcTitle: '支援音視訊連線',
        bubbleWebrtcSubtitle: '音訊與視訊客服已就緒',
        multiBubbleLabel: `多氣泡輪播示範：${isMultiBubbleDemo ? '開啟' : '關閉'}`,
        switchModeLabel: `氣泡切換方式：${bubbleSwitchMode === 'fade' ? '淡入淡出' : bubbleSwitchMode === 'slide-up' ? '向上滾動' : '連續公告欄'}`,
        apiMessageLabel: '目前呼叫介面:',
        consultParamsLabel: '諮詢參數:',
        entrySelectorLabel: '多入口示範',
        entryChatLabel: '文字',
        entryThreadLabel: '歷史',
        entryWebrtcLabel: '視訊',
        entryCallLabel: '通話',
        entryQrLabel: '微信 QR 碼',
        qrInputLabel: 'QR 圖片 URL：',
        qrInputPlaceholder: '請輸入 QR 圖片 URL',
        bubbleDemoLabel: `氣泡示範：bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: '目前獨立視窗完整 URL：',
        popupUrlParamsTitle: '目前 URL 參數列表：',
        popupParamNameTitle: '參數',
        popupParamValueTitle: '值',
        popupParamPurposeTitle: '用途',
        popupParamUnknownPurpose: '額外自訂 URL 參數。'
      };
    default:
      return {
        bubbleAgentTitle: 'AI 智能客服',
        bubbleAgentSubtitle: '支持多条提示自动切换',
        bubbleWebrtcTitle: '支持音视频连线',
        bubbleWebrtcSubtitle: '音频与视频客服已就绪',
        multiBubbleLabel: `多气泡轮播演示：${isMultiBubbleDemo ? '开启' : '关闭'}`,
        switchModeLabel: `气泡切换方式：${bubbleSwitchMode === 'fade' ? '淡入淡出' : bubbleSwitchMode === 'slide-up' ? '向上滚动' : '连续公告栏'}`,
        apiMessageLabel: '当前调用接口:',
        consultParamsLabel: '咨询参数:',
        entrySelectorLabel: '多入口演示',
        entryChatLabel: '文本对话',
        entryThreadLabel: '历史会话',
        entryWebrtcLabel: '音视频',
        entryCallLabel: '呼叫中心',
        entryQrLabel: '微信二维码',
        qrInputLabel: '二维码图片 URL：',
        qrInputPlaceholder: '请输入二维码图片 URL',
        bubbleDemoLabel: `气泡示例：bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
        popupUrlTitle: '当前独立窗口完整 URL：',
        popupUrlParamsTitle: '当前 URL 参数列表：',
        popupParamNameTitle: '参数',
        popupParamValueTitle: '值',
        popupParamPurposeTitle: '用途',
        popupParamUnknownPurpose: '额外自定义 URL 参数。'
      };
  }
};

export const getConfigGuideCopy = (locale: DemoLanguage): ConfigGuideCopy => {
  switch (locale) {
    case LANG_VI_VN:
      return {
        minimalConfigTitle: 'Cau hinh toi thieu',
        minimalConfigDescription: 'Phu hop khi can tich hop nhanh nhat: chi giu nut chat van ban, thong tin bat buoc trong chatConfig va dung mac dinh cua SDK.',
        recommendedConfigTitle: 'Cau hinh de xuat cho production',
        recommendedConfigDescription: 'Phu hop cho website chinh thuc, trung tam tro giup va trang marketing: bao gom route, theme, bubble, invite va callback thong dung ma van gon gang.',
        configExampleTitle: 'Vi du cau hinh day du',
        configExampleDescription: 'Dung lam mau tham khao day du khi can hieu tat ca khu vuc cau hinh hoac can tuy bien sau hon.',
        configGuideTitle: 'Huong dan BytedeskConfig',
        configGuideDescription: 'Bang ben duoi giai thich cac truong chinh trong BytedeskConfig va cac cau hinh con de ban biet nen dieu chinh o dau.',
        baseSectionTitle: 'Tham so co ban va route', uiSectionTitle: 'Hien thi va tuong tac', callbackSectionTitle: 'Vong doi va callback',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_MS_MY:
      return {
        minimalConfigTitle: 'Konfigurasi minimum',
        minimalConfigDescription: 'Sesuai untuk integrasi paling pantas: hanya butang chat teks, medan wajib chatConfig dan tingkah laku lalai SDK.',
        recommendedConfigTitle: 'Konfigurasi disyorkan untuk production',
        recommendedConfigDescription: 'Sesuai untuk laman rasmi, pusat bantuan dan laman pemasaran: merangkumi route, theme, bubble, invite dan callback lazim tanpa menjadi terlalu kompleks.',
        configExampleTitle: 'Contoh konfigurasi penuh',
        configExampleDescription: 'Gunakan sebagai rujukan lengkap apabila anda mahu memahami semua bahagian konfigurasi atau membina integrasi yang lebih tersuai.',
        configGuideTitle: 'Panduan BytedeskConfig',
        configGuideDescription: 'Jadual di bawah menerangkan medan utama dalam BytedeskConfig dan subkonfigurasi supaya anda tahu bahagian yang perlu dilaras.',
        baseSectionTitle: 'Asas dan route', uiSectionTitle: 'Paparan dan interaksi', callbackSectionTitle: 'Kitar hayat dan callback',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_ES_ES:
      return {
        minimalConfigTitle: 'Configuracion minima',
        minimalConfigDescription: 'Adecuada para la integracion mas rapida: solo entrada de chat de texto, campos obligatorios de chatConfig y comportamiento predeterminado del SDK.',
        recommendedConfigTitle: 'Configuracion recomendada para produccion',
        recommendedConfigDescription: 'Adecuada para sitios oficiales, centros de ayuda y paginas de marketing: incluye rutas, tema, bubble, invite y callbacks habituales sin ser excesiva.',
        configExampleTitle: 'Ejemplo de configuracion completa',
        configExampleDescription: 'Usalo como referencia completa cuando necesites entender todas las secciones configurables o crear una integracion altamente personalizada.',
        configGuideTitle: 'Guia de BytedeskConfig',
        configGuideDescription: 'La tabla siguiente explica los campos principales de BytedeskConfig y sus subconfiguraciones para que sepas donde ajustar cada capacidad.',
        baseSectionTitle: 'Base y rutas', uiSectionTitle: 'Visualizacion e interaccion', callbackSectionTitle: 'Ciclo de vida y callbacks',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_FR_FR:
      return {
        minimalConfigTitle: 'Configuration minimale',
        minimalConfigDescription: 'Adaptee a une integration tres rapide : une seule entree de chat texte, les champs obligatoires de chatConfig et le comportement par defaut du SDK.',
        recommendedConfigTitle: 'Configuration recommandee pour la production',
        recommendedConfigDescription: 'Adaptee aux sites officiels, centres d aide et pages marketing : elle couvre routes, theme, bubble, invite et callbacks frequents sans etre trop lourde.',
        configExampleTitle: 'Exemple de configuration complete',
        configExampleDescription: 'Servez-vous-en comme reference complete lorsque vous devez comprendre toutes les sections configurables ou realiser une integration tres personnalisee.',
        configGuideTitle: 'Guide BytedeskConfig',
        configGuideDescription: 'Le tableau ci-dessous explique les champs principaux de BytedeskConfig et de ses sous-configurations afin de savoir quoi ajuster.',
        baseSectionTitle: 'Base et routage', uiSectionTitle: 'Affichage et interaction', callbackSectionTitle: 'Cycle de vie et callbacks',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_EN:
      return {
        minimalConfigTitle: 'Minimal Config',
        minimalConfigDescription: 'Use this when you only need the fastest possible integration: one text-chat entry, required chatConfig fields, and default SDK behavior.',
        recommendedConfigTitle: 'Recommended Production Config',
        recommendedConfigDescription: 'Use this for most production websites: stable routing, theme, bubble, invite, and visitor callbacks are all configured, while keeping the setup compact.',
        configExampleTitle: 'Complete Config Example',
        configExampleDescription: 'Use this as a full reference when you need to understand every configurable section or build a highly customized integration.',
        configGuideTitle: 'BytedeskConfig Field Guide',
        configGuideDescription: 'The table below explains the main fields in BytedeskConfig and each nested config block, so you can quickly find where to tune behavior.',
        baseSectionTitle: 'Base And Routing', uiSectionTitle: 'Display And Interaction', callbackSectionTitle: 'Callbacks',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_JA_JP:
      return {
        minimalConfigTitle: '最小構成',
        minimalConfigDescription: '最速で導入したい場合に適しています。テキストチャット入口と chatConfig の必須項目だけを残し、その他は SDK の既定値を使います。',
        recommendedConfigTitle: '本番向け推奨構成',
        recommendedConfigDescription: '公式サイト、ヘルプセンター、マーケティングページなどに適しています。route、theme、bubble、invite、callback を含みつつ、設定量は抑えています。',
        configExampleTitle: '完全な設定例',
        configExampleDescription: '設定可能な各セクションを一通り把握したい場合や、高度なカスタマイズを行いたい場合の参照用テンプレートです。',
        configGuideTitle: 'BytedeskConfig 設定ガイド',
        configGuideDescription: '下の表では BytedeskConfig と各サブ設定の主要フィールドを説明し、どこを調整すべきかを分かりやすく整理しています。',
        baseSectionTitle: '基本設定とルーティング', uiSectionTitle: '表示と操作', callbackSectionTitle: 'ライフサイクルとコールバック',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_KO_KR:
      return {
        minimalConfigTitle: '최소 구성',
        minimalConfigDescription: '가장 빠르게 연동할 때 적합합니다. 텍스트 채팅 진입점과 chatConfig 필수 항목만 유지하고 나머지는 SDK 기본값을 사용합니다.',
        recommendedConfigTitle: '운영 권장 구성',
        recommendedConfigDescription: '공식 사이트, 도움말 센터, 마케팅 페이지에 적합합니다. route, theme, bubble, invite, callback 을 포함하면서도 설정은 과하지 않습니다.',
        configExampleTitle: '전체 구성 예시',
        configExampleDescription: '모든 설정 섹션을 이해하거나 고도로 커스터마이즈된 연동을 만들고 싶을 때 참고용으로 사용하세요.',
        configGuideTitle: 'BytedeskConfig 가이드',
        configGuideDescription: '아래 표는 BytedeskConfig 와 각 하위 설정의 주요 필드를 설명하여 어떤 항목을 조정해야 하는지 빠르게 찾도록 도와줍니다.',
        baseSectionTitle: '기본값과 라우팅', uiSectionTitle: '표시와 상호작용', callbackSectionTitle: '생명주기와 콜백',
        themeSectionTitle: 'theme', bubbleSectionTitle: 'bubbleConfig', buttonSectionTitle: 'buttonConfig / buttonsConfig', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig', browseSectionTitle: 'browseConfig', feedbackSectionTitle: 'feedbackConfig', animationSectionTitle: 'animation', windowSectionTitle: 'window', tabsSectionTitle: 'tabsConfig',
      };
    case LANG_ZH_TW:
      return {
        minimalConfigTitle: '最小可用配置',
        minimalConfigDescription: '適合先快速接入客服入口的場景，只保留文字對話與 chatConfig 必填欄位，其餘全部沿用 SDK 預設值。',
        recommendedConfigTitle: '正式環境推薦配置',
        recommendedConfigDescription: '適合官網、幫助中心、行銷頁等多數正式接入場景，保留常用主題、氣泡、邀請、回呼與路由設定，同時避免過度複雜。',
        configExampleTitle: '完整配置示例',
        configExampleDescription: '適合作為進階客製化參考模板，基本涵蓋 BytedeskConfig 與各子配置物件的主要欄位，方便依需求裁剪。',
        configGuideTitle: 'BytedeskConfig 參數說明',
        configGuideDescription: '下方表格會依分組說明 BytedeskConfig 及各子配置的主要欄位，方便快速判斷每個能力應該調整哪裡。',
        baseSectionTitle: '基礎參數與路由', uiSectionTitle: '顯示與互動', callbackSectionTitle: '生命週期與回呼',
        themeSectionTitle: 'theme 主題配置', bubbleSectionTitle: 'bubbleConfig 氣泡配置', buttonSectionTitle: 'buttonConfig / buttonsConfig 入口配置', inviteSectionTitle: 'inviteConfig',
        chatSectionTitle: 'chatConfig 會話與訪客參數', browseSectionTitle: 'browseConfig 瀏覽軌跡參數', feedbackSectionTitle: 'feedbackConfig 文件回饋配置', animationSectionTitle: 'animation 動畫配置', windowSectionTitle: 'window 聊天視窗配置', tabsSectionTitle: 'tabsConfig 標籤配置',
      };
    default:
      return {
        minimalConfigTitle: '最小可用配置',
        minimalConfigDescription: '适合先把客服入口快速接起来的场景，只保留文本对话和 chatConfig 必填字段，其余配置全部走 SDK 默认值。',
        recommendedConfigTitle: '生产推荐配置',
        recommendedConfigDescription: '适合官网、帮助中心、营销站等大多数正式接入场景，保留常用主题、气泡、邀请、回调和路由配置，同时避免过度复杂。',
        configExampleTitle: '完整配置示例',
        configExampleDescription: '适合作为高级定制参考模板，基本覆盖 BytedeskConfig 及各子配置对象的主要字段，便于按需删减。',
        configGuideTitle: 'BytedeskConfig 配置参数说明',
        configGuideDescription: '下方表格按分组解释 BytedeskConfig 及各子配置的主要字段，方便快速定位每个能力应该配置在哪一层。',
        baseSectionTitle: '基础参数与路由', uiSectionTitle: '显示与交互', callbackSectionTitle: '生命周期与事件回调',
        themeSectionTitle: 'theme 主题配置', bubbleSectionTitle: 'bubbleConfig 气泡配置', buttonSectionTitle: 'buttonConfig / buttonsConfig 入口按钮配置', inviteSectionTitle: 'inviteConfig 邀请配置',
        chatSectionTitle: 'chatConfig 会话与访客参数', browseSectionTitle: 'browseConfig 浏览轨迹参数', feedbackSectionTitle: 'feedbackConfig 文档反馈配置', animationSectionTitle: 'animation 动画配置', windowSectionTitle: 'window 聊天窗口配置', tabsSectionTitle: 'tabsConfig 标签配置',
      };
  }
};

export const getExampleCopy = (locale: DemoLanguage): ExampleCopy => {
  switch (locale) {
    case LANG_VI_VN:
      return { routeComment: 'Duong dan trang', entryComment: 'Loi vao va vi tri', multiEntryComment: 'Khi chon nhieu loi vao, buttonsConfig duoc uu tien', welcomeTitle: 'Loi chao', welcomeSubtitle: 'Bong thong bao mac dinh', aiTitle: 'Tro ly AI', aiSubtitle: 'Ho tro nhieu noi dung luan chuyen', chatText: 'Chat van ban', threadText: 'Lich su hoi thoai', webrtcText: 'Audio video', callText: 'Tong dai', qrText: 'Ma QR WeChat', inviteText: 'Moi ban tham gia hoi thoai', inviteAcceptText: 'Bat dau hoi thoai', inviteRejectText: 'De sau', feedbackText: 'Phan hoi tai lieu', feedbackDialogTitle: 'Gui y kien dong gop', feedbackPlaceholder: 'Mo ta van de hoac de xuat cua ban', feedbackSubmitText: 'Gui phan hoi', feedbackCancelText: 'Huy', feedbackSuccessText: 'Da gui phan hoi, cam on ban!', feedbackTypeTitle: 'Loai van de', feedbackTypeDescription: '(chon nhieu)', completeInit: 'Khoi tao xong', chatOpened: 'Da mo chat', chatHidden: 'Da an chat', configChanged: 'Cau hinh da thay doi', visitorInfo: 'Thong tin visitor' };
    case LANG_MS_MY:
      return { routeComment: 'Laluan halaman', entryComment: 'Pintu masuk dan kedudukan', multiEntryComment: 'Apabila berbilang pintu masuk dipilih, buttonsConfig digunakan dahulu', welcomeTitle: 'Ucapan alu-aluan', welcomeSubtitle: 'Bubble petunjuk lalai', aiTitle: 'Pembantu AI', aiSubtitle: 'Menyokong mesej berputar berganda', chatText: 'Chat teks', threadText: 'Sejarah sesi', webrtcText: 'Audio video', callText: 'Pusat panggilan', qrText: 'QR WeChat', inviteText: 'Jemput anda menyertai perbualan', inviteAcceptText: 'Mula berbual', inviteRejectText: 'Nanti sahaja', feedbackText: 'Maklum balas dokumen', feedbackDialogTitle: 'Hantar maklum balas', feedbackPlaceholder: 'Terangkan masalah atau cadangan anda', feedbackSubmitText: 'Hantar', feedbackCancelText: 'Batal', feedbackSuccessText: 'Maklum balas dihantar, terima kasih!', feedbackTypeTitle: 'Jenis masalah', feedbackTypeDescription: '(pilihan berganda)', completeInit: 'Inisialisasi selesai', chatOpened: 'Chat dibuka', chatHidden: 'Chat disembunyikan', configChanged: 'Konfigurasi berubah', visitorInfo: 'Maklumat visitor' };
    case LANG_ES_ES:
      return { routeComment: 'Rutas de pagina', entryComment: 'Entradas y posicion', multiEntryComment: 'Cuando hay varias entradas, buttonsConfig tiene prioridad', welcomeTitle: 'Mensaje de bienvenida', welcomeSubtitle: 'Burbuja de sugerencia por defecto', aiTitle: 'Asistente de IA', aiSubtitle: 'Soporta varias copias rotativas', chatText: 'Chat de texto', threadText: 'Historial de sesiones', webrtcText: 'Audio y video', callText: 'Centro de llamadas', qrText: 'QR de WeChat', inviteText: 'Te invitamos a unirte a la conversacion', inviteAcceptText: 'Empezar chat', inviteRejectText: 'Mas tarde', feedbackText: 'Feedback del documento', feedbackDialogTitle: 'Enviar comentarios', feedbackPlaceholder: 'Describe tu problema o sugerencia', feedbackSubmitText: 'Enviar', feedbackCancelText: 'Cancelar', feedbackSuccessText: 'Comentarios enviados. Gracias.', feedbackTypeTitle: 'Tipo de problema', feedbackTypeDescription: '(seleccion multiple)', completeInit: 'Inicializacion completa', chatOpened: 'Chat abierto', chatHidden: 'Chat oculto', configChanged: 'Configuracion actualizada', visitorInfo: 'Informacion del visitante' };
    case LANG_FR_FR:
      return { routeComment: 'Routes de page', entryComment: 'Entrees et position', multiEntryComment: 'Quand plusieurs entrees sont selectionnees, buttonsConfig est prioritaire', welcomeTitle: 'Message d accueil', welcomeSubtitle: 'Bulle d aide par defaut', aiTitle: 'Assistant IA', aiSubtitle: 'Prend en charge plusieurs messages rotatifs', chatText: 'Chat texte', threadText: 'Historique des sessions', webrtcText: 'Audio video', callText: 'Centre d appel', qrText: 'QR WeChat', inviteText: 'Invitation a rejoindre la conversation', inviteAcceptText: 'Commencer a discuter', inviteRejectText: 'Plus tard', feedbackText: 'Retour sur la documentation', feedbackDialogTitle: 'Envoyer un retour', feedbackPlaceholder: 'Decrivez votre probleme ou votre suggestion', feedbackSubmitText: 'Envoyer', feedbackCancelText: 'Annuler', feedbackSuccessText: 'Retour envoye, merci !', feedbackTypeTitle: 'Type de probleme', feedbackTypeDescription: '(choix multiple)', completeInit: 'Initialisation terminee', chatOpened: 'Chat ouvert', chatHidden: 'Chat masque', configChanged: 'Configuration modifiee', visitorInfo: 'Informations visiteur' };
    case LANG_EN:
      return { routeComment: 'Page routes', entryComment: 'Entry points and placement', multiEntryComment: 'When multiple entries are selected, buttonsConfig takes priority', welcomeTitle: 'Welcome message', welcomeSubtitle: 'Default helper bubble', aiTitle: 'AI assistant', aiSubtitle: 'Supports rotating multiple prompts', chatText: 'Text chat', threadText: 'Thread history', webrtcText: 'Audio video', callText: 'Call center', qrText: 'WeChat QR', inviteText: 'Invite you to join the conversation', inviteAcceptText: 'Start chat', inviteRejectText: 'Later', feedbackText: 'Document feedback', feedbackDialogTitle: 'Submit feedback', feedbackPlaceholder: 'Describe your issue or suggestion', feedbackSubmitText: 'Submit', feedbackCancelText: 'Cancel', feedbackSuccessText: 'Feedback submitted, thank you!', feedbackTypeTitle: 'Issue type', feedbackTypeDescription: '(multiple choice)', completeInit: 'init complete', chatOpened: 'chat opened', chatHidden: 'chat hidden', configChanged: 'config changed', visitorInfo: 'visitor info' };
    case LANG_JA_JP:
      return { routeComment: 'ページルート', entryComment: '入口と配置', multiEntryComment: '複数入口を選択した場合は buttonsConfig が優先されます', welcomeTitle: '歓迎メッセージ', welcomeSubtitle: '既定の案内バブル', aiTitle: 'AI アシスタント', aiSubtitle: '複数の案内文をローテーション表示できます', chatText: 'テキストチャット', threadText: '履歴会話', webrtcText: '音声映像', callText: 'コールセンター', qrText: 'WeChat QR', inviteText: '会話への参加を招待します', inviteAcceptText: '会話を開始', inviteRejectText: 'あとで', feedbackText: 'ドキュメントフィードバック', feedbackDialogTitle: 'フィードバック送信', feedbackPlaceholder: '問題または改善案を入力してください', feedbackSubmitText: '送信', feedbackCancelText: 'キャンセル', feedbackSuccessText: 'フィードバックを送信しました。ありがとうございます。', feedbackTypeTitle: '問題タイプ', feedbackTypeDescription: '（複数選択）', completeInit: '初期化完了', chatOpened: 'チャットを開きました', chatHidden: 'チャットを閉じました', configChanged: '設定が更新されました', visitorInfo: '訪問者情報' };
    case LANG_KO_KR:
      return { routeComment: '페이지 경로', entryComment: '진입점과 위치', multiEntryComment: '여러 진입점을 선택하면 buttonsConfig 가 우선 적용됩니다', welcomeTitle: '환영 메시지', welcomeSubtitle: '기본 안내 버블', aiTitle: 'AI 도우미', aiSubtitle: '여러 안내 문구를 순환 표시할 수 있습니다', chatText: '텍스트 채팅', threadText: '이력 세션', webrtcText: '오디오 비디오', callText: '콜센터', qrText: 'WeChat QR', inviteText: '대화 참여를 초대합니다', inviteAcceptText: '채팅 시작', inviteRejectText: '나중에', feedbackText: '문서 피드백', feedbackDialogTitle: '피드백 제출', feedbackPlaceholder: '문제 또는 제안을 입력하세요', feedbackSubmitText: '제출', feedbackCancelText: '취소', feedbackSuccessText: '피드백이 제출되었습니다. 감사합니다.', feedbackTypeTitle: '문제 유형', feedbackTypeDescription: '(복수 선택)', completeInit: '초기화 완료', chatOpened: '채팅 열림', chatHidden: '채팅 숨김', configChanged: '구성이 변경됨', visitorInfo: '방문자 정보' };
    case LANG_ZH_TW:
      return { routeComment: '頁面路由', entryComment: '入口與位置', multiEntryComment: '選擇多個入口時，會優先使用 buttonsConfig', welcomeTitle: '歡迎語', welcomeSubtitle: '預設提示氣泡', aiTitle: 'AI 助手', aiSubtitle: '支援多條輪播提示文案', chatText: '文字對話', threadText: '歷史會話', webrtcText: '音視訊', callText: '呼叫中心', qrText: '微信二維碼', inviteText: '邀請您加入對話', inviteAcceptText: '開始對話', inviteRejectText: '稍後再說', feedbackText: '文件回饋', feedbackDialogTitle: '提交意見回饋', feedbackPlaceholder: '請描述您的問題或優化建議', feedbackSubmitText: '提交回饋', feedbackCancelText: '取消', feedbackSuccessText: '回饋已提交，感謝您的意見！', feedbackTypeTitle: '問題類型', feedbackTypeDescription: '（多選）', completeInit: '初始化完成', chatOpened: '聊天已打開', chatHidden: '聊天已隱藏', configChanged: '配置已更新', visitorInfo: '訪客資訊' };
    default:
      return { routeComment: '页面路由', entryComment: '入口与位置', multiEntryComment: '选中多个入口时优先使用 buttonsConfig', welcomeTitle: '欢迎语', welcomeSubtitle: '默认提示气泡', aiTitle: 'AI 助手', aiSubtitle: '支持多条轮播文案', chatText: '文本对话', threadText: '历史会话', webrtcText: '音视频', callText: '呼叫中心', qrText: '微信二维码', inviteText: '邀请您加入对话', inviteAcceptText: '开始对话', inviteRejectText: '稍后再说', feedbackText: '文档反馈', feedbackDialogTitle: '提交意见反馈', feedbackPlaceholder: '请描述您的问题或优化建议', feedbackSubmitText: '提交反馈', feedbackCancelText: '取消', feedbackSuccessText: '反馈已提交，感谢您的意见！', feedbackTypeTitle: '问题类型', feedbackTypeDescription: '（多选）', completeInit: '初始化完成', chatOpened: '聊天已打开', chatHidden: '聊天已隐藏', configChanged: '配置已更新', visitorInfo: '访客信息' };
  }
};