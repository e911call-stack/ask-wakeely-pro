import { type Locale } from "@/lib/i18n";

export default function Disclaimer({ locale }: { locale: Locale }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
      <div className="flex items-start gap-3">
        <span className="text-amber-600 text-xl mt-0.5">⚠</span>
        <div>
          <h4 className="font-semibold text-amber-800 text-sm mb-1">
            {locale === "ar" ? "تنبيه مهم" : "Important Disclaimer"}
          </h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            {locale === "ar"
              ? "هذه معلومات عامة وليست استشارة قانونية. لا يُغني هذا المحتوى عن استشارة محامٍ مختص. يجب على المستخدم التحقق من المعلومات واستشارة محامٍ مؤهل قبل اتخاذ أي إجراء قانوني. آخر مراجعة للمحتوى: 2026."
              : "This is general information, not legal advice. This content does not replace consultation with a qualified lawyer. Users should verify information and consult a qualified lawyer before taking any legal action. Last content review: 2026."}
          </p>
        </div>
      </div>
    </div>
  );
}
