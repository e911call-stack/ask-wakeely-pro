"use client";

import React, { use, useCallback, useMemo, useState } from "react";
import type { InfographicSpec } from "@/lib/visualizations";

const iconSvgs: Record<string, React.ReactNode> = {
  scales: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M12 3v17M3 7l3 6a4 4 0 0 0 6 0l3-6M15 7l3 6a4 4 0 0 0 6 0l-3-6" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  documents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  gavel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M14.5 2l5 5-7 7-5-5z" /><path d="M6 11l-4 4 4 4 4-4" /><line x1="10" y1="14" x2="6" y2="18" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function SeverityBadge({ spec }: { spec: InfographicSpec }) {
  if (!spec.urgency.enabled) return null;
  const colors: Record<string, string> = {
    info: "bg-teal-50 text-teal-800 border-teal-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    urgent: "bg-red-50 text-red-800 border-red-200",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${colors[spec.urgency.severity]}`}>
      <span>{spec.urgency.label}</span>
      {spec.urgency.text && <span className="font-normal opacity-80">- {spec.urgency.text}</span>}
    </div>
  );
}

function SectionCard({ section, direction }: { section: InfographicSpec["sections"][number]; direction: "rtl" | "ltr" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: "#0B1F3A" }}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white shrink-0">
          {iconSvgs[section.icon] || iconSvgs.scales}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#C69214] text-white text-xs font-bold">
            {section.number}
          </span>
          <h3 className="text-white font-semibold text-base">{section.title}</h3>
        </div>
      </div>
      <div className="p-5">
        {section.layout === "two_columns" && section.columns ? (
          <div className={`grid grid-cols-2 gap-4`}>
            {section.columns.map((col, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <div className="font-semibold text-sm text-[#0B1F3A] mb-1">{col.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{col.text}</p>
              </div>
            ))}
          </div>
        ) : section.layout === "checklist" ? (
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className={`flex items-start gap-3 text-sm text-gray-700 ${direction === "rtl" ? "flex-row-reverse text-right" : ""}`}>
                <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded bg-[#0E6268] text-white shrink-0 text-[10px] font-bold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : section.layout === "timeline" ? (
          <div className="relative">
            <div className={`absolute top-0 bottom-0 w-0.5 bg-[#0E6268]/20 ${direction === "rtl" ? "right-4" : "left-4"}`} />
            <ol className="space-y-4">
              {section.items.map((item, i) => (
                <li key={i} className={`relative flex items-start gap-4 ${direction === "rtl" ? "flex-row-reverse text-right" : ""}`}>
                  <span className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#C69214] text-white text-xs font-bold shrink-0 ${direction === "rtl" ? "ml-4" : "mr-4"}`}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed pt-1">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className={`flex items-start gap-3 text-sm text-gray-700 ${direction === "rtl" ? "flex-row-reverse text-right" : ""}`}>
                <span className="mt-1 w-2 h-2 rounded-full bg-[#0E6268] shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function VisualizationPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = use(params);
  const lang = locale === "ar" ? "ar" : "en";
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [spec, setSpec] = useState<InfographicSpec | null | undefined>(undefined);

  const loadInfographic = useCallback(async () => {
    try {
      const res = await fetch(`/api/visualizations?slug=${id}&lang=${lang}`);
      if (!res.ok) {
        setSpec(null);
        return;
      }
      const data = await res.json();
      setSpec(data.infographic ?? null);
    } catch {
      setSpec(null);
    }
  }, [id, lang]);

  useMemo(() => {
    loadInfographic();
  }, [loadInfographic]);

  const handlePrint = () => {
    window.print();
  };

  if (spec === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[#0E6268] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">{lang === "ar" ? "جارٍ التحميل..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (spec === null) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <a href={`/${locale}/topics`} className="text-sm text-[#0E6268] hover:underline mb-4 inline-block">
          {lang === "ar" ? "العودة للمواضيع" : "Back to Topics"}
        </a>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center py-12">
          <div className="text-4xl mb-3">📊</div>
          <h1 className="text-xl font-bold text-[#0B1F3A] mb-2">
            {lang === "ar" ? "الإنفوغرافيك غير موجود" : "Infographic Not Found"}
          </h1>
          <p className="text-sm text-gray-500">
            {lang === "ar"
              ? "لم يتم العثور على إنفوغرافيك لهذا الموضوع."
              : "No infographic is available for this topic."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir={direction} className={`min-h-screen bg-gray-50`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 print:py-0">
        <div className="no-print mb-4">
          <a href={`/${locale}/topics`} className="text-sm text-[#0E6268] hover:underline inline-flex items-center gap-1">
            {direction === "ltr" ? (
              <>&larr; Back to Topics</>
            ) : (
              <>العودة للمواضيع &rarr;</>
            )}
          </a>
        </div>

        <div id="infographic-card" className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 text-center" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #0E6268 100%)" }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{spec.title}</h1>
            <p className="text-white/80 text-sm sm:text-base mb-4">{spec.subtitle}</p>
            <SeverityBadge spec={spec} />
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {spec.sections.map((section) => (
              <SectionCard key={section.number} section={section} direction={direction} />
            ))}
          </div>

          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
            <div className="text-xs text-gray-500 space-y-2">
              <div>
                <span className="font-semibold text-gray-700">{lang === "ar" ? "المصادر:" : "Sources:"}</span>
                {spec.sources.map((s, i) => (
                  <span key={i} className="ml-2">
                    {s.label}{s.reference ? ` (${s.reference})` : ""}
                  </span>
                ))}
              </div>
              <div>
                <span className="font-semibold text-gray-700">{lang === "ar" ? "آخر مراجعة:" : "Last reviewed:"}</span>{" "}
                {spec.last_reviewed}
              </div>
              <div className="italic text-gray-400">{spec.disclaimer}</div>
            </div>
          </div>
        </div>

        <div className="no-print mt-4 flex justify-end">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0E6268] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b5257]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
            </svg>
            {lang === "ar" ? "حفظ كصورة" : "Save as Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
