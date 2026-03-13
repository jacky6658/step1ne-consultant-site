import type { Consultant } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  consultant: Consultant;
}

export default function CreativeHero({ consultant }: HeroProps) {
  const { siteConfig } = consultant;
  const primary = siteConfig.primaryColor || "#7c3aed";
  const accent = siteConfig.accentColor || "#f59e0b";

  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-6" style={{ background: `linear-gradient(135deg, ${primary}08 0%, ${accent}12 50%, ${primary}05 100%)` }}>
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: accent, filter: "blur(80px)" }} />
      <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full opacity-10" style={{ backgroundColor: primary, filter: "blur(80px)" }} />
      <div className="max-w-5xl mx-auto text-center relative">
        {siteConfig.avatar && (
          <Image src={siteConfig.avatar} alt={consultant.displayName} width={120} height={120} className="rounded-full mx-auto mb-6 object-cover" style={{ boxShadow: `0 0 0 4px ${accent}` }} />
        )}
        <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {siteConfig.heroTitle || consultant.displayName}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          {siteConfig.heroSubtitle || siteConfig.bio?.slice(0, 150)}
        </p>
        {siteConfig.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {siteConfig.specialties.map((s, i) => (
              <span key={s} className="px-4 py-2 rounded-full text-sm font-bold border-2 transition-transform hover:scale-105"
                style={{ borderColor: i % 2 === 0 ? primary : accent, color: i % 2 === 0 ? primary : accent }}>
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={`/consultants/${siteConfig.slug}/jobs`}
            className="px-8 py-4 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}>
            探索機會 →
          </a>
          <a href={`/consultants/${siteConfig.slug}/match`}
            className="px-8 py-4 rounded-full font-bold text-sm border-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
            style={{ borderColor: primary, color: primary }}>
            智慧媒合
          </a>
        </div>
      </div>
    </section>
  );
}
