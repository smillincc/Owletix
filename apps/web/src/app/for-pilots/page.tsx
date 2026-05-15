'use client';
import Link from 'next/link';

const DroneIcon = ({ size = 32, color = '#6366f1' }) => (
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

export default function ForPilotsPage() {
  return (
    <div style={{ backgroundColor: '#f5f5f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <nav style={{ padding: '0 2.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <DroneIcon size={26} color="#6366f1" />
          <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/pilot/onboarding" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.55rem 1.25rem', borderRadius: '980px' }}>Apply now</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <DroneIcon size={64} color="#fff" />
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Fly. Earn. Repeat.</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>Join our network of verified drone pilots and turn your FAA certification into a steady income stream.</p>
        <Link href="/pilot/onboarding" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', fontWeight: '800', padding: '1rem 2.5rem', borderRadius: '980px', fontSize: '1rem', display: 'inline-block' }}>Apply to fly today</Link>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>

        {/* Earnings */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>What you can earn</h2>
          <p style={{ color: '#6e6e73', marginBottom: '3rem', fontSize: '0.95rem' }}>Based on average pilot activity. Actual earnings depend on your location and availability.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { label: 'Part-time', flights: '5 flights/week', earn: '$140', period: 'per week', desc: '~2 hours flying' },
              { label: 'Active', flights: '15 flights/week', earn: '$420', period: 'per week', desc: '~5 hours flying', highlight: true },
              { label: 'Full-time', flights: '30 flights/week', earn: '$840', period: 'per week', desc: '~8 hours flying' },
            ].map(e => (
              <div key={e.label} style={{ backgroundColor: e.highlight ? '#6366f1' : '#fff', border: `1px solid ${e.highlight ? '#6366f1' : 'rgba(0,0,0,0.07)'}`, borderRadius: '1.25rem', padding: '2rem', boxShadow: e.highlight ? '0 8px 30px rgba(99,102,241,0.3)' : '0 1px 6px rgba(0,0,0,0.04)', transform: e.highlight ? 'scale(1.04)' : 'none' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: '700', color: e.highlight ? 'rgba(255,255,255,0.7)' : '#6e6e73', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{e.label}</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: e.highlight ? '#fff' : '#1d1d1f', letterSpacing: '-0.04em', marginBottom: '0.2rem' }}>{e.earn}</p>
                <p style={{ fontSize: '0.8rem', color: e.highlight ? 'rgba(255,255,255,0.7)' : '#6e6e73', marginBottom: '1rem' }}>{e.period}</p>
                <div style={{ backgroundColor: e.highlight ? 'rgba(255,255,255,0.15)' : '#f5f5f7', borderRadius: '0.625rem', padding: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', color: e.highlight ? 'rgba(255,255,255,0.9)' : '#6e6e73' }}>{e.flights}</p>
                  <p style={{ fontSize: '0.75rem', color: e.highlight ? 'rgba(255,255,255,0.65)' : '#6e6e73' }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: '#6e6e73', fontSize: '0.8rem', marginTop: '1.5rem' }}>You keep 70% of every session. Payouts processed every Friday via Stripe.</p>
        </div>

        {/* Requirements */}
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Requirements</h2>
          <p style={{ color: '#6e6e73', fontSize: '0.9rem', marginBottom: '2rem' }}>We hold our pilots to the highest standards. Here is what you need to apply.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { req: 'FAA Part 107 Certificate', detail: 'Valid Remote Pilot Certificate required. No exceptions.', required: true },
              { req: 'Drone Insurance', detail: 'Minimum $1M liability coverage per occurrence.', required: true },
              { req: 'FAA Remote ID', detail: 'Your drone must broadcast Remote ID during all flights.', required: true },
              { req: 'Identity Verification', detail: 'Government ID verified through our secure process.', required: true },
              { req: 'Drone Registration', detail: 'FAA-registered drone with registration number on file.', required: true },
              { req: 'Clean record', detail: 'No history of FAA violations or safety incidents.', required: true },
            ].map(r => (
              <div key={r.req} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ecfdf5', border: '1.5px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.875rem', color: '#1d1d1f', marginBottom: '0.2rem' }}>{r.req}</p>
                  <p style={{ fontSize: '0.8rem', color: '#6e6e73', lineHeight: '1.5' }}>{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to join */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>How to join</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              { step: '1', title: 'Create your pilot account', desc: 'Sign up and select the Pilot role during registration.' },
              { step: '2', title: 'Verify your identity', desc: 'Complete our secure identity verification process.' },
              { step: '3', title: 'Submit your credentials', desc: 'Upload your FAA Part 107 certificate, drone registration, and insurance documents.' },
              { step: '4', title: 'Connect your bank account', desc: 'Set up Stripe payouts so you can receive earnings every Friday.' },
              { step: '5', title: 'Submit for approval', desc: 'Our team reviews your profile within 2-3 business days.' },
              { step: '6', title: 'Start flying and earning', desc: 'Once approved, toggle your availability and start receiving mission requests near you.' },
            ].map(s => (
              <div key={s.step} style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#f0f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#6366f1' }}>{s.step}</span>
                </div>
                <div>
                  <h3 style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1d1d1f', marginBottom: '0.25rem' }}>{s.title}</h3>
                  <p style={{ color: '#6e6e73', fontSize: '0.85rem', lineHeight: '1.5' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Ready to start flying?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: '1.6' }}>Applications take less than 10 minutes. Approvals within 2-3 business days.</p>
          <Link href="/pilot/onboarding" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '980px', display: 'inline-block', fontSize: '0.95rem' }}>Start your application</Link>
        </div>
      </div>
    </div>
  );
}
