// MentorCard.jsx
// Props:
//   mentor  { name, specialty, avatar, verified, rating, sessions }

export default function MentorCard({ mentor }) {
  return (
    <div className="mentor-card">

      {/* Avatar + name + specialty */}
      <div className="mentor-card__top">
        {mentor.avatar
          ? <img className="mentor-card__avatar" src={mentor.avatar} alt={mentor.name} />
          : <div className="mentor-card__avatar-placeholder">👤</div>
        }
        <div className="mentor-card__info">
          <div className="mentor-card__name">{mentor.name}</div>
          <div className="mentor-card__specialty">{mentor.specialty}</div>
        </div>
      </div>

      {/* Verified badge */}
      {mentor.verified && (
        <div className="mentor-card__badge">
          <span className="mentor-card__badge-icon">🎓</span>
          Verified Mentor
        </div>
      )}

      {/* Rating + sessions */}
      <div className="mentor-card__footer">
        <div className="mentor-card__rating">
          <span className="mentor-card__star">★</span>
          {mentor.rating}
        </div>
        <div className="mentor-card__sessions">{mentor.sessions} sessions</div>
      </div>

    </div>
  );
}