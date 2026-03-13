// ============================================================
// Step1ne Consultant Site - Shared Type Definitions
// ============================================================

// --- Consultant & Site Config ---

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  line?: string;
  email?: string;
  phone?: string;
  telegram?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export type TemplateId =
  | "minimal"
  | "professional"
  | "creative"
  | "modern"
  | "elegant";

export interface SiteConfig {
  slug: string;
  template: TemplateId;
  primaryColor: string;
  accentColor: string;
  heroTitle: string;
  heroSubtitle: string;
  avatar: string;
  bio: string;
  specialties: string[];
  yearsExperience: number;
  socialLinks: SocialLinks;
  seoTitle?: string;
  seoDescription?: string;
  featuredJobIds?: number[];
  testimonials?: Testimonial[];
  isPublished: boolean;
}

export interface Consultant {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  contactPhone?: string;
  contactEmail?: string;
  lineId?: string;
  telegramHandle?: string;
  siteConfig: SiteConfig;
}

// --- Job ---

export interface Job {
  id: number;
  position_name: string;
  client_company: string;
  department?: string;
  salary_range: string;
  key_skills: string;
  job_description?: string;
  marketing_description?: string;
  job_status: string;
  industry: string;
  location: string;
  interview_process?: string;
  consultant?: string;
  education_requirement?: string;
  experience_requirement?: string;
  language_requirement?: string;
  remote_policy?: string;
  headcount?: number;
  created_at?: string;
  updated_at?: string;
  // Backend field aliases (normalized on fetch)
  experience_required?: string;
  industry_background?: string;
  remote_work?: string;
}

// --- Candidate (Resume Submission) ---

export interface CandidateSubmission {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  years_experience?: number;
  skills?: string;
  education?: string;
  work_history?: string;
  linkedin_url?: string;
  github_url?: string;
  location?: string;
  industry?: string;
  languages?: string;
  current_salary?: string;
  expected_salary?: string;
  notice_period?: string;
  biography?: string;
  portfolio_url?: string;
  // Auto-set by the system
  source: string;
  consultant: string;
  status: string;
}

export interface ResumeParseResult {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  years?: number;
  skills?: string;
  education?: string;
  work_history?: string;
  linkedin_url?: string;
  location?: string;
  languages?: string;
  industry?: string;
  education_details?: Record<string, unknown>;
  stability_score?: number;
  _meta?: {
    parseMethod: string;
    confidence: number;
  };
}

// --- Job Matching ---

export interface MatchInput {
  // Keyword mode
  keywords?: string;
  position?: string;
  skills?: string;
  industry?: string;
  location?: string;
  years_experience?: number;
  // Resume mode (parsed result)
  resumeData?: ResumeParseResult;
}

export interface MatchBreakdown {
  skillScore: number;
  industryScore: number;
  locationScore: number;
  experienceScore: number;
}

export interface MatchResult {
  job: Job;
  score: number;
  breakdown: MatchBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: "強力推薦" | "推薦" | "可考慮" | "差距較大";
}

export interface MatchReport {
  results: MatchResult[];
  inputSummary: string;
  totalJobsScanned: number;
  generatedAt: string;
}

// --- Template Props ---

export interface TemplatePageProps {
  consultant: Consultant;
  jobs: Job[];
}

export interface TemplateComponents {
  Header: React.ComponentType<{ consultant: Consultant; currentPage: string }>;
  Hero: React.ComponentType<{ consultant: Consultant }>;
  JobCard: React.ComponentType<{ job: Job; onApply: (job: Job) => void; onViewDetail?: (job: Job) => void }>;
  AboutSection: React.ComponentType<{ consultant: Consultant }>;
  Footer: React.ComponentType<{ consultant: Consultant }>;
}
