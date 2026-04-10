// UserRow.jsx
// Props:
//   user     { name, email, role, joinDate, activity, _raw }
//   onView   fn(user)
//   onEdit   fn(user)

import RoleBadge from "./Rolebadge.jsx";

export default function UserRow({ user, onView, onEdit }) {
  return (
    <div className="user-row">

      {/* Name */}
      <div className="user-row__name">{user.name}</div>

      {/* Email */}
      <div className="user-row__email">{user.email}</div>

      {/* Role badge */}
      <div><RoleBadge role={user.role} /></div>

      {/* Join Date */}
      <div className="user-row__date">{user.joinDate ?? "—"}</div>

      {/* Activity */}
      <div className="user-row__activity">{user.activity ?? "-"}</div>

      {/* Actions */}
      <div className="user-row__actions">
        <button className="btn-action btn-action--view" onClick={() => onView?.(user)}>
          View
        </button>
        <span style={{ color: "var(--border)", fontSize: 11 }}>·</span>
        <button className="btn-action btn-action--edit" onClick={() => onEdit?.(user)}>
          Edit
        </button>
      </div>

    </div>
  );
}