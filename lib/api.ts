// ============================================================
// API Client - Proxy to Step1ne Headhunter System
// ============================================================

const BACKEND_URL =
  process.env.HEADHUNTER_API_URL || "https://backendstep1ne.zeabur.app";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function fetchAPI<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOpts } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...fetchOpts,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOpts.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// --- Consultant ---

export async function getConsultantBySlug(slug: string) {
  // The headhunter system uses display_name as identifier
  // We'll need an endpoint that looks up by slug from site_config
  return fetchAPI<Record<string, unknown>>(
    `/api/users/${encodeURIComponent(slug)}/site-config`
  );
}

// --- Jobs ---

export async function getJobs(consultant?: string) {
  const params = new URLSearchParams();
  if (consultant) params.set("consultant", consultant);
  params.set("status", "招募中");
  const query = params.toString();
  return fetchAPI<Job[]>(`/api/jobs${query ? `?${query}` : ""}`);
}

export async function getJobById(id: number) {
  return fetchAPI<Job>(`/api/jobs/${id}`);
}

// --- Resume ---

export async function parseResume(formData: FormData) {
  const res = await fetch(`${BACKEND_URL}/api/resume/parse`, {
    method: "POST",
    body: formData, // Don't set Content-Type for FormData
  });

  if (!res.ok) {
    throw new Error(`Resume parse failed: ${res.status}`);
  }

  return res.json();
}

// --- Candidates ---

export async function createCandidate(data: Record<string, unknown>) {
  return fetchAPI<Record<string, unknown>>("/api/candidates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Re-export types used by API consumers
import type { Job } from "./types";
export type { Job };
