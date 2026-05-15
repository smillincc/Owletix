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

export default function HowItWorksPage() {
  return (
    <div style={{ backgroundColor: '#f5f5f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <nav style={{ padding: '0 2.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <DroneIcon size={26} color="#6366f1" />
          <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.55rem 1.25rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ color: '#6366f1', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Process</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', letterSpacing: '-0.04em', color: '#1d1d1f', marginBottom: '1rem' }}>How Owletix works</h1>
          <p style={{ color: '#6e6e73', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: '1.7' }}>From booking to live stream in minutes. Here is exactly how every session works.</p>
        </div>

        {/* Customer flow */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ backgroundColor: '#f0f0ff', color: '#6366f1', fontSize: '0.8rem', fontWeight: '700', padding: '0.3rem 0.75rem', borderRadius: '980px' }}>For Customers</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up in under 2 minutes. Verify your identity to unlock all features including private property bookings.', time: '2 min' },
              { step: '2', title: 'Browse approved zones', desc: 'Choose from 50+ pre-approved public locations across major US cities. Every zone has been vetted for legal drone flight.', time: '5 min' },
              { step: '3', title: 'Book your session', desc: 'Select your zone, describe what you want to see, and complete our 5-question safety questionnaire. Requests with red flags are automatically blocked.', time: '3 min' },
              { step: '4', title: 'Secure payment hold', desc: 'We place a $30 pre-authorization on your card. You are only charged for actual flight time at $1/minute, with a 15-minute minimum.', time: 'Instant' },
              { step: '5', title: 'Pilot is matched', desc: 'Our system matches your request with a nearby available verified pilot. You will be notified when a pilot accepts your mission.', time: '5-30 min' },
              { step: '6', title: 'Watch your live stream', desc: 'When your pilot takes off, join the secure live stream from any device. You can request repositioning and zoom in real time.', time: 'Live' },
              { step: '7', title: 'Pay only for what you used', desc: 'After the session ends, your card is charged for the actual flight time. The remaining hold is automatically released.', time: 'Auto' },
            ].map(s => (
              <div key={s.step} style={{ backgroundColor: '#fff', borderRadius: '1.25rem', padding: '1.75rem 2rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f0f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: '800', fontSize: '1rem', color: '#6366f1' }}>{s.step}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '1rem', color: '#1d1d1f' }}>{s.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: '600', backgroundColor: '#f0f0ff', padding: '0.2rem 0.6rem', borderRadius: '980px' }}>{s.time}</span>
                  </div>
                  <p style={{ color: '#6e6e73', fontSize: '0.9rem', lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Simple, transparent pricing</h2>
          <p style={{ color: '#6e6e73', marginBottom: '2rem', fontSize: '0.9rem' }}>No subscriptions. No hidden fees. Pay only for what you fly.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Rate', value: '$1 / min', desc: 'Per minute of actual flight time' },
              { label: 'Minimum', value: '15 min', desc: 'Minimum billed per session' },
              { label: 'Pre-auth hold', value: '$30', desc: 'Released after session ends' },
              { label: 'Pilot share', value: '70%', desc: 'Goes directly to your pilot' },
            ].map(p => (
              <div key={p.label} style={{ backgroundColor: '#f5f5f7', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#6366f1', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{p.value}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.25rem' }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#6e6e73', lineHeight: '1.4' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Common questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: 'Can I request a specific area within a zone?', a: 'Yes. During the booking questionnaire you can describe exactly what you want to see. Your pilot will do their best to accommodate, subject to flight safety.' },
              { q: 'What if my pilot cancels?', a: 'If your pilot cancels before taking off, your payment hold is immediately released and we will match you with another available pilot.' },
              { q: 'Can I book a private property?', a: 'Yes, but you must be the owner or have explicit written authorization. Submit a Property Authorization request and our team will review it within 1-2 business days.' },
              { q: 'Are sessions recorded?', a: 'Sessions may be recorded for safety and compliance purposes. Recordings are accessible only to Owletix administrators and Trust & Safety reviewers, never to third parties.' },
              { q: 'What if I see something concerning during a live stream?', a: 'Use the Report Concern button in the live stream viewer. Our Trust & Safety team will review immediately. For emergencies, always call 911 first.' },
            ].map(f => (
              <div key={f.q} style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1d1d1f', marginBottom: '0.5rem' }}>{f.q}</h3>
                <p style={{ color: '#6e6e73', fontSize: '0.875rem', lineHeight: '1.6' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Ready to see from above?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: '1.6' }}>Book your first aerial view session in under 5 minutes.</p>
          <Link href="/auth/signup" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '980px', display: 'inline-block', fontSize: '0.95rem' }}>Get started free</Link>
        </div>
      </div>
    </div>
  );
}
