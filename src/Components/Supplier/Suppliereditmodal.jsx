// SupplierEditModal.jsx
// Full CRUD edit popup for a supplier row.
// Props:
//   supplier   — supplier object (with _raw DB row)
//   onClose    fn()
//   onSaved    fn(updatedSupplier)
//   onDeleted  fn(id) — called after successful Supabase delete

import { useState } from "react";
import { supabase } from "../../Pages/Supabase.jsx";

const TABLE = "Supplier Detail Page eng";

export default function SupplierEditModal({ supplier, onClose, onSaved, onDeleted }) {
  const raw = supplier._raw ?? {};

  const [form, setForm] = useState({
    suppliers_pfp:            raw.suppliers_pfp             ?? "",
    Capabilities1:            raw.Capabilities1             ?? "",
    Capabilities2:            raw.Capabilities2             ?? "",
    Capabilities3:            raw.Capabilities3             ?? "",
    Trust_and_verifications1: raw.Trust_and_verifications1  ?? "",
    Trust_and_verifications2: raw.Trust_and_verifications2  ?? "",
    Trust_and_verifications3: raw.Trust_and_verifications3  ?? "",
    portfolio_img1:           raw.portfolio_img1            ?? "",
    portfolio_img2:           raw.portfolio_img2            ?? "",
    portfolio_img3:           raw.portfolio_img3            ?? "",
    portfolio_img4:           raw.portfolio_img4            ?? "",
    review1:                  raw.review1                   ?? "",
    rating2:                  raw.rating2                   ?? "",
    "Lead Time":              raw["Lead Time"]              ?? "",
    MOQ:                      raw.MOQ                       ?? "",
    "Team size":              raw["Team size"]              ?? "",
    Capacity:                 raw.Capacity                  ?? "",
    production_capcity:       raw.production_capcity        ?? "",
  });

  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [error,      setError]      = useState(null);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const payload = {
      suppliers_pfp:            form.suppliers_pfp            || null,
      Capabilities1:            form.Capabilities1            || null,
      Capabilities2:            form.Capabilities2            || null,
      Capabilities3:            form.Capabilities3            || null,
      Trust_and_verifications1: form.Trust_and_verifications1 || null,
      Trust_and_verifications2: form.Trust_and_verifications2 || null,
      Trust_and_verifications3: form.Trust_and_verifications3 || null,
      portfolio_img1:           form.portfolio_img1           || null,
      portfolio_img2:           form.portfolio_img2           || null,
      portfolio_img3:           form.portfolio_img3           || null,
      portfolio_img4:           form.portfolio_img4           || null,
      review1:                  form.review1                  || null,
      rating2:                  Number(form.rating2)          || null,
      "Lead Time":              form["Lead Time"]             || null,
      MOQ:                      form.MOQ                      || null,
      "Team size":              form["Team size"]             || null,
      Capacity:                 form.Capacity                 || null,
      production_capcity:       Number(form.production_capcity) || null,
    };

    const { data: res, error: saveErr } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", raw.id)
      .select();

    setSaving(false);

    if (saveErr) {
      console.error("❌ Update error:", saveErr);
      setError(saveErr.message);
      return;
    }

    onSaved?.({ ...supplier, _raw: res[0] ?? raw });
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
      console.error("❌ Delete error:", delErr);
      setError(delErr.message);
      setConfirmDel(false);
      return;
    }

    onDeleted?.(raw.id);
    onClose();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="s-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="s-modal">

        {/* Header */}
        <div className="s-modal__hd">
          <div>
            <span className="s-modal__title">Edit Supplier</span>
            <span className="s-modal__sub">{supplier.name}</span>
          </div>
          <button className="s-modal__close" onClick={onClose}>×</button>
        </div>

        {/* Scrollable body */}
        <div className="s-modal__body">

          {/* Profile */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Profile</span>
            <label className="s-modal__label">Profile Picture URL</label>
            <input className="s-modal__input" value={form.suppliers_pfp}
              onChange={e => set("suppliers_pfp", e.target.value)}
              placeholder="https://..." />
          </div>

          {/* Capabilities */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Capabilities</span>
            {["Capabilities1", "Capabilities2", "Capabilities3"].map((k, i) => (
              <div key={k}>
                <label className="s-modal__label">Capability {i + 1}</label>
                <input className="s-modal__input" value={form[k]}
                  onChange={e => set(k, e.target.value)}
                  placeholder="e.g. Cotton Manufacturing" />
              </div>
            ))}
          </div>

          {/* Trust & Verifications */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Trust & Verifications</span>
            {["Trust_and_verifications1", "Trust_and_verifications2", "Trust_and_verifications3"].map((k, i) => (
              <div key={k}>
                <label className="s-modal__label">Verification {i + 1}</label>
                <input className="s-modal__input" value={form[k]}
                  onChange={e => set(k, e.target.value)}
                  placeholder="e.g. Insurance Coverage" />
              </div>
            ))}
          </div>

          {/* Business Info */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Business Info</span>
            <div className="s-modal__grid">
              <div>
                <label className="s-modal__label">Lead Time</label>
                <input className="s-modal__input" value={form["Lead Time"]}
                  onChange={e => set("Lead Time", e.target.value)}
                  placeholder="e.g. 3-4 weeks" />
              </div>
              <div>
                <label className="s-modal__label">MOQ</label>
                <input className="s-modal__input" value={form.MOQ}
                  onChange={e => set("MOQ", e.target.value)}
                  placeholder="e.g. 400 pieces" />
              </div>
              <div>
                <label className="s-modal__label">Team Size</label>
                <input className="s-modal__input" value={form["Team size"]}
                  onChange={e => set("Team size", e.target.value)}
                  placeholder="e.g. 97 employees" />
              </div>
              <div>
                <label className="s-modal__label">Capacity</label>
                <input className="s-modal__input" value={form.Capacity}
                  onChange={e => set("Capacity", e.target.value)}
                  placeholder="e.g. 50,000 pcs/mo" />
              </div>
              <div>
                <label className="s-modal__label">Production Capacity</label>
                <input className="s-modal__input" value={form.production_capcity}
                  onChange={e => set("production_capcity", e.target.value)}
                  placeholder="e.g. 10000" type="number" />
              </div>
              <div>
                <label className="s-modal__label">Rating</label>
                <input className="s-modal__input" value={form.rating2}
                  onChange={e => set("rating2", e.target.value)}
                  placeholder="e.g. 4" type="number" min="0" max="5" />
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Review</span>
            <label className="s-modal__label">Review Text</label>
            <textarea className="s-modal__textarea" value={form.review1}
              onChange={e => set("review1", e.target.value)}
              placeholder="Write a review..." rows={3} />
          </div>

          {/* Portfolio Images */}
          <div className="s-modal__section">
            <span className="s-modal__section-title">Portfolio Images</span>
            {["portfolio_img1", "portfolio_img2", "portfolio_img3", "portfolio_img4"].map((k, i) => (
              <div key={k}>
                <label className="s-modal__label">Image {i + 1}</label>
                <input className="s-modal__input" value={form[k]}
                  onChange={e => set(k, e.target.value)}
                  placeholder="https://..." />
              </div>
            ))}
          </div>

          {/* ── Delete zone ─────────────────────────────────────────────── */}
          <div className="s-modal__section s-modal__delete-zone">
            <span className="s-modal__section-title s-modal__section-title--danger">
              Danger Zone
            </span>
            {!confirmDel ? (
              <button
                className="s-modal__btn-delete"
                onClick={() => setConfirmDel(true)}
              >
                🗑 Delete Supplier
              </button>
            ) : (
              <div className="s-modal__confirm">
                <p className="s-modal__confirm-text">
                  Are you sure? This will permanently delete <strong>{supplier.name}</strong> and cannot be undone.
                </p>
                <div className="s-modal__confirm-btns">
                  <button
                    className="s-modal__btn-cancel"
                    onClick={() => setConfirmDel(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                  <button
                    className="s-modal__btn-delete-confirm"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting…" : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && <p className="s-modal__error">❌ {error}</p>}

        </div>

        {/* Footer */}
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