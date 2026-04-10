// TicketPriorityBadge.jsx
export default function TicketPriorityBadge({ priority }) {
  const v = (priority ?? "normal").toLowerCase().replace(" ", "-");
  return <span className={`tick-priority tick-priority--${v}`}>{priority}</span>;
}