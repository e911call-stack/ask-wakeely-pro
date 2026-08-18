"use client";

import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { infographicGallery, type InfographicGalleryEntry } from "@/lib/infographics-data";
import { infographicFullUrl } from "@/lib/imagekit";
import Disclaimer from "@/components/Disclaimer";

const categories = [
  { id: "labor", ar: "قانون العمل", en: "Labor" },
  { id: "rent", ar: "الإيجار", en: "Rent" },
  { id: "family", ar: "الأحوال الشخصية", en: "Family" },
  { id: "debt", ar: "الديون", en: "Debt" },
  { id: "traffic", ar: "المرور", en: "Traffic" },
  { id: "cybercrime", ar: "الجرائم الإلكترونية", en: "Cybercrime" },
  { id: "civil_law", ar: "القانون المدني", en: "Civil Law" },
  { id: "insurance", ar: "التأمين", en: "Insurance" },
  { id: "services", ar: "خدمات قانونية", en: "Legal Services" },
];

const categoryBadgeColors: Record<string, string> = {
  labor: "bg-blue-100 text-blue-700",
  rent: "bg-teal/10 text-teal",
  family: "bg-purple-100 text-purple-700",
  debt: "bg-amber-100 text-amber-700",
  traffic: "bg-orange-100 text-orange-700",
  cybercrime: "bg-rose-100 text-rose-700",
  civil_law: "bg-indigo-100 text-indigo-700",
  insurance: "bg-cyan-100 text-cyan-700",
  services: "bg-emerald-100 text-emerald-700",
};

const templateLabels: Record<string, { ar: string; en: string }> = {
  "legal-summary": { ar: "ملخص قانوني", en: "Legal Summary" },
  "procedural-guide": { ar: "دليل إجرائي", en: "Procedural Guide" },
  "document-checklist": { ar: "قائمة مستندات", en: "Document Checklist" },
  "deadline-warning": { ar: "تنبيه مواعيد", en: "Deadline Warning" },
};

export default function InfographicDetailClient({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const loc = locale as Locale;
  const item = infographicGallery.find((entry) => entry.id === id);

  if (!item) {
    return (
      <div dir={loc === "ar" ? "rtl" : "ltr"} className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {loc === "ar" ? "الإنفوغرافيك غير موجود" : "Infographic Not Found"}
        </h1>
        <p className="text-gray-500 mb-6">
          {loc === "ar"
            ? "الإنفوغرافيك الذي تبحث عنه غير موجود."
            : "The infographic you are looking for does not exist."}
        </p>
        <Link
          href={`/${locale}/infographics`}
          className="inline-block px-6 py-2 bg-navy text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          {loc === "ar" ? "العودة للقائمة" : "Back to Gallery"}
        </Link>
      </div>
    );
  }

  const title = loc === "ar" ? item.titleAr : item.titleEn;
  const description = loc === "ar" ? item.descriptionAr : item.descriptionEn;
  const categoryLabel = categories.find((c) => c.id === item.category);
  const templateLabel = templateLabels[item.template];

  const getLangBadge = (lang: InfographicGalleryEntry["language"]) => {
    if (lang === "ar") return loc === "ar" ? "عربي" : "Arabic";
    if (lang === "en") return loc === "ar" ? "إنجليزي" : "English";
    return loc === "ar" ? "ثنائي اللغة" : "Bilingual";
  };

  const handleDownload = () => {
    window.open(infographicFullUrl(item.filename), "_blank");
  };

  return (
    <div dir={loc === "ar" ? "rtl" : "ltr"} className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-navy">
          {t(loc, "home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/infographics`} className="hover:text-navy">
          {loc === "ar" ? "الإنفوغرافيك" : "Infographics"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </nav>

      {/* Full-size Image */}
      <div className="mb-8">
        <img
          src={infographicFullUrl(item.filename)}
          alt={title}
          className="w-full rounded-xl shadow-lg"
          style={{ maxHeight: "80vh", objectFit: "contain" }}
        />
      </div>

      {/* Metadata Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              categoryBadgeColors[item.category] || "bg-gray-100 text-gray-700"
            }`}
          >
            {loc === "ar" ? categoryLabel?.ar : categoryLabel?.en}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {getLangBadge(item.language)}
          </span>
          {templateLabel && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {loc === "ar" ? templateLabel.ar : templateLabel.en}
            </span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            {t(loc, "last_reviewed")}: {item.lastReviewed}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href={infographicFullUrl(item.filename)}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          {loc === "ar" ? "فتح في تبويب جديد" : "Open in New Tab"}
        </a>
        <button
          onClick={handleDownload}
          className="px-5 py-2.5 bg-teal text-white text-sm font-medium rounded-lg hover:bg-secondary-light transition-colors"
        >
          {loc === "ar" ? "تنزيل" : "Download"}
        </button>
        <Link
          href={`/${locale}/infographics`}
          className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          {loc === "ar" ? "العودة للقائمة" : "Back to Gallery"}
        </Link>
      </div>

      {/* Related Topic */}
      <Link
        href={`/${locale}/topics/${item.slug}`}
        className="block bg-white rounded-xl border border-gray-100 p-5 mb-8 hover:shadow-md transition-shadow"
      >
        <span className="text-sm text-gray-500 mb-1 block">
          {loc === "ar" ? "الموضوع المرتبط" : "Related Topic"}
        </span>
        <span className="text-navy font-semibold">
          {loc === "ar" ? `查看 ${item.titleAr} 的详细内容` : `View details for ${item.titleEn}`}
        </span>
      </Link>

      <Disclaimer locale={loc} />
    </div>
  );
}
