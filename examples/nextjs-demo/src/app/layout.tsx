import type { Metadata } from 'next';
import './globals.css';
import NavBar from '../components/NavBar';

export const metadata: Metadata = {
  title: 'Bytedesk Next.js Demo',
  description: 'Demo for Bytedesk Next.js integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ padding: 24 }}>{children}</main>
        <footer style={{ background: '#fff', borderTop: '1px solid #e8e8e8', padding: '12px 24px', textAlign: 'center', fontSize: 12 }}>
          <a href="https://www.weiyuai.cn/" target="_blank" rel="noreferrer" style={{ color: '#333' }}>微语官网</a>
          <span style={{ marginLeft: 8, color: '#999' }}>v3.0.0</span>
        </footer>
      </body>
    </html>
  );
} 