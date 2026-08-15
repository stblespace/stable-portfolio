"use client";
import { ParticlesBackground } from "../effects/fire";

export function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center px-6 min-h-[calc(100vh-var(--navbar-height))]">
      <ParticlesBackground />
      <div className="absolute inset-0 -z-10 flex items-center justify-center mb-30">
        <div className="glow-animate w-150 h-78 bg-[#D7263D]/30 blur-[80px] rounded-full" />
        <div className="absolute w-72 h-32 bg-[#ff6b7a]/40 blur-[60px] rounded-full" />
      </div>
      <div className="max-w-3xl xxl:max-w-5xl! 3xl:max-w-7xl! w-full text-center mb-40">
        {/* Статус */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7263D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h- w-3 bg-[#D7263D]"></span>
          </span>
          <span className="text-sm xxl:text-base! 3xl:text-lg! text-gray-400">Открыт к новым проектам</span>
        </div>

        {/* Имя */}
        <h1 className="text-6xl sm:text-7xl md:text-7xl xxl:text-8xl! 3xl:text-9xl! font-bold text-white mb-4">
          Алексей Воробьев<span className="text-[#D7263D]">.</span>
        </h1>

        {/* Должность */}
        <h2 className="text-2xl md:text-3xl xxl:text-4xl! 3xl:text-5xl! text-gray-300 font-normal mb-8">
          Full-Stack Разработчик
        </h2>

        {/* Описание */}
        <p className="text-gray-400 text-lg xxl:text-xl! 3xl:text-2xl! max-w-2xl xxl:max-w-3xl! mx-auto ">
          Создаю сайты, лендинги, интернет-магазины и веб-приложения под ключ. Также занимаюсь разработкой чат-ботов для различных задач и процессов.
          Специализируюсь на Next.js, React, Node.js — для клиентов из Красноярска и по всей России.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 xxl:gap-6! mt-10">
          <a href="/projects" className="bg-white text-black font-semibold px-8 py-3 xxl:px-10! xxl:py-4! xxl:text-lg! 3xl:px-12! 3xl:py-5! 3xl:text-xl! rounded-full hover:bg-[#D7263D] hover:text-white transition-colors">
            Мои проекты
          </a>
          <a href="/contact" className="border border-white/20 text-white font-semibold px-8 py-3 xxl:px-10! xxl:py-4! xxl:text-lg! 3xl:px-12! 3xl:py-5! 3xl:text-xl! rounded-full hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors">
            Связаться
          </a>
        </div>

        {/* Соцсети */}
        <div className="flex items-center justify-center gap-4 xxl:gap-6! mt-10">
          <a href="https://github.com/stblespace" target="_blank" rel="noopener noreferrer" className="inline-flex size-6 xxl:size-7! 3xl:size-8! items-center justify-center text-gray-400 hover:text-[#D7263D] transition-colors" aria-label="GitHub">
            <svg className="size-full" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://t.me/stablespace" target="_blank" rel="noopener noreferrer" className="inline-flex size-6 xxl:size-7! 3xl:size-8! items-center justify-center text-gray-400 hover:text-[#D7263D] transition-colors" aria-label="Telegram">
            <svg className="size-full" fill="currentColor" viewBox="-2.4 -2.4 28.8 28.8">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
