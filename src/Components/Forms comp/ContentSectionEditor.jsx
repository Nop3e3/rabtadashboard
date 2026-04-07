// ContentSectionEditorPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// THE FINAL PAGE.
// Imports every section component and assembles them.
// This is the ONLY file that contains real content:
//   labels, placeholders, hints, default values, validation messages,
//   and all EN/AR translations.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef }         from "react";
import "./Form.css";
import LanguageToggleSection        from "./Languagetogglesection .jsx";
import GreetingSection              from "./Greetingsection.jsx";
import UserNameSection              from "./Usernamesection.jsx";
import WalletSection                from "./Walletsection.jsx";
import ContentSection               from "./Contentsection.jsx";
import QuickActionsSection          from "./Quickactionssection.jsx";
import FormFooter                   from "./Formfooter.jsx";

// ── Language options fed to the toggle ──────────────────────────────────────
const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

// ── Default form values ──────────────────────────────────────────────────────
const DEFAULTS = {
  greeting:    "Good Morning",
  greetingAr:  "صباح الخير",
  userName:    "Welcome Back, {user}",
  userNameAr:  "مرحباً بعودتك، {user}",
  balance:     "45000",
  icon:        "💎",
  content:     "",
  contentAr:   "",
  qaItems:     [
    { title: "Business Health", titleAr: "صحة الأعمال", preview: null, time: "8:30" },
  ],
};

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ContentSectionEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);

  const isAr = lang === "ar";

  // Aggregated form data — sections push their latest value here via onCommit
  const data = useRef({ ...DEFAULTS });

  // ── Page-level validation (runs only on Save) ────────────────────────────
  const validate = () => {
    const d = data.current;
    const e = {};

    const greeting = isAr ? d.greetingAr ?? "" : d.greeting  ?? "";
    const userName  = isAr ? d.userNameAr ?? "" : d.userName  ?? "";
    const content   = isAr ? d.contentAr  ?? "" : d.content   ?? "";

    if (!greeting.trim())
      e.greeting = isAr ? "نص التحية مطلوب." : "Greeting text is required.";

    if (!userName.trim())
      e.userName = isAr ? "نص عرض الاسم مطلوب." : "User name display text is required.";

    if (!d.balance)
      e.balance = isAr ? "رصيد المحفظة مطلوب." : "Wallet balance is required.";
    else if (isNaN(Number(d.balance)) || Number(d.balance) < 0)
      e.balance = isAr ? "يجب أن يكون رقماً موجباً." : "Must be a non-negative number.";

    if (!content.replace(/<[^>]*>/g, "").trim())
      e.content = isAr ? "محتوى القسم لا يمكن أن يكون فارغاً." : "Section content cannot be empty.";

    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setToast(isAr ? "✓ تم الحفظ بنجاح" : "✓ Section saved successfully");
    setTimeout(() => setToast(null), 2500);
  };

  const handleCancel = () => {
    data.current = { ...DEFAULTS };
    setPageErrors({});
    setLang("en");
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <div className="pw" dir={isAr ? "rtl" : "ltr"}>

        {/* ── 1. Language Toggle ────────────────────────────────────────── */}
        <LanguageToggleSection
          eyebrow="Editing Language"
          options={LANG_OPTIONS}
          value={lang}
          onChange={setLang}
        />

        {/* ── 2. Greeting Text ──────────────────────────────────────────── */}
        <GreetingSection
          label={isAr       ? "نص التحية"   : "Greeting Text"}
          placeholder={isAr ? "صباح الخير"  : "Good Morning"}
          maxLength={80}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={isAr ? DEFAULTS.greetingAr : DEFAULTS.greeting}
          onCommit={({ greeting }) => {
            if (isAr) data.current.greetingAr = greeting;
            else      data.current.greeting   = greeting;
          }}
          externalError={pageErrors.greeting ?? null}
        />

        {/* ── 3. User Name Display ──────────────────────────────────────── */}
        <UserNameSection
          label={isAr       ? "عرض اسم المستخدم"                        : "User Name Display"}
          hint={isAr        ? "استخدم {user} كمتغير للاسم الفعلي"       : "Use {user} as a dynamic placeholder for the user's name"}
          placeholder={isAr ? "مرحبًا بعودتك، {user}"                  : "Welcome Back, {user}"}
          maxLength={100}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue={isAr ? DEFAULTS.userNameAr : DEFAULTS.userName}
          onCommit={({ userName }) => {
            if (isAr) data.current.userNameAr = userName;
            else      data.current.userName   = userName;
          }}
          externalError={pageErrors.userName ?? null}
        />

        {/* ── 4. Wallet ─────────────────────────────────────────────────── */}
        <WalletSection
          sectionTitle={isAr      ? "المحفظة"                             : "Wallet"}
          balanceLabel={isAr      ? "رصيد المحفظة"                        : "Wallet Balance"}
          balanceHint={isAr       ? "يُعرض رصيد المحفظة بالعملات"        : "Display user wallet balance in coins"}
          balancePlaceholder="45000"
          balanceMin={0}
          balanceMax={999_999_999}
          iconLabel={isAr         ? "أيقونة المحفظة"                      : "Wallet Icon"}
          iconHint={isAr          ? "رمز أو إيموجي يظهر بجانب الرصيد"    : "Emoji or symbol shown next to the balance"}
          iconPlaceholder="💎"
          defaultBalance={DEFAULTS.balance}
          defaultIcon={DEFAULTS.icon}
          onCommit={({ balance, icon }) => {
            data.current.balance = balance;
            data.current.icon    = icon;
          }}
          externalError={pageErrors.balance ?? null}
        />

        {/* ── 5. Section Content (Rich Text) ────────────────────────────── */}
        <ContentSection
          sectionTitle={isAr  ? "محتوى القسم" : "Section Content"}
          badge={isAr         ? "محرر نصوص"   : "Rich Text"}
          label={isAr         ? "المحتوى"      : "Content"}
          placeholder={isAr   ? "اكتب محتوى القسم هنا..." : "Write section content here..."}
          required
          defaultValue=""
          onCommit={({ content }) => {
            if (isAr) data.current.contentAr = content;
            else      data.current.content   = content;
          }}
          externalError={pageErrors.content ?? null}
        />

        {/* ── 6. Quick Actions ──────────────────────────────────────────── */}
        <QuickActionsSection
          sectionTitle={isAr     ? "الإجراءات السريعة"                  : "Quick Actions"}
          addLabel={isAr         ? "إضافة إجراء"                        : "Add Quick Action"}
          addRowLabel={isAr      ? "إضافة إجراء سريع"                   : "Add Quick Action"}
          groupPlaceholder={isAr ? "الإجراءات السريعة"                  : "Quick Actions"}
          emptyText={isAr        ? "لا توجد إجراءات. أضف واحداً أعلاه." : "No actions yet — add one above."}
          lang={lang}
          defaultItems={DEFAULTS.qaItems}
          onCommit={items => { data.current.qaItems = items; }}
          toastText={isAr ? "✓ تمت الإضافة" : "✓ Quick action added"}
          modal={{
            title:         isAr ? "إضافة إجراء سريع"           : "Add Quick Action",
            uploadLabel:   isAr ? "صورة الإجراء"                : "Action Image",
            uploadPrompt:  isAr ? "انقر للتحميل أو اسحب وأفلت" : "Click to upload or drag & drop",
            uploadSub:     "PNG · JPG · SVG · max 5 MB",
            uploadHint:    isAr ? "الحجم المقترح: 64×64 بكسل"  : "Recommended: 64 × 64 px",
            enLabel:       "Title (EN)",
            enPh:          "e.g. Business Health",
            enMax:         60,
            arLabel:       "العنوان (AR)",
            arPh:          "مثال: صحة الأعمال",
            arMax:         60,
            cancelLabel:   isAr ? "إلغاء"   : "Cancel",
            saveLabel:     isAr ? "+ إضافة" : "+ Add Action",
            errMsg: {
              image:     isAr ? "الصورة مطلوبة."                            : "An image is required.",
              imageType: isAr ? "نوع الملف غير مدعوم."                      : "Please upload a valid image (PNG, JPG, SVG).",
              imageSize: isAr ? "يجب أن يكون الحجم أقل من 5 ميغابايت."     : "File must be under 5 MB.",
              en:        isAr ? "العنوان الإنجليزي مطلوب."                  : "English title is required.",
              ar:        isAr ? "العنوان العربي مطلوب."                      : "Arabic title is required.",
              minLen:    isAr ? "يجب أن يكون حرفين على الأقل."             : "Must be at least 2 characters.",
            },
          }}
        />

        {/* ── 7. Footer ─────────────────────────────────────────────────── */}
        <FormFooter
          cancelLabel={isAr ? "إلغاء"     : "Cancel"}
          saveLabel={isAr   ? "حفظ القسم" : "Save Section"}
          onCancel={handleCancel}
          onSave={handleSave}
        />

      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}