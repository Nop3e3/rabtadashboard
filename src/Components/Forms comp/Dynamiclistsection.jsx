// DynamicListSection.jsx
// Reusable section for managing a dynamic list of text items.
// Used for Filters, Tags, or any repeatable text list.
// Props:
//   sectionTitle      string
//   addBtnLabel       string   — pill button label (header)
//   addRowLabel       string   — inline add button label (bottom of list)
//   itemPlaceholder   string   — placeholder inside each text input
//   emptyText         string   — shown when list is empty
//   defaultItems      string[] — initial list values
//   onCommit          fn(string[]) — fires on every add/delete/edit
//   externalError     string|null

import { useState, useEffect } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function DynamicListSection({
  sectionTitle,
  addBtnLabel,
  addRowLabel,
  itemPlaceholder,
  emptyText,
  defaultItems,
  onCommit,
  externalError,
}) {
  const [items, setItems] = useState(defaultItems ?? [""]);

  // Sync when DB data arrives after mount
  useEffect(() => {
    if (defaultItems && defaultItems.length > 0) {
      setItems(defaultItems);
      onCommit?.(defaultItems);
    }
  }, [defaultItems]);

  const update = next => {
    setItems(next);
    onCommit?.(next);
  };

  const addItem    = ()      => update([...items, ""]);
  const deleteItem = i       => update(items.filter((_, idx) => idx !== i));
  const editItem   = (i, v)  => {
    const next = [...items];
    next[i] = v;
    update(next);
  };

  return (
    <div className="card">

      {/* Header */}
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={addItem}>
          + {addBtnLabel}
        </button>
      </div>

      {/* List */}
      <div className="qa-grp">

        {items.length === 0 && (
          <div className="qa-empty">{emptyText}</div>
        )}

        {items.map((item, i) => (
          <div className="qa-row" key={i}>
            <span className="drag">⠿</span>
            <div style={{ flex: 1 }}>
              <TextInput
                value={item}
                onChange={v => editItem(i, v)}
                placeholder={itemPlaceholder}
              />
            </div>
            <button className="del" onClick={() => deleteItem(i)}>🗑</button>
          </div>
        ))}

        {/* Inline add button */}
        <button className="btn-add-inline" onClick={addItem}>
          + {addRowLabel}
        </button>

      </div>

      {externalError && <span className="err">{externalError}</span>}

    </div>
  );
}