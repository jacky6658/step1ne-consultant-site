import type { Metadata } from "next";
import { MOCK_CONSULTANT } from "@/lib/mock-data";
import type { Consultant } from "@/lib/types";

const BACKEND = process.env.HEADHUNTER_API_URL;

async function getConsultant(slug: string): Promise<Consultant | null> {
  // Try fetching from backend first
  if (BACKEND) {
    try {
      const res = await fetch(
        `${BACKEND}/api/users/${encodeURIComponent(slug)}/site-config`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) return res.json();
    } catch {
      // Fall through to mock
    }
  }

  // Fallback to mock data in development
  if (slug === MOCK_CONSULTANT.siteConfig.slug) {
    return MOCK_CONSULTANT;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const consultant = await getConsultant(slug);

  if (!consultant) {
    return { title: "Consultant Not Found" };
  }

  const { siteConfig } = consultant;

  return {
    title: siteConfig.seoTitle || `${consultant.displayName} - Step1ne 獵頭顧問`,
    description: siteConfig.seoDescription || siteConfig.bio?.slice(0, 160),
    openGraph: {
      title: siteConfig.seoTitle || consultant.displayName,
      description: siteConfig.seoDescription || siteConfig.bio?.slice(0, 160),
      type: "profile",
      ...(siteConfig.avatar && { images: [siteConfig.avatar] }),
    },
  };
}

export default async function ConsultantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const consultant = await getConsultant(slug);

  if (!consultant || !consultant.siteConfig?.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-500">找不到此顧問頁面</p>
        </div>
      </div>
    );
  }

  // Inject CSS variables for template colors
  const style = {
    "--color-primary": consultant.siteConfig.primaryColor || "#1a1a1a",
    "--color-accent": consultant.siteConfig.accentColor || "#3b82f6",
  } as React.CSSProperties;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: consultant.displayName,
    jobTitle: "獵頭顧問",
    description: consultant.siteConfig.bio || "",
    url: `https://site.step1ne.com/consultants/${slug}`,
    ...(consultant.siteConfig.avatar && { image: consultant.siteConfig.avatar }),
    worksFor: {
      "@type": "Organization",
      name: "Step1ne",
      url: "https://step1ne.com",
    },
    knowsAbout: consultant.siteConfig.specialties || [],
  };

  return (
    <div style={style} className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
