'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus(error.message);
      setIsLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <section style={{ width: '100%', maxWidth: 420, background: '#111', border: '1px solid #2a2a2a', borderRadius: 18, padding: 28 }}>
        <h1 style={{ color: '#f6c343', marginTop: 0 }}>Buster Core</h1>
        <p style={{ color: '#b8b8b8' }}>EAP operator login</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={{ width: '100%', padding: 12, marginTop: 6, marginBottom: 16 }} />

          <label>Password</label>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" style={{ width: '100%', padding: 12, marginTop: 6 }} />

          <label style={{ display: 'block', marginTop: 12, color: '#b8b8b8' }}>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show password
          </label>

          <button type="submit" disabled={isLoading} style={{ marginTop: 18, width: '100%' }}>
            {isLoading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        {status && <p style={{ color: '#ff5a5a' }}>{status}</p>}
      </section>
    </main>
  );
}
