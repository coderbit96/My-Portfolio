"use client";

import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import {
  mergeStarredProjects,
  starredProjects as fallbackStarredProjects,
  type LiveStarredRepo,
  type Project
} from "@/data/projects";
import useReducedMotion from "@/hooks/useReducedMotion";

const fadeUp = revealItem();

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
  const shellControls = useAnimationControls();
  const rotationY = useMotionValue(0);
  const contentRotationY = useTransform(rotationY, (latestRotation) => -latestRotation);
  const isRotatingRef = useRef(false);
  const rotationAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const Icon = project.icon;
  const projectNumber = String(index + 1).padStart(2, "0");

  useEffect(() => {
    onRegisterController(project.id, {
      stop: () => {
        rotationAnimationRef.current?.stop();
        shellControls.stop();
        rotationY.set(0);
        shellControls.set({ scale: 1, y: 0, rotateZ: 0 });
        isRotatingRef.current = false;
      }
    });

    return () => {
      onRegisterController(project.id, null);
    };
  }, [shellControls, onRegisterController, project.id, rotationY]);

  const handleHoverStart = async () => {
    if (shouldReduceMotion || isRotatingRef.current || !onRotationStart(project.id)) {
      return;
    }

    isRotatingRef.current = true;

    try {
      shellControls.set({ scale: 1, y: 0, rotateZ: 0 });
      rotationY.set(0);

      const rotationAnimation = animate(rotationY, [0, -180, -360], {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.55, 1]
      });

      rotationAnimationRef.current = rotationAnimation;

      await Promise.all([
        rotationAnimation,
        shellControls.start({
          scale: [1, 0.985, 1],
          y: [0, -6, 0],
          rotateZ: [0, -0.45, 0],
          transition: {
            duration: 0.48,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.55, 1]
          }
        })
      ]);

      rotationY.set(0);
      shellControls.set({ scale: 1, y: 0, rotateZ: 0 });
    } finally {
      rotationAnimationRef.current = null;
      isRotatingRef.current = false;
      onRotationEnd(project.id);
    }
  };

  return (
    <motion.article
      className="project-secondary-card-shell"
      initial={false}
      animate={shellControls}
      onHoverStart={handleHoverStart}
    >
      <motion.div
        className="card-v2 project-secondary-card project-secondary-card--starred"
        style={{ rotateY: rotationY }}
      >
        <motion.div
          className="project-secondary-card__content"
          style={{ rotateY: contentRotationY }}
        >
          <div className="relative flex items-start justify-center">
            <div className="project-secondary-card__icon">
              <Icon aria-hidden="true" />
            </div>

            <div className="absolute right-0 top-0 flex flex-col items-end gap-2">
              <span className="project-secondary-card__number">{projectNumber}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="font-display text-2xl font-black leading-tight tracking-[-0.04em] text-white">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {project.shortDescription}
            </p>
          </div>

          <div className="project-tech-list mt-5 justify-center">
            {project.technologies.slice(0, 5).map((technology) => (
              <span key={technology} className="project-secondary-card__tech">
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
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
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const rotationLockRef = useRef<string | null>(null);
  const rotationControllersRef = useRef(new Map<string, ProjectRotationController>());
  const [starredProjects, setStarredProjects] = useState<Project[]>(fallbackStarredProjects);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-stars")
      .then((response) => response.json())
      .then((data: { repositories: LiveStarredRepo[] }) => {
        if (cancelled || !data.repositories?.length) return;
        setStarredProjects(mergeStarredProjects(data.repositories));
      })
      .catch(() => {
        // Keep the static fallback list if the live fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

        <div id="projects-panel" className="mx-auto mt-10 max-w-4xl">
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
