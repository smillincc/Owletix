'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MOCK_STREAMS = [
  { id: 's1', missionId: 'm001', zone: 'Griffith Park', city: 'Los Angeles, CA', pilot: 'James K.', customer: 'Alex M.', startedAt: '14:32', duration: '18 min', status: 'LIVE', riskLevel: 'LOW' },
  { id: 's2', missionId: 'm002', zone: 'Central Park', city: 'New York, NY', pilot: 'Maria S.', customer: 'Sarah T.', startedAt: '14:41', duration: '9 min', status: 'LIVE', riskLevel: 'LOW' },
  { id: 's3', missionId: 'm003', zone: 'Golden Gate Park', city: 'San Francisco, CA', pilot: 'David L.', customer: 'Mike R.', startedAt: '14:55', duration: '3 min', status: 'LIVE', riskLevel: 'MEDIUM' },
];

const RECENT = [
  { id: 'r1', zone: 'Santa Monica Pier', pilot: 'Chen W.', customer: 'Lisa K.', duration: '22 min', amount: '$22.00', endedAt: '14:20', recorded: true },
  { id: 'r2', zone: 'Balboa Park', pilot: 'James K.', customer: 'Tom B.', duration: '15 min', amount: '$15.00', endedAt: '13:55', recorded: true },
  { id: 'r3', zone: 'Millennium Park', pilot: 'Ana R.', customer: 'Chris P.', duration: '31 min', amount: '$31.00', endedAt: '13:30', recorded: true },
];

