// HourlyBarChart.jsx
// Props: data [{label, value}], color

export default function HourlyBarChart({ data = [], color = "#e040a0" }) {
  if (!data.length) return null;

  const W = 200, H = 140, PAD = { t: 10, r: 8, b: 24, l: 28 };
  const cw  = W - PAD.l - PAD.r;
  const ch  = H - PAD.t - PAD.b;
  const max = Math.max(...data.map(d => d.value), 1);
  const bw  = (cw / data.length) * 0.6;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {[0, 25, 50, 75, 100].map(v => {
        const y = PAD.t + ch * (1 - v / 100);
        return (
          <g key={v}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#ffffff0d" strokeWidth="1" />
            <text x={PAD.l - 3} y={y + 3} textAnchor="end" fill="#6e6e68" fontSize="8">{v}</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const slotW = cw / data.length;
        const x    = PAD.l + slotW * i + (slotW - bw) / 2;
        const bh   = (d.value / max) * ch;
        return (
          <g key={i}>
            <rect x={x} y={PAD.t + ch - bh} width={bw} height={bh} fill={color} rx="2" />
            <text x={x + bw / 2} y={H - 6} textAnchor="middle" fill="#6e6e68" fontSize="8">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}