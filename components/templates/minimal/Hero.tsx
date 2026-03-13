import type { Consultant } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  consultant: Consultant;
}

export default function MinimalHero({ consultant }: HeroProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#3b82f6";

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Avatar */}
        {siteConfig.avatar && (
          <div className="shrink-0">
            <Image
              src={siteConfig.avatar}
              alt={consultant.displayName}
              width={160}
              height={160}
              className="rounded-full object-cover ring-4 ring-gray-100"
            />
          </div>
        )}

        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {siteConfig.heroTitle || `Hi, I&apos;m ${consultant.displayName}`}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl">
            {siteConfig.heroSubtitle || siteConfig.bio}
          </p>

          {/* Specialties */}
          {siteConfig.specialties?.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              {siteConfig.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href={`/consultants/${siteConfig.slug}/jobs`}
              className="px-6 py-3 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              查看職缺
            </a>
            <a
              href={`/consultants/${siteConfig.slug}/match`}
              className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              職缺媒合
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