const DroneIcon = ({ size = 26, color = '#6366f1' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="36" cy="12" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="12" cy="36" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="36" cy="36" r="5" stroke={color} strokeWidth="2.5" fill="none"/>
    <rect x="18" y="18" width="12" height="12" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/>
    <line x1="17" y1="17" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="31" y1="17" x2="36" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="17" y1="31" x2="12" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="31" y1="31" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
  </svg>
);

export default function AdminStreamsPage() {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(MOCK_STREAMS[0]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    if (u) setUser(JSON.parse(u));
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const NAV = [
    { icon: '⊞', label: 'Dashboard', href: '/admin', active: false },
    { icon: '📡', label: 'Live Streams', href: '/admin/streams', active: true },
    { icon: '🗺', label: 'Mission Queue', href: '/admin', active: false },
    { icon: '👤', label: 'Pilot Approvals', href: '/admin', active: false },
    { icon: '🛡', label: 'Trust & Safety', href: '/admin/trust-safety', active: false },
    { icon: '💰', label: 'Payouts', href: '/admin', active: false },
    { icon: '📋', label: 'Audit Log', href: '/admin', active: false },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '230px', backgroundColor: '#fff', borderRight: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f', marginBottom: '2.5rem' }}>
          <DroneIcon size={26} color="#6366f1" />
          <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Owletix</span>
          <span style={{ fontSize: '0.65rem', backgroundColor: '#f0f0ff', color: '#6366f1', border: '1px solid #c7d2fe', borderRadius: '980px', padding: '0.15rem 0.5rem', fontWeight: '700', marginLeft: '0.25rem' }}>Admin</span>
        </Link>
        {NAV.map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none', color: item.active ? '#6366f1' : '#6e6e73', backgroundColor: item.active ? '#f0f0ff' : 'transparent', fontSize: '0.875rem', fontWeight: item.active ? '600' : '400', marginBottom: '0.2rem' }}>
            <span>{item.icon}</span>
            {item.label}
            {item.label === 'Live Streams' && (
              <span style={{ marginLeft: 'auto', backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '980px', border: '1px solid #a7f3d0' }}>{MOCK_STREAMS.length} live</span>
            )}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#f5f5f7', borderRadius: '0.875rem', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.15rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize: '0.72rem', color: '#6e6e73', marginBottom: '0.5rem' }}>Administrator</p>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ background: 'none', border: 'none', color: '#6e6e73', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '230px', padding: '2.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.625rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.2rem' }}>Live Streams</h1>
            <p style={{ color: '#6e6e73', fontSize: '0.875rem' }}>Real-time monitoring of all active drone sessions</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '980px', padding: '0.4rem 1rem', fontSize: '0.8rem', color: '#059669', fontWeight: '600' }}>
            <span style={{ width: '7px', height: '7px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }}></span>
            {MOCK_STREAMS.length} sessions live now
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Live Now', value: '3', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
            { label: 'Today Total', value: '18', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
            { label: 'Revenue Today', value: '$312', color: '#6366f1', bg: '#f0f0ff', border: '#c7d2fe' },
            { label: 'Avg Duration', value: '21 min', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: s.bg, border: '1px solid ' + s.border, borderRadius: '1rem', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: s.color, letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: s.color, fontWeight: '500', opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Stream list */}
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f', marginBottom: '1rem' }}>Active sessions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {MOCK_STREAMS.map(s => (
                <div key={s.id} onClick={() => setSelected(s)}
                  style={{ backgroundColor: selected?.id === s.id ? '#f0f0ff' : '#fff', border: '1px solid ' + (selected?.id === s.id ? '#c7d2fe' : 'rgba(0,0,0,0.07)'), borderRadius: '1rem', padding: '1.125rem 1.25rem', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1d1d1f' }}>{s.zone}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: s.riskLevel === 'MEDIUM' ? '#f59e0b' : '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                      <span style={{ fontSize: '0.68rem', color: s.riskLevel === 'MEDIUM' ? '#d97706' : '#059669', fontWeight: '600' }}>{s.riskLevel}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.775rem', color: '#6e6e73', marginBottom: '0.5rem' }}>{s.city}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6e6e73' }}>
                    <span>🚁 {s.pilot}</span>
                    <span>👤 {s.customer}</span>
                    <span>⏱ {s.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stream viewer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f' }}>Stream viewer</h2>
              {selected && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ backgroundColor: '#fff2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '980px', padding: '0.35rem 0.875rem', fontSize: '0.775rem', fontWeight: '600', cursor: 'pointer' }}>
                    🛑 Stop stream
                  </button>
                  <button style={{ backgroundColor: '#fff', color: '#6e6e73', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '980px', padding: '0.35rem 0.875rem', fontSize: '0.775rem', fontWeight: '600', cursor: 'pointer' }}>
                    📋 Flag for review
                  </button>
                </div>
              )}
            </div>
            {selected ? (
              <div style={{ backgroundColor: '#fff', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                {/* Stream preview */}
                <div style={{ aspectRatio: '16/9', backgroundColor: '#0a0a1a', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <DroneIcon size={48} color="rgba(255,255,255,0.3)" />
                    <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'rgba(255,255,255,0.4)' }}>Live stream from {selected.zone}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.25rem' }}>Connect LiveKit to enable real video</p>
                  </div>
                  {/* Overlays */}
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(16,185,129,0.9)', borderRadius: '980px', padding: '0.3rem 0.75rem' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#fff', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: '700' }}>LIVE</span>
                  </div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '0.5rem', padding: '0.3rem 0.75rem', fontSize: '0.72rem', color: '#fff' }}>
                    {selected.startedAt} · {selected.duration}
                  </div>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '0.5rem', padding: '0.3rem 0.75rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>
                    OWLETIX-{selected.missionId} · Admin View
                  </div>
                </div>
                {/* Stream info */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                      { label: 'Pilot', value: selected.pilot },
                      { label: 'Customer', value: selected.customer },
                      { label: 'Risk Level', value: selected.riskLevel, color: selected.riskLevel === 'MEDIUM' ? '#d97706' : '#059669' },
                    ].map(d => (
                      <div key={d.label} style={{ backgroundColor: '#f5f5f7', borderRadius: '0.75rem', padding: '0.875rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.68rem', color: '#6e6e73', marginBottom: '0.25rem', fontWeight: '500' }}>{d.label}</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: '700', color: d.color || '#1d1d1f' }}>{d.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#fff', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.07)', padding: '4rem', textAlign: 'center', color: '#6e6e73' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📡</p>
                <p style={{ fontSize: '0.9rem' }}>Select a stream to view</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent recordings */}
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1d1d1f', marginBottom: '1rem' }}>Recent recordings <span style={{ fontSize: '0.75rem', color: '#6e6e73', fontWeight: '400' }}>(Admin access only)</span></h2>
          <div style={{ backgroundColor: '#fff', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px 80px 100px', padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.72rem', fontWeight: '600', color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <span>Zone</span><span>Pilot</span><span>Customer</span><span>Duration</span><span>Amount</span><span>Actions</span>
            </div>
            {RECENT.map((r, i) => (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px 80px 100px', padding: '1rem 1.5rem', borderBottom: i < RECENT.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1d1d1f' }}>{r.zone}</span>
                <span style={{ fontSize: '0.82rem', color: '#6e6e73' }}>{r.pilot}</span>
                <span style={{ fontSize: '0.82rem', color: '#6e6e73' }}>{r.customer}</span>
                <span style={{ fontSize: '0.82rem', color: '#6e6e73' }}>{r.duration}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1d1d1f' }}>{r.amount}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ backgroundColor: '#f0f0ff', color: '#6366f1', border: 'none', borderRadius: '980px', padding: '0.3rem 0.75rem', fontSize: '0.72rem', fontWeight: '600', cursor: 'pointer' }}>▶ Play</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
