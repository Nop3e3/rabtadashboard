// SearchSectionEditorPage.jsx

import { useState, useRef, useEffect } from "react";
import "../Form.css";

import { supabase }          from "../../../Pages/Supabase.jsx";
import LanguageToggleSection from "../Languagetogglesection .jsx";
import GreetingSection       from "../Greetingsection.jsx";
import DynamicListSection    from "../Dynamiclistsection.jsx";
import FormFooter            from "../Formfooter.jsx";

// ── Table name — has a space and apostrophe so must be quoted in Supabase ────
const TABLE = "supplier's page discovery";
const ROW_ID = 1;

// ── Helper: "a,b,c" ↔ ["a","b","c"] ─────────────────────────────────────────
const toArray  = str  => str ? str.split(",").map(s => s.trim()).filter(Boolean) : [""];
const toString = arr  => arr.filter(Boolean).join(",");

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
    search_text:                         "",
    filter_ships:                        "",
    "tags_inside_the filter_pop_up_box": "",
  });

  // ── Fetch row id=1 on mount ───────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      const { data: row, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id", ROW_ID)
        .single();

      if (error) {
        console.error("❌ Fetch error:", error.message);
        return;
      }

      console.log("✅ Fetched row:", row);

      // Seed draft ref
      data.current = {
        search_text:                         row.search_text                         ?? "",
        filter_ships:                        row.filter_ships                        ?? "",
        "tags_inside_the filter_pop_up_box": row["tags_inside_the filter_pop_up_box"] ?? "",
      };

      setDbRow(row);
    };

    fetchData();
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const d = data.current;
    const e = {};
    if (!d.search_text?.trim())
      e.search = isAr ? "نص البحث مطلوب." : "Search text is required.";
    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save → upsert to Supabase ─────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    const d = data.current;

    const payload = {
      id:                                    ROW_ID,
      search_text:                           d.search_text,
      filter_ships:                          d.filter_ships,
      "tags_inside_the filter_pop_up_box":   d["tags_inside_the filter_pop_up_box"],
    };

    console.log("💾 Saving payload:", payload);

    const { data: res, error } = await supabase
      .from(TABLE)
      .upsert(payload, { onConflict: "id" })
      .select();

    setLoading(false);

    if (error) {
      console.error("❌ Save error:", error);
      setToast(`❌ ${error.message}`);
      setTimeout(() => setToast(null), 4000);
      return;
    }

    console.log("✅ Save result:", res);

    if (res && res.length > 0) setDbRow(res[0]);

    setToast("✓ Saved successfully");
    setTimeout(() => setToast(null), 2500);
  };

  // ── Cancel → reset to last saved DB values ────────────────────────────────
  const handleCancel = () => {
    if (!dbRow) return;
    data.current = {
      search_text:                         dbRow.search_text                         ?? "",
      filter_ships:                        dbRow.filter_ships                        ?? "",
      "tags_inside_the filter_pop_up_box": dbRow["tags_inside_the filter_pop_up_box"] ?? "",
    };
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

        {/* ─────────────────────────────────────────────────────────────────
            2 · Search Text
            DB column: search_text
        ───────────────────────────────────────────────────────────────── */}
        <GreetingSection
          label={isAr       ? "نص البحث" : "Search text"}
          placeholder={isAr ? "بحث..."   : "search..."}
          maxLength={120}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={dbRow?.search_text ?? ""}
          onCommit={({ greeting }) => {
            data.current.search_text = greeting;
          }}
          externalError={pageErrors.search ?? null}
        />

        {/* ─────────────────────────────────────────────────────────────────
            3 · Filters
            DB column: filter_ships
            Stored as comma-separated string, displayed as editable list
        ───────────────────────────────────────────────────────────────── */}
        <DynamicListSection
          sectionTitle={isAr    ? "الفلاتر"        : "Filters"}
          addBtnLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          addRowLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          itemPlaceholder={isAr ? "أضف فلتر..."    : "Add filter"}
          emptyText={isAr       ? "لا توجد فلاتر." : "No filters yet."}
          defaultItems={toArray(dbRow?.filter_ships ?? "")}
          onCommit={items => {
            data.current.filter_ships = toString(items);
          }}
          externalError={pageErrors.filters ?? null}
        />

        {/* ─────────────────────────────────────────────────────────────────
            4 · Tags
            DB column: tags_inside_the filter_pop_up_box
            Stored as comma-separated string, displayed as editable list
        ───────────────────────────────────────────────────────────────── */}
        <DynamicListSection
          sectionTitle={isAr    ? "العلامات"          : "Tags"}
          addBtnLabel={isAr     ? "إضافة علامة"       : "Add filter"}
          addRowLabel={isAr     ? "إضافة علامات"      : "Add tags"}
          itemPlaceholder={isAr ? "أضف علامة..."      : "Add Tags"}
          emptyText={isAr       ? "لا توجد علامات."  : "No tags yet."}
          defaultItems={toArray(dbRow?.["tags_inside_the filter_pop_up_box"] ?? "")}
          onCommit={items => {
            data.current["tags_inside_the filter_pop_up_box"] = toString(items);
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