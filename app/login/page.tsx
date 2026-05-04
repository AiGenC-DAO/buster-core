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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setStatus(error.message);
      setIsLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
    <main style={{ padding: 32, maxWidth: 420 }}>
      <h1>Buster Core Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label><br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Password</label><br />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <label style={{ display: 'block', marginTop: 8 }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />{' '}
          Show password
        </label>

        <button type="submit" disabled={isLoading} style={{ marginTop: 16 }}>
          {isLoading ? 'Signing in...' : 'Log In'}
        </button>
      </form>

      {status && <p style={{ color: 'red' }}>{status}</p>}
    </main>
  );
}
