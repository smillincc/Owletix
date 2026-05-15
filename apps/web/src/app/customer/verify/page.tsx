'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyIDPage() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ idType: 'drivers_license', idNumber: '', dob: '', country: 'US' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { window.location.href = '/auth/login'; return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    if (parsed.identityVerified) setDone(true);
  }, []);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('owletix_access_token');
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/identity-verification/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      setDone(true);
      const u = JSON.parse(localStorage.getItem('owletix_user') || '{}');
      u.identityVerificationStatus = 'PENDING';
      localStorage.setItem('owletix_user', JSON.stringify(u));
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'240px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem 1.25rem', display:'flex', flexDirection:'column', zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
          <span style={{ fontSize:'1.5rem' }}>🦉</span>
          <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
        </div>
        {([['⊞','Dashboard','/customer/dashboard',false],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',false],['🏠','Property Auth','/property-authorization/new',false],['✅','Verify ID','/customer/verify',true],['⚙️','Settings','/customer/settings',false]] as [string,string,string,boolean][]).map(([icon,label,href,active]) => (
          <Link key={label} href={href} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}><span>{icon}</span>{label}</Link>
        ))}
        <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
          <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{user?.firstName} {user?.lastName}</p>
          <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{user?.email}</p>
          <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
        </div>
      </div>

      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem', overflowX:'hidden' as const }}>
        <div style={{ maxWidth:'600px' }}>
          <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>Verify Your Identity</h1>
          <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'2rem' }}>Required before booking any drone session. Your data is encrypted and never shared.</p>

          {done ? (
            <div style={{ backgroundColor:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:'1.25rem', padding:'2.5rem', textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
              <h2 style={{ fontWeight:'800', fontSize:'1.25rem', color:'#059669', marginBottom:'0.5rem' }}>Verification Submitted</h2>
              <p style={{ color:'#6e6e73', marginBottom:'1.5rem' }}>Your identity verification is being reviewed. This usually takes 1-2 business days. You will be notified by email once approved.</p>
              <Link href="/customer/dashboard" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Back to Dashboard</Link>
            </div>
          ) : (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ backgroundColor:'#fffbeb', border:'1px solid #fde68a', borderRadius:'0.75rem', padding:'1rem', marginBottom:'1.5rem' }}>
                <p style={{ fontSize:'0.82rem', color:'#92400e', fontWeight:'500' }}>🔒 <strong>Why we verify:</strong> To ensure platform safety and comply with FAA requirements, all customers must verify their identity before booking drone sessions.</p>
              </div>

              {error && <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.25rem', color:'#dc2626', fontSize:'0.875rem' }}>{error}</div>}

              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>ID Type</label>
                  <select value={form.idType} onChange={e => setForm(f => ({...f, idType: e.target.value}))} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem 1rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                    <option value="drivers_license">Driver's License</option>
                    <option value="passport">Passport</option>
                    <option value="state_id">State ID</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>ID Number</label>
                  <input value={form.idNumber} onChange={e => setForm(f => ({...f, idNumber: e.target.value}))} placeholder="Enter your ID number"
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem 1rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => setForm(f => ({...f, dob: e.target.value}))}
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem 1rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Country</label>
                  <select value={form.country} onChange={e => setForm(f => ({...f, country: e.target.value}))} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem 1rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <button onClick={submit} disabled={loading || !form.idNumber || !form.dob} style={{ backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.9rem', fontSize:'0.95rem', fontWeight:'600', cursor:'pointer', opacity: loading || !form.idNumber || !form.dob ? 0.6 : 1, fontFamily:'inherit', marginTop:'0.5rem' }}>
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
