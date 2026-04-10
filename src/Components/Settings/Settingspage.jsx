// SettingsPage.jsx — fully self-contained

import { useState } from "react";
import "./Settings.css";

// ── SVG Icons ─────────────────────────────────────────────────────────────
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconDatabase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const IconPalette = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/>
    <circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5" cy="7.5" r=".5"/>
    <circle cx="6.5" cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// ── Toggle ────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <label className="st-toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="st-toggle__track" />
    </label>
  );
}

// ── Setting Row ───────────────────────────────────────────────────────────
function SettingRow({ label, right }) {
  return (
    <div className="st-row">
      <span className="st-row__label">{label}</span>
      <div className="st-row__right">{right}</div>
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────
function Section({ icon, title, sub, children }) {
  return (
    <div className="st-section">
      <div className="st-section__hd">
        <div className="st-section__icon">{icon}</div>
        <div>
          <div className="st-section__title">{title}</div>
          <div className="st-section__sub">{sub}</div>
        </div>
      </div>
      <div className="st-section__body">{children}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [lang, setLang] = useState("ENG");

  const [notifs, setNotifs] = useState({
    email:     true,
    supplier:  true,
    community: false,
    weekly:    true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginLog:  true,
  });

  const [platform, setPlatform] = useState({
    freemium:      true,
    aiMatching:    true,
    gamification:  true,
    offlineAccess: false,
  });

  const [darkMode, setDarkMode] = useState(true);

  const setN = k => v => setNotifs(p => ({ ...p, [k]: v }));
  const setS = k => v => setSecurity(p => ({ ...p, [k]: v }));
  const setP = k => v => setPlatform(p => ({ ...p, [k]: v }));

  return (
    <div className="st-page">

      {/* Header */}
      <div className="st-header">
        <h1 className="st-header__title">Settings</h1>
        <p className="st-header__sub">Manage system settings and preferences</p>
      </div>

      {/* Language & Localization */}
      <Section icon={<IconGlobe />} title="Language & Localization" sub="Customize language and regional settings">
        <SettingRow
          label="Default Language"
          right={
            <div className="st-lang-toggle">
              <button
                className={`st-lang-btn${lang === "Ar" ? " st-lang-btn--active" : ""}`}
                onClick={() => setLang("Ar")}
              >Ar</button>
              <button
                className={`st-lang-btn${lang === "ENG" ? " st-lang-btn--active" : ""}`}
                onClick={() => setLang("ENG")}
              >ENG</button>
            </div>
          }
        />
        <SettingRow
          label="Text Direction"
          right={
            <span className="st-row__value">
              {lang === "Ar" ? "Right to Left (RTL)" : "Left to Right (LTR)"}
            </span>
          }
        />
      </Section>

      {/* Notifications */}
      <Section icon={<IconBell />} title="Notifications" sub="Manage notification preferences">
        <SettingRow label="Email Notifications"        right={<Toggle checked={notifs.email}     onChange={setN("email")}     />} />
        <SettingRow label="New Supplier Alerts"        right={<Toggle checked={notifs.supplier}  onChange={setN("supplier")}  />} />
        <SettingRow label="Community Activity Alerts"  right={<Toggle checked={notifs.community} onChange={setN("community")} />} />
        <SettingRow label="Weekly Performance Summary" right={<Toggle checked={notifs.weekly}    onChange={setN("weekly")}    />} />
      </Section>

      {/* Security */}
      <Section icon={<IconShield />} title="Security" sub="Security and privacy settings">
        <SettingRow label="Two-Factor Authentication" right={<Toggle checked={security.twoFactor} onChange={setS("twoFactor")} />} />
        <SettingRow label="Login Activity Log"        right={<Toggle checked={security.loginLog}  onChange={setS("loginLog")}  />} />
      </Section>

      {/* Platform Configuration */}
      <Section icon={<IconDatabase />} title="Platform Configuration" sub="Configure platform features">
        <SettingRow label="Enable Freemium Model"  right={<Toggle checked={platform.freemium}      onChange={setP("freemium")}      />} />
        <SettingRow label="AI-Powered Matching"    right={<Toggle checked={platform.aiMatching}    onChange={setP("aiMatching")}    />} />
        <SettingRow label="Gamification & Badges"  right={<Toggle checked={platform.gamification}  onChange={setP("gamification")}  />} />
        <SettingRow label="Offline Access"         right={<Toggle checked={platform.offlineAccess} onChange={setP("offlineAccess")} />} />
      </Section>

      {/* Appearance */}
      <Section icon={<IconPalette />} title="Appearance" sub="Customize dashboard appearance">
        <SettingRow
          label="Mode"
          right={
            <div className="st-mode-toggle">
              <button
                className={`st-mode-btn${!darkMode ? " st-mode-btn--active" : ""}`}
                onClick={() => setDarkMode(false)}
                title="Light mode"
              >
                <IconSun />
              </button>
              <button
                className={`st-mode-btn${darkMode ? " st-mode-btn--active" : ""}`}
                onClick={() => setDarkMode(true)}
                title="Dark mode"
              >
                <IconMoon />
              </button>
            </div>
          }
        />
      </Section>



    </div>
  );
}