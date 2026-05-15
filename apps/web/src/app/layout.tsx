import type { Metadata } from 'next';

export const metadata = {
  title: 'Owletix — Lawful Live Aerial Visibility',
  description: 'Book verified drone pilots for live aerial views.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
