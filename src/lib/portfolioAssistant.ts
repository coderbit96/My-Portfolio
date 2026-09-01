import { contactEmail, contactLocation } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups, skills } from "@/data/skills";
import { socials } from "@/data/socials";

const supportedTopicPattern = /\b(joydip|skill|technology|tech|experience|project|portfolio|contact|email|mern|react|next(?:\.js)?|node(?:\.js)?|express|mongo(?:db)?|backend|frontend|wordpress|seo)\b/i;

export function isPortfolioAssistantQuestion(message: string) {
  return supportedTopicPattern.test(message);
}

export const portfolioKnowledge = [
  "Joydip Ghosh portfolio knowledge base. Use only these facts; do not infer missing experience.",
  `Contact: email ${contactEmail}; location ${contactLocation}; socials ${socials.map((social) => `${social.label}: ${social.href}`).join(" | ")}.`,
  `Skill groups: ${skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`).join(" | ")}.`,
  `Detailed skills: ${skills.map((skill) => `${skill.name} (${skill.category}${skill.context ? ` — ${skill.context}` : ""})`).join(" | ")}.`,
  `Experience: ${experience.map((item) => `${item.role} at ${item.company} (${item.period}). ${item.description} Responsibilities: ${item.responsibilities.join("; ")}`).join(" | ")}.`,
  `Projects: ${projects.map((project) => `${project.title} [${project.category}, ${project.year}, ${project.status}] Technologies: ${project.technologies.join(", ")}. ${project.shortDescription} GitHub: ${project.githubUrl}${project.liveUrl ? ` Live: ${project.liveUrl}` : ""}`).join(" | ")}.`
].join("\n");

function projectList(projectFilter: (_project: (typeof projects)[number]) => boolean) {
  const matchedProjects = projects.filter(projectFilter);

  return matchedProjects.length
    ? matchedProjects.map((project) => `${project.title} (${project.technologies.join(", ")})`).join(", ")
    : "No matching project is listed in the current portfolio data.";
}

export function getDemoPortfolioAnswer(message: string) {
  const question = message.toLowerCase();

  if (!isPortfolioAssistantQuestion(message)) {
    return "I can help with Joydip’s skills, experience, projects, technology, portfolio, or contact details.";
  }

  if (/contact|email|reach|hire|linkedin|github/.test(question)) {
    return `You can contact Joydip at ${contactEmail}. Joydip is based in ${contactLocation}. The portfolio also links to GitHub, LinkedIn, Facebook, and Instagram.`;
  }

  if (/mern/.test(question)) {
    return `The portfolio lists these MERN-related projects: ${projectList((project) => project.technologies.some((technology) => technology.toLowerCase().includes("mern")))}.`;
  }

  if (/next/.test(question)) {
    const nextExperience = experience
      .filter((item) => /react|typescript|full-stack/i.test(`${item.description} ${item.responsibilities.join(" ")}`))
      .map((item) => `${item.role} at ${item.company} (${item.period})`)
      .join("; ");

    return `Next.js is listed in Joydip’s skills under Programming and as an App Router foundation. The portfolio does not claim a separate Next.js job title; related practical experience is listed as ${nextExperience}.`;
  }

  if (/backend|node|express|mongo|api|database/.test(question)) {
    return "Joydip’s listed backend technologies include Node.js, Express.js, REST APIs, JWT, MongoDB, Mongoose, Firebase, Firestore, SQL, PHP, and Laravel. The experience data describes practical full-stack features and connecting frontend flows with backend services.";
  }

  if (/experience|work|job|intern/.test(question)) {
    return experience
      .map((item) => `${item.role} at ${item.company} (${item.period}): ${item.description}`)
      .join(" ");
  }

  if (/project|portfolio|show|work/.test(question)) {
    return `The portfolio currently lists ${projects.length} projects. Featured examples include ${projects.filter((project) => project.featured).slice(0, 5).map((project) => project.title).join(", ")}. Ask about a project or technology for a more specific answer.`;
  }

  if (/skill|technology|tech|frontend|react|wordpress|seo/.test(question)) {
    return `Joydip’s portfolio lists: ${skillGroups.map((group) => `${group.title} (${group.skills.join(", ")})`).join("; ")}.`;
  }

  return "I can help with Joydip’s skills, experience, projects, technology, portfolio, or contact details. Try asking about backend technologies, MERN projects, Next.js experience, or contact details.";
}
