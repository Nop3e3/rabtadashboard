// ToggleSwitch.jsx
// Props: label, icon, checked, onChange

export default function ToggleSwitch({ label, icon, checked, onChange }) {
  return (
    <div className="cu-toggle-row">
      <span className="cu-toggle-label">
        {icon && <span className="cu-toggle-label-icon">{icon}</span>}
        {label}
      </span>
      <label className="cu-toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="cu-toggle__track" />
      </label>
    </div>
  );
}