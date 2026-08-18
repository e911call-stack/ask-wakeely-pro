"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

export default function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [activeSection, setActiveSection] = useState<"branding" | "disclaimers" | "retention" | "integrations">("branding");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  const sections = [
    { key: "branding" as const, ar: "العلامة التجارية", en: "Branding", icon: "🎨" },
    { key: "disclaimers" as const, ar: "التنبيهات", en: "Disclaimers", icon: "⚠️" },
    { key: "retention" as const, ar: "سياسات الاحتفاظ", en: "Retention Policies", icon: "🗄️" },
    { key: "integrations" as const, ar: "التكاملات", en: "Integrations", icon: "🔗" },
  ];

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "الإعدادات" : "Settings"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إعدادات المنصة" : "Platform Settings"}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.key
                  ? "bg-navy text-white"
                  : "bg-white text-muted border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{section.icon}</span>
              {locale === "ar" ? section.ar : section.en}
            </button>
          ))}
        </div>

        {activeSection === "branding" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "الاسم والشعار" : "Name & Logo"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "اسم المنصة (عربي)" : "Platform Name (Arabic)"}
                  </label>
                  <input
                    type="text"
                    defaultValue="اسأل وكيلي"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "اسم المنصة (إنجليزي)" : "Platform Name (English)"}
                  </label>
                  <input
                    type="text"
                    defaultValue="Ask Wakeely Pro"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "الشعار" : "Logo"}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center text-white text-lg font-bold">
                      W
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      {locale === "ar" ? "تغيير الشعار" : "Change Logo"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "الشعار الفرعي" : "Tagline"}
                  </label>
                  <input
                    type="text"
                    defaultValue={locale === "ar" ? "منصة معرفة قانونية أردنية" : "Jordanian Legal Knowledge Platform"}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "الألوان" : "Colors"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Navy", name_ar: "كحلي", value: "#0B1F3A" },
                  { name: "Teal", name_ar: "تركواز", value: "#0E6268" },
                  { name: "Gold", name_ar: "ذهبي", value: "#C69214" },
                  { name: "White", name_ar: "أبيض", value: "#FFFFFF" },
                ].map((color) => (
                  <div key={color.name}>
                    <div
                      className="w-full h-16 rounded-lg border border-gray-200 mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    <p className="text-sm font-medium text-gray-700">{locale === "ar" ? color.name_ar : color.name}</p>
                    <p className="text-xs text-muted font-mono">{color.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "disclaimers" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "التنبيه القانوني الرئيسي" : "Main Legal Disclaimer"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "التنبيه بالعربية" : "Disclaimer (Arabic)"}
                  </label>
                  <textarea
                    defaultValue="هذه معلومات قانونية عامة وليست استشارة قانونية. قد تختلف النتيجة حسب الوقائع والمستندات. يجب استشارة محامٍ مختص للحصول على نصيحة قانونية مخصصة لحالتك."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30 h-24 resize-none"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "التنبيه بالإنجليزية" : "Disclaimer (English)"}
                  </label>
                  <textarea
                    defaultValue="This is general legal information, not legal advice. The outcome may vary depending on the facts and available documents. You should consult a qualified lawyer for advice specific to your situation."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30 h-24 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "تنبيه الخصوصية" : "Privacy Reminder"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "رسالة الخصوصية" : "Privacy Message"}
                  </label>
                  <textarea
                    defaultValue="لا تشارك رقمك الوطني أو صور هويتك أو مستندات حساسة في المحادثة."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30 h-16 resize-none"
                    dir="rtl"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy focus:ring-navy" />
                  <span className="text-sm text-gray-700">
                    {locale === "ar" ? "إظهار تنبيه الخصوصية في المحادثة" : "Show privacy reminder in chat"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "retention" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "سياسات الاحتفاظ بالبيانات" : "Data Retention Policies"}
              </h3>
              <div className="space-y-4">
                {[
                  { label: locale === "ar" ? "سجل المحادثات" : "Chat History", value: "90", unit: locale === "ar" ? "يوم" : "days" },
                  { label: locale === "ar" ? "بيانات المستخدمين" : "User Data", value: "365", unit: locale === "ar" ? "يوم" : "days" },
                  { label: locale === "ar" ? "سجلات التدقيق" : "Audit Logs", value: "730", unit: locale === "ar" ? "يوم" : "days" },
                  { label: locale === "ar" ? "بيانات التحليلات" : "Analytics Data", value: "365", unit: locale === "ar" ? "يوم" : "days" },
                  { label: locale === "ar" ? "طلبات الخصوصية" : "Privacy Requests", value: "1825", unit: locale === "ar" ? "يوم" : "days" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={item.value}
                        className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/30 text-center"
                      />
                      <span className="text-sm text-muted">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "الحذف التلقائي" : "Automatic Deletion"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy focus:ring-navy" />
                  <span className="text-sm text-gray-700">
                    {locale === "ar" ? "حذف تلقائي للمحادثات المنتهية" : "Auto-delete ended chat sessions"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-navy focus:ring-navy" />
                  <span className="text-sm text-gray-700">
                    {locale === "ar" ? "تنبيه قبل الحذف" : "Send notification before deletion"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-navy focus:ring-navy" />
                  <span className="text-sm text-gray-700">
                    {locale === "ar" ? "الاحتفاظ بالبيانات المؤرشفة" : "Keep archived data indefinitely"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "integrations" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "تكاملات الذكاء الاصطناعي" : "AI Integrations"}
              </h3>
              <div className="space-y-4">
                {[
                  { name: "OpenAI", status: "active", key_set: true },
                  { name: "Pinecone", status: "active", key_set: true },
                  { name: "LangChain", status: "active", key_set: true },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                        {integration.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{integration.name}</p>
                        <p className="text-xs text-muted">
                          {integration.key_set
                            ? (locale === "ar" ? "المفتاح مضبوط" : "API key configured")
                            : (locale === "ar" ? "المفتاح غير مضبوط" : "API key not set")}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      integration.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {integration.status === "active"
                        ? (locale === "ar" ? "نشط" : "Active")
                        : (locale === "ar" ? "غير نشط" : "Inactive")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">
                {locale === "ar" ? "تكاملات أخرى" : "Other Integrations"}
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Google Analytics", name_ar: "تحليلات جوجل", status: "active" },
                  { name: "Sentry", status: "active" },
                  { name: "SendGrid (Email)", name_ar: "SendGrid (بريد)", status: "inactive" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                        {integration.name[0]}
                      </div>
                      <p className="text-sm font-medium text-gray-700">{locale === "ar" && integration.name_ar ? integration.name_ar : integration.name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      integration.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {integration.status === "active"
                        ? (locale === "ar" ? "نشط" : "Active")
                        : (locale === "ar" ? "غير نشط" : "Inactive")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            {locale === "ar" ? "إعادة تعيين" : "Reset"}
          </button>
          <button className="px-6 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors">
            {locale === "ar" ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
