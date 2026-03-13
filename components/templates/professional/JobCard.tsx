"use client";

import type { Job } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetail?: (job: Job) => void;
  accentColor?: string;
}

export default function ProfessionalJobCard({ job, onApply, onViewDetail, accentColor = "#2563eb" }: JobCardProps) {
  const skills = job.key_skills ? job.key_skills.split(/[,;、]/).map((s) => s.trim()).filter(Boolean).slice(0, 6) : [];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer" onClick={() => onViewDetail?.(job)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{job.position_name}</h3>
            <p className="text-sm text-gray-500">{job.industry ? `知名${job.industry}企業` : "知名企業"}{job.department && ` · ${job.department}`}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onApply(job); }} className="shrink-0 px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer" style={{ backgroundColor: accentColor }}>
            立即應徵
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2 border-t border-gray-50">
          {job.location && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>{job.location}</span>}
          {job.salary_range && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{job.salary_range}</span>}
          {job.experience_requirement && <span>{job.experience_requirement}</span>}
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => <Badge key={skill} variant="info">{skill}</Badge>)}
          </div>
        )}
      </div>
    </div>
  );
}
