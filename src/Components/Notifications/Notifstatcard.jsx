// NotifCard.jsx

import { useState } from "react";
import NotifStatusBadge from "./Notifstatusbadge.jsx";

const IconEdit = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconUsers = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconRead = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function NotifCard({ notif, onEdit, onDelete }) {
  const [confirmDel, setConfirmDel] = useState(false);

  // ── Guard: if notif is undefined/null render nothing ──────────────────────
  if (!notif) return null;

  const hasRead = notif.readCount != null && notif.totalCount != null && notif.totalCount > 0;
  const readPct = hasRead
    ? Math.round((notif.readCount / notif.totalCount) * 100)
    : null;

  return (
    <div className="notif-card">

      {/* Top row */}
      <div className="notif-card__top">
        <div className={`notif-card__icon-wrap notif-card__icon-wrap--${notif.iconVariant ?? "green"}`}>
          {notif.icon}
        </div>

        <div className="notif-card__main">
          <div className="notif-card__title">{notif.title}</div>
          <div className="notif-card__body">{notif.body}</div>
        </div>

        <div className="notif-card__right">
          <NotifStatusBadge status={notif.status} />
          <button className="notif-card__action-btn" onClick={() => onEdit?.(notif)} title="Edit">
            <IconEdit />
          </button>
          <button
            className="notif-card__action-btn notif-card__action-btn--del"
            onClick={() => setConfirmDel(true)}
            title="Delete"
          >
            <IconTrash />
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="notif-card__meta">
        {notif.audience && (
          <span className="notif-card__meta-item">
            <span className="notif-card__meta-icon"><IconUsers /></span>
            {notif.audience}
          </span>
        )}
        {notif.time && (
          <span className="notif-card__meta-item">
            <span className="notif-card__meta-icon"><IconClock /></span>
            {notif.time}
          </span>
        )}
        {hasRead && (
          <span className="notif-card__meta-item">
            <span className="notif-card__meta-icon"><IconRead /></span>
            {notif.readCount} / {notif.totalCount} read ({readPct}%)
          </span>
        )}
      </div>

      {/* Progress bar */}
      {hasRead && (
        <div className="notif-card__progress-track">
          <div className="notif-card__progress-fill" style={{ width: `${readPct}%` }} />
        </div>
      )}

      {/* Delete confirm */}
      {confirmDel && (
        <div className="notif-confirm">
          <span>Delete this notification?</span>
          <div className="notif-confirm__btns">
            <button className="notif-confirm__no" onClick={() => setConfirmDel(false)}>
              Cancel
            </button>
            <button
              className="notif-confirm__yes"
              onClick={() => { onDelete?.(notif.id); setConfirmDel(false); }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      )}

    </div>
  );
}