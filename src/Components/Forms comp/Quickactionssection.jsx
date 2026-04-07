// components/QuickActionsSection.jsx
// Quick actions list card — group header, sortable rows, add/delete, modal trigger.
// Owns items state, group name state, modal open state, and toast visibility.
// Props:
//   sectionTitle      string
//   addLabel          string        — pill button label (header)
//   addRowLabel       string        — inline row button label (bottom of list)
//   groupPlaceholder  string        — placeholder for the group name input
//   emptyText         string        — shown when the list is empty
//   lang              "en"|"ar"     — controls which title field is displayed in rows
//   defaultItems      array         — [{title, titleAr, preview, time}]
//   onCommit          fn(items)     — fires after every add/delete
//   toastText         string        — success toast message after add
//   modal             object        — all props forwarded verbatim to QuickActionModal

import { useState } from "react";
import QuickActionModal from "./QuickActionModal.jsx";

export default function QuickActionsSection({
  sectionTitle, addLabel, addRowLabel, groupPlaceholder, emptyText,
  lang, defaultItems, onCommit, toastText, modal,
}) {
  const [items,    setItems]    = useState(defaultItems ?? []);
  const [grpName,  setGrpName]  = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast,    setToast]    = useState(false);

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

      {/* Section header */}
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={() => setModalOpen(true)}>
          + {addLabel}
        </button>
      </div>

      {/* Group container */}
      <div className="qa-grp">

        {/* Group header row */}
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

        {/* Empty state */}
        {items.length === 0 && (
          <div className="qa-empty">{emptyText}</div>
        )}

        {/* Item rows */}
        {items.map((item, i) => (
          <div className="qa-row" key={i}>
            <span className="drag" style={{ fontSize: 10 }}>⠿</span>

            {item.preview
              ? <img  className="qa-thumb"    src={item.preview} alt={item.title} />
              : <div  className="qa-thumb-ph">SVG</div>
            }

            <span className="qa-name">
              {lang === "ar" ? item.titleAr : item.title}
            </span>

            <span className="qa-time">{item.time}</span>

            <button className="del" onClick={() => deleteItem(i)}>🗑</button>
          </div>
        ))}

        {/* Inline add button */}
        <button className="btn-add-inline" onClick={() => setModalOpen(true)}>
          + {addRowLabel}
        </button>

      </div>

      {/* Modal */}
      <QuickActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addItem}
        {...modal}
      />

      {/* Success toast */}
      {toast && <div className="toast">{toastText}</div>}

    </div>
  );
}