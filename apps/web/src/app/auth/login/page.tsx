'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('owletix_access_token', data.accessToken);
      localStorage.setItem('owletix_user', JSON.stringify(data.user));
      window.location.href = data.user?.role === 'PILOT' ? '/pilot/dashboard' : '/customer/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = { width: '100%', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#1d1d1f', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#1d1d1f', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🦉</span>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Owletix</span>
          </Link>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.4rem' }}>Welcome back</h1>
          <p style={{ color: '#6e6e73', fontSize: '0.9rem' }}>Sign in to your account</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '2.25rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
          {error && <div style={{ backgroundColor: '#fff2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.875rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.4rem' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inp} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1d1d1f' }}>Password</label>
                <Link href="/auth/forgot-password" style={{ fontSize: '0.8rem', color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>Forgot?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="........" style={inp} />
            </div>
            <button type="submit" disabled={loading} style={{ backgroundColor: '#1d1d1f', color: '#fff', border: 'none', borderRadius: '980px', padding: '0.9rem', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }}></div>
            <span style={{ color: '#6e6e73', fontSize: '0.8rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }}></div>
          </div>
          <Link href="/pilot/onboarding" style={{ display: 'block', textAlign: 'center', backgroundColor: '#f5f5f7', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '980px', padding: '0.875rem', fontSize: '0.875rem', fontWeight: '600', color: '#1d1d1f', textDecoration: 'none' }}>
            🚁 Apply as a drone pilot
          </Link>
        </div>
        <p style={{ textAlign: 'center', color: '#6e6e73', fontSize: '0.875rem', marginTop: '1.5rem' }}>
          No account? <Link href="/auth/signup" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
