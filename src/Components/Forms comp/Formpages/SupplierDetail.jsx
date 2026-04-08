// SupplierSectionEditorPage.jsx

import { useState, useRef } from "react";
import "../Form.css";

import { supabase }          from "../../../Pages/Supabase.jsx";
import LanguageToggleSection from "../Languagetogglesection .jsx";
import GreetingSection       from "../Greetingsection.jsx";
import WalletSection         from "../Walletsection.jsx";
import DynamicListSection    from "../Dynamiclistsection.jsx";
import PortfolioSection      from "../Portfoliosection.jsx";
import ReviewsSection        from "../Reviewssection.jsx";
import FormFooter            from "../Formfooter.jsx";

const TABLE = "Supplier Detail Page eng";

const LANG_OPTIONS = [
  { value: "en", label: "English",          dir: "ltr" },
  { value: "ar", label: "العربية (Arabic)", dir: "rtl" },
];

const EMPTY_DRAFT = {
  "supplier's_name":         "",
  "supplier's_about":        "",
  "supplier's_review_count": "",
  production_capcity:        "",
  Capabilities1:             "",
  Capabilities2:             "",
  Capabilities3:             "",
  Trust_and_verifications1:  "",
  Trust_and_verifications2:  "",
  Trust_and_verifications3:  "",
  portfolio_img1:            "",
  portfolio_img2:            "",
  portfolio_img3:            "",
  portfolio_img4:            "",
  "reviewer's_name_1":       "",
  review1:                   "",
  rating1:                   "",
  "reviewer's_name_2":       "",
  review2:                   "",
  rating2:                   "",
  reviewers_pfp1:            "",
  reviewers_pfp2:            "",
  "Lead Time":               "",
  MOQ:                       "",
  "Team size":               "",
  Capacity:                  "",
  suppliers_pfp:             "",
};

