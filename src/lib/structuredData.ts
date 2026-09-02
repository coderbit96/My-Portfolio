import type { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function createProjectJsonLd(project: Project) {
  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;
  const image = project.thumbnail ? `${siteConfig.url}${project.thumbnail}` : `${siteConfig.url}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/#projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: projectUrl }
        ]
      },
      {
        "@type": ["CreativeWork", "SoftwareSourceCode"],
        "@id": `${projectUrl}#project`,
        name: project.title,
        url: projectUrl,
        description: project.description,
        image,
        dateCreated: project.year,
        author: { "@id": `${siteConfig.url}/#person` },
        creator: { "@id": `${siteConfig.url}/#person` },
        codeRepository: project.githubUrl,
        programmingLanguage: project.technologies,
        keywords: project.technologies.join(", "),
        mainEntityOfPage: projectUrl,
        isBasedOn: project.githubUrl,
        sameAs: project.liveUrl || undefined
      }
    ]
  };
}
