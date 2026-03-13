import type { Consultant } from "@/lib/types";

interface FooterProps {
  consultant: Consultant;
}

export default function ModernFooter({ consultant }: FooterProps) {
  const accent = consultant.siteConfig.accentColor || "#06b6d4";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p className="font-mono">&copy; {year} <span className="text-white">{consultant.displayName}</span> · <span style={{ color: accent }}>Step1ne</span></p>
        <div className="flex items-center gap-4 font-mono text-xs">
          {consultant.siteConfig.socialLinks?.email && <a href={`mailto:${consultant.siteConfig.socialLinks.email}`} className="hover:text-white transition-colors">email</a>}
          {consultant.siteConfig.socialLinks?.linkedin && <a href={consultant.siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">linkedin</a>}
        </div>
      </div>
    </footer>
  );
}
