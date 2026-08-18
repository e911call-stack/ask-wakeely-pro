import { notFound } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { getLawyerById } from "@/lib/lawyers-data";
import ContactLawyerForm from "@/components/ContactLawyerForm";

export default async function LawyerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const loc = locale as Locale;
  const lawyer = getLawyerById(id);

  if (!lawyer) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <a href={`/${loc}`} className="hover:text-primary">{t(loc, "home")}</a>
        <span className="mx-2">/</span>
        <a href={`/${loc}/lawyers`} className="hover:text-primary">{t(loc, "lawyers")}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{loc === "ar" ? lawyer.name_ar : lawyer.name_en}</span>
      </nav>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {loc === "ar" ? lawyer.name_ar : lawyer.name_en}
            </h1>
            <p className="text-gray-500">{lawyer.membership_id}</p>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            lawyer.verification_status === "verified"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {loc === "ar" ? "موثق" : "Verified"}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
          {loc === "ar" ? lawyer.bio_ar : lawyer.bio_en}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {loc === "ar" ? "المعلومات الأساسية" : "Basic Info"}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>📍 {lawyer.governorates.join(", ")}</div>
              <div>🗣 {lawyer.languages.join(", ")}</div>
              <div>📅 {loc === "ar" ? `${lawyer.years_experience} سنة خبرة` : `${lawyer.years_experience} years experience`}</div>
              {lawyer.pricing && <div>💰 {lawyer.pricing}</div>}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {loc === "ar" ? "مجالات التخصص" : "Practice Areas"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {lawyer.practice_areas.map((area) => (
                <span key={area} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                  {area.replace("_", " ")}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {loc === "ar" ? "أنواع الخدمات" : "Service Types"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {lawyer.service_types.map((st) => (
                <span key={st} className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full capitalize">
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ContactLawyerForm lawyer={lawyer} locale={loc} />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
        ⚠ {loc === "ar"
          ? "المنصة لا توفر مطابقة تلقائية أو ضمان تمثيل. التواصل مع المحامٍ هو اتفاق مستقل بينك وبين المحامٍ."
          : "The platform does not provide automated matching or guarantee of representation. Contacting a lawyer is an independent arrangement between you and the lawyer."}
      </div>
    </div>
  );
}
