// RadarChart.jsx
// Props: axes [{label, value (0-100)}], color

export default function RadarChart({ axes = [], color = "#8ab040" }) {
  if (axes.length < 3) return null;

  const cx = 110, cy = 110, R = 80;
  const n   = axes.length;
  const lvls = [0.25, 0.5, 0.75, 1];

  const pt = (i, frac) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + frac * R * Math.cos(a), y: cy + frac * R * Math.sin(a) };
  };

  // Data polygon
  const dataPts = axes.map((ax, i) => pt(i, ax.value / 100));
  const dataPath = dataPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Grid rings */}
      {lvls.map(l => {
        const ring = axes.map((_, i) => pt(i, l)).map((p, i) =>
          `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return <path key={l} d={ring} fill="none" stroke="#ffffff12" strokeWidth="1" />;
      })}

      {/* Axis lines */}
      {axes.map((_, i) => {
        const outer = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y}
          stroke="#ffffff12" strokeWidth="1" />;
      })}

      {/* Data area */}
      <path d={dataPath} fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />

      {/* Axis labels */}
      {axes.map((ax, i) => {
        const lp = pt(i, 1.22);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill="#8a8a80" fontSize="10">{ax.label}</text>
        );
      })}
    </svg>
  );
}