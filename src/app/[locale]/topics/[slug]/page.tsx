import { notFound } from "next/navigation";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { getTopicBySlug } from "@/lib/topics-data";
import { infographicGallery } from "@/lib/infographics-data";
import { infographicUrl } from "@/lib/imagekit";
import Disclaimer from "@/components/Disclaimer";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const topic = getTopicBySlug(slug);

  if (!topic) notFound();

  const title = loc === "ar" ? topic.title_ar : topic.title_en;
  const summary = loc === "ar" ? topic.summary_ar : topic.summary_en;
  const explanation = loc === "ar" ? topic.explanation_ar : topic.explanation_en;
  const whenToAct = loc === "ar" ? topic.when_to_act_ar : topic.when_to_act_en;
  const steps = loc === "ar" ? topic.steps_ar : topic.steps_en;
  const documents = loc === "ar" ? topic.documents_ar : topic.documents_en;
  const deadlines = loc === "ar" ? topic.deadlines_ar : topic.deadlines_en;
  const lawyerRequired = loc === "ar" ? topic.lawyer_required_when_ar : topic.lawyer_required_when_en;
  const faqs = loc === "ar" ? topic.faqs_ar : topic.faqs_en;
  const keyFacts = loc === "ar" ? topic.key_facts_ar : topic.key_facts_en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${loc}`} className="hover:text-primary">
          {t(loc, "home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${loc}/topics`} className="hover:text-primary">
          {t(loc, "topics")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{title}</span>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
              {topic.practice_area.replace("_", " ")}
            </span>
            {(topic.urgency === "high" || topic.urgency === "critical") && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-600">
                {t(loc, "urgent")}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{summary}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <span>
              {t(loc, "last_reviewed")}: {topic.last_reviewed}
            </span>
            <span>
              {loc === "ar" ? "ال管辖" : "Jurisdiction"}: {topic.jurisdiction}
            </span>
          </div>
        </header>

        <Disclaimer locale={loc} />

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-primary">📋</span>
            {t(loc, "explanation")}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {explanation}
          </div>
        </section>

        {keyFacts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-primary">🔍</span>
              {t(loc, "key_facts")}
            </h2>
            <div className="bg-blue-50 rounded-lg p-5">
              <ul className="space-y-2">
                {keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-primary">⚠</span>
            {t(loc, "when_to_act")}
          </h2>
          <div className="text-gray-700 leading-relaxed bg-amber-50 rounded-lg p-5 border border-amber-200 whitespace-pre-line">
            {whenToAct}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-primary">📝</span>
            {t(loc, "steps_header")}
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <p className="text-gray-700">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-primary">📄</span>
            {t(loc, "documents_header")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {deadlines.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-primary">⏰</span>
              {t(loc, "deadlines_header")}
            </h2>
            <div className="bg-red-50 rounded-lg p-5 border border-red-200">
              <ul className="space-y-2">
                {deadlines.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">⏰</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {lawyerRequired.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-primary">👨‍⚖</span>
              {t(loc, "lawyer_header")}
            </h2>
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
              <ul className="space-y-2 mb-4">
                {lawyerRequired.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${loc}/lawyers`}
                className="inline-block px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
              >
                {t(loc, "talk_to_lawyer")}
              </Link>
            </div>
          </section>
        )}

        {topic.legal_sources.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-primary">📚</span>
              {t(loc, "source_header")}
            </h2>
            <div className="space-y-3">
              {topic.legal_sources.map((source, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="font-medium text-gray-800 mb-1">
                    {loc === "ar" ? source.law_name_ar : source.law_name_en}
                  </div>
                  <div className="text-sm text-gray-600">
                    {loc === "ar" ? "المادة" : "Article"}: {source.article}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>
                      {loc === "ar" ? "تاريخ السريان" : "Effective"}: {source.effective_date}
                    </span>
                    <span>
                      {loc === "ar" ? "آخر تحقق" : "Last verified"}: {source.last_verified}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      source.confidence === "high"
                        ? "bg-green-100 text-green-700"
                        : source.confidence === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {loc === "ar" ? "ثقة" : "Confidence"}: {source.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-primary">❓</span>
              {t(loc, "faqs_header")}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(() => {
          const related = infographicGallery.filter((ig) => ig.slug === slug);
          if (related.length === 0) return null;
          return (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-primary">📊</span>
                {loc === "ar" ? "الإنفوغرافيك المرتبط" : "Related Infographics"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((ig) => (
                  <Link
                    key={ig.id}
                    href={`/${loc}/infographics/${ig.id}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={infographicUrl(ig.filename, 600)}
                      alt={loc === "ar" ? ig.titleAr : ig.titleEn}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                        {loc === "ar" ? ig.titleAr : ig.titleEn}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {loc === "ar" ? ig.descriptionAr : ig.descriptionEn}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        <Disclaimer locale={loc} />
      </article>
    </div>
  );
}
