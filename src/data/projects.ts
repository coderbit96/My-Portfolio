import {
  FaBirthdayCake,
  FaBriefcase,
  FaCode,
  FaGamepad,
  FaGraduationCap,
  FaGithub,
  FaHeart,
  FaLayerGroup,
  FaMoneyBillWave,
  FaRobot,
  FaShoppingCart,
  FaTicketAlt,
  FaUtensils,
  FaWpforms
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type { VisualAccent } from "@/types/portfolio";

export type ProjectCategory =
  | "All"
  | "Full Stack"
  | "AI"
  | "Dashboard"
  | "E-Commerce"
  | "Other";

export type ProjectStatus = "Live" | "Repository only" | "Archived";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: Exclude<ProjectCategory, "All">;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
  status: ProjectStatus;
  problem: string;
  solution: string;
  challenges: string[];
  repositoryName: string;
  icon: IconType;
}

export const projectCategories: ProjectCategory[] = [
  "All",
  "Full Stack",
  "AI",
  "Dashboard",
  "E-Commerce",
  "Other"
];

export const visualAccents: VisualAccent[] = [
  { text: "text-cyanGlow", border: "border-cyanGlow/35", bg: "bg-cyanGlow/10", glow: "rgba(34,211,238,0.32)" },
  { text: "text-mintGlow", border: "border-mintGlow/35", bg: "bg-mintGlow/10", glow: "rgba(34,197,94,0.26)" },
  { text: "text-goldGlow", border: "border-goldGlow/35", bg: "bg-goldGlow/10", glow: "rgba(59,130,246,0.28)" },
  { text: "text-roseGlow", border: "border-roseGlow/35", bg: "bg-roseGlow/10", glow: "rgba(139,92,246,0.26)" }
];

