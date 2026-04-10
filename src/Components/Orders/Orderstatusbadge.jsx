// OrderStatusBadge.jsx
// Props: status  "Completed" | "Pending" | "Processing" | "Cancelled"

const ICONS = {
  Completed:  "✓",
  Pending:    "⏱",
  Processing: "↻",
  Cancelled:  "✕",
};

export default function OrderStatusBadge({ status }) {
  const variant = (status ?? "pending").toLowerCase();
  return (
    <span className={`ord-status ord-status--${variant}`}>
      <span className="ord-status__dot">{ICONS[status] ?? "·"}</span>
      {status}
    </span>
  );
}