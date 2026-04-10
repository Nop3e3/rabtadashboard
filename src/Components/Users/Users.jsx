// UserManagementPage.jsx

import { useState, useEffect, useMemo } from "react";
import "./Usermanagement.css";

import { supabase }         from "../../Pages/Supabase.jsx";
import StatsCard            from "../Stats/Statscard.jsx";
import SearchBar            from "../Supplier/Searchbar.jsx";
import PeerSessionsSection  from "./Peersessionssection.jsx";
import UsersTable           from "./Userstable.jsx";
import UserEditModal        from "./Usereditmodal.jsx";
import CreateUserPage       from "../Usercms/Createuserpage.jsx";

import usersIcon from "../../Assets/users.svg";
import ok        from "../../Assets/ok.svg";
import box       from "../../Assets/box.svg";
import mentor    from "../../Assets/mentor.svg";

const TABLE = "Create New User";

const mapRow = row => ({
  name:     row["Full_Name"]  ?? "—",
  email:    row["Bio"]        ?? "—",
  role:     row["User Role"]  ?? "—",
  joinDate: row["Location"]   ?? "—",
  activity: null,
  avatar:   row.user_pfp      ?? null,
  _raw:     row,
});

const STATIC_SESSIONS = [
  { category: "Sourcing", title: "How to Negotiate with Chinese Suppliers", host: "Sara Ahmed",   participants: 24 },
  { category: "Sourcing", title: "Building Brand on Social Media",          host: "Ahmed Khalil", participants: 18 },
];

export default function UserManagementPage() {
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [sessions,   setSessions]   = useState(STATIC_SESSIONS);
  const [query,      setQuery]      = useState("");
  const [editUser,   setEditUser]   = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // ── ALL hooks must be called unconditionally ──────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error("❌ Fetch error:", error.message);
    else setUsers(data.map(mapRow));
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  // useMemo must be here — before any conditional return
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const total         = users.length;
  const entrepreneurs = users.filter(u => u.role === "Entrepreneur").length;
  const suppliers     = users.filter(u => u.role === "Supplier").length;
  const mentors       = users.filter(u => u.role === "Mentor").length;

  const handleSaved = updated => {
    setUsers(prev => prev.map(u =>
      u._raw.id === updated._raw.id ? mapRow(updated._raw) : u
    ));
  };

  const handleDeleted = id => {
    setUsers(prev => prev.filter(u => u._raw.id !== id));
  };

  const handleCancelSession = s => {
    setSessions(prev => prev.filter(x => x.title !== s.title));
  };

  // ── Conditional rendering happens INSIDE the return, never before hooks ───
  if (showCreate) {
    return (
      <CreateUserPage
        onBack={() => {
          setShowCreate(false);
          fetchUsers();
        }}
      />
    );
  }

  return (
    <>
      <div className="um-page">

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="cu-btn-save" onClick={() => setShowCreate(true)}>
            + Add User
          </button>
        </div>

        <div className="um-stats-row">
          <StatsCard title="Total Users"   value={String(total)}         icon={usersIcon} />
          <StatsCard title="Entrepreneurs" value={String(entrepreneurs)} icon={ok}        />
          <StatsCard title="Suppliers"     value={String(suppliers)}     icon={box}       />
          <StatsCard title="Mentors"       value={String(mentors)}       icon={mentor}    />
        </div>

        <SearchBar value={query} onChange={setQuery} placeholder="Search ..." />

        <PeerSessionsSection
          sessions={sessions}
          onEdit={s => alert(`Editing: ${s.title}`)}
          onCancel={handleCancelSession}
        />

        {loading
          ? <p className="um-state-msg">Loading users…</p>
          : <UsersTable
              users={filtered}
              onView={u => alert(`Viewing: ${u.name}`)}
              onEdit={u => setEditUser(u)}
            />
        }

      </div>

      {editUser && (
        <UserEditModal
          user={editUser}
          tableName={TABLE}
          onClose={() => setEditUser(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}