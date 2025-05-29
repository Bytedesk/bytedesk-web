/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:30
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-05-29 13:54:24
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LocalDemo from './pages/LocalDemo';  // 原有的演示页面
// import OnlineDemo from './pages/OnlineDemo';  // 新的在线演示页面
import React from 'react';
import VipLevelDemo from './pages/vipLevelDemo';
import GoodsInfoDemo from './pages/goodsInfoDemo';
import OrderInfoDemo from './pages/orderInfoDemo';
import UserInfoDemo from './pages/userInfoDemo';

function App() {
  return (
    <Router basename="/reactdemo">
      <div>
        <nav style={{
          padding: '20px',
          borderBottom: '1px solid #eee'
        }}>
          <Link to="/" style={{ marginRight: '20px' }}>基本配置</Link>
          <Link to="/userinfo" style={{ marginRight: '20px' }}>用户信息对接</Link>
          <Link to="/goodsinfo" style={{ marginRight: '20px' }}>商品信息对接</Link>
          <Link to="/orderinfo" style={{ marginRight: '20px' }}>订单信息对接</Link>
          <Link to="/viplevel" style={{ marginRight: '20px' }}>千人千面对接</Link>
          {/* <Link to="/online">Online Demo</Link> */}
        </nav>

        <Routes>
          <Route path="/" element={<LocalDemo />} />
          <Route path="/userinfo" element={<UserInfoDemo />} />
          <Route path="/orderinfo" element={<OrderInfoDemo />} />
          <Route path="/goodsinfo" element={<GoodsInfoDemo />} />
          <Route path="/viplevel" element={<VipLevelDemo />} />
          {/* <Route path="/online" element={<OnlineDemo />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 