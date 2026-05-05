import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

interface BasePub {
  _id: ObjectId;
  kind: "book" | "academic";
  slug: string;
  /** Manual sort weight; lower = earlier. Tie-break by date/year desc. */
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BookStatus =
  | "in-progress"
  | "coming-soon"
  | "pre-order"
  | "available";

export interface BookDoc extends BasePub {
  kind: "book";
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  status: BookStatus;
  releaseDate: string;
  /** Free-text imprint/publisher, e.g. "Drawn From Publishing", "Self-Published". */
  publisher?: string;
  externalUrl?: string;
  /** Optional direct PDF if the book is also hostable on-site. */
  pdfUrl?: string;
  /** Whether the PDF (if any) is downloadable on the public viewer. */
  allowDownload?: boolean;
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
  /** Whether the PDF is downloadable on the public viewer. Defaults to true. */
  allowDownload?: boolean;
  tags?: string[];
}

export type PublicationDoc = BookDoc | AcademicDoc;

const COLLECTION = "publications";

async function collection() {
  const db = await getDb();
  return db.collection<PublicationDoc>(COLLECTION);
}

export async function listPublications(): Promise<PublicationDoc[]> {
  const col = await collection();
  const docs = await col
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();
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
  await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

export async function reorderPublications(orderedIds: string[]): Promise<void> {
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

export async function bumpAllPublicationOrders(): Promise<void> {
  const col = await collection();
  await col.updateMany({}, { $inc: { order: 1 }, $set: { updatedAt: new Date() } });
}

export async function deletePublication(
  id: string,
): Promise<{ blobsToDelete: string[] }> {
  if (!ObjectId.isValid(id)) return { blobsToDelete: [] };
  const col = await collection();
  const existing = await col.findOne({ _id: new ObjectId(id) });
  const blobs: string[] = [];
  if (existing) {
    if (existing.kind === "book") {
      if (existing.coverImage) blobs.push(existing.coverImage);
      if (existing.pdfUrl) blobs.push(existing.pdfUrl);
    } else if (existing.kind === "academic" && existing.pdfPath) {
      blobs.push(existing.pdfPath);
    }
    await col.deleteOne({ _id: new ObjectId(id) });
  }
  return { blobsToDelete: blobs };
}
