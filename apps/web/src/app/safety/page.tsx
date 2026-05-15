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

export default function SafetyPage() {
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#f0f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="#6366f1" strokeWidth="2" fill="#6366f1" fillOpacity="0.15"/>
                <path d="M9 12l2 2 4-4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', letterSpacing: '-0.04em', color: '#1d1d1f', marginBottom: '1rem' }}>Safety first, always</h1>
          <p style={{ color: '#6e6e73', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: '1.7' }}>Owletix is built around one principle: lawful, safe aerial visibility. Here is how we enforce it.</p>
        </div>

        {/* Prohibited uses */}
        <div style={{ backgroundColor: '#fff2f2', border: '1px solid #fecaca', borderRadius: '1.5rem', padding: '2.25rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#dc2626', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🚫</span> Strictly prohibited uses
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
            {[
              'Tracking or monitoring any person',
              'Surveillance of neighbors or adjacent properties',
              'Flying over schools, hospitals, or government buildings',
              'Recording or photographing minors without consent',
              'Any use that violates FAA regulations',
              'Commercial surveillance without authorization',
              'Stalking, harassment, or intimidation',
              'Law enforcement evasion or interference',
            ].map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: '#dc2626' }}>
                <span style={{ flexShrink: 0, fontWeight: '700' }}>✗</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '1.25rem', fontWeight: '600', lineHeight: '1.5' }}>
            Violations result in immediate account termination, potential law enforcement referral, and legal action. All sessions are monitored in real time.
          </p>
        </div>

        {/* Safety layers */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Our 6-layer safety system</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { num: '1', icon: '🤖', title: 'AI Risk Engine', desc: 'Every mission request is scored by our AI risk engine before any human sees it. Requests containing surveillance keywords, near banned locations, or from flagged accounts are automatically blocked or sent to manual review.' },
              { num: '2', icon: '✅', title: 'Pilot Verification', desc: 'Every pilot must pass identity verification, submit their FAA Part 107 certificate, prove drone insurance, and have their profile manually approved by our team before flying a single mission.' },
              { num: '3', icon: '📋', title: 'Safety Questionnaire', desc: 'Every customer must answer 5 safety questions before booking. Any answer indicating person tracking, surveillance, or prohibited intent immediately blocks the request.' },
              { num: '4', icon: '👁', title: 'Live Monitoring', desc: 'All active streams are visible to our admin dashboard in real time. Our Trust & Safety team can intervene, stop a stream, or preserve evidence at any moment.' },
              { num: '5', icon: '📼', title: 'Session Recording', desc: 'Every session is recorded and stored securely. Recordings are accessible only to administrators and Trust & Safety reviewers. They are retained for 90 days and may be shared with law enforcement upon valid legal request.' },
              { num: '6', icon: '⚖️', title: 'Law Enforcement Cooperation', desc: 'We maintain a formal process for responding to law enforcement requests. We cooperate fully with valid legal process and can place legal holds on evidence when required.' },
            ].map(s => (
              <div key={s.num} style={{ backgroundColor: '#fff', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#f0f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem' }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontWeight: '700', fontSize: '1rem', color: '#1d1d1f', marginBottom: '0.4rem' }}>Layer {s.num}: {s.title}</h3>
                  <p style={{ color: '#6e6e73', fontSize: '0.875rem', lineHeight: '1.7' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '2.25rem', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '1.25rem' }}>Regulatory compliance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'FAA Compliance', desc: 'All pilots hold FAA Part 107 Remote Pilot Certificate' },
              { label: 'Remote ID', desc: 'All drones broadcast FAA Remote ID signals during flight' },
              { label: 'Insurance', desc: 'Minimum $1M liability insurance required for all pilots' },
              { label: 'No-fly zones', desc: 'Our system blocks all requests near airports, restricted airspace, and sensitive locations' },
            ].map(c => (
              <div key={c.label} style={{ backgroundColor: '#f5f5f7', borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/><path d="M4.5 7l2 2L9.5 5.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#1d1d1f' }}>{c.label}</span>
                </div>
                <p style={{ color: '#6e6e73', fontSize: '0.8rem', lineHeight: '1.5' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: '1.5rem', padding: '2.5rem', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>See something concerning?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 1.75rem' }}>Report it immediately. Our Trust and Safety team is available 24/7. For emergencies, always call 911 first.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', fontWeight: '700', padding: '0.875rem 1.75rem', borderRadius: '980px', fontSize: '0.9rem' }}>Report a concern</Link>
            <a href="tel:911" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', fontWeight: '600', padding: '0.875rem 1.75rem', borderRadius: '980px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.3)' }}>Call 911 for emergencies</a>
          </div>
        </div>
      </div>
    </div>
  );
}
