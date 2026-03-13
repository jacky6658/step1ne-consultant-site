import type { Consultant } from "@/lib/types";

interface AboutSectionProps {
  consultant: Consultant;
}

export default function ElegantAboutSection({ consultant }: AboutSectionProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#b8860b";

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#faf8f4" }}>
      <div className="max-w-3xl mx-auto">
        {/* Section heading with ornamental divider */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: "#3d2b1f" }}>
            關於我
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block h-px w-16" style={{ backgroundColor: `${accent}40` }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="block h-px w-16" style={{ backgroundColor: `${accent}40` }} />
          </div>
        </div>

        {/* Bio with generous spacing */}
        <p
          className="font-serif text-lg leading-loose mb-14 whitespace-pre-line text-center"
          style={{ color: "#5c4a3a" }}
        >
          {siteConfig.bio}
        </p>

        {/* Stats in refined format */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-14">
          {siteConfig.yearsExperience > 0 && (
            <div
              className="text-center py-6 px-4"
              style={{ borderTop: `2px solid ${accent}30`, borderBottom: `2px solid ${accent}30` }}
            >
              <div className="font-serif text-3xl font-light mb-1" style={{ color: accent }}>
                {siteConfig.yearsExperience}+
              </div>
              <div className="font-serif text-sm tracking-wide" style={{ color: "#8b7355" }}>
                年獵才經驗
              </div>
            </div>
          )}
          {siteConfig.specialties?.length > 0 && (
            <div
              className="text-center py-6 px-4"
              style={{ borderTop: `2px solid ${accent}30`, borderBottom: `2px solid ${accent}30` }}
            >
              <div className="font-serif text-3xl font-light mb-1" style={{ color: accent }}>
                {siteConfig.specialties.length}
              </div>
              <div className="font-serif text-sm tracking-wide" style={{ color: "#8b7355" }}>
                專精領域
              </div>
            </div>
          )}
          <div
            className="text-center py-6 px-4"
            style={{ borderTop: `2px solid ${accent}30`, borderBottom: `2px solid ${accent}30` }}
          >
            <div className="font-serif text-2xl font-light mb-1" style={{ color: accent }}>
              Step1ne
            </div>
            <div className="font-serif text-sm tracking-wide" style={{ color: "#8b7355" }}>
              所屬團隊
            </div>
          </div>
        </div>

        {/* Specialties as refined badges */}
        {siteConfig.specialties?.length > 0 && (
          <div className="mb-14">
            <h3 className="font-serif text-xl mb-6 text-center" style={{ color: "#3d2b1f" }}>
              專長領域
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {siteConfig.specialties.map((s) => (
                <span
                  key={s}
                  className="px-5 py-2 font-serif text-sm tracking-wide border"
                  style={{
                    borderColor: `${accent}35`,
                    color: accent,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact info - presented tastefully */}
        <div className="mb-14">
          <h3 className="font-serif text-xl mb-6 text-center" style={{ color: "#3d2b1f" }}>
            聯繫方式
          </h3>
          <div className="flex flex-col items-center space-y-4">
            {siteConfig.socialLinks?.email && (
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="flex items-center gap-3 font-serif text-sm tracking-wide transition-colors"
                style={{ color: "#8b7355" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b7355")}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteConfig.socialLinks.email}
              </a>
            )}
            {siteConfig.socialLinks?.phone && (
              <a
                href={`tel:${siteConfig.socialLinks.phone}`}
                className="flex items-center gap-3 font-serif text-sm tracking-wide transition-colors"
                style={{ color: "#8b7355" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b7355")}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.socialLinks.phone}
              </a>
            )}
            {siteConfig.socialLinks?.linkedin && (
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-serif text-sm tracking-wide transition-colors"
                style={{ color: "#8b7355" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b7355")}
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
            {siteConfig.socialLinks?.line && (
              <div
                className="flex items-center gap-3 font-serif text-sm tracking-wide"
                style={{ color: "#8b7355" }}
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE: {siteConfig.socialLinks.line}
              </div>
            )}
          </div>
        </div>

        {/* Testimonials in elegant quote style */}
        {siteConfig.testimonials && siteConfig.testimonials.length > 0 && (
          <div>
            <h3 className="font-serif text-xl mb-8 text-center" style={{ color: "#3d2b1f" }}>
              客戶推薦
            </h3>
            <div className="space-y-8">
              {siteConfig.testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="relative px-8 py-8 text-center"
                  style={{
                    backgroundColor: "#fffdf9",
                    border: "1px solid #e8e0d0",
                  }}
                >
                  {/* Decorative large quotation mark */}
                  <span
                    className="absolute top-3 left-5 font-serif text-5xl leading-none select-none"
                    style={{ color: `${accent}25` }}
                  >
                    &ldquo;
                  </span>

                  <p
                    className="font-serif text-base leading-relaxed italic mb-4 relative z-10"
                    style={{ color: "#5c4a3a" }}
                  >
                    {t.content}
                  </p>

                  {/* Ornamental divider */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="block h-px w-8" style={{ backgroundColor: `${accent}30` }} />
                    <span className="block w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}50` }} />
                    <span className="block h-px w-8" style={{ backgroundColor: `${accent}30` }} />
                  </div>

                  <footer className="font-serif text-sm" style={{ color: "#8b7355" }}>
                    <strong style={{ color: "#3d2b1f" }}>{t.name}</strong>
                    {t.role && (
                      <span> &mdash; {t.role}</span>
                    )}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
