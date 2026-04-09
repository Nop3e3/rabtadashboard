// SuppliersTable.jsx
// Props: suppliers[], onView, onEdit, onApprove, onReject

import SupplierRow from "./Supplierrow";

const COLUMNS = ["Name", "Category", "Location", "Rating", "Status", "Actions"];

export default function SuppliersTable({ suppliers, onView, onEdit, onApprove, onReject }) {
  return (
    <div className="suppliers-table">

      {/* Header */}
      <div className="suppliers-table__header">
        {COLUMNS.map(col => (
          <span key={col} className="suppliers-table__th">{col}</span>
        ))}
      </div>

      {/* Rows */}
      {suppliers.length === 0
        ? <div className="suppliers-table__empty">No suppliers found.</div>
        : suppliers.map((s, i) => (
            <SupplierRow
              key={s.name + i}
              supplier={s}
              onView={onView}
              onEdit={onEdit}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))
      }

    </div>
  );
}