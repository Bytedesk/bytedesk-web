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

// 创建路由
const router = createRouter({
  history: createWebHistory('/vuedemo'),
  routes: [
    { path: '/', component: LocalDemo },
    { path: '/userInfo', component: UserInfoDemo },
    { path: '/goodsInfo', component: GoodsInfoDemo },
    { path: '/orderInfo', component: OrderInfoDemo },
    { path: '/vipLevel', component: VipLevelDemo },
    { path: '/unreadCount', component: UnreadCountDemo }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')