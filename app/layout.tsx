import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '澤田慶仁 オフィシャルサイト',
  description: '津軽三味線奏者・歌手 澤田慶仁の公式サイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
