"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

const projectLabels = [
  "Production System",
  "Admin Platform",
  "CMS Architecture",
];

export function ProjectsShowcaseSection({
  projects,
  eyebrow = "REAL WORLD PROJECTS",
  title = "Systems I've Built",
  description = "Designed, engineered, and shipped to production.",
  showAllProjectsButton = true,
}: {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showAllProjectsButton?: boolean;
}) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(() => new Set());
  const [revealReady, setRevealReady] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setRevealReady(true);

    if (!("IntersectionObserver" in window)) {
      setVisibleCards(new Set(projects.map((_, index) => index)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement | undefined;
          const indexValue = target?.getAttribute("data-index");
          const index = Number(indexValue);

          if (target && indexValue !== undefined && indexValue !== null && Number.isInteger(index)) {
            setVisibleCards((current) => {
              const next = new Set(current);
              next.add(index);
              return next;
            });
            observer.unobserve(target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -14% 0px", threshold: 0.22 },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section
      className="projects-showcase relative isolate overflow-hidden bg-background pb-6 pt-24 text-foreground sm:pb-8"
      data-reveal-ready={revealReady}
    >
      <style>{`
        @keyframes animate__fadeInLeft {
          from { opacity: 0; transform: translate3d(-36px, 28px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes animate__fadeInRight {
          from { opacity: 0; transform: translate3d(36px, 28px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes animate__fadeInUp {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes projectImageScaleIn {
          from { opacity: 0.74; transform: scale(0.975); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes projectCopyReveal {
          from { opacity: 0; transform: translate3d(0, 18px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate__animated {
          animation-duration: 0.86s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .animate__fadeInLeft {
          animation-name: animate__fadeInLeft;
        }

        .animate__fadeInRight {
          animation-name: animate__fadeInRight;
        }

        .animate__fadeInUp {
          animation-name: animate__fadeInUp;
        }

        .project-reveal.is-visible .project-card-image {
          animation: projectImageScaleIn 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-reveal.is-visible .project-card-copy {
          animation: projectCopyReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .projects-showcase[data-reveal-ready="true"] .project-reveal:not(.is-visible) {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate__animated,
          .project-card-image,
          .project-card-copy {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(148,163,184,0.13),transparent_25%),radial-gradient(circle_at_78%_22%,rgba(16,185,129,0.06),transparent_24%),linear-gradient(180deg,rgba(5,5,5,0.94)_0%,#050505_100%)]" />
        <div className="absolute left-[-12%] top-[16%] h-[34rem] w-[34rem] rounded-full bg-slate-400/[0.055] blur-3xl" />
        <div className="absolute bottom-[8%] right-[-18%] h-[38rem] w-[38rem] rounded-full bg-emerald-300/[0.045] blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-35"
          viewBox="0 0 1200 980"
          preserveAspectRatio="none"
        >
          <path
            d="M116 112 C340 212 426 96 622 190 S950 330 1118 210"
            fill="none"
            stroke="rgba(226,232,240,0.14)"
            strokeWidth="1"
          />
          <path
            d="M72 820 C292 694 458 798 668 640 S958 542 1188 682"
            fill="none"
            stroke="rgba(16,185,129,0.12)"
            strokeWidth="1"
          />
          <path
            d="M270 250 L464 438 L690 344 L906 540 L1102 468"
            fill="none"
            stroke="rgba(148,163,184,0.13)"
            strokeWidth="1"
          />
          <circle cx="464" cy="438" r="3" fill="rgba(226,232,240,0.24)" />
          <circle cx="690" cy="344" r="3" fill="rgba(16,185,129,0.22)" />
          <circle cx="906" cy="540" r="3" fill="rgba(226,232,240,0.22)" />
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.03)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_74%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate__animated animate__fadeInUp text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200/85">
            {eyebrow}
          </p>
          <h2 className="animate__animated animate__fadeInUp mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl [animation-delay:100ms]">
            {title}
          </h2>
          <p className="animate__animated animate__fadeInUp mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 [animation-delay:200ms]">
            {description}
          </p>
        </div>

        <div className="mt-12 space-y-7 lg:mt-16 lg:space-y-8">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-index={index}
                className={cn(
                  "project-reveal transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  visibleCards.has(index) &&
                    "is-visible animate__animated",
                  visibleCards.has(index) &&
                    (isReversed ? "animate__fadeInRight" : "animate__fadeInLeft"),
                )}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <article className="shadow-soft hover:shadow-soft-hover group relative grid transform-gpu overflow-hidden rounded-lg border border-foreground/10 bg-foreground/[0.045] p-3 backdrop-blur-xl transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-emerald-200/35 hover:bg-foreground/[0.065] lg:grid-cols-2 lg:gap-8 lg:p-4">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />

                  <Link
                    href={`/projects/${project.id}`}
                    className={cn(
                      "project-card-image shadow-soft-image relative block min-h-[240px] overflow-hidden rounded-lg border border-foreground/10 bg-card sm:min-h-[320px] lg:min-h-[360px]",
                      isReversed && "lg:order-2",
                    )}
                    aria-label={`View ${project.title}`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/12 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-md border border-foreground/10 bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-foreground/90 backdrop-blur-md">
                      {projectLabels[index] ?? "Case Study"}
                    </div>
                  </Link>

                  <div
                    className={cn(
                      "project-card-copy flex flex-col justify-center px-2 py-6 sm:px-4 lg:px-6",
                      isReversed && "lg:order-1",
                    )}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="h-px w-10 bg-gradient-to-r from-emerald-200/70 to-transparent" />
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-200/85">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/80">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-foreground/10 bg-card/35 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-emerald-200/20 group-hover:text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7">
                      <Button
                        asChild
                        className="shadow-lg shadow-emerald-950/35 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                      >
                        <Link href={`/projects/${project.id}`}>
                          View Project
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {showAllProjectsButton && (
          <div className="mt-2 text-center sm:mt-3">
            <Button
              asChild
              variant="outline"
              className="border-foreground/15 bg-foreground/[0.07] text-foreground shadow-sm backdrop-blur-md hover:border-emerald-200/35 hover:bg-foreground/[0.12]"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
