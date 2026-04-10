// PeerSessionRow.jsx
// Props:
//   session    { category, title, host, participants }
//   onEdit     fn(session)
//   onCancel   fn(session)

export default function PeerSessionRow({ session, onEdit, onCancel }) {
  return (
    <div className="peer-row">
      <div className="peer-row__left">

        <div className="peer-row__tags">
          <span className="peer-row__category">{session.category}</span>
          <span className="peer-row__video-icon">📹</span>
        </div>

        <div className="peer-row__title">{session.title}</div>

        <div className="peer-row__meta">
          Host: {session.host}
          <span className="peer-row__meta-dot">•</span>
          {session.participants} participants
        </div>

      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
        <button className="btn-action btn-action--edit" onClick={() => onEdit?.(session)}>
          Edit
        </button>
        <button className="peer-row__cancel" onClick={() => onCancel?.(session)}>
          Cancel
        </button>
      </div>

    </div>
  );
}