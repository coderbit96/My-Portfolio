declare module "vanta/dist/vanta.birds.min" {
  import type * as THREE from "three";

  interface VantaBirdsOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number | string;
    backgroundAlpha?: number;
    color1?: number | string;
    color2?: number | string;
    colorMode?: "variance" | "lerp" | "lerpGradient";
    quantity?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
  }

  interface VantaBirdsEffect {
    destroy: () => void;
    resize?: () => void;
    setOptions?: (_options: Partial<VantaBirdsOptions>) => void;
  }

  export default function BIRDS(_options: VantaBirdsOptions): VantaBirdsEffect;
}
