"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockDocuments = [
  { id: "doc-001", title_ar: "قانون العمل الأردني - النص الكامل", title_en: "Jordanian Labor Law - Full Text", type: "pdf", extraction_status: "completed" as const, ingestion_status: "completed" as const, chunks: 156, pages: 45, uploaded_at: "2026-01-10", size: "2.4 MB" },
  { id: "doc-002", title_ar: "قانون الإيجار وال房屋", title_en: "Rent Law", type: "pdf", extraction_status: "completed" as const, ingestion_status: "completed" as const, chunks: 128, pages: 32, uploaded_at: "2026-01-10", size: "1.8 MB" },
  { id: "doc-003", title_ar: "القانون المدني الأردني", title_en: "Jordanian Civil Code", type: "pdf", extraction_status: "completed" as const, ingestion_status: "completed" as const, chunks: 234, pages: 78, uploaded_at: "2026-01-15", size: "3.6 MB" },
  { id: "doc-004", title_ar: "قانون حماية البيانات الشخصية", title_en: "Personal Data Protection Law", type: "pdf", extraction_status: "completed" as const, ingestion_status: "pending" as const, chunks: 0, pages: 18, uploaded_at: "2026-04-01", size: "0.9 MB" },
  { id: "doc-005", title_ar: "لائحة التنفيذ - حماية البيانات", title_en: "Executive Regulation - Data Protection", type: "pdf", extraction_status: "pending" as const, ingestion_status: "pending" as const, chunks: 0, pages: 12, uploaded_at: "2026-05-01", size: "0.5 MB" },
  { id: "doc-006", title_ar: "قانون أصول المحاكمات المدنية", title_en: "Civil Procedure Law", type: "docx", extraction_status: "completed" as const, ingestion_status: "completed" as const, chunks: 142, pages: 56, uploaded_at: "2026-02-01", size: "1.2 MB" },
  { id: "doc-007", title_ar: "thedicts.com - ملخصات القضايا", title_en: "thedicts.com - Case Summaries", type: "html", extraction_status: "completed" as const, ingestion_status: "completed" as const, chunks: 89, pages: 0, uploaded_at: "2026-03-01", size: "0.8 MB" },
  { id: "doc-008", title_ar: "التعميمات الصادرة عن نقابة المحامين", title_en: "Bar Association Circulars", type: "pdf", extraction_status: "failed" as const, ingestion_status: "pending" as const, chunks: 0, pages: 8, uploaded_at: "2026-05-10", size: "0.3 MB" },
];

const extractionColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-rose-100 text-rose-700",
  processing: "bg-blue-100 text-blue-700",
};

const ingestionColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-rose-100 text-rose-700",
  processing: "bg-blue-100 text-blue-700",
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  completed: { ar: "مكتمل", en: "Completed" },
  pending: { ar: "معلق", en: "Pending" },
  failed: { ar: "فشل", en: "Failed" },
  processing: { ar: "قيد المعالجة", en: "Processing" },
};

const typeIcons: Record<string, string> = {
  pdf: "📄",
  docx: "📝",
  html: "🌐",
};

export default function RAGDocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <a href={nav("/rag")} className="hover:text-white">{locale === "ar" ? "نظام RAG" : "RAG"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "المستندات" : "Documents"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "إدارة المستندات المصدرية" : "Source Documents"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: locale === "ar" ? "إجمالي المستندات" : "Total Documents", value: mockDocuments.length, color: "text-navy" },
            { label: locale === "ar" ? "تمت الاستخراج" : "Extracted", value: mockDocuments.filter((d) => d.extraction_status === "completed").length, color: "text-emerald-600" },
            { label: locale === "ar" ? "تمت المعالجة" : "Ingested", value: mockDocuments.filter((d) => d.ingestion_status === "completed").length, color: "text-blue-600" },
            { label: locale === "ar" ? "إجمالي الأجزاء" : "Total Chunks", value: mockDocuments.reduce((a, d) => a + d.chunks, 0).toLocaleString(), color: "text-gold" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-xs text-muted mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المستند" : "Document"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "النوع" : "Type"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحجم" : "Size"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الاستخراج" : "Extraction"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المعالجة" : "Ingestion"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الأجزاء" : "Chunks"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الصفحات" : "Pages"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{typeIcons[doc.type] || "📄"}</span>
                        <div>
                          <p className="font-medium text-gray-900">{locale === "ar" ? doc.title_ar : doc.title_en}</p>
                          <p className="text-xs text-muted">{doc.uploaded_at}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted uppercase text-xs font-medium">{doc.type}</td>
                    <td className="px-4 py-3 text-muted">{doc.size}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${extractionColors[doc.extraction_status]}`}>
                        {locale === "ar" ? statusLabels[doc.extraction_status]?.ar : statusLabels[doc.extraction_status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ingestionColors[doc.ingestion_status]}`}>
                        {locale === "ar" ? statusLabels[doc.ingestion_status]?.ar : statusLabels[doc.ingestion_status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted font-medium">{doc.chunks}</td>
                    <td className="px-4 py-3 text-muted">{doc.pages || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-navy/5 text-navy rounded text-xs font-medium hover:bg-navy/10 transition-colors">
                          {locale === "ar" ? "عرض" : "View"}
                        </button>
                        {doc.extraction_status !== "completed" && (
                          <button className="px-3 py-1 bg-teal/10 text-teal rounded text-xs font-medium hover:bg-teal/20 transition-colors">
                            {locale === "ar" ? "استخراج" : "Extract"}
                          </button>
                        )}
                        {doc.extraction_status === "completed" && doc.ingestion_status !== "completed" && (
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors">
                            {locale === "ar" ? "معالجة" : "Ingest"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
