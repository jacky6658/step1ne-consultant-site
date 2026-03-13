"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Consultant, Job } from "@/lib/types";

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  consultant: Consultant;
  onApply: (job: Job) => void;
}

export default function JobDetailModal({
  isOpen,
  onClose,
  job,
  consultant,
  onApply,
}: JobDetailModalProps) {
  if (!job) return null;

  const accent = consultant.siteConfig.accentColor || "#3b82f6";
  const companyName = job.industry
    ? `知名${job.industry}企業`
    : "知名企業";
  const skills =
    job.key_skills
      ?.split(/[,;、]/)
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const metaItems = [
    { icon: "📍", label: "地點", value: job.location },
    { icon: "💰", label: "薪資", value: job.salary_range },
    { icon: "⏱", label: "經歷要求", value: job.experience_requirement },
    { icon: "🎓", label: "學歷要求", value: job.education_requirement },
    { icon: "🌐", label: "語言要求", value: job.language_requirement },
    { icon: "🏠", label: "遠端政策", value: job.remote_policy },
  ].filter((m) => m.value);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job.position_name} maxWidth="max-w-3xl">
      {/* Company & Department */}
      <p className="text-gray-500 text-sm mb-6">
        {companyName}
        {job.department ? ` · ${job.department}` : ""}
        {job.headcount ? ` · 招募 ${job.headcount} 人` : ""}
      </p>

      {/* Meta Grid */}
      {metaItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {metaItems.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-lg px-3 py-2.5"
            >
              <div className="text-xs text-gray-400 mb-0.5">
                {item.icon} {item.label}
              </div>
              <div className="text-sm font-medium text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            所需技能
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Marketing Description */}
      {job.marketing_description && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            職位介紹
          </h4>
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-4">
            {job.marketing_description}
          </div>
        </div>
      )}

      {/* Interview Process */}
      {job.interview_process && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            面試流程
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {job.interview_process}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button
          onClick={() => {
            onClose();
            onApply(job);
          }}
          className="!text-white"
          style={{ backgroundColor: accent } as React.CSSProperties}
        >
          投遞履歷
        </Button>
      </div>
    </Modal>
  );
}
