import type { Consultant } from "@/lib/types";

interface FooterProps {
  consultant: Consultant;
}

export default function CreativeFooter({ consultant }: FooterProps) {
  const primary = consultant.siteConfig.primaryColor || "#7c3aed";
  const accent = consultant.siteConfig.accentColor || "#f59e0b";
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 text-center" style={{ background: `linear-gradient(135deg, ${primary}08, ${accent}08)` }}>
      <p className="text-sm text-gray-400">
        &copy; {year} <span className="font-bold text-gray-600">{consultant.displayName}</span> · Powered by <span className="font-bold" style={{ color: primary }}>Step1ne</span>
      </p>
    </footer>
  );
}
