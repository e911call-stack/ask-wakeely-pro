"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const ragStats = {
  totalChunks: 1247,
  eligibleChunks: 1189,
  indexedChunks: 1156,
  lastIndexingJob: "2026-05-14T22:00:00",
  lastIndexingDuration: "4m 32s",
  lastIndexingStatus: "completed" as const,
  embeddingModel: "text-embedding-3-small",
  chunkSize: 512,
  chunkOverlap: 50,
  totalDocuments: 24,
  documentsProcessed: 22,
  documentsPending: 2,
  avgRelevanceScore: 0.87,
};

const recentJobs = [
  { id: "job-001", type: "full_reindex", status: "completed", started: "2026-05-14T22:00:00", duration: "4m 32s", chunksProcessed: 1189 },
  { id: "job-002", type: "incremental", status: "completed", started: "2026-05-14T18:00:00", duration: "1m 12s", chunksProcessed: 45 },
  { id: "job-003", type: "incremental", status: "completed", started: "2026-05-13T22:00:00", duration: "2m 05s", chunksProcessed: 89 },
  { id: "job-004", type: "full_reindex", status: "failed", started: "2026-05-12T22:00:00", duration: "0m 45s", chunksProcessed: 0 },
];

const practiceAreaChunks: Record<string, { ar: string; en: string; count: number; eligible: number }> = {
  labor: { ar: "قانون العمل", en: "Labor Law", count: 234, eligible: 228 },
  rent: { ar: "الإيجار", en: "Rent Law", count: 198, eligible: 192 },
  family: { ar: "الأحوال الشخصية", en: "Family Law", count: 176, eligible: 170 },
  debt: { ar: "الديون", en: "Debt Law", count: 165, eligible: 158 },
  traffic: { ar: "المرور", en: "Traffic Law", count: 142, eligible: 138 },
  cybercrime: { ar: "الجرائم الإلكترونية", en: "Cybercrime", count: 118, eligible: 112 },
  small_business: { ar: "الأعمال الصغيرة", en: "Small Business", count: 105, eligible: 100 },
  court_procedures: { ar: "إجراءات المحاكم", en: "Court Procedures", count: 109, eligible: 91 },
};

const statusColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  running: "bg-blue-100 text-blue-700",
  failed: "bg-rose-100 text-rose-700",
  queued: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, { ar: string; en: string }> = {
  completed: { ar: "مكتمل", en: "Completed" },
  running: { ar: "قيد التشغيل", en: "Running" },
  failed: { ar: "فشل", en: "Failed" },
  queued: { ar: "في القائمة", en: "Queued" },
};

const jobTypeLabels: Record<string, { ar: string; en: string }> = {
  full_reindex: { ar: "إعادة فهرسة كاملة", en: "Full Reindex" },
  incremental: { ar: "فهرسة تدريجية", en: "Incremental" },
  single_document: { ar: "فهرسة مستند واحد", en: "Single Document" },
};

export default function RAGPage({
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
          <span className="text-white">{locale === "ar" ? "نظام RAG" : "RAG System"}</span>
        </div>
        <h1 className="text-xl font-bold">{locale === "ar" ? "نظرة عامة على نظام RAG" : "RAG System Overview"}</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: locale === "ar" ? "إجمالي الأجزاء" : "Total Chunks", value: ragStats.totalChunks.toLocaleString(), color: "text-navy", bg: "bg-navy/5" },
            { label: locale === "ar" ? "أجزاء مؤهلة" : "Eligible Chunks", value: ragStats.eligibleChunks.toLocaleString(), color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: locale === "ar" ? "مؤشّرة" : "Indexed", value: ragStats.indexedChunks.toLocaleString(), color: "text-blue-600", bg: "bg-blue-50" },
            { label: locale === "ar" ? "متوسط درجة الصلة" : "Avg Relevance", value: ragStats.avgRelevanceScore.toString(), color: "text-gold", bg: "bg-gold/5" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-gray-100 shadow-sm`}>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-sm text-muted mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "الأجزاء حسب المجال" : "Chunks by Practice Area"}
            </h3>
            <div className="space-y-3">
              {Object.entries(practiceAreaChunks).map(([key, area]) => {
                const pct = Math.round((area.eligible / area.count) * 100);
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{locale === "ar" ? area.ar : area.en}</span>
                      <span className="text-muted">{area.eligible}/{area.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-navy mb-4">
              {locale === "ar" ? "إعدادات النظام" : "System Configuration"}
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label: locale === "ar" ? "نموذج التضمين" : "Embedding Model", value: ragStats.embeddingModel },
                { label: locale === "ar" ? "حجم الجزء" : "Chunk Size", value: `${ragStats.chunkSize} tokens` },
                { label: locale === "ar" ? "التراكب" : "Overlap", value: `${ragStats.chunkOverlap} tokens` },
                { label: locale === "ar" ? "إجمالي المستندات" : "Total Documents", value: ragStats.totalDocuments.toString() },
                { label: locale === "ar" ? "تمت معالجتها" : "Processed", value: ragStats.documentsProcessed.toString() },
                { label: locale === "ar" ? "معلقة" : "Pending", value: ragStats.documentsPending.toString() },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-muted">{item.label}</span>
                  <span className="text-gray-700 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <a
                href={nav("/rag/documents")}
                className="block w-full px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors text-center"
              >
                {locale === "ar" ? "إدارة المستندات" : "Manage Documents"}
              </a>
              <a
                href={nav("/rag/ingestion-jobs")}
                className="block w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
              >
                {locale === "ar" ? "مهام المعالجة" : "Ingestion Jobs"}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-navy mb-4">
            {locale === "ar" ? "آخر مهام الفهرسة" : "Recent Indexing Jobs"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المعرّف" : "ID"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "النوع" : "Type"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "تاريخ البدء" : "Started"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المدة" : "Duration"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الأجزاء المعالجة" : "Chunks Processed"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-muted">{job.id}</td>
                    <td className="px-4 py-3 text-sm">{locale === "ar" ? jobTypeLabels[job.type]?.ar : jobTypeLabels[job.type]?.en}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                        {locale === "ar" ? statusLabels[job.status]?.ar : statusLabels[job.status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(job.started).toLocaleString(locale === "ar" ? "ar-JO" : "en-US")}
                    </td>
                    <td className="px-4 py-3 text-muted">{job.duration}</td>
                    <td className="px-4 py-3 text-muted">{job.chunksProcessed.toLocaleString()}</td>
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
