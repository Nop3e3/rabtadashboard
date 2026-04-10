// ReportsPage.jsx

import { useState } from "react";
import "./Reports.css";

import ReportStatCard      from "./Reportstatcard.jsx";
import ViewToggle          from "./Viewtoggle.jsx";
import RevenueLineChart    from "./Revenuelinechart.jsx";
import GroupedBarChart     from "./Groupedbarchart.jsx";
import DonutChart          from "./Donutchart.jsx";
import RadarChart          from "./Radarchart.jsx";
import HourlyBarChart      from "./Hourlybarchart.jsx";
import ReportSupplierRow   from "./Reportsupplierrow.jsx";
import EntrepreneurRow     from "./Entrepreneurrow.jsx";
import FunnelBar           from "./Funnelbar.jsx";

// ── Data ─────────────────────────────────────────────────────────────────────
const WEEKLY = {
  revenue: [
    { label: "Mon", value: 7200 }, { label: "Tue", value: 8100 },
    { label: "Wed", value: 7600 }, { label: "Thu", value: 10500 },
    { label: "Fri", value: 9200 }, { label: "Sat", value: 13800 },
    { label: "Sun", value: 11400 },
  ],
  growth: [
    { label: "Mon", orders: 42, users: 28 }, { label: "Tue", orders: 55, users: 35 },
    { label: "Wed", orders: 60, users: 40 }, { label: "Thu", orders: 80, users: 62 },
    { label: "Fri", orders: 72, users: 55 }, { label: "Sat", orders: 90, users: 70 },
    { label: "Sun", orders: 85, users: 65 },
  ],
};

const MONTHLY = {
  revenue: [
    { label: "W1", value: 45000 }, { label: "W2", value: 52000 },
    { label: "W3", value: 48000 }, { label: "W4", value: 61000 },
  ],
  growth: [
    { label: "W1", orders: 280, users: 190 }, { label: "W2", orders: 340, users: 220 },
    { label: "W3", orders: 310, users: 205 }, { label: "W4", orders: 390, users: 260 },
  ],
};

const DONUT_SEGMENTS = [
  { label: "Cotton",          value: 34, color: "#7c3aed" },
  { label: "Silk",            value: 30, color: "#a855f7" },
  { label: "Synthetic",       value: 20, color: "#ec4899" },
  { label: "Acce",            value: 16, color: "#f97316" },
];

const RADAR_AXES = [
  { label: "Sourcing",   value: 75 },
  { label: "Lean",       value: 65 },
  { label: "Community",  value: 55 },
  { label: "Messaging",  value: 70 },
  { label: "Orders",     value: 80 },
];

const HOURLY_DATA = [
  { label: "00", value: 12 }, { label: "03", value: 8  },
  { label: "06", value: 11 }, { label: "09", value: 42 },
  { label: "12", value: 76 }, { label: "15", value: 64 },
  { label: "18", value: 82 }, { label: "21", value: 58 },
];

const SUPPLIERS = [
  { rank: 1, name: "Elite Advanced Textiles Co.", orders: 124, amount: "$45,290", trend: "+18.2%" },
  { rank: 2, name: "Dubai Fashion Supplies",      orders: 98,  amount: "$38,150", trend: "+15.8%" },
  { rank: 3, name: "Cairo Textile Hub",           orders: 87,  amount: "$32,480", trend: "+12.4%" },
  { rank: 4, name: "Riyadh Premium Fabrics",      orders: 76,  amount: "$28,920", trend: "+9.7%"  },
  { rank: 5, name: "Amman Fashion Materials",     orders: 68,  amount: "$24,560", trend: "+7.3%"  },
];

const ENTREPRENEURS = [
  { name: "Nayerah Al-Mansouri", orders: 42, courses: 8,  amount: "$28,450", color: "#7c3aed" },
  { name: "Sarah Ahmed",         orders: 38, courses: 6,  amount: "$24,180", color: "#8b5cf6" },
  { name: "Layla Hassan",        orders: 35, courses: 7,  amount: "$21,920", color: "#6d28d9" },
  { name: "Fatima Al-Zahra",     orders: 31, courses: 5,  amount: "$19,670", color: "#a855f7" },
  { name: "Amina Al-Said",       orders: 28, courses: 4,  amount: "$17,840", color: "#9333ea" },
];