export default function SupplierSectionEditorPage() {
  const [lang,       setLang]       = useState("en");
  const [pageErrors, setPageErrors] = useState({});
  const [toast,      setToast]      = useState(null);
  const [loading,    setLoading]    = useState(false);

  const isAr = lang === "ar";
  const data = useRef({ ...EMPTY_DRAFT });

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const d = data.current;
    const e = {};
    if (!d["supplier's_name"]?.trim())
      e.name = isAr ? "اسم المورد مطلوب." : "Supplier name is required.";
    setPageErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save → INSERT new row (no id — DB auto-generates it) ──────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    const d = data.current;

    const payload = {
      "supplier's_name":         d["supplier's_name"],
      "supplier's_about":        d["supplier's_about"],
      "supplier's_review_count": d["supplier's_review_count"],
      production_capcity:        Number(d.production_capcity) || null,
      Capabilities1:             d.Capabilities1,
      Capabilities2:             d.Capabilities2,
      Capabilities3:             d.Capabilities3,
      Trust_and_verifications1:  d.Trust_and_verifications1,
      Trust_and_verifications2:  d.Trust_and_verifications2,
      Trust_and_verifications3:  d.Trust_and_verifications3,
      portfolio_img1:            d.portfolio_img1,
      portfolio_img2:            d.portfolio_img2,
      portfolio_img3:            d.portfolio_img3,
      portfolio_img4:            d.portfolio_img4,
      "reviewer's_name_1":       d["reviewer's_name_1"],
      review1:                   d.review1,
      rating1:                   d.rating1,
      "reviewer's_name_2":       d["reviewer's_name_2"],
      review2:                   d.review2,
      rating2:                   Number(d.rating2) || null,
      reviewers_pfp1:            d.reviewers_pfp1,
      reviewers_pfp2:            d.reviewers_pfp2,
      "Lead Time":               d["Lead Time"],
      MOQ:                       d.MOQ,
      "Team size":               d["Team size"],
      Capacity:                  d.Capacity,
      suppliers_pfp:             d.suppliers_pfp,
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

    console.log("✅ Insert result:", res);

    data.current = { ...EMPTY_DRAFT };
    setPageErrors({});

    setToast(`✓ New supplier added (id: ${res[0]?.id})`);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Cancel ────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    data.current = { ...EMPTY_DRAFT };
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
          label={isAr       ? "اسم المورد"  : "Supplier Name"}
          placeholder={isAr ? "اسمك..."     : "your Name..."}
          maxLength={100}
          required
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current["supplier's_name"] = greeting; }}
          externalError={pageErrors.name ?? null}
        />

        <GreetingSection
          label={isAr       ? "عن المورد"   : "Supplier About"}
          placeholder={isAr ? "نبذة عنك..." : "your about.."}
          maxLength={500}
          required={false}
          dir={isAr ? "rtl" : "ltr"}
          defaultValue=""
          onCommit={({ greeting }) => { data.current["supplier's_about"] = greeting; }}
          externalError={null}
        />

        <WalletSection
          sectionTitle={isAr      ? "الإحصائيات"    : "Stats"}
          balanceLabel={isAr      ? "عدد المراجعات" : "Review count"}
          balanceHint={null}
          balancePlaceholder="e.g.45000"
          balanceMin={0}
          balanceMax={999999999}
          iconLabel={isAr         ? "طاقة الإنتاج"  : "Production Capacity"}
          iconHint={null}
          iconPlaceholder="e.g.45000"
          defaultBalance=""
          defaultIcon=""
          onCommit={({ balance, icon }) => {
            data.current["supplier's_review_count"] = balance;
            data.current.production_capcity         = icon;
          }}
          externalError={null}
        />

        <DynamicListSection
          sectionTitle={isAr    ? "القدرات"         : "Capabilities"}
          addBtnLabel={isAr     ? "إضافة قدرة"      : "Add Capabilities"}
          addRowLabel={isAr     ? "إضافة قدرة"      : "Add Capabilities"}
          itemPlaceholder={isAr ? "قدرة..."         : "Capabilities"}
          emptyText={isAr       ? "لا توجد قدرات." : "No capabilities yet."}
          defaultItems={[""]}
          onCommit={items => {
            data.current.Capabilities1 = items[0] ?? "";
            data.current.Capabilities2 = items[1] ?? "";
            data.current.Capabilities3 = items[2] ?? "";
          }}
          externalError={null}
        />

        <DynamicListSection
          sectionTitle={isAr    ? "الثقة والتحقق"      : "Trust and verifications"}
          addBtnLabel={isAr     ? "إضافة تحقق"         : "Add Capabilities"}
          addRowLabel={isAr     ? "إضافة تحقق"         : "Add Capabilities"}
          itemPlaceholder={isAr ? "تحقق..."             : "Capabilities"}
          emptyText={isAr       ? "لا توجد تحققات."    : "No verifications yet."}
          defaultItems={[""]}
          onCommit={items => {
            data.current.Trust_and_verifications1 = items[0] ?? "";
            data.current.Trust_and_verifications2 = items[1] ?? "";
            data.current.Trust_and_verifications3 = items[2] ?? "";
          }}
          externalError={null}
        />

        <PortfolioSection
          sectionTitle={isAr   ? "معرض الأعمال"                        : "Portfolio"}
          addBtnLabel={isAr    ? "إضافة صورة"                          : "Add Image"}
          uploadPrompt={isAr   ? "انقر للتحميل أو اسحب وأفلت"          : "Click to upload or drag and drop"}
          uploadSub={isAr      ? "PNG، JPG حتى 5 ميغا (1200×630 بكسل)" : "PNG, JPG up to 5MB (recommended: 1200x630px)"}
          defaultImages={[]}
          onCommit={(files, previews) => {
            data.current.portfolio_img1 = previews[0] ?? "";
            data.current.portfolio_img2 = previews[1] ?? "";
            data.current.portfolio_img3 = previews[2] ?? "";
            data.current.portfolio_img4 = previews[3] ?? "";
          }}
        />

        <ReviewsSection
          sectionTitle={isAr      ? "المراجعات"       : "Reviews"}
          addRowLabel={isAr       ? "إضافة مراجعة"    : "Add Review"}
          nameLabel={isAr         ? "اسم المراجع"      : "Reviewer's Name"}
          reviewLabel={isAr       ? "المراجعة"         : "Review"}
          ratingLabel={isAr       ? "التقييم"          : "Reviewer's Rating"}
          pfpLabel={isAr          ? "صورة المراجع"     : "Reviewer's Photo URL"}
          namePlaceholder={isAr   ? "اكتب اسمك"       : "write  your name"}
          reviewPlaceholder={isAr ? "اكتب مراجعتك"    : "write  your review"}
          ratingPlaceholder={isAr ? "تقييمك"          : "your rating"}
          pfpPlaceholder="https://..."
          defaultItems={[{ name: "", review: "", rating: "", pfp: "" }]}
          onCommit={items => {
            data.current["reviewer's_name_1"] = items[0]?.name   ?? "";
            data.current.review1              = items[0]?.review  ?? "";
            data.current.rating1              = items[0]?.rating  ?? "";
            data.current.reviewers_pfp1       = items[0]?.pfp     ?? "";
            data.current["reviewer's_name_2"] = items[1]?.name   ?? "";
            data.current.review2              = items[1]?.review  ?? "";
            data.current.rating2              = items[1]?.rating  ?? "";
            data.current.reviewers_pfp2       = items[1]?.pfp     ?? "";
          }}
          externalError={null}
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
          style={toast.startsWith("❌") ? { background: "var(--red)" } : {}}
        >
          {toast}
        </div>
      )}
    </>
  );
}