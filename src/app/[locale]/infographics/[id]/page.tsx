import { Suspense } from "react";
import InfographicDetailClient from "./InfographicDetailClient";

export default async function InfographicDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-gray-500">Loading...</div>}>
      <InfographicDetailClient locale={locale} id={id} />
    </Suspense>
  );
}
