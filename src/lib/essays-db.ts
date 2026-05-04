import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface EssayDoc {
  _id: ObjectId;
  slug: string;
  title: string;
  subtitle: string;
  date: string; // ISO 8601 (e.g. "2026-04-20")
  readingTime: string; // e.g. "6 min"
  excerpt: string;
  body: string;
  tags?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "essays";

async function collection() {
  const db = await getDb();
  return db.collection<EssayDoc>(COLLECTION);
}

export async function listEssays(opts?: {
  includeDrafts?: boolean;
}): Promise<EssayDoc[]> {
  const col = await collection();
  const filter = opts?.includeDrafts ? {} : { published: true };
  const docs = await col.find(filter).sort({ date: -1 }).toArray();
  return docs as EssayDoc[];
}

export async function getEssayById(id: string): Promise<EssayDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return (doc as EssayDoc | null) ?? null;
}

export async function getEssayBySlug(slug: string): Promise<EssayDoc | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return (doc as EssayDoc | null) ?? null;
}

export async function createEssay(
  data: Omit<EssayDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<EssayDoc> {
  const col = await collection();
  const now = new Date();
  const toInsert = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as Omit<EssayDoc, "_id">;
  const result = await col.insertOne(toInsert as unknown as EssayDoc);
  return { ...(toInsert as object), _id: result.insertedId } as EssayDoc;
}

export async function updateEssay(
  id: string,
  patch: Partial<Omit<EssayDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteEssay(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
