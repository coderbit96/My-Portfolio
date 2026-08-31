import type { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud / Deployment"
  | "Tools"
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

export interface ProjectDetail {
  title: string;
  category: string;
  description: string;
  stack: string[];
  icon: IconType;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
}

export interface PresentedProject {
  id: number;
  title: string;
  category: string;
  description: string;
  stack: string[];
  icon: IconType;
  accent: VisualAccent;
  githubUrl: string;
  liveUrl: string;
}

export interface VisualAccent {
  text: string;
  border: string;
  bg: string;
  glow: string;
}

export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  file: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface EducationDocument {
  label: string;
  fileName: string;
}
