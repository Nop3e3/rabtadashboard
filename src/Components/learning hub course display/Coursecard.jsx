// CourseCard.jsx

export default function CourseCard({ course, onView, onEdit }) {
  const level = (course.level ?? "").toLowerCase();

  // Normalize any level value to a CSS class
  // easy/beginner → green, intermediate → amber, advanced → purple, expert → red
  const levelClass = () => {
    if (["easy", "beginner"].includes(level))         return "course-badge--level-beginner";
    if (["intermediate", "medium"].includes(level))   return "course-badge--level-intermediate";
    if (["advanced", "hard"].includes(level))         return "course-badge--level-advanced";
    if (["expert", "master"].includes(level))         return "course-badge--level-expert";
    return "course-badge--level-beginner"; // fallback to green
  };

  return (
    <div className="course-card">

      {/* Path + Level badges */}
      <div className="course-card__badges">
        {course.path && (
          <span className="course-badge">{course.path}</span>
        )}
        {course.level && (
          <span className={`course-badge ${levelClass()}`}>
            {course.level}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="course-card__title">{course.name}</h3>

      {/* Meta */}
      <div className="course-card__meta">
        {course.lessons && (
          <span className="course-card__meta-item">
            <span className="course-card__meta-icon">📖</span>
            {course.lessons}
          </span>
        )}
        {course.duration && (
          <span className="course-card__meta-item">
            <span className="course-card__meta-icon">🕐</span>
            {course.duration}
          </span>
        )}
        {course.students && (
          <span className="course-card__meta-item">
            <span className="course-card__meta-icon">👥</span>
            {course.students}
          </span>
        )}
      </div>

      {/* Completion Rate */}
      {course.completion != null && (
        <div className="course-card__progress">
          <div className="course-card__progress-row">
            <span className="course-card__progress-label">Completion Rate</span>
            <span className="course-card__progress-pct">{course.completion}%</span>
          </div>
          <div className="course-card__progress-track">
            <div
              className="course-card__progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, course.completion))}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="course-card__actions">
        <button className="course-card__btn-view" onClick={() => onView?.(course)}>
          View Course
          <span>›</span>
        </button>
        <button className="course-card__btn-edit" onClick={() => onEdit?.(course)}>
          Edit
        </button>
      </div>

    </div>
  );
}