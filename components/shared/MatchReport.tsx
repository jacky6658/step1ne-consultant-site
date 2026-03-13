"use client";

import type { MatchReport, MatchResult } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface MatchReportViewProps {
  report: MatchReport;
  accentColor: string;
}

function ScoreBar({ score, label, color }: { score: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{score}</span>
    </div>
  );
}

function RecommendationBadge({ rec }: { rec: MatchResult["recommendation"] }) {
  const map = {
    強力推薦: "success" as const,
    推薦: "info" as const,
    可考慮: "warning" as const,
    差距較大: "default" as const,
  };
  return <Badge variant={map[rec]}>{rec}</Badge>;
}

function MatchResultCard({ result, accentColor }: { result: MatchResult; accentColor: string }) {
  const { job, score, breakdown, matchedSkills, missingSkills, recommendation } = result;

  return (
    <div className="border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {job.position_name}
            </h3>
            <RecommendationBadge rec={recommendation} />
          </div>
          <p className="text-sm text-gray-500">
            {job.industry ? `知名${job.industry}企業` : "知名企業"} · {job.location}
            {job.salary_range && ` · ${job.salary_range}`}
          </p>
        </div>

        {/* Score circle */}
        <div
          className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2"
          style={{
            borderColor: score >= 65 ? accentColor : "#d1d5db",
            color: score >= 65 ? accentColor : "#6b7280",
          }}
        >
          <span className="text-lg font-bold">{score}</span>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="space-y-2 mb-4">
        <ScoreBar score={breakdown.skillScore} label="技能" color={accentColor} />
        <ScoreBar score={breakdown.industryScore} label="產業" color="#8b5cf6" />
        <ScoreBar score={breakdown.locationScore} label="地點" color="#06b6d4" />
        <ScoreBar score={breakdown.experienceScore} label="經歷" color="#f59e0b" />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {matchedSkills.map((s) => (
          <Badge key={s} variant="success">{s}</Badge>
        ))}
        {missingSkills.map((s) => (
          <Badge key={s} variant="default">
            <span className="opacity-60">{s}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function MatchReportView({ report, accentColor }: MatchReportViewProps) {
  const { results, inputSummary, totalJobsScanned, generatedAt } = report;

  const strongMatches = results.filter((r) => r.score >= 65);
  const possibleMatches = results.filter((r) => r.score >= 45 && r.score < 65);
  const weakMatches = results.filter((r) => r.score < 45);

  return (
    <div>
      {/* Summary header */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">媒合報告</h2>
        <div className="text-sm text-gray-500 space-y-1">
          <p>搜尋條件: {inputSummary}</p>
          <p>
            掃描 {totalJobsScanned} 個職缺 · 找到{" "}
            <span className="font-medium text-gray-700">{strongMatches.length}</span> 個高度匹配
            {possibleMatches.length > 0 && (
              <> · <span className="font-medium text-gray-700">{possibleMatches.length}</span> 個可考慮</>
            )}
          </p>
          <p className="text-xs text-gray-400">
            產生時間: {new Date(generatedAt).toLocaleString("zh-TW")}
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">找不到匹配的職缺</p>
          <p className="text-sm">試試不同的搜尋條件或聯繫顧問了解更多機會</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Strong matches */}
          {strongMatches.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                推薦職缺 ({strongMatches.length})
              </h3>
              <div className="space-y-4">
                {strongMatches.map((r) => (
                  <MatchResultCard
                    key={r.job.id}
                    result={r}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Possible matches */}
          {possibleMatches.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                可考慮 ({possibleMatches.length})
              </h3>
              <div className="space-y-4">
                {possibleMatches.map((r) => (
                  <MatchResultCard
                    key={r.job.id}
                    result={r}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Weak matches - collapsed */}
          {weakMatches.length > 0 && (
            <section>
              <details>
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                  差距較大的職缺 ({weakMatches.length})
                </summary>
                <div className="space-y-4 mt-4">
                  {weakMatches.map((r) => (
                    <MatchResultCard
                      key={r.job.id}
                      result={r}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </details>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
