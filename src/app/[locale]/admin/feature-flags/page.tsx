"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockFlags = [
  { id: "f1", key: "ai_assistant_enabled", name_ar: "المساعد القانوني AI", name_en: "AI Legal Assistant", description_ar: "تفعيل المساعد القانوني الذكي للمستخدمين", description_en: "Enable AI legal assistant for users", enabled: true, category: "core", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-05-14" },
  { id: "f2", key: "lawyer_directory", name_ar: "دليل المحامين", name_en: "Lawyer Directory", description_ar: "عرض دليل المحامين المسجلين", description_en: "Show registered lawyer directory", enabled: true, category: "core", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-05-10" },
  { id: "f3", key: "infographic_generation", name_ar: "إنشاء إنفوغرافيك", name_en: "Infographic Generation", description_ar: "تفعيل إنشاء إنفوغرافيك للإجابات", description_en: "Enable infographic generation for answers", enabled: true, category: "ai", updatedBy: "Norhan Al-Omousi", updatedAt: "2026-05-12" },
  { id: "f4", key: "multi_language_support", name_ar: "دعم متعدد اللغات", name_en: "Multi-Language Support", description_ar: "تفعيل الدعم للعربية والإنجليزية", description_en: "Enable Arabic and English support", enabled: true, category: "core", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-01-15" },
  { id: "f5", key: "analytics_dashboard", name_ar: "لوحة تحليلات المستخدم", name_en: "User Analytics Dashboard", description_ar: "عرض لوحة التحليلات للمستخدمين", description_en: "Show analytics dashboard to users", enabled: false, category: "analytics", updatedBy: "Sami Mansour", updatedAt: "2026-04-20" },
  { id: "f6", key: "email_notifications", name_ar: "إشعارات البريد الإلكتروني", name_en: "Email Notifications", description_ar: "إرسال إشعارات عبر البريد الإلكتروني", description_en: "Send notifications via email", enabled: true, category: "notifications", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-03-01" },
  { id: "f7", key: "push_notifications", name_ar: "الإشعارات الفورية", name_en: "Push Notifications", description_ar: "إرسال إشعارات فورية للمستخدمين", description_en: "Send push notifications to users", enabled: false, category: "notifications", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-02-15" },
  { id: "f8", key: "advanced_search", name_ar: "بحث متقدم", name_en: "Advanced Search", description_ar: "تفعيل البحث المتقدم في المواضيع", description_en: "Enable advanced search in topics", enabled: true, category: "search", updatedBy: "Norhan Al-Omousi", updatedAt: "2026-04-01" },
  { id: "f9", key: "dark_mode", name_ar: "الوضع الداكن", name_en: "Dark Mode", description_ar: "تفعيل الوضع الداكن للموقع", description_en: "Enable dark mode for the site", enabled: false, category: "ui", updatedBy: "Rima Al-Qudah", updatedAt: "2026-05-01" },
  { id: "f10", key: "export_chat_history", name_ar: "تصدير سجل المحادثة", name_en: "Export Chat History", description_ar: "السماح للمستخدمين بتصدير سجل المحادثة", description_en: "Allow users to export chat history", enabled: false, category: "user", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-05-10" },
  { id: "f11", key: "rate_limiting", name_ar: "تحديد المعدل", name_en: "Rate Limiting", description_ar: "تفعيل تحديد معدل الطلبات", description_en: "Enable request rate limiting", enabled: true, category: "security", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-01-15" },
  { id: "f12", key: "maintenance_mode", name_ar: "وضع الصيانة", name_en: "Maintenance Mode", description_ar: "تفعيل وضع الصيانة للمنصة", description_en: "Enable platform maintenance mode", enabled: false, category: "system", updatedBy: "Ahmad Al-Khatib", updatedAt: "2026-05-15" },
];

const categoryLabels: Record<string, { ar: string; en: string; color: string }> = {
  core: { ar: "أساسي", en: "Core", color: "bg-navy/10 text-navy" },
  ai: { ar: "ذكاء اصطناعي", en: "AI", color: "bg-purple-100 text-purple-700" },
  analytics: { ar: "تحليلات", en: "Analytics", color: "bg-blue-100 text-blue-700" },
  notifications: { ar: "إشعارات", en: "Notifications", color: "bg-amber-100 text-amber-700" },
  search: { ar: "بحث", en: "Search", color: "bg-teal/10 text-teal" },
  ui: { ar: "واجهة المستخدم", en: "UI", color: "bg-rose-100 text-rose-700" },
  user: { ar: "المستخدم", en: "User", color: "bg-emerald-100 text-emerald-700" },
  security: { ar: "أمان", en: "Security", color: "bg-gray-100 text-gray-600" },
  system: { ar: "نظام", en: "System", color: "bg-orange-100 text-orange-700" },
};

export default function FeatureFlagsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [flags, setFlags] = useState(mockFlags);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const filtered = flags.filter((f) => filterCategory === "all" || f.category === filterCategory);

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "أعلام الميزات" : "Feature Flags"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة أعلام الميزات" : "Feature Flags Management"}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الفئات" : "All Categories"}</option>
            {Object.entries(categoryLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <div className="mr-auto text-sm text-muted">
            {filtered.filter((f) => f.enabled).length} / {filtered.length} {locale === "ar" ? "مفعّل" : "enabled"}
          </div>
          <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors">
            {locale === "ar" ? "إضافة ميزة جديدة" : "Add New Flag"}
          </button>
        </div>

        <div className="space-y-3">
          {filtered.map((flag) => (
            <div key={flag.id} className={`bg-white rounded-xl border p-5 transition-all ${flag.enabled ? "border-emerald-200 shadow-sm" : "border-gray-100"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy text-sm">{locale === "ar" ? flag.name_ar : flag.name_en}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryLabels[flag.category]?.color}`}>
                      {locale === "ar" ? categoryLabels[flag.category]?.ar : categoryLabels[flag.category]?.en}
                    </span>
                    <code className="text-[10px] text-muted font-mono bg-gray-50 px-1.5 py-0.5 rounded">{flag.key}</code>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    {locale === "ar" ? flag.description_ar : flag.description_en}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                    <span>{locale === "ar" ? "آخر تعديل:" : "Updated by:"} {flag.updatedBy}</span>
                    <span>{flag.updatedAt}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                    flag.enabled ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      flag.enabled ? "translate-x-6 rtl:-translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
