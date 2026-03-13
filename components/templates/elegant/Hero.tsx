import type { Consultant } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  consultant: Consultant;
}

export default function ElegantHero({ consultant }: HeroProps) {
  const { siteConfig } = consultant;
  const accent = siteConfig.accentColor || "#b8860b";

  return (
    <section
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #b8860b 1px, transparent 1px), radial-gradient(circle at 75% 75%, #b8860b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Warm gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,240,232,0.9) 0%, rgba(250,248,244,0.95) 50%, rgba(245,240,232,0.9) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative text-center">
        {/* Avatar with decorative frame */}
        {siteConfig.avatar && (
          <div className="relative inline-block mb-8">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${accent}40`,
                transform: "scale(1.15)",
              }}
            />
            <Image
              src={siteConfig.avatar}
              alt={consultant.displayName}
              width={140}
              height={140}
              className="rounded-full object-cover"
              style={{
                border: `3px solid ${accent}`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.08)`,
              }}
            />
          </div>
        )}

        {/* Ornamental divider above title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span
            className="block h-px w-12"
            style={{ backgroundColor: `${accent}60` }}
          />
          <svg
            className="w-4 h-4"
            style={{ color: accent }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
          </svg>
          <span
            className="block h-px w-12"
            style={{ backgroundColor: `${accent}60` }}
          />
        </div>

        {/* Title */}
        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-5"
          style={{ color: "#3d2b1f" }}
        >
          {siteConfig.heroTitle || `${consultant.displayName}`}
        </h1>

        {/* Subtitle */}
        <p
          className="font-serif text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#8b7355" }}
        >
          {siteConfig.heroSubtitle || siteConfig.bio}
        </p>

        {/* Specialties as refined tags */}
        {siteConfig.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {siteConfig.specialties.map((s) => (
              <span
                key={s}
                className="px-4 py-1.5 font-serif text-sm tracking-wide border rounded-sm"
                style={{
                  borderColor: `${accent}40`,
                  color: accent,
                  backgroundColor: `${accent}08`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/consultants/${siteConfig.slug}/jobs`}
            className="px-8 py-3 font-serif text-sm tracking-wider text-white transition-all hover:brightness-110"
            style={{
              backgroundColor: accent,
              boxShadow: `0 2px 12px ${accent}30`,
            }}
          >
            瀏覽職缺
          </Link>
          <Link
            href={`/consultants/${siteConfig.slug}/about`}
            className="px-8 py-3 font-serif text-sm tracking-wider border transition-colors"
            style={{
              borderColor: `${accent}50`,
              color: accent,
            }}
          >
            了解更多
          </Link>
        </div>
      </div>
    </section>
  );
}
