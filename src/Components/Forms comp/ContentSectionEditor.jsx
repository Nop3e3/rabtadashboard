



import { useState, useRef, useEffect } from "react";
import "./Form.css";

import { supabase } from "../../Pages/Supabase.jsx";

import LanguageToggleSection from "./Languagetogglesection .jsx";
import GreetingSection       from "./Greetingsection.jsx";
import UserNameSection       from "./Usernamesection.jsx";
import WalletSection         from "./Walletsection.jsx";
import ContentSection        from "./Contentsection.jsx";
import QuickActionsSection   from "./Quickactionssection.jsx";
import FormFooter            from "./Formfooter.jsx";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

export default function ContentSectionEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [dbRow,      setDbRow]      = useState(null);

  const isAr = lang === "ar";

  const data = useRef({
    greeting_text:          "",
    name:                   "",
    username:               "",
    review_number:          "",
    pfp:                    "",
    rafiqs_advicer:         "",
    quick_actions_title:    "",
    quick_actions_captionn: "",
    quick_actions_image:    "",
    quick_actions_button:   "",
    Path:                   "",
  });

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      const { data: row, error } = await supabase
        .from("home screen eng")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("❌ Fetch error:", error.message);
        return;
      }

      console.log("✅ Fetched row:", row);

      data.current = {
        greeting_text:          row.greeting_text          ?? "",
        name:                   row.name                   ?? "",
        username:               row.username               ?? "",
        review_number:          String(row.review_number   ?? ""),
        pfp:                    row.pfp                    ?? "",
        rafiqs_advicer:         row.rafiqs_advicer         ?? "",
        quick_actions_title:    row.quick_actions_title    ?? "",
        quick_actions_captionn: row.quick_actions_captionn ?? "",
        quick_actions_image:    row.quick_actions_image    ?? "",
        quick_actions_button:   row.quick_actions_button   ?? "",
        Path:                   row.Path                   ?? "",
      };

      setDbRow(row);
    };

    fetchData();
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const d = data.current;
    const e = {};

    if (!d.greeting_text.trim())
      e.greeting = isAr ? "نص التحية مطلوب." : "Greeting text is required.";

    if (!d.name.trim())
      e.userName = isAr ? "الاسم مطلوب." : "Name is required.";

    if (!d.review_number || isNaN(Number(d.review_number)))
      e.balance = isAr ? "الرقم مطلوب." : "Review number is required.";

    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);

    const d = data.current;

    // Build the payload — every column exactly as it is in the DB
    const payload = {
      id:                     1,              // required for upsert to target the right row
      greeting_text:          d.greeting_text,
      name:                   d.name,
      username:               d.username,
      review_number:          Number(d.review_number),
      pfp:                    d.pfp,
      rafiqs_advicer:         d.rafiqs_advicer,
      quick_actions_title:    d.quick_actions_title,
      quick_actions_captionn: d.quick_actions_captionn,
      quick_actions_image:    d.quick_actions_image,
      quick_actions_button:   d.quick_actions_button,
      Path:                   d.Path,
    };

    console.log("💾 Saving payload:", payload);

    // Use upsert instead of update — works even if RLS blocks plain UPDATE
    const { data: res, error } = await supabase
      .from("home screen eng")
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

    // Refresh dbRow so cancel works correctly after save
    if (res && res.length > 0) {
      setDbRow(res[0]);
    }

    setToast("✓ Saved successfully");
    setTimeout(() => setToast(null), 2500);
  };

  // ── Cancel ────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    if (!dbRow) return;
    data.current = {
      greeting_text:          dbRow.greeting_text          ?? "",
      name:                   dbRow.name                   ?? "",
      username:               dbRow.username               ?? "",
      review_number:          String(dbRow.review_number   ?? ""),
      pfp:                    dbRow.pfp                    ?? "",
      rafiqs_advicer:         dbRow.rafiqs_advicer         ?? "",
      quick_actions_title:    dbRow.quick_actions_title    ?? "",
      quick_actions_captionn: dbRow.quick_actions_captionn ?? "",
      quick_actions_image:    dbRow.quick_actions_image    ?? "",
      quick_actions_button:   dbRow.quick_actions_button   ?? "",
      Path:                   dbRow.Path                   ?? "",
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

        {/* 2 · Greeting Text → greeting_text */}
        <GreetingSection
          label={isAr       ? "نص التحية"  : "Greeting Text"}
          placeholder={isAr ? "صباح الخير" : "Welcome back"}
          maxLength={80}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={dbRow?.greeting_text ?? ""}
          onCommit={({ greeting }) => { data.current.greeting_text = greeting; }}
          externalError={pageErrors.greeting ?? null}
        />

        {/* 3 · Name → name  /  Username → username */}
        <UserNameSection
          label={isAr       ? "الاسم"                             : "Name"}
          hint={isAr        ? "الاسم المعروض على الشاشة الرئيسية" : "Name displayed on the home screen"}
          placeholder={isAr ? "نايرة"                             : "Nayerah"}
          maxLength={80}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={dbRow?.name ?? ""}
          onCommit={({ userName }) => { data.current.name = userName; }}
          externalError={pageErrors.userName ?? null}
          extraLabel={isAr      ? "اسم المستخدم" : "Username"}
          extraPlaceholder="@Nayerah.kotn"
          extraMaxLength={60}
          extraDefaultValue={dbRow?.username ?? ""}
          onExtraCommit={v => { data.current.username = v; }}
        />

        {/* 4 · Review Number → review_number  /  PFP → pfp */}
        <WalletSection
          sectionTitle={isAr      ? "الإحصائيات"                         : "Stats"}
          balanceLabel={isAr      ? "عدد المراجعات"                       : "Review Number"}
          balanceHint={isAr       ? "الرقم المعروض بجانب الملف الشخصي"   : "Number shown next to the profile picture"}
          balancePlaceholder="124"
          balanceMin={0}
          balanceMax={999999999}
          iconLabel={isAr         ? "رابط صورة الملف الشخصي"             : "Profile Picture URL"}
          iconHint={isAr          ? "رابط الصورة الشخصية للمستخدم (pfp)" : "URL of the user's profile picture (pfp)"}
          iconPlaceholder="https://..."
          defaultBalance={String(dbRow?.review_number ?? "")}
          defaultIcon={dbRow?.pfp ?? ""}
          onCommit={({ balance, icon }) => {
            data.current.review_number = balance;
            data.current.pfp           = icon;
          }}
          externalError={pageErrors.balance ?? null}
        />

        {/* 5 · Rafiqs Advicer → rafiqs_advicer */}
        <ContentSection
          sectionTitle={isAr  ? "نصيحة رفيق"  : "Rafiqs Advicer"}
          badge={isAr         ? "محرر نصوص"    : "Rich Text"}
          label={isAr         ? "المحتوى"       : "Content"}
          placeholder={isAr   ? "اكتب النصيحة هنا..." : "Write the advicer content here..."}
          required={false}
          defaultValue={dbRow?.rafiqs_advicer ?? ""}
          onCommit={({ content }) => { data.current.rafiqs_advicer = content; }}
          externalError={null}
        />

        {/* 6 · Quick Actions */}
        <QuickActionsSection
          sectionTitle={isAr     ? "الإجراءات السريعة"                   : "Quick Actions"}
          addLabel={isAr         ? "إضافة إجراء"                         : "Add Quick Action"}
          addRowLabel={isAr      ? "إضافة إجراء سريع"                    : "Add Quick Action"}
          groupPlaceholder={isAr ? "الإجراءات السريعة"                   : "Quick Actions"}
          emptyText={isAr        ? "لا توجد إجراءات. أضف واحداً أعلاه." : "No actions yet — add one above."}
          lang={lang}
          defaultItems={
            dbRow?.quick_actions_title
              ? [{
                  title:    dbRow.quick_actions_title    ?? "",
                  caption:  dbRow.quick_actions_captionn ?? "",
                  imageUrl: dbRow.quick_actions_image    ?? "",
                  button:   dbRow.quick_actions_button   ?? "",
                  path:     dbRow.Path                   ?? "",
                  preview:  dbRow.quick_actions_image    ?? null,
                }]
              : []
          }
          onCommit={items => {
            const first = items[0] ?? {};
            data.current.quick_actions_title    = first.title    ?? "";
            data.current.quick_actions_captionn = first.caption  ?? "";
            data.current.quick_actions_image    = first.imageUrl ?? "";
            data.current.quick_actions_button   = first.button   ?? "";
            data.current.Path                   = first.path     ?? "";
          }}
          toastText={isAr ? "✓ تمت الإضافة" : "✓ Quick action added"}
          modal={{
            title:        isAr ? "إضافة إجراء سريع"           : "Add Quick Action",
            uploadLabel:  isAr ? "صورة الإجراء"                : "Action Image",
            uploadPrompt: isAr ? "انقر للتحميل أو اسحب وأفلت" : "Click to upload or drag & drop",
            uploadSub:    "PNG · JPG · SVG · max 5 MB",
            uploadHint:   isAr ? "الحجم المقترح: 64×64 بكسل"  : "Recommended: 64 × 64 px",
            titleLabel:   isAr ? "العنوان"           : "Title",
            titlePh:      isAr ? "مثال: صحة الأعمال" : "e.g. Business Health",
            titleMax:     80,
            captionLabel: isAr ? "التعليق"           : "Caption",
            captionPh:    isAr ? "وصف قصير..."       : "Short description...",
            captionMax:   120,
            buttonLabel:  isAr ? "نص الزر"           : "Button Label",
            buttonPh:     isAr ? "مثال: ابدأ الآن"   : "e.g. Start Now",
            buttonMax:    40,
            pathLabel:    isAr ? "المسار"            : "Navigation Path",
            pathPh:       "/screen/business-health",
            pathMax:      200,
            cancelLabel:  isAr ? "إلغاء"   : "Cancel",
            saveLabel:    isAr ? "+ إضافة" : "+ Add Action",
            errMsg: {
              image:     isAr ? "الصورة مطلوبة."                        : "An image is required.",
              imageType: isAr ? "نوع الملف غير مدعوم."                  : "Please upload a valid image (PNG, JPG, SVG).",
              imageSize: isAr ? "يجب أن يكون الحجم أقل من 5 ميغابايت." : "File must be under 5 MB.",
              title:     isAr ? "العنوان مطلوب."                        : "Title is required.",
              minLen:    isAr ? "يجب أن يكون حرفين على الأقل."         : "Must be at least 2 characters.",
            },
          }}
        />

        {/* 7 · Footer */}
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
          style={
            toast.startsWith("❌") || toast.startsWith("⚠️")
              ? { background: "var(--red)" }
              : {}
          }
        >
          {toast}
        </div>
      )}
    </>
  );
}