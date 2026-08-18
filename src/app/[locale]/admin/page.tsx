"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";
import { topics } from "@/lib/topics-data";

type TabKey =
  | "dashboard"
  | "topics"
  | "review-queue"
  | "users"
  | "roles"
  | "lawyers"
  | "verification"
  | "legal-sources"
  | "rag"
  | "documents"
  | "ingestion"
  | "privacy"
  | "consents"
  | "requests"
  | "audit"
  | "analytics"
  | "flags"
  | "settings";

const tabs: { key: TabKey; ar: string; en: string; group: string }[] = [
  { key: "dashboard", ar: "الرئيسية", en: "Dashboard", group: "overview" },
  { key: "topics", ar: "المواضيع", en: "Topics", group: "content" },
  { key: "review-queue", ar: "قائمة المراجعة", en: "Review Queue", group: "content" },
  { key: "legal-sources", ar: "المصادر القانونية", en: "Legal Sources", group: "content" },
  { key: "users", ar: "المستخدمون", en: "Users", group: "people" },
  { key: "roles", ar: "الأدوار", en: "Roles", group: "people" },
  { key: "lawyers", ar: "المحامون", en: "Lawyers", group: "people" },
  { key: "verification", ar: "تحقق المحامين", en: "Verification", group: "people" },
  { key: "rag", ar: "نظام RAG", en: "RAG System", group: "system" },
  { key: "documents", ar: "المستندات", en: "Documents", group: "system" },
  { key: "ingestion", ar: "مهام المعالجة", en: "Ingestion Jobs", group: "system" },
  { key: "privacy", ar: "الخصوصية", en: "Privacy", group: "compliance" },
  { key: "consents", ar: "الموافقات", en: "Consents", group: "compliance" },
  { key: "requests", ar: "طلبات الخصوصية", en: "Privacy Requests", group: "compliance" },
  { key: "audit", ar: "سجلات التدقيق", en: "Audit Logs", group: "compliance" },
  { key: "analytics", ar: "التحليلات", en: "Analytics", group: "insights" },
  { key: "flags", ar: "أعلام الميزات", en: "Feature Flags", group: "insights" },
  { key: "settings", ar: "الإعدادات", en: "Settings", group: "insights" },
];

const groups: Record<string, { ar: string; en: string }> = {
  overview: { ar: "نظرة عامة", en: "Overview" },
  content: { ar: "المحتوى", en: "Content" },
  people: { ar: "الأشخاص", en: "People" },
  system: { ar: "النظام", en: "System" },
  compliance: { ar: "الامتثال", en: "Compliance" },
  insights: { ar: "الرؤى", en: "Insights" },
};

interface Stats {
  totalTopics: number;
  pendingReviews: number;
  totalLawyers: number;
  pendingVerifications: number;
  unansweredQuestions: number;
  activeUsers: number;
}

