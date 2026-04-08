// QuickActionsSection.jsx

import { useState, useEffect } from "react";
import QuickActionModal from "./QuickActionModal.jsx";

export default function QuickActionsSection({
  sectionTitle,
  addLabel,
  addRowLabel,
  groupPlaceholder,
  emptyText,
  lang,
  defaultItems,
  onCommit,
  toastText,
  modal,
}) {
  const [items,     setItems]     = useState(defaultItems ?? []);
  const [grpName,   setGrpName]   = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast,     setToast]     = useState(false);

  // Sync + fire onCommit when DB data arrives
  useEffect(() => {
    if (defaultItems && defaultItems.length > 0) {
      setItems(defaultItems);
      onCommit?.(defaultItems);
    }
  }, [defaultItems]);

  const addItem = item => {
    const next = [...items, item];
    setItems(next);
    onCommit?.(next);
    setModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2100);
  };

  const deleteItem = i => {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
    onCommit?.(next);
  };

  return (
    <div className="card">

      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={() => setModalOpen(true)}>
          + {addLabel}
        </button>
      </div>

      <div className="qa-grp">

        <div className="qa-grp-hd">
          <span className="drag">⠿</span>
          <input
            className="qa-grp-inp"
            value={grpName}
            onChange={e => setGrpName(e.target.value)}
            placeholder={groupPlaceholder}
          />
          <button className="del" title="Delete group">🗑</button>
        </div>

        {items.length === 0 && (
          <div className="qa-empty">{emptyText}</div>
        )}

        {items.map((item, i) => (
          <div className="qa-row" key={i}>
            <span className="drag" style={{ fontSize: 10 }}>⠿</span>

            {item.preview
              ? <img className="qa-thumb" src={item.preview} alt={item.title} />
              : <div className="qa-thumb-ph">IMG</div>
            }

            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
              <span className="qa-name">{item.title}</span>
              {item.caption && (
                <span style={{ fontSize: 9.5, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.caption}
                </span>
              )}
            </div>

            {item.path && (
              <span style={{ fontSize: 9, color: "var(--text-3)", fontFamily: "monospace", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }}>
                {item.path}
              </span>
            )}

            <button className="del" onClick={() => deleteItem(i)}>🗑</button>
          </div>
        ))}

        <button className="btn-add-inline" onClick={() => setModalOpen(true)}>
          + {addRowLabel}
        </button>

      </div>

      <QuickActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addItem}
        {...modal}
      />

      {toast && <div className="toast">{toastText}</div>}

    </div>
  );
}