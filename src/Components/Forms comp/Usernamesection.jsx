// components/UserNameSection.jsx
// Editable user name display text (e.g. "Welcome Back, {user}").
// Owns its own value state and inline validation.
// Props:
//   label          string
//   hint           string        — helper text beneath label
//   placeholder    string
//   maxLength      number
//   required       bool
//   dir            "ltr"|"rtl"
//   defaultValue   string
//   onCommit       fn({userName: string})
//   externalError  string|null

import { useState, useCallback } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function UserNameSection({
  label, hint, placeholder, maxLength, required, dir,
  defaultValue, onCommit, externalError,
}) {
  const [val, setVal] = useState(defaultValue ?? "");
  const [err, setErr] = useState(null);

  const validate = useCallback(v => {
    if (required && !v.trim()) return "User name display text is required.";
    return null;
  }, [required]);

  const handleChange = v => {
    setVal(v);
    setErr(validate(v));
    onCommit?.({ userName: v });
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
        hint={hint}
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