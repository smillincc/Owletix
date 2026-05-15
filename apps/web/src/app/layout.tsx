import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Owletix — Lawful Live Aerial Visibility',
  description: 'Connect with verified drone pilots for live aerial views.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0a0f1e', color: 'white', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
