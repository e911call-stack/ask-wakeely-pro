"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockLogs = [
  { id: "log-001", actor: "Ahmad Al-Khatib", actor_role: "super_admin", action: "topic.publish", entity_type: "topic", entity_id: "security-deposit-refund", timestamp: "2026-05-15T10:30:00", ip: "192.168.1.100", details: "Published topic v3" },
  { id: "log-002", actor: "Norhan Al-Omousi", actor_role: "legal_editor", action: "topic.update", entity_type: "topic", entity_id: "child-custody", timestamp: "2026-05-15T09:15:00", ip: "192.168.1.101", details: "Updated legal sources section" },
  { id: "log-003", actor: "System", actor_role: "system", action: "user.login", entity_type: "user", entity_id: "u3", timestamp: "2026-05-15T08:45:00", ip: "192.168.1.102", details: "Login via email magic link" },
  { id: "log-004", actor: "Rima Al-Qudah", actor_role: "legal_reviewer", action: "topic.approve", entity_type: "topic", entity_id: "online-fraud", timestamp: "2026-05-14T16:20:00", ip: "192.168.1.103", details: "Approved topic after review" },
  { id: "log-005", actor: "Ahmad Al-Khatib", actor_role: "super_admin", action: "user.role_change", entity_type: "user", entity_id: "u5", timestamp: "2026-05-14T14:10:00", ip: "192.168.1.100", details: "Changed role from support_agent to admin" },
  { id: "log-006", actor: "Lina Shammout", actor_role: "privacy_officer", action: "privacy.request_process", entity_type: "privacy_request", entity_id: "pr-003", timestamp: "2026-05-14T11:30:00", ip: "192.168.1.104", details: "Completed data correction request" },
  { id: "log-007", actor: "System", actor_role: "system", action: "rag.reindex", entity_type: "rag", entity_id: "job-001", timestamp: "2026-05-14T22:00:00", ip: "localhost", details: "Full reindex completed, 1189 chunks indexed" },
  { id: "log-008", actor: "Sami Mansour", actor_role: "admin", action: "source.verify", entity_type: "legal_source", entity_id: "s1", timestamp: "2026-05-13T15:40:00", ip: "192.168.1.105", details: "Verified Labor Law source" },
  { id: "log-009", actor: "System", actor_role: "system", action: "lawyer.verification_submit", entity_type: "lawyer", entity_id: "lawyer-005", timestamp: "2026-05-13T09:00:00", ip: "192.168.1.106", details: "New lawyer verification application" },
  { id: "log-010", actor: "Ahmad Al-Khatib", actor_role: "super_admin", action: "settings.update", entity_type: "platform", entity_id: "branding", timestamp: "2026-05-12T17:00:00", ip: "192.168.1.100", details: "Updated platform disclaimer text" },
  { id: "log-011", actor: "Yusuf Nimer", actor_role: "support_agent", action: "user.view", entity_type: "user", entity_id: "u8", timestamp: "2026-05-12T10:30:00", ip: "192.168.1.107", details: "Viewed user profile" },
  { id: "log-012", actor: "System", actor_role: "system", action: "privacy.request_submit", entity_type: "privacy_request", entity_id: "pr-005", timestamp: "2026-05-10T11:20:00", ip: "192.168.1.108", details: "New restriction request submitted" },
];

const actionLabels: Record<string, { ar: string; en: string; color: string }> = {
  "topic.publish": { ar: "نشر موضوع", en: "Topic Published", color: "bg-emerald-100 text-emerald-700" },
  "topic.update": { ar: "تحديث موضوع", en: "Topic Updated", color: "bg-blue-100 text-blue-700" },
  "topic.approve": { ar: "اعتماد موضوع", en: "Topic Approved", color: "bg-teal/10 text-teal" },
  "user.login": { ar: "دخول مستخدم", en: "User Login", color: "bg-gray-100 text-gray-600" },
  "user.role_change": { ar: "تغيير دور", en: "Role Changed", color: "bg-amber-100 text-amber-700" },
  "user.view": { ar: "عرض مستخدم", en: "User Viewed", color: "bg-gray-100 text-gray-500" },
  "privacy.request_process": { ar: "معالجة طلب خصوصية", en: "Privacy Request Processed", color: "bg-purple-100 text-purple-700" },
  "privacy.request_submit": { ar: "تقديم طلب خصوصية", en: "Privacy Request Submitted", color: "bg-orange-100 text-orange-700" },
  "rag.reindex": { ar: "إعادة فهرسة", en: "RAG Reindex", color: "bg-navy/10 text-navy" },
  "source.verify": { ar: "تحقق من مصدر", en: "Source Verified", color: "bg-emerald-100 text-emerald-700" },
  "lawyer.verification_submit": { ar: "تقديم طلب تحقق", en: "Lawyer Verification", color: "bg-blue-100 text-blue-700" },
  "settings.update": { ar: "تحديث إعدادات", en: "Settings Updated", color: "bg-amber-100 text-amber-700" },
};

const entityLabels: Record<string, { ar: string; en: string }> = {
  topic: { ar: "موضوع", en: "Topic" },
  user: { ar: "مستخدم", en: "User" },
  privacy_request: { ar: "طلب خصوصية", en: "Privacy Request" },
  rag: { ar: "نظام RAG", en: "RAG System" },
  legal_source: { ar: "مصدر قانوني", en: "Legal Source" },
  lawyer: { ar: "محامٍ", en: "Lawyer" },
  platform: { ar: "المنصة", en: "Platform" },
};

export default function AuditLogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [filterAction, setFilterAction] = useState("all");
  const [filterEntity, setFilterEntity] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockLogs.filter((l) => {
    const matchAction = filterAction === "all" || l.action === filterAction;
    const matchEntity = filterEntity === "all" || l.entity_type === filterEntity;
    return matchAction && matchEntity;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "سجلات التدقيق" : "Audit Logs"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "سجلات التدقيق" : "Audit Logs"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الإجراءات" : "All Actions"}</option>
            {Object.entries(actionLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <select
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الكيانات" : "All Entities"}</option>
            {Object.entries(entityLabels).map(([k, v]) => (
              <option key={k} value={k}>{locale === "ar" ? v.ar : v.en}</option>
            ))}
          </select>
          <div className="mr-auto text-sm text-muted">
            {filtered.length} {locale === "ar" ? "سجل" : "logs"}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الفاعل" : "Actor"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الإجراء" : "Action"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الكيان" : "Entity"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "التفاصيل" : "Details"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الوقت" : "Timestamp"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "IP" : "IP"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-navy/10 text-navy rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                          {log.actor === "System" ? "SY" : log.actor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{log.actor}</p>
                          <p className="text-[10px] text-muted uppercase">{log.actor_role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionLabels[log.action]?.color}`}>
                        {locale === "ar" ? actionLabels[log.action]?.ar : actionLabels[log.action]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600">{locale === "ar" ? entityLabels[log.entity_type]?.ar : entityLabels[log.entity_type]?.en}</span>
                      <span className="block text-[10px] text-muted font-mono">{log.entity_id}</span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs max-w-[250px] truncate">{log.details}</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(log.timestamp).toLocaleString(locale === "ar" ? "ar-JO" : "en-US")}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs font-mono">{log.ip}</td>
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
