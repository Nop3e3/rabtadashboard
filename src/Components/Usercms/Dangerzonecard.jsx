// DangerZoneCard.jsx
// Props:
//   userName   string
//   onSuspend  fn()
//   onDelete   fn()
//   deleting   bool

import { useState } from "react";

export default function DangerZoneCard({ userName, onSuspend, onDelete, deleting }) {
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div className="cu-danger">
      <span className="cu-danger__title">Danger Zone</span>
      <div className="cu-danger__btns">
        <button className="cu-btn-suspend" onClick={onSuspend}>
          Suspend Account
        </button>
        {!confirmDel ? (
          <button className="cu-btn-delete-account" onClick={() => setConfirmDel(true)}>
            🗑 Delete Account
          </button>
        ) : (
          <div className="cu-danger__confirm">
            <p className="cu-danger__confirm-text">
              Permanently delete <strong>{userName}</strong>? This cannot be undone.
            </p>
            <div className="cu-danger__confirm-btns">
              <button className="cu-btn-cancel" onClick={() => setConfirmDel(false)}
                disabled={deleting}>
                Cancel
              </button>
              <button className="cu-btn-delete-account" onClick={onDelete}
                disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}