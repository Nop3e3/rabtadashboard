// PortfolioSection.jsx
// New reusable component — drag-and-drop image upload section.
// Displays uploaded images in a grid with remove buttons.
// Props:
//   sectionTitle    string
//   addBtnLabel     string
//   uploadPrompt    string
//   uploadSub       string
//   defaultImages   string[]  — array of image URLs from DB
//   onCommit        fn(files, previews) — fires on every change
//                   files:    File[]   — actual File objects (for upload)
//                   previews: string[] — local blob URLs or remote URLs
// PortfolioSection.jsx
// New reusable component — drag-and-drop image upload section.
// Displays uploaded images in a grid with remove buttons.
// Props:
//   sectionTitle    string
//   addBtnLabel     string
//   uploadPrompt    string
//   uploadSub       string
//   defaultImages   string[]  — array of image URLs from DB
//   onCommit        fn(files, previews) — fires on every change
//                   files:    File[]   — actual File objects (for upload)
//                   previews: string[] — local blob URLs or remote URLs

import { useState, useRef, useEffect } from "react";

export default function PortfolioSection({
  sectionTitle,
  addBtnLabel,
  uploadPrompt,
  uploadSub,
  defaultImages,
  onCommit,
}) {
  const fileRef = useRef(null);
  const [images, setImages] = useState([]); // [{url, file}]
  const [drag,   setDrag]   = useState(false);

  // Sync when DB data arrives (remote URLs, no File objects)
  useEffect(() => {
    if (defaultImages && defaultImages.length > 0) {
      const seeded = defaultImages
        .filter(Boolean)
        .map(url => ({ url, file: null }));
      setImages(seeded);
      onCommit?.(
        seeded.map(i => i.file),
        seeded.map(i => i.url)
      );
    }
  }, [defaultImages]);

  const addFiles = files => {
    const added = Array.from(files)
      .filter(f => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024)
      .map(f => ({ url: URL.createObjectURL(f), file: f }));

    const next = [...images, ...added];
    setImages(next);
    onCommit?.(
      next.map(i => i.file),
      next.map(i => i.url)
    );
  };

  const remove = i => {
    const next = images.filter((_, idx) => idx !== i);
    setImages(next);
    onCommit?.(
      next.map(i => i.file),
      next.map(i => i.url)
    );
  };

  return (
    <div className="card">

      {/* Header */}
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        <button className="btn-add-pill" onClick={() => fileRef.current?.click()}>
          + {addBtnLabel}
        </button>
      </div>

      {/* Upload zone — shown when no images yet */}
      {images.length === 0 && (
        <div
          className={`upz${drag ? " dg" : ""}`}
          style={{ minHeight: 120 }}
          onClick={() => fileRef.current?.click()}
          onDragOver={e  => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e      => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
        >
          <div className="upz-ico">⬆</div>
          <div className="upz-lbl">{uploadPrompt}</div>
          <div className="upz-sub">{uploadSub}</div>
        </div>
      )}

      {/* Image grid — shown once images are added */}
      {images.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "0.75rem",
        }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: "relative", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "16/9", background: "#111" }}>
              <img
                src={img.url}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <button
                onClick={() => remove(i)}
                style={{
                  position: "absolute", top: 4, right: 4,
                  width: 22, height: 22,
                  background: "rgba(0,0,0,0.7)", border: "none",
                  borderRadius: "50%", color: "#fff",
                  fontSize: 12, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >×</button>
            </div>
          ))}

          {/* Add more button inside the grid */}
          <div
            className={`upz${drag ? " dg" : ""}`}
            style={{ minHeight: 80, aspectRatio: "16/9" }}
            onClick={() => fileRef.current?.click()}
            onDragOver={e  => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e      => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          >
            <div style={{ fontSize: 20, opacity: 0.4 }}>+</div>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={e => addFiles(e.target.files)}
      />

    </div>
  );
}