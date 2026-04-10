// AccountInfoCard.jsx
// Props: info { userId, joinDate, lastActive, totalOrders, totalSpent }

export default function AccountInfoCard({ info = {} }) {
  const rows = [
    { key: "User ID",      val: info.userId      ?? "—" },
    { key: "Join Date",    val: info.joinDate     ?? "—" },
    { key: "Last Active",  val: info.lastActive   ?? "—" },
    { key: "Total Orders", val: info.totalOrders  ?? "—" },
    { key: "Total Spent",  val: info.totalSpent   ?? "—" },
  ];

  return (
    <div className="cu-card">
      <span className="cu-card__title">Account Info</span>
      <div className="cu-info-grid">
        {rows.map(r => (
          <div key={r.key} className="cu-info-row">
            <span className="cu-info-row__key">{r.key}</span>
            <span className="cu-info-row__val">{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}