"use client";

import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import type { Topic } from "@/lib/types";

const practiceAreaColors: Record<string, string> = {
  labor: "bg-blue-100 text-blue-800",
  rent: "bg-green-100 text-green-800",
  family: "bg-purple-100 text-purple-800",
  debt: "bg-red-100 text-red-800",
  traffic: "bg-yellow-100 text-yellow-800",
  cybercrime: "bg-indigo-100 text-indigo-800",
  small_business: "bg-orange-100 text-orange-800",
  court_procedures: "bg-teal-100 text-teal-800",
};

const practiceAreaLabelsAr: Record<string, string> = {
  labor: "عملي",
  rent: "إيجار",
  family: "أحوال شخصية",
  debt: "ديون",
  traffic: "مرور",
  cybercrime: "إلكتروني",
  small_business: "أعمال",
  court_procedures: "محاكم",
};

export default function TopicCard({ topic, locale }: { topic: Topic; locale: Locale }) {
  const title = locale === "ar" ? topic.title_ar : topic.title_en;
  const summary = locale === "ar" ? topic.summary_ar : topic.summary_en;
  const colorClass = practiceAreaColors[topic.practice_area] || "bg-gray-100 text-gray-800";
  const areaLabel = locale === "ar" ? (practiceAreaLabelsAr[topic.practice_area] || topic.practice_area) : topic.practice_area.replace("_", " ");

  return (
    <Link
      href={`/${locale}/topics/${topic.slug}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200 p-5 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}>
          {areaLabel}
        </span>
        {topic.urgency === "high" || topic.urgency === "critical" ? (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600">
            {locale === "ar" ? "عاجل" : "Urgent"}
          </span>
        ) : null}
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{summary}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {locale === "ar" ? "آخر مراجعة" : "Last reviewed"}: {topic.last_reviewed}
        </span>
        <span className="text-primary group-hover:translate-x-1 transition-transform">
          {locale === "ar" ? "←" : "→"}
        </span>
      </div>
    </Link>
  );
}
