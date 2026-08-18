"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { getTopics, searchTopics, getTopicsByArea } from "@/lib/topics-data";
import TopicCard from "@/components/TopicCard";
import SearchBar from "@/components/SearchBar";
import type { PracticeArea } from "@/lib/types";

const practiceAreas = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "labor", ar: "عملي", en: "Labor" },
  { id: "rent", ar: "إيجار", en: "Rent" },
  { id: "family", ar: "أحوال شخصية", en: "Family" },
  { id: "debt", ar: "ديون", en: "Debt" },
  { id: "traffic", ar: "مرور", en: "Traffic" },
  { id: "cybercrime", ar: "إلكتروني", en: "Cybercrime" },
  { id: "small_business", ar: "أعمال", en: "Business" },
  { id: "court_procedures", ar: "محاكم", en: "Courts" },
];

export default function TopicsClient({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const initialArea = searchParams.get("area") || "all";
  const loc = locale as Locale;
  const [activeArea, setActiveArea] = useState(initialArea);
  const [searchQuery, setSearchQuery] = useState("");

  const topics = searchQuery
    ? searchTopics(searchQuery, loc)
    : activeArea === "all"
    ? getTopics()
    : getTopicsByArea(activeArea as PracticeArea);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(loc, "all_topics")}</h1>
        <p className="text-gray-500">{t(loc, "search_placeholder")}</p>
      </div>

      <div className="mb-6">
        <SearchBar locale={loc} />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {practiceAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => { setActiveArea(area.id); setSearchQuery(""); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeArea === area.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {loc === "ar" ? area.ar : area.en}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} locale={loc} />
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t(loc, "no_results")}
        </div>
      )}
    </div>
  );
}
