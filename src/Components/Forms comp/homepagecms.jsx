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

  // ── Save (always inserts a new row) ───────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);

    const d = data.current;

    // No `id` field — Supabase will auto-generate one
    const payload = {
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

    console.log("💾 Inserting new row:", payload);

    const { data: res, error } = await supabase
      .from("home screen eng")
      .insert(payload)
      .select();

    setLoading(false);

    if (error) {
      console.error("❌ Insert error:", error);
      setToast(`❌ ${error.message}`);
      setTimeout(() => setToast(null), 4000);
      return;
    }

    console.log("✅ Inserted row:", res);
    setToast("✓ Saved successfully");
    setTimeout(() => setToast(null), 2500);
  };

  // ── Cancel (just clears the form) ─────────────────────────────────────────
  const handleCancel = () => {
    data.current = {
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
    };
    setPageErrors({});
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="pw" dir={isAr ? "rtl" : "ltr"}>

        <LanguageToggleSection
          eyebrow="Editing Language"
          options={LANG_OPTIONS}
          value={lang}
          onChange={setLang}
        />

        <GreetingSection
          label={isAr       ? "نص التحية"  : "Greeting Text"}
          placeholder={isAr ? "صباح الخير" : "Welcome back"}
          maxLength={80}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current.greeting_text = greeting; }}
          externalError={pageErrors.greeting ?? null}
        />

        <UserNameSection
          label={isAr       ? "الاسم"                             : "Name"}
          hint={isAr        ? "الاسم المعروض على الشاشة الرئيسية" : "Name displayed on the home screen"}
          placeholder={isAr ? "نايرة"                             : "Nayerah"}
          maxLength={80}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ userName }) => { data.current.name = userName; }}
          externalError={pageErrors.userName ?? null}
          extraLabel={isAr      ? "اسم المستخدم" : "Username"}
          extraPlaceholder="@Nayerah.kotn"
          extraMaxLength={60}
          extraDefaultValue=""
          onExtraCommit={v => { data.current.username = v; }}
        />

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
          defaultBalance=""
          defaultIcon=""
          onCommit={({ balance, icon }) => {
            data.current.review_number = balance;
            data.current.pfp           = icon;
          }}
          externalError={pageErrors.balance ?? null}
        />

        <ContentSection
          sectionTitle={isAr  ? "نصيحة رفيق"  : "Rafiqs Advicer"}
          badge={isAr         ? "محرر نصوص"    : "Rich Text"}
          label={isAr         ? "المحتوى"       : "Content"}
          placeholder={isAr   ? "اكتب النصيحة هنا..." : "Write the advicer content here..."}
          required={false}
          defaultValue=""
          onCommit={({ content }) => { data.current.rafiqs_advicer = content; }}
          externalError={null}
        />

        <QuickActionsSection
          sectionTitle={isAr     ? "الإجراءات السريعة"                   : "Quick Actions"}
          addLabel={isAr         ? "إضافة إجراء"                         : "Add Quick Action"}
          addRowLabel={isAr      ? "إضافة إجراء سريع"                    : "Add Quick Action"}
          groupPlaceholder={isAr ? "الإجراءات السريعة"                   : "Quick Actions"}
          emptyText={isAr        ? "لا توجد إجراءات. أضف واحداً أعلاه." : "No actions yet — add one above."}
          lang={lang}
          defaultItems={[]}
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