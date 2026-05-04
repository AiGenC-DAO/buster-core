'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { RoleNav } from '../../components/role-nav';

type Profile = {
  full_name: string | null;
  email: string | null;
  role: string;
  organization_id: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organizationName, setOrganizationName] = useState('');
  const [status, setStatus] = useState('Checking login...');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        setStatus('Redirecting to login...');
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
      setStatus('Loading dashboard...');

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name,email,role,organization_id')
        .eq('id', userData.user.id)
        .single();

      if (profileError || !profileData) {
        setStatus(profileError?.message || 'Profile not found');
        return;
      }

      setProfile(profileData);

      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('name')
        .eq('id', profileData.organization_id)
        .single();

      if (orgError || !orgData) {
        setStatus(orgError?.message || 'Organization not found');
        return;
      }

      setOrganizationName(orgData.name);
      setStatus('');
    }

    loadDashboard();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  if (!isAuthorized || status) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <section style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: 18, padding: 28 }}>
          <h1 style={{ color: '#f6c343', marginTop: 0 }}>Buster Core</h1>
          <p style={{ color: '#b8b8b8' }}>{status}</p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: 32 }}>
      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ color: '#f6c343', marginBottom: 6 }}>Buster Core Dashboard</h1>
            <p style={{ color: '#b8b8b8', marginTop: 0 }}>Early Adopter Program command center</p>
          </div>
          <button onClick={signOut}>Sign Out</button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
          <aside style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: 18, padding: 20 }}>
            {profile && <RoleNav role={profile.role} />}
          </aside>

          <section style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: 18, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>Operator Profile</h2>
            {profile && (
              <>
                <p><strong>Full name:</strong> {profile.full_name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Organization:</strong> {organizationName}</p>
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
