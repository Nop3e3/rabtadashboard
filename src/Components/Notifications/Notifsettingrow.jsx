// NotifSettingRow.jsx
// Props: name, desc, checked, onChange

import ToggleSwitch from "../Usercms/Toggleswitch";

export default function NotifSettingRow({ name, desc, checked, onChange }) {
  return (
    <div className="notif-setting-row">
      <div className="notif-setting-row__info">
        <div className="notif-setting-row__name">{name}</div>
        <div className="notif-setting-row__desc">{desc}</div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}