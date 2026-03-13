"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { ResumeParseResult } from "@/lib/types";

interface JobMatchToolProps {
  onKeywordMatch: (data: {
    keywords?: string;
    position?: string;
    skills?: string;
    industry?: string;
    location?: string;
    years_experience?: number;
  }) => void;
  onResumeMatch: (parsed: ResumeParseResult) => void;
  loading: boolean;
  accentColor: string;
}

type Mode = "keyword" | "resume" | "link";

export default function JobMatchTool({
  onKeywordMatch,
  onResumeMatch,
  loading,
  accentColor,
}: JobMatchToolProps) {
  const [mode, setMode] = useState<Mode>("keyword");

  // Keyword fields
  const [keywords, setKeywords] = useState("");
  const [skills, setSkills] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [yearsExp, setYearsExp] = useState("");

  // Resume upload
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Link parse
  const [linkUrl, setLinkUrl] = useState("");
  const [linkParsing, setLinkParsing] = useState(false);
  const [linkError, setLinkError] = useState("");

  function handleKeywordSubmit(e: React.FormEvent) {
    e.preventDefault();
    onKeywordMatch({
      keywords: keywords || undefined,
      skills: skills || undefined,
      industry: industry || undefined,
      location: location || undefined,
      years_experience: yearsExp ? parseInt(yearsExp) : undefined,
    });
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("解析失敗");

      const parsed: ResumeParseResult = await res.json();
      onResumeMatch(parsed);
    } catch {
      setUploadError("履歷解析失敗，請改用關鍵字搜尋");
    } finally {
      setUploading(false);
    }
  }

  async function handleLinkParse(e: React.FormEvent) {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    setLinkParsing(true);
    setLinkError("");

    try {
      const res = await fetch("/api/resume/parse-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkUrl.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "解析失敗");
      }

      const parsed: ResumeParseResult = data.parsed || data;
      onResumeMatch(parsed);
    } catch (err) {
      setLinkError(
        err instanceof Error ? err.message : "連結解析失敗，請確認連結有效"
      );
    } finally {
      setLinkParsing(false);
    }
  }

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      active ? "text-white" : "bg-white text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("keyword")}
          className={tabClass(mode === "keyword")}
          style={mode === "keyword" ? { backgroundColor: accentColor } : {}}
        >
          關鍵字搜尋
        </button>
        <button
          onClick={() => setMode("resume")}
          className={tabClass(mode === "resume")}
          style={mode === "resume" ? { backgroundColor: accentColor } : {}}
        >
          上傳履歷匹配
        </button>
        <button
          onClick={() => setMode("link")}
          className={tabClass(mode === "link")}
          style={mode === "link" ? { backgroundColor: accentColor } : {}}
        >
          貼上連結
        </button>
      </div>

      {mode === "keyword" && (
        <form onSubmit={handleKeywordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              快速搜尋
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="輸入職位、技能或關鍵字..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                技能
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="例: React, Node.js, Python"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                產業
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="例: 科技、金融"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                地點
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="例: 台北市"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="例: 5"
                min={0}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full !text-white"
            style={{ backgroundColor: accentColor } as React.CSSProperties}
          >
            {loading ? "媒合中..." : "開始媒合"}
          </Button>
        </form>
      )}

      {mode === "resume" && (
        <div>
          <label
            className="flex flex-col items-center justify-center w-full h-48 bg-white border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer"
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
            {uploading || loading ? (
              <div className="text-center">
                <div className="animate-spin w-10 h-10 border-2 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  {uploading ? "解析履歷中..." : "媒合中..."}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-300 mx-auto mb-3"
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
                <p className="text-sm text-gray-600 font-medium">
                  拖拽或點擊上傳履歷
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  支援 PDF 格式（LinkedIn、104、自製履歷）
                </p>
              </div>
            )}
          </label>

          {uploadError && (
            <p className="text-sm text-red-500 mt-3">{uploadError}</p>
          )}
        </div>
      )}

      {mode === "link" && (
        <form onSubmit={handleLinkParse} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              履歷連結
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="貼上履歷 PDF 連結（Google Drive、Dropbox 或直接 PDF 網址）"
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">
              支援的連結格式：
            </p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>&#8226; 直接 PDF 連結（https://...resume.pdf）</li>
              <li>&#8226; Google Drive 分享連結</li>
              <li>&#8226; Dropbox 分享連結</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={linkParsing || loading}
            size="lg"
            className="w-full !text-white"
            style={{ backgroundColor: accentColor } as React.CSSProperties}
          >
            {linkParsing ? "解析中..." : loading ? "媒合中..." : "解析並媒合"}
          </Button>

          {linkError && (
            <p className="text-sm text-red-500">{linkError}</p>
          )}
        </form>
      )}
    </div>
  );
}
