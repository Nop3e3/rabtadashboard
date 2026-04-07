// atoms/Field.jsx
// Wraps any input with label, required marker, hint, char counter, and error message.
// Props:
//   label    string   — field label text
//   required bool     — shows red asterisk
//   hint     string   — muted sub-label beneath the label
//   error    string   — error message; falsy = hidden
//   maxLen   number   — enables char counter
//   len      number   — current character count
//   children node     — the actual input element

export default function Field({ label, required, hint, error, maxLen, len, children }) {
  const nearLimit = maxLen && len >= maxLen * 0.85;

  return (
    <div className="f">
      {label && (
        <span className="lbl">
          {label}
          {required && <span className="lbl-r">*</span>}
        </span>
      )}
      {hint && <span className="hint">{hint}</span>}
      {children}
      {maxLen && (
        <span className={`cct${nearLimit ? " hi" : ""}`}>
          {len ?? 0} / {maxLen}
        </span>
      )}
      {error && <span className="err">{error}</span>}
    </div>
  );
}