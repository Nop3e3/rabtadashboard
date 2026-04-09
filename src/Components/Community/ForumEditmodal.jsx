// ForumEditModal.jsx
// CRUD edit + delete for a community table row.
// Props:
//   post       { topic, author, replies, views, lastActive, _raw }
//   onClose    fn()
//   onSaved    fn(updatedPost)
//   onDeleted  fn(id)

import { useState } from "react";
import { supabase } from "../../Pages/Supabase.jsx";

const TABLE = "community";

export default function ForumEditModal({ post, onClose, onSaved, onDeleted }) {
  const raw = post._raw ?? {};

  const [form, setForm] = useState({
    post_text1:      raw.post_text1      ?? "",
    post_text3:      raw.post_text3      ?? "",
    "Like_count":    raw["Like_count"]   ?? "",
    "Share_count":   raw["Share_count"]  ?? "",
    "Comment_count": raw["Comment_count"] ?? "",
    date:            raw.date            ?? "",
    post_img1:       raw.post_img1       ?? "",
    groups_pfp:      raw.groups_pfp      ?? "",
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
      post_text1:      form.post_text1                           || null,
      post_text3:      form.post_text3                           || null,
      "Like_count":    form["Like_count"]    ? Number(form["Like_count"])    : null,
      "Share_count":   form["Share_count"]   ? Number(form["Share_count"])   : null,
      "Comment_count": form["Comment_count"] ? Number(form["Comment_count"]) : null,
      date:            form.date                                 || null,
      post_img1:       form.post_img1                            || null,
      groups_pfp:      form.groups_pfp                           || null,
    };

    const { data: res, error: saveErr } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", raw.id)
      .select();

    setSaving(false);

    if (saveErr) {
      console.error("❌ Save error:", saveErr);
      setError(saveErr.message);
      return;
    }

    onSaved?.({ ...post, _raw: res[0] ?? raw });
    onClose();
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const { error: delErr } = await supabase
      .from(TABLE)
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
    <div className="s-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="s-modal">

        <div className="s-modal__hd">
          <div>
            <span className="s-modal__title">Edit Post</span>
            <span className="s-modal__sub">{post.topic}</span>
          </div>
          <button className="s-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="s-modal__body">

          <div className="s-modal__section">
            <span className="s-modal__section-title">Post Content</span>
            <label className="s-modal__label">Post Text 1</label>
            <input className="s-modal__input" value={form.post_text1}
              onChange={e => set("post_text1", e.target.value)}
              placeholder="Post text..." />
            <label className="s-modal__label">Post Text 2</label>
            <input className="s-modal__input" value={form.post_text3}
              onChange={e => set("post_text3", e.target.value)}
              placeholder="Post text..." />
          </div>

          <div className="s-modal__section">
            <span className="s-modal__section-title">Engagement</span>
            <div className="s-modal__grid">
              <div>
                <label className="s-modal__label">Like Count</label>
                <input className="s-modal__input" type="number" value={form["Like_count"]}
                  onChange={e => set("Like_count", e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="s-modal__label">Share Count</label>
                <input className="s-modal__input" type="number" value={form["Share_count"]}
                  onChange={e => set("Share_count", e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="s-modal__label">Comment Count</label>
                <input className="s-modal__input" type="number" value={form["Comment_count"]}
                  onChange={e => set("Comment_count", e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="s-modal__label">Date</label>
                <input className="s-modal__input" value={form.date}
                  onChange={e => set("date", e.target.value)} placeholder="e.g. 2024-01-01" />
              </div>
            </div>
          </div>

          <div className="s-modal__section">
            <span className="s-modal__section-title">Images</span>
            <label className="s-modal__label">Post Image URL</label>
            <input className="s-modal__input" value={form.post_img1}
              onChange={e => set("post_img1", e.target.value)} placeholder="https://..." />
            <label className="s-modal__label">Group Profile Picture URL</label>
            <input className="s-modal__input" value={form.groups_pfp}
              onChange={e => set("groups_pfp", e.target.value)} placeholder="https://..." />
          </div>

          {/* Danger Zone */}
          <div className="s-modal__section s-modal__delete-zone">
            <span className="s-modal__section-title s-modal__section-title--danger">Danger Zone</span>
            {!confirmDel ? (
              <button className="s-modal__btn-delete" onClick={() => setConfirmDel(true)}>
                🗑 Delete Post
              </button>
            ) : (
              <div className="s-modal__confirm">
                <p className="s-modal__confirm-text">
                  Permanently delete this post? This cannot be undone.
                </p>
                <div className="s-modal__confirm-btns">
                  <button className="s-modal__btn-cancel"
                    onClick={() => setConfirmDel(false)} disabled={deleting}>Cancel</button>
                  <button className="s-modal__btn-delete-confirm"
                    onClick={handleDelete} disabled={deleting}>
                    {deleting ? "Deleting…" : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && <p className="s-modal__error">❌ {error}</p>}
        </div>

        <div className="s-modal__ft">
          <button className="s-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="s-modal__btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}