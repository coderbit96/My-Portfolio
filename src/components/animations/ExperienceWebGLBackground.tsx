"use client";

import { useEffect, useRef } from "react";

interface ExperienceWebGLBackgroundProps {
  reducedMotion: boolean;
}

/**
 * WebGL-compatible adaptation of Three's instanced sprite example.
 * PointsMaterial renders thousands of billboarded sprite particles in one draw call.
 */
export default function ExperienceWebGLBackground({ reducedMotion }: ExperienceWebGLBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let cleanup = () => undefined;

    const initialize = async () => {
      const [THREE, gsapModule] = await Promise.all([import("three"), import("gsap")]);
      if (disposed || !containerRef.current) return;

      const { gsap } = gsapModule;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const particleCount = window.innerWidth < 640 ? 300 : 720;
      const positions = new Float32Array(particleCount * 3);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        positions[offset] = (Math.random() - 0.5) * 14;
        positions[offset + 1] = (Math.random() - 0.5) * 9;
        positions[offset + 2] = (Math.random() - 0.5) * 7;
      }

      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const spriteContext = spriteCanvas.getContext("2d");
      if (!spriteContext) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      const gradient = spriteContext.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.18, "rgba(186, 230, 253, 0.95)");
      gradient.addColorStop(0.48, "rgba(34, 211, 238, 0.36)");
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
      spriteContext.fillStyle = gradient;
      spriteContext.fillRect(0, 0, 64, 64);

      const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x22d3ee,
        map: spriteTexture,
        size: 0.115,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      const motion = { rotation: -0.035, spread: 1, opacity: 0.68, hue: 0.53 };
      const timeline = gsap.timeline({ repeat: -1, yoyo: true })
        .to(motion, { rotation: 0.045, spread: 1.04, opacity: 0.88, hue: 0.57, duration: 12, ease: "sine.inOut" })
        .to(motion, { rotation: -0.04, spread: 0.98, opacity: 0.58, hue: 0.61, duration: 13, ease: "sine.inOut" });

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      let active = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          active = entry.isIntersecting;
          if (active) timeline.play();
          else timeline.pause();
        },
        { threshold: 0.02 }
      );
      observer.observe(container);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const render = () => {
        if (!active) return;

        const time = performance.now() * 0.00016;
        particles.rotation.z += (motion.rotation - particles.rotation.z) * 0.006;
        particles.rotation.y = Math.sin(time) * 0.035;
        particles.scale.setScalar(motion.spread);
        particlesMaterial.opacity = motion.opacity * 0.55;
        particlesMaterial.color.setHSL(motion.hue, 0.78, 0.68);
        camera.position.x += (pointer.x - camera.position.x) * 0.025;
        camera.position.y += (-pointer.y - camera.position.y) * 0.025;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        timeline.kill();
        renderer.setAnimationLoop(null);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        spriteTexture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void initialize();
    return () => {
      disposed = true;
      cleanup();
    };
  }, [reducedMotion]);

  return <div ref={containerRef} className="experience-webgl-background" aria-hidden="true" />;
}
