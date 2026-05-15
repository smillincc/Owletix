'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f7', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif', overflowX: 'hidden' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(245,245,247,0.8)', backdropFilter: 'blur(20px)', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent', transition: 'all 0.3s' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#1d1d1f' }}>
          <span style={{ fontSize: '1.4rem' }}>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Owletix</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[['Zones', '/zones'], ['How it works', '/how-it-works'], ['For Pilots', '/pilot/onboarding'], ['Safety', '/safety']].map(([l, h]) => (
            <Link key={l} href={h} style={{ color: '#6e6e73', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>{l}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', padding: '0.5rem 1rem' }}>Sign in</Link>
          <Link href="/auth/signup" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', padding: '0.55rem 1.25rem', borderRadius: '980px' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8rem 2rem 5rem', background: 'linear-gradient(180deg, #fff 0%, #f5f5f7 60%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '980px', padding: '0.4rem 1rem', marginBottom: '2rem', fontSize: '0.8rem', color: '#6366f1', fontWeight: '600', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#6366f1', borderRadius: '50%', display: 'inline-block' }}></span>
          Now live in Los Angeles, San Francisco & New York
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.05', marginBottom: '1.5rem', color: '#1d1d1f', maxWidth: '850px' }}>
          The sky,<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>on demand.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: '#6e6e73', maxWidth: '560px', lineHeight: '1.6', marginBottom: '3rem', fontWeight: '400' }}>
          Book verified drone pilots for live aerial views of any approved location. Real estate, events, inspections — all lawful, all live.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth/signup" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', padding: '0.9rem 2.25rem', borderRadius: '980px', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}>Book a flight →</Link>
          <Link href="/zones" style={{ backgroundColor: '#fff', color: '#1d1d1f', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', padding: '0.9rem 2.25rem', borderRadius: '980px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>Browse zones</Link>
        </div>
        <div style={{ display: 'flex', gap: '4rem', marginTop: '6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['500+', 'Verified Pilots'], ['50+', 'Approved Zones'], ['4.9★', 'Average Rating'], ['100%', 'Lawful Flights']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f' }}>{n}</div>
              <div style={{ fontSize: '0.8rem', color: '#6e6e73', marginTop: '0.25rem', fontWeight: '500' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '7rem 2rem', backgroundColor: '#fff', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>How it works</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f' }}>Live aerial views in three steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '01', icon: '🗺️', title: 'Choose a location', desc: 'Browse verified public zones or submit a private property authorization. Every location is pre-approved for flight.' },
            { step: '02', icon: '🔐', title: 'Book & pay securely', desc: 'Reserve with a simple pre-authorization. Only charged for actual flight time, 15-minute minimum.' },
            { step: '03', icon: '🎥', title: 'Watch live', desc: 'Your verified pilot streams directly to you in real-time HD. Request repositioning, zoom, and more.' },
          ].map(s => (
            <div key={s.step} style={{ backgroundColor: '#f5f5f7', borderRadius: '1.5rem', padding: '2.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontSize: '2.5rem', fontWeight: '900', color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.05em' }}>{s.step}</div>
              <div style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.6rem', color: '#1d1d1f', letterSpacing: '-0.02em' }}>{s.title}</h3>
              <p style={{ color: '#4a4a4f', lineHeight: '1.7', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: '5rem 2rem 7rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f' }}>Built for every need</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '🏡', title: 'Real Estate', desc: 'Stunning aerial footage for property listings before they go live', color: '#6366f1' },
            { icon: '🎬', title: 'Events', desc: 'Capture weddings, festivals, and private events from above', color: '#06b6d4' },
            { icon: '🔭', title: 'Inspections', desc: 'Roof, solar, and infrastructure checks without risky access', color: '#f59e0b' },
            { icon: '🌾', title: 'Agriculture', desc: 'Monitor crops, irrigation, and land across large properties', color: '#10b981' },
          ].map(u => (
            <div key={u.title} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${u.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem' }}>{u.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.4rem', color: '#1d1d1f' }}>{u.title}</h3>
              <p style={{ color: '#4a4a4f', fontSize: '0.875rem', lineHeight: '1.6' }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pilot CTA */}
      <section style={{ margin: '0 2rem 7rem', maxWidth: '1060px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', borderRadius: '2rem', padding: '4rem 3rem', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🚁</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.875rem' }}>Are you a drone pilot?</h2>
          <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2.25rem', lineHeight: '1.6' }}>Join our network of FAA-certified pilots. Earn $0.70/min, set your own schedule, fly missions near you.</p>
          <Link href="/pilot/onboarding" style={{ backgroundColor: '#fff', color: '#6366f1', textDecoration: 'none', fontSize: '1rem', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '980px', display: 'inline-block' }}>Apply to fly →</Link>
        </div>
      </section>

      {/* Safety */}
      <section style={{ padding: '5rem 2rem 7rem', backgroundColor: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>🔒</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '1rem' }}>Safety & compliance, always</h2>
          <p style={{ color: '#444', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1rem' }}>Every mission passes our AI risk engine. Every pilot is identity-verified and FAA-certified. No surveillance. No tracking. No exceptions.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['FAA Part 107 Pilots Only', 'Identity Verified', 'No Surveillance Policy', 'Live T&S Monitoring'].map(t => (
              <span key={t} style={{ backgroundColor: '#f5f5f7', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '980px', padding: '0.5rem 1.1rem', fontSize: '0.82rem', color: '#1d1d1f', fontWeight: '500' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2.5rem 2.5rem', borderTop: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#f5f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🦉</span>
          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1d1d1f' }}>Owletix</span>
          <span style={{ color: '#6e6e73', fontSize: '0.85rem', marginLeft: '0.75rem' }}>© 2026 Owletix Inc.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Safety', 'Contact'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: '#6e6e73', textDecoration: 'none', fontSize: '0.85rem' }}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
