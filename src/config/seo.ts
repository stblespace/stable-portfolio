import type { Metadata } from "next"
import { contactInfo } from "@/config/contact"
import projects, { type Project } from "@/config/projects"

const fallbackUrl = "https://stablespace.dev"

export const siteConfig = {
  name: "Алексей Воробьев",
  shortName: "Alexey",
  brand: "stablespace",
  title: "Алексей Воробьев | Full-Stack разработчик — сайты, приложения, боты",
  titleTemplate: "%s | Алексей Воробьев",
  description:
    "Full-Stack разработчик из Красноярска. Создаю сайты, лендинги, интернет-магазины, веб-приложения, мобильные приложения и Telegram-ботов под ключ. Next.js, React, Node.js, TypeScript.",
  locale: "ru_RU",
  language: "ru",
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl,
  ogImage: "/og.png",
  personImage: "/me.jpg",
  twitterHandle: "@stablespace",
  keywords: [
    "Full-Stack разработчик",
    "веб-разработчик Красноярск",
    "разработка сайтов",
    "лендинг под ключ",
    "интернет-магазин",
    "веб-приложение",
    "мобильное приложение",
    "Telegram бот",
    "Next.js разработчик",
    "React разработчик",
    "Node.js",
    "TypeScript",
    "фриланс разработчик",
    "заказать сайт",
    "Алексей Воробьев",
    "stablespace",
  ],
  author: {
    name: "Алексей Воробьев",
    email: contactInfo.email,
    jobTitle: [
      "Full-Stack Developer",
      "Веб-разработчик",
      "Разработчик сайтов",
    ],
    location: contactInfo.location,
    sameAs: [contactInfo.github, contactInfo.telegram],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Elixir",
      "Phoenix",
      "GO",
      "Node.js",
      "PostgreSQL",
      "Flutter",
      "Firebase",
      "Supabase",
      "WordPress",
      "Shopify",
      "Telegram Bots",
      "Mobile Apps",
    ],
  },
  serviceType: [
    "Веб-разработка",
    "Разработка веб-приложений",
    "Мобильная разработка",
    "Разработка Telegram-ботов",
    "SEO и цифровые услуги",
  ],
} as const

export type PageSeoKey =
  | "home"
  | "projects"
  | "services"
  | "resume"
  | "contact"
  | "referral"
  | "terms"
  | "privacy"

type PageSeo = {
  path: string
  title: string
  description: string
  keywords: string[]
}

