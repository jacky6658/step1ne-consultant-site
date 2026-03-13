import type { Consultant } from "@/lib/types";

interface AboutSectionProps {
  consultant: Consultant;
}

export default function ProfessionalAboutSection({ consultant }: AboutSectionProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#2563eb";
  const primary = siteConfig.primaryColor || "#1e3a5f";

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: primary }}>關於我</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line mb-8">{siteConfig.bio}</p>
            {siteConfig.specialties?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: primary }}>專長領域</h3>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.specialties.map((s) => (
                    <span key={s} className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}08` }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">基本資訊</h3>
              <div className="space-y-3">
                {siteConfig.yearsExperience > 0 && (
                  <div className="flex justify-between"><span className="text-sm text-gray-500">獵才年資</span><span className="text-sm font-semibold" style={{ color: accent }}>{siteConfig.yearsExperience}+ 年</span></div>
                )}
                <div className="flex justify-between"><span className="text-sm text-gray-500">所屬團隊</span><span className="text-sm font-semibold text-gray-700">Step1ne</span></div>
                {siteConfig.specialties?.length > 0 && (
                  <div className="flex justify-between"><span className="text-sm text-gray-500">專精領域</span><span className="text-sm font-semibold text-gray-700">{siteConfig.specialties.length} 個</span></div>
                )}
              </div>
            </div>
            <div className="rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">聯繫方式</h3>
              <div className="space-y-2.5">
                {siteConfig.socialLinks?.email && <a href={`mailto:${siteConfig.socialLinks.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{siteConfig.socialLinks.email}</a>}
                {siteConfig.socialLinks?.phone && <a href={`tel:${siteConfig.socialLinks.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{siteConfig.socialLinks.phone}</a>}
                {siteConfig.socialLinks?.linkedin && <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>LinkedIn</a>}
              </div>
            </div>
          </div>
        </div>
        {siteConfig.testimonials && siteConfig.testimonials.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6" style={{ color: primary }}>客戶推薦</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {siteConfig.testimonials.map((t, i) => (
                <blockquote key={i} className="p-6 rounded-xl bg-gray-50 border-l-4" style={{ borderColor: accent }}>
                  <p className="text-gray-600 italic mb-3">&ldquo;{t.content}&rdquo;</p>
                  <footer className="text-sm text-gray-500"><strong className="text-gray-700">{t.name}</strong>{t.role && ` - ${t.role}`}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
