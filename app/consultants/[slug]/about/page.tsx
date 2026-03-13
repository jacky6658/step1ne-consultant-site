import { MOCK_CONSULTANT } from "@/lib/mock-data";
import type { Consultant } from "@/lib/types";
import { Header, AboutSection, Footer } from "@/components/templates/minimal";

const BACKEND = process.env.HEADHUNTER_API_URL;

async function getConsultant(slug: string): Promise<Consultant> {
  if (BACKEND) {
    try {
      const res = await fetch(
        `${BACKEND}/api/users/${encodeURIComponent(slug)}/site-config`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) return res.json();
    } catch { /* fallback */ }
  }
  return MOCK_CONSULTANT;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const consultant = await getConsultant(slug);

  return (
    <>
      <Header consultant={consultant} currentPage="about" />
      <main>
        <AboutSection consultant={consultant} />
      </main>
      <Footer consultant={consultant} />
    </>
  );
}
