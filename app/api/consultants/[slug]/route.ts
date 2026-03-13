import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONSULTANT } from "@/lib/mock-data";

const BACKEND = process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${BACKEND}/api/users/${encodeURIComponent(slug)}/site-config`,
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Backend unavailable, fall through to mock
  }

  // Fallback to mock data
  if (slug === MOCK_CONSULTANT.siteConfig.slug) {
    return NextResponse.json(MOCK_CONSULTANT);
  }

  return NextResponse.json(
    { error: "Consultant not found" },
    { status: 404 }
  );
}
