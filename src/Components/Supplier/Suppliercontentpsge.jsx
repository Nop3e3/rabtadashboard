// SuppliersPage.jsx

import { useState, useEffect, useMemo } from "react";
import "./Supplier.css";

import { supabase } from "../../Pages/Supabase.jsx";

import ok    from "../../Assets/ok.svg";
import box   from "../../Assets/box.svg";
import clock from "../../Assets/clock.svg";

import StatCard          from "./LStatcard.jsx";
import SearchBar         from "./Searchbar.jsx";
import SuppliersTable    from "./Supplierstable.jsx";
import SupplierEditModal from "./Suppliereditmodal.jsx";

const TABLE = "Supplier Detail Page eng";

const mapRow = row => ({
  id:       row.id,
  name:     row["supplier's_name"]         ?? "—",
  orders:   row["supplier's_review_count"] ?? 0,
  category: row["Capabilities1"]           ?? "—",
  location: row["Lead Time"]               ?? "—",
  rating:   row.rating1                    ?? null,
  status:   "Verified",
  _raw:     row,
});

export default function SuppliersPage() {
  const [suppliers,    setSuppliers]    = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [query,        setQuery]        = useState("");
  const [editSupplier, setEditSupplier] = useState(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error: fetchErr } = await supabase
        .from(TABLE)
        .select("*")
        .order("id", { ascending: true });

      if (fetchErr) {
        console.error("❌ Fetch error:", fetchErr.message);
        setError(fetchErr.message);
      } else {
        setSuppliers(data.map(mapRow));
      }
      setLoading(false);
    };
    load();
  }, []);

  // ── Search ────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return suppliers;
    return suppliers.filter(s =>
      s.name.toLowerCase().includes(q)     ||
      s.category.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  }, [suppliers, query]);

  // ── Counts ────────────────────────────────────────────────────────────────
  const activeCount   = suppliers.length;
  const verifiedCount = suppliers.filter(s => s.status === "Verified").length;
  const pendingCount  = suppliers.filter(s => s.status === "Pending").length;

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleEdit    = s => setEditSupplier(s);
  const handleView    = s => alert(`Viewing: ${s.name}`);
  const handleApprove = s => setSuppliers(prev =>
    prev.map(x => x.id === s.id ? { ...x, status: "Verified" } : x)
  );
  const handleReject  = s => setSuppliers(prev =>
    prev.map(x => x.id === s.id ? { ...x, status: "Rejected" } : x)
  );

  // Update row in local state after save
  const handleSaved = updated => {
    setSuppliers(prev =>
      prev.map(x => x.id === updated.id ? mapRow(updated._raw) : x)
    );
  };

  // Remove row from local state after delete
  const handleDeleted = id => {
    setSuppliers(prev => prev.filter(x => x.id !== id));
  };

  if (loading) return <div className="suppliers-page"><p className="suppliers-page__loading">Loading suppliers…</p></div>;
  if (error)   return <div className="suppliers-page"><p className="suppliers-page__error">❌ {error}</p></div>;

  return (
    <>
      <div className="suppliers-page">

        <div className="stats-row">
          <StatCard icon={box}   label="Active Suppliers"   count={activeCount}   variant="green" />
          <StatCard icon={ok}    label="Verified Suppliers"  count={verifiedCount} variant="blue"  />
          <StatCard icon={clock} label="Pending"             count={pendingCount}  variant="olive" />
        </div>

        <SearchBar value={query} onChange={setQuery} placeholder="Search ..." />

        <SuppliersTable
          suppliers={filtered}
          onView={handleView}
          onEdit={handleEdit}
          onApprove={handleApprove}
          onReject={handleReject}
        />

      </div>

      {editSupplier && (
        <SupplierEditModal
          supplier={editSupplier}
          onClose={() => setEditSupplier(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}