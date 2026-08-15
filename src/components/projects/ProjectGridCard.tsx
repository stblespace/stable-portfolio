import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/config/projects"

const VISIBLE_TAGS = 4

export default function ProjectGridCard({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  const visibleTags = project.stack.slice(0, VISIBLE_TAGS)
  const hiddenCount = Math.max(project.stack.length - VISIBLE_TAGS, 0)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group gradient-border-hover rounded-2xl block h-full"
    >
      <article className="bg-neutral-900 rounded-2xl overflow-hidden h-full flex flex-col ring-1 ring-white/5">
        <div className="relative aspect-2/1 bg-neutral-950 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-[#D7263D]/20 via-neutral-800 to-neutral-950" />
          )}
        </div>

        <div className="flex flex-col flex-1 p-5 xxl:p-6!">
          <p className="text-[11px] xxl:text-xs! uppercase tracking-wider text-gray-500">
            {project.platform}
            <span className="mx-1.5 text-gray-600">•</span>
            {project.location}
            <span className="mx-1.5 text-gray-600">•</span>
            {project.launched}
          </p>

          <h3 className="mt-3 text-lg xxl:text-xl! font-semibold text-white leading-snug group-hover:text-[#ff6b7a] transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-sm xxl:text-base! text-gray-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto pt-5 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-neutral-800 text-gray-300 text-xs rounded-lg"
              >
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="px-2.5 py-1 bg-neutral-800 text-gray-400 text-xs rounded-lg">
                +{hiddenCount}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
