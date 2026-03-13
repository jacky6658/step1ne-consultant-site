"use client";

import { useState, useEffect } from "react";
import { MOCK_CONSULTANT, MOCK_JOBS } from "@/lib/mock-data";
import type { Consultant, Job } from "@/lib/types";
import MinimalHeader from "@/components/templates/minimal/Header";
import MinimalJobCard from "@/components/templates/minimal/JobCard";
import MinimalFooter from "@/components/templates/minimal/Footer";
import ResumeModal from "@/components/shared/ResumeModal";

export default function JobsPage() {
  const [consultant, setConsultant] = useState<Consultant>(MOCK_CONSULTANT);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const slug = window.location.pathname.split("/")[2];

    const fetchConsultant = fetch(`/api/consultants/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setConsultant(data); })
      .catch(() => {});

    const fetchJobs = fetch("/api/jobs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data)) {
          setJobs(data);
          setFilteredJobs(data);
        }
      })
      .catch(() => {});

    Promise.all([fetchConsultant, fetchJobs]).finally(() => setLoading(false));
  }, []);

  // Filter jobs
  useEffect(() => {
    if (!search.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    const q = search.toLowerCase();
    setFilteredJobs(
      jobs.filter(
        (j) =>
          j.position_name.toLowerCase().includes(q) ||
          j.industry?.toLowerCase().includes(q) ||
          j.key_skills?.toLowerCase().includes(q) ||
          j.location?.toLowerCase().includes(q)
      )
    );
  }, [search, jobs]);

  function handleApply(job: Job) {
    setSelectedJob(job);
    setShowModal(true);
  }

  return (
    <>
      <MinimalHeader consultant={consultant} currentPage="jobs" />

      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">職缺列表</h1>
            <p className="text-gray-500">
              共 {filteredJobs.length} 個職缺正在招募中
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="搜尋職位、產業、技能、地點..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job list */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <MinimalJobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  accentColor={consultant.siteConfig.accentColor}
                />
              ))
            ) : (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg mb-2">找不到符合的職缺</p>
                <p className="text-sm">試試不同的搜尋關鍵字</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <MinimalFooter consultant={consultant} />

      {/* Resume submission modal */}
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
