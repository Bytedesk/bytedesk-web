import { en } from './en';

const basicDemoFieldDocs = {
  isDebug: 'Sama ada untuk menghidupkan log nyahpepijat semasa pembangunan.',
  forceRefresh: 'Paksa segar semula halaman chat atau iframe untuk menyemak isu cache.',
  apiUrl: 'Alamat akar API untuk pemulaan pelawat, kiraan belum dibaca dan maklum balas.',
  htmlUrl: 'Alamat akar laman chat. Jenis halaman dikawal oleh path berasingan.',
  chatPath: 'Laluan halaman chat teks.',
  threadPath: 'Laluan halaman sejarah perbualan.',
  webrtcPath: 'Laluan halaman audio atau video.',
  callPath: 'Laluan halaman pusat panggilan.',
  locale: 'Bahasa UI dan juga dihantar ke parameter lang pada URL chat.',
  placement: 'Kedudukan lekapan butang dan tetingkap chat.',
  marginBottom: 'Jarak dari bahagian bawah dalam px.',
  marginSide: 'Jarak dari sisi kiri atau kanan dalam px.',
  autoPopup: 'Sama ada membuka tetingkap chat secara automatik selepas inisialisasi.',
  autoPopupDelay: 'Masa tunda sebelum auto popup.',
  draggable: 'Benarkan butang masuk diseret.',
  tabsConfig: 'Kawal paparan tab messages, thread dan help.',
  bubbleConfig: 'Konfigurasi gelembung petunjuk di atas pintu masuk.',
  buttonConfig: 'Konfigurasi untuk satu butang masuk.',
  buttonsConfig: 'Senarai beberapa butang masuk, dengan keutamaan lebih tinggi daripada buttonConfig.',
  inviteConfig: 'Konfigurasi popup jemputan termasuk masa, gelung, teks butang dan callback.',
  theme: 'Konfigurasi tema dan warna.',
  animation: 'Konfigurasi animasi semasa memaparkan atau menyembunyikan tetingkap chat.',
  window: 'Saiz tetingkap chat di desktop.',
  onInit: 'Callback selepas SDK selesai diinisialisasi.',
  onShowChat: 'Dipanggil apabila tetingkap chat dipaparkan.',
  onHideChat: 'Dipanggil apabila tetingkap chat disembunyikan.',
  onMessage: 'Dipanggil apabila menerima mesej daripada iframe atau SDK.',
  onConfigChange: 'Dipanggil selepas konfigurasi berubah.',
  onVisitorInfo: 'Mengembalikan uid dan visitorUid selepas pemulaan pelawat.',
  'theme.mode': 'Mod tema: light, dark atau system.',
  'theme.textColor': 'Warna teks bagi butang atau modul.',
  'theme.backgroundColor': 'Warna latar utama bagi butang atau navigasi.',
  'bubble.show': 'Sama ada memaparkan gelembung petunjuk di atas pintu masuk.',
  'bubble.icon': 'Ikon lalai untuk satu gelembung.',
  'bubble.title': 'Tajuk untuk satu gelembung.',
  'bubble.subtitle': 'Subtajuk untuk satu gelembung.',
  'bubble.messages': 'Senarai beberapa mesej gelembung, mengatasi konfigurasi tunggal.',
  'bubble.autoRotate': 'Sama ada memutar mesej gelembung secara automatik.',
  'bubble.rotateInterval': 'Selang pertukaran gelembung.',
  'bubble.switchMode': 'Cara pertukaran: fade, slide-up atau ticker.',
  'button.show': 'Sama ada memaparkan butang ini.',
  'button.icon': 'Ikon butang.',
  'button.text': 'Teks butang. Boleh dikosongkan untuk satu butang bulat.',
  'button.width': 'Lebar butang.',
  'button.height': 'Tinggi butang.',
  'button.action': 'Jenis tindakan terbina: chat, thread, webrtc atau call.',
  'button.previewImageUrl': 'Imej dipaparkan semasa hover, sesuai untuk kod QR.',
  'button.previewImageAlt': 'Teks penerangan di bawah imej pratonton.',
  'button.onClick': 'Pengendali klik tersuai yang mengatasi tindakan lalai.',
  'invite.show': 'Sama ada untuk mengaktifkan popup jemputan.',
  'invite.text': 'Teks kandungan jemputan.',
  'invite.icon': 'Ikon popup jemputan.',
  'invite.delay': 'Masa tunda sebelum kali pertama dipaparkan.',
  'invite.loop': 'Sama ada popup jemputan diulang.',
  'invite.loopDelay': 'Jarak masa antara pengulangan.',
  'invite.loopCount': 'Bilangan maksimum pengulangan.',
  'invite.acceptText': 'Teks butang terima.',
  'invite.rejectText': 'Teks butang tolak.',
  'invite.onAccept': 'Dipanggil apabila pengguna menerima jemputan.',
  'invite.onReject': 'Dipanggil apabila pengguna menolak jemputan.',
  'invite.onClose': 'Dipanggil apabila popup jemputan ditutup.',
  'invite.onOpen': 'Dipanggil apabila popup jemputan dibuka.',
  'chat.org': 'ID organisasi, wajib.',
  'chat.t': 'Jenis perbualan, wajib. t=0 bermaksud khidmat pelanggan satu-ke-satu, t=1 bermaksud kumpulan kerja, t=2 bermaksud robot.',
  'chat.sid': 'ID sasaran perbualan, wajib.',
  'chat.uid': 'ID pengguna dalaman yang biasanya diurus oleh SDK.',
  'chat.visitorUid': 'Pengecam unik pelawat dari sisi perniagaan.',
  'chat.nickname': 'Nama panggilan pelawat.',
  'chat.avatar': 'URL avatar pelawat.',
  'chat.mobile': 'Nombor telefon pelawat.',
  'chat.email': 'E-mel pelawat.',
  'chat.note': 'Nota yang boleh dilihat oleh khidmat pelanggan.',
  'chat.channel': 'Sumber saluran masuk.',
  'chat.goodsInfo': 'Maklumat produk.',
  'chat.orderInfo': 'Maklumat pesanan.',
  'chat.extra': 'Medan lanjutan tambahan, biasanya JSON.',
  'chat.vipLevel': 'Tahap ahli.',
  'chat.debug': 'Penanda perniagaan untuk membezakan ujian dan produksi.',
  'chat.draft': 'Penanda draft untuk pelepasan berperingkat.',
  'chat.settingsUid': 'ID unik untuk nyahpepijat konfigurasi.',
  'chat.loadHistory': 'Sama ada memuatkan sejarah mesej. loadHistory=1 akan memuatkan sejarah sembang secara lalai apabila membuka halaman sembang.',
  'chat.threadDetail': 'Sama ada memaparkan butang butiran perbualan. threadDetail=1 akan memaparkannya; lalai disembunyikan.',
  'chat.visitorProfile': 'Sama ada memaparkan butang profil pelawat. visitorProfile=1 akan memaparkannya; lalai disembunyikan.',
  'chat.custom': 'Medan perniagaan tambahan boleh terus ditambah ke parameter URL chat.',
  'browse.referrer': 'Alamat halaman rujukan.',
  'browse.url': 'Alamat halaman semasa.',
  'browse.title': 'Tajuk halaman semasa.',
  'browse.custom': 'Boleh menambah maklumat pelayaran tambahan seperti ID halaman.',
  'feedback.enabled': 'Sama ada mengaktifkan fungsi maklum balas dokumen.',
  'feedback.trigger': 'Cara pencetus: selection, button atau both.',
  'feedback.showOnSelection': 'Sama ada memaparkan pintu masuk maklum balas semasa memilih teks.',
  'feedback.selectionText': 'Teks petunjuk apabila teks dipilih.',
  'feedback.buttonText': 'Label tetap bagi butang maklum balas.',
  'feedback.dialogTitle': 'Tajuk dialog maklum balas.',
  'feedback.placeholder': 'Placeholder medan input maklum balas.',
  'feedback.submitText': 'Label butang hantar.',
  'feedback.cancelText': 'Label butang batal.',
  'feedback.successMessage': 'Mesej selepas berjaya dihantar.',
  'feedback.categoryNames': 'Senarai kategori masalah.',
  'feedback.requiredTypes': 'Sama ada perlu memilih sekurang-kurangnya satu kategori.',
  'feedback.typesSectionTitle': 'Tajuk kawasan kategori.',
  'feedback.typesDescription': 'Penerangan tambahan bagi kawasan kategori.',
  'feedback.submitScreenshot': 'Sama ada menghantar tangkapan skrin bersama maklum balas.',
  'feedback.onSubmit': 'Aliran penghantaran tersuai.',
  'feedback.onCancel': 'Dipanggil apabila maklum balas dibatalkan.',
  'animation.enabled': 'Sama ada mengaktifkan animasi tetingkap chat.',
  'animation.duration': 'Tempoh animasi.',
  'animation.type': 'Jenis easing.',
  'window.width': 'Lebar tetingkap chat desktop.',
  'window.height': 'Tinggi tetingkap chat desktop.',
  'tabs.messages': 'Sama ada memaparkan tab messages.',
  'tabs.thread': 'Sama ada memaparkan tab sejarah perbualan.',
  'tabs.help': 'Sama ada memaparkan tab help.',
} as const;

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
      'fr-fr': 'Bahasa Perancis',
      'th-th': 'ไทย'
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
    helpcenterDemo: '❔ Pusat bantuan',
    videoSupportDemo: '🎥 Sokongan video',
    webrtcDemo: '📹 Demo WebRTC',
    callCenterDemo: '📞 Pusat panggilan',
    ticketDemo: '🎫 Demo tiket',
    ratingDemo: '⭐ Demo penilaian',
    platformDemo: '🏬 Demo platform',
    proactiveDemo: '🎯 Pemerolehan pelanggan proaktif',
    voiceAgentDemo: '🎙️ Ejen suara',
    videoConferenceDemo: '🎬 Persidangan video',
    documentFeedbackDemo: '📝 Maklum balas dokumen',
    flightBookingDemo: '✈️ Tempahan penerbangan'
  },
  pages: {
    basicDemo: {
      title: 'Tetapan asas Bytedesk',
      intro: 'Gunakan tindakan pantas di bawah untuk mencuba ciri biasa Bytedesk Web SDK.',
      themeButtonLabel: 'Tukar warna navigasi',
      themeTextButtonLabel: 'Tukar warna teks navigasi',
      bubbleTitle: 'Perlukan bantuan?',
      bubbleSubtitle: 'Klik untuk mula berbual',
      placement: {
        bottomLeft: 'Bawah kiri',
        bottomRight: 'Bawah kanan'
      },
      navbarLabel: 'Sembunyi nav atas',
      navbarHidden: 'HIDUP',
      navbarShown: 'MATI',
      navbarParamPurpose: 'Sama ada menyembunyikan bar navigasi atas. navbar=0 akan menyembunyikan navigasi.',
      qrCodeParamLabel: 'Tunjuk butang QR',
      threadDetailParamLabel: 'Tunjuk butang butiran',
      visitorProfileParamLabel: 'Tunjuk butang profil pelawat',
      loadHistoryLabel: 'Muat sejarah',
      loadHistoryEnabled: 'HIDUP',
      loadHistoryDisabled: 'MATI',
      loadHistoryApiHintPrefix: 'chatConfig.loadHistory=',
      defaultColorLabel: 'Lalai',
      defaultTextColorLabel: 'Lalai',
      currentConfigTitle: 'Konfigurasi semasa',
      copyConfig: 'Salin JSON konfigurasi',
      urlParamsTitle: 'Rujukan parameter',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: satu-ke-satu, 1: kumpulan, 2: bot)',
        'sid: ID sasaran sesi (ejen / kumpulan / bot)',
        'visitorUid: ID pelawat tersuai yang dihantar ke halaman berasingan (pilihan)',
        'nickname / avatar: maklumat profil pelawat yang dipaparkan pada halaman chat (pilihan)',
        'lang: nilai bahasa untuk halaman berasingan',
        'mode: mod tema (light / dark)',
        'backgroundColor / textColor: warna tema untuk pintu masuk terapung',
        'navbar: sama ada menyembunyikan bar navigasi atas',
        'qrcode: sama ada menunjukkan butang kod QR chat semasa (1: tunjuk, 0: sembunyi)',
        'threadDetail: sama ada menunjukkan butang butiran perbualan (1: tunjuk, lalai sembunyi)',
        'visitorProfile: sama ada menunjukkan butang profil pelawat (1: tunjuk, lalai sembunyi)',
        'loadHistory: sama ada memuat mesej sesi terdahulu',
        'title: tajuk chat tersuai apabila diaktifkan',
        'browse: JSON konteks browse yang dihantar ke halaman'
      ],
      manualEncodeHint: 'Apabila membina URL secara manual, gunakan encodeURIComponent untuk nickname, avatar, title dan nilai JSON browse.',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      title: 'Demo integrasi pengguna sistem perniagaan pihak ketiga',
      description: 'Hantar data pengguna daripada sistem perniagaan pihak ketiga anda, termasuk visitorUid, nickname, avatar dan medan lain, melalui config supaya ejen boleh mengenal pasti pelawat semasa dengan segera serta mengekalkan konteks perniagaan. Gunakan butang di bawah untuk bertukar antara pengguna contoh sistem perniagaan.',
      switchUser: 'Tukar pengguna',
      switchToUserLabel: 'Tukar ke {{name}}',
      switchAnonymousUserLabel: 'Tukar ke pengguna tanpa nama',
      anonymousUserLabel: 'Pengguna tanpa nama',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname, avatar dan medan lain tidak dihantar.',
      currentUserTitle: 'Pengguna semasa sistem perniagaan',
      currentUserIdLabel: 'ID pengguna',
      currentUidLabel: 'uid',
      currentVisitorUidLabel: 'visitorUid',
      currentUserNicknameLabel: 'Nama paparan',
      contactSupport: 'Hubungi sokongan',
      inviteText: 'Hai, bagaimana kami boleh membantu anda?',
      docLinks: {
        userInfoDoc: 'Lihat dokumentasi integrasi pengguna sistem perniagaan pihak ketiga',
        reactExample: 'Contoh React pengguna sistem perniagaan pihak ketiga',
        vueExample: 'Contoh Vue pengguna sistem perniagaan pihak ketiga'
      },
      controlPanel: {
        title: 'Panel kawalan Bytedesk',
        chatWindow: 'Kawalan tetingkap chat',
        button: 'Kawalan butang',
        bubble: 'Kawalan gelembung',
        invite: 'Kawalan dialog jemputan'
      },
      urlGuideTitle: 'Penggunaan URL penuh tetingkap berasingan semasa + Query',
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
      parameterLabel: 'Parameter',
      currentValueLabel: 'Nilai semasa',
      purposeLabel: 'Tujuan',
      requiredLabel: 'Wajib',
      optionalLabel: 'Pilihan',
      manualEncodeHint: 'Apabila membina rentetan URL secara manual, gunakan encodeURIComponent untuk nickname, avatar, email, note dan extra.',
      switchApiTitle: 'API untuk dipanggil selepas menukar pengguna (embedded sahaja)',
      switchApiDescription: 'Panduan berikut hanya terpakai apabila bytedesk-web SDK diintegrasikan dalam mod embedded. Apabila mengemas kini chatConfig dalam aplikasi anda sendiri, payload pelawat semasa yang dihantar kepada SDK akan berubah, tetapi identiti pelawat masih dicache dalam localStorage. Selepas menukar pengguna, panggil semula API init pelawat supaya SDK boleh membandingkan visitorUid dan menyegarkan identiti yang dicache.',
      switchApiNotes: [
        'Pertukaran pengguna bernama: selepas mengemas kini visitorUid, nickname dan avatar, panggil initVisitor() untuk menyegarkan identiti pelawat yang dicache.',
        'Pertukaran ke pengguna tanpa nama: panggil resetAnonymousVisitor() dahulu untuk mengosongkan visitor UID yang dicache, kemudian panggil initVisitor() untuk memulakan semula pelawat tanpa nama.',
        'Jika anda membuka chat melalui showChat(...), tab baharu atau tetingkap baharu, lakukan selepas pertukaran pengguna diterapkan supaya URL yang dijana sepadan dengan maklumat pengguna terkini.'
      ],
      apiHintPrefix: 'Panggilan API:',
      users: {
        user1: 'Pengguna Xiao Ming',
        user2: 'Pengguna Xiao Hong',
        user3: 'Pengguna Xiao Mei'
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
      ],
      shopGoodsCardTitle: 'Kedai & Produk (senarai ringkas)',
      currentShopLabel: 'Kedai semasa',
      consultGoodsBtn: 'Rujuk produk ini',
      consultParamsLabel: 'Parameter perundingan',
      goodsPayloadCardTitle: 'Payload barang semasa',
      goodsStringifyHint: 'Cara menukar objek barang menjadi rentetan dan hantar ke konfigurasi:',
      urlParamsCardTitle: 'Senarai parameter URL semasa',
      standaloneUrlLabel: 'URL tetingkap berasingan / tab baharu',
      paramNameCol: 'Nama parameter',
      paramValueCol: 'Nilai semasa',
      paramPurposeCol: 'Penerangan',
      requiredLabel: 'Wajib',
      optionalLabel: 'Pilihan',
      goodsUrlHint: 'Cara tambahkan parameter barang ke URL:',
      urlParamPurposes: {
        org: 'Pengenal pasti organisasi (Org UID)',
        t: 'Jenis sesi: t=0 satu-ke-satu, t=1 kumpulan kerja, t=2 bot',
        sid: 'UID ejen / kumpulan kerja / bot',
        visitorUid: 'Pengenal unik pelawat',
        nickname: 'Nama panggilan pelawat',
        avatar: 'URL avatar pelawat',
        goodsInfo: 'Maklumat produk (rentetan JSON), termasuk tajuk, imej, harga, URL. Guna JSON.stringify sebelum menghantar',
        extra: 'Parameter sambungan tersuai (JSON)',
        lang: 'Bahasa antara muka',
        mode: 'Mod tema warna (light / dark / auto)',
      }
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
      ],
      currentDemoUserLabel: 'Demo-user semasa',
      orderListCardTitle: 'Senarai pesanan (ringkas)',
      currentUserLabel: 'Pengguna semasa',
      currentIndicator: '[Semasa]',
      noOrdersText: 'Tiada pesanan untuk pengguna ini',
      consultOrderBtn: 'Rujuk pesanan ini',
      anonymousNoOrderAlert: 'Pengguna tanpa nama tidak mempunyai data pesanan. Perundingan tidak akan mengandungi parameter pesanan.',
      consultParamsLabel: 'Parameter perundingan',
      orderPayloadCardTitle: 'Payload pesanan semasa',
      orderStringifyHint: 'Cara menukar objek pesanan menjadi rentetan dan hantar ke konfigurasi:',
      urlParamsCardTitle: 'Senarai parameter URL semasa',
      standaloneUrlLabel: 'URL tetingkap berasingan / tab baharu',
      paramNameCol: 'Nama parameter',
      paramValueCol: 'Nilai semasa',
      paramPurposeCol: 'Penerangan',
      requiredLabel: 'Wajib',
      optionalLabel: 'Pilihan',
      orderUrlHint: 'Cara tambahkan parameter pesanan ke URL:',
      urlParamPurposes: {
        org: 'Pengenal pasti organisasi (Org UID)',
        t: 'Jenis sesi: t=0 satu-ke-satu, t=1 kumpulan kerja, t=2 bot',
        sid: 'UID ejen / kumpulan kerja / bot',
        visitorUid: 'Pengenal unik pelawat',
        nickname: 'Nama panggilan pelawat',
        avatar: 'URL avatar pelawat',
        orderInfo: 'Maklumat pesanan (rentetan JSON), termasuk ID pesanan, barang, jumlah, alamat penghantaran. Guna JSON.stringify sebelum menghantar',
        extra: 'Parameter sambungan tersuai (JSON)',
        lang: 'Bahasa antara muka',
        mode: 'Mod tema warna (light / dark / auto)',
      }
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
      manualTitle: 'Kawalan lencana manual',
      manualCountLabel: 'Belum dibaca',
      currentBadgeMode: 'Mod lencana semasa',
      badgeModes: {
        hidden: 'Sembunyi',
        dot: 'Titik merah',
        count: 'Nombor'
      },
      docLinks: {
        unreadDoc: 'Lihat panduan integrasi kiraan mesej belum dibaca',
        reactExample: 'Contoh React kiraan belum dibaca',
        vueExample: 'Contoh Vue kiraan belum dibaca'
      },
      buttons: {
        markAllRead: 'Tandakan semua sebagai dibaca',
        refresh: 'Muat semula kiraan belum dibaca',
        applyManualCount: 'Tetapkan kiraan belum dibaca',
        showDot: 'Tunjuk titik merah',
        clearBadge: 'Kosongkan lencana'
      },
      usageNotesTitle: 'Petua',
      usageNotes: [
        'Gunakan getUnreadMessageCount() bila-bila masa anda perlukan jumlah terkini.',
        'Panggil clearUnreadMessages() selepas pelanggan membaca mesej.',
        'Gunakan setUnreadMessageCount(count) untuk menyelaras jumlah belum dibaca daripada sistem perniagaan terus ke butang terapung.',
        'Gunakan showUnreadDot() apabila anda hanya mahu penanda perhatian tanpa memaparkan jumlah sebenar.',
        'Panggil clearUnreadBadge() untuk membuang lencana tanpa menghantar sebarang permintaan rangkaian.'
      ],
      urlGuideTitle: 'Penggunaan URL API + parameter',
      countApiLabel: 'Endpoint kiraan belum dibaca (GET)',
      clearApiLabel: 'Endpoint kosongkan belum dibaca (POST)',
      manualCountApiLabel: 'API tetapan lencana nombor manual',
      showDotApiLabel: 'API titik merah',
      clearBadgeApiLabel: 'API kosongkan lencana',
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
        'setUnreadMessageCount(), showUnreadDot() dan clearUnreadBadge() ialah API lencana tempatan widget dan tidak menghantar permintaan HTTP.',
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
      apiGuide: en.pages.threadHistoryDemo.apiGuide,
      responseGuide: en.pages.threadHistoryDemo.responseGuide,
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
    ticketDemo: {
      ...en.pages.ticketDemo,
      title: 'Demo tiket pelawat',
      description: 'Menunjukkan cara menukar pintu masuk Bytedesk Web SDK ke route sejarah, cipta, status, butiran dan notifikasi dalam visitorTicket untuk kegunaan iframe terbenam.',
      bubbleTitle: 'Pusat tiket',
      bubbleSubtitle: 'Buka route tiket pelawat',
      currentPathLabel: 'Laluan masuk semasa',
      currentPathHint: 'Pintu masuk terapung bertukar antara route /ticket sambil mengekalkan parameter org, sid, pelawat, bahasa dan tema.',
      selectedScenarioTitle: 'Senario tiket',
      detailTicketIdLabel: 'ID tiket untuk route butiran',
      detailTicketIdPlaceholder: 'Masukkan UID tiket sebenar untuk membuka laci butiran secara automatik',
      usageTitle: 'Nota demo',
      buttons: {
        closeTicket: 'Tutup tetingkap tiket'
      },
      docLinks: {
        ...en.pages.ticketDemo.docLinks,
        visitorTicketRef: 'Lihat implementasi route visitorTicket',
        reactExample: 'Sumber demo tiket React'
      }
    },
    ratingDemo: {
      ...en.pages.ratingDemo,
      title: 'Demo penilaian kepuasan pelawat',
      description: 'Menunjukkan cara masuk ke aliran penilaian melalui sejarah perbualan. Kedua-dua senario penilaian tertunda dan penilaian susulan kini menggunakan /chat/thread.',
      bubbleTitle: 'Penilaian perkhidmatan',
      bubbleSubtitle: 'Buka sejarah perbualan berkaitan penilaian'
    },
    platformDemo: {
      ...en.pages.platformDemo,
      title: 'Demo khidmat platform',
      description: 'Menerangkan penggunaan orgUid=df_org_uid sebagai khidmat pelanggan platform, manakala orgUid lain dianggap sebagai khidmat pelanggan kedai. Setiap organisasi juga boleh mempunyai berbilang pintu masuk seperti pra-jualan dan selepas jualan.',
      bubbleTitle: 'Khidmat platform',
      bubbleSubtitle: 'Tukar antara pintu masuk platform dan kedai'
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
    helpcenterDemo: {
      title: 'Demo tab pusat bantuan',
      description: 'Gunakan tabsConfig untuk mengawal beberapa tab bawah dalam tetingkap sokongan tertanam, bertukar antara tetingkap chat, tetingkap sejarah perbualan dan tetingkap dokumen bantuan.',
      controlsTitle: 'Suis tab',
      previewTitle: 'Kelakuan tetingkap tertanam',
      codeTitle: 'Contoh konfigurasi',
      currentChatProfile: 'Parameter chat semasa',
      openChatButton: 'Buka tetingkap chat berbilang tab',
      openHelpcenterButton: 'Buka pusat bantuan sahaja',
      helpHiddenText: 'Tab help dimatikan',
      windowHint: 'Klik butang dan lihat tetingkap tertanam di penjuru kanan bawah. messages membuka chat, thread membuka sejarah perbualan, manakala help membuka dokumen bantuan.',
      embeddedWindowDescription: 'Halaman ini tidak merender Helpcenter visitor secara terus. Ia menunjukkan bagaimana BytedeskConfig.tabsConfig mengubah tab bawah tetingkap tertanam.',
      enabledTabsTitle: 'Tab bawah yang sedang aktif',
      bubbleTitle: 'Buka tetingkap berbilang tab',
      bubbleSubtitle: 'Buka chat untuk cuba tab messages, thread dan help',
      tabs: {
        messages: 'Tab Messages',
        thread: 'Tab Thread',
        help: 'Tab Help',
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
      currentPathHint: 'Route kekal /call; barisan ditentukan oleh chatConfig.sid.',
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
    proactiveDemo: {
      title: 'Demo pemerolehan pelanggan proaktif',
      description: 'Halaman ini disambungkan kepada workflow lalai dan terus masuk ke proses saringan pendidikan, pengesahan keperluan dan pengumpulan maklumat hubungan apabila chat dibuka.',
      tags: {
        mobileValidation: 'Pengesahan nombor telefon',
        multiTurnQa: 'Soal jawab berbilang pusingan'
      },
      alertTitle: 'Aliran pengesahan',
      alertDescription: 'Selepas masuk ke perbualan, workflow akan mengumpul tahap pendidikan dan niat terlebih dahulu, kemudian meminta bandar, senario perundingan dan nombor telefon. Borang tidak akan dihantar jika nombor telefon tidak sepadan dengan format mudah alih China daratan 11 digit. Setiap kali dibuka akan memaksa thread workflow baharu.',
      workflowCardTitle: 'Workflow proaktif lalai',
      workflowCardTag: 'Saringan pendidikan + pengesahan keperluan + pengumpulan hubungan',
      bubbleTitle: 'Pemerolehan pelanggan proaktif',
      bubbleSubtitle: 'Demo pengumpulan lead workflow lalai',
      buttons: {
        openWorkflowChat: 'Buka chat workflow lalai',
        closeChat: 'Tutup tetingkap chat'
      },
      urlParamsTitle: 'Parameter URL workflow',
      urlDescription: 'URL penuh tetingkap berasingan berubah mengikut locale, mod tema dan parameter identiti pelawat. forceNewThread dikekalkan dalam contoh SDK di bawah kerana ia hanya digunakan apabila membuka workflow melalui SDK untuk menjamin thread workflow yang baharu.',
      urlParams: [
        'org: pengecam unik organisasi pemilik workflow',
        't: jenis sesi; 17 bermaksud sesi workflow',
        'sid: pengecam unik workflow yang menentukan workflow lalai yang dibuka',
        'lang: bahasa perbualan mengikut locale demo semasa',
        'mode: mod tema mengikut tetapan cerah atau gelap semasa',
        'navbar: kawalan paparan navigasi atas; 1 bermaksud dipaparkan',
        'visitorUid: pengecam unik pelawat untuk mengikat sejarah pelawat dalam mod dikenal pasti',
        'nickname: nama panggilan pelawat yang dihantar ke halaman chat dalam mod dikenal pasti',
        'avatar: URL avatar pelawat untuk paparan dalam mod dikenal pasti'
      ],
      embedCodeTitle: 'Kod benam semasa',
      embedCodeDescription: 'Kod benam di bawah sepadan dengan konfigurasi sebenar halaman ini dan boleh disalin terus sebagai pintu masuk tetap untuk pengumpulan lead workflow.'
    },
    voiceAgentDemo: {
      title: 'Demo pembantu suara',
      description: 'Halaman ini merujuk kepada pelaksanaan VoiceAgent dalam projek visitor dan menunjukkan cara menghala entri Bytedesk Web SDK terus ke /chat/voice untuk pengalaman suara skrin penuh.',
      bubbleTitle: 'Pembantu suara',
      bubbleSubtitle: 'Tekan dan bercakap atau tukar ke input teks',
      pathAlert: 'Halaman ini menetapkan chatPath kepada /chat/voice. Klik entri terapung, panggil showChat(), atau buka URL terus untuk masuk ke halaman pembantu suara.',
      currentPathLabel: 'Laluan entri semasa',
      currentPathHint: 'Laluan kekal /chat/voice; org / t / sid masih menentukan sasaran sesi.',
      anonymousUserHint: 'Mod ujian tanpa nama: visitorUid, nickname dan avatar tidak dihantar',
      recommendedProfileNotice: 'Konfigurasi bot disyorkan untuk mensimulasikan senario pembantu suara, tetapi anda juga boleh menggunakan org / t / sid semasa untuk sasaran lain.',
      capabilityTitle: 'Keupayaan yang selari dengan halaman voice visitor',
      capabilityItems: [
        'Paparan status masa nyata untuk ready, connecting, listening, processing dan error.',
        'Dua mod input: tekan untuk bercakap atau tukar kepada input teks sebagai sandaran.',
        'Aliran mesej memaparkan mesej pengguna, balasan AI dan draf pembantu.',
        'Lapisan rakaman menunjukkan tahap suara, masa rakaman dan petunjuk operasi.'
      ],
      usageTitle: 'Nota demo',
      usageNotes: [
        '1. Kekalkan htmlUrl sebagai alamat akar laman dan tukar chatPath sahaja kepada /chat/voice.',
        '2. Butang terapung masih menggunakan action chat, jadi tiada jenis action SDK baharu diperlukan.',
        '3. Popup, tab baharu dan widget iframe semuanya berkongsi set parameter URL yang sama.',
        '4. visitorUid / nickname / avatar disyorkan supaya identiti pelawat dapat dipaparkan pada halaman suara.'
      ],
      urlGuideTitle: 'Panduan URL + parameter',
      sampleUrlLabel: 'Contoh URL daripada konfigurasi semasa',
      urlParamsTitle: 'Rujukan parameter',
      urlParams: [
        'org: ID organisasi (wajib)',
        't: jenis sesi (0: 1-ke-1, 1: kumpulan kerja, 2: bot)',
        'sid: ID sasaran sesi (ejen / kumpulan kerja / bot)',
        'visitorUid: ID pelawat tersuai (disyorkan)',
        'nickname / avatar: profil pelawat (pilihan)',
        'lang: bahasa',
        'mode: mod tema (light / dark / system)',
        'navbar: sama ada memaparkan bar navigasi halaman suara'
      ],
      buttons: {
        openVoiceAgent: 'Buka pembantu suara',
        switchAnonymousUser: 'Tukar ke pengguna tanpa nama'
      },
      docLinks: {
        reactDoc: 'Lihat dokumentasi integrasi React',
        vueDoc: 'Lihat dokumentasi integrasi Vue',
        reactExample: 'Kod sumber demo pembantu suara React'
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