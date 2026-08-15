import type { Metadata } from "next"
import Link from "next/link"
import JsonLd from "@/components/seo/JsonLd"
import { contactInfo } from "@/config/contact"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("privacy")

const sections = [
  {
    title: "Введение",
    body: "Настоящая Политика конфиденциальности объясняет, как я собираю, использую и защищаю вашу личную информацию при посещении этого веб-сайта или использовании моих услуг. Ваша конфиденциальность важна для меня.",
  },
  {
    title: "Какую информацию я собираю",
    body: "Я могу собирать личную информацию, которую вы предоставляете напрямую: имя, адрес электронной почты, тему и текст сообщения при обращении через контактную форму. Я также могу собирать базовые технические данные о посещениях сайта (например, тип устройства или страницы), необходимые для работы и улучшения пользовательского опыта.",
  },
  {
    title: "Как я использую вашу информацию",
    body: "Я использую вашу информацию для ответа на запросы, обсуждения проектов, предоставления услуг и улучшения этого веб-сайта. Данные с формы не передаются третьим лицам в маркетинговых целях и не продаются.",
  },
  {
    title: "Файлы cookie",
    body: "Этот веб-сайт использует минимальное количество технических cookie и данных, необходимых для основной функциональности. Отслеживающие cookie для рекламных целей не используются.",
  },
  {
    title: "Сторонние сервисы",
    body: "Для доставки сообщений с контактной формы и работы сайта я могу использовать сторонние сервисы (например, почтовый провайдер Resend, хостинг). У таких сервисов есть собственные политики конфиденциальности — рекомендую ознакомиться с ними.",
  },
  {
    title: "Безопасность данных",
    body: "Я применяю разумные меры безопасности для защиты вашей личной информации. Однако ни один способ передачи данных через интернет не является на 100% безопасным.",
  },
  {
    title: "Ваши права",
    body: "Вы имеете право на доступ, исправление или удаление вашей личной информации. Для реализации этих прав, пожалуйста, свяжитесь со мной напрямую.",
  },
  {
    title: "Изменения в политике",
    body: "Я могу время от времени обновлять настоящую Политику конфиденциальности. Изменения будут опубликованы на этой странице с обновлённой датой редакции.",
  },
] as const

export default function PrivacyPage() {
  return (
    <section className="pt-4 pb-24 px-3 sm:px-6">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Политика конфиденциальности", path: "/privacy" },
        ])}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl xxl:text-6xl! font-bold text-white">
          Политика конфиденциальности
        </h1>
        <p className="mt-4 text-gray-500 text-sm xxl:text-base! font-montserrat">
          Последнее обновление: август 2026
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl xxl:text-2xl! font-semibold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed font-montserrat text-base xxl:text-lg!">
                {section.body}
              </p>
            </div>
          ))}

          <div>
            <h2 className="text-xl xxl:text-2xl! font-semibold text-white mb-3">
              Контакты
            </h2>
            <p className="text-gray-400 leading-relaxed font-montserrat text-base xxl:text-lg!">
              Если у вас есть вопросы о настоящей Политике конфиденциальности,
              пожалуйста, свяжитесь со мной по адресу{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-white hover:text-[#ff6b7a] transition-colors"
              >
                {contactInfo.email}
              </a>
              .
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block mt-12 text-gray-400 hover:text-[#ff6b7a] transition-colors font-montserrat"
        >
          ← На главную
        </Link>
      </div>
    </section>
  )
}
