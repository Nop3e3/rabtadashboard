// OrdersTable.jsx
// Props:
//   orders       array
//   page         number
//   totalPages   number
//   totalResults number
//   pageSize     number
//   onPage       fn(page)
//   onView       fn(order)

import OrderRow from "./Orderrow.jsx";

const COLS = ["Order ID", "Entrepreneur", "Supplier", "Product", "Amount", "Status", "Date", ""];

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
    <div className="pagination">
      <button className="pg-btn pg-btn--nav" onClick={() => onPage(Math.max(1, page - 1))}>‹</button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} className="pg-dots">…</span>
        ) : (
          <button
            key={p}
            className={`pg-btn${p === page ? " pg-btn--active" : ""}`}
            onClick={() => onPage(p)}
          >
            {p}
          </button>
        )
      )}
      <button className="pg-btn pg-btn--nav" onClick={() => onPage(Math.min(totalPages, page + 1))}>›</button>
    </div>
  );
}

export default function OrdersTable({ orders, page, totalPages, totalResults, pageSize, onPage, onView }) {
  const from = (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, totalResults);

  return (
    <div className="ord-table">
      {/* Header */}
      <div className="ord-table__header">
        {COLS.map((c, i) => <span key={i} className="ord-table__th">{c}</span>)}
      </div>

      {/* Rows */}
      {orders.length === 0
        ? <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>
            No orders found.
          </div>
        : orders.map((o, i) => (
            <OrderRow key={o.id + i} order={o} onView={onView} />
          ))
      }

      {/* Footer + Pagination */}
      <div className="ord-table-footer">
        <span className="ord-table-footer__info">
          Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
          <strong>{totalResults.toLocaleString()}</strong> results
        </span>
        <Pagination page={page} totalPages={totalPages} onPage={onPage} />
      </div>
    </div>
  );
}