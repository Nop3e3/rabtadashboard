// TicketStatusBadge.jsx
export default function TicketStatusBadge({ status }) {
  const v = (status ?? "open").toLowerCase().replace(" ", "-");
  return <span className={`tick-status tick-status--${v}`}>{status}</span>;
}