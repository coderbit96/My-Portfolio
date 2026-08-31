import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  containerClassName,
  bleed = false,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component className={cn("section-v2 relative", className)} {...props}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Component>
  );
}
