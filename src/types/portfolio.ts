import type { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud / Deployment"
  | "Tools"
  | "AI Tools"
  | "Other";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  icon: IconType;
  color: string;
  context?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution?: string;
  university?: string;
  year?: string;
  cgpa?: string;
  description: string;
  documentLabel?: string;
  documentFileName?: string;
  featured?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}
