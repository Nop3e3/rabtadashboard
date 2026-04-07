// QuickActionModal.jsx
// Modal for adding a Quick Action — drag-and-drop image upload + bilingual title fields.
// Owns all internal form state and per-field validation.
// Props:
//   open           bool
//   onClose        fn
//   onSave         fn(item)     — called with {title, titleAr, preview, time}
//   title          string
//   uploadLabel    string
//   uploadPrompt   string
//   uploadSub      string
//   uploadHint     string
//   enLabel        string
//   enPh           string
//   enMax          number
//   arLabel        string
//   arPh           string
//   arMax          number
//   cancelLabel    string
//   saveLabel      string
//   errMsg         object  — { image, imageType, imageSize, en, ar, minLen }

import { useState, useRef, useEffect } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function QuickActionModal({
  open, onClose, onSave,
  title, uploadLabel, uploadPrompt, uploadSub, uploadHint,
  enLabel, enPh, enMax,
  arLabel, arPh, arMax,
  cancelLabel, saveLabel,
  errMsg,
}) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({ en: "", ar: "", file: null, preview: null });
  const [errs, setErrs] = useState({});
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({ en: "", ar: "", file: null, preview: null });
      setErrs({});
    }
  }, [open]);

  if (!open) return null;

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const clr = k      => setErrs(p => { const n = { ...p }; delete n[k]; return n; });

  const handleFile = file => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErrs(p => ({ ...p, img: errMsg.imageType })); return; }
    if (file.size > 5 * 1024 * 1024)    { setErrs(p => ({ ...p, img: errMsg.imageSize })); return; }
    set("file",    file);
    set("preview", URL.createObjectURL(file));
    clr("img");
  };

  const validate = () => {
    const e = {};
    if (!form.file)                     e.img = errMsg.image;
    if (!form.en.trim())                e.en  = errMsg.en;
    else if (form.en.trim().length < 2) e.en  = errMsg.minLen;
    if (!form.ar.trim())                e.ar  = errMsg.ar;
    else if (form.ar.trim().length < 2) e.ar  = errMsg.minLen;
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      title:   form.en,
      titleAr: form.ar,
      preview: form.preview,
      time:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        <div className="modal-hd">
          <span className="modal-ttl">{title}</span>
          <button className="modal-x" onClick={onClose}>×</button>
        </div>

        <Field label={uploadLabel} required hint={uploadHint} error={errs.img}>
          {form.preview
            ? (
              <div className="prev-row">
                <img className="prev-img" src={form.preview} alt="" />
                <span className="prev-name">{form.file?.name}</span>
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
                <div className="upz-lbl">{uploadPrompt}</div>
                <div className="upz-sub">{uploadSub}</div>
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

        <div className="f-2">
          <Field label={enLabel} required error={errs.en} maxLen={enMax} len={form.en.length}>
            <TextInput
              value={form.en}
              onChange={v => { set("en", v); clr("en"); }}
              placeholder={enPh}
              hasError={!!errs.en}
              maxLength={enMax}
            />
          </Field>
          <Field label={arLabel} required error={errs.ar} maxLen={arMax} len={form.ar.length}>
            <TextInput
              value={form.ar}
              onChange={v => { set("ar", v); clr("ar"); }}
              placeholder={arPh}
              hasError={!!errs.ar}
              maxLength={arMax}
              dir="rtl"
            />
          </Field>
        </div>

        <div className="m-ft">
          <button className="m-cancel" onClick={onClose}>{cancelLabel}</button>
          <button className="m-save"   onClick={handleSave}>{saveLabel}</button>
        </div>

      </div>
    </div>
  );
}