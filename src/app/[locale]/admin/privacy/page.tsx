"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const consentStats = {
  totalUsers: 1842,
  analyticsConsent: 1534,
  marketingConsent: 987,
  thirdPartyConsent: 1123,
  dataRetentionConsent: 1842,
};

const recentRequests = [
  { id: "pr-001", type: "access", user: "Ahmad Al-Khatib", email: "ahmad@example.jo", submitted: "2026-05-14", status: "pending" as const },
  { id: "pr-002", type: "erasure", user: "Omar Bani Hani", email: "omar@example.jo", submitted: "2026-05-13", status: "processing" as const },
  { id: "pr-003", type: "correction", user: "Fatima Darwish", email: "fatima@example.jo", submitted: "2026-05-12", status: "completed" as const },
  { id: "pr-004", type: "export", user: "Lina Shammout", email: "lina@example.jo", submitted: "2026-05-11", status: "pending" as const },
];

const requestTypeLabels: Record<string, { ar: string; en: string; color: string }> = {
  access: { ar: "وصول", en: "Access", color: "bg-blue-100 text-blue-700" },
  correction: { ar: "تصحيح", en: "Correction", color: "bg-amber-100 text-amber-700" },
  erasure: { ar: "حذف", en: "Erasure", color: "bg-rose-100 text-rose-700" },
  export: { ar: "تصدير", en: "Export", color: "bg-purple-100 text-purple-700" },
  restriction: { ar: "تقييد", en: "Restriction", color: "bg-gray-100 text-gray-600" },
  objection: { ar: "اعتراض", en: "Objection", color: "bg-orange-100 text-orange-700" },
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  pending: { ar: "معلق", en: "Pending" },
  processing: { ar: "قيد المعالجة", en: "Processing" },
  completed: { ar: "مكتمل", en: "Completed" },
  rejected: { ar: "مرفوض", en: "Rejected" },
};

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "الخصوصية" : "Privacy"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "نظرة عامة على الخصوصية" : "Privacy Overview"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: locale === "ar" ? "إجمالي المستخدمين" : "Total Users", value: consentStats.totalUsers.toLocaleString(), color: "text-navy", bg: "bg-navy/5" },
            { label: locale === "ar" ? "موافقة التحليلات" : "Analytics Consent", value: consentStats.analyticsConsent.toLocaleString(), pct: Math.round((consentStats.analyticsConsent / consentStats.totalUsers) * 100), color: "text-blue-600", bg: "bg-blue-50" },
            { label: locale === "ar" ? "موافقة التسويق" : "Marketing Consent", value: consentStats.marketingConsent.toLocaleString(), pct: Math.round((consentStats.marketingConsent / consentStats.totalUsers) * 100), color: "text-purple-600", bg: "bg-purple-50" },
            { label: locale === "ar" ? "طلبات الخصوصية" : "Privacy Requests", value: recentRequests.length.toString(), color: "text-amber-600", bg: "bg-amber-50" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-gray-100 shadow-sm`}>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-sm text-muted mt-1">{card.label}</p>
              {"pct" in card && card.pct !== undefined && (
                <p className="text-xs text-muted mt-0.5">{card.pct}% {locale === "ar" ? "من الإجمالي" : "of total"}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "توزيع الموافقات" : "Consent Distribution"}
            </h3>
            <div className="space-y-4">
              {[
                { label: locale === "ar" ? "تحليلات" : "Analytics", count: consentStats.analyticsConsent, total: consentStats.totalUsers, color: "bg-blue-500" },
                { label: locale === "ar" ? "تسويق" : "Marketing", count: consentStats.marketingConsent, total: consentStats.totalUsers, color: "bg-purple-500" },
                { label: locale === "ar" ? "أطراف ثالثة" : "Third Party", count: consentStats.thirdPartyConsent, total: consentStats.totalUsers, color: "bg-teal-500" },
                { label: locale === "ar" ? "الاحتفاظ بالبيانات" : "Data Retention", count: consentStats.dataRetentionConsent, total: consentStats.totalUsers, color: "bg-navy" },
              ].map((item) => {
                const pct = Math.round((item.count / item.total) * 100);
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-muted">{item.count.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={nav("/privacy/consents")}
                className="flex-1 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors text-center"
              >
                {locale === "ar" ? "عرض الموافقات" : "View Consents"}
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "آخر طلبات الخصوصية" : "Recent Privacy Requests"}
            </h3>
            <div className="space-y-3">
              {recentRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${requestTypeLabels[req.type].color}`}>
                      {locale === "ar" ? requestTypeLabels[req.type].ar : requestTypeLabels[req.type].en}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{req.user}</p>
                      <p className="text-xs text-muted">{req.email}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                      {locale === "ar" ? statusLabels[req.status]?.ar : statusLabels[req.status]?.en}
                    </span>
                    <p className="text-xs text-muted mt-0.5">{req.submitted}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href={nav("/privacy/requests")}
                className="block w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
              >
                {locale === "ar" ? "عرض جميع الطلبات" : "View All Requests"}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-navy mb-4">
            {locale === "ar" ? "الامتثال للائحة" : "Compliance Status"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy", status: "active", lastUpdated: "2026-01-15" },
              { label: locale === "ar" ? "سياسة الكوكيز" : "Cookie Policy", status: "active", lastUpdated: "2026-01-15" },
              { label: locale === "ar" ? "nts of Processing" : "Record of Processing", status: "active", lastUpdated: "2026-02-01" },
              { label: locale === "ar" ? "DPIA" : "DPIA", status: "in_progress", lastUpdated: "2026-04-01" },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                  item.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {item.status === "active"
                    ? (locale === "ar" ? "نشط" : "Active")
                    : (locale === "ar" ? "قيد الإعداد" : "In Progress")}
                </span>
                <p className="text-xs text-muted mt-1">
                  {locale === "ar" ? "آخر تحديث:" : "Last updated:"} {item.lastUpdated}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
