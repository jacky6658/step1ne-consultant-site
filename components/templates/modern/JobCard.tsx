"use client";

import type { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetail?: (job: Job) => void;
  accentColor?: string;
}

export default function ModernJobCard({ job, onApply, onViewDetail, accentColor = "#06b6d4" }: JobCardProps) {
  const skills = job.key_skills ? job.key_skills.split(/[,;、]/).map((s) => s.trim()).filter(Boolean).slice(0, 5) : [];

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all cursor-pointer" style={{ boxShadow: "0 0 0 0 transparent" }} onClick={() => onViewDetail?.(job)} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}15`)} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 transparent")}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1">{job.position_name}</h3>
          <p className="text-sm text-gray-500">{job.industry ? `知名${job.industry}企業` : "知名企業"}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onApply(job); }} className="shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer" style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
          投遞
        </button>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
        {job.location && <span>{job.location}</span>}
        {job.salary_range && <span style={{ color: accentColor }}>{job.salary_range}</span>}
        {job.experience_requirement && <span>{job.experience_requirement}</span>}
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded text-xs font-mono bg-gray-800 text-gray-400">{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}
