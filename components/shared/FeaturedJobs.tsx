"use client";

import { useState } from "react";
import type { Consultant, Job } from "@/lib/types";
import MinimalJobCard from "@/components/templates/minimal/JobCard";
import ResumeModal from "@/components/shared/ResumeModal";
import JobDetailModal from "@/components/shared/JobDetailModal";

interface FeaturedJobsProps {
  consultant: Consultant;
  jobs: Job[];
}

export default function FeaturedJobs({ consultant, jobs }: FeaturedJobsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  function handleApply(job: Job) {
    setSelectedJob(job);
    setShowResumeModal(true);
  }

  function handleViewDetail(job: Job) {
    setSelectedJob(job);
    setShowDetailModal(true);
  }

  function handleApplyFromDetail(job: Job) {
    setShowDetailModal(false);
    setSelectedJob(job);
    setShowResumeModal(true);
  }

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job) => (
          <MinimalJobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            onViewDetail={handleViewDetail}
            accentColor={consultant.siteConfig.accentColor}
          />
        ))}
      </div>

      <JobDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        consultant={consultant}
        onApply={handleApplyFromDetail}
      />

      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => {
          setShowResumeModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        consultant={consultant}
      />
    </>
  );
}
