import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-navy text-white/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <span className="text-gold text-xl">⚖</span>
              <span>{t(locale, "site_name")}</span>
            </div>
            <p className="text-sm leading-relaxed">{t(locale, "site_tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/${locale}/ask`} className="hover:text-gold transition-colors">
                {t(locale, "ask_page")}
              </Link>
              <Link href={`/${locale}/topics`} className="hover:text-gold transition-colors">
                {t(locale, "topics")}
              </Link>
              <Link href={`/${locale}/lawyers`} className="hover:text-gold transition-colors">
                {t(locale, "lawyers")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">
              {locale === "ar" ? "قانونية" : "Legal"}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">
                {t(locale, "privacy")}
              </Link>
              <Link href={`/${locale}/about`} className="hover:text-gold transition-colors">
                {t(locale, "about")}
              </Link>
              <Link href={`/${locale}/privacy-center`} className="hover:text-gold transition-colors">
                {locale === "ar" ? "مركز الخصوصية" : "Privacy Center"}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">{t(locale, "disclaimer_title")}</h3>
            <p className="text-xs leading-relaxed text-white/60">
              {locale === "ar"
                ? "معلومات قانونية عامة وليست استشارة قانونية. قد تختلف النتيجة حسب الوقائع والمستندات."
                : "This is general legal information, not legal advice. The outcome may vary depending on the facts and available documents."}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {t(locale, "site_name")}.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
}
