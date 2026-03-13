"use client";

import Link from "next/link";
import { useState } from "react";
import type { Consultant } from "@/lib/types";

interface HeaderProps {
  consultant: Consultant;
  currentPage: string;
}

export default function MinimalHeader({ consultant, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const slug = consultant.siteConfig.slug;
  const accent = consultant.siteConfig.accentColor || "#3b82f6";

  const navItems = [
    { label: "首頁", href: `/consultants/${slug}`, key: "home" },
    { label: "關於我", href: `/consultants/${slug}/about`, key: "about" },
    { label: "職缺列表", href: `/consultants/${slug}/jobs`, key: "jobs" },
    { label: "職缺媒合", href: `/consultants/${slug}/match`, key: "match" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/consultants/${slug}`} className="text-lg font-bold tracking-tight text-gray-900">
          {consultant.displayName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm transition-colors"
              style={{
                color: currentPage === item.key ? accent : "#6b7280",
                fontWeight: currentPage === item.key ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-6 py-3 text-sm border-b border-gray-50"
              style={{
                color: currentPage === item.key ? accent : "#374151",
                fontWeight: currentPage === item.key ? 600 : 400,
              }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
