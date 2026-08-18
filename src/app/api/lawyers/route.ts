import { NextResponse } from "next/server";
import { getLawyers, getLawyersByArea, getLawyersByGovernorate } from "@/lib/lawyers-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get("area");
  const governorate = searchParams.get("governorate");

  let lawyers = getLawyers();

  if (area && area !== "all") {
    lawyers = getLawyersByArea(area as never);
  }
  if (governorate && governorate !== "all") {
    lawyers = lawyers.filter((l) => l.governorates.includes(governorate));
  }

  return NextResponse.json({ lawyers, count: lawyers.length });
}
