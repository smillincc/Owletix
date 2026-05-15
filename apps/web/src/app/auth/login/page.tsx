'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main >
      <div >
        <div >
          <span >🦉</span>
          <h1 >Sign in to Owletix</h1>
        </div>
        <div >
          <div >
            <div>
              <label >Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                
                placeholder="you@example.com" />
            </div>
            <div>
              <label >Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                
                placeholder="••••••••" />
            </div>
            <button >
              Sign In
            </button>
          </div>
          <p >
            No account? <a href="/auth/signup" >Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}
