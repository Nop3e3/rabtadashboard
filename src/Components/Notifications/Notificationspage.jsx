// NotificationsPage.jsx

import { useState } from "react";
import "./Notifications.css";

import RecentNotificationsSection  from "./Recentnotificationssection.jsx";
import NotificationSettingsSection from "./Notificationsettingssection.jsx";

// ── SVG icons ─────────────────────────────────────────────────────────────
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconVerified = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// ── Inline stat card — no import needed ───────────────────────────────────
function StatCard({ label, icon, value, sub, subGreen }) {
  return (
    <div className="notif-stat-card">
      <div className="notif-stat-card__top">
        <span className="notif-stat-card__label">{label}</span>
        <div className="notif-stat-card__icon">{icon}</div>
      </div>
      <div className="notif-stat-card__value">{value}</div>
      {sub && (
        <div className={`notif-stat-card__sub${subGreen ? " notif-stat-card__sub--green" : ""}`}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ── Icon map ──────────────────────────────────────────────────────────────
const ICON_MAP = {
  verified: <IconVerified />,
  alert:    <IconAlert />,
  info:     <IconInfo />,
};

// ── Data ──────────────────────────────────────────────────────────────────
const INITIAL_NOTIFS = [
  {
    id: 1, iconKey: "verified", iconVariant: "green",
    title: "New Supplier Verified",
    body: "Elite Advanced Textiles Co. has been verified and added to the platform",
    audience: "All Entrepreneurs", time: "2024-03-17 10:30 AM",
    readCount: 1245, totalCount: 1890, status: "Sent",
  },
  {
    id: 2, iconKey: "alert", iconVariant: "yellow",
    title: "System Maintenance Scheduled",
    body: "Platform will be under maintenance on March 20, 2024 from 2:00 AM to 4:00 AM UTC",
    audience: "All Users", time: "2024-03-20 02:00 AM",
    readCount: null, totalCount: null, status: "Scheduled",
  },
  {
    id: 3, iconKey: "info", iconVariant: "blue",
    title: "New Learning Module Available",
    body: 'Check out the new "Advanced Negotiation Skills" course in Learning Hub',
    audience: "Premium Members", time: "2024-03-16 09:15 AM",
    readCount: 892, totalCount: 1120, status: "Sent",
  },
];

const SETTINGS_CONFIG = [
  { key: "push",  name: "Push Notifications",  desc: "Send notifications to mobile devices" },
  { key: "email", name: "Email Notifications",  desc: "Send notifications via email"         },
  { key: "inApp", name: "In-App Notifications", desc: "Show notifications within the app"    },
];

// ── Page ──────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [notifs,   setNotifs]   = useState(INITIAL_NOTIFS);
  const [settings, setSettings] = useState({ push: true, email: true, inApp: true });

  const handleEdit    = n   => alert(`Editing: ${n.title}`);
  const handleDelete  = id  => setNotifs(prev => prev.filter(n => n.id !== id));
  const handleSetting = (key, val) => setSettings(p => ({ ...p, [key]: val }));

  const scheduled = notifs.filter(n => n.status === "Scheduled").length;
  const avgRead = (() => {
    const w = notifs.filter(n => n.readCount && n.totalCount);
    if (!w.length) return "0";
    return ((w.reduce((s, n) => s + n.readCount / n.totalCount, 0) / w.length) * 100).toFixed(1);
  })();

  const notifsWithIcons = notifs.map(n => ({
    ...n,
    icon: ICON_MAP[n.iconKey] ?? ICON_MAP.info,
  }));

  return (
    <div className="notif-page">

      {/* Header */}
      <div className="notif-header">
        <div>
          <h1 className="notif-header__title">Notifications Center</h1>
          <p className="notif-header__sub">Manage system notifications and user alerts</p>
        </div>
        <button className="notif-btn-new">+ New Notification</button>
      </div>

      {/* ── Stat Cards — inlined here ── */}
      <div className="notif-stats-row">
        <StatCard label="Total Sent"     icon={<IconSend  />} value="12,458"            sub="This month"             />
        <StatCard label="Scheduled"      icon={<IconClock />} value={String(scheduled)} sub="Pending delivery"       />
        <StatCard label="Avg. Read Rate" icon={<IconCheck />} value={`${avgRead}%`}     sub="+5.2% from last month"  subGreen />
        <StatCard label="Active Users"   icon={<IconUsers />} value="4,250"             sub="With notifications on"  />
      </div>

      {/* Recent Notifications */}
      <RecentNotificationsSection
        notifications={notifsWithIcons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Notification Settings */}
      <NotificationSettingsSection
        settings={SETTINGS_CONFIG}
        values={settings}
        onChange={handleSetting}
      />

    </div>
  );
}