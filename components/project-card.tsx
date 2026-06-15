import type React from "react"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects-data"
import { ProjectCardButton } from "./ui/project-card-button"

interface ProjectCardProps {
  project: Project
  className?: string
  style?: React.CSSProperties
}

export function ProjectCard({ project, className, style }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card
        className={cn(
          "group overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card",
          className,
        )}
        style={style}
      >
        <div className="relative aspect-[4/2] overflow-hidden bg-muted">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
 {project.projectUrl && (
            <ProjectCardButton url={project.projectUrl} />
          )}

         
        </CardContent>
      </Card>
            
    </Link>

    
  )
}
