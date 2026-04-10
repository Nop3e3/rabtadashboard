// UserStatusCard.jsx
// Props:
//   status         string
//   onStatusChange fn(string)
//   verified       bool
//   onVerified     fn(bool)
//   premium        bool
//   onPremium      fn(bool)

import ToggleSwitch from "./Toggleswitch.jsx";

const STATUS_OPTIONS = ["Active", "Suspended", "Banned", "Pending"];

export default function UserStatusCard({
  status, onStatusChange,
  verified, onVerified,
  premium, onPremium,
}) {
  return (
    <div className="cu-card">
      <span className="cu-card__title">User Status</span>

      <div className="cu-field">
        <label className="cu-label">Account Status</label>
        <select className="cu-status-select" value={status}
          onChange={e => onStatusChange?.(e.target.value)}>
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <ToggleSwitch
        label="Verified User"
        icon="🎓"
        checked={verified}
        onChange={onVerified}
      />
      <ToggleSwitch
        label="Premium Member"
        icon="💎"
        checked={premium}
        onChange={onPremium}
      />
    </div>
  );
}