// UpcomingSessionSection.jsx

import { useState, useEffect } from "react";

const EMPTY = { topic: "", time: "", mentor: "", tag: "", specialization: "", verification: "" };

const inputStyle = {
  width: "100%",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-sm)",
  padding: "0.68rem 0.9rem",
  fontFamily: "var(--font)",
  fontSize: "12px",
  color: "var(--text)",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236e6e68' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.9rem center",
  paddingRight: "2.2rem",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.6rem",
};

const entryStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  padding: "1rem",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-sm)",
  position: "relative",
};

export default function UpcomingSessionSection({
  sectionTitle,
  addBtnLabel,
  addRowLabel,
  emptyText,
  topicPlaceholder,
  timePlaceholder,
  mentorPlaceholder,
  specPlaceholder,
  tagLabel,
  tagOptions,
  verificationLabel,
  verificationOptions,
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

  const update     = next       => { setItems(next); onCommit?.(next); };
  const addItem    = ()         => update([...items, { ...EMPTY }]);
  const removeItem = i          => update(items.filter((_, idx) => idx !== i));
  const edit       = (i, k, v)  => update(items.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={addItem}>+ {addBtnLabel}</button>
      </div>

      {items.length === 0 && <div className="qa-empty">{emptyText}</div>}

      {items.map((item, i) => (
        <div key={i} style={entryStyle}>

          {items.length > 1 && (
            <button className="del" onClick={() => removeItem(i)}
              style={{ position: "absolute", top: 8, right: 8 }}>🗑</button>
          )}

          {/* Topic + Time */}
          <div style={rowStyle}>
            <input
              style={inputStyle}
              value={item.topic}
              onChange={e => edit(i, "topic", e.target.value)}
              placeholder={topicPlaceholder}
            />
            <input
              style={inputStyle}
              value={item.time}
              onChange={e => edit(i, "time", e.target.value)}
              placeholder={timePlaceholder}
            />
          </div>

          {/* Mentor Name + Tag */}
          <div style={rowStyle}>
            <input
              style={inputStyle}
              value={item.mentor}
              onChange={e => edit(i, "mentor", e.target.value)}
              placeholder={mentorPlaceholder}
            />
            <select
              style={selectStyle}
              value={item.tag}
              onChange={e => edit(i, "tag", e.target.value)}
            >
              <option value="">{tagLabel}</option>
              {(tagOptions ?? []).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Specialization + Verification */}
          <div style={rowStyle}>
            <input
              style={inputStyle}
              value={item.specialization}
              onChange={e => edit(i, "specialization", e.target.value)}
              placeholder={specPlaceholder}
            />
            <select
              style={selectStyle}
              value={item.verification}
              onChange={e => edit(i, "verification", e.target.value)}
            >
              <option value="">{verificationLabel}</option>
              {(verificationOptions ?? []).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

        </div>
      ))}

      <button className="btn-add-inline" onClick={addItem}>+ {addRowLabel}</button>

      {externalError && <span className="err">{externalError}</span>}
    </div>
  );
}