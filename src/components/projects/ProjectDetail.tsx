import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Reveal } from "@/components/ui/Reveal"
import type { Project } from "@/config/projects"

function Section({
  title,
  children,
  delay,
}: {
  title: string
  children: ReactNode
  delay: number
}) {
  return (
    <Reveal onMount delay={delay} y={28}>
      <section className="mt-12 xxl:mt-14!">
        <h2 className="text-2xl xxl:text-3xl! font-bold text-white mb-4 xxl:mb-5!">
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  )
}

function BulletList({ items, baseDelay }: { items: string[]; baseDelay: number }) {
  return (
    <ul className="space-y-3 xxl:space-y-4!">
      {items.map((item, index) => (
        <Reveal key={item} onMount delay={baseDelay + index * 0.06} y={16}>
          <li className="flex gap-3 text-gray-300 text-base xxl:text-lg! leading-relaxed">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
            <span>{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  )
}

export default function ProjectDetail({ project }: { project: Project }) {
  const hasLiveLink = Boolean(project.link && project.link !== "#")

  return (
    <div className="px-3 sm:px-6 pt-4 pb-24">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal onMount delay={0} y={12}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b7a] transition-colors text-sm xxl:text-base! font-montserrat mb-6"
          >
            <span aria-hidden>&lt;</span>
            Все проекты
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 xxl:gap-20! items-start">
          <div>
            <Reveal onMount delay={0.08} y={20}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm xxl:text-base! text-gray-400">
                <span className="px-3 py-1 rounded-full bg-neutral-800 text-gray-200 text-xs xxl:text-sm!">
                  {project.platform}
                </span>
                <span>{project.location}</span>
                <span className="text-gray-600">•</span>
                <span>{project.launched}</span>
              </div>
            </Reveal>

            <Reveal onMount delay={0.16} y={28}>
              <h1 className="mt-4 text-4xl md:text-5xl xxl:text-6xl! 3xl:text-7xl! font-bold text-white leading-tight">
                {project.title}
              </h1>
            </Reveal>

            <Reveal onMount delay={0.26} y={24}>
              <p className="mt-5 text-gray-400 text-base md:text-lg xxl:text-xl! leading-relaxed">
                {project.summary}
              </p>
            </Reveal>

            {hasLiveLink && (
              <Reveal onMount delay={0.34} y={18}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 bg-[#D7263D] text-white font-montserrat font-medium px-6 py-3 xxl:px-8! xxl:py-3.5! xxl:text-lg! rounded-xl hover:bg-[#c01f35] transition-colors"
                >
                  Открыть сайт
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </Reveal>
            )}

            <Section title="Обзор проекта" delay={0.42}>
              <p className="text-gray-400 text-base xxl:text-lg! leading-relaxed">
                {project.overview}
              </p>
            </Section>

            <Section title="Задача" delay={0.52}>
              <p className="text-gray-400 text-base xxl:text-lg! leading-relaxed">
                {project.task}
              </p>
            </Section>

            <Section title="Решение" delay={0.62}>
              <p className="text-gray-400 text-base xxl:text-lg! leading-relaxed">
                {project.solution}
              </p>
            </Section>

            <Section title="Ключевые особенности" delay={0.72}>
              <BulletList items={project.features} baseDelay={0.8} />
            </Section>

            <Section title="Результаты" delay={0.9}>
              <BulletList items={project.results} baseDelay={0.98} />
            </Section>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)] lg:self-start space-y-5 xxl:space-y-6!">
            <Reveal onMount delay={0.2} y={36}>
              <div className="relative aspect-2/1 rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/10">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-[#D7263D]/25 via-neutral-800 to-neutral-950" />
                )}
              </div>
            </Reveal>

            <Reveal onMount delay={0.36} y={32}>
              <div className="bg-neutral-900 rounded-2xl p-6 xxl:p-8! ring-1 ring-white/5">
                <h2 className="text-lg xxl:text-xl! font-semibold text-white mb-6">
                  Данные о клиенте
                </h2>

                <dl className="space-y-5">
                  <Reveal onMount delay={0.44} y={12}>
                    <div>
                      <dt className="text-xs xxl:text-sm! text-gray-500 mb-1">Клиент</dt>
                      <dd className="text-white text-base xxl:text-lg!">{project.client}</dd>
                    </div>
                  </Reveal>
                  <Reveal onMount delay={0.5} y={12}>
                    <div>
                      <dt className="text-xs xxl:text-sm! text-gray-500 mb-1">Локация</dt>
                      <dd className="text-white text-base xxl:text-lg!">{project.location}</dd>
                    </div>
                  </Reveal>
                  <Reveal onMount delay={0.56} y={12}>
                    <div>
                      <dt className="text-xs xxl:text-sm! text-gray-500 mb-1">Запущен</dt>
                      <dd className="text-white text-base xxl:text-lg!">{project.launched}</dd>
                    </div>
                  </Reveal>
                  <Reveal onMount delay={0.62} y={12}>
                    <div>
                      <dt className="text-xs xxl:text-sm! text-gray-500 mb-1">Платформа</dt>
                      <dd className="text-white text-base xxl:text-lg!">{project.platform}</dd>
                    </div>
                  </Reveal>
                  <Reveal onMount delay={0.68} y={12}>
                    <div>
                      <dt className="text-xs xxl:text-sm! text-gray-500 mb-3">Технологии</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-neutral-800 text-gray-300 text-xs xxl:text-sm! rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </Reveal>
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  )
}
