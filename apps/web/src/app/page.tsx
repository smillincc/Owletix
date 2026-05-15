'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', overflowX: 'hidden' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none', transition: 'all 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🦉</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Owletix</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['How it works', 'For Pilots', 'Zones', 'Safety'].map(item => (
            <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}>{item}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', padding: '0.5rem 1.25rem', borderRadius: '980px', transition: 'opacity 0.2s' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8rem 2rem 4rem', background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.15), transparent), #000' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '980px', padding: '0.4rem 1rem', marginBottom: '2rem', fontSize: '0.8rem', color: '#a5b4fc' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#6366f1', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #6366f1' }}></span>
          Now live in Los Angeles, San Francisco & New York
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.0', marginBottom: '1.5rem', maxWidth: '900px' }}>
          The sky,<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>on demand.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem', fontWeight: '400' }}>
          Book verified drone pilots for live aerial views of any approved location. Real estate, events, inspections — all lawful, all live.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', padding: '1rem 2.5rem', borderRadius: '980px', boxShadow: '0 0 40px rgba(99,102,241,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            Book a flight →
          </Link>
          <Link href="/pilot/onboarding" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', padding: '1rem 2.5rem', borderRadius: '980px', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
            Become a pilot
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '4rem', marginTop: '6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { num: '500+', label: 'Verified Pilots' },
            { num: '50+', label: 'Approved Zones' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '100%', label: 'Lawful Flights' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Simple Process</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.1' }}>Live aerial views<br />in three steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { step: '01', icon: '📍', title: 'Choose a location', desc: 'Browse our verified public zones or submit a private property authorization. Every location is pre-approved for flight.' },
            { step: '02', icon: '💳', title: 'Book & pay securely', desc: 'Reserve your session with a simple pre-authorization. You\'re only charged for the actual flight time, with a 15-minute minimum.' },
            { step: '03', icon: '📡', title: 'Watch live', desc: 'Your verified pilot takes off and streams directly to you in real-time. Request, reposition, and control your view.' },
          ].map(s => (
            <div key={s.step} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '3rem', fontWeight: '900', color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em' }}>{s.step}</div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', fontSize: '0.95rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: '4rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>Built for every use case</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '🏠', title: 'Real Estate', desc: 'Showcase properties with stunning aerial footage before the listing goes live', color: '#6366f1' },
            { icon: '🎉', title: 'Events', desc: 'Capture weddings, festivals, and private events from above in real time', color: '#06b6d4' },
            { icon: '🔍', title: 'Inspections', desc: 'Roof, solar, and infrastructure inspections without dangerous access', color: '#3b82f6' },
            { icon: '🌿', title: 'Agriculture', desc: 'Monitor crops, irrigation, and land conditions across large properties', color: '#10b981' },
          ].map(u => (
            <div key={u.title} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '2rem', transition: 'border-color 0.3s', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${u.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>{u.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{u.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: '1.6' }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pilot CTA */}
      <section style={{ margin: '0 2rem 8rem', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(6,182,212,0.1) 100%)', border: '1px solid rgba(99,102,241,0.2)', padding: '5rem 3rem', textAlign: 'center', maxWidth: '1160px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✈️</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Are you a drone pilot?</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>Join our network of FAA-certified pilots. Set your own schedule, earn $1/min, and fly missions near you.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/pilot/onboarding" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', padding: '0.875rem 2rem', borderRadius: '980px' }}>Apply to fly →</Link>
          <Link href="/how-it-works" style={{ backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.875rem 2rem', borderRadius: '980px', border: '1px solid rgba(255,255,255,0.15)' }}>Learn more</Link>
        </div>
      </section>

      {/* Safety */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🛡️</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Safety & compliance first</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', marginBottom: '3rem', fontSize: '1rem' }}>Every mission passes our AI risk engine. Every pilot is identity-verified and FAA-certified. No surveillance. No tracking. No exceptions.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['FAA Part 107 Pilots Only', 'Identity Verified', 'No Surveillance Policy', 'Live T&S Monitoring'].map(t => (
              <span key={t} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '980px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Owletix</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginLeft: '1rem' }}>© 2026 Owletix Inc.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Safety', 'Contact'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
