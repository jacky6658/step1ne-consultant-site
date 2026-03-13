import { MOCK_CONSULTANT, MOCK_JOBS } from "@/lib/mock-data";
import type { Consultant, Job } from "@/lib/types";
import { Header, Hero, Footer } from "@/components/templates/minimal";
import FeaturedJobs from "@/components/shared/FeaturedJobs";
import Link from "next/link";

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

async function getJobs(): Promise<Job[]> {
  if (BACKEND) {
    try {
      const res = await fetch(`${BACKEND}/api/jobs`, { next: { revalidate: 30 } });
      if (res.ok) {
        const json = await res.json();
        const all: Job[] = Array.isArray(json) ? json : (json.data || []);
        return all
          .filter((j) => j.job_status === "招募中")
          .map((j) => ({
            ...j,
            experience_requirement: j.experience_required || j.experience_requirement || "",
            industry: j.industry_background || j.industry || "",
            remote_policy: j.remote_work || j.remote_policy || "",
          }));
      }
    } catch { /* fallback */ }
  }
  return MOCK_JOBS;
}

export default async function ConsultantHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const consultant = await getConsultant(slug);
  const jobs = await getJobs();
  const featuredJobs = consultant.siteConfig.featuredJobIds?.length
    ? jobs.filter((j) => consultant.siteConfig.featuredJobIds!.includes(j.id))
    : jobs.slice(0, 3);

  return (
    <>
      <Header consultant={consultant} currentPage="home" />

      <main>
        <Hero consultant={consultant} />

        {/* Featured Jobs */}
        <section className="py-16 px-6 bg-gray-50/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">精選職缺</h2>
              <Link
                href={`/consultants/${slug}/jobs`}
                className="text-sm font-medium hover:underline"
                style={{ color: consultant.siteConfig.accentColor }}
              >
                查看全部 &rarr;
              </Link>
            </div>
            <FeaturedJobs consultant={consultant} jobs={featuredJobs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              找不到適合的職缺？
            </h2>
            <p className="text-gray-500 mb-8">
              使用我們的職缺媒合工具，輸入你的技能和經驗，系統會自動為你推薦最適合的機會。
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href={`/consultants/${slug}/match`}
                className="px-6 py-3 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: consultant.siteConfig.accentColor }}
              >
                開始媒合
              </Link>
              <Link
                href={`/consultants/${slug}/about`}
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer consultant={consultant} />
    </>
  );
}
