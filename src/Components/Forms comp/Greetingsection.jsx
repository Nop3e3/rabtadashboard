// components/GreetingSection.jsx
// Editable greeting text input (e.g. "Good Morning").
// Owns its own value state and inline validation.
// Props:
//   label          string        — card + field label
//   placeholder    string
//   maxLength      number
//   required       bool
//   dir            "ltr"|"rtl"
//   defaultValue   string        — initial value
//   onCommit       fn({greeting: string})  — fires on every change
//   externalError  string|null   — error injected from parent (e.g. on Save click)

import { useState, useCallback } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function GreetingSection({
  label, placeholder, maxLength, required, dir,
  defaultValue, onCommit, externalError,
}) {
  const [val, setVal] = useState(defaultValue ?? "");
  const [err, setErr] = useState(null);

  const validate = useCallback(v => {
    if (required && !v.trim()) return "Greeting text is required.";
    if (v.trim().length > 0 && v.trim().length < 2) return "Must be at least 2 characters.";
    return null;
  }, [required]);

  const handleChange = v => {
    setVal(v);
    setErr(validate(v));
    onCommit?.({ greeting: v });
  };

  const activeError = externalError ?? err;

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{label}</span>
      </div>

      <Field
        label={label}
        required={required}
        error={activeError}
        maxLen={maxLength}
        len={val.length}
      >
        <TextInput
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          hasError={!!activeError}
          maxLength={maxLength}
          dir={dir}
        />
      </Field>
    </div>
  );
}