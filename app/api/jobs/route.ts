import { NextRequest, NextResponse } from "next/server";
import { MOCK_JOBS } from "@/lib/mock-data";

const BACKEND = process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const consultant = searchParams.get("consultant");

  try {
    const res = await fetch(`${BACKEND}/api/jobs`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error("Backend error");

    const json = await res.json();
    let jobs = Array.isArray(json) ? json : (json.data || []);

    // Normalize field names from backend to match our types
    jobs = jobs.map((j: Record<string, unknown>) => ({
      ...j,
      // Backend uses experience_required, we use experience_requirement
      experience_requirement: j.experience_required || j.experience_requirement || "",
      // Backend uses industry_background, we use industry
      industry: j.industry_background || j.industry || "",
      // Backend uses remote_work, we use remote_policy
      remote_policy: j.remote_work || j.remote_policy || "",
    }));

    // Filter to active jobs only
    jobs = jobs.filter((j: Record<string, string>) => j.job_status === "招募中");

    return NextResponse.json(jobs);
  } catch {
    // Fallback to mock data
    return NextResponse.json(MOCK_JOBS);
  }
}
