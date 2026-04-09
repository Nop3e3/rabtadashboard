// LearningContentPage.jsx
// Place in: src/Components/learning hub course display/

import { useState, useEffect, useMemo } from "react";
import "./Learningcontent.css";

import { supabase }    from "../../Pages/Supabase.jsx";
import StatsCard       from "../Stats/Statscard.jsx";
import CategoryTabs    from "./Categorytabs.jsx";
import CourseGrid      from "./Coursegrid.jsx";
import ToolsSection    from "./Toolssection.jsx";
import CourseEditModal from "./Courseeditmodal.jsx";

// ── SVG icons — update paths to match your Assets folder ─────────────────
import bookIcon   from "../../Assets/book.svg";
import lessonIcon from "../../Assets/lesson.svg";
import usersIcon  from "../../Assets/users.svg";
import trophyIcon from "../../Assets/trophy.svg";

const TABLE = "learning_hub";

// ── Parse "78%" → 78, "6 lessons" → 6 ────────────────────────────────────
const parseNum = str => {
  if (!str) return null;
  const n = parseInt(String(str).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
};

// ── Map DB row → course object ─────────────────────────────────────────────
// Column names match learning_hub exactly (quoted = exact case)
const mapRow = row => ({
  name:       row["Course Name"] ?? "—",
  path:       row["Path"]        ?? "",
  level:      row["Level"]       ?? "",
  lessons:    row["Module"]      ?? "",     // "6 lessons"
  duration:   row["Duration"]    ?? "",
  students:   null,
  completion: parseNum(row["Success %"]),   // "78%" → 78
  rating:     row["Rating"]      ?? null,
  provider:   row["Provider"]    ?? "",
  image:      row["image"]       ?? "",
  _raw:       row,
});

const TOOLS = [
  { name: "Costing Calculator",    desc: "Calculate production costs and margins", uses: 234 },
  { name: "Negotiation Simulator", desc: "Practice negotiation skills with AI",     uses: 156 },
  { name: "Inventory Planner",     desc: "Plan and manage inventory effectively",   uses: 189 },
];

const ALL = "All";

export default function LearningContentPage() {
  const [courses,    setCourses]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [activeTab,  setActiveTab]  = useState(ALL);
  const [editCourse, setEditCourse] = useState(null);

  // ── Fetch all rows ─────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error: fetchErr } = await supabase
        .from(TABLE)
        .select("*");

      if (fetchErr) {
        console.error("❌ Fetch error:", fetchErr.message);
        setError(fetchErr.message);
      } else {
        console.log("✅ Fetched courses:", data);
        setCourses(data.map(mapRow));
      }
      setLoading(false);
    };
    load();
  }, []);

  // ── Category tabs — built from Path values in DB ───────────────────────────
  const categories = useMemo(() => {
    const counts = {};
    courses.forEach(c => {
      const p = c.path || "Other";
      counts[p] = (counts[p] ?? 0) + 1;
    });
    return [
      { name: ALL, count: courses.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, [courses]);

  // ── Filtered courses ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (activeTab === ALL) return courses;
    return courses.filter(c => c.path === activeTab);
  }, [courses, activeTab]);

  // ── Stat values — all derived from actual DB data ──────────────────────────
  const totalCourses    = courses.length;

  const totalLessons    = courses.reduce((sum, c) => {
    return sum + (parseNum(c.lessons) ?? 0);
  }, 0);

  const uniqueStudents  = new Set(
    courses.map(c => c.provider).filter(Boolean)
  ).size;  // using unique providers as proxy for "verified suppliers"

  const avgCompletion   = courses.length
    ? Math.round(
        courses.reduce((s, c) => s + (c.completion ?? 0), 0) / courses.length
      )
    : 0;

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleEdit    = c => setEditCourse(c);
  const handleView    = c => alert(`Viewing: ${c.name}`);

  const handleSaved   = updated => setCourses(prev =>
    prev.map(x => x.name === updated.name ? mapRow(updated._raw) : x)
  );

  const handleDeleted = name => setCourses(prev =>
    prev.filter(x => x.name !== name)
  );

  // ── Loading / error ────────────────────────────────────────────────────────
  if (loading) return (
    <div className="lc-page">
      <p className="lc-state-msg">Loading courses…</p>
    </div>
  );

  if (error) return (
    <div className="lc-page">
      <p className="lc-state-msg lc-state-msg--error">❌ {error}</p>
    </div>
  );

  return (
    <>
      <div className="lc-page">

        {/* ── Stat Cards ────────────────────────────────────────────────────
            title  = card heading
            value  = big number shown on card
            icon   = SVG from Assets
        ──────────────────────────────────────────────────────────────── */}
        <div className="lc-stats-row">
          <StatsCard
            title="Verified Suppliers"
            value={String(totalCourses)}
            icon={bookIcon}
          />
          <StatsCard
            title="Verified Suppliers"
            value={String(totalLessons)}
            icon={lessonIcon}
          />
          <StatsCard
            title="Verified Suppliers"
            value="1,410"
            icon={usersIcon}
          />
          <StatsCard
            title="Verified Suppliers"
            value={`${avgCompletion}%`}
            icon={trophyIcon}
          />
        </div>

        {/* ── Category Tabs ── */}
        <CategoryTabs
          categories={categories}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* ── Course Grid ── */}
        <CourseGrid
          courses={filtered}
          onView={handleView}
          onEdit={handleEdit}
        />

        {/* ── Tools Section ── */}
        <ToolsSection
          title="Interactive Business Tools"
          tools={TOOLS}
          onTool={t => alert(`Opening: ${t.name}`)}
        />

      </div>

      {/* ── Edit Modal ── */}
      {editCourse && (
        <CourseEditModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}








