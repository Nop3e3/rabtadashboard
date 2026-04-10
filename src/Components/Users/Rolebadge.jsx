// RoleBadge.jsx
// Props: role  string ("Entrepreneur" | "Mentor" | "Supplier" | any)

export default function RoleBadge({ role }) {
  const variant = (role ?? "").toLowerCase();
  return (
    <span className={`role-badge role-badge--${variant}`}>
      {role ?? "—"}
    </span>
  );
}