import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import AuroraBackground from "@/components/animations/AuroraBackground";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/data/projects";
import { createProjectJsonLd, serializeJsonLd } from "@/lib/structuredData";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const title = `${project.title} Project`;
  const description = `${project.description} Built by Joydip Ghosh, AI Full Stack Developer and Website Developer in Kolkata.`;
  const image = project.thumbnail || "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} | Joydip Ghosh`,
      description,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [{ url: image, alt: `${project.title} project by Joydip Ghosh` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Joydip Ghosh`,
      description,
      images: [{ url: image, alt: `${project.title} project by Joydip Ghosh` }]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const projectJsonLd = createProjectJsonLd(project);
  const implementationSummary = project.solution || project.problem;
  const projectFeatures = project.features.length
    ? project.features
    : [
        `Responsive ${project.category.toLowerCase()} interface`,
        `Implementation using ${project.technologies.join(", ") || "web technologies"}`,
        project.liveUrl ? "Live deployment available for review" : "Source code available for review"
      ];

  return (
    <>
      <Script
        id={`project-json-ld-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
      />
      <AuroraBackground />
      <ScrollProgressBar />
      <main className="project-detail-page relative z-10">
        <article className="section-shell">
          <nav aria-label="Breadcrumb" className="project-detail-page__breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <Link href="/#projects" className="case-study-back-link">
            <FaArrowLeft aria-hidden="true" />
            Back to Projects
          </Link>

          <header className="project-detail-page__header">
            <div>
              <p className="case-study-kicker">{project.category} Project</p>
              <h1>{project.title}</h1>
              <p>
                {project.shortDescription} Created by Joydip Ghosh, an AI Full Stack Developer and Website Developer based in Kolkata, India.
              </p>
            </div>
            <div className="project-detail-page__actions">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link" data-cursor="link">
                <FaGithub aria-hidden="true" />
                View Source
              </a>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link project-link--primary" data-cursor="link">
                  Live Project
                  <FaExternalLinkAlt aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </header>

          {project.thumbnail ? (
            <figure className="project-detail-page__image">
              <Image
                src={project.thumbnail}
                alt={`${project.title} website project preview by Joydip Ghosh`}
                width={1200}
                height={675}
                sizes="(min-width: 1024px) 70rem, 100vw"
                priority
              />
            </figure>
          ) : null}

          <div className="project-detail-page__grid">
            <section className="project-detail-page__panel" aria-labelledby="project-overview">
              <h2 id="project-overview">Project Overview</h2>
              <p>{project.description}</p>
              {implementationSummary ? <p>{implementationSummary}</p> : null}
            </section>

            <section className="project-detail-page__panel" aria-labelledby="project-technologies">
              <h2 id="project-technologies">Technologies Used</h2>
              <div className="project-tech-list">
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </section>

            <section className="project-detail-page__panel" aria-labelledby="project-features">
              <h2 id="project-features">Key Features and Outcome</h2>
              <ul>
                {projectFeatures.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>

            <section className="project-detail-page__panel" aria-labelledby="project-role">
              <h2 id="project-role">Joydip&apos;s Role</h2>
              <p>
                Joydip Ghosh designed and developed this {project.category.toLowerCase()} project, focusing on a clear user experience, responsive implementation, and maintainable web technology choices.
              </p>
            </section>
          </div>

          <aside className="project-detail-page__next" aria-label="Continue exploring">
            <div>
              <p className="case-study-kicker">Explore More</p>
              <h2>Looking for an AI Full Stack Developer or Website Developer?</h2>
              <p>Explore Joydip&apos;s skills, other projects, and contact options for freelance or full-time opportunities.</p>
            </div>
            <div className="project-detail-page__actions">
              <Link href="/#skills" className="project-link">View Skills <FaArrowRight aria-hidden="true" /></Link>
              <Link href="/#contact" className="project-link project-link--primary">Contact Joydip <FaArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
