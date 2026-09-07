"use client";

import { useEffect, useRef } from "react";

interface SkillsWebGLBackgroundProps {
  reducedMotion: boolean;
}

interface ParticleLayer {
  geometry: import("three").BufferGeometry;
  material: import("three").PointsMaterial;
  positions: Float32Array;
  speeds: Float32Array;
}

/** WebGL adaptation of Three's layered sprite field, tuned for the skills section. */
export default function SkillsWebGLBackground({ reducedMotion }: SkillsWebGLBackgroundProps) {
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

      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const spriteContext = spriteCanvas.getContext("2d");
      if (!spriteContext) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      spriteContext.translate(32, 32);
      spriteContext.rotate(Math.PI / 4);
      const spriteGradient = spriteContext.createRadialGradient(0, 0, 0, 0, 0, 28);
      spriteGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      spriteGradient.addColorStop(0.28, "rgba(255, 255, 255, 0.9)");
      spriteGradient.addColorStop(0.62, "rgba(255, 255, 255, 0.24)");
      spriteGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      spriteContext.fillStyle = spriteGradient;
      spriteContext.fillRect(-23, -23, 46, 46);
      const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

      const particlesPerLayer = window.innerWidth < 640 ? 110 : 260;
      const layerSettings = [
        { color: 0x22d3ee, size: 0.155, opacity: 0.58, depth: 2 },
        { color: 0x3b82f6, size: 0.13, opacity: 0.46, depth: 0 },
        { color: 0x8b5cf6, size: 0.11, opacity: 0.38, depth: -2 }
      ];

      const layers: ParticleLayer[] = layerSettings.map((setting, layerIndex) => {
        const positions = new Float32Array(particlesPerLayer * 3);
        const speeds = new Float32Array(particlesPerLayer);

        for (let index = 0; index < particlesPerLayer; index += 1) {
          const offset = index * 3;
          positions[offset] = Math.random() * 16 - 8;
          positions[offset + 1] = Math.random() * 12 - 6;
          positions[offset + 2] = setting.depth + (Math.random() - 0.5) * 1.5;
          speeds[index] = 0.12 + Math.random() * 0.22 + layerIndex * 0.035;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
          color: setting.color,
          map: spriteTexture,
          size: setting.size,
          sizeAttenuation: true,
          transparent: true,
          opacity: setting.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const particles = new THREE.Points(geometry, material);
        particles.layers.set(layerIndex);
        scene.add(particles);

        return { geometry, material, positions, speeds };
      });

      camera.layers.enable(0);
      camera.layers.enable(1);
      camera.layers.enable(2);

      const motion = { drift: 1, opacity: 0.72 };
      const timeline = gsap.timeline({ repeat: -1, yoyo: true })
        .to(motion, { drift: 1.16, opacity: 0.96, duration: 10, ease: "sine.inOut" })
        .to(motion, { drift: 0.88, opacity: 0.62, duration: 12, ease: "sine.inOut" });

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

      let previousTime = performance.now();
      const render = () => {
        if (!active) return;

        const currentTime = performance.now();
        const delta = Math.min((currentTime - previousTime) / 1000, 0.05);
        previousTime = currentTime;

        layers.forEach((layer, layerIndex) => {
          const attribute = layer.geometry.attributes.position;
          const layerSpeed = (0.62 + layerIndex * 0.18) * motion.drift;

          for (let index = 0; index < particlesPerLayer; index += 1) {
            const offset = index * 3;
            layer.positions[offset] += delta * layer.speeds[index] * layerSpeed;
            layer.positions[offset + 1] -= delta * layer.speeds[index] * 0.32;

            if (layer.positions[offset] > 8.5) {
              layer.positions[offset] = -8.5;
              layer.positions[offset + 1] = Math.random() * 12 - 6;
            }
          }

          layer.material.opacity = (0.42 + layerIndex * 0.07) * motion.opacity;
          attribute.needsUpdate = true;
        });

        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
        timeline.kill();
        renderer.setAnimationLoop(null);
        layers.forEach((layer) => {
          layer.geometry.dispose();
          layer.material.dispose();
        });
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

  return <div ref={containerRef} className="skills-webgl-background" aria-hidden="true" />;
}
