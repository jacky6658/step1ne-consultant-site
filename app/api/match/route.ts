import { NextRequest, NextResponse } from "next/server";
import { matchJobs } from "@/lib/matching";
import { MOCK_JOBS } from "@/lib/mock-data";
import type { MatchInput, Job } from "@/lib/types";

const BACKEND = process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

export async function POST(req: NextRequest) {
  try {
    const input: MatchInput = await req.json();

    let allJobs: Job[];

    // Try fetching from headhunter system, fallback to mock
    try {
      const jobsRes = await fetch(`${BACKEND}/api/jobs`, { cache: "no-store" });
      if (jobsRes.ok) {
        const json = await jobsRes.json();
        // API returns { success: true, data: [...] } or plain array
        const raw: Job[] = Array.isArray(json) ? json : (json.data || MOCK_JOBS);
        allJobs = raw
          .filter((j) => j.job_status === "招募中")
          .map((j) => ({
            ...j,
            experience_requirement: j.experience_required || j.experience_requirement || "",
            industry: j.industry_background || j.industry || "",
            remote_policy: j.remote_work || j.remote_policy || "",
          }) as Job);
      } else {
        allJobs = MOCK_JOBS;
      }
    } catch {
      allJobs = MOCK_JOBS;
    }

    const report = matchJobs(input, allJobs);
    return NextResponse.json(report);
  } catch (err) {
    console.error("Match API error:", err);
    return NextResponse.json(
      { error: "Matching failed", detail: String(err) },
      { status: 500 }
    );
  }
}
