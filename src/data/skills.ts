import { DiJava } from "react-icons/di";
import {
  FaCss3Alt,
  FaSearch,
  FaServer,
  FaWordpressSimple
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
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
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si";
import type { SkillItem } from "@/types/portfolio";

export const skills: SkillItem[] = [
  { name: "React.js", category: "Frontend", icon: SiReact, color: "#61DAFB", context: "Component-driven UIs" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#FFFFFF", context: "App Router foundations" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6", context: "Typed React architecture" },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, color: "#F7DF1E", context: "Modern browser logic" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#38BDF8", context: "Responsive styling systems" },
  { name: "HTML5", category: "Frontend", icon: SiHtml5, color: "#E34F26", context: "Semantic structure" },
  { name: "CSS3", category: "Frontend", icon: FaCss3Alt, color: "#1572B6", context: "Responsive layouts" },

  { name: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#5FA04E", context: "Server-side JavaScript" },
  { name: "Express.js", category: "Backend", icon: SiExpress, color: "#FFFFFF", context: "Backend routing" },
  { name: "REST APIs", category: "Backend", icon: FaServer, color: "#22D3EE", context: "Practical service endpoints" },
  { name: "JWT", category: "Backend", icon: SiJsonwebtokens, color: "#FB015B", context: "Token-based auth" },

  { name: "MongoDB", category: "Database", icon: SiMongodb, color: "#47A248", context: "Document data models" },
  { name: "Mongoose", category: "Database", icon: SiMongoose, color: "#F04D35", context: "MongoDB schemas" },
  { name: "Firebase", category: "Database", icon: SiFirebase, color: "#FFCA28", context: "App backend services" },
  { name: "Firestore", category: "Database", icon: SiFirebase, color: "#FFA000", context: "Realtime document storage" },
  { name: "SQL", category: "Database", icon: SiMysql, color: "#4479A1", context: "Relational foundations" },

  { name: "Vercel", category: "Cloud / Deployment", icon: SiVercel, color: "#FFFFFF", context: "Frontend deployment" },

  { name: "GitHub", category: "Tools", icon: SiGithub, color: "#FFFFFF", context: "Repository workflow" },
  { name: "Postman", category: "Tools", icon: SiPostman, color: "#FF6C37", context: "API testing" },

  { name: "WordPress", category: "Other", icon: FaWordpressSimple, color: "#21759B", context: "CMS websites" },
  { name: "SEO", category: "Other", icon: FaSearch, color: "#22D3EE", context: "Search-aware structure" },
  { name: "PHP", category: "Other", icon: SiPhp, color: "#777BB4", context: "Backend foundations" },
  { name: "Laravel", category: "Other", icon: SiLaravel, color: "#FF2D20", context: "PHP framework basics" },
  { name: "Java", category: "Other", icon: DiJava, color: "#F89820", context: "Programming fundamentals" },
  { name: "Python", category: "Other", icon: SiPython, color: "#FFD43B", context: "Programming fundamentals" }
];
