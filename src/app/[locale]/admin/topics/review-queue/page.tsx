"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockReviewQueue = [
  {
    slug: "child-custody",
    title_ar: "حضانة الأطفال",
    title_en: "Child Custody",
    practice_area: "family",
    submittedBy: "Ahmad Al-Khatib",
    submittedAt: "2026-05-14T10:30:00",
    changes_ar: "تم تحديث المصادر القانونية وإضافة معلومات جديدة حول حقوق الحضانة",
    changes_en: "Updated legal sources and added new information about custody rights",
    version: 2,
    priority: "high",
  },
  {
    slug: "debt-collection",
    title_ar: "تحصيل الديون",
    title_en: "Debt Collection",
    practice_area: "debt",
    submittedBy: "Norhan Al-Omousi",
    submittedAt: "2026-05-13T14:15:00",
    changes_ar: "إضافة قسم جديد حول آليات التحصيل القانوني",
    changes_en: "Added new section on legal collection mechanisms",
    version: 1,
    priority: "medium",
  },
  {
    slug: "small-business-setup",
    title_ar: "تأسيس أعمال صغيرة",
    title_en: "Small Business Setup",
    practice_area: "small_business",
    submittedBy: "Rima Al-Qudah",
    submittedAt: "2026-05-12T09:00:00",
    changes_ar: "مراجعة شاملة للمحتوى وتحديث الإجراءات الحكومية",
    changes_en: "Full content review and updated government procedures",
    version: 1,
    priority: "high",
  },
  {
    slug: "eviction-process",
    title_ar: "إجراءات الإخلاء",
    title_en: "Eviction Process",
    practice_area: "rent",
    submittedBy: "Khaled Al-Sarayrah",
    submittedAt: "2026-05-11T16:45:00",
    changes_ar: "تحديث المواعيد النهائية وإضافة نماذج المحاكم",
    changes_en: "Updated deadlines and added court forms",
    version: 3,
    priority: "medium",
  },
  {
    slug: "court-filing",
    title_ar: "تقديم الدعاوى",
    title_en: "Court Filing",
    practice_area: "court_procedures",
    submittedBy: "Ahmad Al-Khatib",
    submittedAt: "2026-05-10T11:20:00",
    changes_ar: "إنشاء مسودة أولية للإجراءات",
    changes_en: "Created initial draft of procedures",
    version: 1,
    priority: "low",
  },
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

const priorityColors: Record<string, string> = {
  high: "bg-rose-100 text-rose-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-gray-100 text-gray-600",
};

const priorityLabels: Record<string, { ar: string; en: string }> = {
  high: { ar: "عالية", en: "High" },
  medium: { ar: "متوسطة", en: "Medium" },
  low: { ar: "منخفضة", en: "Low" },
};

export default function ReviewQueuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [queue, setQueue] = useState(mockReviewQueue);

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  const handleApprove = (slug: string) => {
    setQueue((prev) => prev.filter((item) => item.slug !== slug));
  };

  const handleReject = (slug: string) => {
    setQueue((prev) => prev.filter((item) => item.slug !== slug));
  };

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <a href={nav("/topics")} className="hover:text-white">{locale === "ar" ? "المواضيع" : "Topics"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "قائمة المراجعة" : "Review Queue"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "قائمة المراجعة" : "Review Queue"}</h1>
        <p className="text-sm text-gray-300 mt-1">
          {queue.length} {locale === "ar" ? "مواضيع بانتظار المراجعة" : "topics awaiting review"}
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-4">
        {queue.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-100 shadow-sm text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-lg font-medium text-navy">{locale === "ar" ? "لا توجد مواضيع بانتظار المراجعة" : "No topics in review queue"}</p>
            <p className="text-sm text-muted mt-1">{locale === "ar" ? "جميع المواضيع تمت مراجعتها" : "All topics have been reviewed"}</p>
          </div>
        )}

        {queue.map((item) => (
          <div key={item.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-navy text-lg">
                    {locale === "ar" ? item.title_ar : item.title_en}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal/10 text-teal">
                    {locale === "ar" ? practiceAreaLabels[item.practice_area]?.ar : practiceAreaLabels[item.practice_area]?.en}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
                    {locale === "ar" ? priorityLabels[item.priority]?.ar : priorityLabels[item.priority]?.en}
                  </span>
                </div>
                <p className="text-sm text-muted mt-2">
                  {locale === "ar" ? "التغييرات:" : "Changes:"} {locale === "ar" ? item.changes_ar : item.changes_en}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                  <span>{locale === "ar" ? "قدمه:" : "Submitted by:"} <span className="text-gray-700 font-medium">{item.submittedBy}</span></span>
                  <span>{locale === "ar" ? "الإصدار:" : "Version:"} <span className="text-gray-700 font-medium">v{item.version}</span></span>
                  <span>{new Date(item.submittedAt).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US")}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={`/${locale}/topics/${item.slug}`}
                  className="px-4 py-2 bg-navy/5 text-navy rounded-lg text-sm font-medium hover:bg-navy/10 transition-colors"
                >
                  {locale === "ar" ? "معاينة" : "Preview"}
                </a>
                <button
                  onClick={() => handleApprove(item.slug)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  {locale === "ar" ? "اعتماد" : "Approve"}
                </button>
                <button
                  onClick={() => handleReject(item.slug)}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors"
                >
                  {locale === "ar" ? "رفض" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
