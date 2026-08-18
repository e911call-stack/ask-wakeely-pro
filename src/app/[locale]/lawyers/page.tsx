"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { getLawyers, getLawyersByArea, getLawyersByGovernorate } from "@/lib/lawyers-data";
import type { PracticeArea } from "@/lib/types";

const practiceAreas = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "labor", ar: "عملي", en: "Labor" },
  { id: "rent", ar: "إيجار", en: "Rent" },
  { id: "family", ar: "أحوال شخصية", en: "Family" },
  { id: "debt", ar: "ديون", en: "Debt" },
  { id: "traffic", ar: "مرور", en: "Traffic" },
  { id: "cybercrime", ar: "إلكتروني", en: "Cybercrime" },
];

const governorates = [
  { id: "all", ar: "جميع المحافظات", en: "All Governorates" },
  { id: "Amman", ar: "عمّان", en: "Amman" },
  { id: "Irbid", ar: "إربد", en: "Irbid" },
  { id: "Zarqa", ar: "الزرقاء", en: "Zarqa" },
  { id: "Aqaba", ar: "العقبة", en: "Aqaba" },
  { id: "Karak", ar: "الكرك", en: "Karak" },
  { id: "Salt", ar: "السلط", en: "Salt" },
  { id: "Madaba", ar: "مادبا", en: "Madaba" },
];

export default function LawyersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale] = useState<"ar" | "en">("ar");
  const [area, setArea] = useState("all");
  const [gov, setGov] = useState("all");

  let lawyers = area === "all" ? getLawyers() : getLawyersByArea(area as PracticeArea);
  if (gov !== "all") {
    lawyers = lawyers.filter((l) => l.governorates.includes(gov));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(locale, "lawyer_profiles")}</h1>
        <p className="text-gray-500">
          {locale === "ar"
            ? "تصفح ملفات المحامين المؤيدين و التواصل معهم"
            : "Browse verified lawyer profiles and reach out"}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-700">
        ⚠ {locale === "ar"
          ? "المنصة لا توفر مطابقة تلقائية أو ضمان تمثيل. التواصل مع المحامٍ هو اتفاق مستقل بينك وبين المحامٍ."
          : "The platform does not provide automated matching or guarantee of representation. Contacting a lawyer is an independent arrangement between you and the lawyer."}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "ar" ? "مجال القانون" : "Practice Area"}
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {practiceAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {locale === "ar" ? a.ar : a.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === "ar" ? "المحافظة" : "Governorate"}
          </label>
          <select
            value={gov}
            onChange={(e) => setGov(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {governorates.map((g) => (
              <option key={g.id} value={g.id}>
                {locale === "ar" ? g.ar : g.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {locale === "ar" ? lawyer.name_ar : lawyer.name_en}
                </h3>
                <p className="text-sm text-gray-500">{lawyer.membership_id}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                lawyer.verification_status === "verified"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {locale === "ar"
                  ? (lawyer.verification_status === "verified" ? "موثق" : "قيد المراجعة")
                  : lawyer.verification_status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {locale === "ar" ? lawyer.bio_ar : lawyer.bio_en}
            </p>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-500">
                <span>📍</span>
                <span>{lawyer.governorates.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>🏷</span>
                <span className="capitalize">{lawyer.practice_areas.map((a) => a.replace("_", " ")).join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>🗣</span>
                <span>{lawyer.languages.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>📅</span>
                <span>{locale === "ar" ? `${lawyer.years_experience} سنة خبرة` : `${lawyer.years_experience} years experience`}</span>
              </div>
              {lawyer.pricing && (
                <div className="flex items-center gap-2 text-gray-500">
                  <span>💰</span>
                  <span>{lawyer.pricing}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {lawyer.service_types.map((st) => (
                <span key={st} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                  {st}
                </span>
              ))}
            </div>

            <a
              href={`/${locale}/lawyers/${lawyer.id}`}
              className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
            >
              {t(locale, "talk_to_lawyer")}
            </a>
          </div>
        ))}
      </div>

      {lawyers.length === 0 && (
        <div className="text-center py-12 text-gray-500">{t(locale, "no_results")}</div>
      )}
    </div>
  );
}
