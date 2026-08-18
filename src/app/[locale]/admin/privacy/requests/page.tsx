"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockRequests = [
  { id: "pr-001", type: "access", user: "Ahmad Al-Khatib", email: "ahmad@example.jo", submitted: "2026-05-14T10:30:00", status: "pending" as const, description: "I would like to access all my personal data stored on the platform", deadline: "2026-06-13" },
  { id: "pr-002", type: "erasure", user: "Omar Bani Hani", email: "omar@example.jo", submitted: "2026-05-13T14:15:00", status: "processing" as const, description: "Please delete all my personal data and account", deadline: "2026-06-12" },
  { id: "pr-003", type: "correction", user: "Fatima Darwish", email: "fatima@example.jo", submitted: "2026-05-12T09:00:00", status: "completed" as const, description: "My email address is incorrect in the system", deadline: "2026-06-11" },
  { id: "pr-004", type: "export", user: "Lina Shammout", email: "lina@example.jo", submitted: "2026-05-11T16:45:00", status: "pending" as const, description: "I need a copy of all my data in a portable format", deadline: "2026-06-10" },
  { id: "pr-005", type: "restriction", user: "Tariq Al-Hussein", email: "tariq@example.jo", submitted: "2026-05-10T11:20:00", status: "pending" as const, description: "I want to restrict the processing of my personal data for marketing purposes", deadline: "2026-06-09" },
  { id: "pr-006", type: "objection", user: "Hana Asfour", email: "hana@example.jo", submitted: "2026-05-09T15:00:00", status: "processing" as const, description: "I object to the processing of my data for analytics purposes", deadline: "2026-06-08" },
];

const requestTypeLabels: Record<string, { ar: string; en: string; color: string; icon: string }> = {
  access: { ar: "وصول", en: "Access", color: "bg-blue-100 text-blue-700", icon: "👁️" },
  correction: { ar: "تصحيح", en: "Correction", color: "bg-amber-100 text-amber-700", icon: "✏️" },
  erasure: { ar: "حذف", en: "Erasure", color: "bg-rose-100 text-rose-700", icon: "🗑️" },
  export: { ar: "تصدير", en: "Export", color: "bg-purple-100 text-purple-700", icon: "📤" },
  restriction: { ar: "تقييد", en: "Restriction", color: "bg-gray-100 text-gray-600", icon: "🔒" },
  objection: { ar: "اعتراض", en: "Objection", color: "bg-orange-100 text-orange-700", icon: "⛔" },
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

export default function PrivacyRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockRequests.filter((r) => {
    const matchType = filterType === "all" || r.type === filterType;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchType && matchStatus;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <a href={nav("/privacy")} className="hover:text-white">{locale === "ar" ? "الخصوصية" : "Privacy"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "الطلبات" : "Requests"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "طلبات الخصوصية" : "Privacy Requests"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الأنواع" : "All Types"}</option>
            {Object.entries(requestTypeLabels).map(([k, v]) => (
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
            {filtered.length} {locale === "ar" ? "طلب" : "requests"}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((request) => {
            const typeInfo = requestTypeLabels[request.type];
            return (
              <div key={request.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{typeInfo.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {locale === "ar" ? typeInfo.ar : typeInfo.en}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                          {locale === "ar" ? statusLabels[request.status]?.ar : statusLabels[request.status]?.en}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium text-gray-900">{request.user}</p>
                        <p className="text-sm text-muted">{request.email}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{request.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                        <span>{locale === "ar" ? "التاريخ:" : "Submitted:"} {new Date(request.submitted).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US")}</span>
                        <span>{locale === "ar" ? "الموعد النها:" : "Deadline:"} {request.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {request.status === "pending" && (
                      <>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                          {locale === "ar" ? "معالجة" : "Process"}
                        </button>
                        <button className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                          {locale === "ar" ? "رفض" : "Reject"}
                        </button>
                      </>
                    )}
                    {request.status === "processing" && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        {locale === "ar" ? "إكمال" : "Complete"}
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      {locale === "ar" ? "التفاصيل" : "Details"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
