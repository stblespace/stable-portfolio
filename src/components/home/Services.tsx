import Link from "next/link"
import { Reveal } from "@/components/ui/Reveal"
import { ServiceIconSvg } from "@/components/ui/ServiceIcons"
import { servicesPreview } from "@/config/services"

export default function Services() {
  return (
    <section id="services" className="py-32 px-3 sm:px-6">
      <div className="max-w-7xl 3xl:max-w-400! 4xl:max-w-450! mx-auto">
        <Reveal>
          <h2 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Услуги<span className="text-[#D7263D]">.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg xxl:text-xl! 3xl:text-2xl! text-center mt-4 xxl:mt-6! max-w-2xl mx-auto">
            Цифровые решения под потребности вашего бизнеса
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xxl:gap-6! mt-12 xxl:mt-16!">
          {servicesPreview.map((service, index) => (
            <Reveal key={service.id} delay={0.08 * index} y={40}>
              <div className="gradient-border-hover rounded-2xl h-full">
                <div className="bg-neutral-900 rounded-2xl p-6 xxl:p-8! h-full flex flex-col gap-4">
                  <ServiceIconSvg icon={service.icon} />
                  <h3 className="text-white font-semibold text-lg xxl:text-xl! 3xl:text-2xl!">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm xxl:text-base! 3xl:text-lg! leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 xxl:gap-6! mt-12 xxl:mt-16!">
            <Link
              href="/services"
              className="border border-white/20 text-white font-montserrat px-8 py-3 xxl:px-10! xxl:py-4! xxl:text-lg! rounded-full hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors"
            >
              Все услуги
            </Link>
            <Link
              href="/referral"
              className="flex items-center gap-2 text-gray-400 hover:text-[#ff6b7a] transition-colors font-montserrat text-sm xxl:text-base!"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-[#D7263D] text-xs font-semibold">
                $
              </span>
              Реферальная программа
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
