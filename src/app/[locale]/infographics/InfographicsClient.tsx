"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { infographicGallery, type InfographicGalleryEntry } from "@/lib/infographics-data";
import { infographicUrl } from "@/lib/imagekit";
import Disclaimer from "@/components/Disclaimer";

const categories = [
  { id: "all", ar: "الكل", en: "All" },
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

export default function InfographicsClient({ locale }: { locale: string }) {
  const loc = locale as Locale;
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = infographicGallery;

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.titleAr.toLowerCase().includes(q) ||
          item.titleEn.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const getLangBadge = (lang: InfographicGalleryEntry["language"]) => {
    if (lang === "ar") return loc === "ar" ? "عربي" : "Arabic";
    if (lang === "en") return loc === "ar" ? "إنجليزي" : "English";
    return loc === "ar" ? "ثنائي اللغة" : "Bilingual";
  };

  return (
    <div dir={loc === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <section className="bg-navy text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {loc === "ar" ? "الإنفوغرافيك القانوني" : "Legal Infographics"}
          </h1>
          <p className="text-white/80 text-lg">
            {loc === "ar"
              ? "رسوم توضيحية قانونية تساعدك على فهم حقوقك وخطواتك التالية"
              : "Visual legal guides to help you understand your rights and next steps"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {loc === "ar" ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              loc === "ar"
                ? "ابحث عن إنفوغرافيك..."
                : "Search infographics..."
            }
            className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors"
          />
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          {loc === "ar"
            ? `${filtered.length} نتيجة`
            : `${filtered.length} results`}
        </p>

        {/* Card Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const title = loc === "ar" ? item.titleAr : item.titleEn;
              const description = loc === "ar" ? item.descriptionAr : item.descriptionEn;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={infographicUrl(item.filename, 600)}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          categoryBadgeColors[item.category] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {loc === "ar"
                          ? categories.find((c) => c.id === item.category)?.ar || item.category
                          : categories.find((c) => c.id === item.category)?.en || item.category}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {getLangBadge(item.language)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
                    <Link
                      href={`/${locale}/infographics/${item.id}`}
                      className="inline-block px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
                    >
                      {loc === "ar" ? "عرض" : "View"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">
              {loc === "ar" ? "لا توجد إنفوغرافيك" : "No infographics found"}
            </p>
          </div>
        )}

        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
