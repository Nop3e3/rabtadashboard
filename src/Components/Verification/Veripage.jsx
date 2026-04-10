// VerificationPage.jsx — fully self-contained

import { useState } from "react";
import "./Veri.css";

import StatsCard from "../Stats/Statscard.jsx";
import clockIcon from "../../Assets/clock.svg";
import badgeIcon from "../../Assets/ok.svg";
import checkIcon from "../../Assets/ok.svg";
import starIcon  from "../../Assets/trophy.svg";

// ── PriorityBadge ─────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const v = (priority ?? "low").toLowerCase();
  return <span className={`priority-badge priority-badge--${v}`}>{priority}</span>;
}

// ── PendingReviewRow ──────────────────────────────────────────────────────
function PendingReviewRow({ review, onReview, onApprove, onReject }) {
  return (
    <div className="pr-row">
      <div className="pr-row__type">{review.type}</div>
      <div className="pr-row__cell">{review.entity}</div>
      <div className="pr-row__cell--muted">{review.submittedBy}</div>
      <div className="pr-row__cell--muted">{review.date}</div>
      <div><PriorityBadge priority={review.priority} /></div>
      <div className="pr-row__actions">
        <button className="pr-btn-review"  onClick={() => onReview?.(review)}>Review</button>
        <span className="pr-dot">·</span>
        <button className="pr-btn-approve" onClick={() => onApprove?.(review)}>Approve</button>
        <span className="pr-dot">·</span>
        <button className="pr-btn-reject"  onClick={() => onReject?.(review)}>Reject</button>
      </div>
    </div>
  );
}

// ── PendingReviewsSection ─────────────────────────────────────────────────
const PR_COLS = ["Type", "Entity", "Submitted By", "Date", "Priority", "Actions"];

function PendingReviewsSection({ reviews, onReview, onApprove, onReject }) {
  return (
    <div className="vt-section">
      <span className="vt-section__title">Pending Reviews</span>
      <div className="pr-table">
        <div className="pr-table__header">
          {PR_COLS.map(c => <span key={c} className="pr-table__th">{c}</span>)}
        </div>
        {reviews.length === 0
          ? <div className="vt-empty">No pending reviews.</div>
          : reviews.map((r, i) => (
              <PendingReviewRow key={r.entity + i} review={r}
                onReview={onReview} onApprove={onApprove} onReject={onReject} />
            ))
        }
      </div>
    </div>
  );
}

// ── BadgeCard ─────────────────────────────────────────────────────────────
function BadgeCard({ badge }) {
  const tier = (badge.tier ?? "bronze").toLowerCase();
  return (
    <div className="badge-card">
      <div className="badge-card__top">
        <div className={`badge-card__icon-wrap badge-card__icon-wrap--${tier}`}>
          {badge.icon ?? "🏅"}
        </div>
        <span className="badge-card__tier">{badge.tier}</span>
      </div>
      <div className="badge-card__name">{badge.name}</div>
      <div className="badge-card__desc">{badge.desc}</div>
      <div className="badge-card__footer">
        <span className="badge-card__issued-label">Issued</span>
        <span className="badge-card__issued-count">{badge.issued}</span>
      </div>
    </div>
  );
}

// ── BadgeSystemSection ────────────────────────────────────────────────────
function BadgeSystemSection({ badges }) {
  return (
    <div className="vt-section">
      <span className="vt-section__title">Badge System</span>
      <div className="badge-grid">
        {badges.map((b, i) => <BadgeCard key={b.name + i} badge={b} />)}
      </div>
    </div>
  );
}

// ── ReputationRow ─────────────────────────────────────────────────────────
function ReputationRow({ entry }) {
  return (
    <div className="rep-row">
      <div className="rep-row__entity">{entry.entity}</div>
      <div><span className="rep-row__type-badge">{entry.type}</span></div>
      <div className="rep-row__score">
        <span className="rep-row__score-dot" />
        {entry.score}
      </div>
      <div className="rep-row__cell">{entry.reviews}</div>
      <div className="rep-row__cell">{entry.responseTime}</div>
      <div className="rep-row__cell">{entry.repeatRate}</div>
    </div>
  );
}

