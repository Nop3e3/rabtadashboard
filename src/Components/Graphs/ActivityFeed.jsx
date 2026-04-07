import React from "react";
import "./Dashboard.css";

// ✅ Import your SVG icons
import userIcon from "../../Assets/yellow community.svg";
import supplierIcon from "../../Assets/ysuppliers.svg";
import courseIcon from "../../Assets/ylearning.svg";
import badgeIcon from "../../Assets/ybadge.svg";
import revenueIcon from "../../Assets/y graph.svg";

// ✅ Activity data using image icons
const activities = [
  {
    title: "New user registered",
    time: "5 minutes ago",
    icon: userIcon,
  },
  {
    title: "Supplier verified",
    time: "15 minutes ago",
    icon: supplierIcon,
  },
  {
    title: "New course launched",
    time: "1 hour ago",
    icon: courseIcon,
  },
  {
    title: "Badge issued",
    time: "2 hours ago",
    icon: badgeIcon,
  },
  {
    title: "Revenue milestone reached",
    time: "3 hours ago",
    icon: revenueIcon,
  },
];

export default function ActivityFeed() {
  return (
    <div className="graph-card">
      <div className="card-title">Recent Activity</div>

      <div className="activity-list">
        {activities.map((act, i) => (
          <div key={i} className="activity-item">
            
            {/* ✅ Icon */}
            <div className="activity-icon">
              <img src={act.icon} alt={act.title} />
            </div>

            {/* ✅ Text */}
            <div>
              <div className="activity-title">{act.title}</div>
              <div className="activity-time">{act.time}</div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}