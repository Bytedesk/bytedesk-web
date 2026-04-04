export const viVn = {
  common: {
    languageLabel: 'Ngon ngu',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Tieng Trung Gian the',
      'zh-tw': 'Tieng Trung Phon the',
      'ja-jp': 'Tieng Nhat',
      'ko-kr': 'Tieng Han',
      'vi-vn': 'Tieng Viet',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Tieng Tay Ban Nha',
      'fr-fr': 'Tieng Phap'
    },
    themeLabel: 'Che do giao dien',
    themeOptions: {
      light: 'Sang',
      dark: 'Toi',
      system: 'Theo he thong'
    },
    officialSiteLabel: 'Trang chinh thuc Bytedesk',
    resetAnonymousVisitorLabel: 'Dat lai khach an danh',
    resetAnonymousVisitorSuccess: 'Da dat lai khach an danh',
    docLinks: {
      react: 'Xem tai lieu tich hop React',
      vue: 'Xem tai lieu tich hop Vue',
      reactExample: 'Vi du ma React co ban',
      vueExample: 'Vi du ma Vue co ban',
      userInfo: 'Xem tai lieu tich hop thong tin nguoi dung',
      goodsInfo: 'Xem tai lieu tich hop thong tin san pham',
      orderInfo: 'Xem tai lieu tich hop thong tin don hang',
      vipLevel: 'Xem tai lieu ca nhan hoa',
      unreadCount: 'Vi du React dem tin chua doc',
      documentFeedback: 'Huong dan phan hoi tai lieu'
    },
    buttons: {
      openChat: 'Mo tro chuyen',
      openChatWithParams: 'Mo tro chuyen kem tham so',
      closeChat: 'Dong tro chuyen',
      showButton: 'Hien nut',
      hideButton: 'An nut',
      showBubble: 'Hien bong thong bao',
      hideBubble: 'An bong thong bao',
      showInvite: 'Hien loi moi',
      hideInvite: 'An loi moi',
      togglePlacement: 'Doi vi tri',
      toggleThemeColor: 'Doi mau chu de',
      reset: 'Dat lai',
      copy: 'Sao chep',
      submit: 'Gui',
      cancel: 'Huy',
      openInNewWindow: 'Mo trong cua so popup',
      openInNewTab: 'Mo trong tab moi'
    },
    apiHintPrefix: 'Loi goi API:'
  },
  nav: {
    more: 'Them',
    basicDemo: '⚙️ Cai dat co ban',
    userInfoDemo: '👤 Thong tin nguoi dung',
    goodsInfoDemo: '🛒 Thong tin san pham',
    orderInfoDemo: '📦 Thong tin don hang',
    vipLevelDemo: '👑 Ca nhan hoa',
    unreadCountDemo: '🔔 Tin chua doc',
    threadHistoryDemo: '🧵 Lich su hoi thoai',
    videoSupportDemo: '🎥 Ho tro video',
    webrtcDemo: '📹 Demo WebRTC',
    callCenterDemo: '📞 Tong dai',
    videoConferenceDemo: '🎬 Hoi nghi video',
    documentFeedbackDemo: '📝 Phan hoi tai lieu',
    flightBookingDemo: '✈️ Dat ve may bay'
  },
  pages: {
    basicDemo: {
      title: 'Cai dat co ban Bytedesk',
      intro: 'Su dung cac thao tac nhanh ben duoi de trai nghiem nhung tinh nang pho bien cua Bytedesk Web SDK.',
      themeButtonLabel: 'Doi mau dieu huong',
      bubbleTitle: 'Ban can ho tro?',
      bubbleSubtitle: 'Nhan de bat dau tro chuyen',
      placement: {
        bottomLeft: 'Goc duoi ben trai',
        bottomRight: 'Goc duoi ben phai'
      },
      loadHistoryLabel: 'Tai lich su',
      loadHistoryEnabled: 'BAT',
      loadHistoryDisabled: 'TAT',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: 'Mac dinh',
      currentConfigTitle: 'Cau hinh hien tai',
      copyConfig: 'Sao chep JSON cau hinh'
    },
    userInfoDemo: {
      title: 'Demo tich hop thong tin nguoi dung',
      description: 'Truyen visitorUid, nickname, avatar va cac truong khac qua config de nhan vien ho tro nhan dien nguoi dung ngay lap tuc. Su dung cac nut ben duoi de chuyen giua cac tai khoan mau.',
      switchUser: 'Chuyen nguoi dung',
      switchToUserLabel: 'Chuyen sang {{name}}',
      switchAnonymousUserLabel: 'Chuyen sang nguoi dung an danh',
      anonymousUserLabel: 'Nguoi dung an danh',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname, avatar va cac truong nguoi dung khac.',
      currentUserTitle: 'Nguoi dung hien tai',
      currentUserIdLabel: 'ID nguoi dung',
      currentUserNicknameLabel: 'Biet danh',
      contactSupport: 'Lien he ho tro',
      inviteText: 'Xin chao, chung toi co the giup gi cho ban?',
      docLinks: {
        userInfoDoc: 'Xem tai lieu tich hop thong tin nguoi dung',
        reactExample: 'Vi du React thong tin nguoi dung',
        vueExample: 'Vi du Vue thong tin nguoi dung'
      },
      controlPanel: {
        title: 'Bang dieu khien Bytedesk',
        chatWindow: 'Dieu khien cua so tro chuyen',
        button: 'Dieu khien nut',
        bubble: 'Dieu khien bong thong bao',
        invite: 'Dieu khien hop loi moi'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      urlTemplateLabel: 'Mau URL chung',
      urlParamsTitle: 'Tham chieu tham so (cho /chat)',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec, 2: bot)',
        'sid: ID dich den (nhom/bot/nhan vien)',
        'visitorUid: ID khach tuy chinh (khuyen nghi)',
        'nickname/avatar: ho so khach (tuy chon)',
        'mobile/email/note: thong tin bo sung cua khach (tuy chon)',
        'extra: truong mo rong tuy chinh, truyen chuoi JSON (tuy chon)',
        'lang/mode: ngon ngu va che do giao dien (tuy chon)'
      ],
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      apiHintPrefix: 'Loi goi API:',
      users: {
        user1: 'Khach Tieu Minh',
        user2: 'Khach Tieu Hong',
        user3: 'Khach Tieu Ly'
      }
    },
    goodsInfoDemo: {
      title: 'Demo tich hop thong tin san pham',
      description: 'Gan metadata san pham (uid, title, image, description, price, url, tags) vao phien tro chuyen de nhan vien co du boi canh ma khong can roi khoi man hinh.',
      docLinks: {
        goodsDoc: 'Xem huong dan thong tin san pham',
        reactExample: 'Vi du React thong tin san pham',
        vueExample: 'Vi du Vue thong tin san pham'
      },
      infoCardTitle: 'Chi tiet san pham',
      tagsLabel: 'The',
      descriptionLabel: 'Mo ta',
      priceLabel: 'Gia',
      contactSupport: 'Lien he ho tro',
      product: {
        title: 'BYD Yangwang U7 xe dien cao cap',
        description: 'Yangwang U7 su dung nen tang pin blade moi nhat cua BYD, tam hoat dong toi da 1.000 km, ho tro lai xe L3 va noi that da cao cap kem cua so toan canh.',
        tags: ['Nang luong moi', 'Sedan cao cap', 'Lai xe thong minh', 'Tam xa']
      },
      controlPanel: {
        title: 'Bang dieu khien Bytedesk',
        chatWindow: 'Dieu khien cua so tro chuyen'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      urlTemplateLabel: 'Mau URL chung',
      urlParamsTitle: 'Tham chieu tham so (cho /chat)',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec, 2: bot)',
        'sid: ID dich den (nhom/bot/nhan vien)',
        'visitorUid: ID khach tuy chinh (tuy chon)',
        'nickname/avatar: ho so khach (tuy chon)',
        'goodsInfo: payload san pham dang chuoi JSON (khuyen nghi)',
        'extra: payload mo rong dang chuoi JSON (tuy chon)',
        'lang/mode: ngon ngu va che do giao dien (tuy chon)'
      ],
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      payloadGuideTitle: 'Cach tao va chuyen goodsInfo',
      payloadObjectLabel: 'Buoc 1: doi tuong nghiep vu',
      payloadJsonLabel: 'Buoc 2: chuoi JSON (JSON.stringify)',
      payloadEncodedLabel: 'Buoc 3: gia tri da ma hoa URL (encodeURIComponent)',
      payloadNotesTitle: 'Luu y',
      payloadNotes: [
        'Hay tao goodsInfo duoi dang object truoc, sau do dung JSON.stringify truoc khi truyen vao chatConfig.',
        'Neu tich hop truc tiep bang URL, hay truyen goodsInfo da ma hoa; URLSearchParams trong luong SDK se tu dong ma hoa.',
        'goodsInfo.extra thuong la chuoi JSON cho cac truong bo sung nhu SKU va ton kho.',
        'Khi payload qua lon, hay giu cac truong quan trong (uid/title/image/price) de tranh URL qua dai.'
      ]
    },
    orderInfoDemo: {
      title: 'Demo tich hop thong tin don hang',
      description: 'Nhung thong tin don hang vao moi cuoc hoi thoai de tang toc ho tro sau ban hang va xu ly su co.',
      docLinks: {
        orderDoc: 'Xem huong dan thong tin don hang',
        reactExample: 'Vi du React thong tin don hang',
        vueExample: 'Vi du Vue thong tin don hang'
      },
      sections: {
        statusTimeline: 'Trang thai don hang',
        orderInfo: 'Chi tiet don hang',
        goodsInfo: 'Tong quan san pham',
        shippingInfo: 'Thong tin giao hang'
      },
      labels: {
        orderId: 'Ma don hang',
        orderTime: 'Tao luc',
        orderStatus: 'Trang thai',
        paymentMethod: 'Phuong thuc thanh toan',
        totalAmount: 'Tong tien',
        unitPrice: 'Don gia',
        quantity: 'So luong',
        receiver: 'Nguoi nhan',
        phone: 'Dien thoai',
        address: 'Dia chi'
      },
      statusText: {
        pending: 'Cho thanh toan',
        paid: 'Da thanh toan',
        shipped: 'Da gui hang',
        delivered: 'Da giao',
        cancelled: 'Da huy'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      urlTemplateLabel: 'Mau URL chung',
      urlParamsTitle: 'Tham chieu tham so (cho /chat)',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec, 2: bot)',
        'sid: ID dich den (nhom/bot/nhan vien)',
        'visitorUid: ID khach tuy chinh (tuy chon)',
        'nickname/avatar: ho so khach (tuy chon)',
        'orderInfo: payload don hang dang chuoi JSON (khuyen nghi)',
        'extra: payload mo rong dang chuoi JSON (tuy chon)',
        'lang/mode: ngon ngu va che do giao dien (tuy chon)'
      ],
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      payloadGuideTitle: 'Cach tao va chuyen orderInfo',
      payloadObjectLabel: 'Buoc 1: doi tuong nghiep vu',
      payloadJsonLabel: 'Buoc 2: chuoi JSON (JSON.stringify)',
      payloadEncodedLabel: 'Buoc 3: gia tri da ma hoa URL (encodeURIComponent)',
      payloadNotesTitle: 'Luu y',
      payloadNotes: [
        'Hay tao doi tuong don hang day du truoc, sau do dung JSON.stringify truoc khi truyen vao chatConfig.',
        'Neu tich hop truc tiep bang URL, hay truyen orderInfo da ma hoa; URLSearchParams trong luong SDK se tu dong ma hoa.',
        'Hay giu nhung truong quan trong trong orderInfo.goods va orderInfo.shippingAddress de nhan vien nam boi canh nhanh hon.',
        'Dung gia tri enum on dinh cho status (vi du paid/shipped), va su dung statusText cho van ban hien thi.'
      ]
    },
    vipLevelDemo: {
      title: 'Demo ca nhan hoa',
      description: 'Cung cap vipLevel va cac truong tuy chinh khac de hien thi ho so khach hang phong phu hon va mang lai trai nghiem ho tro ca nhan hoa.',
      docLinks: {
        vipDoc: 'Xem huong dan ca nhan hoa',
        reactExample: 'Nguon demo VIP React',
        vueExample: 'Nguon demo VIP Vue'
      },
      vipLabel: 'Cap VIP',
      normalLabel: 'Nguoi dung tieu chuan',
      vipPrefix: 'VIP',
      switchButtonLabel: 'Chuyen sang {{name}}',
      users: {
        user1: 'Ho so tieu chuan',
        user2: 'Ho so VIP 1',
        user3: 'Ho so VIP 2'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      urlTemplateLabel: 'Mau URL chung',
      urlParamsTitle: 'Tham chieu tham so',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec, 2: bot)',
        'sid: ID dich den (nhom/bot/nhan vien)',
        'visitorUid: ID khach tuy chinh (khuyen nghi)',
        'nickname/avatar: ho so khach (tuy chon)',
        'vipLevel: cap VIP cua khach (nen dung so nguyen 0-10)',
        'extra: chuoi JSON cho cac truong tuy chinh (tuy chon)',
        'lang/mode: ngon ngu va che do giao dien (tuy chon)'
      ],
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      payloadGuideTitle: 'Cach tao va chuyen vipLevel',
      payloadObjectLabel: 'Buoc 1: doi tuong nghiep vu',
      payloadJsonLabel: 'Buoc 2: chuoi JSON (JSON.stringify)',
      payloadEncodedLabel: 'Buoc 3: gia tri da ma hoa URL (encodeURIComponent)',
      payloadNotesTitle: 'Luu y',
      payloadNotes: [
        'Su dung cap so nguyen on dinh cho vipLevel (nhu 0-10) de phu hop voi chien luoc phan tang.',
        'Hay tao extra duoi dang object truoc, sau do dung JSON.stringify truoc khi truyen vao chatConfig.',
        'Neu tich hop truc tiep bang URL, hay truyen extra da ma hoa; URLSearchParams trong luong SDK se tu dong ma hoa.',
        'Khi muc VIP thay doi, hay khoi tao lai widget hoac lam moi tham so phien de ap dung ho so moi.'
      ]
    },
    unreadCountDemo: {
      title: 'Demo dem tin chua doc',
      description: 'Goi getUnreadMessageCount va clearUnreadMessages de dong bo voi trang thai nguoi dung hien tai.',
      currentCount: 'So tin chua doc hien tai',
      docLinks: {
        unreadDoc: 'Xem huong dan tich hop dem tin chua doc',
        reactExample: 'Vi du React dem tin chua doc',
        vueExample: 'Vi du Vue dem tin chua doc'
      },
      buttons: {
        markAllRead: 'Danh dau da doc tat ca',
        refresh: 'Lam moi so tin chua doc'
      },
      usageNotesTitle: 'Meo',
      usageNotes: [
        'Su dung getUnreadMessageCount() bat cu khi nao ban can tong moi nhat.',
        'Goi clearUnreadMessages() sau khi khach da doc tin nhan.'
      ],
      urlGuideTitle: 'Cach dung URL API + tham so',
      countApiLabel: 'Endpoint dem tin chua doc (GET)',
      clearApiLabel: 'Endpoint xoa tin chua doc (POST)',
      urlParamsTitle: 'Tham so dung chung (giong noi bo SDK)',
      urlParams: [
        'uid: UID khach he thong (tu BYTEDESK_UID local)',
        'visitorUid: UID khach tuy chinh tu frontend (tuy chon, khuyen nghi)',
        'orgUid: ID to chuc (tu chatConfig.org)',
        'client: loai client (SDK tu dong them WEB_FLOAT)'
      ],
      sampleUrlLabel: 'URL mau cho yeu cau dem tin chua doc',
      sampleBodyLabel: 'POST body mau de xoa tin chua doc',
      apiNotesTitle: 'Ghi chu trien khai',
      apiNotes: [
        'getUnreadMessageCount() anh xa toi GET /visitor/api/v1/message/unread/count.',
        'clearUnreadMessages() anh xa toi POST /visitor/api/v1/message/unread/clear.',
        'SDK doc BYTEDESK_UID tu localStorage va ket hop voi chatConfig.visitorUid/chatConfig.org.',
        'Khi uid rong, getUnreadMessageCount() se tra ve 0 truc tiep ma khong gui request.'
      ]
    },
    threadHistoryDemo: {
      title: 'Demo lich su hoi thoai cua khach',
      description: 'Duoc xay dung tren trang ThreadList cua khach, demo nay mo /chat/thread tu icon SDK de tai lich su hoi thoai.',
      bubbleTitle: 'Lich su hoi thoai',
      bubbleSubtitle: 'Nhan de mo danh sach lich su',
      anonymousUserLabel: 'Nguoi dung an danh',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname va avatar.',
      pathAlert: 'Trang nay bat chatPath=/chat/thread. Nhan vao icon se mo lich su hoi thoai thay vi /chat.',
      currentPathLabel: 'Duong dan hien tai',
      currentPathHint: 'Tat ca tham so khac giong /chat',
      usageTitle: 'Ghi chu demo',
      usageNotes: [
        '1. Dat chatPath thanh /chat/thread de ca click icon va showChat() deu vao lich su hoi thoai.',
        '2. /chat/thread chap nhan cung tham so nhu /chat, nhu org, t, sid, visitorUid, nickname, avatar.',
        '3. Ban co the tich hop truc tiep bang URL + query ma khong can them loi goi SDK.'
      ],
      buttons: {
        openHistoryPage: 'Mo trang lich su hoi thoai',
        switchAnonymousUser: 'Chuyen sang nguoi dung an danh'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      urlTemplateLabel: 'Mau URL chung',
      urlParamsTitle: 'Tham chieu tham so (giong /chat)',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec, 2: bot)',
        'sid: ID dich den (nhom/bot/nhan vien)',
        'visitorUid: ID khach tuy chinh (khuyen nghi)',
        'nickname/avatar: ho so khach (tuy chon)',
        'lang/mode: ngon ngu va che do giao dien (tuy chon)'
      ],
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      docLinks: {
        threadDoc: 'Xem huong dan tich hop lich su hoi thoai',
        visitorRef: 'Tham chieu Visitor ThreadList',
        reactExample: 'Nguon demo lich su hoi thoai React'
      }
    },
    videoSupportDemo: {
      title: 'Demo ho tro video',
      description: 'Su dung hang doi ho tro video rieng trong chatConfig de khach co the yeu cau tu van video tu diem vao web.',
      bubbleTitle: 'Ho tro video',
      bubbleSubtitle: 'Ket noi voi chuyen gia video',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname va avatar.',
      pathAlert: 'Trang nay dung chatPath=/chat va sid ho tro video. Nhan vao icon se mo trang chat thong thuong trong boi canh ho tro video.',
      currentPathLabel: 'Duong dan hien tai',
      currentPathHint: 'Route van la /chat; kich ban nghiep vu duoc xac dinh boi sid va t.',
      usageTitle: 'Ghi chu demo',
      usageNotes: [
        '1. Giu chatPath la /chat va dat chatConfig.sid thanh ID hang doi ho tro video cua ban.',
        '2. Truyen danh tinh khach (visitorUid/nickname/avatar) bat cu khi nao co the de nhan vien xac minh nhanh hon.',
        '3. Ban co the mo kich ban nay bang showChat() hoac tham so query URL truc tiep.'
      ],
      buttons: {
        openVideoSupport: 'Mo ho tro video',
        switchAnonymousUser: 'Chuyen sang nguoi dung an danh'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      docLinks: {
        reactDoc: 'Xem tai lieu tich hop React',
        vueDoc: 'Xem tai lieu tich hop Vue',
        reactExample: 'Nguon demo ho tro video React'
      }
    },
    callCenterDemo: {
      title: 'Demo tong dai',
      description: 'Mo phong cach dinh tuyen nguoi dung vao workgroup tong dai bang cach chuyen sid trong khi van giu duong dan trang chat tieu chuan.',
      bubbleTitle: 'Tong dai',
      bubbleSubtitle: 'San sang xep hang va chuyen tuyen',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname va avatar.',
      pathAlert: 'Trang nay giu chatPath=/chat va nham toi sid tong dai de mo phong truy cap hang doi tu web.',
      currentPathLabel: 'Duong dan hien tai',
      currentPathHint: 'Route van la /chat; hang doi duoc xac dinh boi chatConfig.sid.',
      usageTitle: 'Ghi chu demo',
      usageNotes: [
        '1. Cau hinh sid thanh ID workgroup tong dai de moi phien deu vao cung mot hang doi.',
        '2. Su dung cac visitorUid khac nhau de mo phong nhieu nguoi dang xep hang cung luc.',
        '3. Trong moi truong that, nen gan sid theo tung nghiep vu (ban hang, ho tro, sau ban) de dinh tuyen tot hon.'
      ],
      buttons: {
        openCallCenter: 'Mo tong dai',
        switchAnonymousUser: 'Chuyen sang nguoi dung an danh'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      docLinks: {
        reactDoc: 'Xem tai lieu tich hop React',
        vueDoc: 'Xem tai lieu tich hop Vue',
        reactExample: 'Nguon demo tong dai React'
      },
      runtime: {
        title: 'Bang runtime (lay cam hung tu SIP.js)',
        description: 'Mo phong cac trang thai ket noi, xep hang, gan nhan vien va hoan tat de xac thuc nhanh luong vao tong dai.',
        statusLabels: {
          sdkReady: 'Trang thai SDK',
          queueState: 'Trang thai hang doi',
          activeSessionCount: 'So phien dang hoat dong',
          lastActionAt: 'Lan thao tac cuoi'
        },
        statusValues: {
          ready: 'San sang',
          notReady: 'Chua san sang'
        },
        queueState: {
          idle: 'Ranh',
          queueing: 'Dang xep hang',
          serving: 'Dang phuc vu'
        },
        buttons: {
          openQueue: 'Mo diem vao hang doi',
          simulateAssign: 'Mo phong gan nhan vien',
          completeSession: 'Hoan tat phien hien tai',
          clearLogs: 'Xoa nhat ky'
        },
        logTitle: 'Nhat ky hoat dong',
        emptyLogs: 'Chua co hoat dong. Hay thu cac thao tac nhanh ben tren.',
        logTemplates: {
          switchedAnonymous: 'Da chuyen sang che do an danh.',
          switchedUser: 'Da chuyen khach: {{name}}.',
          openQueue: 'Da mo diem vao tong dai va chuyen sang trang thai xep hang.',
          closeQueue: 'Da dong bang tro chuyen.',
          assignSession: 'Da mo phong gan nhan vien. Phien hien dang duoc phuc vu.',
          completeSession: 'Da hoan tat phuc vu va dong phien.'
        }
      }
    },
    webrtcDemo: {
      title: 'Demo nhan vien audio / video',
      description: 'Su dung nut bong noi o goc duoi ben phai de trai nghiem dich vu CSKH audio hoac video thoi gian thuc qua WebRTC. Che do cuoc goi va thong tin khach duoc truyen bang tham so URL toi trang /webrtc.',
      modeLimitNotice: 'Hien tai khong ho tro che do robot. Chi ho tro nhan vien nguoi that cho audio va video.',
      pathAlert: 'Nut noi mac dinh vao che do audio (audio=1&video=0). Dung cac nut ben duoi de chuyen sang che do video.',
      currentPathLabel: 'Duong dan vao',
      currentPathHint: 'Route luon la /webrtc; loai cuoc goi duoc dieu khien boi tham so audio / video.',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname va avatar.',
      callMode: 'Che do cuoc goi hien tai',
      callModeAudio: '🎙️ Nhan vien audio (audio=1, video=0)',
      callModeVideo: '📹 Nhan vien video (audio=1, video=1)',
      bubbleTitleAudio: 'Nhan vien audio',
      bubbleTitleVideo: 'Nhan vien video',
      bubbleSubtitleAudio: 'Nhan de bat dau goi audio',
      bubbleSubtitleVideo: 'Nhan de bat dau goi video',
      docLinks: {
        reactDoc: 'Xem tai lieu React WebRTC',
        vueDoc: 'Xem tai lieu Vue WebRTC',
        reactExample: 'Nguon demo WebRTC React'
      },
      usageTitle: 'Ghi chu demo',
      usageNotes: [
        '1. Nut / bong noi o goc duoi ben phai la diem vao WebRTC. Khi nhan se mo /webrtc trong cua so nhung.',
        '2. Nhan vien audio (audio=1&video=0): chi can micro va loa, khong can camera.',
        '3. Nhan vien video (audio=1&video=1): bat ca camera va micro.',
        '4. Trong moi truong production mac dinh dung URL CDN https://cdn.weiyuai.cn/webrtc; local tro toi http://127.0.0.1:9018/webrtc.',
        '5. org, t va sid dung cung gia tri voi tich hop chat, khong can thiet lap them.'
      ],
      buttons: {
        audioMode: '🎙️ Chuyen sang nhan vien audio',
        videoMode: '📹 Chuyen sang nhan vien video',
        switchAnonymousUser: 'Chuyen sang nguoi dung an danh'
      },
      urlGuideTitle: 'Tham chieu URL + tham so',
      sampleUrlLabel: 'URL mau cho cau hinh hien tai',
      urlParamsTitle: 'Tham chieu tham so',
      urlParams: [
        'org: ID to chuc (bat buoc)',
        't: loai phien (0: 1-1, 1: nhom lam viec)',
        'sid: ID nhan vien / workgroup (bat buoc)',
        'audio: bat audio (1 = bat, 0 = tat)',
        'video: bat video (1 = bat, 0 = tat)',
        'lang: ngon ngu (zh-cn, en, vi-vn, v.v.)',
        'visitorUid: ID khach tuy chinh (tuy chon)',
        'nickname / avatar: ho so khach (tuy chon)'
      ]
    },
    videoConferenceDemo: {
      title: 'Demo hoi nghi video',
      description: 'Mo phong cach truy cap phien kieu hoi nghi bang cach gan khach vao mot sid phong hop rieng va mo chat nhu bang vao.',
      bubbleTitle: 'Hoi nghi video',
      bubbleSubtitle: 'Tham gia dich vu hop',
      anonymousUserHint: 'Che do kiem thu an danh: bo qua visitorUid, nickname va avatar.',
      pathAlert: 'Trang nay dung chatPath=/chat va doi sid sang kich ban phong hop, phu hop cho luong huong dan truoc cuoc hop.',
      currentPathLabel: 'Duong dan hien tai',
      currentPathHint: 'Route van la /chat; boi canh hoi nghi duoc cung cap qua chatConfig.sid.',
      usageTitle: 'Ghi chu demo',
      usageNotes: [
        '1. Gan moi phong hop hoac su kien voi mot sid rieng de tach luong truy cap ro rang.',
        '2. Bo sung thong tin ho so khach de don gian hoa viec xac minh danh tinh phia host.',
        '3. Su dung che do nay nhu mot lop vao truoc khi nguoi dung chuyen sang phong video goc cua ban.'
      ],
      buttons: {
        openVideoConference: 'Mo hoi nghi video',
        switchAnonymousUser: 'Chuyen sang nguoi dung an danh'
      },
      urlGuideTitle: 'Cach dung URL + Query',
      sampleUrlLabel: 'URL mau tao tu cau hinh hien tai',
      docLinks: {
        reactDoc: 'Xem tai lieu tich hop React',
        vueDoc: 'Xem tai lieu tich hop Vue',
        reactExample: 'Nguon demo hoi nghi video React'
      }
    },
    documentFeedbackDemo: {
      title: 'Demo phan hoi tai lieu',
      subtitle: 'Cho phep nguoi doc boi den van ban, tu dong chup man hinh va gui phan hoi co cau truc ma khong can roi trang.',
      docLinks: {
        reactDoc: 'Xem huong dan tich hop React',
        vueDoc: 'Xem huong dan tich hop Vue',
        reactExample: 'Xem ma nguon demo React nay'
      },
      setupStepsTitle: 'Danh sach bat dau nhanh',
      setupSteps: [
        'Cai SDK va chuan bi mot doi tuong BytedeskConfig.',
        'Bat tinh nang phan hoi tai lieu qua feedbackConfig.',
        'Render <BytedeskReact {...config} /> trong ung dung cua ban.',
        'Boi den bat ky doan van nao ben duoi de mo tooltip phan hoi noi.'
      ],
      highlightsTitle: 'Cach phan hoi tai lieu hoat dong',
      highlights: [
        'Boi den van ban de hien nut noi “Document feedback” kem noi dung da chon.',
        'SDK tu dong chup man hinh de nhan vien thay duoc dung boi canh nguoi dung da thay.',
        'Chip phan loai va placeholder thong minh giup nguoi dung cung cap thong tin hanh dong duoc.'
      ],
      controlPanel: {
        title: 'Bang xu ly su co',
        buttons: {
          forceInit: 'Bat buoc khoi tao phan hoi',
          manualTrigger: 'Kich hoat phan hoi thu cong',
          testSelection: 'Thu tooltip khi boi den',
          statusCheck: 'Kiem tra trang thai',
          clearLogs: 'Xoa nhat ky phan hoi',
          inspectState: 'Kiem tra trang thai runtime'
        },
        statusLabel: 'Trang thai khoi tao',
        initialized: 'San sang',
        initializing: 'Dang cho SDK...'
      },
      exampleSection: {
        title: 'Bai viet demo',
        paragraphs: [
          'BytedeskWeb cung cap live chat, bot va phan hoi tai lieu trong mot widget nhe. Nguoi dung co the boi den chinh xac tung cau, gui anh chup man hinh va tiep tuc doc ma khong can tai lai trang.',
          'Tooltip noi ho tro chu de sang/toi va cho phep tuy chinh icon, noi dung va kieu kich hoat. Rat phu hop cho cong thong tin tai lieu, kho kien thuc va cac trang marketing dai.',
          'Moi lan gui deu kem van ban da chon, toa do, danh muc va anh chup man hinh tuy chon de doi ho tro va tai lieu xu ly nhanh hon.'
        ],
        tip: 'Hay thu boi den bat ky doan nao ben tren de xem tooltip trong hanh dong.'
      },
      logs: {
        title: 'Nhat ky phan hoi',
        empty: 'Chua co phan hoi nao. Hay boi den noi dung hoac dung nut kich hoat thu cong de tao du lieu mau.',
        selectedText: 'Van ban da chon',
        categories: 'Danh muc',
        feedback: 'Noi dung phan hoi'
      },
      feedbackConfigText: {
        selectionText: 'Phan hoi tai lieu',
        dialogTitle: 'Phan hoi tai lieu',
        placeholder: 'Mo ta chi tiet van de hoac y tuong cai thien.',
        submitText: 'Gui phan hoi',
        cancelText: 'Huy',
        successMessage: 'Cam on! Chung toi se xem xet phan hoi cua ban som.',
        categoryNames: [
          'Loi chinh ta hoac dich thuat',
          'Lien ket hong',
          'Tai lieu khong khop san pham',
          'Kho hieu',
          'De xuat khac'
        ],
        typesSectionTitle: 'Loai van de',
        typesDescription: '(chon nhieu)'
      },
      manualTriggerMessage: 'Phan hoi nay duoc kich hoat thu cong de xac minh luong xu ly.',
      testSelectionText: 'Van ban boi den mau',
      tooltipFallbackText: 'Tooltip phan hoi thu nghiem',
      alerts: {
        missingInstance: 'Khong tim thay the hien BytedeskWeb. Vui long khoi tao widget truoc.',
        showFeedbackMissing: 'showDocumentFeedback khong kha dung tren the hien hien tai.',
        retryTimeout: 'Het thoi gian cho BytedeskWeb khoi tao. Hay tai lai trang va thu lai.',
        forceInitSuccess: 'Da khoi tao tinh nang phan hoi. Ban co the bat dau kiem thu ngay bay gio.',
        forceInitFailed: 'Khoi tao bat buoc that bai. Hay kiem tra console de xem chi tiet.',
        statusReportTitle: 'Trang thai tinh nang',
        statusReportFooter: 'Mo console trinh duyet de xem log chi tiet.',
        available: 'Co san',
        missing: 'Thieu',
        statusLabels: {
          bytedeskInstance: 'The hien BytedeskWeb',
          html2canvas: 'Thu vien html2canvas',
          feedbackFunction: 'API phan hoi tai lieu',
          feedbackEnabled: 'Da bat feedbackConfig',
          tooltipElement: 'Phan tu tooltip',
          dialogElement: 'Phan tu dialog',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: 'Do hien tooltip',
          currentSelection: 'Lua chon hien tai'
        }
      }
    },
    flightBookingDemo: {
      title: 'Demo dat ve may bay',
      description: 'Hoan tat dat ve, huy ve va doi lich qua hoi thoai AI. Nguoi dung co the tim chuyen bay, chon ghe, sua don va nhieu hon nua ma khong can dien form phuc tap.',
      bubbleTitle: 'Ban can ho tro?',
      bubbleSubtitle: 'Dat/Huy/Doi chuyen bay',
      sections: {
        flightStatus: 'Trang thai chuyen bay',
        flightInfo: 'Thong tin chuyen bay',
        bookingInfo: 'Chi tiet dat cho',
        passengerInfo: 'Thong tin hanh khach'
      },
      labels: {
        departure: 'Khoi hanh',
        arrival: 'Den noi',
        flightDate: 'Ngay bay',
        cabinClass: 'Hang ghe',
        flightStatus: 'Trang thai chuyen bay',
        ticketPrice: 'Gia ve',
        perPerson: 'nguoi',
        bookingNo: 'Ma dat cho',
        bookingTime: 'Thoi gian dat',
        paymentStatus: 'Trang thai thanh toan',
        paymentMethod: 'Phuong thuc thanh toan',
        passengerCount: 'So hanh khach',
        totalAmount: 'Tong tien',
        person: 'nguoi',
        passenger: 'Hanh khach',
        passengerName: 'Ten',
        idType: 'Loai giay to',
        idNumber: 'So giay to',
        phone: 'Dien thoai'
      },
      statusText: {
        scheduled: 'Da len lich',
        boarding: 'Dang len may bay',
        departed: 'Da cat canh',
        arrived: 'Da ha canh',
        cancelled: 'Da huy'
      },
      paymentStatusText: {
        pending: 'Cho xu ly',
        paid: 'Da thanh toan',
        refunded: 'Da hoan tien'
      },
      buttons: {
        contactSupport: 'Lien he ho tro',
        viewItinerary: 'Xem lich trinh',
        changeBooking: 'Doi chuyen bay',
        cancelBooking: 'Huy dat cho'
      },
      flight: {
        airlines: {
          airChina: 'Air China',
          chinaEastern: 'China Eastern',
          chinaSouthern: 'China Southern'
        },
        cities: {
          beijing: 'Bac Kinh',
          shanghai: 'Thuong Hai',
          guangzhou: 'Quang Chau',
          shenzhen: 'Tham Quyen'
        },
        airports: {
          pek: 'San bay Quoc te Thu do T3',
          pvg: 'San bay Quoc te Pho Dong T2',
          can: 'San bay Quoc te Bach Van T2',
          szx: 'San bay Quoc te Bao An T3'
        },
        cabinClasses: {
          economy: 'Pho thong',
          business: 'Thuong gia',
          first: 'Hang nhat'
        }
      },
      passenger: {
        samplePassenger1: 'John Smith',
        samplePassenger2: 'Jane Doe',
        idTypes: {
          idCard: 'CCCD/CMND',
          passport: 'Ho chieu',
          other: 'Khac'
        }
      },
      booking: {
        paymentMethods: {
          alipay: 'Alipay',
          wechat: 'WeChat Pay',
          card: 'The tin dung'
        }
      }
    },
    onlineDemo: {
      title: 'Demo SDK online',
      description: 'Mau nay tai goi npm da phat hanh, bat cac tinh nang invite/bubble/feedback va cung cap cac nut dieu khien nhanh.',
      docLinks: {
        reactDoc: 'Xem huong dan tich hop React',
        vueDoc: 'Xem huong dan tich hop Vue',
        reactExample: 'Nguon demo online React',
        vueExample: 'Nguon demo online Vue'
      },
      docLinksTitle: 'Lien ket tai lieu',
      feedbackSectionTitle: 'Huong dan phan hoi tai lieu',
      usageTitle: 'Cach thu',
      usageSteps: [
        'Boi den bat ky cau nao ben duoi.',
        'Mot tooltip noi co nhan “Document feedback” se xuat hien gan con tro.',
        'Nhan vao tooltip de mo hop thoai, xem van ban da chon va gui ghi chu.'
      ],
      exampleParagraphs: [
        'BytedeskWeb ket hop live chat, bot va phan hoi tai lieu theo ngu canh de dong vong giua tai lieu va doi ho tro.',
        'Lua chon se tu dong chup man hinh de doi ho tro thay duoc dung boi canh.',
        'Su dung cac nut ben duoi de bat/tat cac thanh phan UI hoac kich hoat phan hoi tai lieu thu cong.'
      ],
      manualTriggerButton: 'Kich hoat phan hoi tai lieu',
      manualTriggerMessage: 'Payload phan hoi mau duoc kich hoat tu demo online.',
      controlPanelTitle: 'Bang dieu khien',
      controlPanelDescription: 'Goi cac ham pho bien cua SDK de bat/tat thanh phan UI tro chuyen va kiem tra hanh vi chu de.'
    }
  },
  components: {
    installGuide: {
      title: 'Huong dan cai dat',
      sections: {
        installDeps: {
          title: '1. Cai dat phu thuoc',
          code: 'npm install bytedesk-web\n# hoac\nyarn add bytedesk-web'
        },
        importComponent: {
          title: '2. Import component',
          code: "import { BytedeskReact } from 'bytedesk-web/react';\nimport type { BytedeskConfig } from 'bytedesk-web/react';"
        },
        config: {
          title: '3. Cau hinh tham so',
          minimalTitle: 'Cau hinh toi thieu (bat buoc)',
          minimalCode: `const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
  },
};`,
          minimalNote: 'org, t va sid la bat buoc. Hay thay bang ID to chuc va dinh tuyen cua ban.',
          fullTitle: 'Cau hinh day du (tuy chon)',
          fullCode: `const config: BytedeskConfig = {
  isDebug: false,
  forceRefresh: false,
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://www.weiyuai.cn/chat',
  locale: 'vi-vn',
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
          title: '4. Su dung component',
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
          title: '5. Cac phuong thuc kha dung',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: 'Hien nut launcher noi' },
            { code: '(window as any).bytedesk?.hideButton()', description: 'An nut launcher' },
            { code: '(window as any).bytedesk?.showBubble()', description: 'Hien bong thong bao' },
            { code: '(window as any).bytedesk?.hideBubble()', description: 'An bong thong bao' },
            { code: '(window as any).bytedesk?.showChat()', description: 'Mo cua so tro chuyen' },
            { code: '(window as any).bytedesk?.hideChat()', description: 'Dong cua so tro chuyen' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: 'Hien hop loi moi' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: 'An hop loi moi' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: 'Mo hop thoai phan hoi tai lieu (moi)' }
          ]
        },
        feedback: {
          title: '6. Tong quan phan hoi tai lieu',
          intro: 'Phan hoi tai lieu cho phep nguoi dung boi den mot doan tren trang, tu dong chup man hinh va gui yeu cau co ngu canh.',
          bullets: [
            'Tu dong nhan dien van ban duoc boi den va hien tooltip “Document feedback”.',
            'Chup man hinh hien tai bang html2canvas de bo sung ngu canh.',
            'Ghi lai chinh xac doan van ban duoc chon de lap trinh vien co the den dung van de.',
            'Ho tro kich hoat bang boi den, nut thu cong, hoac ca hai.',
            'Cung cap hook onSubmit/onCancel de chuyen payload ve backend cua ban.'
          ],
          tip: 'Cai html2canvas de bat chup man hinh tu dong:',
          tipCommand: 'npm install html2canvas'
        }
      }
    }
  }
};