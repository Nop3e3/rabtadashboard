// TicketRow.jsx
import TicketPriorityBadge from "./Ticketprioritybadge.jsx";
import TicketStatusBadge   from "./Ticketstatusbadge.jsx";

export default function TicketRow({ ticket, onView }) {
  return (
    <div className="sup-row">
      <div className="sup-row__id">{ticket.id}</div>

      <div>
        <div className="sup-row__name">{ticket.user}</div>
        <div className="sup-row__email">{ticket.email}</div>
      </div>

      <div>
        <div className="sup-row__subject">{ticket.subject}</div>
        <div className="sup-row__msgs">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {ticket.messages} messages
        </div>
      </div>

      <div className="sup-row__category">{ticket.category}</div>

      <div><TicketPriorityBadge priority={ticket.priority} /></div>

      <div><TicketStatusBadge status={ticket.status} /></div>

      <div className="sup-row__date">{ticket.date}</div>

      <div>
        <button className="sup-row__view" onClick={() => onView?.(ticket)}>View</button>
      </div>
    </div>
  );
}