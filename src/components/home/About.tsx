"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import TechStack from "@/components/home/TechStack"
import { stats } from "@/config/abouts"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
}

const popVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

export default function About() {
  return (
    <section id="about">
      <div className="max-w-360 3xl:max-w-400! 4xl:max-w-450! mx-auto px-3 sm:px-6 xxl:px-8!">
        <Reveal>
          <h2 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Обо мне<span className="text-[#D7263D]">.</span>
          </h2>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 xxl:gap-10! 3xl:gap-12! pt-8 pb-4 sm:p-6 lg:p-10 xxl:p-12! 3xl:p-16!"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={popVariants} className="gradient-border-hover lg:col-span-2 rounded-2xl bg-neutral-900">
            <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 lg:p-10 xxl:p-12! 3xl:p-14! h-full">
              <div className="space-y-4 text-gray-400 text-base md:text-lg xxl:text-xl! 3xl:text-2xl! leading-relaxed">
                <p>Привет! Я Алексей, Full-Stack разработчик из Красноярска.</p>
                <p>
                  На данный момент занимаюсь разработкой веб-приложений, лендингов, интернет-магазинов.
                  Также занимаюсь созданием чат-ботов для любых мессенджеров, активно интегрирую ИИ в свои продукты, 
                  чтобы сделать для вас более качественный продукт и ускорить сроки разработки:)
                </p>
                <p>
                  Работаю с клиентами по всему миру. Я очень ценю, если у вас уже имеется ТЗ,
                  но если вдруг у вас его еще нет - готов помочь составить
                </p>
              </div>

              <div className="mt-8 pt-8 xxl:mt-10! xxl:pt-10! border-t border-white/10 grid grid-cols-3 gap-4 xxl:gap-6!">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl xxl:text-4xl! 3xl:text-5xl! font-bold text-white">{stat.value}</p>
                    <p className="text-sm xxl:text-base! 3xl:text-lg! text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={popVariants} className="gradient-border-hover rounded-2xl">
            <div className="bg-neutral-900 rounded-2xl p-2 xxl:p-3! flex flex-col h-full">
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/cat.jpg"
                  alt="Алексей Воробьев"
                  height={300}
                  width={400}
                  className="object-cover rounded-2xl w-full h-auto"
                />
              </div>
              <p className="text-xs xxl:text-sm! text-gray-400 text-center mt-3 mb-1 italic">
                Мой верный коллега и помощник - Гатс. Ждет пока я заработаю денег ему на лакомства
              </p>
            </div>
          </motion.div>

          <motion.div variants={popVariants} className="gradient-border-hover rounded-2xl lg:col-span-3 overflow-visible">
            <TechStack />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
