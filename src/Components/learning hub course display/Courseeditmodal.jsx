// CourseEditModal.jsx
// CRUD edit popup for a course row.
// Reads/writes to the learning_hub Supabase table.
// Props:
//   course     { name, path, level, lessons, duration, students, completion, rating, _raw }
//   onClose    fn()
//   onSaved    fn(updatedCourse)
//   onDeleted  fn(courseName)

import { useState } from "react";
import { supabase } from "../../Pages/Supabase.jsx";

const TABLE = "learning_hub";

export default function CourseEditModal({ course, onClose, onSaved, onDeleted }) {
  const raw = course._raw ?? {};

  const [form, setForm] = useState({
    "Course Name": raw["Course Name"] ?? "",
    Level:         raw.Level          ?? "",
    Rating:        raw.Rating         ?? "",
    Path:          raw.Path           ?? "",
    Duration:      raw.Duration       ?? "",
    "Success %":   raw["Success %"]   ?? "",
    Provider:      raw.Provider       ?? "",
    image:         raw.image          ?? "",
    provider_logo: raw.provider_logo  ?? "",
    Module:        raw.Module         ?? "",
  });

  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [error,      setError]      = useState(null);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form["Course Name"]?.trim()) {
      setError("Course name is required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      Level:         form.Level         || null,
      Rating:        form.Rating        || null,
      Path:          form.Path          || null,
      Duration:      form.Duration      || null,
      "Success %":   form["Success %"]  || null,
      Provider:      form.Provider      || null,
      image:         form.image         || null,
      provider_logo: form.provider_logo || null,
      Module:        form.Module        || null,
    };

    const { data: res, error: saveErr } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("Course Name", raw["Course Name"])
      .select();

    setSaving(false);

    if (saveErr) {
      console.error("❌ Update error:", saveErr);
      setError(saveErr.message);
      return;
    }

    onSaved?.({ ...course, _raw: res[0] ?? raw });
    onClose();
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const { error: delErr } = await supabase
      .from(TABLE)
      .delete()
      .eq("Course Name", raw["Course Name"]);

    setDeleting(false);

    if (delErr) {
      console.error("❌ Delete error:", delErr);
      setError(delErr.message);
      setConfirmDel(false);
      return;
    }

    onDeleted?.(raw["Course Name"]);
    onClose();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ce-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ce-modal">

        {/* Header */}
        <div className="ce-modal__hd">
          <div>
            <span className="ce-modal__title">Edit Course</span>
            <span className="ce-modal__sub">{course.name}</span>
          </div>
          <button className="ce-modal__close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="ce-modal__body">

          <div>
            <label className="ce-modal__label">Course Name</label>
            <input className="ce-modal__input" value={form["Course Name"]}
              onChange={e => set("Course Name", e.target.value)}
              placeholder="Course name..." />
          </div>

          <div className="ce-modal__grid">
            <div>
              <label className="ce-modal__label">Level</label>
              <input className="ce-modal__input" value={form.Level}
                onChange={e => set("Level", e.target.value)}
                placeholder="e.g. Beginner" />
            </div>
            <div>
              <label className="ce-modal__label">Path / Category</label>
              <input className="ce-modal__input" value={form.Path}
                onChange={e => set("Path", e.target.value)}
                placeholder="e.g. Sourcing" />
            </div>
            <div>
              <label className="ce-modal__label">Duration</label>
              <input className="ce-modal__input" value={form.Duration}
                onChange={e => set("Duration", e.target.value)}
                placeholder="e.g. 3h 45m" />
            </div>
            <div>
              <label className="ce-modal__label">Module</label>
              <input className="ce-modal__input" value={form.Module}
                onChange={e => set("Module", e.target.value)}
                placeholder="e.g. 12 lessons" />
            </div>
            <div>
              <label className="ce-modal__label">Rating</label>
              <input className="ce-modal__input" value={form.Rating}
                onChange={e => set("Rating", e.target.value)}
                placeholder="e.g. ★★★★☆" />
            </div>
            <div>
              <label className="ce-modal__label">Success %</label>
              <input className="ce-modal__input" value={form["Success %"]}
                onChange={e => set("Success %", e.target.value)}
                placeholder="e.g. 78%" />
            </div>
            <div>
              <label className="ce-modal__label">Provider</label>
              <input className="ce-modal__input" value={form.Provider}
                onChange={e => set("Provider", e.target.value)}
                placeholder="e.g. Google" />
            </div>
            <div>
              <label className="ce-modal__label">Provider Logo URL</label>
              <input className="ce-modal__input" value={form.provider_logo}
                onChange={e => set("provider_logo", e.target.value)}
                placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="ce-modal__label">Course Image URL</label>
            <input className="ce-modal__input" value={form.image}
              onChange={e => set("image", e.target.value)}
              placeholder="https://..." />
          </div>

          {error && <p className="ce-modal__error">❌ {error}</p>}

        </div>

        {/* Footer */}
        <div className="ce-modal__ft">
          {/* Delete — left side */}
          {!confirmDel ? (
            <button className="ce-modal__btn-delete" onClick={() => setConfirmDel(true)}>
              🗑 Delete
            </button>
          ) : (
            <div className="ce-modal__confirm">
              <p className="ce-modal__confirm-text">
                Delete <strong>{course.name}</strong>? This cannot be undone.
              </p>
              <div className="ce-modal__confirm-btns">
                <button className="ce-modal__btn-cancel"
                  onClick={() => setConfirmDel(false)} disabled={deleting}>
                  Cancel
                </button>
                <button className="ce-modal__btn-delete-confirm"
                  onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Deleting…" : "Yes, Delete"}
                </button>
              </div>
            </div>
          )}

          {/* Save / Cancel — right side */}
          <div className="ce-modal__ft-right">
            <button className="ce-modal__btn-cancel" onClick={onClose}>Cancel</button>
            <button className="ce-modal__btn-save" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}