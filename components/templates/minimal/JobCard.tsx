"use client";

import type { Job } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  accentColor?: string;
}

export default function MinimalJobCard({ job, onApply, accentColor = "#3b82f6" }: JobCardProps) {
  const skills = job.key_skills
    ? job.key_skills.split(/[,;、]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : [];

  return (
    <div className="group border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {job.position_name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {job.industry ? `知名${job.industry}企業` : "知名企業"}
            {job.department && ` - ${job.department}`}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4">
            {job.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
            {job.salary_range && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary_range}
              </span>
            )}
            {job.experience_requirement && (
              <span>{job.experience_requirement}</span>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Apply button */}
        <button
          onClick={() => onApply(job)}
          className="shrink-0 px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          投遞履歷
        </button>
      </div>
    </div>
  );
}