export const pageSeo: Record<PageSeoKey, PageSeo> = {
  home: {
    path: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
  },
  projects: {
    path: "/projects",
    title: "Проекты — кейсы веб-разработки и цифровых продуктов",
    description:
      "Портфолио проектов Алексея Воробьева: сайты, веб-приложения, Telegram-боты и цифровые продукты. Реальные кейсы на Next.js, React и Node.js.",
    keywords: [
      "портфолио разработчика",
      "кейсы веб-разработки",
      "примеры сайтов",
      "проекты Next.js",
      "портфолио Full-Stack",
    ],
  },
  services: {
    path: "/services",
    title: "Услуги — веб-разработка, приложения и цифровые решения",
    description:
      "Услуги Full-Stack разработчика: веб-разработка, мобильные приложения, веб-приложения, чат-боты и SEO. Современный стек — Next.js, React, Node.js, TypeScript.",
    keywords: [
      "заказать разработку сайта",
      "услуги веб-разработчика",
      "разработка интернет-магазина",
      "создание веб-приложения",
      "разработка Telegram бота",
      "мобильная разработка",
    ],
  },
  resume: {
    path: "/resume",
    title: "Резюме — Full-Stack разработчик Алексей Воробьев",
    description:
      "Резюме Full-Stack разработчика из Красноярска: стек Next.js, React, Elixir, GO, PostgreSQL, Flutter. Опыт, навыки, образование и коммерческие проекты.",
    keywords: [
      "резюме разработчика",
      "Full-Stack CV",
      "навыки React Next.js",
      "разработчик Красноярск",
      "hire full stack developer",
    ],
  },
  contact: {
    path: "/contact",
    title: "Контакты — обсудить проект и заказать разработку",
    description:
      "Связаться с Алексеем Воробьевым: форма заявки, email и Telegram. Обсудим сайт, приложение или бота — оценка сроков и бюджета.",
    keywords: [
      "связаться с разработчиком",
      "заказать сайт",
      "написать разработчику",
      "контакты веб-разработчика",
      "обсудить проект",
    ],
  },
  referral: {
    path: "/referral",
    title: "Реферальная программа — комиссия за рекомендации",
    description:
      "Реферальная программа: рекомендуйте разработку сайтов и приложений и получайте комиссию 10%. Условия, шаги и частые вопросы.",
    keywords: [
      "реферальная программа разработчика",
      "комиссия за клиента",
      "партнёрская программа IT",
      "рекомендовать разработчика",
    ],
  },
  terms: {
    path: "/terms",
    title: "Условия использования",
    description:
      "Условия использования сайта портфолио Алексея Воробьева. Правила работы с материалами и коммерческого сотрудничества.",
    keywords: ["условия использования", "правила сайта", "договор разработки"],
  },
  privacy: {
    path: "/privacy",
    title: "Политика конфиденциальности",
    description:
      "Политика конфиденциальности: как обрабатываются контактные данные, заявки с формы и технические cookie на сайте Алексея Воробьева.",
    keywords: [
      "политика конфиденциальности",
      "персональные данные",
      "обработка заявок",
    ],
  },
}

function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "")
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function createPageMetadata(
  key: PageSeoKey,
  overrides?: Partial<Metadata>
): Metadata {
  const page = pageSeo[key]
  const url = absoluteUrl(page.path)
  const isHome = key === "home"

  return {
    title: isHome
      ? { absolute: page.title }
      : page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    category: "technology",
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": url,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: isHome ? siteConfig.title : `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Full-Stack разработчик`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? siteConfig.title : `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...overrides,
  }
}

export function createProjectMetadata(project: Project): Metadata {
  const path = `/projects/${project.slug}`
  const url = absoluteUrl(path)
  const title = project.title
  const description = project.description
  const image = project.image || siteConfig.ogImage
  const keywords = [
    project.title,
    project.category,
    project.platform,
    ...project.stack,
    "кейс разработки",
    "портфолио",
    siteConfig.name,
  ]

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.author.name }],
    alternates: {
      canonical: url,
      languages: { "ru-RU": url },
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function getSiteUrl() {
  return siteConfig.url.replace(/\/$/, "")
}

export function getSitemapEntries() {
  const staticPaths = Object.values(pageSeo).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: page.path === "/" ? 1 : page.path === "/projects" || page.path === "/services" ? 0.9 : 0.7,
  }))

  const projectPaths = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPaths, ...projectPaths]
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    alternateName: [siteConfig.shortName, siteConfig.brand],
    url: getSiteUrl(),
    image: absoluteUrl(siteConfig.personImage),
    email: siteConfig.author.email,
    jobTitle: [...siteConfig.author.jobTitle],
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Красноярск",
      addressCountry: "RU",
    },
    sameAs: [...siteConfig.author.sameAs],
    knowsAbout: [...siteConfig.author.knowsAbout],
  }
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.brand,
    url: getSiteUrl(),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  }
}

export function buildProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Full-Stack разработка`,
    url: getSiteUrl(),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    email: siteConfig.author.email,
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Красноярск",
      addressCountry: "RU",
    },
    sameAs: [...siteConfig.author.sameAs],
    priceRange: "$$",
    serviceType: [...siteConfig.serviceType],
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image || siteConfig.ogImage),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: getSiteUrl(),
    },
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    keywords: project.stack.join(", "),
    about: project.category,
    inLanguage: "ru",
  }
}

export function buildFaqJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
