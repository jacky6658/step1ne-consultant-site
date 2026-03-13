"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Consultant } from "@/lib/types";

interface HeaderProps {
  consultant: Consultant;
  currentPage?: string;
}

export default function ElegantHeader({ consultant, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const slug = consultant.siteConfig.slug;
  const accent = consultant.siteConfig.accentColor || "#b8860b";

  const navItems = [
    { label: "首頁", href: `/consultants/${slug}`, key: "home" },
    { label: "關於我", href: `/consultants/${slug}/about`, key: "about" },
    { label: "職缺列表", href: `/consultants/${slug}/jobs`, key: "jobs" },
    { label: "職缺媒合", href: `/consultants/${slug}/match`, key: "match" },
  ];

  const isActive = (item: { key: string; href: string }) => {
    if (currentPage) return currentPage === item.key;
    return pathname === item.href;
  };

  return (
    <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "#faf8f4", borderColor: "#e8e0d0" }}>
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name in serif */}
        <Link
          href={`/consultants/${slug}`}
          className="font-serif text-xl tracking-wide transition-colors"
          style={{ color: "#3d2b1f" }}
        >
          {consultant.displayName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-serif text-sm tracking-wide transition-colors"
              style={{
                color: isActive(item) ? accent : "#8b7355",
                fontWeight: isActive(item) ? 600 : 400,
                borderBottom: isActive(item) ? `1px solid ${accent}` : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          style={{ color: "#8b7355" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{ backgroundColor: "#faf8f4", borderTop: "1px solid #e8e0d0" }}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-6 py-3 font-serif text-sm tracking-wide"
              style={{
                color: isActive(item) ? accent : "#5c4a3a",
                fontWeight: isActive(item) ? 600 : 400,
                borderBottom: "1px solid #ede7db",
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
