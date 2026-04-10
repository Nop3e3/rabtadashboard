// FaqSection.jsx
// Fetches from public.faq table (id, question1, answer1)
// Add New FAQ → modal to insert
// Click existing FAQ → modal to edit/delete

import { useState, useEffect } from "react";
import { supabase } from "../../Pages/Supabase.jsx";

const TABLE = "faq";

// ── Icons ──────────────────────────────────────────────────────────────────
const IconQuestion = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

// ── FAQ Modal (Add + Edit + Delete) ───────────────────────────────────────
function FaqModal({ faq, onClose, onSaved, onDeleted }) {
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question1 ?? "");
  const [answer,   setAnswer]   = useState(faq?.answer1   ?? "");
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [error,    setError]    = useState(null);

  const handleSave = async () => {
    if (!question.trim()) { setError("Question is required."); return; }
    setSaving(true);
    setError(null);

    const payload = { question1: question.trim(), answer1: answer.trim() || null };

    let res, err;
    if (isEdit) {
      ({ data: res, error: err } = await supabase.from(TABLE).update(payload).eq("id", faq.id).select());
    } else {
      ({ data: res, error: err } = await supabase.from(TABLE).insert(payload).select());
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved?.(res[0]);
    onClose();
  };

  const handleDelete = async () => {
    setDeleting(true);
    const { error: err } = await supabase.from(TABLE).delete().eq("id", faq.id);
    setDeleting(false);
    if (err) { setError(err.message); setConfirmDel(false); return; }
    onDeleted?.(faq.id);
    onClose();
  };

  return (
    <div className="faq-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="faq-modal">

        {/* Header */}
        <div className="faq-modal__hd">
          <span className="faq-modal__title">{isEdit ? "Edit FAQ" : "Add New FAQ"}</span>
          <button className="faq-modal__close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="faq-modal__body">
          <div className="faq-modal__field">
            <label className="faq-modal__label">Question</label>
            <input
              className="faq-modal__input"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Enter the question..."
            />
          </div>
          <div className="faq-modal__field">
            <label className="faq-modal__label">Answer</label>
            <textarea
              className="faq-modal__textarea"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Enter the answer..."
              rows={4}
            />
          </div>

          {error && <p className="faq-modal__error">❌ {error}</p>}

          {/* Delete zone — only on edit */}
          {isEdit && (
            <div className="faq-modal__danger">
              <span className="faq-modal__danger-title">Danger Zone</span>
              {!confirmDel ? (
                <button className="faq-modal__btn-delete" onClick={() => setConfirmDel(true)}>
                  🗑 Delete FAQ
                </button>
              ) : (
                <div className="faq-modal__confirm">
                  <p className="faq-modal__confirm-text">
                    Permanently delete this FAQ? Cannot be undone.
                  </p>
                  <div className="faq-modal__confirm-btns">
                    <button className="faq-modal__btn-cancel-sm" onClick={() => setConfirmDel(false)} disabled={deleting}>Cancel</button>
                    <button className="faq-modal__btn-delete-confirm" onClick={handleDelete} disabled={deleting}>
                      {deleting ? "Deleting…" : "Yes, Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="faq-modal__ft">
          <button className="faq-modal__btn-cancel" onClick={onClose}>Cancel</button>
          <button className="faq-modal__btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : (isEdit ? "Save Changes" : "Add FAQ")}
          </button>
        </div>

      </div>
    </div>
  );
}

// ── FAQ Item row ───────────────────────────────────────────────────────────
function FaqItem({ faq, onEdit }) {
  return (
    <div className="faq-item" onClick={() => onEdit(faq)} style={{ cursor: "pointer" }}>
      <div className="faq-item__left">
        <div className="faq-item__question">{faq.question1}</div>
        {faq.answer1 && (
          <div className="faq-item__answer">{faq.answer1}</div>
        )}
      </div>
      <div className="faq-item__actions">
        <button className="faq-item__edit-btn" onClick={e => { e.stopPropagation(); onEdit(faq); }} title="Edit">
          <IconEdit />
        </button>
        <button className="faq-item__share" onClick={e => e.stopPropagation()} title="Share">
          <IconShare />
        </button>
      </div>
    </div>
  );
}

// ── FaqSection ─────────────────────────────────────────────────────────────
export default function FaqSection() {
  const [faqs,       setFaqs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editFaq,    setEditFaq]    = useState(null); // null = add, obj = edit

  // Fetch
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from(TABLE).select("*").order("id", { ascending: true });
      if (!error) setFaqs(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const openAdd  = ()    => { setEditFaq(null);  setModalOpen(true); };
  const openEdit = faq   => { setEditFaq(faq);   setModalOpen(true); };
  const closeModal = ()  => { setModalOpen(false); setEditFaq(null); };

  const handleSaved = saved => {
    setFaqs(prev => {
      const exists = prev.find(f => f.id === saved.id);
      return exists
        ? prev.map(f => f.id === saved.id ? saved : f)
        : [...prev, saved];
    });
  };

  const handleDeleted = id => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <>
      <div className="faq-section">
        <div className="faq-section__hd">
          <div className="faq-section__left">
            <div className="faq-section__icon"><IconQuestion /></div>
            <div>
              <div className="faq-section__title">FAQ Management</div>
              <div className="faq-section__sub">Manage frequently asked questions</div>
            </div>
          </div>
          <button className="faq-btn-add" onClick={openAdd}>Add New FAQ</button>
        </div>

        {loading
          ? <div style={{ padding: "1.5rem", fontSize: 13, color: "var(--text-2)" }}>Loading FAQs…</div>
          : faqs.length === 0
            ? <div style={{ padding: "1.5rem", fontSize: 13, color: "var(--text-3)" }}>No FAQs yet. Add one above.</div>
            : faqs.map(f => <FaqItem key={f.id} faq={f} onEdit={openEdit} />)
        }
      </div>

      {modalOpen && (
        <FaqModal
          faq={editFaq}
          onClose={closeModal}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}