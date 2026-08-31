import {
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type PointerEvent,
  type ReactNode
} from "react";
import useDesktopMotion from "@/hooks/useDesktopMotion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  disabled?: boolean;
  download?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  magnetic?: boolean;
}

const MAX_OFFSET_X = 10;
const MAX_OFFSET_Y = 8;

export default function MagneticButton({
  children,
  href,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  download,
  target,
  rel,
  ariaLabel,
  magnetic = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const desktopMotionEnabled = useDesktopMotion();
  const active = magnetic && desktopMotionEnabled && !disabled;

  const handleMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      const element = ref.current;
      if (!element || !active) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

      element.style.setProperty("--magnetic-x", `${clamp(x * 0.1, MAX_OFFSET_X)}px`);
      element.style.setProperty("--magnetic-y", `${clamp(y * 0.14, MAX_OFFSET_Y)}px`);
    },
    [active]
  );

  const reset = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--magnetic-x", "0px");
    element.style.setProperty("--magnetic-y", "0px");
  }, []);

  const baseClass =
    "magnetic-target group inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-[12px] border border-brandBlue/50 bg-brandBlue px-5 py-3 text-center text-sm font-bold text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6";

  const content = (
    <span
      ref={ref}
      onPointerMove={active ? handleMove : undefined}
      onPointerLeave={active ? reset : undefined}
      className={`${baseClass} ${magnetic ? "magnetic-target" : ""} ${className}`}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        aria-disabled={disabled}
        download={download}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      disabled={disabled}
      className="contents"
    >
      {content}
    </button>
  );
}
