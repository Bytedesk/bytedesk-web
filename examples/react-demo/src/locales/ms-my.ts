export const msMy = {
  common: {
    languageLabel: 'Bahasa',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Cina Ringkas',
      'zh-tw': 'Cina Tradisional',
      'ja-jp': 'Bahasa Jepun',
      'ko-kr': 'Bahasa Korea',
      'vi-vn': 'Tieng Viet',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Bahasa Sepanyol',
      'fr-fr': 'Bahasa Perancis'
    },
    themeLabel: 'Mod tema',
    themeOptions: {
      light: 'Cerah',
      dark: 'Gelap',
      system: 'Ikut sistem'
    },
    officialSiteLabel: 'Laman rasmi Bytedesk',
    resetAnonymousVisitorLabel: 'Set semula pelawat tanpa nama',
    resetAnonymousVisitorSuccess: 'Pelawat tanpa nama telah diset semula',
    docLinks: {
      react: 'Lihat dokumentasi integrasi React',
      vue: 'Lihat dokumentasi integrasi Vue',
      reactExample: 'Contoh kod asas React',
      vueExample: 'Contoh kod asas Vue',
      userInfo: 'Lihat dokumentasi integrasi maklumat pengguna',
      goodsInfo: 'Lihat dokumentasi integrasi maklumat produk',
      orderInfo: 'Lihat dokumentasi integrasi maklumat pesanan',
      vipLevel: 'Lihat dokumentasi pemperibadian',
      unreadCount: 'Contoh React kiraan mesej belum dibaca',
      documentFeedback: 'Panduan maklum balas dokumen'
    },
    buttons: {
      openChat: 'Buka chat',
      openChatWithParams: 'Buka chat dengan parameter',
      closeChat: 'Tutup chat',
      showButton: 'Papar butang',
      hideButton: 'Sembunyikan butang',
      showBubble: 'Papar gelembung',
      hideBubble: 'Sembunyikan gelembung',
      showInvite: 'Papar jemputan',
      hideInvite: 'Sembunyikan jemputan',
      togglePlacement: 'Tukar kedudukan',
      toggleThemeColor: 'Tukar warna tema',
      reset: 'Tetapkan semula',
      copy: 'Salin',
      submit: 'Hantar',
      cancel: 'Batal',
      openInNewWindow: 'Buka dalam tetingkap popup',
      openInNewTab: 'Buka dalam tab baharu'
    },
    apiHintPrefix: 'Panggilan API:'
  },
  nav: {
    more: 'Lagi',
    basicDemo: '⚙️ Tetapan asas',
    userInfoDemo: '👤 Maklumat pengguna',
    goodsInfoDemo: '🛒 Maklumat produk',
    orderInfoDemo: '📦 Maklumat pesanan',
    vipLevelDemo: '👑 Pemperibadian',
    unreadCountDemo: '🔔 Belum dibaca',
    threadHistoryDemo: '🧵 Sejarah perbualan',
    videoSupportDemo: '🎥 Sokongan video',
    webrtcDemo: '📹 Demo WebRTC',
    callCenterDemo: '📞 Pusat panggilan',
    videoConferenceDemo: '🎬 Persidangan video',
    documentFeedbackDemo: '📝 Maklum balas dokumen',
    flightBookingDemo: '✈️ Tempahan penerbangan'
  },
  pages: {
    basicDemo: {
      title: 'Tetapan asas Bytedesk',
      intro: 'Gunakan tindakan pantas di bawah untuk mencuba ciri biasa Bytedesk Web SDK.',
      themeButtonLabel: 'Tukar warna navigasi',
      bubbleTitle: 'Perlukan bantuan?',
      bubbleSubtitle: 'Klik untuk mula berbual',
      placement: {
        bottomLeft: 'Bawah kiri',
        bottomRight: 'Bawah kanan'
      },
      loadHistoryLabel: 'Muat sejarah',
      loadHistoryEnabled: 'HIDUP',
      loadHistoryDisabled: 'MATI',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: 'Lalai',
      currentConfigTitle: 'Konfigurasi semasa',
      copyConfig: 'Salin JSON konfigurasi'
    },
    userInfoDemo: {
      title: 'Demo integrasi maklumat pengguna',
      description: 'Hantar visitorUid, nickname, avatar dan medan lain melalui config supaya ejen boleh mengenali pengguna serta-merta. Gunakan butang di bawah untuk bertukar antara pengguna contoh.',
      switchUser: 'Tukar pengguna',
      switchToUserLabel: 'Tukar ke {{name}}',
      switchAnonymousUserLabel: 'Tukar ke pengguna tanpa nama',
      anonymousUserLabel: 'Pengguna tanpa nama',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname, avatar dan medan lain tidak dihantar.',
      currentUserTitle: 'Pengguna semasa',
      currentUserIdLabel: 'ID pengguna',
      currentUserNicknameLabel: 'Nama paparan',
      contactSupport: 'Hubungi sokongan',
      inviteText: 'Hai, bagaimana kami boleh membantu anda?',
      docLinks: {
        userInfoDoc: 'Lihat dokumentasi integrasi maklumat pengguna',
        reactExample: 'Contoh React maklumat pengguna',
        vueExample: 'Contoh Vue maklumat pengguna'
      },
      controlPanel: {
        title: 'Panel kawalan Bytedesk',
        chatWindow: 'Kawalan tetingkap chat',
        button: 'Kawalan butang',
        bubble: 'Kawalan gelembung',
        invite: 'Kawalan dialog jemputan'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      urlTemplateLabel: 'Templat URL umum',
      urlParamsTitle: 'Rujukan parameter (untuk /chat)',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran (kumpulan/bot/ejen)',
        'visitorUid: ID pelawat tersuai (disyorkan)',
        'nickname/avatar: profil pelawat (pilihan)',
        'mobile/email/note: maklumat tambahan pelawat (pilihan)',
        'extra: medan lanjutan tersuai, hantar sebagai rentetan JSON (pilihan)',
        'lang/mode: bahasa dan mod tema (pilihan)'
      ],
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      apiHintPrefix: 'Panggilan API:',
      users: {
        user1: 'Pelawat Xiao Ming',
        user2: 'Pelawat Xiao Hong',
        user3: 'Pelawat Xiao Li'
      }
    },
    goodsInfoDemo: {
      title: 'Demo integrasi maklumat produk',
      description: 'Lampirkan metadata produk (uid, title, image, description, price, url, tags) pada sesi chat supaya ejen boleh melihat konteks tanpa meninggalkan konsol.',
      docLinks: {
        goodsDoc: 'Lihat panduan maklumat produk',
        reactExample: 'Contoh React maklumat produk',
        vueExample: 'Contoh Vue maklumat produk'
      },
      infoCardTitle: 'Butiran produk',
      tagsLabel: 'Tag',
      descriptionLabel: 'Penerangan',
      priceLabel: 'Harga',
      contactSupport: 'Hubungi sokongan',
      product: {
        title: 'BYD Yangwang U7 EV mewah',
        description: 'Yangwang U7 menggunakan platform bateri blade terkini BYD dengan jarak sehingga 1,000 km, bantuan pemanduan L3 dan dalaman kulit premium dengan bumbung panoramik.',
        tags: ['Tenaga baharu', 'Sedan mewah', 'Pemanduan pintar', 'Jarak jauh']
      },
      controlPanel: {
        title: 'Panel kawalan Bytedesk',
        chatWindow: 'Kawalan tetingkap chat'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      urlTemplateLabel: 'Templat URL umum',
      urlParamsTitle: 'Rujukan parameter (untuk /chat)',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran (kumpulan/bot/ejen)',
        'visitorUid: ID pelawat tersuai (pilihan)',
        'nickname/avatar: profil pelawat (pilihan)',
        'goodsInfo: payload produk sebagai rentetan JSON (disyorkan)',
        'extra: payload lanjutan sebagai rentetan JSON (pilihan)',
        'lang/mode: bahasa dan mod tema (pilihan)'
      ],
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      payloadGuideTitle: 'Pembinaan dan penukaran goodsInfo',
      payloadObjectLabel: 'Langkah 1: objek perniagaan',
      payloadJsonLabel: 'Langkah 2: rentetan JSON (JSON.stringify)',
      payloadEncodedLabel: 'Langkah 3: nilai dikodkan URL (encodeURIComponent)',
      payloadNotesTitle: 'Nota',
      payloadNotes: [
        'Bina goodsInfo sebagai objek dahulu, kemudian gunakan JSON.stringify sebelum menghantarnya ke chatConfig.',
        'Untuk integrasi URL terus, hantar goodsInfo yang telah dikodkan; URLSearchParams dalam aliran SDK akan mengekod secara automatik.',
        'goodsInfo.extra biasanya ialah rentetan JSON untuk medan tambahan seperti SKU dan stok.',
        'Apabila payload menjadi besar, kekalkan medan utama (uid/title/image/price) untuk mengelakkan URL terlalu panjang.'
      ]
    },
    orderInfoDemo: {
      title: 'Demo integrasi maklumat pesanan',
      description: 'Benamkan butiran pesanan dalam setiap perbualan untuk mempercepatkan sokongan selepas jualan dan penyelesaian masalah.',
      docLinks: {
        orderDoc: 'Lihat panduan maklumat pesanan',
        reactExample: 'Contoh React maklumat pesanan',
        vueExample: 'Contoh Vue maklumat pesanan'
      },
      sections: {
        statusTimeline: 'Status pesanan',
        orderInfo: 'Butiran pesanan',
        goodsInfo: 'Ringkasan produk',
        shippingInfo: 'Maklumat penghantaran'
      },
      labels: {
        orderId: 'ID pesanan',
        orderTime: 'Dicipta pada',
        orderStatus: 'Status',
        paymentMethod: 'Kaedah pembayaran',
        totalAmount: 'Jumlah amaun',
        unitPrice: 'Harga seunit',
        quantity: 'Kuantiti',
        receiver: 'Penerima',
        phone: 'Telefon',
        address: 'Alamat'
      },
      statusText: {
        pending: 'Menunggu pembayaran',
        paid: 'Sudah dibayar',
        shipped: 'Sudah dihantar',
        delivered: 'Sudah diterima',
        cancelled: 'Dibatalkan'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      urlTemplateLabel: 'Templat URL umum',
      urlParamsTitle: 'Rujukan parameter (untuk /chat)',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran (kumpulan/bot/ejen)',
        'visitorUid: ID pelawat tersuai (pilihan)',
        'nickname/avatar: profil pelawat (pilihan)',
        'orderInfo: payload pesanan sebagai rentetan JSON (disyorkan)',
        'extra: payload lanjutan sebagai rentetan JSON (pilihan)',
        'lang/mode: bahasa dan mod tema (pilihan)'
      ],
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      payloadGuideTitle: 'Pembinaan dan penukaran orderInfo',
      payloadObjectLabel: 'Langkah 1: objek perniagaan',
      payloadJsonLabel: 'Langkah 2: rentetan JSON (JSON.stringify)',
      payloadEncodedLabel: 'Langkah 3: nilai dikodkan URL (encodeURIComponent)',
      payloadNotesTitle: 'Nota',
      payloadNotes: [
        'Bina objek pesanan yang lengkap dahulu, kemudian gunakan JSON.stringify sebelum menghantarnya ke chatConfig.',
        'Untuk integrasi URL terus, hantar orderInfo yang telah dikodkan; URLSearchParams dalam aliran SDK akan mengekod secara automatik.',
        'Kekalkan medan penting dalam orderInfo.goods dan orderInfo.shippingAddress supaya ejen dapat memahami konteks dengan lebih pantas.',
        'Gunakan nilai enum yang stabil untuk status (contohnya paid/shipped), dan gunakan statusText untuk teks paparan.'
      ]
    },
    vipLevelDemo: {
      title: 'Demo pemperibadian',
      description: 'Sediakan vipLevel dan medan tersuai lain untuk memaparkan profil pelanggan yang lebih kaya dan pengalaman sokongan yang lebih diperibadikan.',
      docLinks: {
        vipDoc: 'Lihat panduan pemperibadian',
        reactExample: 'Kod sumber demo VIP React',
        vueExample: 'Kod sumber demo VIP Vue'
      },
      vipLabel: 'Tahap VIP',
      normalLabel: 'Pengguna biasa',
      vipPrefix: 'VIP',
      switchButtonLabel: 'Tukar ke {{name}}',
      users: {
        user1: 'Profil biasa',
        user2: 'Profil VIP 1',
        user3: 'Profil VIP 2'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      urlTemplateLabel: 'Templat URL umum',
      urlParamsTitle: 'Rujukan parameter',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran (kumpulan/bot/ejen)',
        'visitorUid: ID pelawat tersuai (disyorkan)',
        'nickname/avatar: profil pelawat (pilihan)',
        'vipLevel: tahap VIP pelawat (disyorkan integer 0-10)',
        'extra: rentetan JSON untuk medan tersuai (pilihan)',
        'lang/mode: bahasa dan mod tema (pilihan)'
      ],
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      payloadGuideTitle: 'Pembinaan dan penukaran vipLevel',
      payloadObjectLabel: 'Langkah 1: objek perniagaan',
      payloadJsonLabel: 'Langkah 2: rentetan JSON (JSON.stringify)',
      payloadEncodedLabel: 'Langkah 3: nilai dikodkan URL (encodeURIComponent)',
      payloadNotesTitle: 'Nota',
      payloadNotes: [
        'Gunakan tahap integer yang stabil untuk vipLevel (seperti 0-10) agar selaras dengan strategi segmentasi.',
        'Bina extra sebagai objek dahulu, kemudian gunakan JSON.stringify sebelum menghantarnya ke chatConfig.',
        'Untuk integrasi URL terus, hantar extra yang telah dikodkan; URLSearchParams dalam aliran SDK akan mengekod secara automatik.',
        'Apabila tahap berubah, mulakan semula widget atau muat semula parameter sesi untuk menggunakan profil baharu.'
      ]
    },
    unreadCountDemo: {
      title: 'Demo kiraan mesej belum dibaca',
      description: 'Panggil getUnreadMessageCount dan clearUnreadMessages untuk sentiasa selari dengan keadaan pengguna semasa.',
      currentCount: 'Bilangan mesej belum dibaca semasa',
      docLinks: {
        unreadDoc: 'Lihat panduan integrasi kiraan mesej belum dibaca',
        reactExample: 'Contoh React kiraan belum dibaca',
        vueExample: 'Contoh Vue kiraan belum dibaca'
      },
      buttons: {
        markAllRead: 'Tandakan semua sebagai dibaca',
        refresh: 'Muat semula kiraan belum dibaca'
      },
      usageNotesTitle: 'Petua',
      usageNotes: [
        'Gunakan getUnreadMessageCount() bila-bila masa anda perlukan jumlah terkini.',
        'Panggil clearUnreadMessages() selepas pelanggan membaca mesej.'
      ],
      urlGuideTitle: 'Penggunaan URL API + parameter',
      countApiLabel: 'Endpoint kiraan belum dibaca (GET)',
      clearApiLabel: 'Endpoint kosongkan belum dibaca (POST)',
      urlParamsTitle: 'Parameter bersama (sama seperti dalaman SDK)',
      urlParams: [
        'uid: UID pelawat sistem (daripada BYTEDESK_UID tempatan)',
        'visitorUid: UID pelawat tersuai dari frontend (pilihan, disyorkan)',
        'orgUid: ID organisasi (daripada chatConfig.org)',
        'client: jenis klien (SDK menambah WEB_FLOAT secara automatik)'
      ],
      sampleUrlLabel: 'Contoh URL untuk permintaan kiraan belum dibaca',
      sampleBodyLabel: 'Contoh badan POST untuk mengosongkan belum dibaca',
      apiNotesTitle: 'Nota pelaksanaan',
      apiNotes: [
        'getUnreadMessageCount() dipetakan kepada GET /visitor/api/v1/message/unread/count.',
        'clearUnreadMessages() dipetakan kepada POST /visitor/api/v1/message/unread/clear.',
        'SDK membaca BYTEDESK_UID dari localStorage dan menggabungkannya dengan chatConfig.visitorUid/chatConfig.org.',
        'Apabila uid kosong, getUnreadMessageCount() mengembalikan 0 terus tanpa menghantar permintaan.'
      ]
    },
    threadHistoryDemo: {
      title: 'Demo sejarah thread pelawat',
      description: 'Berdasarkan halaman ThreadList pelawat, demo ini membuka /chat/thread dari ikon SDK untuk memuatkan sejarah thread.',
      bubbleTitle: 'Sejarah thread',
      bubbleSubtitle: 'Klik untuk buka senarai sejarah',
      anonymousUserLabel: 'Pengguna tanpa nama',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar.',
      pathAlert: 'Halaman ini mengaktifkan chatPath=/chat/thread. Klik ikon akan membuka sejarah thread, bukan /chat.',
      currentPathLabel: 'Laluan semasa',
      currentPathHint: 'Semua parameter lain sama seperti /chat',
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Tetapkan chatPath kepada /chat/thread supaya klik ikon dan showChat() sama-sama masuk ke sejarah thread.',
        '2. /chat/thread menerima parameter yang sama seperti /chat, seperti org, t, sid, visitorUid, nickname, avatar.',
        '3. Anda boleh integrasi terus dengan URL + query tanpa panggilan SDK tambahan.'
      ],
      buttons: {
        openHistoryPage: 'Buka halaman sejarah thread',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      urlTemplateLabel: 'Templat URL umum',
      urlParamsTitle: 'Rujukan parameter (sama seperti /chat)',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran (kumpulan/bot/ejen)',
        'visitorUid: ID pelawat tersuai (disyorkan)',
        'nickname/avatar: profil pelawat (pilihan)',
        'lang/mode: bahasa dan mod tema (pilihan)'
      ],
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      docLinks: {
        threadDoc: 'Lihat panduan integrasi sejarah thread',
        visitorRef: 'Rujukan Visitor ThreadList',
        reactExample: 'Kod sumber demo sejarah thread React'
      }
    },
    videoSupportDemo: {
      title: 'Demo sokongan video',
      description: 'Gunakan barisan sokongan video khusus dalam chatConfig supaya pelawat boleh meminta khidmat pelanggan berasaskan video dari pintu masuk web.',
      bubbleTitle: 'Sokongan video',
      bubbleSubtitle: 'Sambung dengan pakar video',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar.',
      pathAlert: 'Halaman ini menggunakan chatPath=/chat dan sid sokongan video. Klik ikon akan membuka halaman chat biasa dalam konteks sokongan video.',
      currentPathLabel: 'Laluan semasa',
      currentPathHint: 'Route kekal /chat; senario perniagaan ditentukan oleh sid dan t.',
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Kekalkan chatPath sebagai /chat dan tetapkan chatConfig.sid kepada ID barisan sokongan video anda.',
        '2. Hantar identiti pelawat (visitorUid/nickname/avatar) bila boleh untuk pengesahan ejen yang lebih cepat.',
        '3. Anda boleh membuka senario ini melalui showChat() atau parameter query URL secara terus.'
      ],
      buttons: {
        openVideoSupport: 'Buka sokongan video',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      docLinks: {
        reactDoc: 'Lihat dokumentasi integrasi React',
        vueDoc: 'Lihat dokumentasi integrasi Vue',
        reactExample: 'Kod sumber demo sokongan video React'
      }
    },
    callCenterDemo: {
      title: 'Demo pusat panggilan',
      description: 'Menunjukkan cara menghala pengguna ke kumpulan kerja pusat panggilan dengan menukar sid sambil mengekalkan laluan halaman chat standard.',
      bubbleTitle: 'Pusat panggilan',
      bubbleSubtitle: 'Sedia untuk beratur dan pindah',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar.',
      pathAlert: 'Halaman ini mengekalkan chatPath=/chat dan menyasarkan sid pusat panggilan untuk mensimulasikan akses barisan dari pintu masuk web.',
      currentPathLabel: 'Laluan semasa',
      currentPathHint: 'Route kekal /chat; barisan ditentukan oleh chatConfig.sid.',
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Konfigurasikan sid kepada ID kumpulan kerja pusat panggilan supaya semua sesi masuk ke barisan yang sama.',
        '2. Gunakan visitorUid yang berbeza untuk mensimulasikan pengguna beratur serentak.',
        '3. Dalam produksi, ikat sid mengikut garis perniagaan (jualan, sokongan, selepas jualan) untuk penghalaan yang lebih baik.'
      ],
      buttons: {
        openCallCenter: 'Buka pusat panggilan',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      docLinks: {
        reactDoc: 'Lihat dokumentasi integrasi React',
        vueDoc: 'Lihat dokumentasi integrasi Vue',
        reactExample: 'Kod sumber demo pusat panggilan React'
      },
      runtime: {
        title: 'Panel runtime (diilhamkan SIP.js)',
        description: 'Simulasikan keadaan sambung, barisan, penugasan dan selesai untuk mengesahkan aliran masuk pusat panggilan dengan cepat.',
        statusLabels: {
          sdkReady: 'Kesiapsiagaan SDK',
          queueState: 'Keadaan barisan',
          activeSessionCount: 'Bilangan sesi aktif',
          lastActionAt: 'Masa tindakan terakhir'
        },
        statusValues: {
          ready: 'Sedia',
          notReady: 'Tidak sedia'
        },
        queueState: {
          idle: 'Rehat',
          queueing: 'Sedang beratur',
          serving: 'Sedang berkhidmat'
        },
        buttons: {
          openQueue: 'Buka pintu masuk barisan',
          simulateAssign: 'Simulasi tugasan ejen',
          completeSession: 'Selesaikan sesi semasa',
          clearLogs: 'Kosongkan log'
        },
        logTitle: 'Log aktiviti',
        emptyLogs: 'Belum ada aktiviti. Cuba tindakan pantas di atas.',
        logTemplates: {
          switchedAnonymous: 'Beralih ke mod tanpa nama.',
          switchedUser: 'Pelawat ditukar: {{name}}.',
          openQueue: 'Membuka pintu masuk pusat panggilan dan beralih ke mod beratur.',
          closeQueue: 'Panel chat ditutup.',
          assignSession: 'Penugasan barisan disimulasikan. Sesi kini sedang berkhidmat.',
          completeSession: 'Perkhidmatan selesai dan sesi ditutup.'
        }
      }
    },
    webrtcDemo: {
      title: 'Demo ejen audio / video',
      description: 'Gunakan butang gelembung terapung di sudut kanan bawah untuk mencuba khidmat pelanggan audio atau video masa nyata melalui WebRTC. Mod panggilan dan maklumat pelawat dihantar sebagai parameter URL ke halaman /webrtc.',
      modeLimitNotice: 'Mod robot belum disokong buat masa ini. Hanya ejen manusia audio dan video disokong.',
      pathAlert: 'Butang terapung lalai kepada mod ejen audio (audio=1&video=0). Gunakan butang di bawah untuk bertukar ke mod ejen video.',
      currentPathLabel: 'Laluan masuk',
      currentPathHint: 'Route sentiasa /webrtc; jenis panggilan dikawal oleh parameter audio / video.',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar.',
      callMode: 'Mod panggilan semasa',
      callModeAudio: '🎙️ Ejen audio (audio=1, video=0)',
      callModeVideo: '📹 Ejen video (audio=1, video=1)',
      bubbleTitleAudio: 'Ejen audio',
      bubbleTitleVideo: 'Ejen video',
      bubbleSubtitleAudio: 'Klik untuk mula panggilan audio',
      bubbleSubtitleVideo: 'Klik untuk mula panggilan video',
      docLinks: {
        reactDoc: 'Lihat dokumentasi React WebRTC',
        vueDoc: 'Lihat dokumentasi Vue WebRTC',
        reactExample: 'Kod sumber demo WebRTC React'
      },
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Butang / gelembung terapung di sudut kanan bawah ialah pintu masuk WebRTC. Klik akan membuka /webrtc dalam tetingkap terbenam.',
        '2. Ejen audio (audio=1&video=0): hanya mikrofon dan pembesar suara, kamera tidak diperlukan.',
        '3. Ejen video (audio=1&video=1): kamera dan mikrofon kedua-duanya diaktifkan.',
        '4. Dalam produksi URL CDN lalai ialah https://cdn.weiyuai.cn/webrtc; secara tempatan ia menunjuk ke http://127.0.0.1:9018/webrtc.',
        '5. org, t dan sid menggunakan nilai yang sama seperti integrasi chat, jadi tiada persediaan tambahan diperlukan.'
      ],
      buttons: {
        audioMode: '🎙️ Tukar ke ejen audio',
        videoMode: '📹 Tukar ke ejen video',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      urlGuideTitle: 'Rujukan URL + parameter',
      sampleUrlLabel: 'Contoh URL untuk konfigurasi semasa',
      urlParamsTitle: 'Rujukan parameter',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan kerja)',
        'sid: ID ejen / kumpulan kerja (wajib)',
        'audio: aktifkan audio (1 = hidup, 0 = mati)',
        'video: aktifkan video (1 = hidup, 0 = mati)',
        'lang: bahasa (zh-cn, en, ms-my, dll.)',
        'visitorUid: ID pelawat tersuai (pilihan)',
        'nickname / avatar: profil pelawat (pilihan)'
      ]
    },
    videoConferenceDemo: {
      title: 'Demo persidangan video',
      description: 'Menunjukkan akses sesi gaya persidangan dengan menugaskan pelawat kepada sid mesyuarat khusus dan membuka chat sebagai panel masuk.',
      bubbleTitle: 'Persidangan video',
      bubbleSubtitle: 'Sertai perkhidmatan mesyuarat',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar.',
      pathAlert: 'Halaman ini menggunakan chatPath=/chat dan menukar sid ke senario mesyuarat, sesuai untuk aliran panduan pra-mesyuarat.',
      currentPathLabel: 'Laluan semasa',
      currentPathHint: 'Route kekal /chat; konteks persidangan dibekalkan melalui chatConfig.sid.',
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Petakan setiap bilik persidangan atau acara kepada sid yang berbeza untuk pemisahan trafik yang jelas.',
        '2. Sertakan medan profil pelawat untuk memudahkan semakan identiti di pihak hos.',
        '3. Gunakan mod ini sebagai lapisan masuk sebelum pengguna berpindah ke bilik video asli anda.'
      ],
      buttons: {
        openVideoConference: 'Buka persidangan video',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      urlGuideTitle: 'Penggunaan URL + Query',
      sampleUrlLabel: 'Contoh URL dijana daripada konfigurasi semasa',
      docLinks: {
        reactDoc: 'Lihat dokumentasi integrasi React',
        vueDoc: 'Lihat dokumentasi integrasi Vue',
        reactExample: 'Kod sumber demo persidangan video React'
      }
    },
    documentFeedbackDemo: {
      title: 'Demo maklum balas dokumen',
      subtitle: 'Benarkan pembaca menyorot teks, menangkap tangkapan skrin secara automatik, dan menghantar maklum balas berstruktur tanpa meninggalkan halaman.',
      docLinks: {
        reactDoc: 'Lihat panduan integrasi React',
        vueDoc: 'Lihat panduan integrasi Vue',
        reactExample: 'Lihat kod sumber demo React ini'
      },
      setupStepsTitle: 'Senarai semak mula pantas',
      setupSteps: [
        'Pasang SDK dan sediakan objek BytedeskConfig.',
        'Aktifkan ciri maklum balas dokumen melalui feedbackConfig.',
        'Render <BytedeskReact {...config} /> dalam aplikasi anda.',
        'Sorot mana-mana perenggan di bawah untuk membuka tooltip maklum balas terapung.'
      ],
      highlightsTitle: 'Bagaimana maklum balas dokumen berfungsi',
      highlights: [
        'Sorot teks untuk memunculkan butang terapung “Document feedback” yang membawa pilihan tersebut.',
        'SDK menangkap tangkapan skrin secara automatik supaya ejen melihat konteks yang sama seperti pengguna.',
        'Chip kategori dan placeholder yang jelas membantu pengguna memberi butiran yang boleh diambil tindakan.'
      ],
      controlPanel: {
        title: 'Panel penyelesaian masalah',
        buttons: {
          forceInit: 'Paksa inisialisasi maklum balas',
          manualTrigger: 'Cetuskan maklum balas secara manual',
          testSelection: 'Uji tooltip sorotan',
          statusCheck: 'Jalankan semakan status',
          clearLogs: 'Kosongkan log maklum balas',
          inspectState: 'Periksa keadaan runtime'
        },
        statusLabel: 'Status inisialisasi',
        initialized: 'Sedia',
        initializing: 'Menunggu SDK...'
      },
      exampleSection: {
        title: 'Artikel demo',
        paragraphs: [
          'BytedeskWeb menyediakan live chat, bot dan maklum balas dokumen dalam satu widget ringan. Pengguna boleh menyorot ayat yang sangat spesifik, menghantar tangkapan skrin, dan terus membaca tanpa muat semula halaman.',
          'Tooltip terapung menghormati tema gelap/cerah serta menyokong ikon, teks dan mod pencetus tersuai. Ia sangat sesuai untuk portal dokumentasi, pangkalan ilmu dan halaman pemasaran panjang.',
          'Setiap penghantaran datang dengan teks yang dipilih, koordinat, kategori dan tangkapan skrin pilihan supaya pasukan sokongan dan dokumentasi boleh menyelesaikan isu dengan cepat.'
        ],
        tip: 'Cuba sorot mana-mana petikan di atas untuk melihat tooltip berfungsi.'
      },
      logs: {
        title: 'Log maklum balas',
        empty: 'Belum ada maklum balas. Sorot kandungan atau gunakan butang pencetus manual untuk jana data contoh.',
        selectedText: 'Teks dipilih',
        categories: 'Kategori',
        feedback: 'Maklum balas'
      },
      feedbackConfigText: {
        selectionText: 'Maklum balas dokumen',
        dialogTitle: 'Maklum balas dokumen',
        placeholder: 'Terangkan isu atau idea penambahbaikan secara terperinci.',
        submitText: 'Hantar maklum balas',
        cancelText: 'Batal',
        successMessage: 'Terima kasih! Kami akan semak maklum balas anda tidak lama lagi.',
        categoryNames: [
          'Kesilapan ejaan atau terjemahan',
          'Pautan rosak',
          'Dokumen tidak sepadan dengan produk',
          'Sukar difahami',
          'Cadangan lain'
        ],
        typesSectionTitle: 'Jenis isu',
        typesDescription: '(boleh pilih banyak)'
      },
      manualTriggerMessage: 'Maklum balas ini dicetuskan secara manual untuk mengesahkan aliran kerja.',
      testSelectionText: 'Teks sorotan contoh',
      tooltipFallbackText: 'Tooltip maklum balas ujian',
      alerts: {
        missingInstance: 'Instance BytedeskWeb tidak ditemui. Sila inisialisasi widget terlebih dahulu.',
        showFeedbackMissing: 'showDocumentFeedback tidak tersedia pada instance semasa.',
        retryTimeout: 'Masa menunggu BytedeskWeb tamat semasa inisialisasi. Muat semula halaman dan cuba lagi.',
        forceInitSuccess: 'Ciri maklum balas telah diinisialisasi. Anda boleh mula menguji sekarang.',
        forceInitFailed: 'Inisialisasi paksa gagal. Semak console untuk butiran.',
        statusReportTitle: 'Status ciri',
        statusReportFooter: 'Buka console pelayar untuk log terperinci.',
        available: 'Tersedia',
        missing: 'Tiada',
        statusLabels: {
          bytedeskInstance: 'Instance BytedeskWeb',
          html2canvas: 'Pustaka html2canvas',
          feedbackFunction: 'API maklum balas dokumen',
          feedbackEnabled: 'Feedback config diaktifkan',
          tooltipElement: 'Elemen tooltip',
          dialogElement: 'Elemen dialog',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: 'Keterlihatan tooltip',
          currentSelection: 'Pilihan semasa'
        }
      }
    },
    flightBookingDemo: {
      title: 'Demo tempahan penerbangan',
      description: 'Selesaikan tempahan, pembatalan dan penjadualan semula penerbangan melalui perbualan berkuasa AI. Pengguna boleh mencari penerbangan, memilih tempat duduk, mengubah pesanan dan banyak lagi tanpa borang yang rumit.',
      bubbleTitle: 'Perlukan bantuan?',
      bubbleSubtitle: 'Tempah/Batal/Tukar penerbangan',
      sections: {
        flightStatus: 'Status penerbangan',
        flightInfo: 'Maklumat penerbangan',
        bookingInfo: 'Butiran tempahan',
        passengerInfo: 'Maklumat penumpang'
      },
      labels: {
        departure: 'Berlepas',
        arrival: 'Tiba',
        flightDate: 'Tarikh penerbangan',
        cabinClass: 'Kelas kabin',
        flightStatus: 'Status penerbangan',
        ticketPrice: 'Harga tiket',
        perPerson: 'orang',
        bookingNo: 'No. tempahan',
        bookingTime: 'Masa tempahan',
        paymentStatus: 'Status pembayaran',
        paymentMethod: 'Kaedah pembayaran',
        passengerCount: 'Bilangan penumpang',
        totalAmount: 'Jumlah keseluruhan',
        person: 'orang',
        passenger: 'Penumpang',
        passengerName: 'Nama',
        idType: 'Jenis ID',
        idNumber: 'Nombor ID',
        phone: 'Telefon'
      },
      statusText: {
        scheduled: 'Dijadualkan',
        boarding: 'Naik pesawat',
        departed: 'Berlepas',
        arrived: 'Tiba',
        cancelled: 'Dibatalkan'
      },
      paymentStatusText: {
        pending: 'Menunggu',
        paid: 'Dibayar',
        refunded: 'Dibayar balik'
      },
      buttons: {
        contactSupport: 'Hubungi sokongan',
        viewItinerary: 'Lihat itinerari',
        changeBooking: 'Tukar penerbangan',
        cancelBooking: 'Batalkan tempahan'
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
          pek: 'Lapangan Terbang Antarabangsa Capital T3',
          pvg: 'Lapangan Terbang Antarabangsa Pudong T2',
          can: 'Lapangan Terbang Antarabangsa Baiyun T2',
          szx: 'Lapangan Terbang Antarabangsa Baoan T3'
        },
        cabinClasses: {
          economy: 'Ekonomi',
          business: 'Perniagaan',
          first: 'Kelas pertama'
        }
      },
      passenger: {
        samplePassenger1: 'John Smith',
        samplePassenger2: 'Jane Doe',
        idTypes: {
          idCard: 'Kad pengenalan',
          passport: 'Pasport',
          other: 'Lain-lain'
        }
      },
      booking: {
        paymentMethods: {
          alipay: 'Alipay',
          wechat: 'WeChat Pay',
          card: 'Kad kredit'
        }
      }
    },
    onlineDemo: {
      title: 'Demo SDK dalam talian',
      description: 'Sampel ini memuatkan pakej npm yang telah diterbitkan, mengaktifkan ciri invite/bubble/feedback, dan menyediakan butang kawalan pantas.',
      docLinks: {
        reactDoc: 'Lihat panduan integrasi React',
        vueDoc: 'Lihat panduan integrasi Vue',
        reactExample: 'Kod sumber demo online React',
        vueExample: 'Kod sumber demo online Vue'
      },
      docLinksTitle: 'Pautan dokumentasi',
      feedbackSectionTitle: 'Panduan maklum balas dokumen',
      usageTitle: 'Cara mencuba',
      usageSteps: [
        'Sorot mana-mana ayat di bawah.',
        'Tooltip terapung berlabel “Document feedback” akan muncul berhampiran kursor anda.',
        'Klik tooltip untuk membuka dialog, semak teks yang dipilih dan hantar nota anda.'
      ],
      exampleParagraphs: [
        'BytedeskWeb menggabungkan live chat, bot dan maklum balas dokumen berasaskan konteks untuk menutup jurang antara dokumentasi dan sokongan.',
        'Pilihan teks akan menangkap tangkapan skrin secara automatik supaya pasukan sokongan melihat konteks yang tepat.',
        'Gunakan butang di bawah untuk menogol elemen UI chat atau mencetuskan maklum balas dokumen secara manual.'
      ],
      manualTriggerButton: 'Cetuskan maklum balas dokumen',
      manualTriggerMessage: 'Payload maklum balas contoh yang dicetuskan dari demo online.',
      controlPanelTitle: 'Panel kawalan',
      controlPanelDescription: 'Panggil helper SDK biasa untuk menogol elemen UI chat dan mengesahkan tingkah laku tema.'
    }
  },
  components: {
    installGuide: {
      title: 'Panduan pemasangan',
      sections: {
        installDeps: {
          title: '1. Pasang dependensi',
          code: 'npm install bytedesk-web\n# atau\nyarn add bytedesk-web'
        },
        importComponent: {
          title: '2. Import komponen',
          code: "import { BytedeskReact } from 'bytedesk-web/react';\nimport type { BytedeskConfig } from 'bytedesk-web/react';"
        },
        config: {
          title: '3. Konfigurasi parameter',
          minimalTitle: 'Konfigurasi minimum (wajib)',
          minimalCode: `const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: "2",
    sid: 'df_rt_uid',
  },
};`,
          minimalNote: 'org, t dan sid adalah wajib. Gantikan dengan ID organisasi dan penghalaan anda sendiri.',
          fullTitle: 'Konfigurasi penuh (pilihan)',
          fullCode: `const config: BytedeskConfig = {
  isDebug: false,
  forceRefresh: false,
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://www.weiyuai.cn/chat',
  locale: 'ms-my',
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
          title: '4. Gunakan komponen',
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
          title: '5. Kaedah yang tersedia',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: 'Papar butang launcher terapung' },
            { code: '(window as any).bytedesk?.hideButton()', description: 'Sembunyikan butang launcher' },
            { code: '(window as any).bytedesk?.showBubble()', description: 'Papar gelembung mesej' },
            { code: '(window as any).bytedesk?.hideBubble()', description: 'Sembunyikan gelembung mesej' },
            { code: '(window as any).bytedesk?.showChat()', description: 'Buka tetingkap chat' },
            { code: '(window as any).bytedesk?.hideChat()', description: 'Tutup tetingkap chat' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: 'Papar dialog jemputan' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: 'Sembunyikan dialog jemputan' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: 'Buka dialog maklum balas dokumen (baharu)' }
          ]
        },
        feedback: {
          title: '6. Gambaran keseluruhan maklum balas dokumen',
          intro: 'Maklum balas dokumen membolehkan pengguna menyorot petikan pada mana-mana halaman, menangkap tangkapan skrin secara automatik, dan menghantar permintaan yang mempunyai konteks.',
          bullets: [
            'Mengesan pilihan teks secara automatik dan memaparkan tooltip “Document feedback”.',
            'Menangkap skrin semasa dengan html2canvas untuk menambah konteks visual.',
            'Merekod pilihan tepat supaya pembangun boleh terus ke isu yang sama.',
            'Menyokong pencetus melalui sorotan teks, butang manual, atau kedua-duanya.',
            'Sediakan hook onSubmit/onCancel supaya anda boleh menghantar payload ke backend sendiri.'
          ],
          tip: 'Pasang html2canvas untuk mengaktifkan tangkapan skrin automatik:',
          tipCommand: 'npm install html2canvas'
        }
      }
    }
  }
};