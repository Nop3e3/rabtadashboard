

export default function PeerSessionRow({ session, onEdit }) {
  return (
    <div className="peer-row">
      <div className="peer-row__left">

        {/* Category badge + video icon */}
        <div className="peer-row__tags">
          <span className="peer-row__category">{session.category}</span>
          <span className="peer-row__video-icon">📹</span>
        </div>

        {/* Title */}
        <div className="peer-row__title">{session.title}</div>

        {/* Host + participants */}
        <div className="peer-row__meta">
          Host: {session.host}
          <span className="peer-row__meta-dot">•</span>
          {session.participants} participants
        </div>

      </div>

      <button className="peer-row__edit" onClick={() => onEdit?.(session)}>
        Edit
      </button>
    </div>
  );
}