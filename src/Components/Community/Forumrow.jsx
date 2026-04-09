// ForumRow.jsx
// Props:
//   post    { topic, author, replies, views, lastActive, _raw }
//   onEdit  fn(post)

const truncate = (str, max = 45) =>
  str && str.length > max ? str.slice(0, max).trimEnd() + "…" : str;

export default function ForumRow({ post, onEdit }) {
  return (
    <div className="forum-row">
      <div className="forum-row__topic">{truncate(post.topic)}</div>
      <div className="forum-row__author">{truncate(post.author, 20)}</div>
      <div className="forum-row__replies">
        <span className="forum-row__reply-icon">💬</span>
        {post.replies}
      </div>
      <div className="forum-row__views">{post.views}</div>
      <div className="forum-row__last-active">{post.lastActive}</div>
      <div>
        <button className="btn-action btn-action--edit" onClick={() => onEdit?.(post)}>
          Edit
        </button>
      </div>
    </div>
  );
}