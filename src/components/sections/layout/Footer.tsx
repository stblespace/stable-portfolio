import Image from "next/image"
import Link from "next/link"
import { contactInfo } from "@/config/contact"

const footerLinks = [
  { href: "/referral", label: "Реферальная программа" },
  { href: "/terms", label: "Условия использования" },
  { href: "/privacy", label: "Политика конфиденциальности" },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 px-6 pt-20 pb-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="pb-12">
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-5 w-12 h-12 xxl:w-14! xxl:h-14! rounded-xl"
          />
          <p className="text-3xl md:text-4xl xxl:text-5xl! font-bold text-white">
            Alexey
            <span className="text-[#D7263D]">.</span>
          </p>
          <p className="mt-5 text-gray-400 text-base xxl:text-lg! leading-relaxed font-montserrat">
            Full-Stack разработчик из Красноярска.
            <br />
            Создаю цифровые решения, которые приносят результат.
          </p>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 text-gray-400 hover:text-[#D7263D] transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 xxl:w-7! xxl:h-7!" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        <div className="border-t border-white/10 pt-10">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-[#ff6b7a] transition-colors text-sm xxl:text-base! font-montserrat"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-6 text-gray-500 text-sm xxl:text-base! font-montserrat flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span>Создано на Next.js и Tailwind CSS · Исходный код на</span>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#D7263D] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </p>

          <p className="mt-4 text-gray-500 text-sm font-montserrat">
            © {year} Алексей Воробьев. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
