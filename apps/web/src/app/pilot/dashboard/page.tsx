'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MISSIONS = [
  { id: '1', zone: 'Griffith Park', city: 'Los Angeles, CA', status: 'ACCEPTED', customer: 'Alex M.', date: 'Today 3:00 PM', amount: '$25.00', duration: '25 min' },
  { id: '2', zone: 'Santa Monica Pier', city: 'Los Angeles, CA', status: 'COMPLETED', customer: 'Sarah K.', date: 'May 14', amount: '$18.00', duration: '18 min' },
  { id: '3', zone: 'Balboa Park', city: 'San Diego, CA', status: 'COMPLETED', customer: 'Mike R.', date: 'May 13', amount: '$32.00', duration: '32 min' },
];

const STATUS = {
  ACCEPTED: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Upcoming' },
  LIVE: { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', label: 'Live' },
  COMPLETED: { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', label: 'Completed' },
};

const NAV = [
  { icon: '⊞', label: 'Dashboard', href: '/pilot/dashboard', active: true },
  { icon: '🗺', label: 'Available Jobs', href: '/missions/available', active: false },
  { icon: '📋', label: 'My Flights', href: '/mission-history', active: false },
  { icon: '💰', label: 'Earnings', href: '/pilot/earnings', active: false },
  { icon: '👤', label: 'My Profile', href: '/pilot/onboarding', active: false },
];

export default function PilotDashboard() {
  const [user, setUser] = useState(null);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    if (u) setUser(JSON.parse(u));
    else window.location.href = '/auth/login';
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '230px', backgroundColor: '#fff', borderRight: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
        </Link>
        {NAV.map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#06b6d4' : '#6e6e73', backgroundColor: item.active ? '#ecfeff' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.2rem' }}>
            <span>{item.icon}</span>{item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#f5f5f7', borderRadius: '0.875rem', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f' }}>{user?.firstName} {user?.lastName}</p>
            <span style={{ fontSize: '0.65rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '980px', padding: '0.1rem 0.4rem', fontWeight: '600' }}>Pilot</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73', marginBottom: '0.625rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: '#6e6e73', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '230px', padding: '2.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.2rem' }}>Pilot Dashboard 🚁</h1>
            <p style={{ color: '#6e6e73', fontSize: '0.875rem' }}>Manage your flights and earnings</p>
          </div>
          {/* Availability toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '0.875rem', padding: '0.875rem 1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div>
              <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.1rem' }}>{available ? '🟢 Available' : '⚫ Off duty'}</p>
              <p style={{ fontSize: '0.72rem', color: '#6e6e73' }}>{available ? 'Receiving job requests' : 'Not receiving requests'}</p>
            </div>
            <button onClick={() => setAvailable(!available)} style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: available ? '#06b6d4' : '#d1d5db', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <span style={{ position: 'absolute', top: '2px', left: available ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.2s', display: 'block', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🛫', label: 'Total Flights', value: '47', sub: '+3 this week' },
            { icon: '💰', label: 'Total Earned', value: '$823', sub: '70% commission' },
            { icon: '⭐', label: 'Rating', value: '4.97', sub: '44 reviews' },
            { icon: '⏱', label: 'Flight Hours', value: '18.5h', sub: 'This month' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '1rem', padding: '1.375rem', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.375rem', marginBottom: '0.625rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.15rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#06b6d4', marginTop: '0.3rem', fontWeight: '500' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Earnings card */}
        <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)', borderRadius: '1.25rem', padding: '1.875rem 2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.825rem', marginBottom: '0.4rem' }}>Pending payout</p>
            <p style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.04em', color: '#fff' }}>$247.50</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.775rem', marginTop: '0.2rem' }}>Processes every Friday · Next: May 16</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.825rem', marginBottom: '0.4rem' }}>This month</p>
            <p style={{ fontSize: '1.625rem', fontWeight: '800', color: '#fff' }}>$412.00</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.775rem', marginTop: '0.2rem' }}>↑ 23% vs last month</p>
          </div>
        </div>

        {/* Missions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f' }}>Your missions</h2>
            <Link href="/mission-history" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {MISSIONS.map(m => {
              const cfg = STATUS[m.status] || STATUS.COMPLETED;
              return (
                <div key={m.id} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '0.875rem', padding: '1.125rem 1.375rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.2rem' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1d1d1f' }}>{m.zone}</h3>
                      <span style={{ backgroundColor: cfg.bg, color: cfg.color, border: '1px solid ' + cfg.border, fontSize: '0.68rem', fontWeight: '600', padding: '0.15rem 0.55rem', borderRadius: '980px' }}>{cfg.label}</span>
                    </div>
                    <p style={{ fontSize: '0.775rem', color: '#6e6e73' }}>{m.city} · {m.date} · Customer: {m.customer}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.875rem', color: '#06b6d4' }}>{m.amount}</p>
                    <p style={{ fontSize: '0.72rem', color: '#6e6e73' }}>{m.duration}</p>
                  </div>
                  {m.status === 'ACCEPTED' && <Link href="/missions/live" style={{ backgroundColor: '#06b6d4', color: '#fff', textDecoration: 'none', padding: '0.45rem 0.875rem', borderRadius: '980px', fontSize: '0.775rem', fontWeight: '700' }}>Start Flight</Link>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
