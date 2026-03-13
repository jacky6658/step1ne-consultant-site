"use client";

import { useState } from "react";
import { MOCK_CONSULTANT } from "@/lib/mock-data";
import type { Consultant, MatchReport, ResumeParseResult } from "@/lib/types";
import MinimalHeader from "@/components/templates/minimal/Header";
import MinimalFooter from "@/components/templates/minimal/Footer";
import JobMatchTool from "@/components/shared/JobMatchTool";
import MatchReportView from "@/components/shared/MatchReport";

export default function MatchPage() {
  const [consultant] = useState<Consultant>(MOCK_CONSULTANT);
  const [report, setReport] = useState<MatchReport | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleKeywordMatch(data: {
    keywords?: string;
    position?: string;
    skills?: string;
    industry?: string;
    location?: string;
    years_experience?: number;
  }) {
    setLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setReport(await res.json());
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  async function handleResumeMatch(parsed: ResumeParseResult) {
    setLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: parsed }),
      });
      if (res.ok) {
        setReport(await res.json());
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MinimalHeader consultant={consultant} currentPage="match" />

      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              職缺媒合工具
            </h1>
            <p className="text-gray-500">
              輸入你的技能和經驗，或上傳履歷，系統會自動為你推薦最適合的職缺。
            </p>
          </div>

          <JobMatchTool
            onKeywordMatch={handleKeywordMatch}
            onResumeMatch={handleResumeMatch}
            loading={loading}
            accentColor={consultant.siteConfig.accentColor}
          />

          {report && (
            <div className="mt-10">
              <MatchReportView
                report={report}
                accentColor={consultant.siteConfig.accentColor}
              />
            </div>
          )}
        </div>
      </main>

      <MinimalFooter consultant={consultant} />
    </>
  );
}
