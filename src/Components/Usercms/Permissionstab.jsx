// PermissionsTab.jsx
// Tab 3: Permissions & Access
// Props: permissions, onPermission, accountInfo, status, onStatusChange,
//        verified, onVerified, premium, onPremium, onSuspend, onDelete, deleting

import ToggleSwitch    from "./Toggleswitch.jsx";
import UserStatusCard  from "./Userstatuscard.jsx";
import AccountInfoCard from "./Accountinfocard.jsx";
import DangerZoneCard  from "./Dangerzonecard.jsx";

const ACCESS_ITEMS = [
  { key: "platformAccess",     name: "Platform Access",      desc: "Allow user to access the platform"              },
  { key: "supplierDirectory",  name: "Supplier Directory",   desc: "Access to supplier search and profiles"          },
  { key: "learningHub",        name: "Learning Hub",         desc: "Access to courses and learning materials"        },
  { key: "communityFeatures",  name: "Community Features",   desc: "Post in forums and connect with peers"           },
  { key: "messaging",          name: "Messaging",            desc: "Send and receive direct messages"                },
];

export default function PermissionsTab({
  permissions, onPermission,
  accountInfo,
  status, onStatusChange,
  verified, onVerified,
  premium, onPremium,
  onSuspend, onDelete, deleting,
}) {
  return (
    <div className="cu-content">

      {/* ── LEFT COLUMN ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Access Control */}
        <div className="cu-card">
          <span className="cu-card__title">Access Control</span>
          <div className="cu-access-list">
            {ACCESS_ITEMS.map(item => (
              <div key={item.key} className="cu-access-item">
                <div className="cu-access-item__info">
                  <div className="cu-access-item__name">{item.name}</div>
                  <div className="cu-access-item__desc">{item.desc}</div>
                </div>
                <label className="cu-toggle">
                  <input
                    type="checkbox"
                    checked={permissions[item.key] ?? true}
                    onChange={e => onPermission(item.key, e.target.checked)}
                  />
                  <span className="cu-toggle__track" />
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <UserStatusCard
          status={status} onStatusChange={onStatusChange}
          verified={verified} onVerified={onVerified}
          premium={premium} onPremium={onPremium}
        />
        <AccountInfoCard info={accountInfo} />
        <DangerZoneCard
          userName={accountInfo?.name}
          onSuspend={onSuspend}
          onDelete={onDelete}
          deleting={deleting}
        />
      </div>

    </div>
  );
}