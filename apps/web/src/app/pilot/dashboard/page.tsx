'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PilotDashboard() {
  const [user, setUser] = useState(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    if (u) setUser(JSON.parse(u));
    else window.location.href = '/auth/login';
  }, []);

  const MISSIONS = [
    { id: '1', zone: 'Griffith Park', city: 'Los Angeles, CA', status: 'ACCEPTED', customer: 'Alex M.', date: 'Today 3:00 PM', amount: '$25.00', duration: '25 min' },
    { id: '2', zone: 'Santa Monica Pier', city: 'Los Angeles, CA', status: 'COMPLETED', customer: 'Sarah K.', date: 'May 14', amount: '$18.00', duration: '18 min' },
    { id: '3', zone: 'Balboa Park', city: 'San Diego, CA', status: 'COMPLETED', customer: 'Mike R.', date: 'May 13', amount: '$32.00', duration: '32 min' },
  ];

  const STATUS = {
    ACCEPTED: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', label: 'Upcoming' },
    LIVE: { color: '#34d399', bg: 'rgba(52,211,153,0.15)', label: 'Live' },
    COMPLETED: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', label: 'Completed' },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050508', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px', backgroundColor: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
        </Link>
        {[
          { icon: '📊', label: 'Dashboard', href: '/pilot/dashboard', active: true },
          { icon: '🗺️', label: 'Available Jobs', href: '/missions/available', active: false },
          { icon: '📋', label: 'My Flights', href: '/mission-history', active: false },
          { icon: '💰', label: 'Earnings', href: '/pilot/earnings', active: false },
          { icon: '👤', label: 'My Profile', href: '/pilot/onboarding', active: false },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#fff' : 'rgba(255,255,255,0.45)', backgroundColor: item.active ? 'rgba(6,182,212,0.15)' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.25rem' }}>
            <span>{item.icon}</span>{item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.2rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>Verified Pilot ✓</p>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '220px', padding: '2.5rem', flex: 1 }}>
        {/* Header + availability toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>Pilot Dashboard 🚁</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Manage your flights and earnings</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1rem 1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.1rem' }}>{available ? '🟢 Available for jobs' : '⚫ Off duty'}</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{available ? 'You\'ll receive mission requests' : 'You won\'t receive requests'}</p>
            </div>
            <button onClick={() => setAvailable(!available)} style={{ width: '48px', height: '26px', borderRadius: '13px', backgroundColor: available ? '#06b6d4' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', top: '3px', left: available ? '25px' : '3px', width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', display: 'block' }}></span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🛫', label: 'Total Flights', value: '47', sub: '+3 this week' },
            { icon: '💰', label: 'Total Earned', value: '$823', sub: '70% commission' },
            { icon: '⭐', label: 'Rating', value: '4.97', sub: '44 reviews' },
            { icon: '⏱️', label: 'Flight Hours', value: '18.5h', sub: 'This month' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(6,182,212,0.8)', marginTop: '0.4rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Earnings card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.08))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '1.25rem', padding: '2rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Pending payout</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.04em' }}>$247.50</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Processes every Friday · Next: May 16</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>This month</p>
            <p style={{ fontSize: '1.75rem', fontWeight: '800' }}>$412.00</p>
            <p style={{ color: '#06b6d4', fontSize: '0.8rem', marginTop: '0.25rem' }}>↑ 23% vs last month</p>
          </div>
        </div>

        {/* Upcoming + recent missions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Your missions</h2>
            <Link href="/mission-history" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MISSIONS.map(m => {
              const cfg = STATUS[m.status] || STATUS.COMPLETED;
              return (
                <div key={m.id} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '0.95rem' }}>{m.zone}</h3>
                      <span style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>{cfg.label}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{m.city} · {m.date} · Customer: {m.customer}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', fontSize: '0.9rem', color: '#06b6d4' }}>{m.amount}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{m.duration}</p>
                  </div>
                  {m.status === 'ACCEPTED' && (
                    <Link href="/missions/live" style={{ backgroundColor: '#06b6d4', color: '#000', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '980px', fontSize: '0.8rem', fontWeight: '700' }}>Start Flight</Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
