"use client";

import { useEffect, useRef } from "react";

interface EducationWebGLBackgroundProps {
  reducedMotion: boolean;
}

/**
 * WebGL-safe adaptation of Three's custom-lighting point cloud example.
 * A shader computes the influence of three animated lights per particle.
 */
export default function EducationWebGLBackground({ reducedMotion }: EducationWebGLBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let cleanup = () => undefined;

    const initialize = async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
      camera.position.z = 10;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const particleCount = window.innerWidth < 640 ? 2200 : 6500;
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        positions[offset] = (Math.random() - 0.5) * 24;
        positions[offset + 1] = (Math.random() - 0.5) * 14;
        positions[offset + 2] = (Math.random() - 0.5) * 6;
        scales[index] = 0.75 + Math.random() * 1.55;
      }

      // Virtual lights are evaluated directly in the particle shader, matching the
      // custom-lighting effect without requiring the newer WebGPU node API.
      const lightA = new THREE.Vector3();
      const lightB = new THREE.Vector3();
      const lightC = new THREE.Vector3();

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          lightA: { value: lightA },
          lightB: { value: lightB },
          lightC: { value: lightC },
          colorA: { value: new THREE.Color(0x22d3ee) },
          colorB: { value: new THREE.Color(0x3b82f6) },
          colorC: { value: new THREE.Color(0x22c55e) }
        },
        vertexShader: `
          attribute float aScale;
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aScale * 4.6 * (10.0 / -modelViewPosition.z);
            gl_Position = projectionMatrix * modelViewPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 lightA;
          uniform vec3 lightB;
          uniform vec3 lightC;
          uniform vec3 colorA;
          uniform vec3 colorB;
          uniform vec3 colorC;
          varying vec3 vPosition;
          void main() {
            vec2 point = gl_PointCoord - vec2(0.5);
            float disc = smoothstep(0.5, 0.0, length(point));
            float influenceA = exp(-0.18 * dot(vPosition - lightA, vPosition - lightA));
            float influenceB = exp(-0.18 * dot(vPosition - lightB, vPosition - lightB));
            float influenceC = exp(-0.18 * dot(vPosition - lightC, vPosition - lightC));
            float energy = influenceA + influenceB + influenceC;
            vec3 lightColor = colorA * influenceA + colorB * influenceB + colorC * influenceC;
            vec3 baseColor = vec3(0.02, 0.12, 0.18);
            gl_FragColor = vec4((baseColor + lightColor) * (0.6 + energy), disc * (0.24 + energy * 0.76));
          }
        `
      });
      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

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

      const render = () => {
        if (!active) return;

        const time = performance.now() * 0.001;
        const scale = 3.2;
        lightA.set(Math.sin(time * 0.7) * scale, Math.cos(time * 0.5) * scale, Math.cos(time * 0.3) * 1.5);
        lightB.set(Math.cos(time * 0.3) * scale, Math.sin(time * 0.5) * scale, Math.sin(time * 0.7) * 1.5);
        lightC.set(Math.sin(time * 0.7 + 1.6) * scale, Math.cos(time * 0.3 + 1.2) * scale, Math.sin(time * 0.5) * 1.5);
        pointCloud.rotation.y = time * 0.035;

        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(render);
      cleanup = () => {
        observer.disconnect();
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
  }, [reducedMotion]);

  return <div ref={containerRef} className="education-webgl-background" aria-hidden="true" />;
}
