// SupplierRow — for reports page (different from Suppliers display page)
// Props: rank, name, orders, amount, trend

export default function ReportSupplierRow({ rank, name, orders, amount, trend }) {
  return (
    <div className="rp-supplier-row">
      <div className="rp-supplier-rank">#{rank}</div>
      <div className="rp-supplier-info">
        <div className="rp-supplier-name">{name}</div>
        <div className="rp-supplier-meta">{orders} orders</div>
      </div>
      <div className="rp-supplier-right">
        <div className="rp-supplier-amount">{amount}</div>
        <div className="rp-supplier-trend">↗ {trend}</div>
      </div>
    </div>
  );
}