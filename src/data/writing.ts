export type Essay = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string;
  tags?: string[];
};

// Hardcoded fallback. Becomes dead code after Phase F migration.
const fallbackEssays: Essay[] = [];

/**
 * DB-first loader. Returns published essays from MongoDB; falls back to
 * the hardcoded `fallbackEssays` array if DB is empty or unreachable.
 *
 * `includeDrafts` flag is reserved for future preview routes — public
 * surfaces should never set it.
 */
export async function loadEssays(opts?: {
  includeDrafts?: boolean;
}): Promise<Essay[]> {
  try {
    const { listEssays } = await import("@/lib/essays-db");
    const docs = await listEssays({ includeDrafts: opts?.includeDrafts });
    if (docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        subtitle: d.subtitle,
        date: d.date,
        readingTime: d.readingTime,
        excerpt: d.excerpt,
        body: d.body,
        tags: d.tags,
      }));
    }
  } catch {
    // DB unreachable — fall through
  }
  return fallbackEssays;
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  try {
    const { getEssayBySlug: getFromDb } = await import("@/lib/essays-db");
    const doc = await getFromDb(slug);
    if (doc && doc.published) {
      return {
        slug: doc.slug,
        title: doc.title,
        subtitle: doc.subtitle,
        date: doc.date,
        readingTime: doc.readingTime,
        excerpt: doc.excerpt,
        body: doc.body,
        tags: doc.tags,
      };
    }
  } catch {
    // DB unreachable — fall through
  }
  return fallbackEssays.find((e) => e.slug === slug) ?? null;
}

// Legacy export for any code that still imports `essays` directly. Empty
// array — callers should switch to `loadEssays()` for DB-aware results.
export const essays: Essay[] = fallbackEssays;
