// ============================================================
// Job Matching Algorithm (Non-AI)
// ============================================================

import type { Job, MatchInput, MatchResult, MatchReport } from "./types";

// Skill synonym map for better matching
const SKILL_SYNONYMS: Record<string, string[]> = {
  react: ["react.js", "reactjs"],
  node: ["node.js", "nodejs"],
  vue: ["vue.js", "vuejs"],
  angular: ["angularjs"],
  typescript: ["ts"],
  javascript: ["js", "es6"],
  python: ["py"],
  golang: ["go"],
  postgresql: ["postgres", "pg"],
  mongodb: ["mongo"],
  kubernetes: ["k8s"],
  docker: ["containerization"],
  aws: ["amazon web services"],
  gcp: ["google cloud", "google cloud platform"],
  azure: ["microsoft azure"],
  cicd: ["ci/cd", "ci cd"],
  "machine learning": ["ml"],
  "deep learning": ["dl"],
  "artificial intelligence": ["ai"],
  "natural language processing": ["nlp"],
  "react native": ["rn"],
  nextjs: ["next.js", "next"],
};

// Related industries map
const RELATED_INDUSTRIES: Record<string, string[]> = {
  軟體: ["科技", "網路", "SaaS", "資訊", "AI"],
  科技: ["軟體", "網路", "半導體", "電子", "AI"],
  金融: ["銀行", "保險", "證券", "FinTech"],
  電商: ["零售", "網路", "數位行銷"],
  製造: ["電子", "半導體", "機械"],
  醫療: ["生技", "製藥", "健康"],
  遊戲: ["娛樂", "數位內容", "軟體"],
};

// --- Utility Functions ---

