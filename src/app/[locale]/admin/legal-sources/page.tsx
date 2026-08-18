"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockSources = [
  { id: "s1", type: "law", title_ar: "قانون العمل الأردني رقم 8 لسنة 1996", title_en: "Jordanian Labor Law No. 8 of 1996", article: "المادة 28", article_en: "Article 28", status: "verified" as const, effective_date: "1996-12-01", last_verified: "2026-01-15", confidence: "high" as const, topics_count: 3 },
  { id: "s2", type: "law", title_ar: "قانون الإيجار وال房屋 رقم 21 لسنة 1988", title_en: "Rent Law No. 21 of 1988", article: "المادة 15", article_en: "Article 15", status: "verified" as const, effective_date: "1988-12-20", last_verified: "2026-02-10", confidence: "high" as const, topics_count: 5 },
  { id: "s3", type: "law", title_ar: "القانون المدني الأردني رقم 36 لسنة 1976", title_en: "Jordanian Civil Code No. 36 of 1976", article: "المادة 252", article_en: "Article 252", status: "verified" as const, effective_date: "1976-09-01", last_verified: "2026-03-01", confidence: "high" as const, topics_count: 8 },
  { id: "s4", type: "regulation", title_ar: "لائحة تنفيذية لقانون حماية البيانات الشخصية", title_en: "Executive Regulation for Personal Data Protection Law", article: "المادة 5", article_en: "Article 5", status: "pending_review" as const, effective_date: "2024-03-17", last_verified: "2026-04-05", confidence: "medium" as const, topics_count: 2 },
  { id: "s5", type: "court_ruling", title_ar: "حكم المحكمة الابتدائية - استرداد التأمين", title_en: "Magistrates Court Ruling - Deposit Recovery", article: "Case No. 2024/1234", article_en: "Case No. 2024/1234", status: "verified" as const, effective_date: "2024-06-15", last_verified: "2026-01-20", confidence: "high" as const, topics_count: 1 },
  { id: "s6", type: "law", title_ar: "قانون أصول المحاكمات المدنية رقم 24 لسنة 1988", title_en: "Civil Procedure Law No. 24 of 1988", article: "المادة 3", article_en: "Article 3", status: "verified" as const, effective_date: "1988-12-31", last_verified: "2026-02-28", confidence: "high" as const, topics_count: 4 },
  { id: "s7", type: "law", title_ar: "قانون حماية البيانات الشخصية رقم 24 لسنة 2023", title_en: "Personal Data Protection Law No. 24 of 2023", article: "المادة 12", article_en: "Article 12", status: "pending_review" as const, effective_date: "2024-03-17", last_verified: "2026-05-01", confidence: "medium" as const, topics_count: 3 },
  { id: "s8", type: "circular", title_ar: "تعميم نقابة المحامين - الرسوم]", title_en: "Bar Association Circular - Fees", article: "رقم 2025/03", article_en: "No. 2025/03", status: "expired" as const, effective_date: "2025-01-01", last_verified: "2026-04-01", confidence: "low" as const, topics_count: 1 },
];

const typeLabels: Record<string, { ar: string; en: string; color: string }> = {
  law: { ar: "قانون", en: "Law", color: "bg-blue-100 text-blue-700" },
  regulation: { ar: "لائحة تنفيذية", en: "Regulation", color: "bg-purple-100 text-purple-700" },
  court_ruling: { ar: "حكم قضائي", en: "Court Ruling", color: "bg-amber-100 text-amber-700" },
  circular: { ar: "تعميم", en: "Circular", color: "bg-gray-100 text-gray-600" },
};

const statusLabels: Record<string, { ar: string; en: string; color: string }> = {
  verified: { ar: "موثّق", en: "Verified", color: "bg-emerald-100 text-emerald-700" },
  pending_review: { ar: "بانتظار المراجعة", en: "Pending Review", color: "bg-amber-100 text-amber-700" },
  expired: { ar: "منتهي الصلاحية", en: "Expired", color: "bg-gray-100 text-gray-500" },
};

const confidenceLabels: Record<string, { ar: string; en: string; color: string }> = {
  high: { ar: "عالية", en: "High", color: "text-emerald-600" },
  medium: { ar: "متوسطة", en: "Medium", color: "text-amber-600" },
  low: { ar: "منخفضة", en: "Low", color: "text-rose-600" },
};

export default function LegalSourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockSources.filter((s) => {
    const matchSearch = search === "" || s.title_ar.includes(search) || s.title_en.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || s.type === filterType;
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "المصادر القانونية" : "Legal Sources"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة المصادر القانونية" : "Legal Sources Management"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: locale === "ar" ? "إجمالي المصادر" : "Total Sources", value: mockSources.length, color: "text-navy" },
            { label: locale === "ar" ? "موثّقة" : "Verified", value: mockSources.filter((s) => s.status === "verified").length, color: "text-emerald-600" },
            { label: locale === "ar" ? "بانتظار المراجعة" : "Pending Review", value: mockSources.filter((s) => s.status === "pending_review").length, color: "text-amber-600" },
            { label: locale === "ar" ? "منتهية الصلاحية" : "Expired", value: mockSources.filter((s) => s.status === "expired").length, color: "text-gray-500" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-xs text-muted mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder={locale === "ar" ? "بحث في المصادر..." : "Search sources..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الأنواع" : "All Types"}</option>
            {Object.entries(typeLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الحالات" : "All Statuses"}</option>
            {Object.entries(statusLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "النوع" : "Type"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "العنوان" : "Title"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المادة" : "Article"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الثقة" : "Confidence"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "تاريخ السريان" : "Effective Date"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "آخر تحقق" : "Last Verified"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeLabels[source.type].color}`}>
                        {locale === "ar" ? typeLabels[source.type].ar : typeLabels[source.type].en}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{locale === "ar" ? source.title_ar : source.title_en}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{locale === "ar" ? source.article : source.article_en}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabels[source.status].color}`}>
                        {locale === "ar" ? statusLabels[source.status].ar : statusLabels[source.status].en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${confidenceLabels[source.confidence].color}`}>
                        {locale === "ar" ? confidenceLabels[source.confidence].ar : confidenceLabels[source.confidence].en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{source.effective_date}</td>
                    <td className="px-4 py-3 text-muted text-xs">{source.last_verified}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-navy/5 text-navy rounded text-xs font-medium hover:bg-navy/10 transition-colors">
                          {locale === "ar" ? "عرض" : "View"}
                        </button>
                        <button className="px-3 py-1 bg-gold/10 text-gold rounded text-xs font-medium hover:bg-gold/20 transition-colors">
                          {locale === "ar" ? "تحقق" : "Verify"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
