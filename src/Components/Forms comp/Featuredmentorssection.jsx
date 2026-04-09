

import { useState, useEffect } from "react";
import TextInput from "./TextInput.jsx";

const EMPTY = {
  mentor: "", tag: "", specialization: "",
  verification: "", clients: "", rating: "",
};

export default function FeaturedMentorsSection({
  sectionTitle,
  addBtnLabel,
  addRowLabel,
  emptyText,
  mentorPlaceholder,
  specPlaceholder,
  clientsPlaceholder,
  tagLabel,
  tagOptions,
  verificationLabel,
  verificationOptions,
  ratingLabel,
  ratingOptions,
  defaultItems,
  onCommit,
  externalError,
}) {
  const [items, setItems] = useState(defaultItems ?? [{ ...EMPTY }]);

  useEffect(() => {
    if (defaultItems && defaultItems.length > 0) {
      setItems(defaultItems);
      onCommit?.(defaultItems);
    }
  }, [defaultItems]);

  const update     = next => { setItems(next); onCommit?.(next); };
  const addItem    = ()        => update([...items, { ...EMPTY }]);
  const removeItem = i         => update(items.filter((_, idx) => idx !== i));
  const editField  = (i, k, v) => {
    const next = items.map((item, idx) => idx === i ? { ...item, [k]: v } : item);
    update(next);
  };

  const dropdown = (value, onChange, label, options) => (
    <select
      className="inp"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ cursor: "pointer" }}
    >
      <option value="">{label}</option>
      {(options ?? []).map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={addItem}>+ {addBtnLabel}</button>
      </div>

      {items.length === 0 && <div className="qa-empty">{emptyText}</div>}

      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", flexDirection: "column", gap: "0.6rem",
          padding: "1rem", background: "var(--bg-input)",
          border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
          position: "relative",
        }}>
          {items.length > 1 && (
            <button className="del" onClick={() => removeItem(i)}
              style={{ position: "absolute", top: 8, right: 8 }}>🗑</button>
          )}

          {/* Row 1: Mentor Name + Tag dropdown */}
          <div className="f-2">
            <TextInput
              value={item.mentor}
              onChange={v => editField(i, "mentor", v)}
              placeholder={mentorPlaceholder}
            />
            {dropdown(item.tag, v => editField(i, "tag", v), tagLabel, tagOptions)}
          </div>

          {/* Row 2: Specialization + Verification dropdown */}
          <div className="f-2">
            <TextInput
              value={item.specialization}
              onChange={v => editField(i, "specialization", v)}
              placeholder={specPlaceholder}
            />
            {dropdown(item.verification, v => editField(i, "verification", v), verificationLabel, verificationOptions)}
          </div>

          {/* Row 3: Number of Clients + Rating dropdown */}
          <div className="f-2">
            <TextInput
              value={item.clients}
              onChange={v => editField(i, "clients", v)}
              placeholder={clientsPlaceholder}
            />
            {dropdown(item.rating, v => editField(i, "rating", v), ratingLabel, ratingOptions)}
          </div>
        </div>
      ))}

      <button className="btn-add-inline" onClick={addItem}>+ {addRowLabel}</button>

      {externalError && <span className="err">{externalError}</span>}
    </div>
  );
}