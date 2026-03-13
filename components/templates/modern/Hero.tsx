import type { Consultant } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  consultant: Consultant;
}

export default function ModernHero({ consultant }: HeroProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#06b6d4";

  return (
    <section className="relative bg-gray-950 overflow-hidden py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${accent}40, transparent 70%)` }} />
      <div className="max-w-5xl mx-auto relative text-center">
        {siteConfig.avatar && (
          <div className="relative inline-block mb-6">
            <Image src={siteConfig.avatar} alt={consultant.displayName} width={100} height={100} className="rounded-2xl object-cover" style={{ boxShadow: `0 0 30px ${accent}30` }} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-950" style={{ backgroundColor: "#22c55e" }} />
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {siteConfig.heroTitle || consultant.displayName}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {siteConfig.heroSubtitle || siteConfig.bio?.slice(0, 150)}
        </p>
        {siteConfig.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {siteConfig.specialties.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border" style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}10` }}>{s}</span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={`/consultants/${siteConfig.slug}/jobs`}
            className="px-8 py-3 rounded-lg text-sm font-bold text-gray-950 transition-all hover:brightness-110"
            style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}50` }}>
            查看職缺
          </a>
          <a href={`/consultants/${siteConfig.slug}/match`}
            className="px-8 py-3 rounded-lg text-sm font-medium border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all">
            職缺媒合
          </a>
        </div>
      </div>
    </section>
  );
}
