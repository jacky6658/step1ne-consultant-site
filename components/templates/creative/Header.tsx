"use client";

import Link from "next/link";
import { useState } from "react";
import type { Consultant } from "@/lib/types";

interface HeaderProps {
  consultant: Consultant;
  currentPage: string;
}

export default function CreativeHeader({ consultant, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const slug = consultant.siteConfig.slug;
  const accent = consultant.siteConfig.accentColor || "#f59e0b";

  const navItems = [
    { label: "首頁", href: `/consultants/${slug}`, key: "home" },
    { label: "關於我", href: `/consultants/${slug}/about`, key: "about" },
    { label: "職缺列表", href: `/consultants/${slug}/jobs`, key: "jobs" },
    { label: "職缺媒合", href: `/consultants/${slug}/match`, key: "match" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b-2" style={{ borderColor: accent }}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/consultants/${slug}`} className="text-xl font-black tracking-tight" style={{ color: consultant.siteConfig.primaryColor }}>
          {consultant.displayName} <span className="text-xs font-normal align-super" style={{ color: accent }}>✦</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className="text-sm font-medium px-3 py-1.5 rounded-full transition-all"
              style={currentPage === item.key
                ? { backgroundColor: accent, color: "white" }
                : { color: "#6b7280" }
              }
            >{item.label}</Link>
          ))}
        </div>
        <button className="md:hidden p-2 cursor-pointer" style={{ color: accent }} onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-2">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className="block mx-4 my-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={currentPage === item.key ? { backgroundColor: `${accent}15`, color: accent } : { color: "#374151" }}
              onClick={() => setMobileOpen(false)}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
