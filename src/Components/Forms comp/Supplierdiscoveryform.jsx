// SearchSectionEditorPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Search screen editor form.
// Reuses all existing section components — only this page file is new.
// Sections:
//   1. Language Toggle
//   2. Search Text      → GreetingSection (reused as a plain text input card)
//   3. Filters          → DynamicListSection
//   4. Tags             → DynamicListSection
//   5. Footer
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import "./Form.css";

import LanguageToggleSection from "./Languagetogglesection .jsx";
import GreetingSection       from "./Greetingsection.jsx";
import DynamicListSection    from "./Dynamiclistsection.jsx";
import FormFooter            from "./Formfooter.jsx";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

export default function SearchSectionEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [dbRow,      setDbRow]      = useState(null);

  const isAr = lang === "ar";

  // Draft ref — sections push edits here via onCommit
  const data = useRef({
    search_text:    "",
    search_text_ar: "",
    filters:        [],
    filters_ar:     [],
    tags:           [],
    tags_ar:        [],
  });

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const d = data.current;
    const e = {};
    const key = isAr ? "search_text_ar" : "search_text";
    if (!d[key]?.trim())
      e.search = isAr ? "نص البحث مطلوب." : "Search text is required.";
    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    // Supabase wiring goes here — you'll provide the table next
    console.log("💾 Saving:", data.current);
    setLoading(false);
    setToast("✓ Saved successfully");
    setTimeout(() => setToast(null), 2500);
  };

  // ── Cancel ────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    if (!dbRow) return;
    data.current = { ...dbRow };
    setPageErrors({});
    setDbRow({ ...dbRow });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="pw" dir={isAr ? "rtl" : "ltr"}>

        {/* 1 · Language Toggle */}
        <LanguageToggleSection
          eyebrow="Editing Language"
          options={LANG_OPTIONS}
          value={lang}
          onChange={setLang}
        />

        {/* 2 · Search Text */}
        <GreetingSection
          label={isAr       ? "نص البحث" : "Search text"}
          placeholder={isAr ? "بحث..."   : "search..."}
          maxLength={120}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={
            isAr
              ? (dbRow?.search_text_ar ?? "")
              : (dbRow?.search_text    ?? "")
          }
          onCommit={({ greeting }) => {
            if (isAr) data.current.search_text_ar = greeting;
            else      data.current.search_text    = greeting;
          }}
          externalError={pageErrors.search ?? null}
        />

        {/* 3 · Filters */}
        <DynamicListSection
          sectionTitle={isAr    ? "الفلاتر"        : "Filters"}
          addBtnLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          addRowLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          itemPlaceholder={isAr ? "أضف فلتر..."    : "Add filter"}
          emptyText={isAr       ? "لا توجد فلاتر." : "No filters yet."}
          defaultItems={
            isAr
              ? (dbRow?.filters_ar ?? [""])
              : (dbRow?.filters    ?? [""])
          }
          onCommit={items => {
            if (isAr) data.current.filters_ar = items;
            else      data.current.filters    = items;
          }}
          externalError={pageErrors.filters ?? null}
        />

        {/* 4 · Tags */}
        <DynamicListSection
          sectionTitle={isAr    ? "العلامات"         : "Tags"}
          addBtnLabel={isAr     ? "إضافة علامة"      : "Add filter"}
          addRowLabel={isAr     ? "إضافة علامات"     : "Add tags"}
          itemPlaceholder={isAr ? "أضف علامة..."     : "Add Tags"}
          emptyText={isAr       ? "لا توجد علامات." : "No tags yet."}
          defaultItems={
            isAr
              ? (dbRow?.tags_ar ?? [""])
              : (dbRow?.tags    ?? [""])
          }
          onCommit={items => {
            if (isAr) data.current.tags_ar = items;
            else      data.current.tags    = items;
          }}
          externalError={pageErrors.tags ?? null}
        />

        {/* 5 · Footer */}
        <FormFooter
          cancelLabel={isAr ? "إلغاء"     : "Cancel"}
          saveLabel={loading
            ? (isAr ? "جارٍ الحفظ…" : "Saving…")
            : (isAr ? "حفظ القسم"   : "Save Section")}
          onCancel={handleCancel}
          onSave={handleSave}
        />

      </div>

      {toast && (
        <div
          className="toast"
          style={toast.startsWith("❌") ? { background: "var(--red)" } : {}}
        >
          {toast}
        </div>
      )}
    </>
  );
}