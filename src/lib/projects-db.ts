import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

/**
 * Mongo-backed Project document.
 *
 * Mirrors the public `Project` interface in `@/lib/types.ts`, but with
 * Mongo-native primary key (`_id`) and a canonical `slug` replacing the
 * public-side `id` string. `featured` is required on every doc (defaults
 * to false on create) so list-sort and filter logic never branches on
 * undefined.
 */
export interface ProjectDoc {
  _id: ObjectId;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category?: "Consulting" | "Academic" | "Volunteer" | "Personal";
  technologies?: string[];
  imageUrl?: string;
  folderName?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "projects";

async function collection() {
  const db = await getDb();
  return db.collection<ProjectDoc>(COLLECTION);
}

function isVercelBlobUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function listProjects(): Promise<ProjectDoc[]> {
  const col = await collection();
  const docs = await col
    .find({})
    .sort({ featured: -1, createdAt: -1 })
    .toArray();
  return docs as ProjectDoc[];
}

export async function getProjectById(id: string): Promise<ProjectDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return (doc as ProjectDoc | null) ?? null;
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDoc | null> {
  const col = await collection();
  const doc = await col.findOne({ slug });
  return (doc as ProjectDoc | null) ?? null;
}

export async function createProject(
  data: Omit<ProjectDoc, "_id" | "createdAt" | "updatedAt">,
): Promise<ProjectDoc> {
  const col = await collection();
  const now = new Date();
  const toInsert = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as Omit<ProjectDoc, "_id">;
  const result = await col.insertOne(toInsert as unknown as ProjectDoc);
  return { ...(toInsert as object), _id: result.insertedId } as ProjectDoc;
}

export async function updateProject(
  id: string,
  patch: Partial<Omit<ProjectDoc, "_id" | "createdAt">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } },
  );
}

export async function deleteProject(
  id: string,
): Promise<{ blobsToDelete: string[] }> {
  if (!ObjectId.isValid(id)) return { blobsToDelete: [] };
  const col = await collection();
  const existing = await col.findOne({ _id: new ObjectId(id) });
  const blobs: string[] = [];
  if (existing) {
    if (isVercelBlobUrl(existing.imageUrl)) {
      blobs.push(existing.imageUrl as string);
    }
    await col.deleteOne({ _id: new ObjectId(id) });
  }
  return { blobsToDelete: blobs };
}
