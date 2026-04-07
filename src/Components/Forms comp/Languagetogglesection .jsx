// components/LanguageToggleSection.jsx
// Language switcher pill — controls which language is being edited.
// Props:
//   eyebrow   string               — small uppercase label above the toggle
//   options   [{value, label, dir}] — tab definitions
//   value     string               — currently active language value
//   onChange  fn(value)            — called when user picks a different language

export default function LanguageToggleSection({ eyebrow, options, value, onChange }) {
  return (
    <div className="lt">
      <div className="lt-eye">{eyebrow}</div>
      <div className="lt-track">
        {options.map(opt => (
          <button
            key={opt.value}
            className={`lt-btn${value === opt.value ? " on" : ""}`}
            dir={opt.dir}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}