function tokenizeSkills(skills: string): string[] {
  if (!skills) return [];
  return skills
    .toLowerCase()
    .split(/[,;、/|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase().trim();
  for (const [canonical, synonyms] of Object.entries(SKILL_SYNONYMS)) {
    if (synonyms.includes(lower) || lower === canonical) {
      return canonical;
    }
  }
  return lower;
}

function normalizeSkillSet(skills: string[]): Set<string> {
  return new Set(skills.map(normalizeSkill));
}

// --- Scoring Functions ---

function calcSkillScore(
  candidateSkills: string,
  jobSkills: string
): { score: number; matched: string[]; missing: string[] } {
  const cSet = normalizeSkillSet(tokenizeSkills(candidateSkills));
  const jTokens = tokenizeSkills(jobSkills);
  const jSet = normalizeSkillSet(jTokens);

  if (jSet.size === 0) return { score: 50, matched: [], missing: [] };

  const matched: string[] = [];
  const missing: string[] = [];

  for (const jSkill of jTokens) {
    const normalized = normalizeSkill(jSkill);
    if (cSet.has(normalized)) {
      matched.push(jSkill);
    } else {
      missing.push(jSkill);
    }
  }

  // Jaccard-like: matched / total job skills
  const score = Math.round((matched.length / jSet.size) * 100);
  return { score: Math.min(score, 100), matched, missing };
}

function calcIndustryScore(
  candidateIndustry: string,
  jobIndustry: string
): number {
  if (!candidateIndustry || !jobIndustry) return 40;

  const cInd = candidateIndustry.trim();
  const jInd = jobIndustry.trim();

  if (cInd === jInd) return 100;

  // Check if related
  const related = RELATED_INDUSTRIES[cInd] || [];
  if (related.some((r) => jInd.includes(r) || r.includes(jInd))) return 65;

  // Check reverse
  const reverseRelated = RELATED_INDUSTRIES[jInd] || [];
  if (
    reverseRelated.some((r) => cInd.includes(r) || r.includes(cInd))
  )
    return 65;

  return 20;
}

function calcLocationScore(
  candidateLocation: string,
  jobLocation: string,
  remotePolicy?: string
): number {
  if (!candidateLocation || !jobLocation) return 50;

  const cLoc = candidateLocation.trim();
  const jLoc = jobLocation.trim();

  // Remote-friendly job
  if (remotePolicy && /遠端|remote|在家/i.test(remotePolicy)) return 90;

  // Exact match
  if (cLoc === jLoc) return 100;

  // Same city/region (check if one contains the other)
  if (cLoc.includes(jLoc) || jLoc.includes(cLoc)) return 85;

  // Both in same broad area (e.g., both 台北)
  const cCity = cLoc.replace(/(市|縣|區).*$/, "");
  const jCity = jLoc.replace(/(市|縣|區).*$/, "");
  if (cCity === jCity) return 80;

  return 30;
}

function calcExperienceScore(
  candidateYears: number | undefined,
  jobRequirement: string | undefined
): number {
  if (!candidateYears || !jobRequirement) return 50;

  // Parse job requirement like "3-5年" or "5年以上"
  const match = jobRequirement.match(/(\d+)/);
  if (!match) return 50;

  const required = parseInt(match[1], 10);
  const diff = candidateYears - required;

  if (diff >= 0) return 100; // Meets or exceeds
  if (diff >= -1) return 80; // 1 year short
  if (diff >= -2) return 60; // 2 years short
  return 30; // 3+ years short
}

// --- Main Matching Function ---

export function matchJobs(input: MatchInput, jobs: Job[]): MatchReport {
  const candidateSkills =
    input.skills || input.resumeData?.skills || "";
  const candidateIndustry =
    input.industry || input.resumeData?.industry || "";
  const candidateLocation =
    input.location || input.resumeData?.location || "";
  const candidateYears =
    input.years_experience || input.resumeData?.years;

  // Also consider keywords for broader matching
  const keywords = input.keywords
    ? input.keywords.toLowerCase()
    : "";

  const results: MatchResult[] = jobs
    .filter((job) => job.job_status === "招募中")
    .map((job) => {
      // Skill matching (40%)
      const skillResult = calcSkillScore(candidateSkills, job.key_skills);
      let skillScore = skillResult.score;

      // Boost skill score if keywords match job title or skills
      if (keywords) {
        const titleMatch =
          job.position_name.toLowerCase().includes(keywords) ||
          job.key_skills.toLowerCase().includes(keywords);
        if (titleMatch) skillScore = Math.min(skillScore + 20, 100);
      }

      // Industry matching (25%)
      const industryScore = calcIndustryScore(candidateIndustry, job.industry);

      // Location matching (20%)
      const locationScore = calcLocationScore(
        candidateLocation,
        job.location,
        job.remote_policy
      );

      // Experience matching (15%)
      const experienceScore = calcExperienceScore(
        candidateYears,
        job.experience_requirement
      );

      const totalScore = Math.round(
        skillScore * 0.4 +
          industryScore * 0.25 +
          locationScore * 0.2 +
          experienceScore * 0.15
      );

      let recommendation: MatchResult["recommendation"];
      if (totalScore >= 80) recommendation = "強力推薦";
      else if (totalScore >= 65) recommendation = "推薦";
      else if (totalScore >= 45) recommendation = "可考慮";
      else recommendation = "差距較大";

      return {
        job,
        score: totalScore,
        breakdown: {
          skillScore,
          industryScore,
          locationScore,
          experienceScore,
        },
        matchedSkills: skillResult.matched,
        missingSkills: skillResult.missing,
        recommendation,
      };
    })
    .sort((a, b) => b.score - a.score);

  // Build input summary
  const parts: string[] = [];
  if (input.keywords) parts.push(`關鍵字: ${input.keywords}`);
  if (candidateSkills) parts.push(`技能: ${candidateSkills.slice(0, 100)}`);
  if (candidateIndustry) parts.push(`產業: ${candidateIndustry}`);
  if (candidateLocation) parts.push(`地點: ${candidateLocation}`);
  if (candidateYears) parts.push(`年資: ${candidateYears}年`);

  return {
    results,
    inputSummary: parts.join(" | ") || "無輸入條件",
    totalJobsScanned: jobs.length,
    generatedAt: new Date().toISOString(),
  };
}
