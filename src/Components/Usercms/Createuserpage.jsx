// CreateUserPage.jsx

import { useState, useEffect, useRef } from "react";
import "./Createuser.css";

import { supabase }     from "../../Pages/Supabase.jsx";
import ProfileInfoTab   from "./Profileinfotab.jsx";
import ActivityStatsTab from "./Activitystatstab.jsx";
import PermissionsTab   from "./Permissionstab.jsx";

const TABLE = "Create New User";
const TABS  = ["Profile Information", "Activity & Stats", "Permissions & Access"];

const MOCK_ACTIVITY = [
  { text: 'Completed course - "Fashion Costing Mastery"', time: "3 days ago"  },
  { text: "Placed order - Order #ORD-2024-145",           time: "5 days ago"  },
  { text: "Connected with supplier - Elite Advanced Textiles", time: "5 days ago" },
  { text: 'Started course - "Negotiation Skills"',        time: "6 days ago"  },
];

const EMPTY_FORM = {
  Full_Name: "", email: "", phone: "", Location: "",
  Bio: "", "User Role": "", user_pfp: "", password: "", confirmPassword: "",
};

export default function CreateUserPage({ userId, onBack }) {
  const [activeTab,   setActiveTab]   = useState(0);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [status,      setStatus]      = useState("Active");
  const [verified,    setVerified]    = useState(false);
  const [premium,     setPremium]     = useState(false);
  const [permissions, setPermissions] = useState({
    platformAccess: true, supplierDirectory: true,
    learningHub: true, communityFeatures: true, messaging: true,
  });
  const [saving,  setSaving]  = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast,   setToast]   = useState(null);
  const [rawId,   setRawId]   = useState(null);

  // For measuring tab positions for the sliding pill
  const tabRefs  = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeTab]);

  // ── Fetch existing user ───────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      const { data, error } = await supabase
        .from(TABLE).select("*").eq("id", userId).single();
      if (error) return;
      setRawId(data.id);
      setForm({
        Full_Name: data["Full_Name"] ?? "", email: data.email ?? "",
        phone: data.phone ?? "", Location: data["Location"] ?? "",
        Bio: data["Bio"] ?? "", "User Role": data["User Role"] ?? "",
        user_pfp: data.user_pfp ?? "", password: "", confirmPassword: "",
      });
    };
    load();
  }, [userId]);

  const handleChange = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    if (errors[key]) setErrors(p => { const n = { ...p }; delete n[key]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.Full_Name.trim()) e.Full_Name = "Full name is required.";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address.";
    if (form.password && form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) { setActiveTab(0); return; }
    setSaving(true);
    const payload = {
      Full_Name:   form.Full_Name    || null,
      Location:    form.Location     || null,
      Bio:         form.Bio          || null,
      "User Role": form["User Role"] || null,
      user_pfp:    form.user_pfp     || null,
    };
    let error;
    if (rawId) {
      ({ error } = await supabase.from(TABLE).update(payload).eq("id", rawId));
    } else {
      ({ error } = await supabase.from(TABLE).insert(payload));
    }
    setSaving(false);
    if (error) { showToast(`❌ ${error.message}`, true); return; }
    showToast("✓ User saved successfully");
    if (!rawId) {
      setForm(EMPTY_FORM);
      setTimeout(() => onBack?.(), 1500);
    }
  };

  const handleDelete = async () => {
    if (!rawId) return;
    setDeleting(true);
    const { error } = await supabase.from(TABLE).delete().eq("id", rawId);
    setDeleting(false);
    if (error) { showToast(`❌ ${error.message}`, true); return; }
    showToast("✓ User deleted");
    setTimeout(() => onBack?.(), 1200);
  };

  const handleSuspend = () => { setStatus("Suspended"); showToast("Account suspended"); };

  const showToast = (msg, isErr = false) => {
    setToast({ msg, isErr });
    setTimeout(() => setToast(null), 2800);
  };

  const accountInfo = {
    name: form.Full_Name,
    userId: rawId ? `#${rawId}` : "New User",
    joinDate: "2024-01-15",
    lastActive: "2024-03-17 14:30",
    totalOrders: 42,
    totalSpent: "$28,450",
  };

  const sharedProps = {
    accountInfo,
    status, onStatusChange: setStatus,
    verified, onVerified: setVerified,
    premium, onPremium: setPremium,
    onSuspend: handleSuspend,
    onDelete: handleDelete,
    deleting,
  };

  return (
    <div className="cu-page">

      {/* ── Sliding Tab Nav ── */}
      <div className="cu-tabs">
        {/* Animated sliding pill */}
        <span
          className="cu-tab-pill"
          style={{ left: pill.left, width: pill.width }}
        />
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={el => (tabRefs.current[i] = el)}
            className={`cu-tab${activeTab === i ? " cu-tab--active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="cu-tab-content">
        {activeTab === 0 && (
          <ProfileInfoTab
            form={form} errors={errors} onChange={handleChange}
            {...sharedProps}
          />
        )}
        {activeTab === 1 && (
          <ActivityStatsTab
            stats={{ totalOrders: 42, totalSpent: "$28,450", courses: 8, completed: 5 }}
            activity={MOCK_ACTIVITY}
            {...sharedProps}
          />
        )}
        {activeTab === 2 && (
          <PermissionsTab
            permissions={permissions}
            onPermission={(key, val) => setPermissions(p => ({ ...p, [key]: val }))}
            {...sharedProps}
          />
        )}
      </div>

      {/* ── Fixed Bottom Save Bar ── */}
      <div className="cu-bottom-bar">
        <button className="cu-btn-cancel" onClick={() => onBack?.()}>
          ← Back
        </button>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
          <button className="cu-btn-cancel" onClick={() => setForm(EMPTY_FORM)}>
            Cancel
          </button>
          <button className="cu-btn-save" onClick={handleSave} disabled={saving}>
            💾 {saving ? "Saving…" : (rawId ? "Save Changes" : "Add User")}
          </button>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className={`cu-toast${toast.isErr ? " cu-toast--error" : ""}`}>
          {toast.msg}
        </div>
      )}

    </div>
  );
}