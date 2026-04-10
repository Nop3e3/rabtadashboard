// OrderRow.jsx
// Props:
//   order    { id, entrepreneur, entrepreneurAvatar, supplier, productName,
//              productSub, amount, status, date }
//   onView   fn(order)

import OrderStatusBadge from "./Orderstatusbadge.jsx";

// Deterministic color from name string for avatar fallback
const avatarColor = name => {
  const colors = ["#7c3aed","#8b5cf6","#6d28d9","#a855f7","#9333ea"];
  let h = 0;
  for (let i = 0; i < (name ?? "").length; i++) h += name.charCodeAt(i);
  return colors[h % colors.length];
};

export default function OrderRow({ order, onView }) {
  return (
    <div className="ord-row">

      {/* Order ID */}
      <div className="ord-row__id">{order.id}</div>

      {/* Entrepreneur */}
      <div className="ord-row__person">
        {order.entrepreneurAvatar
          ? <img className="ord-row__avatar" src={order.entrepreneurAvatar} alt="" />
          : <div className="ord-row__avatar" style={{
              background: avatarColor(order.entrepreneur),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff",
            }}>
              {order.entrepreneur?.[0]?.toUpperCase() ?? "?"}
            </div>
        }
        <span className="ord-row__name">{order.entrepreneur}</span>
      </div>

      {/* Supplier */}
      <div className="ord-row__supplier">{order.supplier}</div>

      {/* Product */}
      <div>
        <div className="ord-row__product-name">{order.productName}</div>
        {order.productSub && (
          <div className="ord-row__product-sub">{order.productSub}</div>
        )}
      </div>

      {/* Amount */}
      <div className="ord-row__amount">{order.amount}</div>

      {/* Status */}
      <div><OrderStatusBadge status={order.status} /></div>

      {/* Date */}
      <div className="ord-row__date">{order.date}</div>

      {/* View */}
      <button className="ord-row__eye" onClick={() => onView?.(order)}>👁</button>

    </div>
  );
}