import { en } from './en';
import { zhCn } from './zh-cn';

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
      'th-th': 'ไทย'
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
    proactiveDemo: {
      ...en.pages.proactiveDemo,
      title: 'เดโมเข้าถึงลูกค้าเชิงรุก',
      description: 'หน้านี้เชื่อมต่อกับเวิร์กโฟลว์เริ่มต้น และเมื่อเปิดแชตจะเข้าสู่ขั้นตอนคัดกรองการศึกษา ยืนยันความต้องการ และเก็บข้อมูลติดต่อทันที',
      tags: {
        mobileValidation: 'ตรวจสอบเบอร์มือถือ',
        multiTurnQa: 'ถามตอบหลายรอบ'
      },
      alertTitle: 'เส้นทางการตรวจสอบ',
      alertDescription: 'เมื่อเข้าสู่บทสนทนา เวิร์กโฟลว์จะเก็บระดับการศึกษาและความต้องการก่อน จากนั้นจึงถามเมือง สถานการณ์การปรึกษา และหมายเลขมือถือ หากหมายเลขไม่ตรงรูปแบบมือถือจีนแผ่นดินใหญ่ 11 หลัก แบบฟอร์มจะไม่ถูกส่ง และทุกครั้งที่เปิดจะบังคับสร้างเธรดเวิร์กโฟลว์ใหม่',
      workflowCardTitle: 'เวิร์กโฟลว์เชิงรุกเริ่มต้น',
      workflowCardTag: 'คัดกรองการศึกษา + ยืนยันความต้องการ + เก็บข้อมูลติดต่อ',
      bubbleTitle: 'เข้าถึงลูกค้าเชิงรุก',
      bubbleSubtitle: 'เดโมเก็บลีดด้วยเวิร์กโฟลว์เริ่มต้น',
      buttons: {
        openWorkflowChat: 'เปิดแชตเวิร์กโฟลว์เริ่มต้น',
        closeChat: 'ปิดหน้าต่างแชต'
      },
      urlParamsTitle: 'พารามิเตอร์ URL ของเวิร์กโฟลว์',
      urlDescription: 'URL เต็มของหน้าต่างแยกจะเปลี่ยนตาม locale โหมดธีม และพารามิเตอร์ตัวตนของผู้เยี่ยมชม โดย forceNewThread จะคงไว้ในตัวอย่าง SDK ด้านล่าง เพราะใช้เฉพาะตอนเปิดเวิร์กโฟลว์ผ่าน SDK เพื่อรับประกันว่าเป็นเธรดใหม่',
      urlParams: [
        'org: ตัวระบุเฉพาะขององค์กรเจ้าของเวิร์กโฟลว์',
        't: ประเภทเซสชัน โดย 17 หมายถึงเซสชันเวิร์กโฟลว์',
        'sid: ตัวระบุเวิร์กโฟลว์ที่กำหนดว่าจะเปิดเวิร์กโฟลว์ใดเป็นค่าเริ่มต้น',
        'lang: ภาษาการสนทนาตาม locale ปัจจุบันของเดโม',
        'mode: โหมดธีมตามการตั้งค่าสว่างหรือมืดปัจจุบัน',
        'navbar: ควบคุมการแสดงแถบนำทางด้านบน โดย 1 คือแสดง',
        'visitorUid: ตัวระบุผู้เยี่ยมชมสำหรับผูกประวัติในโหมดระบุตัวตน',
        'nickname: ชื่อเล่นผู้เยี่ยมชมที่ส่งไปยังหน้าแชตในโหมดระบุตัวตน',
        'avatar: URL รูปประจำตัวที่ใช้แสดงในโหมดระบุตัวตน'
      ],
      embedCodeTitle: 'โค้ดฝังปัจจุบัน',
      embedCodeDescription: 'โค้ดฝังด้านล่างตรงกับการตั้งค่าจริงของหน้านี้ และคัดลอกไปใช้เป็นทางเข้าคงที่สำหรับเก็บลีดจากเวิร์กโฟลว์ได้ทันที'
    },
    voiceAgentDemo: {
      ...en.pages.voiceAgentDemo,
      title: 'เดโมผู้ช่วยเสียง'
    },
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'การตั้งค่าพื้นฐาน Bytedesk',
      intro: 'ใช้ปุ่มลัดด้านล่างเพื่อทดลองฟีเจอร์หลักของ Bytedesk Web SDK',
      currentConfigTitle: 'การตั้งค่าปัจจุบัน',
      copyConfig: 'คัดลอก JSON การตั้งค่า',
      fieldDocs: zhCn.pages.basicDemo.fieldDocs
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'เดโมการเชื่อมต่อผู้ใช้จากระบบธุรกิจบุคคลที่สาม'
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
