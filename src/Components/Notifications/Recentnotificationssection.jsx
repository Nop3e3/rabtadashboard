// RecentNotificationsSection.jsx
// Props: notifications[], onEdit fn, onDelete fn

import NotifCard from "./Notifcard.jsx";

export default function RecentNotificationsSection({ notifications, onEdit, onDelete }) {
  return (
    <div className="notif-section">
      <span className="notif-section__title">Recent Notifications</span>
      {notifications.map(n => (
        <NotifCard
          key={n.id}
          notif={n}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}