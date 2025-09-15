/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:30
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 10:31:27
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LocalDemo from './pages/LocalDemo';  // 原有的演示页面
// import OnlineDemo from './pages/OnlineDemo';  // 新的在线演示页面
import React from 'react';
import VipLevelDemo from './pages/vipLevelDemo';
import GoodsInfoDemo from './pages/goodsInfoDemo';
import OrderInfoDemo from './pages/orderInfoDemo';
import UserInfoDemo from './pages/userInfoDemo';
import UnreadCountDemo from './pages/unreadCountDemo';
import DocumentFeedbackDemo from './pages/DocumentFeedbackDemo';

function App() {
  return (
    <Router basename="/reactdemo">
      <AppContent />
    </Router>
  );
}

// 将内容提取到单独的组件中，这样就可以使用hooks
function AppContent() {
  const location = useLocation();
  
  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return { 
      marginRight: '20px', 
      textDecoration: 'none',
      color: isActive ? '#1890ff' : 'inherit',
      fontWeight: isActive ? 'bold' : 'normal',
    };
  };

  return (
    <div>
      <nav style={{
        padding: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <Link to="/" style={getLinkStyle('/')}>基本配置</Link>
        <Link to="/userInfo" style={getLinkStyle('/userInfo')}>用户信息对接</Link>
        <Link to="/goodsInfo" style={getLinkStyle('/goodsInfo')}>商品信息对接</Link>
        <Link to="/orderInfo" style={getLinkStyle('/orderInfo')}>订单信息对接</Link>
        <Link to="/vipLevel" style={getLinkStyle('/vipLevel')}>千人千面对接</Link>
        <Link to="/unreadCount" style={getLinkStyle('/unreadCount')}>未读消息数对接</Link>
        <Link to="/documentFeedback" style={getLinkStyle('/documentFeedback')}>📝 文档反馈演示</Link>
          {/* <Link to="/online">Online Demo</Link> */}
        </nav>

        <Routes>
          <Route path="/" element={<LocalDemo />} />
          <Route path="/userInfo" element={<UserInfoDemo />} />
          <Route path="/orderInfo" element={<OrderInfoDemo />} />
          <Route path="/goodsInfo" element={<GoodsInfoDemo />} />
          <Route path="/vipLevel" element={<VipLevelDemo />} />
          <Route path="/unreadCount" element={<UnreadCountDemo />} />
          <Route path="/documentFeedback" element={<DocumentFeedbackDemo />} />
          {/* <Route path="/online" element={<OnlineDemo />} /> */}
        </Routes>
      </div>
  );
}

export default App; 