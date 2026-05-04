import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

interface BasePub {
  _id: ObjectId;
  kind: "drawn-from" | "academic" | "independent";
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DrawnFromDoc extends BasePub {
  kind: "drawn-from";
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  status: "available" | "pre-order" | "coming-soon";
  releaseDate: string;
  externalUrl?: string;
  tags?: string[];
}

export interface AcademicDoc extends BasePub {
  kind: "academic";
  title: string;
  course: string;
  venue?: string;
  year: number;
  abstract: string;
  pdfPath: string;
  authors: string[];
  category: "academic" | "group-projects" | "external";
  tags?: string[];
}

export interface IndependentDoc extends BasePub {
  kind: "independent";
  title: string;
  date: string;
  length: string;
  url: string;
  description?: string;
}

export type PublicationDoc = DrawnFromDoc | AcademicDoc | IndependentDoc;

const COLLECTION = "publications";

async function collection() {
  const db = await getDb();
  return db.collection<PublicationDoc>(COLLECTION);
}

export async function listPublications(): Promise<PublicationDoc[]> {
  const col = await collection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs as PublicationDoc[];
}

export async function getPublicationById(
  id: string,
): Promise<PublicationDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return (doc as PublicationDoc | null) ?? null;
}

export async function createPublication(
  data: Omit<PublicationDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<PublicationDoc> {
  const col = await collection();
  const now = new Date();
  const toInsert = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as Omit<PublicationDoc, "_id">;
  const result = await col.insertOne(toInsert as unknown as PublicationDoc);
  return { ...(toInsert as object), _id: result.insertedId } as PublicationDoc;
}

export async function updatePublication(
  id: string,
  patch: Partial<Omit<PublicationDoc, "_id" | "kind" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  const update = { ...patch, updatedAt: new Date() } as Record<string, unknown>;
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: update },
  );
}

export async function deletePublication(
  id: string,
): Promise<{ blobsToDelete: string[] }> {
  if (!ObjectId.isValid(id)) return { blobsToDelete: [] };
  const col = await collection();
  const existing = await col.findOne({ _id: new ObjectId(id) });
  const blobs: string[] = [];
  if (existing) {
    if (existing.kind === "drawn-from" && existing.coverImage) {
      blobs.push(existing.coverImage);
    } else if (existing.kind === "academic" && existing.pdfPath) {
      blobs.push(existing.pdfPath);
    }
    await col.deleteOne({ _id: new ObjectId(id) });
  }
  return { blobsToDelete: blobs };
}