export default function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [stats, setStats] = useState<Stats>({
    totalTopics: 0,
    pendingReviews: 0,
    totalLawyers: 0,
    pendingVerifications: 0,
    unansweredQuestions: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    params.then(({ locale: loc }) => {
      setLocale(loc as Locale);
    });
  }, [params]);

  useEffect(() => {
    const totalTopics = topics.length;
    const pendingReviews = topics.filter((t) => {
      const lastReviewed = new Date(t.last_reviewed);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return lastReviewed < threeMonthsAgo;
    }).length;
    setStats({
      totalTopics,
      pendingReviews,
      totalLawyers: 15,
      pendingVerifications: 3,
      unansweredQuestions: 0,
      activeUsers: 0,
    });
  }, []);

  const navLink = (key: TabKey) => {
    if (key === "dashboard") return `/admin`;
    if (key === "topics") return `/admin/topics`;
    if (key === "review-queue") return `/admin/topics/review-queue`;
    if (key === "legal-sources") return `/admin/legal-sources`;
    if (key === "users") return `/admin/users`;
    if (key === "roles") return `/admin/roles`;
    if (key === "lawyers") return `/admin/lawyers`;
    if (key === "verification") return `/admin/lawyers/verification`;
    if (key === "rag") return `/admin/rag`;
    if (key === "documents") return `/admin/rag/documents`;
    if (key === "ingestion") return `/admin/rag/ingestion-jobs`;
    if (key === "privacy") return `/admin/privacy`;
    if (key === "consents") return `/admin/privacy/consents`;
    if (key === "requests") return `/admin/privacy/requests`;
    if (key === "audit") return `/admin/audit-logs`;
    if (key === "analytics") return `/admin/analytics`;
    if (key === "flags") return `/admin/feature-flags`;
    if (key === "settings") return `/admin/settings`;
    return `/admin`;
  };

  const groupedTabs = tabs.reduce<Record<string, typeof tabs>>((acc, tab) => {
    if (!acc[tab.group]) acc[tab.group] = [];
    acc[tab.group].push(tab);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            {locale === "ar" ? "لوحة التحكم - المشرف العام" : "Super Admin Console"}
          </h1>
          <p className="text-sm text-gray-300">
            {locale === "ar" ? "اسأل وكيلي" : "Ask Wakeely Pro"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-accent px-3 py-1 rounded-full font-medium">
            {locale === "ar" ? "مشرف عام" : "Super Admin"}
          </span>
          <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
            SA
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-[1600px] mx-auto px-4">
          {Object.entries(groupedTabs).map(([groupKey, groupTabs]) => (
            <div key={groupKey} className="flex items-center">
              <span className="text-[10px] uppercase tracking-wider text-muted px-2 py-3 font-semibold whitespace-nowrap">
                {locale === "ar" ? groups[groupKey].ar : groups[groupKey].en}
              </span>
              {groupTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-accent text-navy"
                      : "border-transparent text-muted hover:text-text"
                  }`}
                >
                  {locale === "ar" ? tab.ar : tab.en}
                </button>
              ))}
            </div>
          ))}
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy">
              {locale === "ar" ? "نظرة عامة على المنصة" : "Platform Overview"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: locale === "ar" ? "إجمالي المواضيع" : "Total Topics",
                  value: stats.totalTopics,
                  color: "bg-navy",
                  textColor: "text-navy",
                  icon: "📚",
                },
                {
                  label: locale === "ar" ? "مراجعات معلقة" : "Pending Reviews",
                  value: stats.pendingReviews,
                  color: "bg-amber-50",
                  textColor: "text-amber-600",
                  icon: "⏳",
                },
                {
                  label: locale === "ar" ? "إجمالي المحامين" : "Total Lawyers",
                  value: stats.totalLawyers,
                  color: "bg-teal/10",
                  textColor: "text-teal",
                  icon: "👨‍⚖️",
                },
                {
                  label: locale === "ar" ? "تحقق معلق" : "Pending Verifications",
                  value: stats.pendingVerifications,
                  color: "bg-rose-50",
                  textColor: "text-rose-600",
                  icon: "🔍",
                },
                {
                  label: locale === "ar" ? "أسئلة غير مُجابة" : "Unanswered Questions",
                  value: stats.unansweredQuestions,
                  color: "bg-orange-50",
                  textColor: "text-orange-600",
                  icon: "❓",
                },
                {
                  label: locale === "ar" ? "مستخدمون نشطون" : "Active Users",
                  value: stats.activeUsers.toLocaleString(),
                  color: "bg-emerald-50",
                  textColor: "text-emerald-600",
                  icon: "👥",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`${card.color} rounded-xl p-5 border border-gray-100 shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{card.icon}</span>
                    <span className={`text-3xl font-bold ${card.textColor}`}>
                      {card.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-2 font-medium">{card.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-navy mb-4">
                  {locale === "ar" ? "آخر النشاطات" : "Recent Activity"}
                </h3>
                <div className="space-y-3">
                  {[
                    { time: "2 min ago", action: locale === "ar" ? "تمت مراجعة موضوع 'استرداد التأمين'" : "Topic 'Security Deposit' reviewed", color: "bg-emerald-500" },
                    { time: "15 min ago", action: locale === "ar" ? "محامٍ جديد قدم طلب تحقق" : "New lawyer submitted verification", color: "bg-blue-500" },
                    { time: "1 hour ago", action: locale === "ar" ? "تم نشر 3 مواضيع" : "3 topics published", color: "bg-teal-500" },
                    { time: "2 hours ago", action: locale === "ar" ? "تم رفض طلب تحقق" : "Verification request rejected", color: "bg-red-500" },
                    { time: "3 hours ago", action: locale === "ar" ? "تم تحديث إعدادات المنصة" : "Platform settings updated", color: "bg-amber-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${item.color} shrink-0`} />
                      <div>
                        <p className="text-sm text-text">{item.action}</p>
                        <p className="text-xs text-muted">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-navy mb-4">
                  {locale === "ar" ? "المجالات الأكثر استخداماً" : "Top Practice Areas"}
                </h3>
                <div className="space-y-3">
                  {[
                    { area: locale === "ar" ? "قانون العمل" : "Labor Law", pct: 28, color: "bg-navy" },
                    { area: locale === "ar" ? "الإيجار والعقارات" : "Rent & Real Estate", pct: 22, color: "bg-teal" },
                    { area: locale === "ar" ? "الأحوال الشخصية" : "Family Law", pct: 18, color: "bg-gold" },
                    { area: locale === "ar" ? "الديون والتحصيل" : "Debt & Enforcement", pct: 15, color: "bg-amber-500" },
                    { area: locale === "ar" ? "المرور" : "Traffic", pct: 10, color: "bg-blue-500" },
                    { area: locale === "ar" ? "الجرائم الإلكترونية" : "Cybercrime", pct: 7, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.area}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.area}</span>
                        <span className="text-muted">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "حالة النظام" : "System Health"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: locale === "ar" ? "حالة الخادم" : "Server Status", value: "OK", color: "text-emerald-600 bg-emerald-50" },
                  { label: locale === "ar" ? "قاعدة البيانات" : "Database", value: "OK", color: "text-emerald-600 bg-emerald-50" },
                  { label: locale === "ar" ? "نظام RAG" : "RAG System", value: "OK", color: "text-emerald-600 bg-emerald-50" },
                  { label: locale === "ar" ? "آخر نسخ احتياطي" : "Last Backup", value: "2h ago", color: "text-navy bg-navy/5" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "dashboard" && (
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
            <p className="text-muted text-lg">
              {locale === "ar" ? "جهزنا لك هذه الصفحة" : "Page content is loaded via separate routes"}
            </p>
            <p className="text-sm text-muted mt-2">
              {locale === "ar" ? "استخدم الروابط أعلاه للتنقل" : "Use the navigation above to navigate"}
            </p>
            <a
              href={`/${locale}${navLink(activeTab)}`}
              className="inline-block mt-4 px-5 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
            >
              {locale === "ar" ? "فتح الصفحة" : "Open Page"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
