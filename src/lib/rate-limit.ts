type RateLimitEntry = {
  timestamps: number[]
}

type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number }

const store = new Map<string, RateLimitEntry>()

export function rateLimit(
  key: string,
  {
    limit,
    windowMs,
  }: {
    limit: number
    windowMs: number
  }
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key) ?? { timestamps: [] }
  const recent = entry.timestamps.filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    const oldest = recent[0]!
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000))
    store.set(key, { timestamps: recent })
    return { ok: false, retryAfterSec }
  }

  recent.push(now)
  store.set(key, { timestamps: recent })

  if (store.size > 2000) {
    for (const [k, v] of store) {
      const kept = v.timestamps.filter((t) => now - t < windowMs)
      if (kept.length === 0) store.delete(k)
      else store.set(k, { timestamps: kept })
    }
  }

  return { ok: true, remaining: limit - recent.length }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }

  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  )
}
