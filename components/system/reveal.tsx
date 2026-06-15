"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
};

/**
 * Scroll-triggered fade-up. Cheap, GPU-friendly, prefers-reduced-motion aware.
 * Use as the primary motion primitive for content reveals.
 */
export function Reveal({
  delay = 0,
  y = 24,
  once = true,
  as = "div",
  className,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </MotionTag>
  );
}

const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Wrap a group of <StaggerItem> children to cascade their entrance.
 */
export function Stagger({
  className,
  children,
  delay = 0,
}: React.PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={{
        ...staggerVariants,
        show: {
          transition: {
            ...(staggerVariants.show as { transition: object }).transition,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  as = "div",
}: React.PropsWithChildren<{
  className?: string;
  as?: "div" | "li" | "article";
}>) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <Tag variants={itemVariants} className={cn(className)}>
      {children}
    </Tag>
  );
}
