import { Resend } from "resend"
import { contactInfo } from "@/config/contact"
import { getClientIp, rateLimit } from "@/lib/rate-limit"

const MAX_MESSAGE = 5000
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const IP_LIMIT = 3
const IP_WINDOW_MS = 15 * 60 * 1000

const EMAIL_LIMIT = 3
const EMAIL_WINDOW_MS = 60 * 60 * 1000

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string // honeypot
}

function badRequest(message: string) {
  return Response.json({ ok: false, error: message }, { status: 400 })
}

function tooManyRequests(retryAfterSec: number) {
  return Response.json(
    {
      ok: false,
      error: `Слишком много сообщений. Попробуйте через ${formatRetry(retryAfterSec)}.`,
    },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    }
  )
}

function formatRetry(seconds: number) {
  if (seconds < 60) return `${seconds} сек`
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} мин`
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Почтовый сервис не настроен" },
      { status: 500 }
    )
  }

  const ip = getClientIp(request)
  const ipLimit = rateLimit(`contact:ip:${ip}`, {
    limit: IP_LIMIT,
    windowMs: IP_WINDOW_MS,
  })
  if (!ipLimit.ok) {
    return tooManyRequests(ipLimit.retryAfterSec)
  }

  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return badRequest("Некорректный запрос")
  }

  // Honeypot — боты заполняют скрытое поле
  if (body.website) {
    return Response.json({ ok: true })
  }

  const name = body.name?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const subject = body.subject?.trim() ?? ""
  const message = body.message?.trim() ?? ""

  if (!name || name.length < 2 || name.length > 100) {
    return badRequest("Укажите корректное имя")
  }
  if (!email || !emailRegex.test(email) || email.length > 200) {
    return badRequest("Укажите корректный email")
  }
  if (!subject || subject.length < 2 || subject.length > 200) {
    return badRequest("Укажите тему сообщения")
  }
  if (!message || message.length < 10 || message.length > MAX_MESSAGE) {
    return badRequest("Сообщение слишком короткое или длинное")
  }

  const emailLimit = rateLimit(`contact:email:${email.toLowerCase()}`, {
    limit: EMAIL_LIMIT,
    windowMs: EMAIL_WINDOW_MS,
  })
  if (!emailLimit.ok) {
    return tooManyRequests(emailLimit.retryAfterSec)
  }

  const to = process.env.CONTACT_TO || contactInfo.email
  const from =
    process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>"

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[Сайт] ${subject}`,
    text: [
      "Новое сообщение с формы контактов",
      "",
      `Имя: ${name}`,
      `Email: ${email}`,
      `Тема: ${subject}`,
      "",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin: 0 0 16px;">Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Тема:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  })

  if (error) {
    console.error("Resend error:", error)
    return Response.json(
      { ok: false, error: "Не удалось отправить сообщение. Попробуйте позже." },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
