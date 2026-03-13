"use client";

import Link from "next/link";
import { useState } from "react";
import type { Consultant } from "@/lib/types";

interface HeaderProps {
  consultant: Consultant;
  currentPage: string;
}

export default function ProfessionalHeader({ consultant, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const slug = consultant.siteConfig.slug;
  const primary = consultant.siteConfig.primaryColor || "#1e3a5f";

  const navItems = [
    { label: "首頁", href: `/consultants/${slug}`, key: "home" },
    { label: "關於我", href: `/consultants/${slug}/about`, key: "about" },
    { label: "職缺列表", href: `/consultants/${slug}/jobs`, key: "jobs" },
    { label: "職缺媒合", href: `/consultants/${slug}/match`, key: "match" },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-sm" style={{ backgroundColor: primary }}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/consultants/${slug}`} className="text-lg font-bold text-white tracking-wide">
          {consultant.displayName}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm transition-colors"
              style={{
                color: currentPage === item.key ? "#ffffff" : "rgba(255,255,255,0.7)",
                fontWeight: currentPage === item.key ? 600 : 400,
                borderBottom: currentPage === item.key ? "2px solid white" : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden p-2 text-white cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: primary }}>
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className="block px-6 py-3 text-sm border-b border-white/5"
              style={{ color: currentPage === item.key ? "#ffffff" : "rgba(255,255,255,0.7)" }}
              onClick={() => setMobileOpen(false)}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
