import type { Consultant } from "@/lib/types";

interface AboutSectionProps {
  consultant: Consultant;
}

export default function CreativeAboutSection({ consultant }: AboutSectionProps) {
  const { siteConfig } = consultant;
  const primary = siteConfig.primaryColor || "#7c3aed";
  const accent = siteConfig.accentColor || "#f59e0b";

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black mb-8" style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>關於我</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-10 whitespace-pre-line">{siteConfig.bio}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {siteConfig.yearsExperience > 0 && (
            <div className="text-center p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${primary}10, ${accent}10)` }}>
              <div className="text-3xl font-black" style={{ color: primary }}>{siteConfig.yearsExperience}+</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">年經驗</div>
            </div>
          )}
          {siteConfig.specialties?.map((s, i) => (
            <div key={s} className="text-center p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? primary : accent}10, ${i % 2 === 0 ? accent : primary}10)` }}>
              <div className="text-sm font-bold" style={{ color: i % 2 === 0 ? primary : accent }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 mb-4">聯繫方式</h3>
          {siteConfig.socialLinks?.email && <a href={`mailto:${siteConfig.socialLinks.email}`} className="block text-gray-600 hover:text-gray-900 transition-colors">📧 {siteConfig.socialLinks.email}</a>}
          {siteConfig.socialLinks?.phone && <a href={`tel:${siteConfig.socialLinks.phone}`} className="block text-gray-600 hover:text-gray-900 transition-colors">📱 {siteConfig.socialLinks.phone}</a>}
          {siteConfig.socialLinks?.linkedin && <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-gray-900 transition-colors">💼 LinkedIn</a>}
        </div>
        {siteConfig.testimonials && siteConfig.testimonials.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">客戶推薦</h3>
            <div className="space-y-4">
              {siteConfig.testimonials.map((t, i) => (
                <blockquote key={i} className="p-6 rounded-2xl border-2 border-gray-100 hover:shadow-md transition-shadow">
                  <p className="text-gray-600 italic mb-3">&ldquo;{t.content}&rdquo;</p>
                  <footer className="text-sm"><strong style={{ color: primary }}>{t.name}</strong>{t.role && <span className="text-gray-400"> - {t.role}</span>}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
