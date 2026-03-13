"use client";

import type { Job } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface JobCardProps {
  job: Job;
  accentColor: string;
  onApply?: (job: Job) => void;
  onViewDetail?: (job: Job) => void;
}

export default function ElegantJobCard({ job, accentColor = "#b8860b", onApply, onViewDetail }: JobCardProps) {
  const skills = job.key_skills
    ? job.key_skills.split(/[,;、]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : [];

  return (
    <div
      className="group p-6 md:p-8 transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={() => onViewDetail?.(job)}
      style={{
        backgroundColor: "#fffdf9",
        border: "1px solid #e8e0d0",
        borderBottom: `2px solid ${accentColor}20`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        <div className="flex-1 min-w-0">
          {/* Position name */}
          <h3
            className="font-serif text-lg md:text-xl mb-2 truncate"
            style={{ color: "#3d2b1f" }}
          >
            {job.position_name}
          </h3>

          {/* Company */}
          <p
            className="font-serif text-sm mb-4"
            style={{ color: "#8b7355" }}
          >
            {job.industry ? `知名${job.industry}企業` : "知名企業"}
          </p>

          {/* Meta info with understated style */}
          <div
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs tracking-wide mb-5"
            style={{ color: "#a0926e" }}
          >
            {job.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
            {job.salary_range && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary_range}
              </span>
            )}
            {job.experience_requirement && (
              <span>{job.experience_requirement}</span>
            )}
            {job.remote_policy && (
              <span>{job.remote_policy}</span>
            )}
          </div>

          {/* Skills in muted, refined badges */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-0.5 text-xs font-serif tracking-wide border"
                  style={{
                    borderColor: "#ddd5c5",
                    color: "#8b7355",
                    backgroundColor: "#f9f5ee",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Apply button */}
        <button
          onClick={(e) => { e.stopPropagation(); onApply?.(job); }}
          className="shrink-0 px-5 py-2.5 font-serif text-sm tracking-wider text-white transition-all duration-300 hover:brightness-110 cursor-pointer"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 1px 8px ${accentColor}20`,
          }}
        >
          投遞履歷
        </button>
      </div>
    </div>
  );
}
