"use client";

import Link from "next/link";
import { type Locale } from "@/lib/i18n";

const practiceAreas = [
  { id: "labor", icon: "👷", ar: "القانون العملي", en: "Labor Law" },
  { id: "rent", icon: "🏠", ar: "الإيجار والعقارات", en: "Rent & Real Estate" },
  { id: "family", icon: "👨‍👩‍👧", ar: "الأحوال الشخصية", en: "Family Law" },
  { id: "debt", icon: "💰", ar: "الديون والتحصيل", en: "Debt & Enforcement" },
  { id: "traffic", icon: "🚗", ar: "المرور والتعويضات", en: "Traffic & Compensation" },
  { id: "cybercrime", icon: "💻", ar: "الجرائم الإلكترونية", en: "Cybercrime" },
  { id: "small_business", icon: "🏪", ar: "الأعمال الصغيرة", en: "Small Business" },
  { id: "court_procedures", icon: "⚖", ar: "إجراءات المحاكم", en: "Court Procedures" },
];

export default function PracticeAreaGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {practiceAreas.map((area) => (
        <Link
          key={area.id}
          href={`/${locale}/topics?area=${area.id}`}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200 text-center group"
        >
          <div className="text-3xl mb-3">{area.icon}</div>
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors text-sm">
            {locale === "ar" ? area.ar : area.en}
          </h3>
        </Link>
      ))}
    </div>
  );
}
