"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";
import { topics } from "@/lib/topics-data";

interface TopicRow {
  slug: string;
  title_ar: string;
  title_en: string;
  practice_area: string;
  status: "draft" | "pending_review" | "approved" | "published";
  version: number;
  lastReviewed: string;
  needsReview: boolean;
  questions: number;
}

const mockTopics: TopicRow[] = topics.map((t) => ({
  slug: t.slug,
  title_ar: t.title_ar,
  title_en: t.title_en,
  practice_area: t.practice_area,
  status: "published" as const,
  version: t.versions?.[t.versions.length - 1]?.version ?? 1,
  lastReviewed: t.last_reviewed,
  needsReview: false,
  questions: (t.user_questions_ar?.length ?? 0) + (t.key_facts_ar?.length ?? 0),
}));

const practiceAreaColors: Record<string, string> = {
  labor: "bg-blue-100 text-blue-700",
  rent: "bg-teal/10 text-teal",
  family: "bg-purple-100 text-purple-700",
  debt: "bg-amber-100 text-amber-700",
  traffic: "bg-orange-100 text-orange-700",
  cybercrime: "bg-rose-100 text-rose-700",
  small_business: "bg-emerald-100 text-emerald-700",
  court_procedures: "bg-gray-100 text-gray-700",
  civil_law: "bg-indigo-100 text-indigo-700",
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  pending_review: "bg-amber-100 text-amber-700",
  approved: "bg-blue-100 text-blue-700",
  published: "bg-emerald-100 text-emerald-700",
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  draft: { ar: "مسودة", en: "Draft" },
  pending_review: { ar: "بانتظار المراجعة", en: "Pending Review" },
  approved: { ar: "معتمد", en: "Approved" },
  published: { ar: "منشور", en: "Published" },
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
  civil_law: { ar: "القانون المدني", en: "Civil Law" },
};

export default function TopicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockTopics.filter((t) => {
    const matchSearch = search === "" || t.title_ar.includes(search) || t.title_en.toLowerCase().includes(search.toLowerCase());
    const matchArea = filterArea === "all" || t.practice_area === filterArea;
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchArea && matchStatus;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "المواضيع" : "Topics"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة المواضيع القانونية" : "Legal Topics Management"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder={locale === "ar" ? "بحث عن موضوع..." : "Search topics..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 w-64"
          />
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع المجالات" : "All Areas"}</option>
            {Object.entries(practiceAreaLabels).map(([k, v]) => (
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
          <div className="mr-auto text-sm text-muted">
            {filtered.length} {locale === "ar" ? "نتيجة" : "results"}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الموضوع" : "Topic"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المجال" : "Area"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الإصدار" : "Version"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "آخر مراجعة" : "Last Reviewed"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الأسئلة" : "Questions"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((topic) => (
                  <tr key={topic.slug} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <a
                        href={`/${locale}/topics/${topic.slug}`}
                        className="text-navy font-medium hover:underline"
                      >
                        {locale === "ar" ? topic.title_ar : topic.title_en}
                      </a>
                      {topic.needsReview && (
                        <span className="mr-2 inline-block w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${practiceAreaColors[topic.practice_area]}`}>
                        {locale === "ar" ? practiceAreaLabels[topic.practice_area]?.ar : practiceAreaLabels[topic.practice_area]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[topic.status]}`}>
                        {locale === "ar" ? statusLabels[topic.status]?.ar : statusLabels[topic.status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">v{topic.version}</td>
                    <td className="px-4 py-3 text-muted">{topic.lastReviewed}</td>
                    <td className="px-4 py-3 text-muted">{topic.questions}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <a
                          href={`/${locale}/topics/${topic.slug}`}
                          className="px-3 py-1 bg-navy/5 text-navy rounded text-xs font-medium hover:bg-navy/10 transition-colors"
                        >
                          {locale === "ar" ? "عرض" : "View"}
                        </a>
                        <a
                          href={nav(`/topics/review-queue`)}
                          className="px-3 py-1 bg-gold/10 text-gold rounded text-xs font-medium hover:bg-gold/20 transition-colors"
                        >
                          {locale === "ar" ? "مراجعة" : "Review"}
                        </a>
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
