const MIN_COMPLETION_MS = 1200;
const MAX_PAYLOAD_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

const hits = new Map<string, number[]>();

export function isHoneypotFilled(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function isCompletedTooQuickly(startedAt: number | undefined, now = Date.now()): boolean {
  if (!startedAt) return false;
  if (startedAt > now + 5000) return true;
  return now - startedAt < MIN_COMPLETION_MS;
}

export function payloadTooLarge(byteLength: number): boolean {
  return byteLength > MAX_PAYLOAD_BYTES;
}

function prune(bucket: number[], now: number): number[] {
  return bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
}

export function isRateLimited(key: string, now = Date.now()): boolean {
  const next = prune(hits.get(key) ?? [], now);
  if (next.length >= RATE_LIMIT_MAX) {
    hits.set(key, next);
    return true;
  }
  next.push(now);
  hits.set(key, next);
  return false;
}

export function clientKeyFromRequest(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headersList.get("x-real-ip")?.trim();
  const ip = forwarded || realIp || "unknown";
  let hash = 0;
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash * 31 + ip.charCodeAt(i)) >>> 0;
  }
  return `ip:${hash.toString(16)}`;
}
