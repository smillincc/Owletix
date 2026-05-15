'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'CUSTOMER' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>You're in!</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: '1.6' }}>Your account has been created. Check your email to verify your address.</p>
        <Link href="/auth/login" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '0.875rem 2rem', borderRadius: '980px', fontWeight: '600', fontSize: '0.95rem' }}>Sign in now →</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', display: 'flex' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff', marginBottom: '3rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🦉</span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Owletix</span>
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Create your account</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2rem', fontSize: '0.95rem' }}>Join thousands using Owletix today</p>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
            {[{ value: 'CUSTOMER', icon: '👁️', label: 'I want aerial views', sub: 'Book flights' }, { value: 'PILOT', icon: '🚁', label: 'I\'m a drone pilot', sub: 'Earn money flying' }].map(r => (
              <button key={r.value} onClick={() => update('role', r.value)} type="button"
                style={{ backgroundColor: form.role === r.value ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.role === r.value ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '1rem', padding: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{r.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>{r.sub}</div>
              </button>
            ))}
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#fca5a5', fontSize: '0.875rem' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>First name</label>
                <input value={form.firstName} onChange={e => update('firstName', e.target.value)} required placeholder="Jane"
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>Last name</label>
                <input value={form.lastName} onChange={e => update('lastName', e.target.value)} required placeholder="Smith"
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>Email address</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required placeholder="you@example.com"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>Password</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required placeholder="Min. 8 characters"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" disabled={loading}
              style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '980px', padding: '0.875rem', fontSize: '0.95rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem' }}>
              {loading ? 'Creating account...' : `Create ${form.role === 'PILOT' ? 'pilot' : ''} account →`}
            </button>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: '1.5' }}>
              By creating an account you agree to our Terms of Service and Privacy Policy
            </p>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <div style={{ flex: 1, background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.25), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2), transparent 50%), #050510', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ maxWidth: '380px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🌆</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Your city from above</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: '2rem' }}>See any approved public space or authorized property from a live drone feed — booked in minutes, streamed in real time.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            {[{ n: '$1', l: 'per minute' }, { n: '15min', l: 'minimum' }, { n: '70%', l: 'pilot earnings' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#06b6d4' }}>{s.n}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.2rem' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
