// ReportStatCard.jsx
// Props: label, icon, value, trend ("+18.2%"), trendDir ("up"|"down"), trendSub

export default function ReportStatCard({ label, icon, value, trend, trendDir = "up", trendSub }) {
  return (
    <div className="rp-stat-card">
      <div className="rp-stat-card__top">
        <span className="rp-stat-card__label">{label}</span>
        <span className="rp-stat-card__icon">{icon}</span>
      </div>
      <div className="rp-stat-card__value">{value}</div>
      {trend && (
        <div className={`rp-stat-card__trend rp-stat-card__trend--${trendDir}`}>
          {trendDir === "up" ? "↗" : "↘"} {trend} {trendSub ?? "vs last period"}
        </div>
      )}
    </div>
  );
}