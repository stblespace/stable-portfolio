import Image from "next/image"
import { Reveal } from "@/components/ui/Reveal"
import { EducationIcon, SkillIcon } from "@/components/resume/ResumeIcons"
import {
  educationItems,
  resumeProfile,
  skillGroups,
} from "@/config/resume"

export default function ResumeHero() {
  return (
    <section className="pt-4 px-3 sm:px-6 pb-8">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_minmax(0,520px)] lg:grid-cols-[minmax(0,320px)_minmax(0,600px)] gap-8 lg:gap-12 xxl:gap-16! items-start w-full max-w-5xl lg:max-w-6xl">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/10 max-w-xs md:max-w-none mx-auto md:mx-0 w-full">
                <Image
                  src={resumeProfile.photo}
                  alt={resumeProfile.photoAlt}
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-5xl xxl:text-6xl! 3xl:text-7xl! font-bold text-white leading-tight">
                  {resumeProfile.name}
                  <span className="text-[#D7263D]">.</span>
                </h1>

                <p className="mt-4 text-xl xxl:text-2xl! font-semibold text-[#D7263D]">
                  {resumeProfile.rolePrimary}
                </p>
                <p className="mt-1 text-lg xxl:text-xl! text-gray-300 font-medium">
                  {resumeProfile.roleSecondary}
                </p>
                <p className="mt-3 text-sm xxl:text-base! text-gray-500">
                  {resumeProfile.stackLine}
                </p>

                <p className="mt-6 text-gray-400 text-base xxl:text-lg! leading-relaxed max-w-none">
                  {resumeProfile.bio}
                </p>

                <p className="mt-5 flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm xxl:text-base!">
                  <svg className="w-4 h-4 text-[#D7263D] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {resumeProfile.location}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-black font-montserrat font-medium px-7 py-3 xxl:px-9! xxl:py-3.5! xxl:text-lg! rounded-full hover:bg-[#D7263D] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Связаться
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Alexey-Vorobev-Resume.pdf"
                    className="inline-flex items-center gap-2 border border-white/20 text-white font-montserrat font-medium px-7 py-3 xxl:px-9! xxl:py-3.5! xxl:text-lg! rounded-full hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Резюме
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function ResumeSkills() {
  return (
    <section className="py-20 px-3 sm:px-6">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl xxl:text-6xl! 3xl:text-7xl! font-bold text-white text-center mb-12 xxl:mb-14!">
            Технологии и Навыки
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xxl:gap-5!">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={0.06 * index} y={36} className="h-full">
              <div className="gradient-border-hover rounded-2xl h-full">
                <div className="bg-neutral-900 rounded-2xl p-6 xxl:p-8! h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <SkillIcon icon={group.icon} />
                    <h3 className="text-white font-semibold text-lg xxl:text-xl!">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 xxl:gap-2.5!">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-neutral-800 text-gray-300 text-sm xxl:text-base! rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ResumeEducation() {
  return (
    <section className="pb-8 px-3 sm:px-6">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl xxl:text-6xl! 3xl:text-7xl! font-bold text-white text-center mb-12 xxl:mb-14!">
            Образование
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xxl:gap-5!">
          {educationItems.map((item, index) => (
            <Reveal key={item.title} delay={0.08 * index} y={36} className="h-full">
              <div className="gradient-border-hover rounded-2xl h-full">
                <div className="bg-neutral-900 rounded-2xl p-6 xxl:p-8! h-full flex gap-4">
                  <EducationIcon icon={item.icon} />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base xxl:text-lg! leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm xxl:text-base! mt-2">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-500 text-xs xxl:text-sm! mt-auto pt-4">
                      {item.meta}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
