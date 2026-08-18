"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockVerifications = [
  {
    id: "lawyer-005",
    name_ar: "عمر سعيد الخالدي",
    name_en: "Omar Saeed Al-Khalidi",
    membership_id: "JBA-5312",
    practice_areas: ["labor", "court_procedures"],
    governorates: ["Zarqa"],
    years_experience: 5,
    submitted_at: "2026-05-10T09:00:00",
    documents: ["national_id", "jba_membership", "degree_certificate"],
    status: "pending" as const,
  },
  {
    id: "lawyer-007",
    name_ar: "ماجد حسين اللحام",
    name_en: "Majd Hussein Al-Lahham",
    membership_id: "JBA-7534",
    practice_areas: ["cybercrime", "debt"],
    governorates: ["Irbid", "Mafraq"],
    years_experience: 3,
    submitted_at: "2026-05-12T14:30:00",
    documents: ["national_id", "jba_membership"],
    status: "pending" as const,
  },
  {
    id: "lawyer-008",
    name_ar: "دانا رائد الشامي",
    name_en: "Dana Raed Al-Shami",
    membership_id: "JBA-8645",
    practice_areas: ["small_business", "labor"],
    governorates: ["Amman"],
    years_experience: 2,
    submitted_at: "2026-05-14T11:15:00",
    documents: ["national_id"],
    status: "pending" as const,
  },
];

const documentLabels: Record<string, { ar: string; en: string }> = {
  national_id: { ar: "بطاقة الهوية الوطنية", en: "National ID" },
  jba_membership: { ar: "عضوية نقابة المحامين", en: "Bar Association Membership" },
  degree_certificate: { ar: "شهادة التخرج", en: "Degree Certificate" },
  bio_ar: { ar: "السيرة الذاتية بالعربية", en: "Arabic Bio" },
  bio_en: { ar: "السيرة الذاتية بالإنجليزية", en: "English Bio" },
};

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

export default function LawyerVerificationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [queue, setQueue] = useState(mockVerifications);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  const handleApprove = (id: string) => {
    setQueue((prev) => prev.filter((v) => v.id !== id));
  };

  const handleReject = (id: string) => {
    setQueue((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <a href={nav("/lawyers")} className="hover:text-white">{locale === "ar" ? "المحامون" : "Lawyers"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "تحقق" : "Verification"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "طلبات تحقق المحامين" : "Lawyer Verification Queue"}</h1>
        <p className="text-sm text-gray-300 mt-1">
          {queue.length} {locale === "ar" ? "طلبات بانتظار المراجعة" : "applications pending review"}
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {queue.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-100 shadow-sm text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-lg font-medium text-navy">{locale === "ar" ? "لا توجد طلبات معلقة" : "No pending applications"}</p>
          </div>
        )}

        {queue.map((app) => (
          <div key={app.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-navy text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {app.name_en.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-lg">{locale === "ar" ? app.name_ar : app.name_en}</h3>
                    <p className="text-sm text-muted">{app.membership_id}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    {locale === "ar" ? "قيد المراجعة" : "Under Review"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      {locale === "ar" ? "المجالات المهنية" : "Practice Areas"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {app.practice_areas.map((area) => (
                        <span key={area} className={`px-2 py-0.5 rounded text-xs font-medium ${practiceAreaColors[area]}`}>
                          {locale === "ar" ? practiceAreaLabels[area]?.ar : practiceAreaLabels[area]?.en}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      {locale === "ar" ? "المحافظات" : "Governorates"}
                    </p>
                    <p className="text-sm text-gray-700">{app.governorates.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      {locale === "ar" ? "سنوات الخبرة" : "Years of Experience"}
                    </p>
                    <p className="text-sm text-gray-700">{app.years_experience} {locale === "ar" ? "سنوات" : "years"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      {locale === "ar" ? "تاريخ التقديم" : "Submission Date"}
                    </p>
                    <p className="text-sm text-gray-700">
                      {new Date(app.submitted_at).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">
                    {locale === "ar" ? "المستندات المرفقة" : "Submitted Documents"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {app.documents.map((doc) => (
                      <div key={doc} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                        <span>✓</span>
                        {locale === "ar" ? documentLabels[doc]?.ar : documentLabels[doc]?.en}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-72 shrink-0">
                <label className="text-xs text-muted uppercase tracking-wider mb-1 block">
                  {locale === "ar" ? "ملاحظات المراجعة" : "Review Notes"}
                </label>
                <textarea
                  value={notes[app.id] || ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [app.id]: e.target.value }))}
                  placeholder={locale === "ar" ? "أضف ملاحظات..." : "Add notes..."}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30 h-20 resize-none mb-3"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleApprove(app.id)}
                    className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    {locale === "ar" ? "اعتماد المحامي" : "Approve Lawyer"}
                  </button>
                  <button
                    onClick={() => handleReject(app.id)}
                    className="w-full px-4 py-2.5 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors"
                  >
                    {locale === "ar" ? "رفض الطلب" : "Reject Application"}
                  </button>
                  <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    {locale === "ar" ? "طلب مستندات إضافية" : "Request Additional Documents"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
