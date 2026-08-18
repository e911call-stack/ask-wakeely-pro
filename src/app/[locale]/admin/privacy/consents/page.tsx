"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockConsents = [
  { id: "c1", user_id: "u1", user_name: "Ahmad Al-Khatib", user_email: "ahmad@example.jo", consent_type: "analytics", granted: true, timestamp: "2026-01-15T10:30:00", ip_address: "192.168.1.100" },
  { id: "c2", user_id: "u1", user_name: "Ahmad Al-Khatib", user_email: "ahmad@example.jo", consent_type: "marketing", granted: false, timestamp: "2026-01-15T10:30:00", ip_address: "192.168.1.100" },
  { id: "c3", user_id: "u1", user_name: "Ahmad Al-Khatib", user_email: "ahmad@example.jo", consent_type: "third_party", granted: true, timestamp: "2026-01-15T10:30:00", ip_address: "192.168.1.100" },
  { id: "c4", user_id: "u2", user_name: "Norhan Al-Omousi", user_email: "norhan@example.jo", consent_type: "analytics", granted: true, timestamp: "2026-02-10T14:20:00", ip_address: "192.168.1.101" },
  { id: "c5", user_id: "u2", user_name: "Norhan Al-Omousi", user_email: "norhan@example.jo", consent_type: "marketing", granted: true, timestamp: "2026-02-10T14:20:00", ip_address: "192.168.1.101" },
  { id: "c6", user_id: "u3", user_name: "Khaled Al-Sarayrah", user_email: "khaled@example.jo", consent_type: "analytics", granted: false, timestamp: "2026-03-05T11:10:00", ip_address: "192.168.1.102" },
  { id: "c7", user_id: "u3", user_name: "Khaled Al-Sarayrah", user_email: "khaled@example.jo", consent_type: "marketing", granted: false, timestamp: "2026-03-05T11:10:00", ip_address: "192.168.1.102" },
  { id: "c8", user_id: "u4", user_name: "Rima Al-Qudah", user_email: "rima@example.jo", consent_type: "analytics", granted: true, timestamp: "2026-04-01T09:45:00", ip_address: "192.168.1.103" },
  { id: "c9", user_id: "u4", user_name: "Rima Al-Qudah", user_email: "rima@example.jo", consent_type: "marketing", granted: true, timestamp: "2026-04-01T09:45:00", ip_address: "192.168.1.103" },
  { id: "c10", user_id: "u4", user_name: "Rima Al-Qudah", user_email: "rima@example.jo", consent_type: "third_party", granted: true, timestamp: "2026-04-01T09:45:00", ip_address: "192.168.1.103" },
];

const consentTypeLabels: Record<string, { ar: string; en: string; color: string }> = {
  analytics: { ar: "تحليلات", en: "Analytics", color: "bg-blue-100 text-blue-700" },
  marketing: { ar: "تسويق", en: "Marketing", color: "bg-purple-100 text-purple-700" },
  third_party: { ar: "أطراف ثالثة", en: "Third Party", color: "bg-amber-100 text-amber-700" },
  essential: { ar: "ضرورية", en: "Essential", color: "bg-emerald-100 text-emerald-700" },
};

export default function ConsentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockConsents.filter((c) => {
    const matchSearch = search === "" || c.user_name.toLowerCase().includes(search.toLowerCase()) || c.user_email.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || c.consent_type === filterType;
    return matchSearch && matchType;
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
          <span className="text-white">{locale === "ar" ? "الموافقات" : "Consents"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة الموافقات" : "Consent Management"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder={locale === "ar" ? "بحث بالاسم أو البريد..." : "Search by name or email..."}
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
            {Object.entries(consentTypeLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <div className="mr-auto text-sm text-muted">
            {filtered.length} {locale === "ar" ? "سجل" : "records"}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المستخدم" : "User"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "نوع الموافقة" : "Consent Type"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "التاريخ" : "Timestamp"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "عنوان IP" : "IP Address"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((consent) => (
                  <tr key={consent.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{consent.user_name}</p>
                      <p className="text-xs text-muted">{consent.user_email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${consentTypeLabels[consent.consent_type]?.color}`}>
                        {locale === "ar" ? consentTypeLabels[consent.consent_type]?.ar : consentTypeLabels[consent.consent_type]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {consent.granted ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          {locale === "ar" ? "موافق" : "Granted"}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          {locale === "ar" ? "مرفوض" : "Denied"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(consent.timestamp).toLocaleString(locale === "ar" ? "ar-JO" : "en-US")}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs font-mono">{consent.ip_address}</td>
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
