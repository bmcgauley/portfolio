import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface EngagementDoc {
  _id: ObjectId;
  org: string;
  role: string;
  date: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "engagements";

async function collection() {
  const db = await getDb();
  return db.collection<EngagementDoc>(COLLECTION);
}

export async function listEngagements(): Promise<EngagementDoc[]> {
  const col = await collection();
  return col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray() as Promise<EngagementDoc[]>;
}

export async function getEngagementById(
  id: string,
): Promise<EngagementDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return (await col.findOne({ _id: new ObjectId(id) })) ?? null;
}

export async function createEngagement(
  data: Omit<EngagementDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<void> {
  const col = await collection();
  const now = new Date();
  await col.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as EngagementDoc);
}

export async function updateEngagement(
  id: string,
  patch: Partial<Omit<EngagementDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteEngagement(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
