import type { Metadata } from "next"
import Link from "next/link"
import JsonLd from "@/components/seo/JsonLd"
import { contactInfo } from "@/config/contact"
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
} from "@/config/seo"

export const metadata: Metadata = createPageMetadata("terms")

const sections = [
  {
    title: "Принятие условий",
    body: "Используя мои услуги или этот веб-сайт, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не пользуйтесь моими услугами.",
  },
  {
    title: "Услуги",
    body: "Я предоставляю услуги по веб-разработке, разработке мобильных приложений, интернет-магазинов, Telegram-ботов и смежным цифровым услугам. Конкретный объём, результаты и сроки для каждого проекта определяются в отдельном проектном соглашении или коммерческом предложении.",
  },
  {
    title: "Интеллектуальная собственность",
    body: "После полной оплаты вы становитесь владельцем финальных результатов, созданных специально для вашего проекта. Я сохраняю право использовать общие техники, навыки и знания, полученные в ходе проекта. Материалы портфолио на этом сайте (дизайн, код, тексты), если не указано иное, принадлежат Алексею Воробьеву. Сторонние ресурсы (шрифты, изображения, плагины) могут подчиняться собственным лицензиям.",
  },
  {
    title: "Условия оплаты",
    body: "Стандартные условия оплаты: 50% предоплата и 50% после завершения проекта, если иное не согласовано в письменной форме. Счета подлежат оплате в течение 14 дней с момента получения. Задержка оплаты может привести к задержке проекта или приостановке услуг.",
  },
  {
    title: "Конфиденциальность",
    body: "Я обязуюсь сохранять конфиденциальность любой служебной информации, предоставленной в ходе нашего сотрудничества. По запросу готов подписать Соглашение о неразглашении (NDA).",
  },
  {
    title: "Ограничение ответственности",
    body: "Моя ответственность ограничена суммой, уплаченной за услуги. Я не несу ответственности за любые косвенные, случайные или последующие убытки, возникшие в результате использования результатов или предоставленных услуг.",
  },
  {
    title: "Расторжение",
    body: "Любая из сторон может расторгнуть соглашение, направив письменное уведомление. При расторжении подлежит оплате вся работа, выполненная до даты расторжения.",
  },
  {
    title: "Изменения условий",
    body: "Я оставляю за собой право обновлять эти условия в любое время. О существенных изменениях будут уведомлены действующие клиенты.",
  },
] as const

export default function TermsPage() {
  return (
    <section className="pt-4 pb-24 px-3 sm:px-6">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Условия использования", path: "/terms" },
        ])}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl xxl:text-6xl! font-bold text-white">
          Условия использования
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
              По вопросам, касающимся настоящих Условий использования,
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
