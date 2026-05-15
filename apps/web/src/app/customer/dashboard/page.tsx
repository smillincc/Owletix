'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MISSIONS = [
  { id: '1', zone: 'Griffith Park', city: 'Los Angeles, CA', status: 'COMPLETED', date: 'May 14, 2026', duration: '25 min', amount: '$25.00', pilot: 'James K.' },
  { id: '2', zone: 'Santa Monica Pier', city: 'Los Angeles, CA', status: 'LIVE', date: 'Today', duration: 'Live now', amount: '$0.00', pilot: 'Maria S.' },
  { id: '3', zone: 'Golden Gate Park', city: 'San Francisco, CA', status: 'PAYMENT_AUTHORIZED', date: 'May 16, 2026', duration: 'Pending', amount: '$30.00 hold', pilot: 'Pending' },
];

const STATUS_CONFIG = {
  LIVE: { color: '#34d399', bg: 'rgba(52,211,153,0.15)', label: 'Live Now', dot: '#34d399' },
  COMPLETED: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', label: 'Completed', dot: '#60a5fa' },
  PAYMENT_AUTHORIZED: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', label: 'Scheduled', dot: '#fbbf24' },
  CANCELLED: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', label: 'Cancelled', dot: '#f87171' },
};

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
    <div style={{ minHeight: '100vh', backgroundColor: '#050508', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px', backgroundColor: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
        </Link>
        {[
          { icon: '📊', label: 'Dashboard', href: '/customer/dashboard', active: true },
          { icon: '🗺️', label: 'Browse Zones', href: '/zones', active: false },
          { icon: '📋', label: 'My Missions', href: '/mission-history', active: false },
          { icon: '🏠', label: 'Property Auth', href: '/property-authorization/new', active: false },
          { icon: '✅', label: 'Verify Identity', href: '/verify-identity', active: false },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#fff' : 'rgba(255,255,255,0.45)', backgroundColor: item.active ? 'rgba(99,102,241,0.15)' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.25rem' }}>
            <span>{item.icon}</span>{item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.2rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '220px', padding: '2.5rem', flex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>Good {greeting}, {user?.firstName || 'there'} 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Here's what's happening with your aerial views</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🛫', label: 'Total Flights', value: '3', sub: '+1 this month' },
            { icon: '⏱️', label: 'Hours Viewed', value: '1.2h', sub: '72 minutes total' },
            { icon: '💳', label: 'Total Spent', value: '$55', sub: 'Avg $18/session' },
            { icon: '⭐', label: 'Avg Rating', value: '4.9', sub: 'Top reviewer' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(99,102,241,0.8)', marginTop: '0.4rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Live alert */}
        <div style={{ backgroundColor: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#34d399', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(52,211,153,0.2)' }}></div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.1rem' }}>Live session — Santa Monica Pier</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>Pilot: Maria S. · 8 minutes in</p>
            </div>
          </div>
          <Link href="/missions/live" style={{ backgroundColor: '#34d399', color: '#000', textDecoration: 'none', padding: '0.6rem 1.25rem', borderRadius: '980px', fontSize: '0.85rem', fontWeight: '700' }}>Watch Live →</Link>
        </div>

        {/* Book CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.08))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '1.25rem', padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.4rem' }}>Book your next aerial view</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>50+ approved zones. From $15 for 15 minutes.</p>
          </div>
          <Link href="/zones" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.875rem 1.75rem', borderRadius: '980px', fontWeight: '600', fontSize: '0.9rem' }}>Browse zones →</Link>
        </div>

        {/* Missions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent missions</h2>
            <Link href="/mission-history" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MISSIONS.map(m => {
              const cfg = STATUS_CONFIG[m.status] || STATUS_CONFIG.CANCELLED;
              return (
                <div key={m.id} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '0.95rem' }}>{m.zone}</h3>
                      <span style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>{cfg.label}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{m.city} · {m.date} · Pilot: {m.pilot}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{m.amount}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{m.duration}</p>
                  </div>
                  {m.status === 'LIVE' && <Link href="/missions/live" style={{ backgroundColor: '#34d399', color: '#000', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '980px', fontSize: '0.8rem', fontWeight: '700' }}>Watch</Link>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
