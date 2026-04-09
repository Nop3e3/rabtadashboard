

import { useState, useEffect } from "react";

const EMPTY = { name: "", level: "" };

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
  alignItems: "center",
};

export default function RecommendedItemSection({
  sectionTitle,
  addBtnLabel,
  addRowLabel,
  emptyText,
  namePlaceholder,
  levelLabel,
  levelOptions,
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

  const update     = next      => { setItems(next); onCommit?.(next); };
  const addItem    = ()        => update([...items, { ...EMPTY }]);
  const removeItem = i         => update(items.filter((_, idx) => idx !== i));
  const edit       = (i, k, v) => update(items.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  return (
    <div className="card">

      {/* Header */}
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={addItem}>+ {addBtnLabel}</button>
      </div>

      {/* Group container */}
      <div className="qa-grp">

        {items.length === 0 && (
          <div className="qa-empty">{emptyText}</div>
        )}

        {items.map((item, i) => (
          <div className="qa-row" key={i}>
            <span className="drag">⠿</span>

            <div style={{ flex: 1, ...rowStyle }}>
              <input
                style={inputStyle}
                value={item.name}
                onChange={e => edit(i, "name", e.target.value)}
                placeholder={namePlaceholder}
              />
              <select
                style={selectStyle}
                value={item.level}
                onChange={e => edit(i, "level", e.target.value)}
              >
                <option value="">{levelLabel}</option>
                {(levelOptions ?? []).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <button className="del" onClick={() => removeItem(i)}>🗑</button>
          </div>
        ))}

        <button className="btn-add-inline" onClick={addItem}>+ {addRowLabel}</button>
      </div>

      {externalError && <span className="err">{externalError}</span>}
    </div>
  );
}