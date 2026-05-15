'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'CUSTOMER' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = { width: '100%', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#1d1d1f', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };

  if (success) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: '380px', padding: '2rem' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🎉</div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1d1d1f', marginBottom: '0.75rem' }}>Account created!</h1>
        <p style={{ color: '#6e6e73', marginBottom: '2rem', lineHeight: '1.6' }}>Check your email to verify your address, then sign in.</p>
        <Link href="/auth/login" style={{ backgroundColor: '#1d1d1f', color: '#fff', textDecoration: 'none', padding: '0.875rem 2rem', borderRadius: '980px', fontWeight: '600', fontSize: '0.95rem', display: 'inline-block' }}>Sign in now</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#1d1d1f', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🦉</span>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Owletix</span>
          </Link>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#1d1d1f', marginBottom: '0.4rem' }}>Create your account</h1>
          <p style={{ color: '#6e6e73', fontSize: '0.9rem' }}>Join thousands using Owletix today</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '1.5rem', padding: '2.25rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {[{ value: 'CUSTOMER', icon: '👁', label: 'Book aerial views', sub: 'I want to see from above' }, { value: 'PILOT', icon: '🚁', label: 'Fly and earn', sub: 'I am a drone pilot' }].map(r => (
              <button key={r.value} onClick={() => update('role', r.value)} type="button" style={{ backgroundColor: form.role === r.value ? '#f0f0ff' : '#f5f5f7', border: '2px solid ' + (form.role === r.value ? '#6366f1' : 'transparent'), borderRadius: '1rem', padding: '1rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{r.icon}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1d1d1f' }}>{r.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6e6e73', marginTop: '0.15rem' }}>{r.sub}</div>
              </button>
            ))}
          </div>
          {error && <div style={{ backgroundColor: '#fff2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.875rem', marginBottom: '1.25rem', color: '#dc2626', fontSize: '0.875rem' }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.35rem' }}>First name</label>
                <input value={form.firstName} onChange={e => update('firstName', e.target.value)} required placeholder="Jane" style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.35rem' }}>Last name</label>
                <input value={form.lastName} onChange={e => update('lastName', e.target.value)} required placeholder="Smith" style={inp} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.35rem' }}>Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required placeholder="you@example.com" style={inp} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '0.35rem' }}>Password</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required placeholder="Min. 8 characters" style={inp} />
            </div>
            <button type="submit" disabled={loading} style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '980px', padding: '0.9rem', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1, marginTop: '0.25rem', fontFamily: 'inherit' }}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
            <p style={{ fontSize: '0.72rem', color: '#6e6e73', textAlign: 'center', lineHeight: '1.5', margin: 0 }}>By signing up you agree to our Terms and Privacy Policy</p>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: '#6e6e73', fontSize: '0.875rem', marginTop: '1.5rem' }}>
          Already have an account? <Link href="/auth/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
