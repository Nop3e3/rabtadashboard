// Learninghubcms.jsx
// Place in: src/Components/Forms comp/Formpages/

import { useState, useRef, useEffect } from "react";
import "../Form.css";

import { supabase }           from "../../../Pages/Supabase.jsx";
import LanguageToggleSection  from "../Languagetogglesection .jsx";
import DynamicListSection     from "../Dynamiclistsection.jsx";
import UpcomingSessionSection from "../Upcomingsessionsection.jsx";
import FeaturedMentorsSection from "../Featuredmentorssection.jsx";
import FormFooter             from "../Formfooter.jsx";

const TABLE = "find a mentor";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

const TAG_OPTIONS          = ["Business", "Health", "Tech", "Finance", "Design", "Marketing"];
const VERIFICATION_OPTIONS = ["verified", "Pending", "Unverified"];
const RATING_OPTIONS       = ["1", "2", "3", "4", "5"];

const EMPTY = {
  filter1:                        "",
  filters2:                       "",
  filters3:                       "",
  filters4:                       "",
  filters5:                       "",
  filters6:                       "",
  filter_pop_up_tags:             "",
  Tag1:                           "",
  Tag2:                           "",
  Upcoming_session_topic:         "",
  Mentors_name:                   "",
  Time:                           null,
  Featured_mentors1:              "",
  "Number_ of_clients1":          null,
  featured_mentors_verification1: "",
};

export default function Learninghubform() {
  const [lang,    setLang]    = useState("en");
  const [toast,   setToast]   = useState(null);
  const [loading, setLoading] = useState(false);

  const isAr = lang === "ar";
  const data = useRef({ ...EMPTY });

  // ── Save → INSERT new row (DB auto-generates id) ──────────────────────────
  const handleSave = async () => {
    setLoading(true);
    const d = data.current;

    // Time must be ISO string or null
    let timeValue = null;
    if (d.Time) {
      const parsed = new Date(d.Time);
      timeValue = isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }

    // No id — apostrophe columns excluded — DB fills defaults for the rest
    const payload = {
      filter1:                        d.filter1                        || null,
      filters2:                       d.filters2                       || null,
      filters3:                       d.filters3                       || null,
      filters4:                       d.filters4                       || null,
      filters5:                       d.filters5                       || null,
      filters6:                       d.filters6                       || null,
      filter_pop_up_tags:             d.filter_pop_up_tags             || null,
      Tag1:                           d.Tag1                           || null,
      Tag2:                           d.Tag2                           || null,
      Upcoming_session_topic:         d.Upcoming_session_topic         || null,
      Mentors_name:                   d.Mentors_name                   || null,
      Time:                           timeValue,
      Featured_mentors1:              d.Featured_mentors1              || null,
      "Number_ of_clients1":          d["Number_ of_clients1"]
                                        ? Number(d["Number_ of_clients1"])
                                        : null,
      featured_mentors_verification1: d.featured_mentors_verification1 || null,
    };

    console.log("💾 Inserting new row:", payload);

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

    // Reset form to blank after successful insert
    data.current = { ...EMPTY };

    setToast(`✓ Row added (id: ${res[0]?.id})`);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Cancel → clear form ───────────────────────────────────────────────────
  const handleCancel = () => {
    data.current = { ...EMPTY };
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

        {/* 2 · Filters */}
        <DynamicListSection
          sectionTitle={isAr    ? "الفلاتر"        : "filters"}
          addBtnLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          addRowLabel={isAr     ? "إضافة فلتر"     : "Add filter"}
          itemPlaceholder={isAr ? "أضف فلتر..."    : "Add filter"}
          emptyText={isAr       ? "لا توجد فلاتر." : "No filters yet."}
          defaultItems={[""]}
          onCommit={items => {
            data.current.filter1  = items[0] ?? "";
            data.current.filters2 = items[1] ?? "";
            data.current.filters3 = items[2] ?? "";
            data.current.filters4 = items[3] ?? "";
            data.current.filters5 = items[4] ?? "";
            data.current.filters6 = items[5] ?? "";
          }}
          externalError={null}
        />

        {/* 3 · Tags */}
        <DynamicListSection
          sectionTitle={isAr    ? "العلامات"         : "Tags"}
          addBtnLabel={isAr     ? "إضافة علامة"      : "Add filter"}
          addRowLabel={isAr     ? "إضافة علامات"     : "Add tags"}
          itemPlaceholder={isAr ? "أضف علامة..."     : "Add Tags"}
          emptyText={isAr       ? "لا توجد علامات." : "No tags yet."}
          defaultItems={[""]}
          onCommit={items => {
            data.current.filter_pop_up_tags = items[0] ?? "";
            data.current.Tag1               = items[1] ?? "";
            data.current.Tag2               = items[2] ?? "";
          }}
          externalError={null}
        />

        {/* 4 · Upcoming Session */}
        <UpcomingSessionSection
          sectionTitle={isAr      ? "الجلسات القادمة" : "Upcoming session"}
          addBtnLabel={isAr       ? "إضافة جلسة"      : "Add Upcoming session"}
          addRowLabel={isAr       ? "إضافة جلسة"      : "Add Upcoming session"}
          emptyText={isAr         ? "لا توجد جلسات."  : "No sessions yet."}
          topicPlaceholder={isAr  ? "موضوع الجلسة"    : "Upcoming session topic"}
          timePlaceholder={isAr   ? "الوقت"            : "Time"}
          mentorPlaceholder={isAr ? "اسم المرشد"       : "Mentors name"}
          specPlaceholder={isAr   ? "تخصص المرشد"      : "Mentor's specialization"}
          tagLabel={isAr          ? "التقييم"           : "Tag"}
          tagOptions={RATING_OPTIONS}
          verificationLabel={isAr ? "التحقق"            : "Verification"}
          verificationOptions={VERIFICATION_OPTIONS}
          defaultItems={[]}
          onCommit={items => {
            const s = items[0] ?? {};
            data.current.Upcoming_session_topic = s.topic  ?? "";
            data.current.Mentors_name           = s.mentor ?? "";
            data.current.Time                   = s.time   ?? null;
          }}
          externalError={null}
        />

        {/* 5 · Featured Mentors */}
        <FeaturedMentorsSection
          sectionTitle={isAr       ? "المرشدون المميزون" : "Featured mentors"}
          addBtnLabel={isAr        ? "إضافة مرشد"        : "Add Upcoming session"}
          addRowLabel={isAr        ? "إضافة مرشد"        : "Add Upcoming session"}
          emptyText={isAr          ? "لا يوجد مرشدون."   : "No mentors yet."}
          mentorPlaceholder={isAr  ? "اسم المرشد"         : "Mentors name"}
          specPlaceholder={isAr    ? "تخصص المرشد"        : "Mentor's specialization"}
          clientsPlaceholder={isAr ? "عدد العملاء"        : "Number of clients"}
          tagLabel={isAr           ? "العلامة"             : "Tag"}
          tagOptions={TAG_OPTIONS}
          verificationLabel={isAr  ? "التحقق"              : "Verification"}
          verificationOptions={VERIFICATION_OPTIONS}
          ratingLabel={isAr        ? "التقييم"             : "Rating number"}
          ratingOptions={RATING_OPTIONS}
          defaultItems={[]}
          onCommit={items => {
            const m = items[0] ?? {};
            data.current.Featured_mentors1              = m.mentor       ?? "";
            data.current.featured_mentors_verification1 = m.verification ?? "";
            data.current["Number_ of_clients1"]         = m.clients      ?? null;
          }}
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