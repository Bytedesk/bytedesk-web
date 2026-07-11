'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { path: '/', label: '基本设置' },
  { path: '/userInfo', label: '用户信息对接' },
  { path: '/vipLevel', label: '千人千面' },
  { path: '/goodsInfo', label: '商品信息' },
  { path: '/orderInfo', label: '订单信息' },
  { path: '/ticket', label: '工单' },
  { path: '/rating', label: '满意度评价' },
  { path: '/platform', label: '平台客服' },
  { path: '/proactive', label: '主动会话' },
  { path: '/webrtcDemo', label: 'WebRTC' },
  { path: '/unreadCount', label: '未读消息' },
  { path: '/threadHistory', label: '历史会话' },
  { path: '/voiceagent', label: '语音客服' },
  { path: '/callCenter', label: '呼叫中心' },
  { path: '/documentFeedback', label: '文档反馈' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      padding: '12px 24px',
      background: '#fff',
      borderBottom: '1px solid #e8e8e8',
      position: 'sticky',
      top: 0,
      zIndex: 999,
    }}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: pathname === item.path ? 600 : 500,
            color: pathname === item.path ? '#1677ff' : '#333',
            background: pathname === item.path ? '#e6f4ff' : 'transparent',
            transition: 'all 0.2s',
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
