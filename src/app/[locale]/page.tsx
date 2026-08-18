import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import SearchBar from "@/components/SearchBar";
import PracticeAreaGrid from "@/components/PracticeAreaGrid";
import TopicCard from "@/components/TopicCard";
import { getTopics } from "@/lib/topics-data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const topics = getTopics().slice(0, 6);

  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4 text-sm">
            <span className="text-gold">⚖</span>
            <span>{loc === "ar" ? "منصة معرفة قانونية أردنية" : "Jordanian Legal Knowledge Platform"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {loc === "ar" ? "اسأل عن مشكلتك القانونية" : "Ask About Your Legal Issue"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {loc === "ar"
              ? "صف مشكلتك القانونية بلغة بسيطة. نساعدك في فهم المشكلة العامة والعوامل ذات الصلة والخطوات العملية التالية والمستندات المطلوبة والمصادر الموثوقة ومتى يجب التواصل مع محامٍ مرخّص."
              : "Describe your legal issue in plain language. We help you understand the general issue, relevant factors, practical next steps, documents to keep, verified sources, and when to contact a licensed lawyer."}
          </p>
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar locale={loc} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${loc}/ask`}
              className="px-8 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-accent-light transition-colors"
            >
              {t(loc, "ask_page")}
            </Link>
            <Link
              href={`/${loc}/topics`}
              className="px-8 py-3 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              {t(loc, "browse_topics")}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl">🚨</div>
            <div className="flex-1 text-center md:text-start">
              <h3 className="font-bold text-red-800 mb-1">{t(loc, "home_urgent_banner")}</h3>
              <p className="text-sm text-red-600">{t(loc, "home_urgent_sub")}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${loc}/lawyers`}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {t(loc, "find_lawyer")}
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-navy mb-2 text-center">{t(loc, "home_practice_areas")}</h2>
        <p className="text-muted mb-8 text-center">{t(loc, "home_practice_areas_sub")}</p>
        <PracticeAreaGrid locale={loc} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-navy">{t(loc, "all_topics")}</h2>
          <Link href={`/${loc}/topics`} className="text-secondary hover:text-secondary-light font-medium text-sm">
            {t(loc, "view_all")} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} locale={loc} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-navy to-secondary rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {loc === "ar" ? "هل تحتاج مساعدة قانونية؟" : "Need Legal Help?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {loc === "ar"
              ? "صف مشكلتك القانونية وسنوجهك إلى المعلومات المناسبة في المكتبة"
              : "Describe your legal issue and we'll guide you to the right information in the library"}
          </p>
          <Link
            href={`/${loc}/ask`}
            className="inline-block px-8 py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-accent-light transition-colors"
          >
            {t(loc, "ask_page")}
          </Link>
        </div>
      </section>
    </div>
  );
}
