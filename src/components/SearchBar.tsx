"use client";

import { useState } from "react";
import { type Locale } from "@/lib/i18n";

export default function SearchBar({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/${locale}/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className={`w-full ${compact ? "" : "max-w-2xl mx-auto"}`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={locale === "ar" ? "صف مشكلتك القانونية..." : "Describe your legal issue..."}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
        >
          {locale === "ar" ? "بحث" : "Search"}
        </button>
      </div>
    </div>
  );
}
