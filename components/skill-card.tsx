import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface SkillCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function SkillCard({ icon: Icon, title, description, className }: SkillCardProps) {
  return (
    <Card
      className={cn(
        "group border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
