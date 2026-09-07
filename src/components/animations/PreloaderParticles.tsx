"use client";

import { useEffect, useRef } from "react";

interface PreloaderParticlesProps {
  progress: number;
  visible: boolean;
}

/** WebGL particles drift in early, then gather around the loader near completion. */
export default function PreloaderParticles({ progress, visible }: PreloaderParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(progress);
  const visibleRef = useRef(visible);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let cleanup = () => undefined;

    const initialize = async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const particleCount = 280;
      const positions = new Float32Array(particleCount * 3);
      const origins = new Float32Array(particleCount * 3);
      const targets = new Float32Array(particleCount * 3);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        const angle = Math.random() * Math.PI * 2;
        const ringRadius = 0.88 + Math.random() * 0.38;

        origins[offset] = (Math.random() - 0.5) * 5.8;
        origins[offset + 1] = (Math.random() - 0.5) * 3.2;
        origins[offset + 2] = (Math.random() - 0.5) * 0.6;
        positions[offset] = origins[offset];
        positions[offset + 1] = origins[offset + 1];
        positions[offset + 2] = origins[offset + 2];
        targets[offset] = Math.cos(angle) * ringRadius;
        targets[offset + 1] = Math.sin(angle) * ringRadius;
        targets[offset + 2] = (Math.random() - 0.5) * 0.18;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.046,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const render = () => {
        const currentProgress = progressRef.current;
        const active = currentProgress >= 12;
        const gathering = currentProgress >= 80;
        const time = performance.now() * 0.0005;

        material.opacity += ((active && visibleRef.current ? (gathering ? 1 : 0.62) : 0) - material.opacity) * 0.16;

        for (let index = 0; index < particleCount; index += 1) {
          const offset = index * 3;
          const driftX = origins[offset] + Math.sin(time + index * 0.47) * 0.12;
          const driftY = origins[offset + 1] + Math.cos(time * 1.2 + index * 0.31) * 0.12;
          const destinationX = gathering ? targets[offset] : driftX;
          const destinationY = gathering ? targets[offset + 1] : driftY;
          const destinationZ = gathering ? targets[offset + 2] : origins[offset + 2];
          const attraction = gathering ? 0.065 : 0.018;

          positions[offset] += (destinationX - positions[offset]) * attraction;
          positions[offset + 1] += (destinationY - positions[offset + 1]) * attraction;
          positions[offset + 2] += (destinationZ - positions[offset + 2]) * attraction;
        }

        particles.rotation.z += gathering ? 0.006 : 0.001;
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);
      cleanup = () => {
        window.removeEventListener("resize", resize);
        renderer.setAnimationLoop(null);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void initialize();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="premium-loader__particles" aria-hidden="true" />;
}
