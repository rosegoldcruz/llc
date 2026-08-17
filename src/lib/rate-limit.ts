/**
 * Best-effort in-memory rate limiting.
 *
 * On serverless this is per-instance, not global. It stops casual abuse and
 * accidental double submits. If the site starts taking real spam volume,
 * swap this for a shared store (Upstash Redis, Vercel KV) behind the same
 * function signature — nothing else has to change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function rateLimit(key: string, max: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > max) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return `${scope}:${ip}`;
}

/** Periodic cleanup so the map cannot grow without bound on a warm instance. */
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}, WINDOW_MS).unref?.();
