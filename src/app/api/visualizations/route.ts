import { NextResponse } from "next/server";
import { getInfographic, getAvailableInfographicSlugs } from "@/lib/infographics-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const lang = searchParams.get("lang") as "ar" | "en" | null;

  if (slug && lang && (lang === "ar" || lang === "en")) {
    const infographic = getInfographic(slug, lang);
    if (!infographic) {
      return NextResponse.json({ error: "Infographic not found" }, { status: 404 });
    }
    return NextResponse.json({ infographic });
  }

  const slugs = getAvailableInfographicSlugs();
  return NextResponse.json({ available: slugs, count: slugs.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, lang } = body;

    if (!slug || !lang || (lang !== "ar" && lang !== "en")) {
      return NextResponse.json({ error: "slug and lang (ar|en) are required" }, { status: 400 });
    }

    const infographic = getInfographic(slug, lang);
    if (!infographic) {
      return NextResponse.json({ error: "Infographic not found" }, { status: 404 });
    }

    return NextResponse.json({ infographic });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
