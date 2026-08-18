import { t, type Locale } from "@/lib/i18n";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(loc, "privacy_policy")}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {loc === "ar" ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}
      </p>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "1. مقدمة" : "1. Introduction"}
          </h2>
          <p className="leading-relaxed">
            {loc === "ar"
              ? "تلتزم منصة \"اسأل القانون\" بحماية بياناتك الشخصية وفقاً لقانون حماية البيانات الشخصية رقم 24 لسنة 2023 (قانون حماية البيانات الشخصية الأردني) والتعليمات الصادرة بموجبه. تصف هذه السياسة كيفية جمع واستخدام وحماية بياناتك."
              : "\"Ask the Law\" is committed to protecting your personal data in compliance with Jordan's Personal Data Protection Law No. 24 of 2023 (the Jordanian PDPL) and related instructions. This policy describes how we collect, use, and protect your data."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "2. البيانات التي نجمعها" : "2. Data We Collect"}
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>{loc === "ar" ? "بيانات الحساب:" : "Account Data:"}</strong>{" "}
              {loc === "ar" ? "الاسم، البريد الإلكتروني، كلمة المرور (مشفرة)" : "Name, email, password (encrypted)"}
            </li>
            <li>
              <strong>{loc === "ar" ? "بيانات الاستخدام:" : "Usage Data:"}</strong>{" "}
              {loc === "ar" ? "الصفحات التي تزورها، عمليات البحث، المواضيع المطلوبة" : "Pages visited, searches performed, topics requested"}
            </li>
            <li>
              <strong>{loc === "ar" ? "رسائل المساعد:" : "Chat Messages:"}</strong>{" "}
              {loc === "ar" ? "أسئلتك في المساعد القانوني (لتحسين المحتوى فقط)" : "Your questions to the AI assistant (for content improvement only)"}
            </li>
            <li>
              <strong>{loc === "ar" ? "بيانات طلبات التواصل:" : "Contact Request Data:"}</strong>{" "}
              {loc === "ar" ? "الاسم، البريد الإلكتروني، الهاتف، الرسالة عند التواصل مع محامٍ" : "Name, email, phone, message when contacting a lawyer"}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "3. كيف نستخدم بياناتك" : "3. How We Use Your Data"}
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>{loc === "ar" ? "توفير وتحسين خدمات المنصة" : "To provide and improve platform services"}</li>
            <li>{loc === "ar" ? "تخصيص تجربتك بناءً على اهتماماتك" : "To personalize your experience based on your interests"}</li>
            <li>{loc === "ar" ? "تحسين المحتوى القانوني بناءً على الأسئلة الشائعة" : "To improve legal content based on common questions"}</li>
            <li>{loc === "ar" ? "تمكين التواصل بينك والمحامين عند طلبك" : "To enable communication between you and lawyers at your request"}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "4. حماية البيانات" : "4. Data Protection"}
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>{loc === "ar" ? "تشفير البيانات أثناء النقل والتخزين" : "Encryption of data at rest and in transit"}</li>
            <li>{loc === "ar" ? "صلاحيات وصول محدودة حسب الدور" : "Role-based access controls"}</li>
            <li>{loc === "ar" ? "سجلات تدقيق لجميع التغييرات" : "Audit logs for all changes"}</li>
            <li>{loc === "ar" ? "فصل البيانات الشخصية عن محتوى المكتبة" : "Separation of personal data from library content"}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "5. حقوقك" : "5. Your Rights"}
          </h2>
          <p className="leading-relaxed mb-3">
            {loc === "ar"
              ? "لديك الحق في:"
              : "You have the right to:"}
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>{loc === "ar" ? "الوصول إلى بياناتك الشخصية" : "Access your personal data"}</li>
            <li>{loc === "ar" ? "تصحيح البيانات غير الدقيقة" : "Correct inaccurate data"}</li>
            <li>{loc === "ar" ? "طلب حذف بياناتك" : "Request deletion of your data"}</li>
            <li>{loc === "ar" ? "تقيد معالجة بياناتك" : "Restrict processing of your data"}</li>
            <li>{loc === "ar" ? "تقديم شكوى للجهة المختصة" : "File a complaint with the relevant authority"}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "6. الاحتفاظ بالبيانات" : "6. Data Retention"}
          </h2>
          <p className="leading-relaxed">
            {loc === "ar"
              ? "نحتفظ ببياناتك الشخصية فقط للمدة اللازمة لتحقيق الغرض من جمعها، أو كما يتطلب القانون. بيانات الحساب تُحذف خلال 30 يوماً من طلب الحذف."
              : "We retain your personal data only for as long as necessary to fulfill the purpose for which it was collected, or as required by law. Account data is deleted within 30 days of a deletion request."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "7. النقل العابر للحدود" : "7. Cross-Border Transfers"}
          </h2>
          <p className="leading-relaxed">
            {loc === "ar"
              ? "إذا استضفنا البيانات خارج الأردن، سنضمن وجود ضمانات كافية وفقاً لقانون حماية البيانات الشخصية رقم 24 لسنة 2023، أو نحصل على موافقة صريحة منك."
              : "If we host data outside Jordan, we will ensure adequate safeguards are in place as required by Jordan's PDPL No. 24 of 2023, or obtain your explicit consent."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "8. إخطار بانتهاك البيانات" : "8. Data Breach Notification"}
          </h2>
          <p className="leading-relaxed">
            {loc === "ar"
              ? "في حالة حدوث انتهاك للبيانات، سنقوم بإخطار الجهات المختصة والأشخاص المتأثرين في الوقت المطلوب قانونياً."
              : "In the event of a data breach, we will notify the relevant authorities and affected individuals within the legally required timeframes."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {loc === "ar" ? "9. التواصل معنا" : "9. Contact Us"}
          </h2>
          <p className="leading-relaxed">
            {loc === "ar"
              ? "للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك، يرجى التواصل عبر: privacy@askthelaw.jo"
              : "For privacy-related inquiries or to exercise your rights, please contact: privacy@askthelaw.jo"}
          </p>
        </section>
      </div>
    </div>
  );
}
