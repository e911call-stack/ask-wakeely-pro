"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

const mockJobs = [
  { id: "job-001", type: "full_reindex", status: "completed" as const, started: "2026-05-14T22:00:00", completed: "2026-05-14T22:04:32", chunksProcessed: 1189, chunksFailed: 0, triggeredBy: "system", error: null },
  { id: "job-002", type: "incremental", status: "completed" as const, started: "2026-05-14T18:00:00", completed: "2026-05-14T18:01:12", chunksProcessed: 45, chunksFailed: 0, triggeredBy: "admin", error: null },
  { id: "job-003", type: "incremental", status: "completed" as const, started: "2026-05-13T22:00:00", completed: "2026-05-13T22:02:05", chunksProcessed: 89, chunksFailed: 2, triggeredBy: "system", error: null },
  { id: "job-004", type: "full_reindex", status: "failed" as const, started: "2026-05-12T22:00:00", completed: "2026-05-12T22:00:45", chunksProcessed: 0, chunksFailed: 1189, triggeredBy: "system", error: "Embedding API timeout" },
  { id: "job-005", type: "single_document", status: "completed" as const, started: "2026-05-12T14:00:00", completed: "2026-05-12T14:00:32", chunksProcessed: 23, chunksFailed: 0, triggeredBy: "admin", error: null },
  { id: "job-006", type: "incremental", status: "running" as const, started: "2026-05-15T08:00:00", completed: null, chunksProcessed: 12, chunksFailed: 0, triggeredBy: "admin", error: null },
  { id: "job-007", type: "incremental", status: "queued" as const, started: null, completed: null, chunksProcessed: 0, chunksFailed: 0, triggeredBy: "system", error: null },
];

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
  single_document: { ar: "مستند واحد", en: "Single Document" },
};

const triggeredByLabels: Record<string, { ar: string; en: string }> = {
  system: { ar: "النظام", en: "System" },
  admin: { ar: "مشرف", en: "Admin" },
};

export default function IngestionJobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ar");
  const [jobs, setJobs] = useState(mockJobs);

  useEffect(() => {
    params.then(({ locale: loc }) => setLocale(loc as Locale));
  }, [params]);

  const nav = (path: string) => `/${locale}/admin${path}`;

  const handleRetry = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: "queued" as const, error: null, started: null, completed: null, chunksProcessed: 0, chunksFailed: 0 }
          : j
      )
    );
  };

  return (
    <div className="min-h-screen bg-surface-dim" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="bg-navy text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <a href={nav("")} className="hover:text-white">{locale === "ar" ? "لوحة التحكم" : "Admin"}</a>
          <span>/</span>
          <a href={nav("/rag")} className="hover:text-white">{locale === "ar" ? "نظام RAG" : "RAG"}</a>
          <span>/</span>
          <span className="text-white">{locale === "ar" ? "مهام المعالجة" : "Ingestion Jobs"}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{locale === "ar" ? "مهام المعالجة والฟهرسة" : "Ingestion & Indexing Jobs"}</h1>
          <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition-colors">
            {locale === "ar" ? "تشغيل فهرسة جديدة" : "Start New Indexing"}
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: locale === "ar" ? "إجمالي المهام" : "Total Jobs", value: jobs.length, color: "text-navy" },
            { label: locale === "ar" ? "مكتملة" : "Completed", value: jobs.filter((j) => j.status === "completed").length, color: "text-emerald-600" },
            { label: locale === "ar" ? "قيد التشغيل" : "Running", value: jobs.filter((j) => j.status === "running").length, color: "text-blue-600" },
            { label: locale === "ar" ? "فشلت" : "Failed", value: jobs.filter((j) => j.status === "failed").length, color: "text-rose-600" },
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
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "المعرّف" : "ID"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "النوع" : "Type"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الحالة" : "Status"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "التشغيل من قبل" : "Triggered By"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "تاريخ البدء" : "Started"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "انتهى" : "Completed"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الأجزاء" : "Chunks"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "الخطأ" : "Error"}</th>
                  <th className="text-start px-4 py-3 font-medium text-gray-700">{locale === "ar" ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-muted">{job.id}</td>
                    <td className="px-4 py-3 text-sm">{locale === "ar" ? jobTypeLabels[job.type]?.ar : jobTypeLabels[job.type]?.en}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                        {locale === "ar" ? statusLabels[job.status]?.ar : statusLabels[job.status]?.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{locale === "ar" ? triggeredByLabels[job.triggeredBy]?.ar : triggeredByLabels[job.triggeredBy]?.en}</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {job.started ? new Date(job.started).toLocaleString(locale === "ar" ? "ar-JO" : "en-US") : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {job.completed ? new Date(job.completed).toLocaleString(locale === "ar" ? "ar-JO" : "en-US") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <span className="text-emerald-600 font-medium">{job.chunksProcessed}</span>
                        {job.chunksFailed > 0 && (
                          <span className="text-rose-600 mr-1">/ {job.chunksFailed} failed</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {job.error ? (
                        <span className="text-xs text-rose-600 max-w-[200px] truncate block">{job.error}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {job.status === "failed" && (
                        <button
                          onClick={() => handleRetry(job.id)}
                          className="px-3 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium hover:bg-amber-100 transition-colors"
                        >
                          {locale === "ar" ? "إعادة المحاولة" : "Retry"}
                        </button>
                      )}
                      {job.status === "running" && (
                        <span className="text-xs text-blue-600">
                          {locale === "ar" ? "جاري..." : "Running..."}
                        </span>
                      )}
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
