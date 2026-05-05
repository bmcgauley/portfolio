import { getDb } from "@/lib/mongodb";

export interface SiteSettingsDoc {
  _id: "site";
  logoUrl?: string;
  faviconUrl?: string;
  /** Navbar logo height in pixels at md+ breakpoints. Default 48. */
  logoNavHeight?: number;
  /** Homepage hero logo max-width in pixels. Default 400. */
  logoHeroMaxWidth?: number;
  updatedAt: Date;
}

const COLLECTION = "siteSettings";
const SINGLETON_ID = "site" as const;

async function collection() {
  const db = await getDb();
  return db.collection<SiteSettingsDoc>(COLLECTION);
}

export async function getSiteSettings(): Promise<SiteSettingsDoc | null> {
  try {
    const col = await collection();
    return await col.findOne({ _id: SINGLETON_ID });
  } catch {
    return null;
  }
}

export async function updateSiteSettings(
  patch: Partial<Omit<SiteSettingsDoc, "_id" | "updatedAt">>,
): Promise<void> {
  const col = await collection();
  await col.updateOne(
    { _id: SINGLETON_ID },
    {
      $set: { ...patch, updatedAt: new Date() },
      $setOnInsert: { _id: SINGLETON_ID },
    },
    { upsert: true },
  );
}

export async function unsetSiteSettingField(
  field: "logoUrl" | "faviconUrl",
): Promise<void> {
  const col = await collection();
  await col.updateOne(
    { _id: SINGLETON_ID },
    {
      $unset: { [field]: "" },
      $set: { updatedAt: new Date() },
    },
  );
}
