// CategoryTabs.jsx
// Reusable category filter tabs showing name + course count.
// Props:
//   categories  [{name, count}]
//   active      string — active category name
//   onChange    fn(name)

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="cat-tabs">
      {categories.map(cat => (
        <button
          key={cat.name}
          className={`cat-tab${active === cat.name ? " cat-tab--active" : ""}`}
          onClick={() => onChange(cat.name)}
        >
          <span className="cat-tab__name">{cat.name}</span>
          <span className="cat-tab__count">{cat.count} courses</span>
        </button>
      ))}
    </div>
  );
}