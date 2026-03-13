"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import type { Consultant, Job, ResumeParseResult } from "@/lib/types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  consultant: Consultant;
}

type Mode = "form" | "upload";

export default function ResumeModal({
  isOpen,
  onClose,
  job,
  consultant,
}: ResumeModalProps) {
  const [mode, setMode] = useState<Mode>("form");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [biography, setBiography] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [parsed, setParsed] = useState(false);

  const accent = consultant.siteConfig.accentColor || "#3b82f6";

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setYearsExp("");
    setSkills("");
    setEducation("");
    setLocation("");
    setCurrentSalary("");
    setExpectedSalary("");
    setBiography("");
    setLinkedinUrl("");
    setSubmitted(false);
    setError("");
    setParsed(false);
    setMode("form");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("解析失敗");

      const data: ResumeParseResult = await res.json();

      // Auto-fill form fields
      if (data.name) setName(data.name);
      if (data.email) setEmail(data.email);
      if (data.phone) setPhone(data.phone);
      if (data.position) setPosition(data.position);
      if (data.years) setYearsExp(String(data.years));
      if (data.skills) setSkills(data.skills);
      if (data.education) setEducation(data.education);
      if (data.location) setLocation(data.location);
      if (data.linkedin_url) setLinkedinUrl(data.linkedin_url);

      setParsed(true);
      setMode("form"); // Switch to form so user can review
    } catch {
      setError("履歷解析失敗，請改用手動填寫");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setError("姓名和 Email 為必填");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const candidateData = {
        name,
        email,
        phone,
        position: position || job?.position_name,
        years_experience: yearsExp ? parseInt(yearsExp) : undefined,
        skills,
        education,
        location,
        current_salary: currentSalary,
        expected_salary: expectedSalary,
        biography,
        linkedin_url: linkedinUrl,
        source: "顧問網站",
        consultant: consultant.displayName,
        status: "AI推薦",
        target_job_id: job?.id,
        target_job_label: job ? `${job.position_name} @ ${job.industry ? `知名${job.industry}企業` : "知名企業"}` : undefined,
      };

      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });

      if (!res.ok) throw new Error("投遞失敗");

      setSubmitted(true);
    } catch {
      setError("投遞失敗，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="投遞成功">
        <div className="text-center py-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${accent}15` }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: accent }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            感謝您的投遞！
          </h3>
          <p className="text-gray-500 mb-6">
            {consultant.displayName} 收到您的履歷後會盡快與您聯繫。
          </p>
          <Button onClick={handleClose}>關閉</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={job ? `投遞: ${job.position_name}` : "投遞履歷"}
      maxWidth="max-w-2xl"
    >
      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("form")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === "form"
              ? "text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          style={mode === "form" ? { backgroundColor: accent } : {}}
        >
          手動填寫
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === "upload"
              ? "text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          style={mode === "upload" ? { backgroundColor: accent } : {}}
        >
          上傳履歷
        </button>
        {parsed && (
          <span className="flex items-center text-xs text-green-600 ml-2">
            &#10003; 已解析履歷
          </span>
        )}
      </div>

      {/* Upload section */}
      {mode === "upload" && (
        <div className="mb-6">
          <label
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleFileUpload(file);
            }}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            {uploading ? (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-2" />
                <p className="text-sm text-gray-500">解析中...</p>
              </div>
            ) : (
              <div className="text-center">
                <svg
                  className="w-10 h-10 text-gray-300 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  拖拽或點擊上傳履歷 (PDF)
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  支援 LinkedIn、104、自製履歷
                </p>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Form */}
      {(mode === "form" || parsed) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電話
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                目前職位
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={job?.position_name}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工作年資
              </label>
              <input
                type="number"
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                min={0}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                所在地
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                目前年薪
              </label>
              <input
                type="text"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                placeholder="例: 100萬"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                期望年薪
              </label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="例: 120-150萬"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              技能
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="例: React, TypeScript, Node.js"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              學歷
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="例: 台大資工碩士"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              自我介紹
            </label>
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              rows={3}
              placeholder="簡單介紹自己的經歷和求職意向..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} type="button">
              取消
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="!text-white"
              style={{ backgroundColor: accent } as React.CSSProperties}
            >
              {submitting ? "投遞中..." : "確認投遞"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
