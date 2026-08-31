import { FaDownload, FaEnvelope, FaGithub, FaLinkedinIn, FaSitemap } from "react-icons/fa";
import type { IconType } from "react-icons";
import { navbarItems } from "@/data/navigation";
import { socials } from "@/data/socials";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: IconType;
  keywords?: string[];
  href: string;
  external?: boolean;
  download?: string;
}

const socialByLabel = (label: string) => socials.find((social) => social.label === label);

const navByLabel = (label: string) => navbarItems.find((item) => item.label === label);

const resumeHref = publicAssetUrl("resume/Joydip-Ghosh-Resume.pdf");

const githubSocial = socialByLabel("GitHub");
const linkedinSocial = socialByLabel("LinkedIn");

/**
 * Command palette entries, built from the same nav/social/asset data the
 * rest of the site already uses instead of duplicating labels and hrefs.
 */
export const commandItems: CommandItem[] = [
  {
    id: "about",
    label: "About Me",
    description: "Background and focus areas",
    icon: FaSitemap,
    keywords: ["bio", "profile", "who"],
    href: navByLabel("About")?.href ?? "#about"
  },
  {
    id: "skills",
    label: "Skills",
    description: "Tools and technologies",
    icon: FaSitemap,
    keywords: ["tech stack", "tools", "languages"],
    href: navByLabel("Skills")?.href ?? "#skills"
  },
  {
    id: "projects",
    label: "Projects",
    description: "Portfolio and starred GitHub repositories",
    icon: FaGithub,
    keywords: ["work", "github", "repositories", "starred"],
    href: navByLabel("Projects")?.href ?? "#projects"
  },
  {
    id: "experience",
    label: "Experience",
    description: "Roles and internship timeline",
    icon: FaSitemap,
    keywords: ["work history", "resume", "career"],
    href: navByLabel("Experience")?.href ?? "#experience"
  },
  {
    id: "resume",
    label: "Download Resume",
    description: "PDF resume download",
    icon: FaDownload,
    keywords: ["cv", "pdf"],
    href: resumeHref,
    download: "Joydip-Ghosh-Resume.pdf"
  },
  {
    id: "github",
    label: "GitHub",
    description: githubSocial?.href.replace("https://", ""),
    icon: FaGithub,
    keywords: ["repositories", "code", "source"],
    href: githubSocial?.href ?? "https://github.com/coderbit96",
    external: true
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional profile",
    icon: FaLinkedinIn,
    keywords: ["career", "network"],
    href: linkedinSocial?.href ?? "https://www.linkedin.com",
    external: true
  },
  {
    id: "contact",
    label: "Contact Me",
    description: "Get in touch",
    icon: FaEnvelope,
    keywords: ["email", "message", "hire"],
    href: navByLabel("Contact")?.href ?? "#contact"
  }
];
