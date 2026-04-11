import { en } from './en';

export const thTh = {
  ...en,
  common: {
    ...en.common,
    languageLabel: 'ภาษา',
    languageOptions: {
      ...en.common.languageOptions,
      en: 'อังกฤษ',
      'zh-cn': 'จีนตัวย่อ',
      'zh-tw': 'จีนตัวเต็ม',
      'ja-jp': 'ญี่ปุ่น',
      'ko-kr': 'เกาหลี',
      'vi-vn': 'เวียดนาม',
      'ms-my': 'มาเลย์',
      'es-es': 'สเปน',
      'fr-fr': 'ฝรั่งเศส',
      'th-th': 'ไทย (ประเทศไทย)'
    },
    themeLabel: 'โหมดธีม',
    themeOptions: {
      light: 'สว่าง',
      dark: 'มืด',
      system: 'ตามระบบ'
    },
    officialSiteLabel: 'เว็บไซต์ทางการ Bytedesk',
    resetAnonymousVisitorLabel: 'รีเซ็ตผู้เยี่ยมชมแบบไม่ระบุตัวตน',
    resetAnonymousVisitorSuccess: 'รีเซ็ตผู้เยี่ยมชมแบบไม่ระบุตัวตนแล้ว'
  },
  nav: {
    ...en.nav,
    basicDemo: '⚙️ ตั้งค่าพื้นฐาน',
    userInfoDemo: '👤 ข้อมูลผู้ใช้',
    goodsInfoDemo: '🛒 ข้อมูลสินค้า',
    orderInfoDemo: '📦 ข้อมูลคำสั่งซื้อ',
    vipLevelDemo: '👑 การปรับแต่ง',
    unreadCountDemo: '🔔 ตัวนับยังไม่อ่าน',
    threadHistoryDemo: '🧵 ประวัติการสนทนา',
    webrtcDemo: '📹 เดโม WebRTC',
    callCenterDemo: '📞 คอลเซ็นเตอร์',
    proactiveDemo: '🎯 เข้าถึงเชิงรุก',
    documentFeedbackDemo: '📝 ความคิดเห็นเอกสาร'
  },
  pages: {
    ...en.pages,
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'การตั้งค่าพื้นฐาน Bytedesk',
      intro: 'ใช้ปุ่มลัดด้านล่างเพื่อทดลองฟีเจอร์หลักของ Bytedesk Web SDK',
      currentConfigTitle: 'การตั้งค่าปัจจุบัน',
      copyConfig: 'คัดลอก JSON การตั้งค่า'
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'เดโมการเชื่อมต่อข้อมูลผู้ใช้'
    },
    goodsInfoDemo: {
      ...en.pages.goodsInfoDemo,
      title: 'เดโมการเชื่อมต่อข้อมูลสินค้า'
    },
    orderInfoDemo: {
      ...en.pages.orderInfoDemo,
      title: 'เดโมการเชื่อมต่อข้อมูลคำสั่งซื้อ'
    },
    vipLevelDemo: {
      ...en.pages.vipLevelDemo,
      title: 'เดโมการปรับแต่งผู้ใช้'
    },
    unreadCountDemo: {
      ...en.pages.unreadCountDemo,
      title: 'เดโมตัวนับข้อความยังไม่อ่าน'
    },
    threadHistoryDemo: {
      ...en.pages.threadHistoryDemo,
      title: 'เดโมประวัติการสนทนา'
    },
    callCenterDemo: {
      ...en.pages.callCenterDemo,
      title: 'เดโมคอลเซ็นเตอร์'
    }
  }
};
