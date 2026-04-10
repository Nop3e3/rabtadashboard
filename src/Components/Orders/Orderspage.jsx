// OrdersPage.jsx

import { useState, useMemo } from "react";
import "./Orders.css";

import SearchBar     from "../Supplier/Searchbar.jsx";
import OrderStatCard from "./Orderstatcard.jsx";
import OrdersTable   from "./Orderstable.jsx";

const PAGE_SIZE = 8;

const ALL_ORDERS = [
  { id: "ORD-2024-001", entrepreneur: "Nayerah Al-Mansouri", supplier: "Elite Advanced Textiles Co.", productName: "Premium Cotton Fabric", productSub: "500 meters", amount: "$12,500", status: "Completed",  date: "2024-03-15" },
  { id: "ORD-2024-002", entrepreneur: "Sarah Ahmed",         supplier: "Dubai Fashion Supplies",      productName: "Silk Fabric Roll",       productSub: "300 meters", amount: "$18,000", status: "Pending",    date: "2024-03-16" },
  { id: "ORD-2024-003", entrepreneur: "Layla Hassan",        supplier: "Cairo Textile Hub",           productName: "Wool Blend Material",    productSub: "200 meters", amount: "$8,500",  status: "Processing", date: "2024-03-17" },
  { id: "ORD-2024-004", entrepreneur: "Fatima Al-Zahra",     supplier: "Riyadh Premium Fabrics",      productName: "Linen Fabric",           productSub: "400 meters", amount: "$9,200",  status: "Completed",  date: "2024-03-14" },
  { id: "ORD-2024-005", entrepreneur: "Amina Al-Said",       supplier: "Amman Fashion Materials",     productName: "Polyester Blend",        productSub: "600 meters", amount: "$7,800",  status: "Processing", date: "2024-03-17" },
  { id: "ORD-2024-006", entrepreneur: "Mariam Khaled",       supplier: "Elite Advanced Textiles Co.", productName: "Satin Fabric",           productSub: "250 meters", amount: "$15,600", status: "Completed",  date: "2024-03-13" },
  { id: "ORD-2024-007", entrepreneur: "Zainab Ali",          supplier: "Dubai Fashion Supplies",      productName: "Chiffon Fabric",         productSub: "350 meters", amount: "$11,400", status: "Pending",    date: "2024-03-17" },
  { id: "ORD-2024-008", entrepreneur: "Rania Mohammed",      supplier: "Cairo Textile Hub",           productName: "Velvet Material",        productSub: "180 meters", amount: "$13,200", status: "Cancelled",  date: "2024-03-12" },
  { id: "ORD-2024-009", entrepreneur: "Sara Hassan",         supplier: "Dubai Fashion Supplies",      productName: "Jersey Knit",            productSub: "400 meters", amount: "$6,800",  status: "Completed",  date: "2024-03-11" },
  { id: "ORD-2024-010", entrepreneur: "Hala Nasser",         supplier: "Cairo Textile Hub",           productName: "Denim Fabric",           productSub: "320 meters", amount: "$9,750",  status: "Pending",    date: "2024-03-10" },
  { id: "ORD-2024-011", entrepreneur: "Dina Youssef",        supplier: "Riyadh Premium Fabrics",      productName: "Organza Roll",           productSub: "150 meters", amount: "$5,400",  status: "Completed",  date: "2024-03-09" },
  { id: "ORD-2024-012", entrepreneur: "Mona Farouk",         supplier: "Amman Fashion Materials",     productName: "Tweed Fabric",           productSub: "220 meters", amount: "$11,200", status: "Processing", date: "2024-03-08" },
];

export default function OrdersPage() {
  const [query,      setQuery]      = useState("");
  const [page,       setPage]       = useState(1);
  const [dateFilter, setDateFilter] = useState("last 30 days");
  const [sortField,  setSortField]  = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // ── Filter + search ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_ORDERS.filter(o => {
      const matchSearch = !q ||
        o.id.toLowerCase().includes(q) ||
        o.entrepreneur.toLowerCase().includes(q) ||
        o.supplier.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q);
      const matchStatus = filterStatus === "All" || o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [query, filterStatus]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = q => { setQuery(q); setPage(1); };

  // ── Cycle filter status ───────────────────────────────────────────────────
  const STATUS_CYCLE = ["All", "Completed", "Pending", "Processing", "Cancelled"];
  const cycleFilter  = () => {
    const idx = STATUS_CYCLE.indexOf(filterStatus);
    setFilterStatus(STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]);
    setPage(1);
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalOrders  = ALL_ORDERS.length;
  const inProgress   = ALL_ORDERS.filter(o => o.status === "Processing").length;
  const totalRevenue = ALL_ORDERS.reduce((s, o) => {
    const n = parseFloat(o.amount.replace(/[$,]/g, ""));
    return s + (isNaN(n) ? 0 : n);
  }, 0);
  const processing   = ALL_ORDERS.filter(o => o.status !== "Cancelled").length;
  const completionPct = Math.round(
    ALL_ORDERS.filter(o => o.status === "Completed").length / ALL_ORDERS.length * 100
  );

  const formatRevenue = n => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n.toLocaleString()}`;
  };

  return (
    <div className="ord-page">

      {/* ── Header ── */}
      <div className="ord-header">
        <div className="ord-header__left">
          <h1 className="ord-header__title">Orders & Transactions</h1>
          <p className="ord-header__sub">Manage all orders between entrepreneurs and suppliers</p>
        </div>
        <div className="ord-header__right">
          <button className="ord-btn-filter-date">
            {dateFilter} ∨
          </button>
          <button className="ord-btn-export">⬇ Export Report</button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="ord-stats-row">
        <OrderStatCard
          label="Total Orders"
          icon="🛍"
          value={totalOrders.toLocaleString()}
          sub="↑ +12.5% vs last month"
          subVariant="accent"
        />
        <OrderStatCard
          label="In Progress"
          icon="✅"
          value={String(inProgress)}
          sub="Being handled"
        />
        <OrderStatCard
          label="Total Revenue"
          icon="↗"
          value={formatRevenue(totalRevenue)}
          sub="↑ +18.2% growth"
          subVariant="accent"
        />
        <OrderStatCard
          label="Processing"
          icon="📦"
          value={String(processing)}
          sub={`${completionPct}% completion rate`}
          subVariant="warn"
        />
      </div>

      {/* ── Toolbar ── */}
      <div className="ord-toolbar">
        <div className="ord-search-wrap">
          <SearchBar value={query} onChange={handleSearch} placeholder="Search ..." />
        </div>
        <button className="ord-btn-tool" onClick={() => setSortField(f => f ? null : "date")}>
          ≡ Sort By
        </button>
        <button className="ord-btn-tool" onClick={cycleFilter}>
          ▼ {filterStatus === "All" ? "Filter" : filterStatus}
        </button>
      </div>

      {/* ── Orders Table ── */}
      <OrdersTable
        orders={paginated}
        page={page}
        totalPages={totalPages}
        totalResults={filtered.length}
        pageSize={PAGE_SIZE}
        onPage={p => setPage(p)}
        onView={o => alert(`Viewing order: ${o.id}`)}
      />

    </div>
  );
}