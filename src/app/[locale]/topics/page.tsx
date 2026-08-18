import { Suspense } from "react";
import TopicsClient from "./TopicsClient";

export default async function TopicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-gray-500">Loading...</div>}>
      <TopicsClient locale={locale} />
    </Suspense>
  );
}
