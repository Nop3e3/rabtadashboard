// components/FormFooter.jsx
// Sticky bottom action bar with Cancel and Save buttons.
// Props:
//   cancelLabel  string
//   saveLabel    string
//   onCancel     fn
//   onSave       fn

export default function FormFooter({ cancelLabel, saveLabel, onCancel, onSave }) {
  return (
    <div className="footer">
      <button className="btn-cancel" onClick={onCancel}>{cancelLabel}</button>
      <button className="btn-save"   onClick={onSave}>{saveLabel}</button>
    </div>
  );
}