interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheRepository<T> {
  private readonly store = new Map<string, CacheEntry<T>>();

  constructor (private readonly ttlMs = 1000 * 60 * 5) {}

  get (key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    const now = Date.now();
    if (entry.expiresAt < now) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set (key: string, value: T): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  clear (): void {
    this.store.clear();
  }
}
