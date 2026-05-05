import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface AchievementDoc {
  _id: ObjectId;
  title: string;
  date: string;
  description: string;
  citation?: string;
  citationUrl?: string;
  order: number;
  /** When true, surfaces in the home page Recent Achievements grid. */
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "achievements";

async function collection() {
  const db = await getDb();
  return db.collection<AchievementDoc>(COLLECTION);
}

export async function listAchievements(): Promise<AchievementDoc[]> {
  const col = await collection();
  const docs = await col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return docs as AchievementDoc[];
}

export async function getAchievementById(
  id: string,
): Promise<AchievementDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return (doc as AchievementDoc | null) ?? null;
}

export async function createAchievement(
  data: Omit<AchievementDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<AchievementDoc> {
  const col = await collection();
  const now = new Date();
  const toInsert = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as Omit<AchievementDoc, "_id">;
  const result = await col.insertOne(toInsert as unknown as AchievementDoc);
  return { ...(toInsert as object), _id: result.insertedId } as AchievementDoc;
}

export async function updateAchievement(
  id: string,
  patch: Partial<Omit<AchievementDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteAchievement(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderAchievements(orderedIds: string[]): Promise<void> {
  const valid = orderedIds.filter((id) => ObjectId.isValid(id));
  if (valid.length === 0) return;
  const col = await collection();
  const now = new Date();
  await col.bulkWrite(
    valid.map((id, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { order: index, updatedAt: now } },
      },
    })),
  );
}

export async function bumpAllAchievementOrders(): Promise<void> {
  const col = await collection();
  await col.updateMany({}, { $inc: { order: 1 }, $set: { updatedAt: new Date() } });
}

export async function countFeaturedAchievements(
  excludeId?: string,
): Promise<number> {
  const col = await collection();
  const filter: Record<string, unknown> = { featured: true };
  if (excludeId && ObjectId.isValid(excludeId)) {
    filter._id = { $ne: new ObjectId(excludeId) };
  }
  return col.countDocuments(filter);
}

export async function setAchievementFeatured(
  id: string,
  featured: boolean,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { featured, updatedAt: new Date() } },
  );
}
