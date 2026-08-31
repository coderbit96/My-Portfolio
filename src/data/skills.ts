import { DiJava } from "react-icons/di";
import {
  FaCloud,
  FaCloudUploadAlt,
  FaCode,
  FaCodeBranch,
  FaCss3Alt,
  FaDatabase,
  FaEnvelope,
  FaKey,
  FaLock,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaTools,
  FaUserShield,
  FaWordpressSimple
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLaravel,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si";
import type { SkillCategory, SkillGroup, SkillItem, TechItem } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "ReactJS"]
  },
  {
    title: "Backend Knowledge",
    skills: ["PHP", "Laravel", "Node.js", "Express.js", "MongoDB", "MySQL", "AWS"]
  },
  {
    title: "Programming",
    skills: ["Java", "Python", "Next.js"]
  },
  {
    title: "CMS & Marketing",
    skills: ["WordPress", "SEO", "Digital Marketing"]
  }
];

export const skillCategories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud / Deployment",
  "Tools",
  "Other"
];

export const skills: SkillItem[] = [
  { name: "React.js", category: "Frontend", icon: SiReact, context: "Component-driven UIs" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, context: "App Router foundations" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, context: "Typed React architecture" },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, context: "Modern browser logic" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, context: "Responsive styling systems" },
  { name: "Redux", category: "Frontend", icon: SiRedux, context: "Predictable app state" },
  { name: "HTML5", category: "Frontend", icon: SiHtml5, context: "Semantic structure" },
  { name: "CSS3", category: "Frontend", icon: FaCss3Alt, context: "Responsive layouts" },

  { name: "Node.js", category: "Backend", icon: SiNodedotjs, context: "Server-side JavaScript" },
  { name: "Express.js", category: "Backend", icon: SiExpress, context: "Backend routing" },
  { name: "REST APIs", category: "Backend", icon: FaServer, context: "Practical service endpoints" },
  { name: "JWT", category: "Backend", icon: SiJsonwebtokens, context: "Token-based auth" },
  { name: "RBAC", category: "Backend", icon: FaUserShield, context: "Role-based access" },
  { name: "Nodemailer", category: "Backend", icon: FaEnvelope, context: "Transactional email flows" },

  { name: "MongoDB", category: "Database", icon: SiMongodb, context: "Document data models" },
  { name: "Mongoose", category: "Database", icon: SiMongoose, context: "MongoDB schemas" },
  { name: "Firebase", category: "Database", icon: SiFirebase, context: "App backend services" },
  { name: "Firestore", category: "Database", icon: SiFirebase, context: "Realtime document storage" },
  { name: "SQL", category: "Database", icon: SiMysql, context: "Relational foundations" },

  { name: "Vercel", category: "Cloud / Deployment", icon: SiVercel, context: "Frontend deployment" },
  { name: "DNS", category: "Cloud / Deployment", icon: FaCloud, context: "Domain configuration" },
  { name: "SSL", category: "Cloud / Deployment", icon: FaLock, context: "Secure delivery" },
  { name: "CI/CD", category: "Cloud / Deployment", icon: FaCodeBranch, context: "Automated release flow" },

  { name: "Git", category: "Tools", icon: SiGit, context: "Version control" },
  { name: "GitHub", category: "Tools", icon: SiGithub, context: "Repository workflow" },
  { name: "Postman", category: "Tools", icon: SiPostman, context: "API testing" },
  { name: "VS Code", category: "Tools", icon: FaCode, context: "Development workspace" },

  { name: "WordPress", category: "Other", icon: FaWordpressSimple, context: "CMS websites" },
  { name: "SEO", category: "Other", icon: FaSearch, context: "Search-aware structure" },
  { name: "PHP", category: "Other", icon: SiPhp, context: "Backend foundations" },
  { name: "Laravel", category: "Other", icon: SiLaravel, context: "PHP framework basics" },
  { name: "Java", category: "Other", icon: DiJava, context: "Programming fundamentals" },
  { name: "Python", category: "Other", icon: SiPython, context: "Programming fundamentals" },
  { name: "Authentication", category: "Other", icon: FaKey, context: "Secure user flows" },
  { name: "Security basics", category: "Other", icon: FaShieldAlt, context: "Practical app safeguards" },
  { name: "Optimization", category: "Other", icon: FaCloudUploadAlt, context: "Performance-minded delivery" },
  { name: "Developer Tools", category: "Other", icon: FaTools, context: "Debugging and workflow" },
  { name: "Data Modeling", category: "Other", icon: FaDatabase, context: "Useful schema design" }
];

export const techStack: TechItem[] = [
  { name: "HTML5", icon: SiHtml5, color: "#22d3ee" },
  { name: "CSS3", icon: FaCss3Alt, color: "#64748b" },
  { name: "JavaScript", icon: SiJavascript, color: "#22d3ee" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#64748b" },
  { name: "ReactJS", icon: SiReact, color: "#22d3ee" },
  { name: "PHP", icon: SiPhp, color: "#64748b" },
  { name: "MongoDb", icon: SiMongodb, color: "#22d3ee" },
  { name: "ExpressJs", icon: SiExpress, color: "#64748b" },
  { name: "Node Js", icon: SiNodedotjs, color: "#22d3ee" },
  { name: "Laravel", icon: SiLaravel, color: "#64748b" },
  { name: "Java", icon: DiJava, color: "#22d3ee" },
  { name: "Python", icon: SiPython, color: "#64748b" },
  { name: "WordPress", icon: FaWordpressSimple, color: "#22d3ee" },
  { name: "SEO", icon: FaSearch, color: "#64748b" }
];
