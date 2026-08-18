"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockLawyers = [
  { id: "lawyer-001", name_ar: "أحمد فهد الخطيب", name_en: "Ahmad Fahd Al-Khatib", membership_id: "JBA-1023", practice_areas: ["labor", "debt"], governorates: ["Amman"], verification_status: "verified" as const, years_experience: 15, rating: 4.8, phone: "+962-79-123-4567" },
  { id: "lawyer-002", name_ar: "نورهان سامي العموسي", name_en: "Norhan Sami Al-Omousi", membership_id: "JBA-2047", practice_areas: ["family", "rent"], governorates: ["Amman", "Salt"], verification_status: "verified" as const, years_experience: 12, rating: 4.7, phone: "+962-79-234-5678" },
  { id: "lawyer-003", name_ar: "خالد يوسف الصرايره", name_en: "Khaled Yousef Al-Sarayrah", membership_id: "JBA-3156", practice_areas: ["traffic", "cybercrime"], governorates: ["Irbid"], verification_status: "verified" as const, years_experience: 8, rating: 4.5, phone: "+962-79-345-6789" },
  { id: "lawyer-004", name_ar: "ريم عادل القضاة", name_en: "Rima Adel Al-Qudah", membership_id: "JBA-4289", practice_areas: ["family", "debt", "small_business"], governorates: ["Amman"], verification_status: "verified" as const, years_experience: 20, rating: 4.9, phone: "+962-79-456-7890" },
  { id: "lawyer-005", name_ar: "عمر سعيد الخالدي", name_en: "Omar Saeed Al-Khalidi", membership_id: "JBA-5312", practice_areas: ["labor", "court_procedures"], governorates: ["Zarqa"], verification_status: "pending" as const, years_experience: 5, rating: 0, phone: "+962-79-567-8901" },
  { id: "lawyer-006", name_ar: "هنا فوزي عسقول", name_en: "Hana Fawzi Asfour", membership_id: "JBA-6423", practice_areas: ["rent", "family"], governorates: ["Amman", "Balqa"], verification_status: "verified" as const, years_experience: 10, rating: 4.6, phone: "+962-79-678-9012" },
  { id: "lawyer-007", name_ar: "ماجد حسين اللحام", name_en: "Majd Hussein Al-Lahham", membership_id: "JBA-7534", practice_areas: ["cybercrime", "debt"], governorates: ["Irbid", "Mafraq"], verification_status: "pending" as const, years_experience: 3, rating: 0, phone: "+962-79-789-0123" },
  { id: "lawyer-008", name_ar: "دانا رائدԎ الـ湑", name_en: "Dana Raed Al-Shami", membership_id: "JBA-8645", practice_areas: ["small_business", "labor"], governorates: ["Amman"], verification_status: "unverified" as const, years_experience: 2, rating: 0, phone: "+962-79-890-1234" },
];

const practiceAreaLabels: Record<string, { ar: string; en: string }> = {
  labor: { ar: "قانون العمل", en: "Labor" },
  rent: { ar: "الإيجار", en: "Rent" },
  family: { ar: "الأحوال الشخصية", en: "Family" },
  debt: { ar: "الديون", en: "Debt" },
  traffic: { ar: "المرور", en: "Traffic" },
  cybercrime: { ar: "الجرائم الإلكترونية", en: "Cybercrime" },
  small_business: { ar: "الأعمال الصغيرة", en: "Small Business" },
  court_procedures: { ar: "إجراءات المحاكم", en: "Court Procedures" },
};

const verificationColors: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  unverified: "bg-gray-100 text-gray-500",
};

const verificationLabels: Record<string, { ar: string; en: string }> = {
  verified: { ar: "موثّق", en: "Verified" },
  pending: { ar: "قيد التحقق", en: "Pending" },
  unverified: { ar: "غير موثّق", en: "Unverified" },
};

const practiceAreaColors: Record<string, string> = {
  labor: "bg-blue-100 text-blue-700",
  rent: "bg-teal/10 text-teal",
  family: "bg-purple-100 text-purple-700",
  debt: "bg-amber-100 text-amber-700",
  traffic: "bg-orange-100 text-orange-700",
  cybercrime: "bg-rose-100 text-rose-700",
  small_business: "bg-emerald-100 text-emerald-700",
  court_procedures: "bg-gray-100 text-gray-700",
};

export default function LawyersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [search, setSearch] = useState("");
  const [filterVerification, setFilterVerification] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockLawyers.filter((l) => {
    const matchSearch = search === "" || l.name_ar.includes(search) || l.name_en.toLowerCase().includes(search.toLowerCase()) || l.membership_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterVerification === "all" || l.verification_status === filterVerification;
    return matchSearch && matchStatus;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "المحامون" : "Lawyers"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة المحامين" : "Lawyer Management"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder={locale === "ar" ? "بحث بالاسم أو رقم العضوية..." : "Search by name or membership ID..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 w-72"
          />
          <select
            value={filterVerification}
            onChange={(e) => setFilterVerification(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع حالات التحقق" : "All Verification"}</option>
            {Object.entries(verificationLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <div className="mr-auto text-sm text-muted">
            {filtered.length} {locale === "ar" ? "محامٍ" : "lawyers"}
          </div>
          <a
            href={nav("/lawyers/verification")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            {locale === "ar" ? "طلبات التحقق" : "Verification Queue"}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((lawyer) => (
            <div key={lawyer.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {lawyer.name_en.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm">{locale === "ar" ? lawyer.name_ar : lawyer.name_en}</h3>
                    <p className="text-xs text-muted">{lawyer.membership_id}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${verificationColors[lawyer.verification_status]}`}>
                  {locale === "ar" ? verificationLabels[lawyer.verification_status]?.ar : verificationLabels[lawyer.verification_status]?.en}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {lawyer.practice_areas.map((area) => (
                  <span key={area} className={`px-2 py-0.5 rounded text-xs font-medium ${practiceAreaColors[area]}`}>
                    {locale === "ar" ? practiceAreaLabels[area]?.ar : practiceAreaLabels[area]?.en}
                  </span>
                ))}
              </div>

              <div className="space-y-1.5 text-xs text-muted">
                <div className="flex justify-between">
                  <span>{locale === "ar" ? "المحافظات" : "Governorates"}</span>
                  <span className="text-gray-700">{lawyer.governorates.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === "ar" ? "سنوات الخبرة" : "Experience"}</span>
                  <span className="text-gray-700">{lawyer.years_experience} {locale === "ar" ? "سنة" : "years"}</span>
                </div>
                {lawyer.rating > 0 && (
                  <div className="flex justify-between">
                    <span>{locale === "ar" ? "التقييم" : "Rating"}</span>
                    <span className="text-gold font-medium">⭐ {lawyer.rating}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{locale === "ar" ? "الهاتف" : "Phone"}</span>
                  <span className="text-gray-700" dir="ltr">{lawyer.phone}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <a
                  href={`/${locale}/lawyers/${lawyer.id}`}
                  className="flex-1 px-3 py-1.5 bg-navy/5 text-navy rounded text-xs font-medium hover:bg-navy/10 transition-colors text-center"
                >
                  {locale === "ar" ? "الملف الشخصي" : "Profile"}
                </a>
                <button className="flex-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                  {locale === "ar" ? "تعديل" : "Edit"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
