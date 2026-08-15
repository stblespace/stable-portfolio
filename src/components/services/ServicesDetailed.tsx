import { Reveal } from "@/components/ui/Reveal"
import { CheckIcon, ServiceIconSvg } from "@/components/ui/ServiceIcons"
import { servicesDetailed } from "@/config/services"

export default function ServicesDetailed() {
  const mainServices = servicesDetailed.filter((s) => s.id !== "digital")
  const digital = servicesDetailed.find((s) => s.id === "digital")

  return (
    <section className="px-3 sm:px-6 flex flex-col min-h-[calc(100svh-var(--navbar-height))] lg:h-[calc(100svh-var(--navbar-height))] lg:max-h-[calc(100svh-var(--navbar-height))] lg:overflow-hidden pt-4 pb-6">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto w-full flex flex-col gap-6 lg:gap-5 xxl:gap-6! lg:min-h-0 lg:flex-1">
        <Reveal>
          <h1 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Услуги<span className="text-[#D7263D]">.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg xxl:text-xl! 3xl:text-2xl! text-center mt-2 lg:mt-3 max-w-2xl mx-auto">
            Цифровые решения под потребности вашего бизнеса
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xxl:gap-5! lg:flex-1 lg:min-h-0 lg:grid-rows-[minmax(0,1fr)_auto]">
          {mainServices.map((service, index) => (
            <Reveal key={service.id} delay={0.08 * index} y={40} className="min-h-0 h-full">
              <article className="gradient-border-hover rounded-2xl h-full min-h-0">
                <div className="bg-neutral-900 rounded-2xl p-5 md:p-6 lg:p-5 xxl:p-8! h-full flex flex-col min-h-0 overflow-hidden">
                  <ServiceIconSvg icon={service.icon} />
                  <h2 className="text-white font-semibold text-lg lg:text-xl xxl:text-2xl! 3xl:text-3xl! mt-3 lg:mt-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 text-sm xxl:text-base! 3xl:text-lg! leading-relaxed mt-2">
                    {service.description}
                  </p>

                  {service.features && (
                    <ul className="mt-4 lg:mt-5 space-y-2 lg:space-y-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-gray-300 text-sm xxl:text-base!">
                          <CheckIcon />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.tags && (
                    <div className="mt-auto pt-4 lg:pt-5 flex flex-wrap gap-1.5 xxl:gap-2!">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 xxl:px-3! xxl:py-1! bg-neutral-800 text-gray-300 text-xs xxl:text-sm! rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          {digital && (
            <Reveal delay={0.24} y={40} className="col-span-full">
              <article className="gradient-border-hover rounded-2xl h-full">
                <div className="bg-neutral-900 rounded-2xl p-5 md:p-6 lg:p-5 xxl:p-8!">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10 xxl:gap-14!">
                    <div className="lg:min-w-[280px] xxl:min-w-[320px]! shrink-0">
                      <ServiceIconSvg icon={digital.icon} />
                      <h2 className="text-white font-semibold text-lg lg:text-xl xxl:text-2xl! 3xl:text-3xl! mt-3 lg:mt-4">
                        {digital.title}
                      </h2>
                      <p className="text-gray-400 text-sm xxl:text-base! 3xl:text-lg! leading-relaxed mt-2 max-w-md">
                        {digital.description}
                      </p>
                    </div>

                    <div className="flex-1 mt-4 lg:mt-0 lg:pt-1">
                      {digital.features && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 lg:gap-y-3">
                          {digital.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-gray-300 text-sm xxl:text-base!">
                              <CheckIcon />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {digital.note && (
                        <p className="mt-4 lg:mt-5 pt-4 border-t border-white/10 text-gray-500 text-xs xxl:text-sm!">
                          {digital.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
