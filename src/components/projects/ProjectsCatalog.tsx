"use client"

import { useMemo, useState } from "react"
import { Reveal } from "@/components/ui/Reveal"
import ProjectGridCard from "@/components/projects/ProjectGridCard"
import projects, { projectCategories, type ProjectCategory } from "@/config/projects"

type Filter = "Все" | ProjectCategory

const filters: Filter[] = ["Все", ...projectCategories]

export default function ProjectsCatalog() {
  const [active, setActive] = useState<Filter>("Все")

  const filtered = useMemo(() => {
    if (active === "Все") return projects
    return projects.filter((project) => project.category === active)
  }, [active])

  return (
    <section className="pt-4 pb-24 px-3 sm:px-6">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Проекты
          </h1>
          <p className="text-gray-400 text-base md:text-lg xxl:text-xl! text-center mt-3 max-w-2xl mx-auto">
            Подборка моих недавних работ
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-start gap-2 xxl:gap-3! mt-10 xxl:mt-12!">
            {filters.map((filter) => {
              const isActive = active === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  className={`px-4 py-2 xxl:px-5! xxl:py-2.5! rounded-full text-sm xxl:text-base! font-montserrat transition-colors ${
                    isActive
                      ? "bg-[#D7263D] text-white"
                      : "bg-neutral-900 text-gray-300 hover:bg-[#D7263D]/10 hover:border-[#D7263D]/40 hover:text-[#ff6b7a] border border-white/10"
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xxl:gap-6! mt-12 xxl:mt-14!">
            {filtered.map((project, index) => (
              <Reveal key={project.slug} delay={0.05 * (index % 6)} y={36}>
                <ProjectGridCard project={project} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16 font-montserrat">
            В этой категории пока нет проектов
          </p>
        )}
      </div>
    </section>
  )
}
