import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/config/projects"

export type { Project }

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, description, stack, image, link, repo } = project

  return (
    <div className="gradient-border-hover rounded-2xl snap-center shrink-0 w-[96%] sm:w-[88%] lg:w-[80%] xl:w-[75%]">
      <div className="relative h-105 sm:h-120 md:h-140 xxl:h-150! 3xl:h-160! rounded-2xl overflow-hidden bg-neutral-950 ring-1 ring-white/10">
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              sizes="90vw"
              aria-hidden
              className="object-cover scale-110 blur-2xl opacity-35"
            />
            <div className="absolute inset-x-5 sm:inset-x-8 md:inset-x-10 top-5 sm:top-7 md:top-8 bottom-[9.5rem] sm:bottom-40 md:bottom-44 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-neutral-900">
              <Image
                src={image}
                alt={title}
                fill
                sizes="90vw"
                className="object-cover object-top"
              />
              <div className="project-card-image-blur absolute inset-0 pointer-events-none" aria-hidden>
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="90vw"
                  className="object-cover object-top blur-[40px] scale-125"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#D7263D]/20 via-neutral-800 to-neutral-950" />
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-neutral-950 via-neutral-950/95 to-transparent pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 p-6 md:p-10 xxl:p-12! 3xl:p-14!">
            <div className="max-w-xl xxl:max-w-2xl!">
              <h3 className="text-2xl md:text-4xl xxl:text-5xl! 3xl:text-6xl! font-bold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm md:text-base xxl:text-lg! 3xl:text-xl! text-gray-300">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-3 xxl:gap-4! shrink-0">
              <div className="flex flex-wrap sm:justify-end gap-2 xxl:gap-3! sm:max-w-55 xxl:max-w-70!">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 xxl:px-4! xxl:py-1.5! bg-white/10 text-gray-200 text-xs xxl:text-sm! rounded-lg backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 xxl:gap-3!">
                <Link
                  href={`/projects/${slug}`}
                  className="inline-block bg-white text-black text-sm xxl:text-base! font-semibold px-4 py-2 xxl:px-5! xxl:py-2.5! rounded-full hover:bg-[#D7263D] hover:text-white transition-colors"
                >
                  Смотреть проект
                </Link>
                {link && link !== "#" && (
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 text-white text-sm xxl:text-base! font-semibold px-4 py-2 xxl:px-5! xxl:py-2.5! rounded-full hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors"
                  >
                    Сайт
                  </Link>
                )}
                {repo && (
                  <Link
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 text-white text-sm xxl:text-base! font-semibold px-4 py-2 xxl:px-5! xxl:py-2.5! rounded-full hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors"
                  >
                    Код
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
