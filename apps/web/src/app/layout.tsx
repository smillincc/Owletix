import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Owletix — Lawful Live Aerial Visibility',
  description: 'Connect with verified drone pilots for live aerial views of approved public spaces.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
