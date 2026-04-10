// FaqItem.jsx
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function FaqItem({ question, views, helpful, onShare }) {
  return (
    <div className="faq-item">
      <div className="faq-item__left">
        <div className="faq-item__question">{question}</div>
        <div className="faq-item__meta">
          <span>{views} views</span>
          <span className="faq-item__dot">•</span>
          <span>{helpful} found helpful</span>
        </div>
      </div>
      <button className="faq-item__share" onClick={onShare} title="Share">
        <IconShare />
      </button>
    </div>
  );
}