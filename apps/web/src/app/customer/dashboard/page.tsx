'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MISSIONS = [
  { id: '1', zone: 'Griffith Park', city: 'Los Angeles, CA', status: 'COMPLETED', date: 'May 14, 2026', duration: '25 min', amount: '$25.00', pilot: 'James K.' },
  { id: '2', zone: 'Santa Monica Pier', city: 'Los Angeles, CA', status: 'LIVE', date: 'Today', duration: 'Live now', amount: '$8.00', pilot: 'Maria S.' },
  { id: '3', zone: 'Golden Gate Park', city: 'San Francisco, CA', status: 'PAYMENT_AUTHORIZED', date: 'May 16, 2026', duration: 'Pending', amount: '$30.00 hold', pilot: 'Pending' },
];

const STATUS = {
  LIVE: { color: '#059669', bg: '#d1fae5', label: 'Live Now' },
  COMPLETED: { color: '#2563eb', bg: '#dbeafe', label: 'Completed' },
  PAYMENT_AUTHORIZED: { color: '#d97706', bg: '#fef3c7', label: 'Scheduled' },
  CANCELLED: { color: '#dc2626', bg: '#fee2e2', label: 'Cancelled' },
};

function Sidebar({ user }) {
  const links = [
    { icon: '📊', label: 'Dashboard', href: '/customer/dashboard', active: true },
    { icon: '🗺️', label: 'Browse Zones', href: '/zones' },
    { icon: '📋', label: 'My Missions', href: '/mission-history' },
    { icon: '🏠', label: 'Property Auth', href: '/property-authorization/new' },
    { icon: '✅', label: 'Verify Identity', href: '/verify-identity' },
    { icon: '⚙️', label: 'Settings', href: '/settings' },
  ];
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '232px', backgroundColor: '#fff', borderRight: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🦉</span>
        <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>Owletix</span>
      </Link>
      {links.map(item => (
        <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#6366f1' : '#6e6e73', backgroundColor: item.active ? '#f0f0ff' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.2rem', transition: 'all 0.15s' }}>
          <span>{item.icon}</span>{item.label}
        </Link>
      ))}
      <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#f5f5f7', borderRadius: '0.875rem' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.15rem' }}>{user?.firstName} {user?.lastName}</p>
        <p style={{ fontSize: '0.75rem', color: '#6e6e73', marginBottom: '0.6rem' }}>{user?.email}</p>
        <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: '#6e6e73', fontSize: '0.75rem', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>Sign out</button>
      </div>
    </div>
  );
}

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
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color: '#1d1d1f', display: 'flex' }}>
      <Sidebar user={user} />
      <div style={{ marginLeft: '232px', padding: '2.5rem', flex: 1, maxWidth: 'calc(100vw - 232px)' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>Good {greeting}, {user?.firstName || 'there'} 👋</h1>
          <p style={{ color: '#6e6e73', fontSize: '0.875rem' }}>Here's what's happening with your aerial views</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🛫', label: 'Total Flights', value: '3', sub: '+1 this month' },
            { icon: '⏱️', label: 'Hours Viewed', value: '1.2h', sub: '72 min total' },
            { icon: '💳', label: 'Total Spent', value: '$55', sub: 'Avg $18/session' },
            { icon: '⭐', label: 'Avg Rating', value: '4.9', sub: 'Top reviewer' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.375rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.375rem', marginBottom: '0.625rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.2rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6e6e73' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: '600', marginTop: '0.35rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Live alert */}
        <div style={{ backgroundColor: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '1rem', padding: '1.125rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#059669', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(5,150,105,0.2)', flexShrink: 0 }}></div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.875rem', color: '#065f46', marginBottom: '0.1rem' }}>Live session in progress — Santa Monica Pier</p>
              <p style={{ fontSize: '0.78rem', color: '#047857' }}>Pilot: Maria S. · Started 8 minutes ago</p>
            </div>
          </div>
          <Link href="/missions/live" style={{ backgroundColor: '#059669', color: '#fff', textDecoration: 'none', padding: '0.55rem 1.25rem', borderRadius: '980px', fontSize: '0.82rem', fontWeight: '700' }}>Watch Live →</Link>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', borderRadius: '1.25rem', padding: '1.75rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.35rem' }}>Book your next aerial view</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>50+ approved zones. From $15 for 15 minutes.</p>
          </div>
          <Link href="/zones" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '980px', fontWeight: '700', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Browse zones →</Link>
        </div>

        {/* Missions */}
        <div style={{ backgroundColor: '#fff', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f' }}>Recent missions</h2>
            <Link href="/mission-history" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600' }}>View all →</Link>
          </div>
          {MISSIONS.map((m, i) => {
            const cfg = STATUS[m.status] || STATUS.CANCELLED;
            return (
              <div key={m.id} style={{ padding: '1.125rem 1.5rem', borderBottom: i < MISSIONS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>🛫</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1d1d1f' }}>{m.zone}</h3>
                    <span style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: '0.68rem', fontWeight: '700', padding: '0.15rem 0.55rem', borderRadius: '980px' }}>{cfg.label}</span>
                  </div>
                  <p style={{ fontSize: '0.775rem', color: '#6e6e73' }}>{m.city} · {m.date} · Pilot: {m.pilot}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.875rem', color: '#1d1d1f' }}>{m.amount}</p>
                  <p style={{ fontSize: '0.72rem', color: '#6e6e73' }}>{m.duration}</p>
                </div>
                {m.status === 'LIVE' && <Link href="/missions/live" style={{ backgroundColor: '#059669', color: '#fff', textDecoration: 'none', padding: '0.45rem 0.9rem', borderRadius: '980px', fontSize: '0.78rem', fontWeight: '700' }}>Watch</Link>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
