// OrderStatCard.jsx
// Props: label, icon, value, sub, subVariant ("accent"|"warn"|null)

export default function OrderStatCard({ label, icon, value, sub, subVariant }) {
  const subClass = subVariant ? ` ord-stat-card__sub--${subVariant}` : "";
  return (
    <div className="ord-stat-card">
      <div className="ord-stat-card__top">
        <span className="ord-stat-card__label">{label}</span>
        <div className="ord-stat-card__icon">{icon}</div>
      </div>
      <div className="ord-stat-card__value">{value}</div>
      {sub && <div className={`ord-stat-card__sub${subClass}`}>{sub}</div>}
    </div>
  );
}