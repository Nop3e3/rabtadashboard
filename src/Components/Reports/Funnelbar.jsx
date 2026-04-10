// FunnelBar.jsx
// Props: label, users, pct (0-100)

export default function FunnelBar({ label, users, pct }) {
  // Color fades from bright yellow-green at 100% to olive at low %
  const fillColor = pct >= 80 ? "#d4f04a"
                  : pct >= 40 ? "#a8c43a"
                  : pct >= 20 ? "#7a9e2e"
                  :             "#4e6e1e";

  return (
    <div className="rp-funnel-item">

      {/* Top row: label · users · pct */}
      <div className="rp-funnel-item__top">
        <div className="rp-funnel-item__left">
          <span className="rp-funnel-item__label">{label}</span>
          <span className="rp-funnel-item__users">{users}</span>
        </div>
        <span className="rp-funnel-item__pct">{pct}%</span>
      </div>

      {/* Bar track */}
      <div className="rp-funnel-track">
        <div
          className="rp-funnel-fill"
          style={{ width: `${pct}%`, background: fillColor }}
        >
          {/* Percentage label shown inside the pill */}
          <span className="rp-funnel-fill__label">{pct}%</span>
        </div>
      </div>

    </div>
  );
}