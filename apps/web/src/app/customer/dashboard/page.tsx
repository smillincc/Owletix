'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { window.location.href = '/auth/login'; return; }
    setUser(JSON.parse(u));

    fetch(process.env.NEXT_PUBLIC_API_URL + '/missions/my', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(d => { setMissions(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalSpent = missions.filter(m => m.status === 'COMPLETED').reduce((s, m) => s + (m.totalCost || 0), 0);
  const live = missions.find(m => m.status === 'STREAMING');

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      {/* Sidebar */}
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'220px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem', display:'flex', flexDirection:'column', zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🦉</span>
          <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
        </div>
        {([['⊞','Dashboard','/customer/dashboard',true],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',false],['🏠','Property Auth','/property-authorization/new',false],['✅','Verify ID','/customer/verify',false],['⚙️','Settings','/customer/settings',false]] as [string,string,string,boolean][]).map(([icon,label,href,active]) => (
          <Link key={label} href={href} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}>
            <span>{icon}</span>{label}
          </Link>
        ))}
        <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
          <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft:'220px', padding:'2.5rem', flex:1 }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.firstName} 👋
        </h1>
        <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'2rem' }}>Here is what is happening with your aerial views</p>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { label:'Total Flights', value: missions.filter(m=>m.status==='COMPLETED').length, sub:'completed missions' },
            { label:'Live Now', value: missions.filter(m=>m.status==='STREAMING').length, sub:'active streams' },
            { label:'Total Spent', value:'$'+totalSpent.toFixed(2), sub:'across all missions' },
            { label:'Pending', value: missions.filter(m=>['PENDING','ACCEPTED'].includes(m.status)).length, sub:'awaiting flight' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor:'#fff', borderRadius:'1rem', padding:'1.5rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize:'2rem', fontWeight:'800', color:'#1d1d1f', letterSpacing:'-0.03em', marginBottom:'0.2rem' }}>{s.value}</div>
              <div style={{ fontSize:'0.78rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{s.label}</div>
              <div style={{ fontSize:'0.72rem', color:'#6e6e73' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Live session banner */}
        {live && (
          <div style={{ backgroundColor:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:'1rem', padding:'1.25rem 1.5rem', marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem' }}>
                <span style={{ width:'8px', height:'8px', backgroundColor:'#10b981', borderRadius:'50%', display:'inline-block' }}></span>
                <span style={{ fontWeight:'700', color:'#059669', fontSize:'0.9rem' }}>Live session in progress — {live.zone?.name || 'Active Zone'}</span>
              </div>
              <p style={{ fontSize:'0.8rem', color:'#6e6e73' }}>Pilot: {live.pilot?.firstName || 'Your pilot'}</p>
            </div>
            <Link href={`/customer/watch/${live.id}`} style={{ backgroundColor:'#10b981', color:'#fff', textDecoration:'none', padding:'0.625rem 1.25rem', borderRadius:'980px', fontSize:'0.875rem', fontWeight:'700' }}>Watch Live →</Link>
          </div>
        )}

        {/* Book CTA */}
        <div style={{ background:'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius:'1.25rem', padding:'2rem 2.5rem', marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#fff' }}>
          <div>
            <h2 style={{ fontWeight:'800', fontSize:'1.25rem', marginBottom:'0.3rem' }}>Book your next aerial view</h2>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.875rem' }}>36 approved zones across California. From $15 for 15 minutes.</p>
          </div>
          <Link href="/zones" style={{ backgroundColor:'#fff', color:'#6366f1', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem', whiteSpace:'nowrap' as const }}>Browse zones →</Link>
        </div>

        {/* Missions */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
            <h2 style={{ fontSize:'1rem', fontWeight:'700', color:'#1d1d1f' }}>Recent missions</h2>
            <Link href="/customer/missions" style={{ fontSize:'0.8rem', color:'#6366f1', textDecoration:'none', fontWeight:'600' }}>View all →</Link>
          </div>
          {loading ? (
            <div style={{ backgroundColor:'#fff', borderRadius:'1rem', padding:'3rem', textAlign:'center', color:'#6e6e73' }}>Loading your missions...</div>
          ) : missions.length === 0 ? (
            <div style={{ backgroundColor:'#fff', borderRadius:'1rem', padding:'3rem', textAlign:'center', border:'1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>🚁</p>
              <p style={{ fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>No missions yet</p>
              <p style={{ color:'#6e6e73', fontSize:'0.875rem', marginBottom:'1.5rem' }}>Book your first aerial view session</p>
              <Link href="/zones" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Browse zones</Link>
            </div>
          ) : (
            <div style={{ backgroundColor:'#fff', borderRadius:'1rem', border:'1px solid rgba(0,0,0,0.07)', overflow:'hidden', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              {missions.slice(0,10).map((m, i) => (
                <div key={m.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 1.5rem', borderBottom: i < missions.length-1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                  <div>
                    <p style={{ fontWeight:'600', fontSize:'0.9rem', color:'#1d1d1f', marginBottom:'0.2rem' }}>{m.zone?.name || m.zoneId || 'Mission'}</p>
                    <p style={{ fontSize:'0.78rem', color:'#6e6e73' }}>{new Date(m.createdAt).toLocaleDateString()} · {m.pilot ? `Pilot: ${m.pilot.firstName}` : 'Awaiting pilot'}</p>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <span style={{ fontSize:'0.72rem', fontWeight:'600', padding:'0.2rem 0.6rem', borderRadius:'980px', backgroundColor: m.status==='COMPLETED'?'#ecfdf5':m.status==='STREAMING'?'#eff6ff':m.status==='CANCELLED'?'#fff2f2':'#fffbeb', color: m.status==='COMPLETED'?'#059669':m.status==='STREAMING'?'#2563eb':m.status==='CANCELLED'?'#dc2626':'#d97706' }}>{m.status}</span>
                    <p style={{ fontSize:'0.875rem', fontWeight:'700', color:'#1d1d1f', marginTop:'0.3rem' }}>${(m.totalCost||0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
