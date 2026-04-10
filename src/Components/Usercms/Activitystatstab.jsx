// ActivityStatsTab.jsx
// Tab 2: Activity & Stats
// Props: stats, activity, accountInfo, status, onStatusChange,
//        verified, onVerified, premium, onPremium, onSuspend, onDelete, deleting

import UserStatusCard  from "./Userstatuscard.jsx";
import AccountInfoCard from "./Accountinfocard.jsx";
import DangerZoneCard  from "./Dangerzonecard.jsx";

const ACTIVITY_ICONS = {
  course: "📚",
  order:  "📦",
  supplier: "🏭",
  default: "⚡",
};

const getIcon = text => {
  if (!text) return ACTIVITY_ICONS.default;
  const t = text.toLowerCase();
  if (t.includes("course")) return ACTIVITY_ICONS.course;
  if (t.includes("order"))  return ACTIVITY_ICONS.order;
  if (t.includes("supplier")) return ACTIVITY_ICONS.supplier;
  return ACTIVITY_ICONS.default;
};

export default function ActivityStatsTab({
  stats = {}, activity = [],
  accountInfo,
  status, onStatusChange,
  verified, onVerified,
  premium, onPremium,
  onSuspend, onDelete, deleting,
}) {
  return (
    <div className="cu-content">

      {/* ── LEFT COLUMN ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* User Activity stat cards */}
        <div className="cu-card">
          <span className="cu-card__title">User Activity</span>
          <div className="cu-stats-grid">
            <div className="cu-stat-card">
              <span className="cu-stat-card__label">
                <span className="cu-stat-card__icon">📦</span>
                Total Orders
              </span>
              <span className="cu-stat-card__val">{stats.totalOrders ?? 0}</span>
              <span className="cu-stat-card__sub">{stats.totalSpent ?? "$0"} spent</span>
            </div>
            <div className="cu-stat-card">
              <span className="cu-stat-card__label">
                <span className="cu-stat-card__icon">📚</span>
                Courses Enrolled
              </span>
              <span className="cu-stat-card__val">{stats.courses ?? 0}</span>
              <span className="cu-stat-card__sub">{stats.completed ?? 0} completed</span>
            </div>
          </div>
        </div>

        {/* Recent Activity feed */}
        <div className="cu-card">
          <span className="cu-card__title">Recent Activity</span>
          <div className="cu-activity-list">
            {activity.length === 0
              ? <p style={{ fontSize: 13, color: "var(--text-3)" }}>No recent activity.</p>
              : activity.map((item, i) => (
                  <div key={i} className="cu-activity-item">
                    <div className="cu-activity-item__icon">{getIcon(item.text)}</div>
                    <span className="cu-activity-item__text">{item.text}</span>
                    <span className="cu-activity-item__time">{item.time}</span>
                  </div>
                ))
            }
          </div>
        </div>

      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <UserStatusCard
          status={status} onStatusChange={onStatusChange}
          verified={verified} onVerified={onVerified}
          premium={premium} onPremium={onPremium}
        />
        <AccountInfoCard info={accountInfo} />
        <DangerZoneCard
          userName={accountInfo?.name}
          onSuspend={onSuspend}
          onDelete={onDelete}
          deleting={deleting}
        />
      </div>

    </div>
  );
}