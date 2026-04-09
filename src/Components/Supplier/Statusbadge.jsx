// StatusBadge.jsx
// Props: status ("Verified" | "Pending" | "Rejected")

const ICONS = { Verified: "✓", Pending: "⏱", Rejected: "✕" };

export default function StatusBadge({ status }) {
  const variant = (status ?? "Pending").toLowerCase();
  return (
    <span className={`status-badge status-badge--${variant}`}>
      <span className="status-badge__icon">{ICONS[status] ?? "⏱"}</span>
      {status}
    </span>
  );
}