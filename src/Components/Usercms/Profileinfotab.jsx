// ProfileInfoTab.jsx
// Tab 1: Profile Information
// Props: form, errors, onChange, accountInfo, status, onStatusChange,
//        verified, onVerified, premium, onPremium, onSuspend, onDelete, deleting

import UserStatusCard  from "./Userstatuscard.jsx";
import AccountInfoCard from "./Accountinfocard.jsx";
import DangerZoneCard  from "./Dangerzonecard.jsx";

export default function ProfileInfoTab({
  form, errors, onChange,
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

        {/* Basic Information */}
        <div className="cu-card">
          <span className="cu-card__title">Basic Information</span>

          {/* Profile Picture */}
          <div className="cu-field">
            <label className="cu-label">Profile Picture</label>
            <div className="cu-pfp">
              {form.user_pfp
                ? <img className="cu-pfp__avatar" src={form.user_pfp} alt="avatar" />
                : <div className="cu-pfp__placeholder">
                    {(form.Full_Name?.[0] ?? "N").toUpperCase()}
                  </div>
              }
              <div>
                <button className="cu-pfp__upload-btn"
                  onClick={() => document.getElementById("cu-pfp-input").click()}>
                  ⬆ Click to upload new photo
                  <span className="cu-pfp__hint">JPG, PNG up to 2MB</span>
                </button>
                <input id="cu-pfp-input" type="file" accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) onChange("user_pfp", URL.createObjectURL(file));
                  }} />
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="cu-field">
            <label className="cu-label">Full Name</label>
            <input className={`cu-input${errors.Full_Name ? " cu-input--error" : ""}`}
              value={form.Full_Name}
              onChange={e => onChange("Full_Name", e.target.value)}
              placeholder="Nayerah Al-Mansouri" />
            {errors.Full_Name && <span className="cu-input-error-msg">{errors.Full_Name}</span>}
          </div>

          {/* Email + Phone row */}
          <div className="cu-field--row">
            <div className="cu-field">
              <label className="cu-label">Email Address</label>
              <input className={`cu-input${errors.email ? " cu-input--error" : ""}`}
                value={form.email}
                onChange={e => onChange("email", e.target.value)}
                placeholder="name@example.com" type="email" />
              {errors.email && <span className="cu-input-error-msg">{errors.email}</span>}
            </div>
            <div className="cu-field">
              <label className="cu-label">Phone Number</label>
              <input className="cu-input"
                value={form.phone}
                onChange={e => onChange("phone", e.target.value)}
                placeholder="+971 50 123 4567" />
            </div>
          </div>

          {/* Location */}
          <div className="cu-field">
            <label className="cu-label">📍 Location</label>
            <input className="cu-input"
              value={form.Location}
              onChange={e => onChange("Location", e.target.value)}
              placeholder="Dubai, UAE" />
          </div>

          {/* Bio */}
          <div className="cu-field">
            <label className="cu-label">Bio</label>
            <textarea className="cu-textarea"
              value={form.Bio}
              onChange={e => onChange("Bio", e.target.value)}
              placeholder="Tell us about yourself..." />
          </div>

          {/* User Role */}
          <div className="cu-field">
            <label className="cu-label">User Role</label>
            <select className="cu-select"
              value={form["User Role"]}
              onChange={e => onChange("User Role", e.target.value)}>
              <option value="">Select role…</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Mentor">Mentor</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>
        </div>

        {/* Password & Security */}
        <div className="cu-card">
          <span className="cu-card__title">Password & Security</span>
          <div className="cu-field">
            <label className="cu-label">New Password</label>
            <input className="cu-input" type="password"
              value={form.password}
              onChange={e => onChange("password", e.target.value)}
              placeholder="Leave blank to keep current password" />
          </div>
          <div className="cu-field">
            <label className="cu-label">Confirm Password</label>
            <input className={`cu-input${errors.confirmPassword ? " cu-input--error" : ""}`}
              type="password"
              value={form.confirmPassword}
              onChange={e => onChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password" />
            {errors.confirmPassword && (
              <span className="cu-input-error-msg">{errors.confirmPassword}</span>
            )}
          </div>
          <button className="cu-btn-reset">Send Password Reset Email</button>
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
          userName={form.Full_Name}
          onSuspend={onSuspend}
          onDelete={onDelete}
          deleting={deleting}
        />
      </div>

    </div>
  );
}