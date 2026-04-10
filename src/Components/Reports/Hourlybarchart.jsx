// HourlyBarChart.jsx
// Props: data [{label, value}], color

export default function HourlyBarChart({ data = [], color = "#e040a0" }) {
  if (!data.length) return null;

  const W   = 280;
  const H   = 260;
  const PAD = { t: 20, r: 12, b: 30, l: 36 };
  const cw  = W - PAD.l - PAD.r;
  const ch  = H - PAD.t - PAD.b;
  const max = 100; // fixed scale 0-100

  const slotW = cw / data.length;
  const bw    = slotW * 0.65;
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div style={{ flex: 1, minHeight: 180, display: "flex" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "100%", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dashed grid lines + Y labels */}
        {yTicks.map(v => {
          const y = PAD.t + ch * (1 - v / max);
          return (
            <g key={v}>
              <line
                x1={PAD.l} y1={y}
                x2={W - PAD.r} y2={y}
                stroke="#ffffff18"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={PAD.l - 5} y={y + 4}
                textAnchor="end"
                fill="#6e6e68"
                fontSize="9"
                fontFamily="inherit"
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x  = PAD.l + slotW * i + (slotW - bw) / 2;
          const bh = Math.max((d.value / max) * ch, 3);
          const y  = PAD.t + ch - bh;

          return (
            <g key={i}>
              <rect
                x={x} y={y}
                width={bw} height={bh}
                fill={color}
                rx="4" ry="4"
              />
              <text
                x={x + bw / 2}
                y={H - 8}
                textAnchor="middle"
                fill="#6e6e68"
                fontSize="9"
                fontFamily="inherit"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}