'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyIDPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('NOT_STARTED');

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { window.location.href = '/auth/login'; return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    setStatus(parsed.identityVerificationStatus || 'NOT_STARTED');
  }, []);

  const startVerification = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('owletix_access_token');
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/identity-verification/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ provider: 'stripe' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to start verification');
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus('PENDING');
        const u = JSON.parse(localStorage.getItem('owletix_user') || '{}');
        u.identityVerificationStatus = 'PENDING';
        localStorage.setItem('owletix_user', JSON.stringify(u));
      }
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const NAV = [['⊞','Dashboard','/customer/dashboard',false],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',false],['🏠','Property Auth','/property-authorization/new',false],['✅','Verify ID','/customer/verify',true],['⚙️','Settings','/customer/settings',false]] as [string,string,string,boolean][];

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'240px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem 1.25rem', display:'flex', flexDirection:'column', zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🦉</span>
          <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
        </div>
        {NAV.map(([icon,label,href,active]) => (
          <Link key={label} href={href} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}><span>{icon}</span>{label}</Link>
        ))}
        <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
          <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem' }}>
        <div style={{ maxWidth:'560px' }}>
          <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>Verify Your Identity</h1>
          <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'2rem' }}>Required before booking any drone session.</p>

          {status === 'VERIFIED' ? (
            <div style={{ backgroundColor:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:'1.25rem', padding:'2.5rem', textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
              <h2 style={{ fontWeight:'800', fontSize:'1.25rem', color:'#059669', marginBottom:'0.5rem' }}>Identity Verified</h2>
              <p style={{ color:'#6e6e73', marginBottom:'1.5rem' }}>You are fully verified and can book drone sessions.</p>
              <Link href="/zones" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Browse Zones</Link>
            </div>
          ) : status === 'PENDING' ? (
            <div style={{ backgroundColor:'#fffbeb', border:'1px solid #fde68a', borderRadius:'1.25rem', padding:'2.5rem', textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>⏳</div>
              <h2 style={{ fontWeight:'800', fontSize:'1.25rem', color:'#d97706', marginBottom:'0.5rem' }}>Verification Pending</h2>
              <p style={{ color:'#6e6e73', marginBottom:'1.5rem' }}>Your identity verification is being reviewed. Usually takes a few minutes with Stripe Identity.</p>
              <Link href="/customer/dashboard" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Back to Dashboard</Link>
            </div>
          ) : (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ backgroundColor:'#f0f0ff', border:'1px solid #c7d2fe', borderRadius:'1rem', padding:'1.25rem', marginBottom:'1.5rem', display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.5rem' }}>🛡</span>
                <div>
                  <p style={{ fontWeight:'700', color:'#4338ca', fontSize:'0.875rem', marginBottom:'0.25rem' }}>Powered by Stripe Identity</p>
                  <p style={{ fontSize:'0.8rem', color:'#6366f1', lineHeight:'1.5' }}>Your ID documents are verified and stored exclusively by Stripe — never on Owletix servers. We only receive a verified/not verified status. Zero liability for you.</p>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.75rem' }}>
                {[
                  ['📄', 'What you need', "A government-issued photo ID (driver's license, passport, or state ID)"],
                  ['⏱', 'How long it takes', 'Usually under 2 minutes with Stripe Identity'],
                  ['🔒', 'Your privacy', 'Stripe is PCI DSS Level 1 certified. Your data is never stored on our servers'],
                  ['✅', 'What happens next', 'Once verified you can book drone sessions immediately'],
                ].map(([icon, title, desc]) => (
                  <div key={title as string} style={{ display:'flex', gap:'0.875rem', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.75rem' }}>
                    <span style={{ fontSize:'1.25rem', flexShrink:0 }}>{icon}</span>
                    <div>
                      <p style={{ fontWeight:'600', fontSize:'0.82rem', color:'#1d1d1f', marginBottom:'0.2rem' }}>{title as string}</p>
                      <p style={{ fontSize:'0.78rem', color:'#6e6e73', lineHeight:'1.5' }}>{desc as string}</p>
                    </div>
                  </div>
                ))}
              </div>

              {error && <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1rem', color:'#dc2626', fontSize:'0.875rem' }}>{error}</div>}

              <button onClick={startVerification} disabled={loading} style={{ width:'100%', backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'1rem', fontSize:'1rem', fontWeight:'700', cursor:'pointer', opacity:loading?0.6:1, fontFamily:'inherit' }}>
                {loading ? 'Starting...' : '🛡 Start Identity Verification'}
              </button>
              <p style={{ fontSize:'0.72rem', color:'#6e6e73', textAlign:'center', marginTop:'0.75rem', lineHeight:'1.5' }}>
                By proceeding you agree to Stripe Identity's <a href="https://stripe.com/privacy" target="_blank" style={{ color:'#6366f1' }}>Privacy Policy</a>. Owletix never stores your ID documents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
