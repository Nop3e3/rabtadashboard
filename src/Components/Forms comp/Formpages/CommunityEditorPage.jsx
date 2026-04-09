// CommunityEditorPage.jsx
// Place in: src/Components/Forms comp/Formpages/
//
// Apostrophe columns EXCLUDED from payload (PostgREST limitation):
//   "Groups's_name"        → shown in UI, not saved
//   "User's _group_name"   → not in form
//   "User's_name"          → not in form
//   "posting_user's_pfp1"  → not in form
//
// Safe columns saved:
//   groups_pfp, "Groups member count", groupsactivitycount,
//   post_text1, post_text3, post_img1, post_img2, post_img3,
//   "Like_count", "Share_count", "Comment_count", date

import { useState, useRef } from "react";
import "../Form.css";

import { supabase }          from "../../../Pages/Supabase.jsx";
import LanguageToggleSection from "../Languagetogglesection .jsx";
import ReviewsSection        from "../Reviewssection.jsx";
import PortfolioSection      from "../Portfoliosection.jsx";
import GreetingSection       from "../Greetingsection.jsx";
import FormFooter            from "../Formfooter.jsx";

const TABLE = "community";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

const EMPTY = {
  groups_pfp:           "",
  "Groups member count": "",
  groupsactivitycount:  "",
  post_text1:           "",
  post_text3:           "",
  post_img1:            "",
  post_img2:            "",
  post_img3:            "",
  "Like_count":         "",
  "Share_count":        "",
  "Comment_count":      "",
  date:                 "",
};

export default function CommunityEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);
  const [loading,    setLoading]    = useState(false);

  const isAr = lang === "ar";
  const data = useRef({ ...EMPTY });

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    setPageErrors({});
    return true;
  };

  // ── Save → INSERT new row ─────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    const d = data.current;

    const payload = {
      groups_pfp:            d.groups_pfp                           || null,
      "Groups member count": d["Groups member count"]
                               ? Number(d["Groups member count"])
                               : null,
      groupsactivitycount:   d.groupsactivitycount
                               ? Number(d.groupsactivitycount)
                               : null,
      post_text1:            d.post_text1                           || null,
      post_text3:            d.post_text3                           || null,
      post_img1:             d.post_img1                            || null,
      post_img2:             d.post_img2                            || null,
      post_img3:             d.post_img3                            || null,
      "Like_count":          d["Like_count"]
                               ? Number(d["Like_count"])
                               : null,
      "Share_count":         d["Share_count"]
                               ? Number(d["Share_count"])
                               : null,
      "Comment_count":       d["Comment_count"]
                               ? Number(d["Comment_count"])
                               : null,
      date:                  d.date                                 || null,
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

    data.current = { ...EMPTY };
    setPageErrors({});

    setToast(`✓ Row added (id: ${res[0]?.id})`);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Cancel ────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    data.current = { ...EMPTY };
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

        {/* ─────────────────────────────────────────────────────────────────
            2 · Featured Groups
            Reuses: ReviewsSection
            name    → groups_pfp (profile pic URL)
            review  → "Groups member count"
            rating  → groupsactivitycount
        ───────────────────────────────────────────────────────────────── */}
        <ReviewsSection
          sectionTitle={isAr      ? "المجموعات المميزة"      : "Featured Groups"}
          addRowLabel={isAr       ? "إضافة مراجعة"           : "Add Review"}
          nameLabel={isAr         ? "صورة المجموعة (رابط)"   : "Groups's Name"}
          reviewLabel={isAr       ? "عدد الأعضاء"            : "Groups member count"}
          ratingLabel={isAr       ? "عدد النشاطات"           : "Groups Rating"}
          namePlaceholder={isAr   ? "اكتب اسم المجموعة"     : "write  your name"}
          reviewPlaceholder={isAr ? "عدد الأعضاء"            : "write  your review"}
          ratingPlaceholder={isAr ? "التقييم"                : "your rating"}
          defaultItems={[{ name: "", review: "", rating: "" }]}
          onCommit={items => {
            const g = items[0] ?? {};
            data.current.groups_pfp             = g.name   ?? "";
            data.current["Groups member count"] = g.review ?? "";
            data.current.groupsactivitycount    = g.rating ?? "";
          }}
          externalError={null}
        />

        {/* ─────────────────────────────────────────────────────────────────
            3 · Portfolio — post images
            post_img1, post_img2, post_img3
        ───────────────────────────────────────────────────────────────── */}
        <PortfolioSection
          sectionTitle={isAr   ? "معرض الأعمال"                        : "Post"}
          addBtnLabel={isAr    ? "إضافة صورة"                          : "Add Image"}
          uploadPrompt={isAr   ? "انقر للتحميل أو اسحب وأفلت"          : "Click to upload or drag and drop"}
          uploadSub={isAr      ? "PNG، JPG حتى 5 ميغا (1200×630 بكسل)" : "PNG, JPG up to 5MB (recommended: 1200x630px)"}
          defaultImages={[]}
          onCommit={(files, previews) => {
            data.current.post_img1 = previews[0] ?? "";
            data.current.post_img2 = previews[1] ?? "";
            data.current.post_img3 = previews[2] ?? "";
          }}
        />

        {/* ─────────────────────────────────────────────────────────────────
            4 · About Post → post_text1
        ───────────────────────────────────────────────────────────────── */}
        <GreetingSection
          label={isAr       ? "عن المنشور"        : "About post"}
          placeholder={isAr ? "اكتب عن منشورك..." : "about ur post"}
          maxLength={500}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.post_text1 = greeting; }}
          externalError={null}
        />

        {/* 5 · Date → date */}
        <GreetingSection
          label={isAr       ? "التاريخ"           : "Date"}
          placeholder={isAr ? "مثال: 2024-01-01"  : "e.g. 2024-01-01"}
          maxLength={50}
          required={false}
          dir="ltr"
          defaultValue=""
          onCommit={({ greeting }) => { data.current.date = greeting; }}
          externalError={null}
        />

        {/* 6 · Footer */}
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