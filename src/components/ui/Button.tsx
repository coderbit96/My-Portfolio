import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode
} from "react";
import { cn } from "@/lib/cn";
import useMagnetic from "@/hooks/useMagnetic";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  ariaLabel?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-v2--primary",
  secondary: "btn-v2--secondary",
  ghost: "btn-v2--ghost"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm"
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ariaLabel,
  type = "button",
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn("btn-v2 magnetic-target", variantClasses[variant], sizeClasses[size], className);
  const { enabled: magneticEnabled, onPointerMove, onPointerLeave } = useMagnetic();

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        onPointerMove={magneticEnabled ? onPointerMove : undefined}
        onPointerLeave={magneticEnabled ? onPointerLeave : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      onPointerMove={magneticEnabled ? onPointerMove : undefined}
      onPointerLeave={magneticEnabled ? onPointerLeave : undefined}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
