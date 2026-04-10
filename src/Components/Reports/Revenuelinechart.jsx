// RevenueLineChart.jsx
// Props: data [{label, value}], color

export default function RevenueLineChart({ data = [], color = "#8ab040" }) {
  if (!data.length) return null;

  const W = 320, H = 160, PAD = { t: 10, r: 10, b: 30, l: 40 };
  const cw = W - PAD.l - PAD.r;
  const ch = H - PAD.t - PAD.b;

  const vals  = data.map(d => d.value);
  const min   = Math.min(...vals);
  const max   = Math.max(...vals);
  const range = max - min || 1;

  const px = (i) => PAD.l + (i / (data.length - 1)) * cw;
  const py = (v) => PAD.t + ch - ((v - min) / range) * ch;

  const pts = data.map((d, i) => `${px(i)},${py(d.value)}`).join(" ");

  // Area path
  const area = [
    `M${px(0)},${PAD.t + ch}`,
    ...data.map((d, i) => `L${px(i)},${py(d.value)}`),
    `L${px(data.length - 1)},${PAD.t + ch}`,
    "Z",
  ].join(" ");

  // Y axis labels
  const yLabels = [min, min + range * 0.33, min + range * 0.66, max].map(v => {
    const k = v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`;
    return { v, k };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="lgRev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yLabels.map(({ v, k }) => (
        <g key={k}>
          <line x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)}
            stroke="#ffffff0d" strokeWidth="1" />
          <text x={PAD.l - 4} y={py(v) + 4} textAnchor="end"
            fill="#6e6e68" fontSize="9">{k}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={area} fill="url(#lgRev)" />

      {/* Line */}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />

      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={px(i)} y={H - 6} textAnchor="middle" fill="#6e6e68" fontSize="9">
          {d.label}
        </text>
      ))}
    </svg>
  );
}