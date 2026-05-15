'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('owletix_access_token', data.accessToken);
      localStorage.setItem('owletix_user', JSON.stringify(data.user));
      window.location.href = data.user?.role === 'PILOT' ? '/pilot/dashboard' : '/customer/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex' }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff', marginBottom: '3rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🦉</span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Welcome back</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Sign in to your account to continue</p>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#fca5a5', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'rgba(255,255,255,0.6)' }}>Password</label>
                <Link href="/auth/forgot-password" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" disabled={loading}
              style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '980px', padding: '0.875rem', fontSize: '0.95rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem', transition: 'opacity 0.2s' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginTop: '2rem' }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>Sign up free</Link>
          </p>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: '1.5' }}>
              Are you a drone pilot?{' '}
              <Link href="/auth/signup?role=pilot" style={{ color: '#06b6d4', textDecoration: 'none' }}>Apply to join our pilot network →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.3), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.2), transparent 50%), #0a0a1a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🚁</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Sky views,<br />on demand</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', fontSize: '0.95rem' }}>Book verified drone pilots for live aerial views of any approved location. Real estate, events, inspections — all lawful, all live.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2.5rem' }}>
            {['FAA-certified pilots only', 'Real-time HD streaming', 'No surveillance, ever'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#6366f1', fontWeight: '700' }}>✓</span>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
