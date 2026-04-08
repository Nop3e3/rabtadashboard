// QuickActionModal.jsx

import { useState, useRef, useEffect } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function QuickActionModal({
  open,
  onClose,
  onSave,
  // modal heading
  title,
  // image field
  uploadLabel,
  uploadPrompt,
  uploadSub,
  uploadHint,
  // title field
  titleLabel,
  titlePh,
  titleMax,
  // caption field
  captionLabel,
  captionPh,
  captionMax,
  // button field
  buttonLabel,
  buttonPh,
  buttonMax,
  // path field
  pathLabel,
  pathPh,
  pathMax,
  // footer
  cancelLabel,
  saveLabel,
  // validation messages
  errMsg,
}) {
  const fileRef = useRef(null);

  const EMPTY = { title: "", caption: "", button: "", path: "", file: null, preview: null };

  const [form, setForm] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [drag, setDrag] = useState(false);

  // Reset form every time modal opens
  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setErrs({});
    }
  }, [open]);

  if (!open) return null;

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const clr = k      => setErrs(p => { const n = { ...p }; delete n[k]; return n; });

  const handleFile = file => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrs(p => ({ ...p, img: errMsg?.imageType ?? "Invalid file type." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrs(p => ({ ...p, img: errMsg?.imageSize ?? "File too large." }));
      return;
    }
    set("file",    file);
    set("preview", URL.createObjectURL(file));
    clr("img");
  };

  const validate = () => {
    const e = {};
    // Image is optional — only validate title
    if (!form.title.trim()) {
      e.title = errMsg?.title ?? "Title is required.";
    } else if (form.title.trim().length < 2) {
      e.title = errMsg?.minLen ?? "Must be at least 2 characters.";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      title:    form.title,
      caption:  form.caption,
      imageUrl: form.preview ?? "",
      button:   form.button,
      path:     form.path,
      preview:  form.preview,
    });
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        {/* Header */}
        <div className="modal-hd">
          <span className="modal-ttl">{title ?? "Add Quick Action"}</span>
          <button className="modal-x" onClick={onClose}>×</button>
        </div>

        {/* Image upload — optional */}
        <Field label={uploadLabel ?? "Action Image"} hint={uploadHint} error={errs.img}>
          {form.preview
            ? (
              <div className="prev-row">
                <img className="prev-img" src={form.preview} alt="" />
                <span className="prev-name">{form.file?.name ?? "Image selected"}</span>
                <button className="prev-rm" onClick={() => { set("file", null); set("preview", null); }}>×</button>
              </div>
            )
            : (
              <div
                className={`upz${drag ? " dg" : ""}${errs.img ? " e" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e  => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e      => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
              >
                <div className="upz-ico">📁</div>
                <div className="upz-lbl">{uploadPrompt ?? "Click to upload or drag & drop"}</div>
                <div className="upz-sub">{uploadSub ?? "PNG · JPG · SVG · max 5 MB"}</div>
              </div>
            )
          }
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => handleFile(e.target.files[0])}
          />
        </Field>

        {/* Title — required */}
        <Field
          label={titleLabel ?? "Title"}
          required
          error={errs.title}
          maxLen={titleMax ?? 80}
          len={form.title.length}
        >
          <TextInput
            value={form.title}
            onChange={v => { set("title", v); clr("title"); }}
            placeholder={titlePh ?? "e.g. Business Health"}
            hasError={!!errs.title}
            maxLength={titleMax ?? 80}
          />
        </Field>

        {/* Caption — optional */}
        <Field
          label={captionLabel ?? "Caption"}
          maxLen={captionMax ?? 120}
          len={form.caption.length}
        >
          <TextInput
            value={form.caption}
            onChange={v => set("caption", v)}
            placeholder={captionPh ?? "Short description..."}
            maxLength={captionMax ?? 120}
          />
        </Field>

        {/* Button Label + Navigation Path — optional, side by side */}
        <div className="f-2">
          <Field label={buttonLabel ?? "Button Label"} maxLen={buttonMax ?? 40} len={form.button.length}>
            <TextInput
              value={form.button}
              onChange={v => set("button", v)}
              placeholder={buttonPh ?? "e.g. Start Now"}
              maxLength={buttonMax ?? 40}
            />
          </Field>
          <Field label={pathLabel ?? "Navigation Path"} maxLen={pathMax ?? 200} len={form.path.length}>
            <TextInput
              value={form.path}
              onChange={v => set("path", v)}
              placeholder={pathPh ?? "/screen/name"}
              maxLength={pathMax ?? 200}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="m-ft">
          <button className="m-cancel" onClick={onClose}>
            {cancelLabel ?? "Cancel"}
          </button>
          <button className="m-save" onClick={handleSave}>
            {saveLabel ?? "+ Add Action"}
          </button>
        </div>

      </div>
    </div>
  );
}