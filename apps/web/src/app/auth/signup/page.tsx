'use client';
import { useState } from 'react';

export default function SignupPage() {
  return (
    <main >
      <div >
        <div >
          <span >🦉</span>
          <h1 >Create your account</h1>
        </div>
        <div >
          <div >
            <div >
              <div>
                <label >First Name</label>
                <input type="text"  />
              </div>
              <div>
                <label >Last Name</label>
                <input type="text"  />
              </div>
            </div>
            <div>
              <label >Email</label>
              <input type="email"  />
            </div>
            <div>
              <label >Password</label>
              <input type="password"  />
            </div>
            <button >
              Create Account
            </button>
          </div>
          <p >
            Already have an account? <a href="/auth/login" >Sign in</a>
          </p>
        </div>
      </div>
    </main>
  );
}
