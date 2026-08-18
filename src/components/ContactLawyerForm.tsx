"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import type { Lawyer } from "@/lib/types";

export default function ContactLawyerForm({
  lawyer,
  locale,
}: {
  lawyer: Lawyer;
  locale: Locale;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-700">
        ✓ {locale === "ar" ? "تم إرسال طلب التوصيل بنجاح. سيتواصل معك المحامٍ قريباً." : "Your contact request has been sent. The lawyer will reach out to you shortly."}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
      >
        {t(locale, "talk_to_lawyer")}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t pt-6">
          <h3 className="font-semibold text-gray-800">{t(locale, "contact_request")}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "your_name")}</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "your_email")}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "your_phone")}</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "your_message")}</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            {t(locale, "send_request")}
          </button>
        </form>
      )}
    </>
  );
}
