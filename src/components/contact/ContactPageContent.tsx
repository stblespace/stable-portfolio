"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Reveal } from "@/components/ui/Reveal"
import { contactInfo } from "@/config/contact"

const MAX_MESSAGE = 5000

type FormStatus = "idle" | "loading" | "success" | "error"

function useLocalTime(timeZone: string) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!now) {
    return { hours: "--", minutes: "--", seconds: "--" }
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00"

  return {
    hours: get("hour"),
    minutes: get("minute"),
    seconds: get("second"),
  }
}

export default function ContactPageContent() {
  const time = useLocalTime(contactInfo.timezone)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website: honeypot,
        }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Не удалось отправить сообщение")
        return
      }

      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setHoneypot("")
    } catch {
      setStatus("error")
      setErrorMessage("Ошибка сети. Проверьте соединение и попробуйте снова.")
    }
  }

  const inputClass =
    "w-full rounded-xl bg-neutral-950 border border-white/10 px-4 py-3 xxl:px-5! xxl:py-3.5! text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D7263D]/60 transition-colors font-montserrat text-sm xxl:text-base! disabled:opacity-60"

  return (
    <section className="pt-4 pb-24 px-3 sm:px-6">
      <div className="max-w-6xl xxl:max-w-7xl! mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-6xl xxl:text-7xl! 3xl:text-8xl! font-bold text-white text-center">
            Свяжитесь со мной
          </h1>
          <p className="text-gray-400 text-base md:text-lg xxl:text-xl! text-center mt-3">
            Есть проект? Давайте обсудим.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xxl:gap-6! mt-10 xxl:mt-12!">
          <Reveal y={40}>
            <div className="gradient-border-hover rounded-2xl h-full">
              <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 xxl:p-10! h-full">
                <h2 className="flex items-center gap-2 text-white font-semibold text-lg xxl:text-xl! mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#D7263D]" />
                  Написать сообщение
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot for bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="sr-only">Имя</span>
                      <input
                        required
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя *"
                        disabled={status === "loading"}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">Email</span>
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email *"
                        disabled={status === "loading"}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="sr-only">Тема</span>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Тема *"
                      disabled={status === "loading"}
                      className={inputClass}
                    />
                  </label>

                  <label className="block relative">
                    <span className="sr-only">Сообщение</span>
                    <textarea
                      required
                      name="message"
                      value={message}
                      maxLength={MAX_MESSAGE}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Сообщение *"
                      rows={8}
                      disabled={status === "loading"}
                      className={`${inputClass} resize-none min-h-40 pb-8`}
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-gray-500 font-montserrat">
                      {message.length} / {MAX_MESSAGE}
                    </span>
                  </label>

                  {status === "success" && (
                    <p className="text-sm text-emerald-400 font-montserrat">
                      Сообщение отправлено. Отвечу как можно скорее — обычно в течение дня.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-[#ff6b7a] font-montserrat">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#D7263D] text-white font-montserrat font-medium py-3.5 xxl:py-4! xxl:text-lg! rounded-full hover:bg-[#c01f35] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Отправка…" : "Отправить →"}
                  </button>
                </form>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={40}>
            <div className="gradient-border-hover rounded-2xl h-full">
              <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 xxl:p-10! h-full flex flex-col gap-5">
                <div className="rounded-2xl bg-neutral-950 border border-white/5 p-5 xxl:p-6!">
                  <p className="text-xs xxl:text-sm! uppercase tracking-wider text-gray-500 mb-3">
                    Местное время
                  </p>
                  <p className="font-montserrat text-5xl xxl:text-6xl! font-semibold text-white tabular-nums tracking-tight">
                    {time.hours}:{time.minutes}
                    <span className="text-[#D7263D] text-2xl xxl:text-3xl! ml-1 align-top">
                      {time.seconds}
                    </span>
                  </p>
                  <p className="mt-3 text-sm xxl:text-base! text-gray-400">
                    {contactInfo.location} · {contactInfo.gmtLabel}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-950 border border-white/5 p-4 xxl:p-5! flex items-center gap-4">
                  <div className="w-11 h-11 xxl:w-12! xxl:h-12! rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#D7263D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white text-sm xxl:text-base! truncate block hover:text-[#ff6b7a] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-[#ff6b7a] hover:bg-[#D7263D]/10 transition-colors"
                    aria-label="Скопировать email"
                    title={copied ? "Скопировано" : "Скопировать"}
                  >
                    {copied ? (
                      <svg className="w-5 h-5 text-[#D7263D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#D7263D]/40 px-4 py-2.5 text-sm xxl:text-base! text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-[#D7263D] animate-pulse" />
                    {contactInfo.status}
                  </div>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm xxl:text-base! text-white hover:border-[#D7263D] hover:bg-[#D7263D]/15 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
