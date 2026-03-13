"use client";

import Link from "next/link";
import { useState } from "react";
import type { Consultant } from "@/lib/types";

interface HeaderProps {
  consultant: Consultant;
  currentPage: string;
}

export default function ModernHeader({ consultant, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const slug = consultant.siteConfig.slug;
  const accent = consultant.siteConfig.accentColor || "#06b6d4";

  const navItems = [
    { label: "首頁", href: `/consultants/${slug}`, key: "home" },
    { label: "關於我", href: `/consultants/${slug}/about`, key: "about" },
    { label: "職缺列表", href: `/consultants/${slug}/jobs`, key: "jobs" },
    { label: "職缺媒合", href: `/consultants/${slug}/match`, key: "match" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/consultants/${slug}`} className="text-lg font-bold text-white">
          <span style={{ color: accent }}>&lt;</span>{consultant.displayName}<span style={{ color: accent }}>/&gt;</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={currentPage === item.key
                ? { backgroundColor: `${accent}20`, color: accent, boxShadow: `0 0 12px ${accent}30` }
                : { color: "#9ca3af" }
              }
            >{item.label}</Link>
          ))}
        </div>
        <button className="md:hidden p-2 text-gray-400 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className="block px-6 py-3 text-sm border-b border-gray-900"
              style={{ color: currentPage === item.key ? accent : "#9ca3af" }}
              onClick={() => setMobileOpen(false)}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
