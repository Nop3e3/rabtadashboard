// TopMentorsSection.jsx
// Props:
//   mentors      [{name, specialty, avatar, verified, rating, sessions}]
//   onViewAll    fn()

import MentorCard from "./Mentorcard.jsx";

export default function TopMentorsSection({ mentors, onViewAll }) {
  return (
    <div className="cm-section">
      <div className="cm-section__hd">
        <span className="cm-section__title">Top Mentors</span>
        <button className="cm-section__view-all" onClick={onViewAll}>
          View all
        </button>
      </div>

      <div className="mentors-grid">
        {mentors.map((m, i) => (
          <MentorCard key={m.name + i} mentor={m} />
        ))}
      </div>
    </div>
  );
}