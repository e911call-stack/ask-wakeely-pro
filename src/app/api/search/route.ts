import { NextResponse } from "next/server";
import { searchTopics } from "@/lib/topics-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const locale = (searchParams.get("locale") || "ar") as "ar" | "en";

  if (!query.trim()) {
    return NextResponse.json({ results: [], count: 0 });
  }

  const results = searchTopics(query, locale);
  return NextResponse.json({ results, count: results.length });
}
