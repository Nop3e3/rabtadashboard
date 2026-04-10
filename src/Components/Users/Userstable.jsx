// UsersTable.jsx
// Props:
//   users    array of user objects
//   onView   fn(user)
//   onEdit   fn(user)

import UserRow from "./Userrow.jsx";

const COLUMNS = ["Name", "Email", "Role", "Join Date", "Activity", "Actions"];

export default function UsersTable({ users, onView, onEdit }) {
  return (
    <div className="users-table">

      {/* Header */}
      <div className="users-table__header">
        {COLUMNS.map(col => (
          <span key={col} className="users-table__th">{col}</span>
        ))}
      </div>

      {/* Rows */}
      {users.length === 0
        ? <div className="users-table__empty">No users found.</div>
        : users.map((u, i) => (
            <UserRow
              key={(u.email ?? "") + i}
              user={u}
              onView={onView}
              onEdit={onEdit}
            />
          ))
      }

    </div>
  );
}