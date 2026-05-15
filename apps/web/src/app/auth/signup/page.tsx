'use client';
import { useState } from 'react';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🦉</span>
          <h1 className="text-2xl font-bold text-white mt-2">Create your account</h1>
        </div>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">First Name</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input type="email" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input type="password" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Create Account
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account? <a href="/auth/login" className="text-blue-400 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </main>
  );
}
