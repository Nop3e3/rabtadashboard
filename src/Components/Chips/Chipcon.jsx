// src/components/NavChips/NavChipsContainer.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Chips.css";

// Reusable Chip component
function Chip({ label, to, active }) {
  return (
    <Link
      to={to}
      className={`chip${active ? " chip--active" : ""}`}
    >
      {label}
    </Link>
  );
}

// Default pages
const DEFAULT_PAGES = [
  { label: "Home Screen",          href: "/AppContentHome" },
  { label: "Supplier Discovery",   href: "/supplier-discovery" },
  { label: "Supplier Detail Page", href: "/supplier-detail" },
  { label: "Learning Hub",         href: "/learning-hub" },
  { label: "Analytics",            href: "/analytics" },
  { label: "Settings",             href: "/settings" },
];

export default function NavChipsContainer({ pages = DEFAULT_PAGES }) {
  const scrollRef = useRef(null);
  const location = useLocation();

  const activeIndex = pages.findIndex(p => p.href === location.pathname) ?? 0;

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth + 1;
    setShowPrev(overflowing && el.scrollLeft > 0);
    setShowNext(overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, []);

  const slide = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });

  const arrowStyle = (show) => ({
    opacity:       show ? 1 : 0,
    pointerEvents: show ? "auto" : "none",
    transition:    "opacity 0.2s ease",
  });

  return (
    <div className="nav-chips-container">
      <button
        className="nav-chips-arrow"
        onClick={() => slide(-1)}
        aria-label="Previous"
        style={arrowStyle(showPrev)}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="nav-chips-scroll" ref={scrollRef}>
        {pages.map((page, i) => (
          <Chip
            key={page.href}
            label={page.label}
            to={page.href}
            active={i === activeIndex}
          />
        ))}
      </div>

      <button
        className="nav-chips-arrow"
        onClick={() => slide(1)}
        aria-label="Next"
        style={arrowStyle(showNext)}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}