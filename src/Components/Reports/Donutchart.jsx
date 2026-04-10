// DonutChart.jsx
// Props: segments [{label, value, color}]

export default function DonutChart({ segments = [] }) {
  if (!segments.length) return null;

  const R = 70, r = 42, cx = 95, cy = 90;
  const total = segments.reduce((s, x) => s + x.value, 0);
  let angle   = -Math.PI / 2;

  const slices = segments.map(seg => {
    const sweep = (seg.value / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(angle);
    const y1 = cy + R * Math.sin(angle);
    angle   += sweep;
    const x2 = cx + R * Math.cos(angle);
    const y2 = cy + R * Math.sin(angle);
    const ix1 = cx + r * Math.cos(angle - sweep);
    const iy1 = cy + r * Math.sin(angle - sweep);
    const ix2 = cx + r * Math.cos(angle);
    const iy2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;

    // Label position
    const mid = angle - sweep / 2;
    const lx  = cx + (R + 14) * Math.cos(mid);
    const ly  = cy + (R + 14) * Math.sin(mid);

    return {
      path: `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2}
             L${ix2},${iy2} A${r},${r} 0 ${large},0 ${ix1},${iy1} Z`,
      color: seg.color,
      label: `${seg.label} ${Math.round((seg.value / total) * 100)}%`,
      lx, ly, pct: Math.round((seg.value / total) * 100),
    };
  });

  return (
    <svg viewBox="0 0 190 185" style={{ width: "100%", height: "auto", display: "block" }}>
      {slices.map((s, i) => (
        <g key={i}>
          <path d={s.path} fill={s.color} opacity="0.9" />
          <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="middle"
            fill="#fff" fontSize="9" fontWeight="700">{s.label}</text>
        </g>
      ))}
    </svg>
  );
}