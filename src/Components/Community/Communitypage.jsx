// CommunityPage.jsx

import { useState, useEffect } from "react";
import "./Community.css";

import { supabase }          from "../../Pages/Supabase.jsx";
import StatsCard             from "../Stats/Statscard.jsx";
import TopMentorsSection     from "./Topmentorssection.jsx";
import PeerSessionsSection   from "./Peersessionssection.jsx";
import ForumActivitySection  from "./Forumactivitysection.jsx";
import ForumEditModal        from "./ForumEditmodal.jsx";

import mentorIcon     from "../../Assets/mentor.svg";
import sessionIcon    from "../../Assets/session.svg";
import forumIcon      from "../../Assets/forum.svg";
import engagementIcon from "../../Assets/engagement.svg";

const MENTOR_TABLE  = "find a mentor";
const FORUM_TABLE   = "community";

// ── Map find a mentor row → mentor shape ──────────────────────────────────
// Apostrophe columns (read-only): Mentor's_specialization, mentor's_pfp,
//   mentor's_Verification, featured_mentor's Rating number1
const mapMentor = row => ({
  name:      row["Mentors_name"]                        ?? "—",
  specialty: row["Mentor's_specialization"]             ?? "",   // apostrophe — read only
  avatar:    row["mentor's_pfp"]                        ?? null, // apostrophe — read only
  verified:  (row["mentor's_Verification"] ?? "")
               .toLowerCase() === "verified",
  rating:    row["featured_mentor's Rating number1"]    ?? "—",  // apostrophe — read only
  sessions:  row["Number_ of_clients1"]                 ?? 0,
  _raw:      row,
});

// ── Map community row → forum post shape ─────────────────────────────────
const mapPost = row => ({
  topic:      row.post_text1       ?? "—",
  author:     row["User's_name"]   ?? row["Groups's_name"] ?? "—",
  replies:    row["Comment_count"] ?? 0,
  views:      row["Like_count"]    ?? 0,
  lastActive: row.date             ?? "—",
  _raw:       row,
});

// ── Static peer sessions (no table for these yet) ─────────────────────────
const STATIC_SESSIONS = [
  { category: "Sourcing", title: "How to Negotiate with Chinese Suppliers", host: "Sara Ahmed",   participants: 24 },
  { category: "Sourcing", title: "Building Brand on Social Media",          host: "Ahmed Khalil", participants: 18 },
];

export default function CommunityPage() {
  const [mentors,    setMentors]    = useState([]);
  const [posts,      setPosts]      = useState([]);
  const [sessions]                  = useState(STATIC_SESSIONS);
  const [loadingM,   setLoadingM]   = useState(true);
  const [loadingF,   setLoadingF]   = useState(true);
  const [editPost,   setEditPost]   = useState(null);

  // ── Fetch mentors ──────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from(MENTOR_TABLE)
        .select("*")
        .limit(3);

      if (error) console.error("❌ Mentor fetch:", error.message);
      else setMentors(data.map(mapMentor));
      setLoadingM(false);
    };
    load();
  }, []);

  // ── Fetch forum posts ──────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from(FORUM_TABLE)
        .select("*")
        .order("id", { ascending: false });

      if (error) console.error("❌ Forum fetch:", error.message);
      else setPosts(data.map(mapPost));
      setLoadingF(false);
    };
    load();
  }, []);

  // ── Forum CRUD handlers ────────────────────────────────────────────────
  const handleEditPost   = post => setEditPost(post);

  const handlePostSaved  = updated => {
    setPosts(prev =>
      prev.map(p => p._raw.id === updated._raw.id ? mapPost(updated._raw) : p)
    );
  };

  const handlePostDeleted = id => {
    setPosts(prev => prev.filter(p => p._raw.id !== id));
  };

  // ── Reactive stat counts ───────────────────────────────────────────────
  const activeMentors  = mentors.length;
  const totalSessions  = sessions.reduce((s, x) => s + x.participants, 0);
  const totalPosts     = posts.length;

  return (
    <>
      <div className="cm-page">

        {/* Stat Cards */}
        <div className="cm-stats-row">
          <StatsCard
            title="Active Mentors"
            value={String(activeMentors)}
            trendPercentage={12}
            trendDirection="positive"
            icon={mentorIcon}
          />
          <StatsCard
            title="Peer Sessions"
            value={String(totalSessions)}
            trendPercentage={8}
            trendDirection="positive"
            icon={sessionIcon}
          />
          <StatsCard
            title="Forum Posts"
            value={String(totalPosts)}
            trendPercentage={15}
            trendDirection="positive"
            icon={forumIcon}
          />
          <StatsCard
            title="Engagement Rate"
            value="82%"
            trendPercentage={15}
            trendDirection="positive"
            icon={engagementIcon}
          />
        </div>

        {/* Top Mentors — from find a mentor table */}
        {!loadingM && (
          <TopMentorsSection
            mentors={mentors}
            onViewAll={() => alert("View all mentors")}
          />
        )}

        {/* Upcoming Peer Sessions — static for now */}
        <PeerSessionsSection
          sessions={sessions}
          onEdit={s => alert(`Editing: ${s.title}`)}
        />

        {/* Forum Activity — from community table */}
        {!loadingF && (
          <ForumActivitySection
            posts={posts}
            onEdit={handleEditPost}
          />
        )}

      </div>

      {/* Forum Edit Modal */}
      {editPost && (
        <ForumEditModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onSaved={handlePostSaved}
          onDeleted={handlePostDeleted}
        />
      )}
    </>
  );
}