// ContentSection.jsx

import { useState, useEffect, useCallback } from "react";
import Field          from "./Field.jsx";
import RichTextEditor from "./RichTextEditor.jsx";

export default function ContentSection({
  sectionTitle, badge, label, placeholder, required,
  defaultValue, onCommit, externalError,
}) {
  const [val, setVal] = useState(defaultValue ?? "");
  const [err, setErr] = useState(null);

  // Sync + fire onCommit when DB data arrives
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setVal(defaultValue);
      onCommit?.({ content: defaultValue });
    }
  }, [defaultValue]);

  const validate = useCallback(v => {
    const text = v?.replace(/<[^>]*>/g, "").trim();
    if (required && !text) return "Section content cannot be empty.";
    return null;
  }, [required]);

  const handleChange = v => {
    setVal(v);
    setErr(validate(v));
    onCommit?.({ content: v });
  };

  const activeError = externalError ?? err;

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{sectionTitle}</span>
        {badge && <span className="s-badge">{badge}</span>}
      </div>
      <Field label={label} required={required} error={activeError}>
        <RichTextEditor
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          hasError={!!activeError}
        />
      </Field>
    </div>
  );
}