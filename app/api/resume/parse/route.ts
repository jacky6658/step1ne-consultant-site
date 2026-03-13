import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${BACKEND}/api/resume/parse`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Resume parsing failed", detail: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
