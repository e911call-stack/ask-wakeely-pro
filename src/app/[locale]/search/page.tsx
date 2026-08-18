"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { searchTopics } from "@/lib/topics-data";
import TopicCard from "@/components/TopicCard";
import SearchBar from "@/components/SearchBar";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [locale] = useState<"ar" | "en">("ar");
  const [searchQuery, setSearchQuery] = useState(query);
  const results = searchQuery ? searchTopics(searchQuery, locale) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {locale === "ar" ? "نتائج البحث" : "Search Results"}
      </h1>

      <div className="mb-8">
        <SearchBar locale={locale} />
      </div>

      {searchQuery && (
        <p className="text-gray-500 mb-6">
          {locale === "ar" ? `${results.length} نتيجة لـ "${searchQuery}"` : `${results.length} results for "${searchQuery}"`}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} locale={locale} />
        ))}
      </div>

      {searchQuery && results.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>{t(locale, "no_results")}</p>
          <p className="text-sm mt-2">
            {locale === "ar"
              ? "جرب كلمات مختلفة أو استخدم المساعد القانوني للمساعدة"
              : "Try different terms or use the AI assistant for help"}
          </p>
          <a
            href={`/${locale}/ai`}
            className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-light"
          >
            {t(locale, "ask_ai")}
          </a>
        </div>
      )}
    </div>
  );
}

export default function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
