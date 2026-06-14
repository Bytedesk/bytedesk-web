import { en } from './en';

const basicDemoFieldDocs = {
  isDebug: '개발용 디버그 로그를 켤지 여부입니다.',
  forceRefresh: '채팅 페이지나 iframe 리소스를 강제로 새로고침해 캐시 문제를 확인합니다.',
  apiUrl: '방문자 초기화, 미읽음 수, 피드백 업로드 등에 사용하는 API 루트 주소입니다.',
  htmlUrl: '채팅 페이지의 사이트 루트 주소입니다. 실제 페이지 유형은 각 path 설정으로 분리합니다.',
  chatPath: '텍스트 채팅 페이지 경로입니다.',
  threadPath: '기록 대화 페이지 경로입니다.',
  webrtcPath: '음성 또는 영상 페이지 경로입니다.',
  callPath: '콜센터 페이지 경로입니다.',
  locale: 'UI 언어 설정이며 chat URL 의 lang 파라미터에도 반영됩니다.',
  placement: '버튼과 채팅창의 고정 위치입니다. bottom-left 와 bottom-right 를 지원합니다.',
  marginBottom: '하단 여백입니다. 단위는 px 입니다.',
  marginSide: '좌우 여백입니다. 단위는 px 입니다.',
  autoPopup: '초기화 후 채팅창을 자동으로 열지 여부입니다.',
  autoPopupDelay: '자동 팝업까지의 지연 시간입니다.',
  draggable: '진입 버튼을 드래그 가능하게 할지 여부입니다.',
  tabsConfig: 'help, thread, messages 탭 표시 여부를 제어합니다.',
  bubbleConfig: '입구 위 안내 버블의 제목, 부제, 로테이션 문구 등을 설정합니다.',
  buttonConfig: '단일 진입 버튼 설정입니다.',
  buttonsConfig: '복수 진입 버튼 배열 설정입니다. buttonConfig 보다 우선합니다.',
  inviteConfig: '초대 팝업의 타이밍, 반복, 버튼 문구, 콜백을 설정합니다.',
  theme: 'light, dark, system 모드와 색상 테마 설정입니다.',
  animation: '채팅창 표시와 숨김 애니메이션 설정입니다.',
  window: '데스크톱 채팅창 크기 설정입니다.',
  onInit: 'SDK 초기화 완료 후 실행되는 콜백입니다.',
  onShowChat: '채팅창이 열릴 때 실행됩니다.',
  onHideChat: '채팅창이 닫힐 때 실행됩니다.',
  onMessage: 'iframe 또는 SDK 내부 메시지를 받을 때 실행됩니다.',
  onConfigChange: '설정 변경 후 실행됩니다.',
  onVisitorInfo: '방문자 초기화 후 uid 와 visitorUid 를 돌려줍니다.',
  'theme.mode': '테마 모드입니다. light, dark, system 을 사용할 수 있습니다.',
  'theme.textColor': '버튼과 모듈 내부 텍스트 색상입니다.',
  'theme.backgroundColor': '버튼과 내비게이션의 주요 배경색입니다.',
  'bubble.show': '입구 위 버블을 표시할지 여부입니다.',
  'bubble.icon': '단일 버블 기본 아이콘입니다.',
  'bubble.title': '단일 버블 제목입니다.',
  'bubble.subtitle': '단일 버블 부제입니다.',
  'bubble.messages': '여러 버블 메시지 배열입니다. 단일 설정보다 우선합니다.',
  'bubble.autoRotate': '여러 버블 메시지를 자동 순환할지 여부입니다.',
  'bubble.rotateInterval': '버블 순환 간격입니다.',
  'bubble.switchMode': '버블 전환 방식입니다. fade, slide-up, ticker 를 지원합니다.',
  'button.show': '이 버튼을 표시할지 여부입니다.',
  'button.icon': '버튼 아이콘입니다.',
  'button.text': '버튼 텍스트입니다. 단일 원형 버튼일 때는 생략을 권장합니다.',
  'button.width': '버튼 너비입니다.',
  'button.height': '버튼 높이입니다.',
  'button.action': '기본 내장 액션 타입입니다. chat, thread, webrtc, call 을 지원합니다.',
  'button.previewImageUrl': '호버 시 보여줄 이미지 주소입니다. QR 코드에 적합합니다.',
  'button.previewImageAlt': '미리보기 이미지 아래 표시할 설명 문구입니다.',
  'button.onClick': '기본 동작을 덮어쓰는 사용자 정의 클릭 핸들러입니다.',
  'invite.show': '초대 팝업을 사용할지 여부입니다.',
  'invite.text': '초대 문구입니다.',
  'invite.icon': '초대 팝업 아이콘입니다.',
  'invite.delay': '첫 초대 노출까지의 지연 시간입니다.',
  'invite.loop': '초대 팝업을 반복 노출할지 여부입니다.',
  'invite.loopDelay': '반복 노출 간격입니다.',
  'invite.loopCount': '반복 횟수입니다.',
  'invite.acceptText': '수락 버튼 문구입니다.',
  'invite.rejectText': '거절 버튼 문구입니다.',
  'invite.onAccept': '수락 시 실행됩니다.',
  'invite.onReject': '거절 시 실행됩니다.',
  'invite.onClose': '초대 팝업이 닫힐 때 실행됩니다.',
  'invite.onOpen': '초대 팝업이 열릴 때 실행됩니다.',
  'chat.org': '조직 ID 입니다. 필수입니다.',
  'chat.t': '대화 타입입니다. 필수입니다. t=0 은 1:1 상담원, t=1 은 작업 그룹, t=2 는 로봇을 의미합니다.',
  'chat.sid': '대상 세션 ID 입니다. 필수입니다.',
  'chat.uid': 'SDK 가 주로 관리하는 내부 사용자 ID 입니다.',
  'chat.visitorUid': '비즈니스 측 방문자 고유 식별자입니다.',
  'chat.nickname': '방문자 닉네임입니다.',
  'chat.avatar': '방문자 아바타 URL 입니다.',
  'chat.mobile': '방문자 휴대폰 번호입니다.',
  'chat.email': '방문자 이메일입니다.',
  'chat.note': '상담사에게 보이는 메모입니다.',
  'chat.channel': '유입 채널입니다.',
  'chat.goodsInfo': '상품 정보입니다.',
  'chat.orderInfo': '주문 정보입니다.',
  'chat.extra': '추가 확장 필드입니다. 보통 JSON 문자열을 사용합니다.',
  'chat.vipLevel': '회원 등급입니다.',
  'chat.debug': '테스트와 운영을 구분하는 비즈니스 플래그입니다.',
  'chat.draft': '점진 배포용 draft 플래그입니다.',
  'chat.settingsUid': '설정 디버깅에 쓰는 고유 ID 입니다.',
  'chat.loadHistory': '이전 메시지를 불러올지 여부입니다. loadHistory=1 이면 대화 페이지 열 때 기본으로 이전 채팅 기록을 불러옵니다.',
  'chat.threadDetail': '스레드 상세 버튼 표시 여부입니다. threadDetail=1 이면 표시하고 기본값은 숨김입니다.',
  'chat.visitorProfile': '방문자 프로필 버튼 표시 여부입니다. visitorProfile=1 이면 표시하고 기본값은 숨김입니다.',
  'chat.custom': '추가 비즈니스 필드를 URL 파라미터로 계속 확장할 수 있습니다.',
  'browse.referrer': '유입 페이지 주소입니다.',
  'browse.url': '현재 페이지 주소입니다.',
  'browse.title': '현재 페이지 제목입니다.',
  'browse.custom': '페이지 ID 등 추가 브라우즈 정보를 전달할 수 있습니다.',
  'feedback.enabled': '문서 피드백 기능을 사용할지 여부입니다.',
  'feedback.trigger': '트리거 방식입니다. selection, button, both 를 지원합니다.',
  'feedback.showOnSelection': '텍스트 선택 시 피드백 입구를 보여줄지 여부입니다.',
  'feedback.selectionText': '선택 시 안내 문구입니다.',
  'feedback.buttonText': '고정 피드백 버튼 문구입니다.',
  'feedback.dialogTitle': '피드백 대화상자 제목입니다.',
  'feedback.placeholder': '입력창 플레이스홀더입니다.',
  'feedback.submitText': '제출 버튼 문구입니다.',
  'feedback.cancelText': '취소 버튼 문구입니다.',
  'feedback.successMessage': '제출 성공 후 보여줄 문구입니다.',
  'feedback.categoryNames': '문제 유형 목록입니다.',
  'feedback.requiredTypes': '유형 선택을 필수로 할지 여부입니다.',
  'feedback.typesSectionTitle': '유형 영역 제목입니다.',
  'feedback.typesDescription': '유형 영역 보조 설명입니다.',
  'feedback.submitScreenshot': '스크린샷도 함께 제출할지 여부입니다.',
  'feedback.onSubmit': '사용자 정의 제출 흐름입니다.',
  'feedback.onCancel': '취소 시 실행됩니다.',
  'animation.enabled': '채팅창 애니메이션을 사용할지 여부입니다.',
  'animation.duration': '애니메이션 시간입니다.',
  'animation.type': '이징 타입입니다.',
  'window.width': '데스크톱 채팅창 너비입니다.',
  'window.height': '데스크톱 채팅창 높이입니다.',
  'tabs.messages': 'messages 탭 표시 여부입니다.',
  'tabs.thread': 'thread 히스토리 탭 표시 여부입니다.',
  'tabs.help': 'help 탭 표시 여부입니다.',
} as const;

