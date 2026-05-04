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
      <main style={{ padding: 32 }}>
        <h1>Buster Core</h1>
        <p>{status}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Buster Core Dashboard</h1>

      {profile && (
        <>
          <RoleNav role={profile.role} />

          <section style={{ marginTop: 24 }}>
            <p><strong>Full name:</strong> {profile.full_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Organization:</strong> {organizationName}</p>
          </section>

          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </main>
  );
}
