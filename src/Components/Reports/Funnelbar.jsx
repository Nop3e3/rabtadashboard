// EntrepreneurRow.jsx
// Props: name, orders, courses, amount, color

export default function EntrepreneurRow({ name, orders, courses, amount, color }) {
  return (
    <div className="rp-ent-row">
      <div className="rp-ent-avatar" style={{ background: color ?? "#7c3aed" }}>
        {name?.[0]?.toUpperCase() ?? "?"}
      </div>
      <div className="rp-ent-info">
        <div className="rp-ent-name">{name}</div>
        <div className="rp-ent-meta">{orders} orders · {courses} courses</div>
      </div>
      <div className="rp-ent-amount">{amount}</div>
    </div>
  );
}