"use client"

import { useCallback, useRef, useState } from "react"
import ProjectCard from "@/components/ui/ProjectCard"
import { Reveal } from "@/components/ui/Reveal"
import projects from "@/config/projects"

export default function Projects() {
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const scrollToSlide = useCallback((index: number) => {
        const track = trackRef.current
        const slide = track?.children[index] as HTMLElement | undefined
        if (!track || !slide) return
        track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
    }, [])

    function handleScroll() {
        const track = trackRef.current
        if (!track) return
        const first = track.children[0] as HTMLElement | undefined
        const second = track.children[1] as HTMLElement | undefined
        if (!first) return
        const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
        const index = step > 0 ? Math.round(track.scrollLeft / step) : 0
        setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1))
    }

    return (
        <section id="Projects" className="py-32">
            <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto px-3 sm:px-6 xxl:px-8!">
                <Reveal>
                    <h2 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center mb-12 xxl:mb-16!">
                        Мои проекты<span className="text-[#D7263D]">.</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.15} y={48}>
                    <div className="relative">
                        <div
                            ref={trackRef}
                            onScroll={handleScroll}
                            className="flex gap-4 xxl:gap-6! overflow-x-auto snap-x snap-mandatory scrollbar-hide p-1"
                        >
                            {projects.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>

                        {projects.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => scrollToSlide(Math.max(activeIndex - 1, 0))}
                                    aria-label="Предыдущий проект"
                                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 xxl:w-12! xxl:h-12! rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-[#D7263D]/50 hover:bg-[#D7263D]/20 hover:text-[#ff6b7a] transition-colors z-20"
                                >
                                    <svg className="w-5 h-5 xxl:w-6! xxl:h-6! text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollToSlide(Math.min(activeIndex + 1, projects.length - 1))}
                                    aria-label="Следующий проект"
                                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 xxl:w-12! xxl:h-12! rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-[#D7263D]/50 hover:bg-[#D7263D]/20 hover:text-[#ff6b7a] transition-colors z-20"
                                >
                                    <svg className="w-5 h-5 xxl:w-6! xxl:h-6! text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {projects.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => scrollToSlide(index)}
                                    aria-label={`Проект ${index + 1}`}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex
                                        ? "bg-white"
                                        : "border border-white/20 hover:border-[#D7263D] hover:bg-[#D7263D]/40"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </Reveal>
            </div>
        </section>
    )
}
