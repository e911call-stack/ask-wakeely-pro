import { NextResponse } from "next/server";
import { getTopics, searchTopics } from "@/lib/topics-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const area = searchParams.get("area");
  const locale = (searchParams.get("locale") || "ar") as "ar" | "en";

  if (query) {
    const results = searchTopics(query, locale);
    return NextResponse.json({ topics: results, count: results.length });
  }

  if (area && area !== "all") {
    const { getTopicsByArea } = await import("@/lib/topics-data");
    const topics = getTopicsByArea(area as never);
    return NextResponse.json({ topics, count: topics.length });
  }

  const topics = getTopics();
  return NextResponse.json({ topics, count: topics.length });
}
