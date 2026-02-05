import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'TVTS Quảng Trị 2026 - Ngày Hội Tư Vấn Tuyển Sinh',
  description: 'Ngày Hội Tư Vấn Tuyển Sinh - Định Hướng Nghề Nghiệp Quảng Trị 2026',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TVTS Quảng Trị',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E7000B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <main className="mobile-container min-h-screen bg-gray-50">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
