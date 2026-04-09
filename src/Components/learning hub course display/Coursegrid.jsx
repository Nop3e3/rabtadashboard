// CourseGrid.jsx
// Reusable 2-column grid of CourseCard components.
// Props:
//   courses   array of course objects
//   onView    fn(course)
//   onEdit    fn(course)

import CourseCard from "./Coursecard.jsx";

export default function CourseGrid({ courses, onView, onEdit }) {
  return (
    <div className="course-grid">
      {courses.length === 0
        ? <p className="course-grid__empty">No courses found.</p>
        : courses.map((c, i) => (
            <CourseCard
              key={c.name + i}
              course={c}
              onView={onView}
              onEdit={onEdit}
            />
          ))
      }
    </div>
  );
}