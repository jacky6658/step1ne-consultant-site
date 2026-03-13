"use client";

import type { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  accentColor?: string;
}

export default function CreativeJobCard({ job, onApply, accentColor = "#f59e0b" }: JobCardProps) {
  const skills = job.key_skills ? job.key_skills.split(/[,;、]/).map((s) => s.trim()).filter(Boolean).slice(0, 5) : [];

  return (
    <div className="group relative rounded-2xl p-6 bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}03)` }} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800">{job.position_name}</h3>
            <p className="text-sm text-gray-400">{job.industry ? `知名${job.industry}企業` : "知名企業"}</p>
          </div>
          <button onClick={() => onApply(job)}
            className="shrink-0 px-5 py-2 rounded-full text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{ backgroundColor: accentColor }}>
            投遞
          </button>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          {job.location && <span>📍 {job.location}</span>}
          {job.salary_range && <span>💰 {job.salary_range}</span>}
          {job.experience_requirement && <span>⏱ {job.experience_requirement}</span>}
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
