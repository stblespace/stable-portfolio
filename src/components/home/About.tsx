"use client"
export default function About() {
  const stats = [
    { value: "2+", label: "Года опыта" },
    { value: "10+", label: "Проектов" },
    { value: "8+", label: "Клиентов" },
  ]

  const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "Firebase"] },
    { category: "Инструменты", items: ["Git", "Figma", "Docker"] },
  ]

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Обо мне
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Карточка 1 — текст + статистика */}
          <div className="lg:col-span-2 gradient-border rounded-2xl bg-neutral-900 p-8">
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>Привет! Я Алексей, Full-Stack разработчик из Москвы.</p>
              <p>Разрабатываю современные веб-приложения на React и Next.js. Люблю чистый код и продуманный дизайн.</p>
              <p>Работаю с клиентами напрямую — без лишних посредников. Ценю чёткие задачи и честные дедлайны.</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-neutral-700">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-[#D7263D]">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Карточка 2 — фото */}
          <div className="gradient-border rounded-2xl bg-neutral-900 p-4 flex flex-col">
            <div className="flex-1 bg-neutral-800 rounded-xl min-h-64 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Фото скоро</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3 italic">
              Алексей Воробьев, Full-Stack разработчик
            </p>
          </div>

          {/* Карточка 3 — Tech Stack */}
          <div className="lg:col-span-3 gradient-border rounded-2xl bg-neutral-900 p-8">
            <h3 className="text-white font-semibold text-lg mb-6">Tech Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {techStack.map((group) => (
                <div key={group.category}>
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-neutral-800 text-gray-300 text-sm rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}