export const projects: Project[] = [
  {
    id: "showtime",
    slug: "showtime",
    title: "ShowTime",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Full Stack",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://show-time-gold.vercel.app",
    githubUrl: "https://github.com/coderbit96/ShowTime",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "ShowTime",
    icon: FaTicketAlt
  },
  {
    id: "student-management-system",
    slug: "student-management-system",
    title: "Student Management System",
    shortDescription: "A public TypeScript management system from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Dashboard",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://student-management-system-rouge-three.vercel.app",
    githubUrl: "https://github.com/coderbit96/Student-Management-System",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Student-Management-System",
    icon: FaLayerGroup
  },
  {
    id: "turf-booking-demo",
    slug: "turf-booking-demo",
    title: "Turf Booking Demo",
    shortDescription: "A public HTML project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["HTML"],
    features: [],
    liveUrl: "https://turf-booking-demo-beta.vercel.app",
    githubUrl: "https://github.com/coderbit96/Turf-Booking-Demo",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Turf-Booking-Demo",
    icon: FaLayerGroup
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "Ecommerce",
    shortDescription: "A public TypeScript e-commerce project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "E-Commerce",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://ecommerce-psi-blush.vercel.app",
    githubUrl: "https://github.com/coderbit96/Ecommerce",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Ecommerce",
    icon: FaShoppingCart
  },
  {
    id: "dynamic-portfolio",
    slug: "dynamic-portfolio",
    title: "Personal Portfolio",
    shortDescription: "A premium portfolio system with motion, reusable sections, optimized assets, and a frontend-only contact flow.",
    description: "A premium portfolio system with motion, reusable sections, optimized assets, and a frontend-only contact flow.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["Vite", "Framer Motion", "GSAP", "JavaScript"],
    features: ["Motion-led sections", "Reusable portfolio sections", "Frontend-only contact flow"],
    liveUrl: "https://dynamic-portfolio-liard.vercel.app",
    githubUrl: "https://github.com/coderbit96/Dynamic-Portfolio",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Dynamic-Portfolio",
    icon: FaCode
  },
  {
    id: "rasoigo",
    slug: "rasoigo",
    title: "RasoiGo",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "E-Commerce",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://foodistar-lake.vercel.app",
    githubUrl: "https://github.com/coderbit96/RASOIGO",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "RASOIGO",
    icon: FaUtensils
  },
  {
    id: "employee-management",
    slug: "employee-management",
    title: "Employee Management System",
    shortDescription: "A public TypeScript employee management project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Dashboard",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://employee-management-system-advanced.vercel.app",
    githubUrl: "https://github.com/coderbit96/Employee-Management",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Employee-Management",
    icon: FaLayerGroup
  },
  {
    id: "coderbit96",
    slug: "coderbit96",
    title: "coderbit96",
    shortDescription: "A starred public repository from coderbit96's GitHub profile.",
    description: "A starred public repository from coderbit96's GitHub profile. Open the repository to review the available code and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["GitHub"],
    features: ["Starred on GitHub"],
    liveUrl: "",
    githubUrl: "https://github.com/coderbit96/coderbit96",
    featured: false,
    year: "2026",
    status: "Repository only",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "coderbit96",
    icon: FaGithub
  },
  {
    id: "atmos",
    slug: "atmos",
    title: "ATMOS",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://atmos-smoky.vercel.app",
    githubUrl: "https://github.com/coderbit96/ATMOS",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "ATMOS",
    icon: FaCode
  },
  {
    id: "tour-expenses",
    slug: "tour-expenses",
    title: "Tour Expenses",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Dashboard",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://tour-expenses.vercel.app",
    githubUrl: "https://github.com/coderbit96/Tour-Expenses",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Tour-Expenses",
    icon: FaMoneyBillWave
  },
  {
    id: "arcade-games",
    slug: "arcade-games",
    title: "Arcade Games",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://arcade-games-topaz.vercel.app",
    githubUrl: "https://github.com/coderbit96/Arcade-Games",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Arcade-Games",
    icon: FaGamepad
  },
  {
    id: "durga",
    slug: "durga",
    title: "Durga",
    shortDescription: "A public TypeScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["TypeScript"],
    features: [],
    liveUrl: "https://durga-eight.vercel.app",
    githubUrl: "https://github.com/coderbit96/Durga",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Durga",
    icon: FaHeart
  },
  {
    id: "global-currency-converter",
    slug: "global-currency-converter",
    title: "Global Currency Converter",
    shortDescription: "A public JavaScript project from Joydip's GitHub portfolio.",
    description: "Open the repository and live deployment to explore the available code, interface, and documentation.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["JavaScript"],
    features: [],
    liveUrl: "https://global-currency-converter-lake.vercel.app",
    githubUrl: "https://github.com/coderbit96/Global-Currency-Converter",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Global-Currency-Converter",
    icon: FaMoneyBillWave
  },
  {
    id: "ishani-riceceremony",
    slug: "ishani-riceceremony",
    title: "Rice Ceremony Invitation",
    shortDescription: "A data-driven Bengali invitation experience with guest personalization, motion, image galleries, and optional music.",
    description: "A data-driven Bengali invitation experience with guest personalization, motion, image galleries, and optional music.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["ReactJS", "Tailwind CSS", "Framer Motion", "JavaScript"],
    features: ["Guest personalization", "Motion", "Image galleries", "Optional music"],
    liveUrl: "https://ishani-annaprashan-ceremony.vercel.app",
    githubUrl: "https://github.com/coderbit96/Ishani_RiceCeremony",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Ishani_RiceCeremony",
    icon: FaHeart
  },
  {
    id: "birthday-wish-website",
    slug: "birthday-wish-website",
    title: "Wishly Birthday Creator",
    shortDescription: "A personal birthday-wish creator with animated pages, shareable links, and private wish storage through Vercel Blob.",
    description: "A personal birthday-wish creator with animated pages, shareable links, and private wish storage through Vercel Blob.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["ReactJS", "Vite", "Vercel Blob", "CSS"],
    features: ["Animated pages", "Shareable links", "Private wish storage through Vercel Blob"],
    liveUrl: "https://birthday-wish-website-pi.vercel.app",
    githubUrl: "https://github.com/coderbit96/Birthday-Wish-Website",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Birthday-Wish-Website",
    icon: FaBirthdayCake
  },
  {
    id: "caira-automade",
    slug: "caira-automade",
    title: "Caira Automade",
    shortDescription: "Caira Automade MERN AI command workspace.",
    description: "A MERN AI command workspace for chat, project summaries, code generation, image generation, and enhancement.",
    thumbnail: "",
    images: [],
    category: "AI",
    technologies: ["MERN", "Gemini AI", "Vite", "JavaScript"],
    features: ["Chat", "Project summaries", "Code generation", "Image generation", "Enhancement"],
    liveUrl: "https://caira-automade.vercel.app",
    githubUrl: "https://github.com/coderbit96/caira-automade",
    featured: true,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "caira-automade",
    icon: FaRobot
  },
  {
    id: "career-pilot",
    slug: "career-pilot",
    title: "Career Pilot",
    shortDescription: "An AI-focused career platform structured as a frontend and backend monorepo.",
    description: "An AI-focused career platform structured as a frontend and backend monorepo for guided career development workflows.",
    thumbnail: "",
    images: [],
    category: "AI",
    technologies: ["JavaScript", "Node.js", "AI SaaS"],
    features: [],
    liveUrl: "",
    githubUrl: "https://github.com/coderbit96/Career-Pilot",
    featured: false,
    year: "2026",
    status: "Repository only",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Career-Pilot",
    icon: FaBriefcase
  },
  {
    id: "company-lead-form",
    slug: "company-lead-form",
    title: "Company Lead Form",
    shortDescription: "A responsive business landing page with lead capture and conversion-focused content.",
    description: "A responsive business landing page with lead capture, pricing, benefits, FAQs, and conversion-focused CTAs.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: ["Lead capture", "Pricing", "Benefits", "FAQs", "Conversion-focused CTAs"],
    liveUrl: "https://company-lead-form.vercel.app",
    githubUrl: "https://github.com/coderbit96/Company-Lead-Form",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Company-Lead-Form",
    icon: FaWpforms
  },
  {
    id: "education-site",
    slug: "education-site",
    title: "Education Website",
    shortDescription: "A structured education website concept with clear navigation and content hierarchy.",
    description: "A structured education website concept with clear navigation, content hierarchy, and trustworthy visual tone.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["ReactJS", "Tailwind CSS", "Content UX", "HTML"],
    features: ["Clear navigation", "Content hierarchy"],
    liveUrl: "https://education-site-azure.vercel.app",
    githubUrl: "https://github.com/coderbit96/Education-site",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Education-site",
    icon: FaGraduationCap
  },
  {
    id: "classic-portfolio",
    slug: "classic-portfolio",
    title: "Classic Portfolio",
    shortDescription: "A lightweight personal portfolio built with core web technologies.",
    description: "A lightweight personal portfolio built with core web technologies to present skills, work, and contact information.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: ["Skills presentation", "Work presentation", "Contact information"],
    liveUrl: "https://portfolio-one-plum-34.vercel.app",
    githubUrl: "https://github.com/coderbit96/Portfolio",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Portfolio",
    icon: FaCode
  },
  {
    id: "game1",
    slug: "game1",
    title: "Rock Paper Scissors",
    shortDescription: "A compact interactive rock-paper-scissors game with instant results and score-based gameplay.",
    description: "A compact interactive rock-paper-scissors game with visual choices, instant results, and score-based gameplay.",
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    features: ["Visual choices", "Instant results", "Score-based gameplay"],
    liveUrl: "https://game1-rosy-chi.vercel.app",
    githubUrl: "https://github.com/coderbit96/Game1",
    featured: false,
    year: "2026",
    status: "Live",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: "Game1",
    icon: FaGamepad
  }
];

