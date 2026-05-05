import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface ExperienceDoc {
  _id: ObjectId;
  position: string;
  company: string;
  startDate: string;
  /** null = currently held; otherwise an end date string. */
  endDate: string | null;
  description: string;
  skills?: string[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "experiences";

async function collection() {
  const db = await getDb();
  return db.collection<ExperienceDoc>(COLLECTION);
}

export async function listExperiences(): Promise<ExperienceDoc[]> {
  const col = await collection();
  return col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray() as Promise<ExperienceDoc[]>;
}

export async function getExperienceById(
  id: string,
): Promise<ExperienceDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return (await col.findOne({ _id: new ObjectId(id) })) ?? null;
}

export async function createExperience(
  data: Omit<ExperienceDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<void> {
  const col = await collection();
  const now = new Date();
  await col.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as ExperienceDoc);
}

export async function updateExperience(
  id: string,
  patch: Partial<Omit<ExperienceDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteExperience(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
