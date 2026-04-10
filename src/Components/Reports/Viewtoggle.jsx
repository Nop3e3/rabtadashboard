// ViewToggle.jsx
// Props: value ("Weekly"|"Monthly"), onChange fn(string)

const OPTIONS = ["Weekly View", "Monthly View"];

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="rp-view-toggle">
      {OPTIONS.map(opt => (
        <button
          key={opt}
          className={`rp-toggle-btn${value === opt ? " rp-toggle-btn--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}