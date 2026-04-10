// PeerSessionsSection.jsx
// Props:
//   sessions   [{category, title, host, participants}]
//   onEdit     fn(session)
//   onCancel   fn(session)  — optional

import PeerSessionRow from "./Peersessionrow.jsx";

export default function PeerSessionsSection({ sessions, onEdit, onCancel }) {
  return (
    <div className="cm-section">
      <div className="cm-section__hd">
        <span className="cm-section__title">Upcoming Peer Sessions</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sessions.map((s, i) => (
          <PeerSessionRow
            key={s.title + i}
            session={s}
            onEdit={onEdit}
            onCancel={onCancel}
          />
        ))}
      </div>
    </div>
  );
}