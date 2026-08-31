import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function GradientText({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("gradient-text-v2", className)} {...props} />;
}
