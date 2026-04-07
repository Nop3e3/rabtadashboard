// atoms/IconInput.jsx
// Emoji or symbol input with a live preview to the left.
// Props:
//   value       string
//   onChange    fn(string)
//   placeholder string  — also used as fallback preview when value is empty

export default function IconInput({ value, onChange, placeholder }) {
  return (
    <div className="ic-row">
      <span className="ic-prev">{value || placeholder}</span>
      <input
        className="ic-inp"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}