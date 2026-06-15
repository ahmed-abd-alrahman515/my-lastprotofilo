import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Vertical rhythm preset */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Container width preset */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** When true, don't render an inner Container — caller manages layout */
  bare?: boolean;
  /** Optional inner wrapper className (applied to Container) */
  innerClassName?: string;
};

const spacingMap = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
  xl: "py-28 sm:py-36 lg:py-44",
} as const;

export function Section({
  spacing = "md",
  size = "lg",
  bare = false,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("relative isolate", spacingMap[spacing], className)}
      {...rest}
    >
      {bare ? (
        children
      ) : (
        <Container size={size} className={innerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}
