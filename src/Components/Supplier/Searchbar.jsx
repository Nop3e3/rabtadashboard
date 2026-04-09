// SearchBar.jsx
// Props: value, onChange, placeholder
import mic from "../../Assets/mic.svg";
import Search from "../../Assets/search.svg";
export default function SearchBar({ value, onChange, placeholder = "Search ..." }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon"><img src={Search} alt="" /></span>
      <input
        className="search-bar__input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-bar__mic"><img src={mic} alt="" /></span>
    </div>
  );
}