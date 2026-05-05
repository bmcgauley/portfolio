import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface CertificationDoc {
  _id: ObjectId;
  title: string;
  issuer: string;
  date: string;
  description: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "certifications";

async function collection() {
  const db = await getDb();
  return db.collection<CertificationDoc>(COLLECTION);
}

export async function listCertifications(): Promise<CertificationDoc[]> {
  const col = await collection();
  return col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray() as Promise<CertificationDoc[]>;
}

export async function getCertificationById(
  id: string,
): Promise<CertificationDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  return (await col.findOne({ _id: new ObjectId(id) })) ?? null;
}

export async function createCertification(
  data: Omit<CertificationDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<void> {
  const col = await collection();
  const now = new Date();
  await col.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  } as CertificationDoc);
}

export async function updateCertification(
  id: string,
  patch: Partial<Omit<CertificationDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteCertification(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
