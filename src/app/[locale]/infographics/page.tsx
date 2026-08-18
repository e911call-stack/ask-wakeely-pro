import { Suspense } from "react";
import InfographicsClient from "./InfographicsClient";

export default async function InfographicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-gray-500">Loading...</div>}>
      <InfographicsClient locale={locale} />
    </Suspense>
  );
}
