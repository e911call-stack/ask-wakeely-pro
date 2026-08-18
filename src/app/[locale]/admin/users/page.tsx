"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockUsers = [
  { id: "u1", name: "Ahmad Fahd Al-Khatib", name_ar: "أحمد فهد الخطيب", email: "ahmad@example.jo", role: "super_admin", status: "active", lastLogin: "2026-05-15T08:30:00", createdAt: "2025-06-01" },
  { id: "u2", name: "Norhan Sami Al-Omousi", name_ar: "نورهان سامي العموسي", email: "norhan@example.jo", role: "legal_editor", status: "active", lastLogin: "2026-05-14T14:20:00", createdAt: "2025-07-15" },
  { id: "u3", name: "Khaled Yousef Al-Sarayrah", name_ar: "خالد يوسف الصرايره", email: "khaled@example.jo", role: "lawyer", status: "active", lastLogin: "2026-05-13T11:10:00", createdAt: "2025-08-20" },
  { id: "u4", name: "Rima Adel Al-Qudah", name_ar: "ريم عادل القضاة", email: "rima@example.jo", role: "legal_reviewer", status: "active", lastLogin: "2026-05-15T09:45:00", createdAt: "2025-06-10" },
  { id: "u5", name: "Sami Ibrahim Mansour", name_ar: "سامي إبراهيم منصور", email: "sami@example.jo", role: "admin", status: "active", lastLogin: "2026-05-12T16:00:00", createdAt: "2025-09-01" },
  { id: "u6", name: "Lina Mahmoud Shammout", name_ar: "لينا محمود شمّوت", email: "lina@example.jo", role: "privacy_officer", status: "active", lastLogin: "2026-05-14T10:15:00", createdAt: "2025-10-05" },
  { id: "u7", name: "Yusuf Abdullah Nimer", name_ar: "يوسف عبدالله نimer", email: "yusuf@example.jo", role: "support_agent", status: "active", lastLogin: "2026-05-15T07:00:00", createdAt: "2025-11-12" },
  { id: "u8", name: "Fatima Hassan Darwish", name_ar: "فاطمة حسن درويش", email: "fatima@example.jo", role: "user", status: "active", lastLogin: "2026-05-10T13:30:00", createdAt: "2025-12-01" },
  { id: "u9", name: "Omar Khalil Bani Hani", name_ar: "عمر خليل بني هني", email: "omar@example.jo", role: "user", status: "suspended", lastLogin: "2026-04-20T09:00:00", createdAt: "2026-01-15" },
  { id: "u10", name: "Hana Fawzi Asfour", name_ar: "هنا فوزي عسقول", email: "hana@example.jo", role: "lawyer", status: "active", lastLogin: "2026-05-14T15:45:00", createdAt: "2026-02-01" },
  { id: "u11", name: "Tariq Jamal Al-Hussein", name_ar: "طارق جمال الحسين", email: "tariq@example.jo", role: "user", status: "inactive", lastLogin: "2026-03-10T11:00:00", createdAt: "2026-01-20" },
  { id: "u12", name: "Mona Rashed Al-Khatib", name_ar: "منى رشاد الخطيب", email: "mona@example.jo", role: "legal_editor", status: "active", lastLogin: "2026-05-15T10:30:00", createdAt: "2026-03-05" },
];

const roleLabels: Record<string, { ar: string; en: string; color: string }> = {
  super_admin: { ar: "مشرف عام", en: "Super Admin", color: "bg-rose-100 text-rose-700" },
  admin: { ar: "مشرف", en: "Admin", color: "bg-orange-100 text-orange-700" },
  legal_editor: { ar: "محرر قانوني", en: "Legal Editor", color: "bg-blue-100 text-blue-700" },
  legal_reviewer: { ar: "مراجعة قانونية", en: "Legal Reviewer", color: "bg-indigo-100 text-indigo-700" },
  lawyer: { ar: "محامٍ", en: "Lawyer", color: "bg-teal/10 text-teal" },
  privacy_officer: { ar: "مسؤول الخصوصية", en: "Privacy Officer", color: "bg-purple-100 text-purple-700" },
  support_agent: { ar: "عميل دعم", en: "Support Agent", color: "bg-cyan-100 text-cyan-700" },
  user: { ar: "مستخدم", en: "User", color: "bg-gray-100 text-gray-600" },
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-500",
  suspended: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  active: { ar: "نشط", en: "Active" },
  inactive: { ar: "غير نشط", en: "Inactive" },
  suspended: { ar: "معلّق", en: "Suspended" },
};

export default function UsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const filtered = mockUsers.filter((u) => {
    const matchSearch = search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "المستخدمون" : "Users"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة المستخدمين" : "User Management"}</h1>
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
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            <option value="all">{locale === "ar" ? "جميع الأدوار" : "All Roles"}</option>
            {Object.entries(roleLabels).map(([k, v]) => (
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
            {filtered.length} {locale === "ar" ? "مستخدم" : "users"}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المستخدم" : "User"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الدور" : "Role"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "آخر دخول" : "Last Login"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-navy/10 text-navy rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900">{locale === "ar" ? user.name_ar : user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleLabels[user.role].color}`}>
                        {locale === "ar" ? roleLabels[user.role].ar : roleLabels[user.role].en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                        {locale === "ar" ? statusLabels[user.status]?.ar : statusLabels[user.status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(user.lastLogin).toLocaleDateString(locale === "ar" ? "ar-JO" : "en-US")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-navy/5 text-navy rounded text-xs font-medium hover:bg-navy/10 transition-colors">
                          {locale === "ar" ? "تعديل" : "Edit"}
                        </button>
                        {user.status === "active" && user.role !== "super_admin" && (
                          <button className="px-3 py-1 bg-rose-50 text-rose-600 rounded text-xs font-medium hover:bg-rose-100 transition-colors">
                            {locale === "ar" ? "تعليق" : "Suspend"}
                          </button>
                        )}
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
