/**
 * In-memory rate limiter using a sliding window per key (typically IP address).
 * Resets on server restart / cold start — acceptable for a low-traffic lead-gen site.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 60_000; // 1 minute

/**
 * Check and consume a rate-limit token for the given key.
 * @returns `{ limited: false }` if allowed, `{ limited: true }` if rate-limited.
 */
export function rateLimit(key: string): { limited: boolean } {
  const now = Date.now();

  // Clean up expired entries periodically (every check is cheap enough)
  if (store.size > 1000) {
    for (const [k, entry] of store) {
      if (now > entry.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // First request in this window or window expired
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { limited: true };
  }

  entry.count++;
  return { limited: false };
}
