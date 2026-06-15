import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
};

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

export function Container({
  size = "lg",
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
