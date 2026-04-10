// GroupedBarChart.jsx
// Props: data [{label, orders, users}], colors {orders, users}

export default function GroupedBarChart({
  data = [],
  colors = { orders: "#7c3aed", users: "#c8a96e" },
}) {
  if (!data.length) return null;

  const W = 320, H = 160, PAD = { t: 10, r: 10, b: 28, l: 30 };
  const cw  = W - PAD.l - PAD.r;
  const ch  = H - PAD.t - PAD.b;
  const allVals = data.flatMap(d => [d.orders, d.users]);
  const max  = Math.max(...allVals, 1);
  const barW = (cw / data.length) * 0.35;
  const gap  = barW * 0.25;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = PAD.t + ch * (1 - t);
        return (
          <g key={t}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#ffffff0d" strokeWidth="1" />
            <text x={PAD.l - 3} y={y + 3} textAnchor="end" fill="#6e6e68" fontSize="8">
              {Math.round(max * t)}
            </text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const slotW = cw / data.length;
        const cx    = PAD.l + slotW * i + slotW / 2;
        const bh1   = (d.orders / max) * ch;
        const bh2   = (d.users  / max) * ch;
        return (
          <g key={i}>
            <rect x={cx - barW - gap / 2} y={PAD.t + ch - bh1} width={barW} height={bh1}
              fill={colors.orders} rx="2" />
            <rect x={cx + gap / 2} y={PAD.t + ch - bh2} width={barW} height={bh2}
              fill={colors.users} rx="2" />
            <text x={cx} y={H - 6} textAnchor="middle" fill="#6e6e68" fontSize="9">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}