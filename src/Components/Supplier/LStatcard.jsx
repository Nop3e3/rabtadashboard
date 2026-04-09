// StatCard.jsx
// Props: icon, label, count, variant ("green" | "blue" | "olive")

export default function StatCard({ icon, label, count, variant = "green" }) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__icon"><img src={icon} alt="" /></div>
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__count">{count}</span>
    </div>
  );
}