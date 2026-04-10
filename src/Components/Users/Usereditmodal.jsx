// UserEditModal.jsx
// CRUD edit + delete for Create New User table.
// Props:
//   user       { name, email, role, joinDate, _raw }
//   onClose    fn()
//   onSaved    fn(updatedUser)
//   onDeleted  fn(id)
//   tableName  string

import { useState } from "react";
import { supabase } from "../../Pages/Supabase.jsx";

const ROLES = ["Entrepreneur", "Mentor", "Supplier"];

export default function UserEditModal({ user, onClose, onSaved, onDeleted, tableName }) {
  const raw = user._raw ?? {};

  const [form, setForm] = useState({
    Full_Name:   raw["Full_Name"]  ?? "",
    "User Role": raw["User Role"]  ?? "",
    Location:    raw["Location"]   ?? "",
    Bio:         raw["Bio"]        ?? "",
    user_pfp:    raw.user_pfp      ?? "",
  });

  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [error,      setError]      = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const payload = {
      Full_Name:   form.Full_Name        || null,
      "User Role": form["User Role"]     || null,
      Location:    form.Location         || null,
      Bio:         form.Bio              || null,
      user_pfp:    form.user_pfp         || null,
    };

    const { data: res, error: saveErr } = await supabase
      .from(tableName)
      .update(payload)
      .eq("id", raw.id)
      .select();

    setSaving(false);

    if (saveErr) {
      console.error("❌ Save error:", saveErr);
      setError(saveErr.message);
      return;
    }

    onSaved?.({ ...user, _raw: res[0] ?? raw });
    onClose();
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const { error: delErr } = await supabase
      .from(tableName)
      .delete()
      .eq("id", raw.id);

    setDeleting(false);

    if (delErr) {
      setError(delErr.message);
      setConfirmDel(false);
      return;
    }

    onDeleted?.(raw.id);
    onClose();
  };

  return (
    <div className="ue-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ue-modal">

        <div className="ue-modal__hd">
          <div>
            <span className="ue-modal__title">Edit User</span>
            <span className="ue-modal__sub">{user.name}</span>
          </div>
          <button className="ue-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="ue-modal__body">

          <div>
            <label className="ue-modal__label">Full Name</label>
            <input className="ue-modal__input" value={form.Full_Name}
              onChange={e => set("Full_Name", e.target.value)}
              placeholder="Full name..." />
          </div>

          <div>
            <label className="ue-modal__label">Role</label>
            <select className="ue-modal__select" value={form["User Role"]}
              onChange={e => set("User Role", e.target.value)}>
              <option value="">Select role…</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="ue-modal__label">Location</label>
            <input className="ue-modal__input" value={form.Location}
              onChange={e => set("Location", e.target.value)}
              placeholder="e.g. Cairo, Egypt" />
          </div>

          <div>
            <label className="ue-modal__label">Bio</label>
            <input className="ue-modal__input" value={form.Bio}
              onChange={e => set("Bio", e.target.value)}
              placeholder="Short bio..." />
          </div>

          <div>
            <label className="ue-modal__label">Profile Picture URL</label>
            <input className="ue-modal__input" value={form.user_pfp}
              onChange={e => set("user_pfp", e.target.value)}
              placeholder="https://..." />
          </div>

          {/* Danger Zone */}
          <div className="ue-modal__danger">
            <span className="ue-modal__danger-title">Danger Zone</span>
            {!confirmDel ? (
              <button className="ue-modal__btn-delete"
                onClick={() => setConfirmDel(true)}>
                🗑 Delete User
              </button>
            ) : (
              <div className="ue-modal__confirm">
                <p className="ue-modal__confirm-text">
                  Permanently delete <strong>{user.name}</strong>? Cannot be undone.
                </p>
                <div className="ue-modal__confirm-btns">
                  <button className="ue-modal__btn-cancel"
                    onClick={() => setConfirmDel(false)} disabled={deleting}>
                    Cancel
                  </button>
                  <button className="ue-modal__btn-delete-confirm"
                    onClick={handleDelete} disabled={deleting}>
                    {deleting ? "Deleting…" : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && <p className="ue-modal__error">❌ {error}</p>}
        </div>

        <div className="ue-modal__ft">
          <button className="ue-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ue-modal__btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}