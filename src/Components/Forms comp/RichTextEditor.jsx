

import { useState, useRef } from "react";

export default function RichTextEditor({ value, onChange, placeholder, hasError }) {
  const ref = useRef(null);
  const [, rerender] = useState(0);

  const do_  = cmd      => { document.execCommand(cmd, false, null);  ref.current?.focus(); rerender(n => n + 1); };
  const doV  = (cmd, v) => { document.execCommand(cmd, false, v);     ref.current?.focus(); rerender(n => n + 1); };
  const isOn = cmd      => { try { return document.queryCommandState(cmd); } catch { return false; } };

  const TOOLBAR = [
    { id: "bold",               icon: "B",   style: { fontWeight: 700 },               fn: () => do_("bold") },
    { id: "italic",             icon: "I",   style: { fontStyle: "italic" },            fn: () => do_("italic") },
    { id: "underline",          icon: "U",   style: { textDecoration: "underline" },    fn: () => do_("underline") },
    { id: "strikeThrough",      icon: "S",   style: { textDecoration: "line-through" }, fn: () => do_("strikeThrough") },
    "sep",
    { id: "h1",                 icon: "H1",  title: "Heading 1",    fn: () => doV("formatBlock", "<h1>") },
    { id: "h2",                 icon: "H2",  title: "Heading 2",    fn: () => doV("formatBlock", "<h2>") },
    { id: "p",                  icon: "¶",   title: "Paragraph",    fn: () => doV("formatBlock", "<p>") },
    "sep",
    { id: "insertUnorderedList", icon: "•—", title: "Bullet list",  fn: () => do_("insertUnorderedList") },
    { id: "insertOrderedList",  icon: "1.",  title: "Ordered list", fn: () => do_("insertOrderedList") },
    { id: "blockquote",         icon: "❝",   title: "Quote",        fn: () => doV("formatBlock", "<blockquote>") },
    "sep",
    { id: "justifyLeft",        icon: "⬅",  title: "Align left",   fn: () => do_("justifyLeft") },
    { id: "justifyCenter",      icon: "↔",  title: "Center",       fn: () => do_("justifyCenter") },
    { id: "justifyRight",       icon: "➡",  title: "Align right",  fn: () => do_("justifyRight") },
    "sep",
    { id: "undo",               icon: "↩",  title: "Undo",         fn: () => do_("undo") },
    { id: "redo",               icon: "↪",  title: "Redo",         fn: () => do_("redo") },
  ];

  return (
    <div className={`rte${hasError ? " e" : ""}`}>
      <div className="rte-bar">
        {TOOLBAR.map((t, i) =>
          t === "sep"
            ? <div key={i} className="rb-sep" />
            : (
              <button
                key={t.id}
                className={`rb${isOn(t.id) ? " on" : ""}`}
                style={t.style}
                title={t.title ?? t.icon}
                onMouseDown={e => { e.preventDefault(); t.fn(); }}
              >
                {t.icon}
              </button>
            )
        )}
      </div>

      <div
        ref={ref}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        data-ph={placeholder}
        onInput={e => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}