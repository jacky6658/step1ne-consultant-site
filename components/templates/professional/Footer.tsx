import type { Consultant } from "@/lib/types";

interface FooterProps {
  consultant: Consultant;
}

export default function ProfessionalFooter({ consultant }: FooterProps) {
  const primary = consultant.siteConfig.primaryColor || "#1e3a5f";
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: primary }} className="text-white/70 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <span className="font-bold text-white">{consultant.displayName}</span>
          <span className="mx-2">·</span>
          <span>Powered by Step1ne</span>
        </div>
        <div className="flex items-center gap-4">
          {consultant.siteConfig.socialLinks?.email && <a href={`mailto:${consultant.siteConfig.socialLinks.email}`} className="hover:text-white transition-colors">Email</a>}
          {consultant.siteConfig.socialLinks?.linkedin && <a href={consultant.siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
          <span>&copy; {year}</span>
        </div>
      </div>
    </footer>
  );
}