// ── ReputationSection ─────────────────────────────────────────────────────
const REP_COLS = ["Entity", "Type", "Score", "Reviews", "Response Time", "Repeat Rate"];

function ReputationSection({ entries }) {
  return (
    <div className="vt-section">
      <span className="vt-section__title">Top Reputation Scores</span>
      <div className="rep-table">
        <div className="rep-table__header">
          {REP_COLS.map(c => <span key={c} className="rep-table__th">{c}</span>)}
        </div>
        {entries.length === 0
          ? <div className="vt-empty">No reputation data.</div>
          : entries.map((e, i) => <ReputationRow key={e.entity + i} entry={e} />)
        }
      </div>
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────
const INITIAL_REVIEWS = [
  { type: "Supplier Verification", entity: "Eastern Textiles", submittedBy: "Ahmed Khalil",    date: "2026-03-16", priority: "High"   },
  { type: "Badge Request",         entity: "Sara Ahmed",       submittedBy: "Sara Ahmed",      date: "2026-03-15", priority: "Medium" },
  { type: "Mentor Verification",   entity: "Layla Al-Khatib",  submittedBy: "Layla Al-Khatib", date: "2026-03-14", priority: "High"   },
];

const BADGES = [
  { tier: "Bronze",   icon: "🏅", name: "Verified Entrepreneur", desc: "Complete 3 courses",      issued: 420 },
  { tier: "Silver",   icon: "🏅", name: "Sourcing Expert",        desc: "10 successful orders",    issued: 145 },
  { tier: "Gold",     icon: "🏅", name: "Elite Mentor",           desc: "50 mentoring sessions",   issued: 28  },
  { tier: "Platinum", icon: "🏅", name: "Community Leader",       desc: "100 forum contributions", issued: 12  },
];

const REPUTATION = [
  { entity: "Eastern Textiles", type: "Supplier", score: "98/100", reviews: 145, responseTime: "2h", repeatRate: "87%" },
  { entity: "Fatima Al-Hassan", type: "Mentor",   score: "96/100", reviews: 120, responseTime: "4h", repeatRate: "92%" },
  { entity: "Nile Fashion",     type: "Supplier", score: "94/100", reviews: 98,  responseTime: "3h", repeatRate: "78%" },
];

// ── VerificationPage — default export ────────────────────────────────────
export default function VerificationPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const handleApprove = r => setReviews(prev => prev.filter(x => x.entity !== r.entity));
  const handleReject  = r => setReviews(prev => prev.filter(x => x.entity !== r.entity));
  const handleReview  = r => alert(`Reviewing: ${r.type} — ${r.entity}`);

  const pendingCount  = reviews.length;
  const badgesIssued  = BADGES.reduce((s, b) => s + b.issued, 0);
  const verifiedCount = REPUTATION.length;
  const avgRep        = REPUTATION.length
    ? Math.round(REPUTATION.reduce((s, e) => s + parseInt(e.score), 0) / REPUTATION.length)
    : 0;

  return (
    <div className="vt-page">

      <div className="vt-stats-row">
        <StatsCard title="Pending Reviews"   value={String(pendingCount)}  icon={clockIcon} />
        <StatsCard title="Badges Issued"     value={String(badgesIssued)}  icon={badgeIcon} trendPercentage={18} trendDirection="positive" />
        <StatsCard title="Verified Entities" value={String(verifiedCount)} icon={checkIcon} />
        <StatsCard title="Avg Reputation"    value={String(avgRep)}        icon={starIcon}  trendPercentage={3}  trendDirection="positive" />
      </div>

      <PendingReviewsSection
        reviews={reviews}
        onReview={handleReview}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <BadgeSystemSection badges={BADGES} />

      <ReputationSection entries={REPUTATION} />

    </div>
  );
}