// Fallback snapshot used for the first paint (and if the live GitHub fetch
// fails). Projects.tsx replaces this with the live starred list from
// /api/github-stars once it loads, so starring/unstarring on GitHub is
// reflected here automatically without editing this file.
export const starredGithubRepositories = [
  { fullName: "coderbit96/ShowTime", repositoryName: "ShowTime", stars: 1 },
  { fullName: "coderbit96/Ecommerce", repositoryName: "Ecommerce", stars: 1 },
  { fullName: "coderbit96/Student-Management-System", repositoryName: "Student-Management-System", stars: 1 },
  { fullName: "coderbit96/Employee-Management", repositoryName: "Employee-Management", stars: 1 },
  { fullName: "coderbit96/RASOIGO", repositoryName: "RASOIGO", stars: 1 },
  { fullName: "coderbit96/coderbit96", repositoryName: "coderbit96", stars: 1 }
] as const;

export const featuredProjects = projects.filter((project) => project.featured);
export const starredProjects = starredGithubRepositories
  .map((repo) =>
    projects.find((project) => project.repositoryName.toLowerCase() === repo.repositoryName.toLowerCase())
  )
  .filter((project): project is Project => Boolean(project));

export interface LiveStarredRepo {
  name: string;
  fullName: string;
  description: string | null;
  homepage: string | null;
  githubUrl: string;
  language: string | null;
  stars: number;
}

/** Builds a fallback card for a starred repo that has no hand-authored entry above. */
function buildFallbackProject(repo: LiveStarredRepo): Project {
  return {
    id: repo.name.toLowerCase(),
    slug: repo.name.toLowerCase(),
    title: repo.name,
    shortDescription: repo.description ?? `A starred public repository from ${repo.fullName}.`,
    description: repo.description ?? `A starred public repository from ${repo.fullName}.`,
    thumbnail: "",
    images: [],
    category: "Other",
    technologies: repo.language ? [repo.language] : [],
    features: [],
    liveUrl: repo.homepage ?? "",
    githubUrl: repo.githubUrl,
    featured: false,
    year: String(new Date().getFullYear()),
    status: repo.homepage ? "Live" : "Repository only",
    problem: "",
    solution: "",
    challenges: [],
    repositoryName: repo.name,
    icon: FaGithub
  };
}

/** Merges live GitHub-starred repos with hand-authored project data, keeping GitHub as the source of truth for which repos appear. */
export function mergeStarredProjects(liveRepos: LiveStarredRepo[]): Project[] {
  return liveRepos.map((repo) => {
    const knownProject = projects.find(
      (project) => project.repositoryName.toLowerCase() === repo.name.toLowerCase()
    );

    return knownProject ?? buildFallbackProject(repo);
  });
}
