import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface InvolvementDoc {
  _id: ObjectId;
  org: string;
  date: string;
  description: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "involvements";

async function collection() {
  const db = await getDb();
  return db.collection<InvolvementDoc>(COLLECTION);
}

export async function listInvolvements(): Promise<InvolvementDoc[]> {
  const col = await collection();
  return col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray() as Promise<InvolvementDoc[]>;
}

export async function getInvolvementById(
  id: string,
): Promise<InvolvementDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return (await col.findOne({ _id: new ObjectId(id) })) ?? null;
}

export async function createInvolvement(
  data: Omit<InvolvementDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<void> {
  const col = await collection();
  const now = new Date();
  await col.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as InvolvementDoc);
}

export async function updateInvolvement(
  id: string,
  patch: Partial<Omit<InvolvementDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteInvolvement(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
