'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STATUS_COLORS = {
  PENDING: { bg:'#fffbeb', color:'#d97706', border:'#fde68a' },
  ACCEPTED: { bg:'#eff6ff', color:'#2563eb', border:'#bfdbfe' },
  STREAMING: { bg:'#ecfdf5', color:'#059669', border:'#a7f3d0' },
  COMPLETED: { bg:'#f0f0ff', color:'#6366f1', border:'#c7d2fe' },
  CANCELLED: { bg:'#fff2f2', color:'#dc2626', border:'#fecaca' },
};

export default function MyMissionsPage() {
  const [user, setUser] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { window.location.href = '/auth/login'; return; }
    setUser(JSON.parse(u));
    fetch(process.env.NEXT_PUBLIC_API_URL + '/missions/my', {
      headers: { Authorization: 'Bearer ' + token }
    }).then(r => r.json()).then(d => { setMissions(Array.isArray(d) ? d : []); setLoading(false); })
    .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? missions : missions.filter((m:any) => m.status === filter);

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'240px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem 1.25rem', display:'flex', flexDirection:'column', zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🦉</span>
          <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
        </div>
        {([['⊞','Dashboard','/customer/dashboard',false],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',true],['🏠','Property Auth','/property-authorization/new',false],['✅','Verify ID','/customer/verify',false],['⚙️','Settings','/customer/settings',false]] as [string,string,string,boolean][]).map(([icon,label,href,active]) => (
          <Link key={label} href={href} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}><span>{icon}</span>{label}</Link>
        ))}
        <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
          <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{(user as any)?.firstName} {(user as any)?.lastName}</p>
          <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{(user as any)?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem', overflowX:'hidden' as const }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>My Missions</h1>
            <p style={{ color:'#6e6e73', fontSize:'0.9rem' }}>All your aerial view sessions</p>
          </div>
          <Link href="/zones" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.7rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>+ Book New Session</Link>
        </div>

        <div style={{ display:'flex', gap:'0.4rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          {['ALL','PENDING','ACCEPTED','STREAMING','COMPLETED','CANCELLED'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ backgroundColor:filter===s?'#1d1d1f':'#fff', color:filter===s?'#fff':'#6e6e73', border:'1px solid '+(filter===s?'#1d1d1f':'rgba(0,0,0,0.1)'), borderRadius:'980px', padding:'0.4rem 1rem', fontSize:'0.78rem', fontWeight:'500', cursor:'pointer' }}>{s}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'#6e6e73' }}>Loading missions...</div>
        ) : filtered.length === 0 ? (
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'4rem', textAlign:'center', border:'1px solid rgba(0,0,0,0.07)' }}>
            <p style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🚁</p>
            <p style={{ fontWeight:'700', color:'#1d1d1f', marginBottom:'0.5rem', fontSize:'1.1rem' }}>No missions yet</p>
            <p style={{ color:'#6e6e73', fontSize:'0.875rem', marginBottom:'1.5rem' }}>Book your first aerial view session from our approved zones</p>
            <Link href="/zones" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Browse zones</Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {filtered.map((m:any) => {
              const sc = STATUS_COLORS[m.status] || STATUS_COLORS.PENDING;
              return (
                <div key={m.id} style={{ backgroundColor:'#fff', borderRadius:'1rem', padding:'1.5rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.625rem', marginBottom:'0.4rem' }}>
                      <h3 style={{ fontWeight:'700', fontSize:'1rem', color:'#1d1d1f' }}>{m.zone?.name || 'Mission'}</h3>
                      <span style={{ fontSize:'0.7rem', fontWeight:'700', padding:'0.2rem 0.6rem', borderRadius:'980px', backgroundColor:sc.bg, color:sc.color, border:'1px solid '+sc.border }}>{m.status}</span>
                    </div>
                    <p style={{ fontSize:'0.8rem', color:'#6e6e73' }}>{m.zone?.city || ''} · {new Date(m.createdAt).toLocaleDateString()} · Mission #{m.id?.slice(0,8)}</p>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ fontSize:'1.1rem', fontWeight:'800', color:'#1d1d1f' }}>${(m.totalCost||0).toFixed(2)}</p>
                    {m.status === 'STREAMING' && (
                      <Link href={'/customer/watch/'+m.id} style={{ backgroundColor:'#10b981', color:'#fff', textDecoration:'none', padding:'0.4rem 0.875rem', borderRadius:'980px', fontSize:'0.78rem', fontWeight:'700', display:'inline-block', marginTop:'0.3rem' }}>Watch Live</Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
