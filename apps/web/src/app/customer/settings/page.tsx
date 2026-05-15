'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    if (!u) { window.location.href = '/auth/login'; return; }
    setUser(JSON.parse(u));
  }, []);

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'240px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem 1.25rem', display:'flex', flexDirection:'column', zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🦉</span>
          <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
        </div>
        {([['⊞','Dashboard','/customer/dashboard',false],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',false],['🏠','Property Auth','/property-authorization/new',false],['✅','Verify ID','/customer/verify',false],['⚙️','Settings','/customer/settings',true]] as [string,string,string,boolean][]).map(([icon,label,href,active]) => (
          <Link key={label} href={href} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}><span>{icon}</span>{label}</Link>
        ))}
        <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
          <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem', overflowX:'hidden' as const }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>Settings</h1>
        <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'2rem' }}>Manage your account preferences</p>

        <div style={{ maxWidth:'600px', display:'flex', flexDirection:'column', gap:'1rem' }}>
          {/* Profile */}
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'1.75rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1rem', color:'#1d1d1f', marginBottom:'1rem' }}>Profile</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:'600', color:'#6e6e73', marginBottom:'0.3rem' }}>First name</label>
                <input defaultValue={user?.firstName} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'0.625rem', padding:'0.75rem', fontSize:'0.875rem', outline:'none', boxSizing:'border-box' as const }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:'600', color:'#6e6e73', marginBottom:'0.3rem' }}>Last name</label>
                <input defaultValue={user?.lastName} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'0.625rem', padding:'0.75rem', fontSize:'0.875rem', outline:'none', boxSizing:'border-box' as const }} />
              </div>
            </div>
            <div style={{ marginBottom:'1rem' }}>
              <label style={{ display:'block', fontSize:'0.78rem', fontWeight:'600', color:'#6e6e73', marginBottom:'0.3rem' }}>Email</label>
              <input defaultValue={user?.email} disabled style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'0.625rem', padding:'0.75rem', fontSize:'0.875rem', outline:'none', boxSizing:'border-box' as const, opacity:0.6 }} />
            </div>
            <button style={{ backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.7rem 1.5rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>Save changes</button>
          </div>

          {/* Verification status */}
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'1.75rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1rem', color:'#1d1d1f', marginBottom:'1rem' }}>Identity Verification</h2>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <p style={{ fontSize:'0.875rem', color:'#6e6e73' }}>Required to book drone sessions</p>
                <span style={{ fontSize:'0.75rem', fontWeight:'700', padding:'0.2rem 0.6rem', borderRadius:'980px', backgroundColor: user?.identityVerificationStatus === 'VERIFIED' ? '#ecfdf5' : '#fffbeb', color: user?.identityVerificationStatus === 'VERIFIED' ? '#059669' : '#d97706' }}>
                  {user?.identityVerificationStatus || 'NOT STARTED'}
                </span>
              </div>
              {user?.identityVerificationStatus !== 'VERIFIED' && (
                <Link href="/customer/verify" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.6rem 1.25rem', borderRadius:'980px', fontSize:'0.82rem', fontWeight:'700' }}>Verify Now</Link>
              )}
            </div>
          </div>

          {/* Danger zone */}
          <div style={{ backgroundColor:'#fff2f2', borderRadius:'1.25rem', padding:'1.75rem', border:'1px solid #fecaca' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1rem', color:'#dc2626', marginBottom:'0.5rem' }}>Danger Zone</h2>
            <p style={{ fontSize:'0.82rem', color:'#9b1c1c', marginBottom:'1rem' }}>Permanently delete your account and all associated data.</p>
            <button style={{ backgroundColor:'#fff', color:'#dc2626', border:'1px solid #fecaca', borderRadius:'980px', padding:'0.6rem 1.25rem', fontSize:'0.82rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
