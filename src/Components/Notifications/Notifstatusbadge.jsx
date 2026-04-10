// NotifStatusBadge.jsx
// Props: status "Sent" | "Scheduled" | "Draft"

export default function NotifStatusBadge({ status }) {
  const v = (status ?? "draft").toLowerCase();
  return (
    <span className={`notif-badge notif-badge--${v}`}>{status}</span>
  );
}