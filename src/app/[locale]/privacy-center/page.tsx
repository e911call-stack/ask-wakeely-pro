import { t, type Locale } from "@/lib/i18n";

export default async function PrivacyCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-navy mb-2">
        {loc === "ar" ? "مركز الخصوصية" : "Privacy Center"}
      </h1>
      <p className="text-muted mb-8">
        {loc === "ar"
          ? "إدارة بياناتك وخصوصيتك وفقاً لقانون حماية البيانات الشخصية رقم 24 لسنة 2023"
          : "Manage your data and privacy under Jordan's Personal Data Protection Law No. 24 of 2023"}
      </p>

      <div className="space-y-4">
        {[
          { icon: "👁", ar: "الوصول إلى بياناتي", en: "Access My Data", desc_ar: "اطلع على جميع البيانات الشخصية المحفوظة لدينا", desc_en: "View all personal data we have stored" },
          { icon: "✏️", ar: "تصحيح بياناتي", en: "Correct My Data", desc_ar: "تصحيح أي بيانات غير دقيقة", desc_en: "Correct any inaccurate data" },
          { icon: "🗑", ar: "حذف حسابي وبياناتي", en: "Delete My Account & Data", desc_ar: "طلب حذف حسابك وجميع بياناتك الشخصية", desc_en: "Request deletion of your account and all personal data" },
          { icon: "📦", ar: "تصدير بياناتي", en: "Export My Data", desc_ar: "تحميل نسخة من جميع بياناتك الشخصية", desc_en: "Download a copy of all your personal data" },
          { icon: "🔒", ar: "تقييد المعالجة", en: "Restrict Processing", desc_ar: "تقييد كيفية معالجة بياناتك", desc_en: "Restrict how your data is processed" },
          { icon: "🚫", ar: "الاعتراض على المعالجة", en: "Object to Processing", desc_ar: "الاعتراض على معالجة بياناتك لأغراض معينة", desc_en: "Object to processing of your data for specific purposes" },
          { icon: "🔄", ar: "سحب الموافقة", en: "Withdraw Consent", desc_ar: "سحب موافقتك على معالجة بياناتك", desc_en: "Withdraw your consent for data processing" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-navy">
                {loc === "ar" ? item.ar : item.en}
              </h3>
              <p className="text-sm text-muted mt-0.5">
                {loc === "ar" ? item.desc_ar : item.desc_en}
              </p>
            </div>
            <span className="text-gray-300 mt-1">
              {loc === "ar" ? "←" : "→"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h3 className="font-semibold text-amber-800 mb-2">
          {loc === "ar" ? "تواصل معنا" : "Contact Us"}
        </h3>
        <p className="text-sm text-amber-700">
          {loc === "ar"
            ? "للأسئلة المتعلقة بالخصوصية أو لممارسة حقوقك، يرجى التواصل عبر: privacy@askwakeelypro.jo"
            : "For privacy-related inquiries or to exercise your rights, please contact: privacy@askwakeelypro.jo"}
        </p>
      </div>
    </div>
  );
}
