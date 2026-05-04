export function RoleNav({ role }: { role: string }) {
  return (
    <nav>
      <strong>Navigation</strong>
      <ul>
        <li>Dashboard</li>
        <li>{role} placeholder</li>
      </ul>
    </nav>
  );
}
