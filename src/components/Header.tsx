"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";

const navItems = (locale: Locale) => [
  { href: `/${locale}/ask`, label: t(locale, "ask_page") },
  { href: `/${locale}/topics`, label: t(locale, "topics") },
  { href: `/${locale}/infographics`, label: locale === "ar" ? "الإنفوغرافيك" : "Infographics" },
  { href: `/${locale}/lawyers`, label: t(locale, "lawyers") },
  { href: `/${locale}/about`, label: t(locale, "about") },
];

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const items = navItems(locale);

  return (
    <header className="bg-navy text-white shadow-lg sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl">
            <span className="text-gold text-2xl">⚖</span>
            <span className="hidden sm:inline">{t(locale, "site_name")}</span>
            <span className="sm:hidden">{locale === "ar" ? "وكيلي" : "WP"}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  pathname.startsWith(item.href) ? "text-gold border-b-2 border-gold pb-1" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/login`}
              className="px-3 py-1.5 rounded-lg border border-white/30 text-sm hover:bg-white/10 transition-colors"
            >
              {t(locale, "login")}
            </Link>
            <Link
              href={switchPath}
              className="px-2 py-1 rounded text-xs text-white/60 hover:text-white transition-colors"
            >
              {t(locale, "language_switch")}
            </Link>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 px-4 text-sm hover:bg-white/10 rounded transition-colors ${
                  pathname.startsWith(item.href) ? "text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/login`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 px-4 text-sm hover:bg-white/10 rounded text-gold"
            >
              {t(locale, "login")}
            </Link>
            <Link
              href={switchPath}
              onClick={() => setMobileOpen(false)}
              className="block py-2 px-4 text-sm hover:bg-white/10 rounded text-white/60"
            >
              {t(locale, "language_switch")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
