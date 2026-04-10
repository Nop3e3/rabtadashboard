// TicketsTable.jsx
import TicketRow from "./Ticketrow.jsx";

const COLS = ["Ticket ID", "User", "Subject", "Category", "Priority", "Status", "Last Update", "Actions"];

function Pagination({ page, totalPages, onPage }) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (page > 5) pages.push("...");
    if (page > 3 && page < totalPages - 2) pages.push(page);
    if (page < totalPages - 4) pages.push("...");
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  }

  return (
    <div className="sup-pagination">
      <button className="sup-pg-btn sup-pg-btn--nav" onClick={() => onPage(Math.max(1, page - 1))}>‹</button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} className="sup-pg-dots">…</span>
        ) : (
          <button key={p} className={`sup-pg-btn${p === page ? " sup-pg-btn--active" : ""}`}
            onClick={() => onPage(p)}>{p}</button>
        )
      )}
      <button className="sup-pg-btn sup-pg-btn--nav" onClick={() => onPage(Math.min(totalPages, page + 1))}>›</button>
    </div>
  );
}

export default function TicketsTable({ tickets, page, totalPages, totalResults, pageSize, onPage, onView }) {
  const from = (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, totalResults);

  return (
    <div className="sup-table">
      <div className="sup-table__header">
        {COLS.map((c, i) => <span key={i} className="sup-table__th">{c}</span>)}
      </div>

      {tickets.length === 0
        ? <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>No tickets found.</div>
        : tickets.map((t, i) => <TicketRow key={t.id + i} ticket={t} onView={onView} />)
      }

      <div className="sup-table-footer">
        <span className="sup-table-footer__info">
          Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{totalResults}</strong> tickets
        </span>
        <Pagination page={page} totalPages={totalPages} onPage={onPage} />
      </div>
    </div>
  );
}