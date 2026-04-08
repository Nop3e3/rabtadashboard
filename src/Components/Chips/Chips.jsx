import "./Chips.css";
 
export default function Chip({ label, href, active, onClick }) {
  return (
    <a
      href={href}
      className={`chip${active ? " chip--active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {label}
    </a>
  );
}
 