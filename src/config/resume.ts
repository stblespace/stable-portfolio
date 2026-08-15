import { techNamesByCategory } from "@/config/abouts"

export const resumeProfile = {
  name: "Алексей Воробьев",
  rolePrimary: "Full-Stack Разработчик",
  roleSecondary: "Веб и цифровые продукты",
  stackLine: "Next.js / React • Elixir / GO • Flutter",
  bio: "Более 2 лет создаю цифровые продукты для клиентов по всему миру. Специализируюсь на веб-разработке, лендингах, интернет-магазинах и веб-приложениях. Также делаю чат-ботов. Живу в Красноярске — работаю с клиентами удалённо.",
  location: "Красноярск, Россия (UTC+7)",
  photo: "/me.jpg",
  photoAlt: "Алексей Воробьев",
}

export type SkillGroup = {
  id: string
  title: string
  icon: "backend" | "frontend" | "mobile" | "web" | "tools"
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    items: techNamesByCategory("Frontend"),
  },
  {
    id: "backend",
    title: "Backend",
    icon: "backend",
    items: techNamesByCategory("Backend"),
  },
  {
    id: "web",
    title: "Platforms",
    icon: "web",
    items: techNamesByCategory("Platforms"),
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "mobile",
    items: techNamesByCategory("Mobile"),
  },
  {
    id: "tools",
    title: "Tools",
    icon: "tools",
    items: techNamesByCategory("Tools"),
  },
]

export type EducationItem = {
  title: string
  subtitle: string
  meta: string
  icon: "grad" | "bulb"
}

export const educationItems: EducationItem[] = [
  {
    title: "Высшее образование. Бакалавр",
    subtitle: "СибГУ им. М.Ф. Решетнева",
    meta: "2019 - 2023",
    icon: "grad",
  },
  {
    title: "Самообразование",
    subtitle: "Постоянное обучение новым технологиями и инструментам",
    meta: "2023 — сейчас",
    icon: "bulb",
  },
  {
    title: "Коммерческая практика",
    subtitle: "Клиентские проекты и продукт-разработка",
    meta: "2023 - по настоящее время",
    icon: "bulb",
  },
]
