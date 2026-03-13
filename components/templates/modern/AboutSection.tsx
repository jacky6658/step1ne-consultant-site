import type { Consultant } from "@/lib/types";

interface AboutSectionProps {
  consultant: Consultant;
}

export default function ModernAboutSection({ consultant }: AboutSectionProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#06b6d4";

  return (
    <section className="py-16 px-6 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          <span style={{ color: accent }}>#</span> 關於我
        </h2>
        <p className="text-gray-400 leading-relaxed text-base mb-10 whitespace-pre-line">{siteConfig.bio}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {siteConfig.yearsExperience > 0 && (
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-2xl font-bold" style={{ color: accent }}>{siteConfig.yearsExperience}+</div>
              <div className="text-xs text-gray-500 mt-1">年經驗</div>
            </div>
          )}
          {siteConfig.specialties?.length > 0 && (
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-2xl font-bold" style={{ color: accent }}>{siteConfig.specialties.length}</div>
              <div className="text-xs text-gray-500 mt-1">專精領域</div>
            </div>
          )}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 text-center">
            <div className="text-2xl font-bold" style={{ color: accent }}>Step1ne</div>
            <div className="text-xs text-gray-500 mt-1">所屬團隊</div>
          </div>
        </div>
        {siteConfig.specialties?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4"><span style={{ color: accent }}>#</span> 技術棧</h3>
            <div className="flex flex-wrap gap-2">
              {siteConfig.specialties.map((s) => (
                <span key={s} className="px-4 py-2 rounded-lg text-sm font-mono border" style={{ borderColor: `${accent}30`, color: accent, backgroundColor: `${accent}08` }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4"><span style={{ color: accent }}>#</span> 聯繫</h3>
          <div className="space-y-2">
            {siteConfig.socialLinks?.email && <a href={`mailto:${siteConfig.socialLinks.email}`} className="block text-gray-400 hover:text-white transition-colors font-mono text-sm">→ {siteConfig.socialLinks.email}</a>}
            {siteConfig.socialLinks?.phone && <a href={`tel:${siteConfig.socialLinks.phone}`} className="block text-gray-400 hover:text-white transition-colors font-mono text-sm">→ {siteConfig.socialLinks.phone}</a>}
            {siteConfig.socialLinks?.linkedin && <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors font-mono text-sm">→ LinkedIn</a>}
          </div>
        </div>
        {siteConfig.testimonials && siteConfig.testimonials.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-6"><span style={{ color: accent }}>#</span> 推薦</h3>
            <div className="space-y-4">
              {siteConfig.testimonials.map((t, i) => (
                <blockquote key={i} className="p-6 rounded-xl bg-gray-900 border border-gray-800 border-l-2" style={{ borderLeftColor: accent }}>
                  <p className="text-gray-400 italic mb-3">&ldquo;{t.content}&rdquo;</p>
                  <footer className="text-sm"><strong className="text-white">{t.name}</strong>{t.role && <span className="text-gray-500"> · {t.role}</span>}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
