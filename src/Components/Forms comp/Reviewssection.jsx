// ReviewsSection.jsx
// New reusable component — structured repeatable form for reviews.
// Each review has: reviewer name, review text, rating.
// Props:
//   sectionTitle        string
//   addRowLabel         string
//   namePlaceholder     string
//   reviewPlaceholder   string
//   ratingPlaceholder   string
//   nameLabel           string
//   reviewLabel         string
//   ratingLabel         string
//   defaultItems        [{name, review, rating}]
//   onCommit            fn([{name, review, rating}])
//   externalError       string|null

import { useState, useEffect } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";


const EMPTY = { name: "", review: "", rating: "", pfp: "" };

export default function ReviewsSection({
  sectionTitle,
  addRowLabel,
  nameLabel,
  reviewLabel,
  ratingLabel,
  pfpLabel,
  namePlaceholder,
  reviewPlaceholder,
  ratingPlaceholder,
  pfpPlaceholder,
  defaultItems,
  onCommit,
  externalError,
}) {
  const [items, setItems] = useState(defaultItems ?? [{ ...EMPTY }]);

  // Sync when DB data arrives
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

  const addReview    = ()           => update([...items, { ...EMPTY }]);
  const removeReview = i            => update(items.filter((_, idx) => idx !== i));
  const editField    = (i, key, v)  => {
    const next = items.map((item, idx) =>
      idx === i ? { ...item, [key]: v } : item
    );
    update(next);
  };

  return (
    <div className="card">

      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            padding: "1rem",
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            position: "relative",
          }}
        >
          {/* Remove button */}
          {items.length > 1 && (
            <button
              className="del"
              onClick={() => removeReview(i)}
              style={{ position: "absolute", top: 8, right: 8 }}
            >🗑</button>
          )}

          {/* Reviewer Name */}
          <Field label={nameLabel}>
            <TextInput
              value={item.name}
              onChange={v => editField(i, "name", v)}
              placeholder={namePlaceholder}
            />
          </Field>

          {/* Review Text */}
          <Field label={reviewLabel}>
            <TextInput
              value={item.review}
              onChange={v => editField(i, "review", v)}
              placeholder={reviewPlaceholder}
            />
          </Field>

          {/* Rating */}
          <Field label={ratingLabel}>
            <TextInput
              value={item.rating}
              onChange={v => editField(i, "rating", v)}
              placeholder={ratingPlaceholder}
            />
          </Field>

          {/* PFP — only shown if pfpLabel prop is passed */}
          {pfpLabel && (
            <Field label={pfpLabel}>
              <TextInput
                value={item.pfp ?? ""}
                onChange={v => editField(i, "pfp", v)}
                placeholder={pfpPlaceholder ?? "https://..."}
              />
            </Field>
          )}
        </div>
      ))}

      <button className="btn-add-inline" onClick={addReview}>
        + {addRowLabel}
      </button>

      {externalError && <span className="err">{externalError}</span>}

    </div>
  );
}