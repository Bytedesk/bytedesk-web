/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:27:53
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 12:21:21
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import BytedeskWeb from '@bytedesk/web/main'

const bytedesk = new BytedeskWeb({
  isDebug: true, // 开启调试模式，可以看到访客初始化的日志
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://cdn.weiyuai.cn/chat',
  chatConfig: {
    org: 'your-org-uid', // 替换为你的组织UID
    t: '2',
    sid: 'your-session-id', // 替换为你的会话ID
    uid: 'custom-visitor-uid', // 可选：自定义访客UID
    name: '访客姓名', // 可选：访客姓名
    avatar: 'https://example.com/avatar.jpg', // 可选：访客头像
    extra: { // 可选：额外信息
      source: 'website',
      page: window.location.href
    }
  },
  onVisitorInfo: (uid, visitorUid) => {
    console.log('访客信息已初始化:', { uid, visitorUid });
  }
})

// 初始化（会自动调用访客初始化，优先使用本地缓存）
bytedesk.init()

// 也可以手动调用访客初始化（优先使用本地缓存）
// bytedesk.initVisitor().then(result => {
//   console.log('手动初始化访客结果:', result);
// })

// 强制重新初始化（忽略本地缓存）
// bytedesk.forceInitVisitor().then(result => {
//   console.log('强制重新初始化结果:', result);
// })

// 清除本地访客信息
// bytedesk.clearVisitorInfo()

// 手动发送浏览记录
// bytedesk.browseVisitor().then(() => {
//   console.log('浏览记录发送成功');
// }).catch(error => {
//   console.error('浏览记录发送失败:', error);
// })

document.querySelector('#chat-button').addEventListener('click', () => {
  bytedesk.showChat()
})

document.querySelector('#force-init-button').addEventListener('click', () => {
  bytedesk.forceInitVisitor().then(result => {
    console.log('强制重新初始化结果:', result);
    alert('强制重新初始化完成！');
  }).catch(error => {
    console.error('强制重新初始化失败:', error);
    alert('强制重新初始化失败！');
  });
})

document.querySelector('#clear-cache-button').addEventListener('click', () => {
  bytedesk.clearVisitorInfo();
  console.log('本地访客信息已清除');
  alert('本地访客信息已清除！');
})

// 添加手动发送浏览记录的按钮事件
document.querySelector('#browse-button').addEventListener('click', () => {
  bytedesk.browseVisitor().then(() => {
    console.log('浏览记录发送成功');
    alert('浏览记录发送成功！');
  }).catch(error => {
    console.error('浏览记录发送失败:', error);
    alert('浏览记录发送失败！');
  });
})

// 监听页面变化，自动发送浏览记录
let currentUrl = window.location.href;
let currentTitle = document.title;

// 监听 URL 变化（适用于 SPA 应用）
const observer = new MutationObserver(() => {
  if (window.location.href !== currentUrl || document.title !== currentTitle) {
    currentUrl = window.location.href;
    currentTitle = document.title;
    
    // 延迟发送，确保页面完全加载
    setTimeout(() => {
      bytedesk.browseVisitor().then(() => {
        console.log('页面变化，浏览记录已发送');
      }).catch(error => {
        console.error('页面变化时发送浏览记录失败:', error);
      });
    }, 1000);
  }
});

// 开始监听 DOM 变化
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 监听浏览器前进后退
window.addEventListener('popstate', () => {
  setTimeout(() => {
    bytedesk.browseVisitor().then(() => {
      console.log('浏览器导航，浏览记录已发送');
    }).catch(error => {
      console.error('浏览器导航时发送浏览记录失败:', error);
    });
  }, 1000);
}); 