// atoms/NumberInput.jsx
// Controlled numeric input — spinner hidden via CSS.
// Props:
//   value      string|number
//   onChange   fn(string)
//   placeholder string
//   hasError   bool
//   min        number
//   max        number

export default function NumberInput({ value, onChange, placeholder, hasError, min, max }) {
  return (
    <input
      type="number"
      className={`n-inp${hasError ? " e" : ""}`}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
}