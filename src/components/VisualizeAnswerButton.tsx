"use client";

import { infographicGallery } from "@/lib/infographics-data";

type Props = {
  topicSlug: string;
  language: "ar" | "en";
  disabled?: boolean;
};

export default function VisualizeAnswerButton({ topicSlug, language, disabled = false }: Props) {
  const labels = {
    ar: {
      idle: "عرض الإنفوغرافيك",
      svg: "عرض بصري تفاعلي",
    },
    en: {
      idle: "View Infographic",
      svg: "Interactive Visual",
    },
  };

  const hasPng = infographicGallery.some((ig) => ig.slug === topicSlug);

  function handleClick() {
    if (hasPng) {
      const entry = infographicGallery.find((ig) => ig.slug === topicSlug);
      if (entry) {
        window.location.assign(`/${language}/infographics/${entry.id}`);
        return;
      }
    }
    window.location.assign(`/${language}/visualizations/${topicSlug}`);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span>{hasPng ? labels[language].idle : labels[language].svg}</span>
    </button>
  );
}
