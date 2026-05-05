import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type TaxonomyKind = "skill" | "technology" | "hobby";

export interface TaxonomyDoc {
  _id: ObjectId;
  kind: TaxonomyKind;
  /** Display name. Unique per kind (case-insensitive). */
  name: string;
  /** Optional grouping label, e.g. "Frontend Development" for skills. */
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "taxonomy";

async function collection() {
  const db = await getDb();
  return db.collection<TaxonomyDoc>(COLLECTION);
}

export async function listTaxonomy(
  kind?: TaxonomyKind,
): Promise<TaxonomyDoc[]> {
  const col = await collection();
  const filter = kind ? { kind } : {};
  return col
    .find(filter)
    .sort({ kind: 1, category: 1, name: 1 })
    .toArray() as Promise<TaxonomyDoc[]>;
}

export async function addTaxonomy(input: {
  name: string;
  kind: TaxonomyKind;
  category?: string;
}): Promise<void> {
  const trimmed = input.name.trim();
  if (!trimmed) return;
  const col = await collection();
  const now = new Date();
  // Case-insensitive uniqueness per kind.
  await col.updateOne(
    {
      kind: input.kind,
      name: { $regex: `^${escapeRegex(trimmed)}$`, $options: "i" },
    },
    {
      $setOnInsert: {
        kind: input.kind,
        name: trimmed,
        createdAt: now,
      },
      $set: {
        updatedAt: now,
        ...(input.category ? { category: input.category } : {}),
      },
    },
    { upsert: true },
  );
}

export async function deleteTaxonomy(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

/**
 * Add any names that don't already exist in the given kind.
 * Used to auto-populate the library when new ad-hoc entries are added
 * via a project / achievement form.
 */
export async function addManyIfMissing(
  names: string[],
  kind: TaxonomyKind,
): Promise<void> {
  const trimmed = names.map((n) => n.trim()).filter((n) => n.length > 0);
  if (trimmed.length === 0) return;
  for (const name of trimmed) {
    await addTaxonomy({ name, kind });
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
