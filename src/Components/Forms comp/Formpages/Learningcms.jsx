// LearningProgressEditorPage.jsx
// Place in: src/Components/Forms comp/Formpages/

import { useState, useRef } from "react";
import "../Form.css";

import { supabase }          from "../../../Pages/Supabase.jsx";
import LanguageToggleSection from "../Languagetogglesection .jsx";
import GreetingSection       from "../Greetingsection.jsx";
import FormFooter            from "../Formfooter.jsx";

const TABLE = "learning_hub";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

export default function LearningProgressEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);
  const [loading,    setLoading]    = useState(false);

  const isAr = lang === "ar";

  const data = useRef({
    "Course Name":  "",
    Level:          "",
    Rating:         "",
    Path:           "",
    Duration:       "",
    "Success %":    "",
    Provider:       "",
    image:          "",
    provider_logo:  "",
    Module:         "",
  });

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!data.current["Course Name"]?.trim())
      e.courseName = isAr ? "اسم الكورس مطلوب." : "Course name is required.";
    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save → INSERT new row ─────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    const d = data.current;

    const payload = {
      "Course Name": d["Course Name"],
      Level:         d.Level         || null,
      Rating:        d.Rating        || null,
      Path:          d.Path          || null,
      Duration:      d.Duration      || null,
      "Success %":   d["Success %"]  || null,
      Provider:      d.Provider      || null,
      image:         d.image         || null,
      provider_logo: d.provider_logo || null,
      Module:        d.Module        || null,
    };

    console.log("💾 Inserting:", payload);

    const { data: res, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select();

    setLoading(false);

    if (error) {
      console.error("❌ Insert error:", error);
      setToast(`❌ ${error.message}`);
      setTimeout(() => setToast(null), 4000);
      return;
    }

    console.log("✅ Inserted:", res);

    data.current = {
      "Course Name": "", Level: "", Rating: "", Path: "",
      Duration: "", "Success %": "", Provider: "",
      image: "", provider_logo: "", Module: "",
    };
    setPageErrors({});

    setToast(`✓ Course added: "${res[0]?.["Course Name"]}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancel = () => {
    data.current = {
      "Course Name": "", Level: "", Rating: "", Path: "",
      Duration: "", "Success %": "", Provider: "",
      image: "", provider_logo: "", Module: "",
    };
    setPageErrors({});
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

        {/* 2 · Course Name */}
        <GreetingSection
          label={isAr       ? "اسم الكورس"  : "Course Name"}
          placeholder={isAr ? "اسم الكورس"  : "Course name..."}
          maxLength={200}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current["Course Name"] = greeting; }}
          externalError={pageErrors.courseName ?? null}
        />

        {/* 3 · Level */}
        <GreetingSection
          label={isAr       ? "المستوى"      : "Level"}
          placeholder={isAr ? "مثال: مبتدئ"  : "e.g. Beginner"}
          maxLength={50}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Level = greeting; }}
          externalError={null}
        />

        {/* 4 · Rating */}
        <GreetingSection
          label={isAr       ? "التقييم"       : "Rating"}
          placeholder={isAr ? "مثال: ★★★☆☆"  : "e.g. ★★★☆☆"}
          maxLength={20}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Rating = greeting; }}
          externalError={null}
        />

        {/* 5 · Path */}
        <GreetingSection
          label={isAr       ? "المسار"         : "Path"}
          placeholder={isAr ? "/screen/course"  : "/screen/course"}
          maxLength={300}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Path = greeting; }}
          externalError={null}
        />

        {/* 6 · Duration */}
        <GreetingSection
          label={isAr       ? "المدة"           : "Duration"}
          placeholder={isAr ? "مثال: 18 ساعة"   : "e.g. 18 hours"}
          maxLength={50}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Duration = greeting; }}
          externalError={null}
        />

        {/* 7 · Success % */}
        <GreetingSection
          label={isAr       ? "نسبة النجاح"  : "Success %"}
          placeholder={isAr ? "مثال: 85%"    : "e.g. 85%"}
          maxLength={20}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current["Success %"] = greeting; }}
          externalError={null}
        />

        {/* 8 · Provider */}
        <GreetingSection
          label={isAr       ? "المزود"        : "Provider"}
          placeholder={isAr ? "مثال: Google"  : "e.g. Google"}
          maxLength={100}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Provider = greeting; }}
          externalError={null}
        />

        {/* 9 · Provider Logo URL */}
        <GreetingSection
          label={isAr       ? "رابط شعار المزود"  : "Provider Logo URL"}
          placeholder="https://..."
          maxLength={500}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current.provider_logo = greeting; }}
          externalError={null}
        />

        {/* 10 · Module */}
        <GreetingSection
          label={isAr       ? "الوحدات"        : "Module"}
          placeholder={isAr ? "مثال: 6 دروس"   : "e.g. 6 lessons"}
          maxLength={100}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.Module = greeting; }}
          externalError={null}
        />

        {/* 11 · Course Image URL */}
        <GreetingSection
          label={isAr       ? "رابط صورة الكورس"  : "Course Image URL"}
          placeholder="https://..."
          maxLength={500}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current.image = greeting; }}
          externalError={null}
        />

        {/* 12 · Footer */}
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