import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
} 