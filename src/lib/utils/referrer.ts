const STORAGE_KEY = "referrer";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface StoredReferrer {
  value: string;
  expiresAt: number;
}

export function storeReferrer(value: string): void {
  const data: StoredReferrer = { value, expiresAt: Date.now() + TTL_MS };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStoredReferrer(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, expiresAt } = JSON.parse(raw) as StoredReferrer;
    if (expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}
