// ForumActivitySection.jsx
// Props:
//   posts   [{topic, author, replies, views, lastActive, _raw}]
//   onEdit  fn(post)

import ForumRow from "./Forumrow.jsx";

const COLUMNS = ["Topic", "Author", "Replies", "Views", "Last Active", ""];

export default function ForumActivitySection({ posts, onEdit }) {
  return (
    <div className="cm-section">
      <div className="cm-section__hd">
        <span className="cm-section__title">Forum Activity</span>
      </div>

      <div className="forum-table">
        <div className="forum-table__header">
          {COLUMNS.map((col, i) => (
            <span key={i} className="forum-table__th">{col}</span>
          ))}
        </div>
        {posts.map((p, i) => (
          <ForumRow key={p.topic + i} post={p} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}