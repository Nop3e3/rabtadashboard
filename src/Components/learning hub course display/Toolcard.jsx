// ToolCard.jsx
// Reusable tool card.
// Props:
//   name   string
//   desc   string
//   uses   number
//   onClick fn()

export default function ToolCard({ name, desc, uses, onClick }) {
  return (
    <div className="tool-card" onClick={onClick}>
      <span className="tool-card__name">{name}</span>
      <span className="tool-card__desc">{desc}</span>
      <span className="tool-card__uses">{uses} uses this month</span>
    </div>
  );
}