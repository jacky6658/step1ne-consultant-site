import type { Consultant } from "@/lib/types";

interface FooterProps {
  consultant: Consultant;
}

export default function MinimalFooter({ consultant }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>
          &copy; {year} {consultant.displayName} &middot; Powered by{" "}
          <span className="font-medium text-gray-500">Step1ne</span>
        </p>
        <div className="flex items-center gap-4">
          {consultant.siteConfig.socialLinks?.email && (
            <a
              href={`mailto:${consultant.siteConfig.socialLinks.email}`}
              className="hover:text-gray-600 transition-colors"
            >
              Email
            </a>
          )}
          {consultant.siteConfig.socialLinks?.linkedin && (
            <a
              href={consultant.siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