export const koKr = {
  ...en,
  common: {
    ...en.common,
    languageLabel: '언어',
    languageOptions: {
      en: '영어',
      'zh-cn': '중국어(간체)',
      'zh-tw': '중국어(번체)',
      'ja-jp': '일본어',
      'ko-kr': '한국어',
      'vi-vn': '베트남어',
      'ms-my': '말레이어',
      'es-es': '스페인어',
      'fr-fr': '프랑스어',
      'th-th': 'ไทย'
    },
    themeLabel: '테마 모드',
    themeOptions: {
      light: '라이트',
      dark: '다크',
      system: '시스템'
    },
    officialSiteLabel: 'Bytedesk 공식 사이트',
    resetAnonymousVisitorLabel: '익명 방문자 초기화',
    resetAnonymousVisitorSuccess: '익명 방문자가 초기화되었습니다',
    docLinks: {
      ...en.common.docLinks,
      react: 'React 연동 문서 보기',
      vue: 'Vue 연동 문서 보기',
      reactExample: 'React 기본 예제 코드',
      vueExample: 'Vue 기본 예제 코드',
      userInfo: '사용자 정보 연동 문서 보기',
      goodsInfo: '상품 정보 연동 문서 보기',
      orderInfo: '주문 정보 연동 문서 보기',
      vipLevel: '개인화 연동 문서 보기',
      unreadCount: 'React 읽지 않음 카운터 예제',
      documentFeedback: '문서 피드백 기능 안내'
    },
    buttons: {
      ...en.common.buttons,
      openChat: '채팅 열기',
      openChatWithParams: '파라미터로 채팅 열기',
      closeChat: '채팅 닫기',
      showButton: '버튼 표시',
      hideButton: '버튼 숨기기',
      showBubble: '버블 표시',
      hideBubble: '버블 숨기기',
      showInvite: '초대 표시',
      hideInvite: '초대 숨기기',
      togglePlacement: '위치 전환',
      toggleThemeColor: '테마 색상 전환',
      reset: '초기화',
      copy: '복사',
      submit: '제출',
      cancel: '취소',
      openInNewWindow: '팝업 창으로 열기',
      openInNewTab: '새 탭에서 열기'
    },
    apiHintPrefix: 'API 호출:'
  },
  nav: {
    ...en.nav,
    more: '더보기',
    basicDemo: '⚙️ 기본 설정',
    userInfoDemo: '👤 사용자 정보',
    goodsInfoDemo: '🛒 상품 정보',
    orderInfoDemo: '📦 주문 정보',
    vipLevelDemo: '👑 개인화',
    unreadCountDemo: '🔔 읽지 않음 카운터',
    threadHistoryDemo: '🧵 대화 이력',
    videoSupportDemo: '🎥 영상 상담',
    webrtcDemo: '📹 WebRTC 데모',
    callCenterDemo: '📞 콜센터',
    proactiveDemo: '🎯 능동 고객 확보',
    voiceAgentDemo: '🎙️ 음성 에이전트',
    videoConferenceDemo: '🎬 화상 회의',
    documentFeedbackDemo: '📝 문서 피드백',
    flightBookingDemo: '✈️ 항공권 예약'
  },
  pages: {
    ...en.pages,
    proactiveDemo: {
      ...en.pages.proactiveDemo,
      title: '능동 고객 확보 데모',
      description: '이 페이지는 기본 워크플로우에 연결되며 채팅을 열면 학력 확인, 요구 확인, 연락처 수집 흐름으로 바로 진입합니다.',
      tags: {
        mobileValidation: '휴대폰 검증',
        multiTurnQa: '다회차 문답'
      },
      alertTitle: '검증 경로',
      alertDescription: '대화에 들어가면 먼저 학력과 상담 의도를 수집한 뒤 도시, 상담 시나리오, 휴대폰 번호를 입력받습니다. 번호가 중국 본토 11자리 휴대폰 형식과 맞지 않으면 폼이 제출되지 않습니다. 매번 열 때마다 새 워크플로우 스레드를 강제로 생성합니다.',
      workflowCardTitle: '기본 능동 고객 확보 워크플로우',
      workflowCardTag: '학력 확인 + 요구 확인 + 연락처 수집',
      bubbleTitle: '능동 고객 확보',
      bubbleSubtitle: '기본 워크플로우 리드 수집 데모',
      buttons: {
        openWorkflowChat: '기본 워크플로우 열기',
        closeChat: '채팅 창 닫기'
      },
      urlParamsTitle: '워크플로우 URL 파라미터',
      urlDescription: '독립 창 전체 URL은 locale, 테마 모드, 방문자 식별 파라미터에 따라 달라집니다. forceNewThread는 SDK에서 워크플로우를 열 때 새 스레드를 보장하기 위해서만 쓰이므로 아래 임베드 코드에 유지했습니다.',
      urlParams: [
        'org: 워크플로우가 속한 조직의 고유 식별자',
        't: 세션 타입이며 17은 워크플로우 세션을 의미합니다',
        'sid: 어떤 기본 워크플로우를 열지 결정하는 워크플로우 고유 식별자',
        'lang: 현재 데모 locale을 따르는 대화 언어',
        'mode: 현재 라이트 또는 다크 설정을 따르는 테마 모드',
        'navbar: 상단 내비게이션 표시 여부이며 1이면 표시',
        'visitorUid: 실명 모드에서 방문자 이력을 연결하는 방문자 고유 식별자',
        'nickname: 실명 모드에서 채팅 페이지로 전달되는 방문자 닉네임',
        'avatar: 실명 모드에서 표시용으로 쓰는 방문자 아바타 URL'
      ],
      embedCodeTitle: '현재 임베드 코드',
      embedCodeDescription: '아래 임베드 코드는 이 페이지의 실제 설정과 동일하며 고정 워크플로우 리드 수집 진입점으로 바로 복사해 사용할 수 있습니다.'
    },
    voiceAgentDemo: {
      ...en.pages.voiceAgentDemo,
      title: '음성 도우미 데모'
    },
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'Bytedesk 기본 설정',
      intro: '아래 빠른 동작 버튼으로 Bytedesk Web SDK의 주요 기능을 체험할 수 있습니다.',
      themeButtonLabel: '네비게이션 색상 변경',
      themeTextButtonLabel: '네비게이션 글자색 변경',
      bubbleTitle: '도움이 필요하신가요?',
      bubbleSubtitle: '클릭해서 대화를 시작하세요',
      placement: {
        bottomLeft: '왼쪽 아래',
        bottomRight: '오른쪽 아래'
      },
      navbarLabel: '상단 네비 숨기기',
      navbarHidden: 'ON',
      navbarShown: 'OFF',
      navbarParamPurpose: '상단 내비게이션 바를 숨길지 여부입니다. navbar=0 이면 숨깁니다.',
      qrCodeParamLabel: 'QR 버튼 표시',
      threadDetailParamLabel: '스레드 상세 버튼 표시',
      visitorProfileParamLabel: '방문자 프로필 버튼 표시',
      loadHistoryLabel: '대화 이력 로드',
      loadHistoryEnabled: 'ON',
      loadHistoryDisabled: 'OFF',
      defaultColorLabel: '기본값',
      defaultTextColorLabel: '기본값',
      currentConfigTitle: '현재 설정',
      copyConfig: '설정 JSON 복사',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: '서드파티 업무 시스템 사용자 정보 연동 데모',
      description: '서드파티 업무 시스템의 사용자 정보(visitorUid, nickname, avatar 등)를 설정으로 전달해 상담사가 현재 방문자를 즉시 식별하고 업무 문맥을 함께 확인할 수 있도록 합니다. 아래 버튼으로 샘플 업무 사용자를 전환해 보세요.',
      switchUser: '사용자 전환',
      switchToUserLabel: '{{name}}(으)로 전환',
      switchAnonymousUserLabel: '익명 사용자로 전환',
      anonymousUserLabel: '익명 사용자',
      anonymousUserHint: '익명 테스트 모드: visitorUid, nickname, avatar 등 사용자 필드를 전달하지 않습니다.',
      currentUserTitle: '현재 업무 시스템 사용자',
      currentUserIdLabel: '사용자 ID',
      currentUserNicknameLabel: '닉네임',
      contactSupport: '상담 시작',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: '서드파티 업무 시스템 사용자 정보 연동 문서 보기',
        reactExample: 'React 서드파티 업무 시스템 사용자 정보 예제',
        vueExample: 'Vue 서드파티 업무 시스템 사용자 정보 예제'
      },
      controlPanel: {
        title: 'Bytedesk 제어 패널',
        chatWindow: '채팅 창 제어',
        button: '버튼 제어',
        bubble: '버블 제어',
        invite: '초대창 제어'
      },
      urlGuideTitle: '현재 독립 창 전체 URL + 쿼리 사용법',
      urlTemplateLabel: '공통 URL 템플릿',
      urlParamsTitle: '파라미터 안내 (/chat)',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      apiHintPrefix: 'API 호출:'
    },
    goodsInfoDemo: {
      ...en.pages.goodsInfoDemo,
      title: '상품 정보 연동 데모',
      description: '상품 메타데이터(uid, title, image, description, price, url, tags)를 대화 세션에 전달해 상담사가 콘솔 이탈 없이 맥락을 확인할 수 있습니다.',
      infoCardTitle: '상품 상세',
      tagsLabel: '태그',
      descriptionLabel: '설명',
      priceLabel: '가격',
      contactSupport: '상담 시작',
      docLinks: {
        ...en.pages.goodsInfoDemo.docLinks,
        goodsDoc: '상품 정보 연동 가이드 보기',
        reactExample: 'React 상품 정보 예제',
        vueExample: 'Vue 상품 정보 예제'
      },
      controlPanel: {
        title: 'Bytedesk 제어 패널',
        chatWindow: '채팅 창 제어'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      urlTemplateLabel: '공통 URL 템플릿',
      urlParamsTitle: '파라미터 안내 (/chat)',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      payloadGuideTitle: 'goodsInfo 구성 및 변환',
      payloadObjectLabel: '1단계: 비즈니스 객체',
      payloadJsonLabel: '2단계: JSON 문자열 (JSON.stringify)',
      payloadEncodedLabel: '3단계: URL 인코딩 값 (encodeURIComponent)',
      payloadNotesTitle: '참고'
    },
    orderInfoDemo: {
      ...en.pages.orderInfoDemo,
      title: '주문 정보 연동 데모',
      description: '대화마다 주문 정보를 함께 전달하여 사후 지원과 문제 처리를 더 빠르게 진행할 수 있습니다.',
      sections: {
        statusTimeline: '주문 상태',
        orderInfo: '주문 상세',
        goodsInfo: '상품 요약',
        shippingInfo: '배송 정보'
      },
      labels: {
        orderId: '주문 ID',
        orderTime: '생성 시각',
        orderStatus: '상태',
        paymentMethod: '결제 수단',
        totalAmount: '총 금액',
        unitPrice: '단가',
        quantity: '수량',
        receiver: '수령인',
        phone: '연락처',
        address: '주소'
      },
      statusText: {
        pending: '결제 대기',
        paid: '결제 완료',
        shipped: '배송 중',
        delivered: '배송 완료'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      urlTemplateLabel: '공통 URL 템플릿',
      urlParamsTitle: '파라미터 안내 (/chat)',
      urlParams: [
        'org: 조직 ID (필수)',
        't: 세션 유형 (0: 1:1, 1: 워크그룹, 2: 봇)',
        'sid: 대상 스레드 ID (워크그룹/봇/상담사)',
        'visitorUid: 사용자 지정 방문자 ID (선택)',
        'nickname/avatar: 방문자 프로필 (선택)',
        'orderInfo: 주문 페이로드(JSON 문자열, 권장)',
        'extra: 확장 페이로드(JSON 문자열, 선택)',
        'lang/mode: 언어 및 테마 모드 (선택)'
      ],
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      payloadGuideTitle: 'orderInfo 구성 및 변환',
      payloadObjectLabel: '1단계: 비즈니스 객체',
      payloadJsonLabel: '2단계: JSON 문자열 (JSON.stringify)',
      payloadEncodedLabel: '3단계: URL 인코딩 값 (encodeURIComponent)',
      payloadNotesTitle: '참고',
      payloadNotes: [
        '먼저 완전한 주문 객체를 만들고 JSON.stringify 후 chatConfig에 전달하세요.',
        'URL 직접 연동 시 인코딩된 orderInfo를 전달하면 됩니다. SDK의 URLSearchParams는 자동 인코딩합니다.',
        '상담 맥락 전달을 위해 orderInfo.goods 와 orderInfo.shippingAddress의 핵심 필드를 유지하세요.',
        'status 는 안정적인 enum 값(예: paid/shipped)을 사용하고 표시 문구는 statusText를 사용하세요.'
      ]
    },
    vipLevelDemo: {
      ...en.pages.vipLevelDemo,
      title: '개인화 데모',
      description: 'vipLevel 및 사용자 확장 필드를 전달해 더 풍부한 고객 프로필과 개인화된 상담 경험을 제공합니다.',
      vipLabel: 'VIP 등급',
      normalLabel: '일반 사용자',
      switchButtonLabel: '{{name}}(으)로 전환',
      users: {
        user1: '일반 프로필',
        user2: 'VIP 1 프로필',
        user3: 'VIP 2 프로필'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      urlTemplateLabel: '공통 URL 템플릿',
      urlParamsTitle: '파라미터 안내',
      urlParams: [
        'org: 조직 ID (필수)',
        't: 세션 유형 (0: 1:1, 1: 워크그룹, 2: 봇)',
        'sid: 대상 스레드 ID (워크그룹/봇/상담사)',
        'visitorUid: 사용자 지정 방문자 ID (권장)',
        'nickname/avatar: 방문자 프로필 (선택)',
        'vipLevel: 방문자 VIP 레벨 (0-10 정수 권장)',
        'extra: 사용자 정의 필드 JSON 문자열 (선택)',
        'lang/mode: 언어 및 테마 모드 (선택)'
      ],
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      payloadGuideTitle: 'vipLevel 구성 및 변환',
      payloadObjectLabel: '1단계: 비즈니스 객체',
      payloadJsonLabel: '2단계: JSON 문자열 (JSON.stringify)',
      payloadEncodedLabel: '3단계: URL 인코딩 값 (encodeURIComponent)',
      payloadNotesTitle: '참고',
      payloadNotes: [
        'vipLevel은 0-10 같은 안정적인 정수 체계를 사용하는 것이 좋습니다.',
        'extra는 객체로 구성한 뒤 JSON.stringify 하여 chatConfig에 전달하세요.',
        'URL 직접 연동 시 인코딩된 extra를 사용하세요. SDK의 URLSearchParams는 자동 인코딩합니다.',
        '레벨이 변경되면 위젯 재초기화 또는 스레드 파라미터 갱신으로 프로필을 반영하세요.'
      ]
    },
    unreadCountDemo: {
      ...en.pages.unreadCountDemo,
      title: '읽지 않음 카운터 데모',
      description: 'getUnreadMessageCount 및 clearUnreadMessages를 호출해 현재 사용자 기준 읽지 않음 상태를 동기화합니다.',
      currentCount: '현재 읽지 않음 수',
      usageNotesTitle: '팁',
      usageNotes: [
        '최신 읽지 않음 총합이 필요할 때 getUnreadMessageCount()를 호출하세요.',
        '사용자가 메시지를 읽은 뒤 clearUnreadMessages()를 호출해 수치를 초기화하세요.'
      ],
      urlGuideTitle: 'API URL + 파라미터 사용법',
      countApiLabel: '읽지 않음 조회 API (GET)',
      clearApiLabel: '읽지 않음 초기화 API (POST)',
      urlParamsTitle: '공통 파라미터 (SDK 내부와 동일)',
      urlParams: [
        'uid: 시스템 방문자 UID (localStorage BYTEDESK_UID)',
        'visitorUid: 프런트에서 전달하는 커스텀 방문자 UID (선택, 권장)',
        'orgUid: 조직 ID (chatConfig.org)',
        'client: 클라이언트 타입 (SDK가 WEB_FLOAT 자동 추가)'
      ],
      sampleUrlLabel: '읽지 않음 조회 샘플 URL',
      sampleBodyLabel: '읽지 않음 초기화 샘플 POST Body',
      apiNotesTitle: '구현 참고',
      apiNotes: [
        'getUnreadMessageCount()는 GET /visitor/api/v1/message/unread/count 에 매핑됩니다.',
        'clearUnreadMessages()는 POST /visitor/api/v1/message/unread/clear 에 매핑됩니다.',
        'SDK는 localStorage의 BYTEDESK_UID와 chatConfig.visitorUid/chatConfig.org를 조합해 요청합니다.',
        'uid가 비어 있으면 getUnreadMessageCount()는 요청 없이 0을 반환합니다.'
      ],
      buttons: {
        ...en.pages.unreadCountDemo.buttons,
        markAllRead: '모두 읽음 처리',
        refresh: '읽지 않음 새로고침'
      }
    },
    threadHistoryDemo: {
      ...en.pages.threadHistoryDemo,
      title: '대화 이력 데모',
      description: '방문자 ThreadList 페이지를 기반으로 SDK 아이콘에서 /chat/thread를 열어 과거 대화 목록을 불러옵니다.',
      bubbleTitle: '대화 이력',
      bubbleSubtitle: '클릭하여 이력 목록 열기',
      anonymousUserLabel: '익명 사용자',
      anonymousUserHint: '익명 테스트 모드: visitorUid, nickname, avatar를 전달하지 않습니다.',
      pathAlert: '이 페이지는 chatPath=/chat/thread 를 사용합니다. 아이콘 클릭 시 /chat 대신 이력 목록이 열립니다.',
      currentPathLabel: '현재 진입 경로',
      currentPathHint: '/chat 과 동일한 파라미터를 사용합니다.',
      usageTitle: '데모 참고',
      usageNotes: [
        '1. chatPath를 /chat/thread 로 설정하면 아이콘 클릭 및 showChat() 모두 이력 목록으로 진입합니다.',
        '2. /chat/thread 는 /chat과 동일하게 org, t, sid, visitorUid, nickname, avatar를 받습니다.',
        '3. 추가 SDK 호출 없이 URL + 쿼리 파라미터 방식으로 바로 연동할 수 있습니다.'
      ],
      buttons: {
        ...en.pages.threadHistoryDemo.buttons,
        openHistoryPage: '대화 이력 페이지 열기',
        switchAnonymousUser: '익명 사용자로 전환'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      urlTemplateLabel: '공통 URL 템플릿',
      urlParamsTitle: '파라미터 안내 (/chat과 동일)',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      docLinks: {
        ...en.pages.threadHistoryDemo.docLinks,
        threadDoc: '대화 이력 연동 가이드 보기',
        visitorRef: 'Visitor ThreadList 참고',
        reactExample: 'React 대화 이력 데모 소스'
      }
    },
    callCenterDemo: {
      ...en.pages.callCenterDemo,
      title: '콜센터 데모',
      description: '기본 채팅 경로를 유지한 채 sid를 전환해 사용자를 콜센터 워크그룹으로 라우팅하는 방법을 보여줍니다.',
      bubbleTitle: '콜센터',
      bubbleSubtitle: '대기열 및 전환 준비 완료',
      usageTitle: '데모 참고',
      usageNotes: [
        '1. sid를 콜센터 워크그룹 ID로 설정하면 모든 세션이 동일한 큐로 진입합니다.',
        '2. visitorUid를 다르게 주면 동시 접속 사용자 큐를 쉽게 시뮬레이션할 수 있습니다.',
        '3. 운영 환경에서는 업무 라인(영업/지원/AS)별 sid 분리로 라우팅 품질을 높일 수 있습니다.'
      ],
      buttons: {
        ...en.pages.callCenterDemo.buttons,
        openCallCenter: '콜센터 열기',
        switchAnonymousUser: '익명 사용자로 전환'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      docLinks: {
        ...en.pages.callCenterDemo.docLinks,
        reactDoc: 'React 연동 문서 보기',
        vueDoc: 'Vue 연동 문서 보기',
        reactExample: 'React 콜센터 데모 소스'
      },
      runtime: {
        ...en.pages.callCenterDemo.runtime,
        title: '런타임 패널 (SIP.js 스타일)',
        description: '연결, 대기열, 배정, 완료 상태를 시뮬레이션하여 콜센터 진입 흐름을 빠르게 검증합니다.',
        statusLabels: {
          sdkReady: 'SDK 준비 상태',
          queueState: '큐 상태',
          activeSessionCount: '활성 세션 수',
          lastActionAt: '마지막 동작 시각'
        },
        statusValues: {
          ready: '준비됨',
          notReady: '준비 안 됨'
        },
        queueState: {
          idle: '대기',
          queueing: '큐 대기 중',
          serving: '응대 중'
        },
        buttons: {
          openQueue: '큐 진입 열기',
          simulateAssign: '상담사 배정 시뮬레이션',
          completeSession: '현재 세션 완료',
          clearLogs: '로그 비우기'
        },
        logTitle: '활동 로그',
        emptyLogs: '아직 활동이 없습니다. 위의 빠른 동작을 실행해 보세요.',
        logTemplates: {
          switchedAnonymous: '익명 모드로 전환했습니다.',
          switchedUser: '방문자를 전환했습니다: {{name}}.',
          openQueue: '콜센터 진입을 열고 큐 대기 상태로 전환했습니다.',
          closeQueue: '채팅 패널을 닫았습니다.',
          assignSession: '상담사 배정을 시뮬레이션했습니다. 세션이 응대 중 상태가 되었습니다.',
          completeSession: '응대가 완료되어 세션을 종료했습니다.'
        }
      }
    },
    webrtcDemo: {
      ...en.pages.webrtcDemo,
      title: '음성/영상 상담 데모',
      description: '우측 하단 플로팅 버튼으로 WebRTC 기반 실시간 음성 또는 영상 상담을 체험할 수 있습니다. 통화 모드와 방문자 정보는 /webrtc URL 파라미터로 전달됩니다.',
      modeLimitNotice: '현재 로봇 모드는 지원되지 않습니다. 사람 상담사 음성/영상 모드만 지원됩니다.',
      pathAlert: '플로팅 버튼 기본값은 음성 상담 모드(audio=1&video=0)입니다. 아래 버튼으로 영상 모드로 전환할 수 있습니다.',
      callMode: '현재 통화 모드',
      callModeAudio: '🎙️ 음성 상담사 (audio=1, video=0)',
      callModeVideo: '📹 영상 상담사 (audio=1, video=1)',
      bubbleTitleAudio: '음성 상담사',
      bubbleTitleVideo: '영상 상담사',
      bubbleSubtitleAudio: '클릭하여 음성 통화 시작',
      bubbleSubtitleVideo: '클릭하여 영상 통화 시작',
      usageTitle: '데모 참고',
      usageNotes: [
        '1. 우측 하단 플로팅 버튼/버블이 WebRTC 진입점이며 클릭 시 임베디드 창에서 /webrtc를 엽니다.',
        '2. 음성 상담 (audio=1&video=0): 마이크/스피커만 사용하며 카메라는 필요 없습니다.',
        '3. 영상 상담 (audio=1&video=1): 카메라와 마이크를 함께 사용합니다.',
        '4. 운영 환경 기본 URL은 https://cdn.weiyuai.cn/webrtc, 로컬은 http://127.0.0.1:9018/webrtc 입니다.',
        '5. org, t, sid는 일반 채팅 연동과 동일하게 사용합니다.'
      ],
      buttons: {
        ...en.pages.webrtcDemo.buttons,
        audioMode: '🎙️ 음성 상담으로 전환',
        videoMode: '📹 영상 상담으로 전환',
        switchAnonymousUser: '익명 사용자로 전환'
      },
      urlGuideTitle: 'URL + 파라미터 안내',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      urlParamsTitle: '파라미터 안내',
      urlParams: [
        'org: 조직 ID (필수)',
        't: 세션 유형 (0: 1:1, 1: 워크그룹)',
        'sid: 상담사/워크그룹 ID (필수)',
        'audio: 음성 활성화 (1=켜짐, 0=꺼짐)',
        'video: 영상 활성화 (1=켜짐, 0=꺼짐)',
        'lang: 언어 (zh-cn, en 등)',
        'visitorUid: 사용자 지정 방문자 ID (선택)',
        'nickname/avatar: 방문자 프로필 (선택)'
      ],
      docLinks: {
        ...en.pages.webrtcDemo.docLinks,
        reactDoc: 'React WebRTC 문서 보기',
        vueDoc: 'Vue WebRTC 문서 보기',
        reactExample: 'React WebRTC 데모 소스'
      }
    },
    documentFeedbackDemo: {
      ...en.pages.documentFeedbackDemo,
      title: '문서 피드백 데모',
      description: '문서 페이지에서 피드백 수집 흐름을 빠르게 검증합니다. 문서 정보, 사용자 컨텍스트, 피드백 내용을 함께 전달할 수 있습니다.',
      subtitle: '독자가 텍스트를 선택하면 자동 스크린샷과 함께 구조화된 피드백을 페이지 이탈 없이 제출할 수 있습니다.',
      setupStepsTitle: '빠른 시작 체크리스트',
      highlightsTitle: '문서 피드백 동작 방식',
      docLinks: {
        ...en.pages.documentFeedbackDemo.docLinks,
        reactDoc: 'React 연동 가이드 보기',
        vueDoc: 'Vue 연동 가이드 보기',
        reactExample: '이 React 데모 소스 보기'
      },
      setupSteps: [
        'SDK를 설치하고 BytedeskConfig 객체를 준비합니다.',
        'feedbackConfig를 통해 문서 피드백 기능을 활성화합니다.',
        '앱 내부에 <BytedeskReact {...config} /> 를 렌더링합니다.',
        '아래 문단의 텍스트를 선택해 플로팅 피드백 툴팁을 확인합니다.'
      ],
      highlights: [
        '텍스트를 선택하면 선택 내용을 포함한 플로팅 "문서 피드백" 버튼이 나타납니다.',
        'SDK가 자동 스크린샷을 캡처해 상담사가 사용자 화면 맥락을 바로 확인할 수 있습니다.',
        '카테고리 칩과 입력 안내 문구로 실행 가능한 피드백을 더 쉽게 수집할 수 있습니다.'
      ],
      controlPanel: {
        ...en.pages.documentFeedbackDemo.controlPanel,
        title: '문제 해결 패널',
        buttons: {
          forceInit: '피드백 강제 초기화',
          manualTrigger: '수동 피드백 트리거',
          testSelection: '텍스트 선택 툴팁 테스트',
          statusCheck: '상태 점검 실행',
          clearLogs: '피드백 로그 지우기',
          inspectState: '런타임 상태 확인'
        },
        statusLabel: '초기화 상태',
        initialized: '준비 완료',
        initializing: 'SDK 대기 중...'
      },
      exampleSection: {
        ...en.pages.documentFeedbackDemo.exampleSection,
        title: '데모 문서',
        paragraphs: [
          'BytedeskWeb은 라이브 채팅, 봇, 문서 피드백을 하나의 가벼운 위젯으로 제공합니다. 사용자는 특정 문장을 선택해 스크린샷과 함께 피드백을 제출하고 페이지 이동 없이 계속 읽을 수 있습니다.',
          '플로팅 툴팁은 라이트/다크 테마를 모두 지원하며, 아이콘/문구/트리거 모드를 커스터마이징할 수 있습니다. 문서 포털, 지식베이스, 긴 형식의 마케팅 페이지에 적합합니다.',
          '각 제출에는 선택 텍스트, 위치 좌표, 카테고리, 선택적 스크린샷이 포함되어 문서/지원 팀이 문제를 더 빠르게 재현하고 해결할 수 있습니다.'
        ],
        tip: '위 문단 아무 곳이나 드래그 선택해서 툴팁 동작을 확인해 보세요.'
      },
      logs: {
        ...en.pages.documentFeedbackDemo.logs,
        title: '피드백 로그',
        empty: '아직 피드백이 없습니다. 본문을 선택하거나 수동 트리거 버튼으로 샘플 데이터를 생성해 보세요.',
        selectedText: '선택 텍스트',
        categories: '카테고리',
        feedback: '피드백'
      },
      feedbackConfigText: {
        ...en.pages.documentFeedbackDemo.feedbackConfigText,
        selectionText: '문서 피드백',
        dialogTitle: '문서 피드백',
        placeholder: '문제점 또는 개선 아이디어를 자세히 작성해 주세요.',
        submitText: '피드백 제출',
        cancelText: '취소',
        successMessage: '감사합니다! 제출하신 피드백을 곧 검토하겠습니다.',
        categoryNames: [
          '오탈자 또는 번역 문제',
          '깨진 링크',
          '문서와 제품 동작 불일치',
          '이해하기 어려움',
          '기타 제안'
        ],
        typesSectionTitle: '문제 유형',
        typesDescription: '(복수 선택 가능)'
      },
      manualTriggerMessage: '워크플로 검증을 위해 수동으로 트리거한 피드백입니다.',
      testSelectionText: '샘플 하이라이트 텍스트',
      tooltipFallbackText: '피드백 툴팁 테스트',
      alerts: {
        ...en.pages.documentFeedbackDemo.alerts,
        missingInstance: 'BytedeskWeb 인스턴스를 찾을 수 없습니다. 먼저 위젯을 초기화해 주세요.',
        showFeedbackMissing: '현재 인스턴스에서 showDocumentFeedback API를 사용할 수 없습니다.',
        retryTimeout: 'BytedeskWeb 초기화 대기 시간이 초과되었습니다. 페이지를 새로고침 후 다시 시도해 주세요.',
        forceInitSuccess: '피드백 기능이 초기화되었습니다. 지금 바로 테스트할 수 있습니다.',
        forceInitFailed: '강제 초기화에 실패했습니다. 콘솔 로그를 확인해 주세요.',
        statusReportTitle: '기능 상태',
        statusReportFooter: '자세한 로그는 브라우저 콘솔에서 확인할 수 있습니다.',
        available: '사용 가능',
        missing: '사용 불가',
        statusLabels: {
          bytedeskInstance: 'BytedeskWeb 인스턴스',
          html2canvas: 'html2canvas 라이브러리',
          feedbackFunction: '문서 피드백 API',
          feedbackEnabled: '피드백 설정 활성화',
          tooltipElement: '툴팁 요소',
          dialogElement: '다이얼로그 요소',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: '툴팁 표시 상태',
          currentSelection: '현재 선택 영역'
        }
      }
    },
    videoSupportDemo: {
      ...en.pages.videoSupportDemo,
      title: '영상 상담 데모',
      description: 'chatConfig의 전용 영상 상담 큐를 사용해 웹 진입점에서 영상 기반 고객 상담을 요청하는 흐름을 시연합니다.',
      bubbleTitle: '영상 상담',
      bubbleSubtitle: '영상 전문 상담사와 연결',
      anonymousUserHint: '익명 테스트 모드: visitorUid, nickname, avatar를 전달하지 않습니다.',
      pathAlert: '이 페이지는 chatPath=/chat 과 영상 상담 sid를 사용합니다. 아이콘 클릭 시 영상 상담 컨텍스트의 일반 채팅 페이지가 열립니다.',
      currentPathLabel: '현재 진입 경로',
      currentPathHint: '경로는 /chat을 유지하며 sid와 t로 비즈니스 시나리오를 구분합니다.',
      usageTitle: '데모 참고',
      usageNotes: [
        '1. chatPath는 /chat을 유지하고 chatConfig.sid를 영상 상담 큐 ID로 설정하세요.',
        '2. 가능한 경우 visitorUid/nickname/avatar를 함께 전달하면 상담사 확인이 더 빠릅니다.',
        '3. showChat() 또는 URL 쿼리 파라미터 방식으로 동일 시나리오를 열 수 있습니다.'
      ],
      buttons: {
        ...en.pages.videoSupportDemo.buttons,
        openVideoSupport: '영상 상담 열기',
        switchAnonymousUser: '익명 사용자로 전환'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      docLinks: {
        ...en.pages.videoSupportDemo.docLinks,
        reactDoc: 'React 연동 문서 보기',
        vueDoc: 'Vue 연동 문서 보기',
        reactExample: 'React 영상 상담 데모 소스'
      }
    },
    videoConferenceDemo: {
      ...en.pages.videoConferenceDemo,
      title: '화상 회의 데모',
      description: '방문자를 전용 회의 sid에 매핑하고 채팅 패널을 진입점으로 여는 회의형 세션 접근 흐름을 시연합니다.',
      bubbleTitle: '화상 회의',
      bubbleSubtitle: '회의 서비스 참여',
      anonymousUserHint: '익명 테스트 모드: visitorUid, nickname, avatar를 전달하지 않습니다.',
      pathAlert: '이 페이지는 chatPath=/chat 을 사용하고 sid를 회의 시나리오로 전환합니다. 회의 전 안내 플로우에 적합합니다.',
      currentPathLabel: '현재 진입 경로',
      currentPathHint: '경로는 /chat을 유지하며 회의 컨텍스트는 chatConfig.sid로 전달됩니다.',
      usageTitle: '데모 참고',
      usageNotes: [
        '1. 회의실 또는 이벤트마다 고유 sid를 매핑하면 트래픽을 명확히 분리할 수 있습니다.',
        '2. 방문자 프로필 필드를 함께 전달하면 호스트 측 신원 확인이 간편해집니다.',
        '3. 이 모드는 본 회의 입장 전 안내 레이어로 활용하기 좋습니다.'
      ],
      buttons: {
        ...en.pages.videoConferenceDemo.buttons,
        openVideoConference: '화상 회의 열기',
        switchAnonymousUser: '익명 사용자로 전환'
      },
      urlGuideTitle: 'URL + 쿼리 사용법',
      sampleUrlLabel: '현재 설정 기반 샘플 URL',
      docLinks: {
        ...en.pages.videoConferenceDemo.docLinks,
        reactDoc: 'React 연동 문서 보기',
        vueDoc: 'Vue 연동 문서 보기',
        reactExample: 'React 화상 회의 데모 소스'
      }
    },
    flightBookingDemo: {
      ...en.pages.flightBookingDemo,
      title: '항공권 예약 데모',
      description: 'AI 기반 대화를 통해 항공권 예약, 취소, 재예약을 한 번에 처리합니다. 사용자는 복잡한 폼 없이 항공편 검색, 좌석 선택, 주문 변경 등을 진행할 수 있습니다.',
      bubbleTitle: '도움이 필요하신가요?',
      bubbleSubtitle: '예약/취소/변경 지원',
      sections: {
        flightStatus: '항공편 상태',
        flightInfo: '항공편 정보',
        bookingInfo: '예약 상세',
        passengerInfo: '탑승객 정보'
      },
      labels: {
        departure: '출발지',
        arrival: '도착지',
        flightDate: '출발 날짜',
        cabinClass: '좌석 등급',
        flightStatus: '항공편 상태',
        ticketPrice: '항공권 요금',
        perPerson: '1인',
        bookingNo: '예약 번호',
        bookingTime: '예약 시각',
        paymentStatus: '결제 상태',
        paymentMethod: '결제 수단',
        passengerCount: '탑승객 수',
        totalAmount: '총 결제 금액',
        person: '명',
        passenger: '탑승객',
        passengerName: '이름',
        idType: '신분증 유형',
        idNumber: '신분증 번호',
        phone: '연락처'
      },
      statusText: {
        scheduled: '출발 예정',
        boarding: '탑승 중',
        departed: '출발 완료',
        arrived: '도착 완료',
        cancelled: '운항 취소'
      },
      paymentStatusText: {
        pending: '결제 대기',
        paid: '결제 완료',
        refunded: '환불 완료'
      },
      buttons: {
        contactSupport: '상담사 연결',
        viewItinerary: '여정 보기',
        changeBooking: '항공편 변경',
        cancelBooking: '예약 취소'
      },
      flight: {
        airlines: {
          airChina: '에어차이나',
          chinaEastern: '중국동방항공',
          chinaSouthern: '중국남방항공'
        },
        cities: {
          beijing: '베이징',
          shanghai: '상하이',
          guangzhou: '광저우',
          shenzhen: '선전'
        },
        airports: {
          pek: '베이징 서우두 국제공항 T3',
          pvg: '상하이 푸둥 국제공항 T2',
          can: '광저우 바이윈 국제공항 T2',
          szx: '선전 바오안 국제공항 T3'
        },
        cabinClasses: {
          economy: '이코노미',
          business: '비즈니스',
          first: '퍼스트 클래스'
        }
      },
      passenger: {
        ...en.pages.flightBookingDemo.passenger,
        idTypes: {
          idCard: '주민등록증',
          passport: '여권',
          other: '기타'
        }
      },
      booking: {
        ...en.pages.flightBookingDemo.booking,
        paymentMethods: {
          alipay: '알리페이',
          wechat: '위챗페이',
          card: '신용카드'
        }
      }
    },
    onlineDemo: {
      ...en.pages.onlineDemo,
      title: '온라인 SDK 데모',
      description: '배포된 npm 패키지를 로드하고 invite/bubble/feedback 기능을 활성화하며 빠른 제어 버튼을 제공합니다.',
      docLinks: {
        ...en.pages.onlineDemo.docLinks,
        reactDoc: 'React 연동 가이드 보기',
        vueDoc: 'Vue 연동 가이드 보기',
        reactExample: 'React 온라인 데모 소스',
        vueExample: 'Vue 온라인 데모 소스'
      },
      docLinksTitle: '문서 링크',
      feedbackSectionTitle: '문서 피드백 체험',
      usageTitle: '사용 방법',
      usageSteps: [
        '아래 문단에서 문장을 하나 선택하세요.',
        '커서 근처에 "문서 피드백" 플로팅 툴팁이 나타납니다.',
        '툴팁을 클릭해 다이얼로그를 열고 선택 텍스트를 확인한 뒤 의견을 제출하세요.'
      ],
      exampleParagraphs: [
        'BytedeskWeb은 라이브 채팅, 봇, 맥락 기반 문서 피드백을 결합해 문서 경험과 지원 경험의 연결을 강화합니다.',
        '텍스트 선택 시 스크린샷이 자동 캡처되어 지원팀이 사용자의 실제 화면 맥락을 즉시 확인할 수 있습니다.',
        '아래 버튼으로 채팅 UI 요소를 토글하거나 문서 피드백을 수동 트리거해 동작을 확인해 보세요.'
      ],
      manualTriggerButton: '문서 피드백 트리거',
      manualTriggerMessage: '온라인 데모에서 수동으로 트리거한 샘플 피드백 페이로드입니다.',
      controlPanelTitle: '제어 패널',
      controlPanelDescription: '일반 SDK 도우미를 호출해 채팅 UI 토글과 테마 동작을 확인합니다.'
    }
  },
  components: {
    ...en.components,
    installGuide: {
      ...en.components.installGuide,
      title: '설치 가이드',
      sections: {
        ...en.components.installGuide.sections,
        installDeps: {
          ...en.components.installGuide.sections.installDeps,
          title: '1. 의존성 설치'
        },
        importComponent: {
          ...en.components.installGuide.sections.importComponent,
          title: '2. 컴포넌트 가져오기'
        },
        config: {
          ...en.components.installGuide.sections.config,
          title: '3. 파라미터 설정',
          minimalTitle: '최소 설정 (필수)',
          minimalNote: 'org, t, sid는 필수입니다. 실제 조직/라우팅 ID로 교체해 주세요.',
          fullTitle: '전체 설정 (선택)'
        },
        usage: {
          ...en.components.installGuide.sections.usage,
          title: '4. 컴포넌트 사용'
        },
        methods: {
          ...en.components.installGuide.sections.methods,
          title: '5. 사용 가능한 메서드',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: '플로팅 런처 버튼 표시' },
            { code: '(window as any).bytedesk?.hideButton()', description: '런처 버튼 숨기기' },
            { code: '(window as any).bytedesk?.showBubble()', description: '버블 메시지 표시' },
            { code: '(window as any).bytedesk?.hideBubble()', description: '버블 메시지 숨기기' },
            { code: '(window as any).bytedesk?.showChat()', description: '채팅 창 열기' },
            { code: '(window as any).bytedesk?.hideChat()', description: '채팅 창 닫기' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: '초대 다이얼로그 표시' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: '초대 다이얼로그 숨기기' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: '문서 피드백 다이얼로그 열기 (신규)' }
          ]
        },
        feedback: {
          ...en.components.installGuide.sections.feedback,
          title: '6. 문서 피드백 개요',
          intro: '문서 피드백은 페이지에서 텍스트를 선택하고 자동 스크린샷과 함께 맥락 기반 요청을 제출할 수 있게 해줍니다.',
          bullets: [
            '텍스트 선택을 자동 감지하여 "문서 피드백" 툴팁을 표시합니다.',
            'html2canvas로 현재 화면을 캡처해 시각적 맥락을 전달합니다.',
            '정확한 선택 텍스트를 함께 기록해 이슈 위치를 빠르게 찾을 수 있습니다.',
            '텍스트 선택 트리거, 수동 버튼, 또는 둘 다 병행하는 모드를 지원합니다.',
            'onSubmit/onCancel 훅으로 피드백 페이로드를 자체 백엔드로 전달할 수 있습니다.'
          ],
          tip: '자동 스크린샷 기능을 위해 html2canvas를 설치하세요:'
        }
      }
    }
  }
};
