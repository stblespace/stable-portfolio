import { Reveal } from "@/components/ui/Reveal"
import {
  referralConditions,
  referralSteps,
  type ReferralCondition,
  type ReferralStep,
} from "@/config/referral"

const iconClass = "w-5 h-5 xxl:w-6! xxl:h-6! text-[#D7263D]"

function StepIcon({ icon }: { icon: ReferralStep["icon"] }) {
  switch (icon) {
    case "user":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6" />
        </svg>
      )
    case "chat":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.2-3.6A7.5 7.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    case "code":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case "money":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

function ConditionIcon({ icon }: { icon: ReferralCondition["icon"] }) {
  switch (icon) {
    case "money":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "doc":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6M7 4h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      )
    case "check":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "refresh":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    case "arrow":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )
    case "clock":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

export function ReferralHero() {
  return (
    <section className="px-3 sm:px-6 flex flex-col min-h-[calc(100svh-var(--navbar-height))] pt-4 pb-10">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto w-full flex flex-col gap-10 lg:gap-12">
        <Reveal>
          <p className="text-[#D7263D] text-sm xxl:text-base! font-montserrat text-center mb-3 uppercase tracking-wider">
            Партнёрство
          </p>
          <h1 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Реферальная программа
          </h1>
          <p className="text-gray-400 text-base md:text-lg xxl:text-xl! text-center mt-3 max-w-2xl mx-auto leading-relaxed">
            Рекомендуйте меня клиентам и получайте комиссию после успешной оплаты проекта.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl xxl:text-5xl! font-bold text-white text-center">
              Как это работает
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xxl:gap-5! items-start">
            {referralSteps.map((step, index) => (
              <Reveal key={step.title} delay={0.08 * index} y={40}>
                <article className="gradient-border-hover rounded-2xl">
                  <div className="bg-neutral-900 rounded-2xl p-5 md:p-6 xxl:p-7! flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D7263D]/50 text-[#D7263D] text-sm font-semibold">
                        {index + 1}
                      </span>
                      <StepIcon icon={step.icon} />
                    </div>
                    <h3 className="text-white font-semibold text-lg xxl:text-xl!">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm xxl:text-base! leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReferralConditions() {
  return (
    <section className="py-16 px-3 sm:px-6">
      <div className="max-w-7xl 3xl:max-w-400! mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl xxl:text-6xl! font-bold text-white text-center mb-12">
            Условия
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xxl:gap-5!">
          {referralConditions.map((item, index) => (
            <Reveal key={item.title} delay={0.06 * index} y={36} className="h-full">
              <article className="gradient-border-hover rounded-2xl h-full">
                <div className="bg-neutral-900 rounded-2xl p-6 xxl:p-8! h-full flex flex-col">
                  <ConditionIcon icon={item.icon} />
                  <h3 className="text-white font-semibold text-lg xxl:text-xl! mt-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm xxl:text-base! leading-relaxed mt-2">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
