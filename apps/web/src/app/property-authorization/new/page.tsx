'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropertyAuthPage() {
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    propertyName: '',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    lat: '',
    lng: '',
    ownershipType: '',
    purpose: '',
    scheduledDate: '',
    durationHours: 1,
    description: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerRelation: '',
  });
  const [declarations, setDeclarations] = useState<Record<string,boolean>>({});

  const DECLARATIONS = [
    { key: 'd1', text: 'I am the owner of this property OR I have explicit written authorization from the property owner to permit drone operations' },
    { key: 'd2', text: 'I confirm this property is NOT located within restricted airspace, national parks, military zones, or other prohibited areas' },
    { key: 'd3', text: 'I understand the drone pilot will operate under FAA Part 107 regulations and maintain visual line of sight at all times' },
    { key: 'd4', text: 'I confirm no drone flight will exceed 400 feet AGL above this property' },
    { key: 'd5', text: 'I accept full responsibility for obtaining any additional local permits required for drone operations at this location' },
    { key: 'd6', text: 'I confirm this authorization is NOT for surveillance, tracking, or monitoring any individual person' },
    { key: 'd7', text: 'I understand Owletix will review this request and reserves the right to deny it without explanation' },
  ];

  const allDeclared = DECLARATIONS.every(d => declarations[d.key]);

  useEffect(() => {
    const u = localStorage.getItem('owletix_user');
    const token = localStorage.getItem('owletix_access_token');
    if (!u || !token) { window.location.href = '/auth/login'; return; }
    const parsed = JSON.parse(u);
    // Don't hard redirect - show banner instead
    setUser(parsed);
  }, []);

  const update = (k: string, v: any) => setForm(f => ({...f, [k]: v}));

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('owletix_access_token');
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property-authorizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ ...form, declarations }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setSuccess(true);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const NAV = [['⊞','Dashboard','/customer/dashboard',false],['🗺','Browse Zones','/zones',false],['📋','My Missions','/customer/missions',false],['🏠','Property Auth','/property-authorization/new',true],['✅','Verify ID','/customer/verify',false],['⚙️','Settings','/customer/settings',false]] as [string,string,string,boolean][];

  const Sidebar = () => (
    <div style={{ position:'fixed', left:0, top:0, bottom:0, width:'240px', backgroundColor:'#fff', borderRight:'1px solid rgba(0,0,0,0.08)', padding:'1.5rem 1.25rem', display:'flex', flexDirection:'column', zIndex:50, overflowY:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2.5rem' }}>
        <span style={{ fontSize:'1.5rem' }}>🦉</span>
        <span style={{ fontWeight:'800', fontSize:'1rem', color:'#1d1d1f' }}>Owletix</span>
      </div>
      {NAV.map(([icon,label,href,active]) => (
        <Link key={label as string} href={href as string} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem 0.875rem', borderRadius:'0.625rem', textDecoration:'none', color:active?'#6366f1':'#6e6e73', backgroundColor:active?'#f0f0ff':'transparent', fontSize:'0.875rem', fontWeight:active?'600':'400', marginBottom:'0.2rem' }}>
          <span>{icon}</span>{label}
        </Link>
      ))}
      <div style={{ marginTop:'auto', padding:'0.875rem', backgroundColor:'#f5f5f7', borderRadius:'0.875rem' }}>
        <p style={{ fontSize:'0.8rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.1rem' }}>{user?.firstName} {user?.lastName}</p>
        <p style={{ fontSize:'0.72rem', color:'#6e6e73', marginBottom:'0.5rem' }}>{user?.email}</p>
        <button onClick={() => { localStorage.clear(); window.location.href='/'; }} style={{ background:'none', border:'none', color:'#6e6e73', fontSize:'0.75rem', cursor:'pointer', padding:0 }}>Sign out</button>
      </div>
    </div>
  );

  if (success) return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <Sidebar />
      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem', display:'flex', alignItems:'center', justifyContent:'center', flex:1 }}>
        <div style={{ backgroundColor:'#fff', borderRadius:'1.5rem', padding:'3rem', maxWidth:'500px', width:'100%', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'1.25rem' }}>🏠✅</div>
          <h1 style={{ fontSize:'1.5rem', fontWeight:'800', color:'#1d1d1f', marginBottom:'0.75rem' }}>Authorization Submitted!</h1>
          <p style={{ color:'#6e6e73', lineHeight:'1.7', marginBottom:'0.75rem' }}>Your property authorization request for <strong>{form.propertyName}</strong> has been submitted for review.</p>
          <p style={{ color:'#6e6e73', lineHeight:'1.7', marginBottom:'2rem', fontSize:'0.875rem' }}>Our team will review your request within 1-2 business days. You will be notified by email once approved. Once approved, you can book a pilot for this location.</p>
          <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/customer/dashboard" style={{ backgroundColor:'#6366f1', color:'#fff', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'700', fontSize:'0.875rem' }}>Back to Dashboard</Link>
            <Link href="/zones" style={{ backgroundColor:'#f5f5f7', color:'#1d1d1f', textDecoration:'none', padding:'0.75rem 1.5rem', borderRadius:'980px', fontWeight:'600', fontSize:'0.875rem' }}>Browse Public Zones</Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f5f5f7', fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', display:'flex' }}>
      <Sidebar />
      <div style={{ marginLeft:'240px', padding:'2.5rem 3rem', overflowX:'hidden' as const }}>
        <div style={{ maxWidth:'660px' }}>
          <Link href="/customer/dashboard" style={{ color:'#6366f1', textDecoration:'none', fontSize:'0.875rem', fontWeight:'600', display:'inline-flex', alignItems:'center', gap:'0.3rem', marginBottom:'1.5rem' }}>← Back to Dashboard</Link>
          <h1 style={{ fontSize:'1.75rem', fontWeight:'800', letterSpacing:'-0.03em', color:'#1d1d1f', marginBottom:'0.25rem' }}>Property Authorization</h1>
          <p style={{ color:'#6e6e73', fontSize:'0.9rem', marginBottom:'0.5rem' }}>Submit authorization for a drone pilot to fly over your private property.</p>

          {/* Info banner */}
          <div style={{ backgroundColor:'#f0f0ff', border:'1px solid #c7d2fe', borderRadius:'1rem', padding:'1.1rem 1.25rem', marginBottom:'2rem', display:'flex', gap:'0.875rem' }}>
            <span style={{ fontSize:'1.25rem', flexShrink:0 }}>ℹ️</span>
            <p style={{ fontSize:'0.82rem', color:'#4338ca', lineHeight:'1.6', margin:0 }}>
              This form authorizes a verified Owletix pilot to conduct drone operations at your private property. All requests are reviewed by our team. Approval typically takes 1-2 business days. You must be the property owner or have explicit written permission from the owner.
            </p>
          </div>

          {/* ID Address Match Warning */}
          {user?.identityVerificationStatus !== 'VERIFIED' && (
            <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'1rem', padding:'1.1rem 1.25rem', marginBottom:'1.5rem', display:'flex', gap:'0.875rem' }}>
              <span style={{ fontSize:'1.25rem', flexShrink:0 }}>🔒</span>
              <div>
                <p style={{ fontWeight:'700', color:'#dc2626', fontSize:'0.875rem', marginBottom:'0.25rem' }}>Identity Verification Required</p>
                <p style={{ fontSize:'0.8rem', color:'#9b1c1c', lineHeight:'1.5', margin:0 }}>You must verify your identity before submitting a property authorization. The property address must match your verified ID address.</p>
                <a href="/customer/verify" style={{ display:'inline-block', marginTop:'0.625rem', backgroundColor:'#dc2626', color:'#fff', textDecoration:'none', padding:'0.4rem 1rem', borderRadius:'980px', fontSize:'0.78rem', fontWeight:'700' }}>Verify ID First →</a>
              </div>
            </div>
          )}

          {user?.identityVerificationStatus === 'VERIFIED' && (
            <div style={{ backgroundColor:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:'1rem', padding:'1rem 1.25rem', marginBottom:'1.5rem', display:'flex', gap:'0.875rem', alignItems:'center' }}>
              <span style={{ fontSize:'1.25rem' }}>✅</span>
              <div>
                <p style={{ fontWeight:'700', color:'#059669', fontSize:'0.875rem', marginBottom:'0.15rem' }}>Identity Verified</p>
                <p style={{ fontSize:'0.78rem', color:'#065f46', margin:0 }}>The property address you enter must match the address on your verified government ID. Our team will cross-check this during review.</p>
              </div>
            </div>
          )}

          {/* Progress steps */}
          <div style={{ display:'flex', gap:'0', marginBottom:'2rem' }}>
            {['Property Details','Owner Info','Declarations','Review'].map((s, i) => (
              <div key={s} style={{ flex:1, textAlign:'center' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', backgroundColor:step>i+1?'#6366f1':step===i+1?'#6366f1':'#e5e7eb', color:step>=i+1?'#fff':'#9ca3af', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.375rem', fontSize:'0.8rem', fontWeight:'700' }}>
                  {step>i+1?'✓':i+1}
                </div>
                <p style={{ fontSize:'0.65rem', color:step===i+1?'#6366f1':'#9ca3af', fontWeight:step===i+1?'600':'400' }}>{s}</p>
              </div>
            ))}
          </div>

          {error && <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.25rem', color:'#dc2626', fontSize:'0.875rem' }}>{error}</div>}

          {/* Step 1: Property Details */}
          {step === 1 && (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'1.5rem' }}>Step 1: Property Details</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Property Name / Description</label>
                  <input value={form.propertyName} onChange={e => update('propertyName', e.target.value)} placeholder="e.g. Smith Family Ranch, Sunset Vineyard"
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Street Address</label>
                  <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 Main Street"
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                  <p style={{ fontSize:'0.72rem', color:'#6366f1', marginTop:'0.3rem', fontWeight:'500' }}>⚠️ Must match the address on your verified government ID</p>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 120px 100px', gap:'0.75rem' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>City</label>
                    <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Los Angeles"
                      style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>State</label>
                    <select value={form.state} onChange={e => update('state', e.target.value)} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                      <option>CA</option><option>NV</option><option>AZ</option><option>OR</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>ZIP</label>
                    <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="90210"
                      style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Ownership Type</label>
                  <select value={form.ownershipType} onChange={e => update('ownershipType', e.target.value)} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                    <option value="">Select ownership type...</option>
                    <option value="owner">I am the property owner</option>
                    <option value="tenant">I am a tenant with owner permission</option>
                    <option value="authorized_agent">I am an authorized agent of the owner</option>
                    <option value="business">Business property — I am authorized representative</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Purpose of Drone Session</label>
                  <select value={form.purpose} onChange={e => update('purpose', e.target.value)} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                    <option value="">Select purpose...</option>
                    <option value="real_estate">Real Estate Photography / Videography</option>
                    <option value="inspection">Property Inspection</option>
                    <option value="agriculture">Agricultural Monitoring</option>
                    <option value="event">Private Event Coverage</option>
                    <option value="construction">Construction Progress</option>
                    <option value="insurance">Insurance Assessment</option>
                    <option value="personal">Personal / Family</option>
                    <option value="other">Other Lawful Purpose</option>
                  </select>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Requested Date</label>
                    <input type="date" value={form.scheduledDate} onChange={e => update('scheduledDate', e.target.value)}
                      style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Estimated Duration</label>
                    <select value={form.durationHours} onChange={e => update('durationHours', parseInt(e.target.value))} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                      <option value={4}>4 hours</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Additional Details</label>
                  <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe the specific areas of the property to be filmed, any obstacles, access points, or special instructions for the pilot..." rows={4}
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', resize:'vertical' as const, fontFamily:'inherit', boxSizing:'border-box' as const }} />
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!form.propertyName||!form.address||!form.city||!form.ownershipType||!form.purpose||user?.identityVerificationStatus!=='VERIFIED'}
                style={{ width:'100%', backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.9rem', fontSize:'0.95rem', fontWeight:'600', cursor:'pointer', opacity:!form.propertyName||!form.address||!form.city||!form.ownershipType||!form.purpose?0.5:1, fontFamily:'inherit', marginTop:'1.5rem' }}>
                {user?.identityVerificationStatus !== 'VERIFIED' ? '🔒 Verify ID First' : 'Continue to Owner Info →'}
              </button>
            </div>
          )}

          {/* Step 2: Owner Info */}
          {step === 2 && (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'0.5rem' }}>Step 2: Property Owner Information</h2>
              <p style={{ color:'#6e6e73', fontSize:'0.82rem', marginBottom:'1.5rem' }}>If you are the owner, enter your own info. If you have permission, enter the owner's info — they may be contacted for verification.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Owner Full Name</label>
                    <input value={form.ownerName} onChange={e => update('ownerName', e.target.value)} placeholder="Jane Smith"
                      style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Your Relation to Owner</label>
                    <select value={form.ownerRelation} onChange={e => update('ownerRelation', e.target.value)} style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const }}>
                      <option value="">Select...</option>
                      <option value="self">I am the owner</option>
                      <option value="tenant">Tenant</option>
                      <option value="agent">Real Estate Agent</option>
                      <option value="property_manager">Property Manager</option>
                      <option value="family">Family Member</option>
                      <option value="authorized_rep">Authorized Representative</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Owner Email</label>
                  <input type="email" value={form.ownerEmail} onChange={e => update('ownerEmail', e.target.value)} placeholder="owner@example.com"
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.82rem', fontWeight:'600', color:'#1d1d1f', marginBottom:'0.4rem' }}>Owner Phone</label>
                  <input type="tel" value={form.ownerPhone} onChange={e => update('ownerPhone', e.target.value)} placeholder="+1 (555) 000-0000"
                    style={{ width:'100%', backgroundColor:'#f5f5f7', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'0.75rem', padding:'0.875rem', color:'#1d1d1f', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div style={{ backgroundColor:'#fffbeb', border:'1px solid #fde68a', borderRadius:'0.75rem', padding:'0.875rem' }}>
                  <p style={{ fontSize:'0.78rem', color:'#92400e', lineHeight:'1.5', margin:0 }}>⚖️ <strong>Legal note:</strong> The property owner may be contacted by Owletix to confirm authorization. Providing false owner information is grounds for immediate account termination and may constitute fraud.</p>
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem' }}>
                <button onClick={() => setStep(1)} style={{ flex:1, backgroundColor:'#f5f5f7', color:'#1d1d1f', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>← Back</button>
                <button onClick={() => setStep(3)} disabled={!form.ownerName||!form.ownerEmail||!form.ownerRelation}
                  style={{ flex:2, backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', opacity:!form.ownerName||!form.ownerEmail||!form.ownerRelation?0.5:1, fontFamily:'inherit' }}>
                  Continue to Declarations →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Declarations */}
          {step === 3 && (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'0.5rem' }}>Step 3: Legal Declarations</h2>
              <p style={{ color:'#6e6e73', fontSize:'0.82rem', marginBottom:'1.25rem' }}>You must agree to all declarations to proceed. These are legally binding statements.</p>
              <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.25rem' }}>
                <p style={{ fontSize:'0.8rem', color:'#dc2626', fontWeight:'600', margin:0 }}>⚠️ These declarations are reviewed by our Trust and Safety team and may be used as evidence in legal proceedings. False declarations will result in immediate account termination and referral to law enforcement.</p>
              </div>
              {DECLARATIONS.map(d => (
                <div key={d.key} style={{ display:'flex', alignItems:'flex-start', gap:'0.875rem', marginBottom:'0.875rem', padding:'1rem', backgroundColor: declarations[d.key]?'#ecfdf5':'#f5f5f7', borderRadius:'0.75rem', border:'1px solid '+(declarations[d.key]?'#a7f3d0':'rgba(0,0,0,0.06)'), transition:'all 0.2s' }}>
                  <input type="checkbox" checked={!!declarations[d.key]} onChange={e => setDeclarations(dec => ({...dec, [d.key]: e.target.checked}))}
                    style={{ marginTop:'2px', width:'16px', height:'16px', flexShrink:0, accentColor:'#6366f1' }} />
                  <p style={{ fontSize:'0.85rem', color:'#1d1d1f', lineHeight:'1.5', margin:0 }}>{d.text}</p>
                </div>
              ))}
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem' }}>
                <button onClick={() => setStep(2)} style={{ flex:1, backgroundColor:'#f5f5f7', color:'#1d1d1f', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>← Back</button>
                <button onClick={() => setStep(4)} disabled={!allDeclared}
                  style={{ flex:2, backgroundColor:'#6366f1', color:'#fff', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', opacity:allDeclared?1:0.5, fontFamily:'inherit' }}>
                  Review Submission →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div style={{ backgroundColor:'#fff', borderRadius:'1.25rem', padding:'2rem', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontWeight:'700', fontSize:'1.1rem', color:'#1d1d1f', marginBottom:'1.5rem' }}>Step 4: Review and Submit</h2>
              <div style={{ backgroundColor:'#f5f5f7', borderRadius:'1rem', padding:'1.25rem', marginBottom:'1.25rem' }}>
                <p style={{ fontSize:'0.72rem', fontWeight:'700', color:'#6e6e73', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.875rem' }}>Property</p>
                {[
                  ['Name', form.propertyName],
                  ['Address', `${form.address}, ${form.city}, ${form.state} ${form.zip}`],
                  ['Ownership', form.ownershipType.replace('_',' ')],
                  ['Purpose', form.purpose.replace('_',' ')],
                  ['Date', form.scheduledDate || 'Flexible'],
                  ['Duration', form.durationHours + ' hour(s)'],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', fontSize:'0.875rem' }}>
                    <span style={{ color:'#6e6e73' }}>{k}</span>
                    <span style={{ fontWeight:'600', color:'#1d1d1f', textAlign:'right', maxWidth:'60%' }}>{v}</span>
                  </div>
                ))}
                <p style={{ fontSize:'0.72rem', fontWeight:'700', color:'#6e6e73', textTransform:'uppercase', letterSpacing:'0.08em', margin:'1rem 0 0.875rem' }}>Owner</p>
                {[['Name', form.ownerName],['Email', form.ownerEmail],['Relation', form.ownerRelation.replace('_',' ')]].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', fontSize:'0.875rem' }}>
                    <span style={{ color:'#6e6e73' }}>{k}</span>
                    <span style={{ fontWeight:'600', color:'#1d1d1f' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1.5rem' }}>
                <p style={{ fontSize:'0.8rem', color:'#059669', margin:0 }}>✅ All 7 legal declarations confirmed. Our team will review within 1-2 business days.</p>
              </div>
              {error && <div style={{ backgroundColor:'#fff2f2', border:'1px solid #fecaca', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1rem', color:'#dc2626', fontSize:'0.875rem' }}>{error}</div>}
              <div style={{ display:'flex', gap:'0.75rem' }}>
                <button onClick={() => setStep(3)} style={{ flex:1, backgroundColor:'#f5f5f7', color:'#1d1d1f', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>← Back</button>
                <button onClick={submit} disabled={loading}
                  style={{ flex:2, backgroundColor:'#1d1d1f', color:'#fff', border:'none', borderRadius:'980px', padding:'0.875rem', fontSize:'0.875rem', fontWeight:'700', cursor:'pointer', opacity:loading?0.6:1, fontFamily:'inherit' }}>
                  {loading ? 'Submitting...' : '🏠 Submit Authorization Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
