"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const eventTypeDistribution = [
  { type: "page_view", label_ar: "مشاهدة صفحة", label_en: "Page View", count: 12450, pct: 45 },
  { type: "search", label_ar: "بحث", label_en: "Search", count: 4890, pct: 18 },
  { type: "ai_query", label_ar: "سؤال AI", label_en: "AI Query", count: 3210, pct: 12 },
  { type: "topic_view", label_ar: "عرض موضوع", label_en: "Topic View", count: 2870, pct: 10 },
  { type: "lawyer_contact", label_ar: "تواصل مع محامٍ", label_en: "Lawyer Contact", count: 1560, pct: 6 },
  { type: "registration", label_ar: "تسجيل", label_en: "Registration", count: 890, pct: 3 },
  { type: "chat_start", label_ar: "بدء محادثة", label_en: "Chat Start", count: 650, pct: 2 },
  { type: "other", label_ar: "أخرى", label_en: "Other", count: 1080, pct: 4 },
];

const topTopics = [
  { title_ar: "إجراءات الطلاق", title_en: "Divorce Procedures", views: 1250, queries: 340, contacts: 45 },
  { title_ar: "الفصل غير القانوني", title_en: "Wrongful Termination", views: 1180, queries: 280, contacts: 38 },
  { title_ar: "حوادث السيارات", title_en: "Traffic Accidents", views: 980, queries: 210, contacts: 32 },
  { title_ar: "استرداد التأمين", title_en: "Security Deposit Refund", views: 920, queries: 195, contacts: 28 },
  { title_ar: "تحصيل الديون", title_en: "Debt Collection", views: 870, queries: 180, contacts: 25 },
  { title_ar: "الاحتيال الإلكتروني", title_en: "Online Fraud", views: 750, queries: 160, contacts: 20 },
];

const conversionMetrics = {
  searchToTopic: 68,
  topicToAI: 34,
  aiToLawyer: 12,
  overallConversion: 8.5,
  avgSessionDuration: "4m 32s",
  bounceRate: 32,
  returnRate: 45,
};

const dailyMetrics = [
  { date: "May 9", users: 312, queries: 89, contacts: 12 },
  { date: "May 10", users: 298, queries: 76, contacts: 10 },
  { date: "May 11", users: 345, queries: 102, contacts: 15 },
  { date: "May 12", users: 367, queries: 95, contacts: 14 },
  { date: "May 13", users: 389, queries: 108, contacts: 18 },
  { date: "May 14", users: 412, queries: 115, contacts: 20 },
  { date: "May 15", users: 378, queries: 98, contacts: 16 },
];

export default function AnalyticsPage({
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
          <span className="text-white">{locale === "ar" ? "التحليلات" : "Analytics"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "تحليلات المنصة" : "Platform Analytics"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: locale === "ar" ? "المستخدمون النشطون" : "Active Users", value: "2,501", change: "+12%", color: "text-navy", bg: "bg-navy/5" },
            { label: locale === "ar" ? "الم Requests" : "AI Queries", value: "3,210", change: "+8%", color: "text-blue-600", bg: "bg-blue-50" },
            { label: locale === "ar" ? "طلبات المحامين" : "Lawyer Contacts", value: "1,560", change: "+15%", color: "text-teal", bg: "bg-teal/5" },
            { label: locale === "ar" ? "نسبة التحويل" : "Conversion Rate", value: "8.5%", change: "+2.1%", color: "text-gold", bg: "bg-gold/5" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-gray-100 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
                <span className="text-xs text-emerald-600 font-medium">{card.change}</span>
              </div>
              <p className="text-sm text-muted mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "توزيع أنواع الأحداث" : "Event Type Distribution"}
            </h3>
            <div className="space-y-3">
              {eventTypeDistribution.map((event) => (
                <div key={event.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{locale === "ar" ? event.label_ar : event.label_en}</span>
                    <span className="text-muted">{event.count.toLocaleString()} ({event.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-navy h-2 rounded-full" style={{ width: `${event.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "المواضيع الأكثر طلباً" : "Most Requested Topics"}
            </h3>
            <div className="space-y-3">
              {topTopics.map((topic, i) => (
                <div key={topic.title_en} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <span className="w-6 h-6 bg-navy/10 text-navy rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {locale === "ar" ? topic.title_ar : topic.title_en}
                    </p>
                    <div className="flex gap-3 text-xs text-muted">
                      <span>{topic.views.toLocaleString()} {locale === "ar" ? "مشاهدة" : "views"}</span>
                      <span>{topic.queries} {locale === "ar" ? "سؤال" : "queries"}</span>
                      <span>{topic.contacts} {locale === "ar" ? "تواصل" : "contacts"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "مقاييس التحويل" : "Conversion Metrics"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: locale === "ar" ? "بحث → موضوع" : "Search → Topic", value: `${conversionMetrics.searchToTopic}%`, color: "text-navy" },
                { label: locale === "ar" ? "موضوع → AI" : "Topic → AI", value: `${conversionMetrics.topicToAI}%`, color: "text-blue-600" },
                { label: locale === "ar" ? "AI → محامٍ" : "AI → Lawyer", value: `${conversionMetrics.aiToLawyer}%`, color: "text-teal" },
                { label: locale === "ar" ? "التحويل الإجمالي" : "Overall Conversion", value: `${conversionMetrics.overallConversion}%`, color: "text-gold" },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <p className="text-xs text-muted mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              {[
                { label: locale === "ar" ? "متوسط مدة الجلسة" : "Avg Session Duration", value: conversionMetrics.avgSessionDuration },
                { label: locale === "ar" ? "معدل الارتداد" : "Bounce Rate", value: `${conversionMetrics.bounceRate}%` },
                { label: locale === "ar" ? "نسبة العودة" : "Return Rate", value: `${conversionMetrics.returnRate}%` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted">{item.label}</span>
                  <span className="text-gray-700 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "النشاط اليومي" : "Daily Activity"}
            </h3>
            <div className="space-y-3">
              {dailyMetrics.map((day) => {
                const maxVal = Math.max(...dailyMetrics.map((d) => d.users));
                return (
                  <div key={day.date}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{day.date}</span>
                      <span className="text-muted text-xs">{day.users} users · {day.queries} queries · {day.contacts} contacts</span>
                    </div>
                    <div className="flex gap-1 h-3">
                      <div className="bg-navy rounded-l" style={{ width: `${(day.users / maxVal) * 100}%` }} />
                      <div className="bg-blue-400" style={{ width: `${(day.queries / maxVal) * 30}%` }} />
                      <div className="bg-teal rounded-r" style={{ width: `${(day.contacts / maxVal) * 15}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-muted">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-navy rounded" /> {locale === "ar" ? "مستخدمون" : "Users"}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded" /> {locale === "ar" ? "استعلامات" : "Queries"}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-teal rounded" /> {locale === "ar" ? "تواصل" : "Contacts"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
