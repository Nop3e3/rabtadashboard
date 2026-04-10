// SupportPage.jsx

import { useState, useMemo, useRef, useEffect } from "react";
import "./Support.css";

import SearchBar    from "../Supplier/Searchbar.jsx";
import TicketsTable from "./Ticketstable.jsx";
import FaqSection   from "./Faqsection.jsx";

const PAGE_SIZE = 3;

// ── SVG icons ─────────────────────────────────────────────────────────────
const IconAlert  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconClock  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCheck  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconFilter = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IconSort   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;

// ── Reusable inline Dropdown ──────────────────────────────────────────────
function Dropdown({ icon, label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="sup-dropdown" ref={ref}>
      <button className={`sup-btn-tool${open ? " sup-btn-tool--open" : ""}`} onClick={() => setOpen(o => !o)}>
        {icon} {label}{value && value !== "All" ? `: ${value}` : ""} ∨
      </button>
      {open && (
        <div className="sup-dropdown__menu">
          {options.map(opt => (
            <button key={opt} className={`sup-dropdown__item${value === opt ? " sup-dropdown__item--active" : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {value === opt && <span className="sup-dropdown__check">✓</span>}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Inline stat card ──────────────────────────────────────────────────────
function StatCard({ label, icon, value, sub, subVariant }) {
  return (
    <div className="sup-stat-card">
      <div className="sup-stat-card__top">
        <span className="sup-stat-card__label">{label}</span>
        <div className="sup-stat-card__icon">{icon}</div>
      </div>
      <div className="sup-stat-card__value">{value}</div>
      {sub && <div className={`sup-stat-card__sub${subVariant ? ` sup-stat-card__sub--${subVariant}` : ""}`}>{sub}</div>}
    </div>
  );
}

// ── Static data ───────────────────────────────────────────────────────────
const ALL_TICKETS = [
  { id: "TICK-1247", user: "Nayerah Al-Mansouri", email: "nayerah@example.com", subject: "Unable to connect with supplier",    category: "Technical", priority: "High",   status: "Open",        messages: 3, date: "2024-03-17 12:20 PM" },
  { id: "TICK-1246", user: "Sarah Ahmed",          email: "sarah@example.com",   subject: "Payment processing issue",           category: "Billing",   priority: "Urgent",  status: "In Progress", messages: 5, date: "2024-03-17 12:20 PM" },
  { id: "TICK-1245", user: "Layla Hassan",          email: "layla@example.com",   subject: "Question about verification process",category: "General",   priority: "Normal",  status: "Resolved",    messages: 4, date: "2024-03-17 12:20 PM" },
  { id: "TICK-1244", user: "Fatima Al-Zahra",       email: "fatima@example.com",  subject: "Course not loading correctly",       category: "Technical", priority: "High",   status: "Open",        messages: 2, date: "2024-03-16 10:00 AM" },
  { id: "TICK-1243", user: "Amina Al-Said",          email: "amina@example.com",   subject: "Refund request for cancelled order", category: "Billing",   priority: "Urgent",  status: "In Progress", messages: 6, date: "2024-03-16 09:30 AM" },
  { id: "TICK-1242", user: "Mariam Khaled",          email: "mariam@example.com",  subject: "How to upgrade subscription?",       category: "General",   priority: "Low",    status: "Resolved",    messages: 1, date: "2024-03-15 04:00 PM" },
  { id: "TICK-1241", user: "Zainab Ali",             email: "zainab@example.com",  subject: "Supplier profile not visible",       category: "Technical", priority: "Normal",  status: "Open",        messages: 3, date: "2024-03-15 02:00 PM" },
  { id: "TICK-1240", user: "Rania Mohammed",         email: "rania@example.com",   subject: "Double charge on invoice",           category: "Billing",   priority: "Urgent",  status: "Closed",      messages: 7, date: "2024-03-14 11:00 AM" },
  { id: "TICK-1239", user: "Hala Nasser",            email: "hala@example.com",    subject: "Badge not awarded after course",     category: "General",   priority: "Low",    status: "Resolved",    messages: 2, date: "2024-03-14 09:00 AM" },
];

const FAQS = [
  { question: "How do I verify my supplier account?",    views: 1245, helpful: 892 },
  { question: "What payment methods are accepted?",       views: 987,  helpful: 756 },
  { question: "How long does verification take?",         views: 834,  helpful: 623 },
];

const STATUS_OPTIONS   = ["All", "Open", "In Progress", "Resolved", "Closed"];
const SORT_OPTIONS     = ["Newest First", "Oldest First", "Priority: High", "Priority: Low"];

export default function SupportPage() {
  const [query,        setQuery]        = useState("");
  const [page,         setPage]         = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortLabel,    setSortLabel]    = useState("Newest First");

  // ── Filter + search + sort ────────────────────────────────────────────────
  const processed = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = ALL_TICKETS.filter(t => {
      const matchQ = !q ||
        t.id.toLowerCase().includes(q)       ||
        t.user.toLowerCase().includes(q)     ||
        t.subject.toLowerCase().includes(q)  ||
        t.category.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q);
      const matchS = filterStatus === "All" || t.status === filterStatus;
      return matchQ && matchS;
    });

    if (sortLabel === "Oldest First")    result = [...result].reverse();
    if (sortLabel === "Priority: High")  result = [...result].sort((a, b) => ["Urgent","High","Normal","Low"].indexOf(a.priority) - ["Urgent","High","Normal","Low"].indexOf(b.priority));
    if (sortLabel === "Priority: Low")   result = [...result].sort((a, b) => ["Low","Normal","High","Urgent"].indexOf(a.priority) - ["Low","Normal","High","Urgent"].indexOf(b.priority));

    return result;
  }, [query, filterStatus, sortLabel]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = processed.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openCount     = ALL_TICKETS.filter(t => t.status === "Open").length;
  const inProgCount   = ALL_TICKETS.filter(t => t.status === "In Progress").length;
  const resolvedToday = ALL_TICKETS.filter(t => t.status === "Resolved").length;

  return (
    <div className="sup-page">

      {/* Header */}
      <div>
        <h1 className="sup-header__title">Support & Help Desk</h1>
        <p className="sup-header__sub">Manage customer support tickets and inquiries</p>
      </div>

      {/* Stat Cards */}
      <div className="sup-stats-row">
        <StatCard label="Open Tickets"       icon={<IconAlert />} value={String(openCount)}   sub="Awaiting response"  />
        <StatCard label="In Progress"        icon={<IconClock />} value={String(inProgCount)} sub="Being handled"      />
        <StatCard label="Resolved Today"     icon={<IconCheck />} value={String(resolvedToday)} sub="+8 vs yesterday" subVariant="green" />
        <StatCard label="Avg. Response Time" icon={<IconClock />} value="2.4h"                sub="-18% improvement"  subVariant="red"   />
      </div>

      {/* Toolbar */}
      <div className="sup-toolbar">
        <div className="sup-search-wrap">
          <SearchBar value={query} onChange={q => { setQuery(q); setPage(1); }} placeholder="Search ..." />
        </div>
        <Dropdown icon={<IconSort />}   label="Sort By" options={SORT_OPTIONS}   value={sortLabel}    onChange={v => { setSortLabel(v);    setPage(1); }} />
        <Dropdown icon={<IconFilter />} label="Filter"  options={STATUS_OPTIONS} value={filterStatus} onChange={v => { setFilterStatus(v); setPage(1); }} />
      </div>

      {/* Tickets Table */}
      <TicketsTable
        tickets={paginated}
        page={safePage}
        totalPages={totalPages}
        totalResults={processed.length}
        pageSize={PAGE_SIZE}
        onPage={p => setPage(p)}
        onView={t => alert(`Viewing: ${t.id}`)}
      />

      {/* FAQ Section — self-contained, fetches from Supabase */}
      <FaqSection />

    </div>
  );
}