import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure required fields for tracking source
    const candidateData = {
      ...body,
      source: body.source || "顧問網站",
      status: body.status || "AI推薦",
    };

    const res = await fetch(`${BACKEND}/api/candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Failed to create candidate", detail: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit candidate" },
      { status: 500 }
    );
  }
}
