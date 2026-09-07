"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

/** WebGL-compatible linked-particle VFX, adapted from the WebGPU/TSL example. */
export default function AboutLinkedParticlesBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let cleanup = () => undefined;

    const initialize = async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const particleCount = window.innerWidth < 640 ? 58 : 120;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const seeds = new Float32Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        positions[offset] = (Math.random() - 0.5) * 15;
        positions[offset + 1] = (Math.random() - 0.5) * 9;
        positions[offset + 2] = (Math.random() - 0.5) * 1.8;
        velocities[offset] = (Math.random() - 0.5) * 0.09;
        velocities[offset + 1] = (Math.random() - 0.5) * 0.09;
        seeds[index] = Math.random() * Math.PI * 2;

        const color = new THREE.Color().setHSL(0.48 + Math.random() * 0.28, 0.9, 0.57 + Math.random() * 0.16);
        colors[offset] = color.r;
        colors[offset + 1] = color.g;
        colors[offset + 2] = color.b;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(positions, 3);
      particlesGeometry.setAttribute("position", positionAttribute);
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.065,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      scene.add(new THREE.Points(particlesGeometry, particlesMaterial));

      const maximumLinks = particleCount * 2;
      const linkPositions = new Float32Array(maximumLinks * 2 * 3);
      const linkColors = new Float32Array(maximumLinks * 2 * 3);
      const linksGeometry = new THREE.BufferGeometry();
      const linkPositionAttribute = new THREE.BufferAttribute(linkPositions, 3);
      const linkColorAttribute = new THREE.BufferAttribute(linkColors, 3);
      linksGeometry.setAttribute("position", linkPositionAttribute);
      linksGeometry.setAttribute("color", linkColorAttribute);
      linksGeometry.setDrawRange(0, 0);
      const linksMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      scene.add(new THREE.LineSegments(linksGeometry, linksMaterial));

      const cursorPositions = new Float32Array([0, 0, 0]);
      const cursorGeometry = new THREE.BufferGeometry();
      const cursorAttribute = new THREE.BufferAttribute(cursorPositions, 3);
      cursorGeometry.setAttribute("position", cursorAttribute);
      const cursorMaterial = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.19,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      scene.add(new THREE.Points(cursorGeometry, cursorMaterial));

      const pointer = { x: 0, y: 0, active: false };
      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        pointer.active = isInside;
        if (!isInside) return;
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 15;
        pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 9;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      let active = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          active = entry.isIntersecting;
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
        const time = currentTime * 0.001;

        for (let index = 0; index < particleCount; index += 1) {
          const offset = index * 3;
          velocities[offset] += Math.sin(time * 0.7 + seeds[index]) * delta * 0.022;
          velocities[offset + 1] += Math.cos(time * 0.53 + seeds[index] * 1.8) * delta * 0.022;

          if (pointer.active) {
            const dx = pointer.x - positions[offset];
            const dy = pointer.y - positions[offset + 1];
            const distanceSquared = dx * dx + dy * dy;
            if (distanceSquared < 5.5) {
              velocities[offset] += dx * delta * 0.008;
              velocities[offset + 1] += dy * delta * 0.008;
            }
          }

          velocities[offset] *= 0.988;
          velocities[offset + 1] *= 0.988;
          positions[offset] += velocities[offset] * delta * 8;
          positions[offset + 1] += velocities[offset + 1] * delta * 8;

          if (positions[offset] > 7.8) positions[offset] = -7.8;
          if (positions[offset] < -7.8) positions[offset] = 7.8;
          if (positions[offset + 1] > 4.8) positions[offset + 1] = -4.8;
          if (positions[offset + 1] < -4.8) positions[offset + 1] = 4.8;
        }

        let linkCount = 0;
        const maximumDistanceSquared = 0.72;
        for (let index = 0; index < particleCount && linkCount < maximumLinks; index += 1) {
          const offset = index * 3;
          for (let candidate = index + 1; candidate < particleCount && linkCount < maximumLinks; candidate += 1) {
            const candidateOffset = candidate * 3;
            const dx = positions[offset] - positions[candidateOffset];
            const dy = positions[offset + 1] - positions[candidateOffset + 1];
            if (dx * dx + dy * dy > maximumDistanceSquared) continue;

            const linkOffset = linkCount * 6;
            linkPositions[linkOffset] = positions[offset];
            linkPositions[linkOffset + 1] = positions[offset + 1];
            linkPositions[linkOffset + 2] = positions[offset + 2];
            linkPositions[linkOffset + 3] = positions[candidateOffset];
            linkPositions[linkOffset + 4] = positions[candidateOffset + 1];
            linkPositions[linkOffset + 5] = positions[candidateOffset + 2];
            linkColors[linkOffset] = colors[offset];
            linkColors[linkOffset + 1] = colors[offset + 1];
            linkColors[linkOffset + 2] = colors[offset + 2];
            linkColors[linkOffset + 3] = colors[candidateOffset];
            linkColors[linkOffset + 4] = colors[candidateOffset + 1];
            linkColors[linkOffset + 5] = colors[candidateOffset + 2];
            linkCount += 1;
          }
        }

        positionAttribute.needsUpdate = true;
        linkPositionAttribute.needsUpdate = true;
        linkColorAttribute.needsUpdate = true;
        linksGeometry.setDrawRange(0, linkCount * 2);
        cursorPositions[0] += (pointer.x - cursorPositions[0]) * 0.12;
        cursorPositions[1] += (pointer.y - cursorPositions[1]) * 0.12;
        cursorMaterial.opacity += ((pointer.active ? 0.62 : 0) - cursorMaterial.opacity) * 0.12;
        cursorMaterial.size = 0.15 + Math.sin(time * 2.4) * 0.025;
        cursorAttribute.needsUpdate = true;
        particlesMaterial.opacity = 0.58 + Math.sin(time * 0.45) * 0.1;
        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        renderer.setAnimationLoop(null);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linksGeometry.dispose();
        linksMaterial.dispose();
        cursorGeometry.dispose();
        cursorMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void initialize();
    return () => {
      disposed = true;
      cleanup();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;
  return <div ref={containerRef} className="about-linked-particles" aria-hidden="true" />;
}
