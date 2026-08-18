"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const roles = [
  {
    id: "super_admin",
    name_ar: "مشرف عام",
    name_en: "Super Admin",
    description_ar: "صلاحيات كاملة على المنصة Including system settings, user management, and all admin functions",
    description_en: "Full platform access including system settings, user management, and all admin functions",
    color: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-700",
    count: 1,
    permissions: ["*"],
  },
  {
    id: "admin",
    name_ar: "مشرف",
    name_en: "Admin",
    description_ar: "إدارة المحتوى والمستخدمين بدون تعديل الإعدادات النظامية",
    description_en: "Manage content and users without modifying system settings",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    count: 2,
    permissions: ["content.manage", "users.manage", "reports.view"],
  },
  {
    id: "legal_editor",
    name_ar: "محرر قانوني",
    name_en: "Legal Editor",
    description_ar: "تحرير وإنشاء المحتوى القانوني والمواضيع",
    description_en: "Edit and create legal content and topics",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    count: 3,
    permissions: ["topics.create", "topics.edit", "topics.publish"],
  },
  {
    id: "legal_reviewer",
    name_ar: "مراجعة قانونية",
    name_en: "Legal Reviewer",
    description_ar: "مراجعة واعتماد المحتوى القانوني قبل النشر",
    description_en: "Review and approve legal content before publishing",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
    count: 2,
    permissions: ["topics.review", "topics.approve", "sources.verify"],
  },
  {
    id: "lawyer",
    name_ar: "محامٍ",
    name_en: "Lawyer",
    description_ar: "محامٍ موثّق يمكنه الرد على الاستفسارات وعرض الملف الشخصي",
    description_en: "Verified lawyer who can respond to inquiries and display profile",
    color: "bg-teal/5 border-teal/20",
    badge: "bg-teal/10 text-teal",
    count: 12,
    permissions: ["profile.manage", "inquiries.respond"],
  },
  {
    id: "privacy_officer",
    name_ar: "مسؤول الخصوصية",
    name_en: "Privacy Officer",
    description_ar: "إدارة طلبات الخصوصية والامتثال لقانون حماية البيانات",
    description_en: "Manage privacy requests and data protection compliance",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    count: 1,
    permissions: ["privacy.manage", "consents.view", "audit.view"],
  },
  {
    id: "support_agent",
    name_ar: "عميل دعم",
    name_en: "Support Agent",
    description_ar: "الرد على استفسارات المستخدمين وتقديم الدعم الفني",
    description_en: "Respond to user inquiries and provide technical support",
    color: "bg-cyan-50 border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
    count: 2,
    permissions: ["tickets.manage", "users.view"],
  },
  {
    id: "user",
    name_ar: "مستخدم",
    name_en: "User",
    description_ar: "مستخدم عادي يمكنه تصفح المواضيع وطرح الأسئلة",
    description_en: "Regular user who can browse topics and ask questions",
    color: "bg-gray-50 border-gray-200",
    badge: "bg-gray-100 text-gray-600",
    count: 1842,
    permissions: ["topics.view", "ask.questions"],
  },
];

const permissionLabels: Record<string, { ar: string; en: string }> = {
  "*": { ar: "صلاحيات كاملة", en: "Full Access" },
  "content.manage": { ar: "إدارة المحتوى", en: "Content Management" },
  "users.manage": { ar: "إدارة المستخدمين", en: "User Management" },
  "reports.view": { ar: "عرض التقارير", en: "View Reports" },
  "topics.create": { ar: "إنشاء مواضيع", en: "Create Topics" },
  "topics.edit": { ar: "تعديل مواضيع", en: "Edit Topics" },
  "topics.publish": { ar: "نشر مواضيع", en: "Publish Topics" },
  "topics.review": { ar: "مراجعة مواضيع", en: "Review Topics" },
  "topics.approve": { ar: "اعتماد مواضيع", en: "Approve Topics" },
  "sources.verify": { ar: "تحقق من المصادر", en: "Verify Sources" },
  "profile.manage": { ar: "إدارة الملف الشخصي", en: "Manage Profile" },
  "inquiries.respond": { ar: "الرد على الاستفسارات", en: "Respond to Inquiries" },
  "privacy.manage": { ar: "إدارة الخصوصية", en: "Manage Privacy" },
  "consents.view": { ar: "عرض الموافقات", en: "View Consents" },
  "audit.view": { ar: "عرض السجلات", en: "View Logs" },
  "tickets.manage": { ar: "إدارة التذاكر", en: "Manage Tickets" },
  "users.view": { ar: "عرض المستخدمين", en: "View Users" },
  "topics.view": { ar: "عرض المواضيع", en: "View Topics" },
  "ask.questions": { ar: "طرح الأسئلة", en: "Ask Questions" },
};

export default function RolesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

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
          <span className="text-white">{locale === "ar" ? "الأدوار" : "Roles"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة الأدوار والصلاحيات" : "Roles & Permissions"}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`rounded-xl border p-5 transition-all ${role.color} ${
                expandedRole === role.id ? "ring-2 ring-navy/20" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${role.badge}`}>
                      {locale === "ar" ? role.name_ar : role.name_en}
                    </span>
                    <span className="text-xs text-muted">
                      {role.count.toLocaleString()} {locale === "ar" ? "مستخدم" : "users"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {locale === "ar" ? role.description_ar : role.description_en}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                  className="text-xs text-navy font-medium hover:underline shrink-0 ml-2"
                >
                  {expandedRole === role.id
                    ? locale === "ar" ? "إخفاء" : "Hide"
                    : locale === "ar" ? "الصلاحيات" : "Permissions"}
                </button>
              </div>

              {expandedRole === role.id && (
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                    {locale === "ar" ? "الصلاحيات" : "Permissions"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 bg-white/80 rounded text-xs text-gray-600 font-medium border border-gray-200/50"
                      >
                        {locale === "ar" ? permissionLabels[perm]?.ar : permissionLabels[perm]?.en}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1.5 bg-navy text-white rounded-lg text-xs font-medium hover:bg-primary-light transition-colors">
                      {locale === "ar" ? "تعديل الصلاحيات" : "Edit Permissions"}
                    </button>
                    {role.id !== "super_admin" && role.id !== "user" && (
                      <button className="px-3 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                        {locale === "ar" ? "تعيين مستخدمين" : "Assign Users"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
