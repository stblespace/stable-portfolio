"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"

export type FaqEntry = {
  question: string
  answer: string
}

type FAQProps = {
  title?: string
  items: FaqEntry[]
  id?: string
}

export default function FAQ({
  title = "Часто задаваемые вопросы",
  items,
  id = "faq",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id={id} className="py-20 px-3 sm:px-6">
      <div className="max-w-4xl xxl:max-w-5xl! 3xl:max-w-6xl! mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl xxl:text-6xl! 3xl:text-7xl! font-bold text-white text-center mb-12 xxl:mb-16!">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.12} y={40}>
          <div className="gradient-border-hover rounded-2xl">
            <div className="bg-neutral-900 rounded-2xl overflow-hidden">
              {items.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={item.question}
                    className={index < items.length - 1 ? "border-b border-white/10" : ""}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 xxl:px-8! xxl:py-6! text-left group"
                    >
                      <span
                        className={`font-montserrat text-base md:text-lg xxl:text-xl! transition-colors ${
                          isOpen
                            ? "text-[#D7263D]"
                            : "text-white group-hover:text-[#D7263D]"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 flex items-center justify-center w-8 h-8 xxl:w-9! xxl:h-9! rounded-full border transition-colors ${
                          isOpen
                            ? "border-[#D7263D]/50 text-[#D7263D]"
                            : "border-white/15 text-gray-400 group-hover:border-[#D7263D]/40 group-hover:text-[#D7263D]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 xxl:px-8! xxl:pb-6! text-gray-400 text-sm md:text-base xxl:text-lg! leading-relaxed font-montserrat">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
