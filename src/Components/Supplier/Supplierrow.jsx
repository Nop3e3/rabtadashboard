// SupplierRow.jsx
// Props: supplier {name, orders, category, location, rating, status}
//        onView, onEdit, onApprove, onReject

import StatusBadge from "./Statusbadge";

export default function SupplierRow({ supplier, onView, onEdit, onApprove, onReject }) {
  const isPending = supplier.status === "Pending";

  return (
    <div className="supplier-row">

      {/* Name + orders */}
      <div>
        <div className="supplier-row__name">{supplier.name}</div>
        <div className="supplier-row__orders">{supplier.orders} orders</div>
      </div>

      {/* Category */}
      <div className="supplier-row__cell">{supplier.category}</div>

      {/* Location */}
      <div className="supplier-row__cell supplier-row__cell--muted">{supplier.location}</div>

      {/* Rating */}
      <div className="supplier-row__rating">

        {supplier.rating ?? "-"}
      </div>

      {/* Status */}
      <div>
        <StatusBadge status={supplier.status} />
      </div>

      {/* Actions */}
      <div className="supplier-row__actions">
        <button className="btn-action btn-action--view" onClick={() => onView?.(supplier)}>
          View
        </button>
        <span className="supplier-row__divider">·</span>
        <button className="btn-action btn-action--edit" onClick={() => onEdit?.(supplier)}>
          Edit
        </button>
        {isPending && (
          <>
            <span className="supplier-row__divider">·</span>
            <button className="btn-action btn-action--approve" onClick={() => onApprove?.(supplier)}>
              Approve
            </button>
            <span className="supplier-row__divider">·</span>
            <button className="btn-action btn-action--reject" onClick={() => onReject?.(supplier)}>
              Reject
            </button>
          </>
        )}
      </div>

    </div>
  );
}