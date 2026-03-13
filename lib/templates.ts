// ============================================================
// Template Registry & Configuration
// ============================================================

import type { TemplateId } from "./types";

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  previewImage: string;
  defaultColors: {
    primary: string;
    accent: string;
  };
}

export const TEMPLATES: Record<TemplateId, TemplateInfo> = {
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "極簡留白、大字體，適合簡潔俐落的顧問",
    previewImage: "/templates/minimal-preview.png",
    defaultColors: { primary: "#1a1a1a", accent: "#3b82f6" },
  },
  professional: {
    id: "professional",
    name: "Professional",
    description: "商務穩重、卡片式佈局，適合資深獵頭顧問",
    previewImage: "/templates/professional-preview.png",
    defaultColors: { primary: "#1e3a5f", accent: "#2563eb" },
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "大膽配色、動態效果，適合設計/創意產業顧問",
    previewImage: "/templates/creative-preview.png",
    defaultColors: { primary: "#7c3aed", accent: "#f59e0b" },
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "科技感、Grid 佈局，適合科技產業顧問",
    previewImage: "/templates/modern-preview.png",
    defaultColors: { primary: "#0f172a", accent: "#06b6d4" },
  },
  elegant: {
    id: "elegant",
    name: "Elegant",
    description: "優雅排版、襯線字體，適合高階主管獵才顧問",
    previewImage: "/templates/elegant-preview.png",
    defaultColors: { primary: "#44403c", accent: "#b45309" },
  },
};

export function getTemplateInfo(id: TemplateId): TemplateInfo {
  return TEMPLATES[id] || TEMPLATES.minimal;
}
