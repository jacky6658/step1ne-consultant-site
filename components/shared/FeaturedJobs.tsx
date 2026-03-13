"use client";

import { useState } from "react";
import type { Consultant, Job } from "@/lib/types";
import MinimalJobCard from "@/components/templates/minimal/JobCard";
import ResumeModal from "@/components/shared/ResumeModal";

interface FeaturedJobsProps {
  consultant: Consultant;
  jobs: Job[];
}

export default function FeaturedJobs({ consultant, jobs }: FeaturedJobsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleApply(job: Job) {
    setSelectedJob(job);
    setShowModal(true);
  }

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job) => (
          <MinimalJobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            accentColor={consultant.siteConfig.accentColor}
          />
        ))}
      </div>

      <ResumeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        consultant={consultant}
      />
    </>
  );
}
