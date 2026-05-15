import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Owletix',
  description: 'Lawful Live Aerial Visibility Marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0a0f1e', color: 'white', margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
