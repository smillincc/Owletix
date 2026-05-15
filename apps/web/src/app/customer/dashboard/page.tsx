'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MISSIONS = [
  { id: '1', zone: 'Griffith Park', city: 'Los Angeles, CA', status: 'COMPLETED', date: 'May 14, 2026', duration: '25 min', amount: '$25.00', pilot: 'James K.' },
  { id: '2', zone: 'Santa Monica Pier', city: 'Los Angeles, CA', status: 'LIVE', date: 'Today', duration: 'Live now', amount: '$0.00', pilot: 'Maria S.' },
  { id: '3', zone: 'Golden Gate Park', city: 'San Francisco, CA', status: 'PAYMENT_AUTHORIZED', date: 'May 16, 2026', duration: 'Pending', amount: '$30.00 hold', pilot: 'Pending' },
];

const STATUS = {
  LIVE: { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', label: 'Live Now' },
  COMPLETED: { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', label: 'Completed' },
  PAYMENT_AUTHORIZED: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Scheduled' },
  CANCELLED: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'Cancelled' },
};

const NAV = [
  { icon: '⊞', label: 'Dashboard', href: '/customer/dashboard', active: true },
  { icon: '🗺', label: 'Browse Zones', href: '/zones', active: false },
  { icon: '📋', label: 'My Missions', href: '/mission-history', active: false },
  { icon: '🏠', label: 'Property Auth', href: '/property-authorization/new', active: false },
  { icon: '✅', label: 'Verify ID', href: '/verify-identity', active: false },
  { icon: '⚙', label: 'Settings', href: '/settings', active: false },
];

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    if (u) setUser(JSON.parse(u));
    else window.location.href = '/auth/login';
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '230px', backgroundColor: '#fff', borderRight: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
        </Link>
        {NAV.map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#6366f1' : '#6e6e73', backgroundColor: item.active ? '#f0f0ff' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1rem' }}>{item.icon}</span>{item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#f5f5f7', borderRadius: '0.875rem', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.15rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize: '0.75rem', color: '#6e6e73', marginBottom: '0.625rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: '#6e6e73', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '230px', padding: '2.5rem', flex: 1, maxWidth: 'calc(100vw - 230px)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.2rem' }}>Good {greeting}, {user?.firstName || 'there'} 👋</h1>
          <p style={{ color: '#6e6e73', fontSize: '0.875rem' }}>Here is what is happening with your aerial views</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🛫', label: 'Total Flights', value: '3', sub: '+1 this month' },
            { icon: '⏱', label: 'Hours Viewed', value: '1.2h', sub: '72 min total' },
            { icon: '💳', label: 'Total Spent', value: '$55', sub: 'Avg $18 each' },
            { icon: '⭐', label: 'Avg Rating', value: '4.9', sub: 'Top reviewer' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '1rem', padding: '1.375rem', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.375rem', marginBottom: '0.625rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.15rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#6366f1', marginTop: '0.3rem', fontWeight: '500' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Live alert */}
        <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '1rem', padding: '1.125rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '9px', height: '9px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }}></div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.875rem', color: '#065f46', marginBottom: '0.1rem' }}>Live session in progress — Santa Monica Pier</p>
              <p style={{ fontSize: '0.78rem', color: '#059669' }}>Pilot: Maria S. · Started 8 minutes ago</p>
            </div>
          </div>
          <Link href="/missions/live" style={{ backgroundColor: '#059669', color: '#fff', textDecoration: 'none', padding: '0.55rem 1.25rem', borderRadius: '980px', fontSize: '0.825rem', fontWeight: '700' }}>Watch Live →</Link>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', borderRadius: '1.25rem', padding: '1.875rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '0.3rem' }}>Book your next aerial view</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>50+ approved zones available. From $15 for 15 minutes.</p>
          </div>
          <Link href="/zones" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '980px', fontWeight: '700', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Browse zones →</Link>
        </div>

        {/* Missions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f' }}>Recent missions</h2>
            <Link href="/mission-history" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {MISSIONS.map(m => {
              const cfg = STATUS[m.status] || STATUS.CANCELLED;
              return (
                <div key={m.id} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '0.875rem', padding: '1.125rem 1.375rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.2rem' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1d1d1f' }}>{m.zone}</h3>
                      <span style={{ backgroundColor: cfg.bg, color: cfg.color, border: '1px solid ' + cfg.border, fontSize: '0.68rem', fontWeight: '600', padding: '0.15rem 0.55rem', borderRadius: '980px' }}>{cfg.label}</span>
                    </div>
                    <p style={{ fontSize: '0.775rem', color: '#6e6e73' }}>{m.city} · {m.date} · Pilot: {m.pilot}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1d1d1f' }}>{m.amount}</p>
                    <p style={{ fontSize: '0.72rem', color: '#6e6e73' }}>{m.duration}</p>
                  </div>
                  {m.status === 'LIVE' && <Link href="/missions/live" style={{ backgroundColor: '#059669', color: '#fff', textDecoration: 'none', padding: '0.45rem 0.875rem', borderRadius: '980px', fontSize: '0.775rem', fontWeight: '700' }}>Watch</Link>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
