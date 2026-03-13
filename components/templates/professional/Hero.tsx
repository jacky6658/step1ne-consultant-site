import type { Consultant } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  consultant: Consultant;
}

export default function ProfessionalHero({ consultant }: HeroProps) {
  const { siteConfig } = consultant;
  const primary = siteConfig.primaryColor || "#1e3a5f";
  const accent = siteConfig.accentColor || "#2563eb";

  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primary}dd 50%, ${accent}33 100%)` }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-white">
          <p className="text-sm font-medium uppercase tracking-widest mb-3 opacity-70">Step1ne Headhunter</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {siteConfig.heroTitle || `${consultant.displayName}`}
          </h1>
          <p className="text-lg opacity-80 mb-8 max-w-lg leading-relaxed">
            {siteConfig.heroSubtitle || siteConfig.bio?.slice(0, 120)}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`/consultants/${siteConfig.slug}/jobs`}
              className="px-6 py-3 rounded-lg font-medium text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: accent, color: "white" }}>
              瀏覽職缺
            </a>
            <a href={`/consultants/${siteConfig.slug}/match`}
              className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
              智慧媒合
            </a>
          </div>
        </div>
        <div className="shrink-0 bg-white rounded-2xl shadow-xl p-8 w-full md:w-80">
          <div className="text-center">
            {siteConfig.avatar ? (
              <Image src={siteConfig.avatar} alt={consultant.displayName} width={96} height={96} className="rounded-full mx-auto mb-4 ring-4 ring-gray-100 object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: accent }}>
                {consultant.displayName.charAt(0)}
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900">{consultant.displayName}</h3>
            <p className="text-sm text-gray-500 mb-4">Step1ne 獵頭顧問</p>
            {siteConfig.specialties?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                {siteConfig.specialties.slice(0, 3).map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${accent}15`, color: accent }}>{s}</span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div><div className="text-xl font-bold" style={{ color: accent }}>{siteConfig.yearsExperience || 0}+</div><div className="text-xs text-gray-400">年經驗</div></div>
              <div><div className="text-xl font-bold" style={{ color: accent }}>{siteConfig.specialties?.length || 0}</div><div className="text-xs text-gray-400">專精領域</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
