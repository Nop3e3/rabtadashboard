// ToolsSection.jsx
// Reusable tools section.
// Props:
//   title   string
//   tools   [{name, desc, uses}]
//   onTool  fn(tool)

import ToolCard from "./Toolcard.jsx";

export default function ToolsSection({ title, tools, onTool }) {
  return (
    <div className="tools-section">
      <h3 className="tools-section__title">{title}</h3>
      <div className="tools-grid">
        {tools.map((t, i) => (
          <ToolCard
            key={t.name + i}
            name={t.name}
            desc={t.desc}
            uses={t.uses}
            onClick={() => onTool?.(t)}
          />
        ))}
      </div>
    </div>
  );
}