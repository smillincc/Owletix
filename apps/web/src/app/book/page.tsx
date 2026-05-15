'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BookContent() {
  const [user, setUser] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ purpose:'', description:'', scheduledAt:'', durationMinutes:15 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const params = useSearchParams();
  const zoneId = params.get('zone') || '';
  const zoneName = params.get('name') || 'Selected Zone';

  const SAFETY_QUESTIONS = [
    { q: 'I confirm I am NOT using this session for surveillance, tracking, or monitoring any person', key: 'q1' },
    { q: 'I confirm I will NOT direct the pilot to fly over private property without authorization', key: 'q2' },
    { q: 'I confirm this session is for lawful personal or commercial use only', key: 'q3' },
    { q: 'I confirm I understand the pilot operates under FAA Part 107 and all applicable regulations', key: 'q4' },
    { q: 'I confirm I will not request any flight that violates local, state, or federal law', key: 'q5' },
  ];
  const [answers, setAnswers] = useState<Record<string,boolean>>({});
  const allAnswered = SAFETY_QUESTIONS.every(q => answers[q.key] === true);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { 
      // Save intended destination and redirect to login
      sessionStorage.setItem('redirect_after_login', window.location.href);
      window.location.href = '/auth/login'; 
      return; 
    }
    try {
      const parsed = JSON.parse(u);
      setUser(parsed);
      setVerified(parsed.identityVerificationStatus === 'VERIFIED');
    } catch {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
  }, []);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('owletix_access_token');
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ zoneId, ...form, safetyQuestionnaire: answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');
      setSuccess(true);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  if (!user) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  if (!verified) return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', padding:'2rem' }}>
      <div style={{ backgroundColor:'#fff', borderRadius:'1.5rem', padding:'3rem', maxWidth:'480px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔒</div>
        <h1 style={{ fontSize:'1.5rem', fontWeight:'800', color:'#1d1d1f', marginBottom:'0.75rem' }}>Identity Verification Required</h1>
        <p style={{ color:'#6e6e73', lineHeight:'1.7', marginBottom:'2rem' }}>You must verify your identity before booking a drone session. Powered by Stripe Identity — your documents are never stored on our servers.</p>
        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/customer/verify" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.875rem 1.75rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.9rem' }}>Verify My Identity</Link>
          <Link href="/zones" style={{ backgroundColor:'#f5f5f7', color:'#1d1d1f', textDecoration:'none', padding:'0.875rem 1.75rem', borderRadius:'980px', fontWeight:'600', fontSize:'0.9rem' }}>Browse Zones</Link>
        </div>
      </div>
    </div>
  );

  if (success) return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', padding:'2rem' }}>
      <div style={{ backgroundColor:'#fff', borderRadius:'1.5rem', padding:'3rem', maxWidth:'480px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🚁</div>
        <h1 style={{ fontSize:'1.5rem', fontWeight:'800', color:'#1d1d1f', marginBottom:'0.75rem' }}>Mission Requested!</h1>
        <p style={{ color:'#6e6e73', lineHeight:'1.7', marginBottom:'2rem' }}>Your mission has been submitted. A verified pilot near {zoneName} will accept it. You will be notified when they take off.</p>
        <Link href="/customer/missions" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.875rem 1.75rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.9rem' }}>View My Missions</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', padding:'2rem' }}>
      <div style={{ maxWidth:'580px', margin:'0 auto' }}>
        <Link href="/zones" style={{ color:'#6366f1', textDecoration:'none', fontSize:'0.875rem', fontWeight:'600', display:'inline-flex', alignItems:'center', gap:'0.3rem', marginBottom:'1.5rem' }}>← Back to zones</Link>
        <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>Book: {zoneName}</h1>
        <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'2rem' }}>Complete the safety questionnaire to proceed</p>

        <div style={{ display:'flex', gap:'0.5rem', marginBottom:'2rem' }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex:1, height:'4px', borderRadius:'2px', backgroundColor: step >= s ? '#6366f1' : '#e5e7eb' }}></div>
          ))}
        </div>

        {error && <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.25rem', color:'#dc2626', fontSize:'0.875rem' }}>{error}</div>}

        {step === 1 && (
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'1.5rem' }}>Step 1: Safety Declaration</h2>
            <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'1rem', marginBottom:'1.5rem' }}>
              <p style={{ fontSize:'0.82rem', color:'#dc2626', fontWeight:'600' }}>⚠️ All answers are reviewed by our Trust and Safety team. False declarations result in immediate account termination and may be reported to law enforcement.</p>
            </div>
            {SAFETY_QUESTIONS.map(q => (
              <div key={q.key} style={{ display:'flex', alignItems:'flex-start', gap:'0.875rem', marginBottom:'1rem', padding:'1rem', backgroundColor:'#f5f5f7', borderRadius:'0.75rem', border:'1px solid '+(answers[q.key]?'#a7f3d0':'rgba(0,0,0,0.06)') }}>
                <input type="checkbox" checked={!!answers[q.key]} onChange={e => setAnswers(a => ({...a, [q.key]: e.target.checked}))} style={{ marginTop:'2px', width:'16px', height:'16px', flexShrink:0, accentColor:'#6366f1' }} />
                <p style={{ fontSize:'0.85rem', color:'#1d1d1f', lineHeight:'1.5', margin:0 }}>{q.q}</p>
              </div>
            ))}
            <button onClick={() => setStep(2)} disabled={!allAnswered} style={{ width:'100%', backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.9rem', fontSize:'0.95rem', fontWeight:'600', cursor:'pointer', opacity:allAnswered?1:0.5, fontFamily:'inherit', marginTop:'0.5rem' }}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'1.5rem' }}>Step 2: Mission Details</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Purpose</label>
                <select value={form.purpose} onChange={e => setForm(f => ({...f, purpose: e.target.value}))} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                  <option value="">Select purpose...</option>
                  <option value="real_estate">Real Estate Photography</option>
                  <option value="event">Event Coverage</option>
                  <option value="inspection">Property Inspection</option>
                  <option value="agriculture">Agriculture Monitoring</option>
                  <option value="personal">Personal / Recreational</option>
                  <option value="other">Other Lawful Use</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Describe what you want to capture..." rows={3}
                  style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', resize:'vertical' as const, fontFamily:'inherit', boxSizing:'border-box' as const }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Preferred Date and Time</label>
                <input type="datetime-local" value={form.scheduledAt} onChange={e => setForm(f => ({...f, scheduledAt: e.target.value}))}
                  style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Duration: {form.durationMinutes} minutes — Estimated: ${form.durationMinutes}.00</label>
                <input type="range" min={15} max={120} step={15} value={form.durationMinutes} onChange={e => setForm(f => ({...f, durationMinutes: parseInt(e.target.value)}))}
                  style={{ width:'100%', accentColor:'#6366f1' }} />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'#6e6e73', marginTop:'0.25rem' }}><span>15 min ($15)</span><span>120 min ($120)</span></div>
              </div>
            </div>
            <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem' }}>
              <button onClick={() => setStep(1)} style={{ flex:1, backgroundColor:'#f5f5f7', color:'#1d1d1f', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>← Back</button>
              <button onClick={() => setStep(3)} disabled={!form.purpose || !form.description} style={{ flex:2, backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', opacity:!form.purpose||!form.description?0.5:1, fontFamily:'inherit' }}>Review and Confirm →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'1.5rem' }}>Step 3: Review and Confirm</h2>
            <div style={{ backgroundColor:'#f5f5f7', borderRadius:'1rem', padding:'1.25rem', marginBottom:'1.25rem' }}>
              {[['Zone', zoneName],['Purpose', form.purpose.replace('_',' ')],['Duration', form.durationMinutes+' minutes'],['Estimated Cost', '$'+form.durationMinutes+'.00'],['Pre-auth Hold', '$30.00 (released after session)']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.625rem', fontSize:'0.875rem' }}>
                  <span style={{ color:'#6e6e73' }}>{k}</span>
                  <span style={{ fontWeight:'600', color:'#1d1d1f' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor:'#fffbeb', border:'1px solid #fde68a', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.5rem' }}>
              <p style={{ fontSize:'0.8rem', color:'#92400e', margin:0 }}>💳 A $30 pre-authorization will be placed on your card. You are only charged for actual flight time at $1/minute.</p>
            </div>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button onClick={() => setStep(2)} style={{ flex:1, backgroundColor:'#f5f5f7', color:'#1d1d1f', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>← Back</button>
              <button onClick={submit} disabled={loading} style={{ flex:2, backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', opacity:loading?0.6:1, fontFamily:'inherit' }}>
                {loading ? 'Submitting...' : '🚁 Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'-apple-system,sans-serif',color:'#6e6e73',fontSize:'1rem'}}>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}
