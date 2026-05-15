import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0f1e', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦉</div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Owletix
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '1rem' }}>
          Lawful Live Aerial Visibility Marketplace
        </p>
        <p style={{ color: '#6b7280', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Connect with verified drone pilots for live aerial views of approved public spaces and authorized properties. Safe, lawful, transparent.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { icon: '✅', title: 'Verified Pilots', desc: 'FAA Part 107 certified pilots only' },
            { icon: '🔒', title: 'Lawful Only', desc: 'Approved public zones and authorized properties' },
            { icon: '📡', title: 'Live Streaming', desc: 'Real-time aerial views via secure stream' },
          ].map((f) => (
            <div key={f.title} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <Link href="/auth/signup" style={{ padding: '0.75rem 2rem', backgroundColor: '#2563eb', borderRadius: '0.5rem', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
            Get Started
          </Link>
          <Link href="/auth/login" style={{ padding: '0.75rem 2rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link href="/zones" style={{ padding: '0.75rem 2rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
            Browse Zones
          </Link>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.5rem', color: '#fcd34d', fontSize: '0.875rem' }}>
          ⚠️ Owletix is strictly for lawful aerial visibility only. Surveillance, tracking, or any illegal use is prohibited and will result in immediate account termination.
        </div>
      </div>
    </main>
  );
}
