"use client";

import { useState } from "react";
import { type Locale } from "@/lib/i18n";

export default function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale] = useState<"ar" | "en">("ar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-accent text-3xl">⚖</span>
          <h1 className="text-2xl font-bold text-navy mt-2">
            {locale === "ar" ? "إنشاء حساب جديد" : "Create Account"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {locale === "ar" ? "انضم إلى اسأل وكيلي" : "Join Ask Wakeely Pro"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {locale === "ar" ? "التسجيل بحساب Google" : "Sign up with Google"}
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              {locale === "ar" ? "التسجيل بحساب Apple" : "Sign up with Apple"}
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-muted">{locale === "ar" ? "أو" : "or"}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {locale === "ar" ? "الاسم الكامل" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {locale === "ar" ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {locale === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors text-sm"
            >
              {locale === "ar" ? "إنشاء حساب" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-4">
          {locale === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
          <a href={`/${locale}/login`} className="text-secondary font-medium hover:underline">
            {locale === "ar" ? "تسجيل الدخول" : "Sign In"}
          </a>
        </p>
      </div>
    </div>
  );
}