const FUNNEL = [
  { label: "Visitors",          users: "12,450 users", pct: 100  },
  { label: "Signups",           users: "3,428 users",  pct: 27.5 },
  { label: "Profile Completed", users: "2,856 users",  pct: 22.9 },
  { label: "First Order",       users: "1,892 users",  pct: 15.2 },
  { label: "Repeat Customer",   users: "956 users",    pct: 7.7  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [view, setView] = useState("Weekly View");
  const data = view === "Weekly View" ? WEEKLY : MONTHLY;

  return (
    <div className="rp-page">

      {/* Header */}
      <div className="rp-header">
        <div>
          <h1 className="rp-header__title">Reports & Analytics</h1>
          <p className="rp-header__sub">Comprehensive insights and performance metrics</p>
        </div>
        <div className="rp-header__right">
          <button className="rp-btn-date">last 30 days ∨</button>
          <button className="rp-btn-export">⬇ Export Report</button>
        </div>
      </div>

      {/* Top 4 stats */}
      <div className="rp-stats-grid">
        <ReportStatCard label="Total Revenue"     icon="💲" value="$458,392" trend="+18.2%" trendDir="up" />
        <ReportStatCard label="Active Users"      icon="👥" value="3,428"    trend="+12.5%" trendDir="up" />
        <ReportStatCard label="Total Orders"      icon="🛍" value="1,247"    trend="+8.3%"  trendDir="up" />
        <ReportStatCard label="Course Completions" icon="📚" value="892"    trend="+15.7%" trendDir="up" />
      </div>

      {/* Bottom 4 stats */}
      <div className="rp-stats-grid">
        <ReportStatCard label="Avg Order Value"    icon="⚡" value="$367"   trend="+5.4%"  trendDir="up" />
        <ReportStatCard label="Verified Suppliers" icon="🎓" value="856"    trend="+9.1%"  trendDir="up" />
        <ReportStatCard label="New Signups"        icon="👤" value="284"    trend="-2.3%"  trendDir="down" />
        <ReportStatCard label="Active Products"    icon="📦" value="2,145"  trend="+11.8%" trendDir="up" />
      </div>

      {/* View Toggle */}
      <ViewToggle value={view} onChange={setView} />

      {/* Charts row 1 — Revenue Trend + Orders & User Growth */}
      <div className="rp-charts-row">
        <div className="rp-chart-card">
          <div className="rp-chart-card__hd">
            <span className="rp-chart-card__title">Revenue Trend</span>
            <div className="rp-chart-legend">
              <div className="rp-legend-item">
                <div className="rp-legend-dot" style={{ background: "#8ab040" }} />
                Revenue
              </div>
            </div>
          </div>
          <RevenueLineChart data={data.revenue} color="#8ab040" />
        </div>

        <div className="rp-chart-card">
          <div className="rp-chart-card__hd">
            <span className="rp-chart-card__title">Orders & User Growth</span>
            <div className="rp-chart-legend">
              <div className="rp-legend-item">
                <div className="rp-legend-dot" style={{ background: "#7c3aed" }} /> Orders
              </div>
              <div className="rp-legend-item">
                <div className="rp-legend-dot" style={{ background: "#c8a96e" }} /> Users
              </div>
            </div>
          </div>
          <GroupedBarChart data={data.growth} colors={{ orders: "#7c3aed", users: "#c8a96e" }} />
        </div>
      </div>

      {/* Charts row 2 — Donut + Radar + Hourly */}
      <div className="rp-charts-row-3">
        <div className="rp-chart-card">
          <div className="rp-chart-card__hd">
            <span className="rp-chart-card__title">Revenue by Category</span>
          </div>
          <DonutChart segments={DONUT_SEGMENTS} />
          <div className="rp-donut-legend">
            {DONUT_SEGMENTS.map(s => (
              <div key={s.label} className="rp-donut-legend-item">
                <div className="rp-legend-dot" style={{ background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rp-chart-card">
          <div className="rp-chart-card__hd">
            <span className="rp-chart-card__title">Platform Engagement</span>
          </div>
          <RadarChart axes={RADAR_AXES} color="#8ab040" />
        </div>

        <div className="rp-chart-card rp-chart-card--fill">
          <div className="rp-chart-card__hd">
            <span className="rp-chart-card__title">Hourly Activity</span>
          </div>
          <HourlyBarChart data={HOURLY_DATA} color="#e040a0" />
        </div>
      </div>

      {/* Bottom row — Suppliers + Entrepreneurs */}
      <div className="rp-bottom-row">
        <div className="rp-list-card">
          <div className="rp-list-card__hd">
            <span className="rp-list-card__title">Top Performing Suppliers</span>
            <button className="rp-list-card__view-all">View All ↗</button>
          </div>
          {SUPPLIERS.map(s => (
            <ReportSupplierRow key={s.rank} {...s} />
          ))}
        </div>

        <div className="rp-list-card">
          <div className="rp-list-card__hd">
            <span className="rp-list-card__title">Most Active Entrepreneurs</span>
            <button className="rp-list-card__view-all">View All ↗</button>
          </div>
          {ENTREPRENEURS.map(e => (
            <EntrepreneurRow key={e.name} {...e} />
          ))}
        </div>
      </div>

      {/* User Journey Funnel */}
      <div className="rp-funnel-card">
        <div className="rp-funnel-card__title">User Journey Funnel</div>
        {FUNNEL.map(f => (
          <FunnelBar key={f.label} label={f.label} users={f.users} pct={f.pct} />
        ))}
      </div>

    </div>
  );
}