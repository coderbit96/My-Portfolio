"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

type Point = {
  x: number;
  y: number;
};

type WaveQuality = {
  lineCount: number;
  sampleCount: number;
  ribbonWidth: number;
  amplitude: number;
  lineWidth: number;
  glow: number;
  alpha: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};

const getQuality = (width: number): WaveQuality => {
  if (width < 640) {
    return {
      lineCount: 22,
      sampleCount: 78,
      ribbonWidth: 142,
      amplitude: 30,
      lineWidth: 0.7,
      glow: 8,
      alpha: 0.3
    };
  }

  if (width < 1024) {
    return {
      lineCount: 36,
      sampleCount: 104,
      ribbonWidth: 214,
      amplitude: 42,
      lineWidth: 0.82,
      glow: 12,
      alpha: 0.36
    };
  }

  return {
    lineCount: 58,
    sampleCount: 132,
    ribbonWidth: 318,
    amplitude: 58,
    lineWidth: 0.92,
    glow: 18,
    alpha: 0.43
  };
};

export default function NeonWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let quality = getQuality(1024);
    let isVisible = document.visibilityState === "visible";
    let reducedFrameDrawn = false;
    let scrollDepth = 0;
    let animationTime = 0;
    let previousTimestamp = 0;

    const pointer = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      quality = getQuality(width);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      reducedFrameDrawn = false;
    };

    const updateScrollDepth = () => {
      const rect = canvas.getBoundingClientRect();
      const viewportHeight = window.innerHeight || height;
      const progress = 1 - rect.top / Math.max(viewportHeight, 1);
      scrollDepth = clamp((progress - 0.2) * 42, -24, 44);
    };

    const getCenterPoint = (progress: number, time: number): Point => {
      const pointerInfluence = Math.sin(progress * Math.PI);
      const lowerLift = smoothstep(0, 0.26, progress) * (1 - smoothstep(0.34, 0.52, progress));
      const upperSweep = smoothstep(0.62, 0.95, progress);
      const primaryPhase = progress * Math.PI * 2.18 + time * 0.2;
      const secondaryPhase = progress * Math.PI * 4.8 - time * 0.12;

      const x =
        lerp(-width * 0.24, width * 1.16, progress) +
        Math.sin(primaryPhase) * 18 +
        Math.sin(secondaryPhase) * 6 +
        pointer.x * 32 * pointerInfluence;

      const y =
        lerp(height * 0.87, height * 0.13, smoothstep(0.04, 0.96, progress)) +
        Math.sin((progress * 2.2 - 0.38) * Math.PI + time * 0.14) *
          quality.amplitude *
          (0.7 + 0.42 * pointerInfluence) +
        Math.sin(progress * Math.PI * 5.1 - time * 0.16) * quality.amplitude * 0.08 +
        lowerLift * height * 0.15 -
        upperSweep * height * 0.11 +
        pointer.y * 38 * pointerInfluence +
        scrollDepth * (0.24 + progress * 0.34);

      return { x, y };
    };

    const getNormal = (progress: number, time: number) => {
      const delta = 0.004;
      const previousPoint = getCenterPoint(clamp(progress - delta, 0, 1), time);
      const nextPoint = getCenterPoint(clamp(progress + delta, 0, 1), time);
      const dx = nextPoint.x - previousPoint.x;
      const dy = nextPoint.y - previousPoint.y;
      const length = Math.hypot(dx, dy) || 1;

      return {
        x: -dy / length,
        y: dx / length
      };
    };

    const drawSmoothPath = (points: Point[]) => {
      if (points.length < 2) {
        return;
      }

      context.moveTo(points[0].x, points[0].y);

      for (let pointIndex = 1; pointIndex < points.length - 2; pointIndex += 1) {
        const currentPoint = points[pointIndex];
        const nextPoint = points[pointIndex + 1];
        const middlePoint = {
          x: (currentPoint.x + nextPoint.x) * 0.5,
          y: (currentPoint.y + nextPoint.y) * 0.5
        };

        context.quadraticCurveTo(currentPoint.x, currentPoint.y, middlePoint.x, middlePoint.y);
      }

      const penultimatePoint = points[points.length - 2];
      const lastPoint = points[points.length - 1];
      context.quadraticCurveTo(penultimatePoint.x, penultimatePoint.y, lastPoint.x, lastPoint.y);
    };

    const drawRibbon = (time: number) => {
      context.clearRect(0, 0, width, height);

      const backgroundGlow = context.createRadialGradient(
        width * 0.68,
        height * 0.44,
        0,
        width * 0.68,
        height * 0.44,
        Math.max(width, height) * 0.8
      );
      backgroundGlow.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      backgroundGlow.addColorStop(0.5, "rgba(217, 70, 239, 0.035)");
      backgroundGlow.addColorStop(1, "rgba(8, 11, 16, 0)");
      context.fillStyle = backgroundGlow;
      context.fillRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, height, width, 0);
      gradient.addColorStop(0, "rgba(236, 72, 153, 0.88)");
      gradient.addColorStop(0.28, "rgba(217, 70, 239, 0.82)");
      gradient.addColorStop(0.62, "rgba(168, 85, 247, 0.74)");
      gradient.addColorStop(1, "rgba(126, 34, 206, 0.66)");

      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = gradient;
      context.shadowColor = "rgba(217, 70, 239, 0.52)";
      context.shadowBlur = quality.glow;

      for (let lineIndex = 0; lineIndex < quality.lineCount; lineIndex += 1) {
        const lineProgress = lineIndex / Math.max(quality.lineCount - 1, 1);
        const centeredIndex = lineProgress - 0.5;
        const lineDepth = 0.58 + 0.52 * Math.sin(lineProgress * Math.PI);
        const lineAlpha =
          quality.alpha *
          lineDepth *
          (shouldReduceMotion ? 0.85 : 1);
        const linePoints: Point[] = [];

        context.beginPath();
        context.globalAlpha = lineAlpha;
        context.lineWidth = quality.lineWidth + Math.sin(lineProgress * Math.PI) * 0.22;

        for (let sampleIndex = 0; sampleIndex < quality.sampleCount; sampleIndex += 1) {
          const progress = sampleIndex / Math.max(quality.sampleCount - 1, 1);
          const center = getCenterPoint(progress, time);
          const normal = getNormal(progress, time);
          const ribbonShape = Math.sin(progress * Math.PI);
          const neckA = Math.exp(-Math.pow((progress - 0.17) / 0.075, 2));
          const neckB = Math.exp(-Math.pow((progress - 0.69) / 0.08, 2));
          const compression = clamp(1 - neckA * 0.62 - neckB * 0.52, 0.34, 1);
          const breathing =
            0.86 +
            Math.sin(progress * Math.PI * 4.2 + time * 0.32 + lineIndex * 0.045) * 0.08;
          const flowingRipple =
            Math.sin(progress * Math.PI * 9 - time * 0.8 + lineIndex * 0.12) *
            ribbonShape *
            lineDepth *
            5.5;
          const edgeTaper = smoothstep(0, 0.08, progress) * (1 - smoothstep(0.94, 1, progress));
          const offset =
            centeredIndex *
            quality.ribbonWidth *
            (0.36 + ribbonShape * 0.9) *
            compression *
            breathing *
            edgeTaper +
            flowingRipple;

          linePoints.push({
            x: center.x + normal.x * offset,
            y: center.y + normal.y * offset
          });
        }

        drawSmoothPath(linePoints);
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    const render = (timestamp: number) => {
      pointer.x = lerp(pointer.x, pointer.targetX, 0.055);
      pointer.y = lerp(pointer.y, pointer.targetY, 0.055);
      updateScrollDepth();

      if (!shouldReduceMotion) {
        const delta = previousTimestamp === 0 ? 16.7 : clamp(timestamp - previousTimestamp, 0, 33.4);
        previousTimestamp = timestamp;
        animationTime += delta * 0.001;
      }

      drawRibbon(shouldReduceMotion ? 0 : animationTime);

      if (!shouldReduceMotion && isVisible) {
        frameId = window.requestAnimationFrame(render);
      } else {
        reducedFrameDrawn = true;
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frameId);
      previousTimestamp = 0;

      if (shouldReduceMotion) {
        if (!reducedFrameDrawn) {
          render(0);
        }
        return;
      }

      if (isVisible) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointer.targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      start();
    };

    const handleResize = () => {
      resizeCanvas();
      start();
    };

    resizeCanvas();
    updateScrollDepth();
    start();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    canvas.parentElement?.addEventListener("pointermove", handlePointerMove);
    canvas.parentElement?.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScrollDepth);
      canvas.parentElement?.removeEventListener("pointermove", handlePointerMove);
      canvas.parentElement?.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="neon-wave-background"
    />
  );
}
