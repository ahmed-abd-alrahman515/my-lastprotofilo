"use client"

export function ProjectCardButton({ url }: { url: string }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(url, "_blank", "noopener,noreferrer")
      }}
      className="
        mt-auto
        inline-flex
        items-center
        justify-center
        rounded-md
        bg-primary
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-primary/90
      "
      style={{
        width: "100%",
        marginTop: "1rem",
        cursor: "pointer",
      }}
    >
      View Project
    </button>
  )
}