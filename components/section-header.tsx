import { cn } from "@/lib/utils"
import { AnimatedSection } from "@/components/system/animated"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({ label, title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <AnimatedSection animation="fadeInUp" className={cn("mb-12", align === "center" && "text-center", className)}>
      {label && (
        <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-primary">{label}</span>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground mx-auto">{description}</p>}
    </AnimatedSection>
  )
}
