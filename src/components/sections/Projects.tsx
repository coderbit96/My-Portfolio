"use client";

import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import NeonWaveBackground from "@/components/animations/NeonWaveBackground";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import {
  starredGithubRepositories,
  starredProjects,
  type Project
} from "@/data/projects";
import useReducedMotion from "@/hooks/useReducedMotion";

const fadeUp = revealItem();

const getStarredRepo = (project: Project) =>
  starredGithubRepositories.find(
    (repo) => repo.repositoryName.toLowerCase() === project.repositoryName.toLowerCase()
  );

type ProjectRotationController = {
  stop: () => void;
};

interface StarredProjectCardProps {
  project: Project;
  index: number;
  onRotationStart: (_projectId: string) => boolean;
  onRotationEnd: (_projectId: string) => void;
  onRegisterController: (
    _projectId: string,
    _controller: ProjectRotationController | null
  ) => void;
  shouldReduceMotion: boolean;
}

function StarredProjectCard({
  project,
  index,
  onRotationStart,
  onRotationEnd,
  onRegisterController,
  shouldReduceMotion
}: StarredProjectCardProps) {
  const controls = useAnimationControls();
  const rotationY = useMotionValue(0);
  const contentRotationY = useTransform(rotationY, (latestRotation) => -latestRotation);
  const isRotatingRef = useRef(false);
  const rotationAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const Icon = project.icon;
  const starredRepo = getStarredRepo(project);
  const projectNumber = String(index + 1).padStart(2, "0");
  const starCount = starredRepo?.stars ?? 1;

  useEffect(() => {
    onRegisterController(project.id, {
      stop: () => {
        rotationAnimationRef.current?.stop();
        controls.stop();
        rotationY.set(0);
        controls.set({ scale: 1, y: 0 });
        isRotatingRef.current = false;
      }
    });

    return () => {
      onRegisterController(project.id, null);
    };
  }, [controls, onRegisterController, project.id, rotationY]);

  const handleHoverStart = async () => {
    if (shouldReduceMotion || isRotatingRef.current || !onRotationStart(project.id)) {
      return;
    }

    isRotatingRef.current = true;

    try {
      controls.set({ scale: 1, y: 0 });
      rotationY.set(0);

      const rotationAnimation = animate(rotationY, [0, -180, -360], {
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.55, 1]
      });

      rotationAnimationRef.current = rotationAnimation;

      await Promise.all([
        rotationAnimation,
        controls.start({
          scale: [1, 0.985, 1],
          y: [0, -6, 0],
          transition: {
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.55, 1]
          }
        })
      ]);

      rotationY.set(0);
      controls.set({ scale: 1, y: 0 });
    } finally {
      rotationAnimationRef.current = null;
      isRotatingRef.current = false;
      onRotationEnd(project.id);
    }
  };

  return (
    <motion.article
      className="card-v2 project-secondary-card project-secondary-card--starred"
      initial={false}
      animate={controls}
      onHoverStart={handleHoverStart}
      style={{ rotateY: rotationY, transformPerspective: 1400 }}
    >
      <motion.div
        className="project-secondary-card__content"
        style={{ rotateY: contentRotationY, transformPerspective: 1400 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="project-secondary-card__icon">
            <Icon aria-hidden="true" />
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="project-secondary-card__number">{projectNumber}</span>
            <span className="project-secondary-card__starred">
              <FaStar aria-hidden="true" />
              {starCount} {starCount === 1 ? "Star" : "Stars"}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="project-secondary-card__meta">
            {starredRepo?.fullName ?? project.repositoryName} · {project.year} · {project.status}
          </p>
          <h3 className="mt-3 font-display text-2xl font-black leading-tight tracking-[-0.04em] text-white">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {project.shortDescription}
          </p>
        </div>

        <div className="project-tech-list mt-5">
          {project.technologies.slice(0, 5).map((technology) => (
            <span key={technology} className="project-secondary-card__tech">
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-secondary-card__link"
            aria-label={`Open ${project.title} GitHub repository`}
            data-cursor="link"
          >
            <FaGithub aria-hidden="true" />
            GitHub
            <FaExternalLinkAlt className="project-link__arrow text-[0.68rem]" aria-hidden="true" />
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-secondary-card__link"
              aria-label={`Open ${project.title} live demo`}
              data-cursor="link"
            >
              Live Demo
              <FaExternalLinkAlt className="project-link__arrow text-[0.68rem]" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const rotationLockRef = useRef<string | null>(null);
  const rotationControllersRef = useRef(new Map<string, ProjectRotationController>());

  const handleRotationStart = (projectId: string) => {
    const activeProjectId = rotationLockRef.current;

    if (activeProjectId && activeProjectId !== projectId) {
      rotationControllersRef.current.get(activeProjectId)?.stop();
    }

    rotationLockRef.current = projectId;
    return true;
  };

  const handleRotationEnd = (projectId: string) => {
    if (rotationLockRef.current === projectId) {
      rotationLockRef.current = null;
    }
  };

  const handleRegisterController = (
    projectId: string,
    controller: ProjectRotationController | null
  ) => {
    if (controller) {
      rotationControllersRef.current.set(projectId, controller);
      return;
    }

    rotationControllersRef.current.delete(projectId);
  };

  return (
    <section className="projects-showcase-section relative overflow-hidden">
      <NeonWaveBackground />

      <div className="section-shell relative z-10">
        <Reveal stagger amount={0.2} className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge>Projects</Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-[clamp(2.15rem,7vw,4.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-white"
          >
            <GradientText>Selected Work</GradientText>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Starred GitHub repositories from{" "}
            <a
              href="https://github.com/coderbit96"
              target="_blank"
              rel="noreferrer"
              className="font-extrabold text-white underline decoration-brandBlue/60 underline-offset-4 transition hover:text-accentCyan"
              data-cursor="link"
            >
              coderbit96
            </a>
            . Only starred repositories are shown here.
          </motion.p>
        </Reveal>

        <div id="projects-panel" className="mt-10">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="-m-3 grid gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {starredProjects.map((project, index) => (
              <StarredProjectCard
                key={project.id}
                project={project}
                index={index}
                onRotationStart={handleRotationStart}
                onRotationEnd={handleRotationEnd}
                onRegisterController={handleRegisterController}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
