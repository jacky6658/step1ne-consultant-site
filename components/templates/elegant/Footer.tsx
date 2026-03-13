import type { Consultant } from "@/lib/types";

interface FooterProps {
  consultant: Consultant;
}

export default function ElegantFooter({ consultant }: FooterProps) {
  const year = new Date().getFullYear();
  const accent = consultant.siteConfig.accentColor || "#b8860b";

  return (
    <footer style={{ backgroundColor: "#f5f0e8", borderTop: "1px solid #e8e0d0" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-10" style={{ backgroundColor: `${accent}30` }} />
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${accent}40` }} />
          <span className="block h-px w-10" style={{ backgroundColor: `${accent}30` }} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-sm tracking-wide" style={{ color: "#8b7355" }}>
            &copy; {year} {consultant.displayName} &middot; Powered by{" "}
            <span className="font-medium" style={{ color: "#5c4a3a" }}>Step1ne</span>
          </p>
          <div className="flex items-center gap-5">
            {consultant.siteConfig.socialLinks?.email && (
              <a
                href={`mailto:${consultant.siteConfig.socialLinks.email}`}
                className="font-serif text-sm tracking-wide transition-colors"
                style={{ color: "#a0926e" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a0926e")}
              >
                Email
              </a>
            )}
            {consultant.siteConfig.socialLinks?.linkedin && (
              <a
                href={consultant.siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-sm tracking-wide transition-colors"
                style={{ color: "#a0926e" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a0926e")}
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
