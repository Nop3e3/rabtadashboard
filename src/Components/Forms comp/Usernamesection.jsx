// UserNameSection.jsx

import { useState, useEffect, useCallback } from "react";
import Field     from "./Field.jsx";
import TextInput from "./TextInput.jsx";

export default function UserNameSection({
  label, hint, placeholder, maxLength, required, dir,
  defaultValue, onCommit, externalError,
  extraLabel, extraPlaceholder, extraMaxLength, extraDefaultValue, onExtraCommit,
}) {
  const [val,      setVal]      = useState(defaultValue      ?? "");
  const [extraVal, setExtraVal] = useState(extraDefaultValue ?? "");
  const [err,      setErr]      = useState(null);

  // Sync name + fire onCommit when DB data arrives
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setVal(defaultValue);
      onCommit?.({ userName: defaultValue });
    }
  }, [defaultValue]);

  // Sync username + fire onExtraCommit when DB data arrives
  useEffect(() => {
    if (extraDefaultValue !== undefined && extraDefaultValue !== null) {
      setExtraVal(extraDefaultValue);
      onExtraCommit?.(extraDefaultValue);
    }
  }, [extraDefaultValue]);

  const validate = useCallback(v => {
    if (required && !v.trim()) return "Name is required.";
    return null;
  }, [required]);

  const handleChange = v => {
    setVal(v);
    setErr(validate(v));
    onCommit?.({ userName: v });
  };

  const handleExtra = v => {
    setExtraVal(v);
    onExtraCommit?.(v);
  };

  const activeError = externalError ?? err;

  return (
    <div className="card">
      <div className="s-hd">
        <span className="s-title">{label}</span>
      </div>

      <Field label={label} required={required} hint={hint} error={activeError} maxLen={maxLength} len={val.length}>
        <TextInput
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          hasError={!!activeError}
          maxLength={maxLength}
          dir={dir}
        />
      </Field>

      {extraLabel && (
        <Field label={extraLabel} maxLen={extraMaxLength} len={extraVal.length}>
          <TextInput
            value={extraVal}
            onChange={handleExtra}
            placeholder={extraPlaceholder}
            maxLength={extraMaxLength}
            dir={dir}
          />
        </Field>
      )}
    </div>
  );
}