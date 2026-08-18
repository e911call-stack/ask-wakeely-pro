import { t, type Locale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t(loc, "about_title")}</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 leading-relaxed mb-6">{t(loc, "about_text")}</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "ما هي هذه المنصة؟" : "What is this platform?"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {loc === "ar"
              ? "اسأل القانون هي مكتبة معرفة قانونية أردنية تقدم معلومات قانونية موثوقة ومنظمة ومربوطة بالمصادر الرسمية. المنصة مصممة لمساعدتك في فهم حقوقك وخطواتك التالية عندما تواجه مشكلة قانونية."
              : "Ask the Law is a Jordanian legal knowledge library that provides trustworthy, organized legal information linked to official sources. The platform is designed to help you understand your rights and next steps when you face a legal issue."}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "ما الذي نقدمه" : "What We Offer"}
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "معلومات قانونية موثوقة مبنية على القوانين الأردنية السارية" : "Trustworthy legal information based on current Jordanian laws"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "شرح مبسط للمشاكل القانونية الشائعة" : "Simplified explanations of common legal issues"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "خطوات عملية وما يجب فعله" : "Practical steps and what to do"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "قوائم المستندات المطلوبة" : "Required document checklists"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "روابط للمصادر القانونية الرسمية" : "Links to official legal sources"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{loc === "ar" ? "مساعد قانوني ذكي يوجهك للمحتوى المناسب" : "AI legal assistant to guide you to relevant content"}</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "ما الذي لا نقدمه" : "What We Do NOT Offer"}
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✕</span>
              <span>{loc === "ar" ? "استشارات قانونية مخصصة أو رأي قانوني" : "Personalized legal consultations or legal opinions"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✕</span>
              <span>{loc === "ar" ? "ضمان نتائج قانونية معينة" : "Guarantees of specific legal outcomes"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✕</span>
              <span>{loc === "ar" ? "تمثيل قانوني أو تقديم دعاوى نيابةً عنك" : "Legal representation or filing lawsuits on your behalf"}</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "ال/lgplات القانونية" : "Legal Coverage"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {loc === "ar"
              ? "نغطي مجالات قانونية متنوعة تشمل القانون العملي، الإيجار والعقارات، الأحوال الشخصية، الديون والتحصيل، المرور والتعويضات، الجرائم الإلكترونية، الأعمال الصغيرة، وإجراءات المحاكم."
              : "We cover diverse legal areas including labor law, rent & real estate, family law, debt & enforcement, traffic & compensation, cybercrime, small business, and court procedures."}
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-amber-800 mb-3">{t(loc, "disclaimer_title")}</h2>
          <p className="text-amber-700">{t(loc, "disclaimer_text")}</p>
        </section>
      </div>
    </div>
  );
}
