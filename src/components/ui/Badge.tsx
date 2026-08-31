import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("badge-v2", className)} {...props} />;
}
