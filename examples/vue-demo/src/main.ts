import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 页面组件
import LocalDemo from './pages/LocalDemo.vue'
import UserInfoDemo from './pages/UserInfoDemo.vue'
import GoodsInfoDemo from './pages/GoodsInfoDemo.vue'
import OrderInfoDemo from './pages/OrderInfoDemo.vue'
import VipLevelDemo from './pages/VipLevelDemo.vue'
import UnreadCountDemo from './pages/unreadCountDemo.vue'
import TicketDemo from './pages/TicketDemo.vue'
import RatingDemo from './pages/RatingDemo.vue'
import PlatformDemo from './pages/PlatformDemo.vue'
import ThreadHistoryDemo from './pages/ThreadHistoryDemo.vue'
import ProactiveDemo from './pages/ProactiveDemo.vue'
import VoiceAgentDemo from './pages/VoiceAgentDemo.vue'
import WebrtcDemo from './pages/WebrtcDemo.vue'
import CallCenterDemo from './pages/CallCenterDemo.vue'
import DocFeedbackDemo from './pages/DocFeedbackDemo.vue'
import HelpcenterDemo from './pages/HelpcenterDemo.vue'

// 创建路由
const router = createRouter({
  history: createWebHistory('/vuedemo'),
  routes: [
    { path: '/', component: LocalDemo },
    { path: '/userInfo', component: UserInfoDemo },
    { path: '/goodsInfo', component: GoodsInfoDemo },
    { path: '/orderInfo', component: OrderInfoDemo },
    { path: '/vipLevel', component: VipLevelDemo },
    { path: '/unreadCount', component: UnreadCountDemo },
    { path: '/ticket', component: TicketDemo },
    { path: '/rating', component: RatingDemo },
    { path: '/platform', component: PlatformDemo },
    { path: '/threadHistory', component: ThreadHistoryDemo },
    { path: '/proactive', component: ProactiveDemo },
    { path: '/voiceagent', component: VoiceAgentDemo },
    { path: '/webrtcDemo', component: WebrtcDemo },
    { path: '/callCenter', component: CallCenterDemo },
    { path: '/documentFeedback', component: DocFeedbackDemo },
    { path: '/helpcenter', component: HelpcenterDemo },
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')