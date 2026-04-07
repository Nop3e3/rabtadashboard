// atoms/TextInput.jsx
// Controlled plain text input.
// Props:
//   value      string
//   onChange   fn(string)
//   placeholder string
//   hasError   bool    — triggers red error ring
//   maxLength  number
//   dir        "ltr"|"rtl"

export default function TextInput({ value, onChange, placeholder, hasError, maxLength, dir }) {
  return (
    <input
      className={`inp${hasError ? " e" : ""}`}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      dir={dir}
    />
  );
}