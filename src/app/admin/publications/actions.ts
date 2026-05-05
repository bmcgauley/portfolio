"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { requireAdmin, slugify } from "@/lib/admin-helpers";
import {
  bumpAllPublicationOrders,
  countFeaturedPublications,
  createPublication,
  deletePublication,
  getPublicationById,
  reorderPublications,
  setPublicationFeatured,
  updatePublication,
  type AcademicDoc,
  type BookDoc,
  type BookStatus,
  type PublicationDoc,
} from "@/lib/publications-db";

const PUBLICATION_FEATURED_CAP = 4;

type Kind = PublicationDoc["kind"];

function asString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function asOptionalString(v: FormDataEntryValue | null): string | undefined {
  const s = asString(v);
  return s.length > 0 ? s : undefined;
}

function asCsv(v: FormDataEntryValue | null): string[] {
  return asString(v)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function isVercelBlobUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return /\.blob\.vercel-storage\.com$/.test(host);
  } catch {
    return false;
  }
}

function failNew(reason: string): never {
  redirect(`/admin/publications/new?error=${encodeURIComponent(reason)}`);
}

function failEdit(id: string, reason: string): never {
  redirect(
    `/admin/publications/${id}/edit?error=${encodeURIComponent(reason)}`,
  );
}

export async function createPublicationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const kind = asString(formData.get("kind")) as Kind;
  if (kind !== "book" && kind !== "academic") {
    failNew("INVALID_KIND");
  }

  const title = asString(formData.get("title"));
  if (!title) failNew("MISSING_TITLE");

  const slug = asOptionalString(formData.get("slug")) ?? slugify(title);

  await bumpAllPublicationOrders();
  const order = 0;

  const allowDownload = formData.get("allowDownload") === "on";

  if (kind === "book") {
    const subtitle = asString(formData.get("subtitle"));
    const description = asString(formData.get("description"));
    const coverImage = asString(formData.get("coverImageUrl"));
    const status = asString(formData.get("status")) as BookStatus;
    const releaseDate = asString(formData.get("releaseDate"));
    const publisher = asOptionalString(formData.get("publisher"));
    const externalUrl = asOptionalString(formData.get("externalUrl"));
    const pdfUrl = asOptionalString(formData.get("pdfUrl"));
    const tags = asCsv(formData.get("tags"));

    if (!subtitle || !description || !coverImage || !status || !releaseDate) {
      failNew("MISSING_FIELDS");
    }

    const data: Omit<BookDoc, "_id" | "createdAt" | "updatedAt"> = {
      kind: "book",
      slug,
      title,
      subtitle,
      description,
      coverImage,
      status,
      releaseDate,
      order,
      allowDownload,
      ...(publisher ? { publisher } : {}),
      ...(externalUrl ? { externalUrl } : {}),
      ...(pdfUrl ? { pdfUrl } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    };
    await createPublication(data);
  } else {
    const course = asString(formData.get("course"));
    const venue = asOptionalString(formData.get("venue"));
    const yearRaw = asString(formData.get("year"));
    const year = Number.parseInt(yearRaw, 10);
    const abstract = asString(formData.get("abstract"));
    const pdfPath = asString(formData.get("pdfUrl"));
    const authors = asCsv(formData.get("authors"));
    const category = asString(
      formData.get("category"),
    ) as AcademicDoc["category"];
    const tags = asCsv(formData.get("tags"));

    if (
      !course ||
      !abstract ||
      !pdfPath ||
      !category ||
      authors.length === 0 ||
      Number.isNaN(year)
    ) {
      failNew("MISSING_FIELDS");
    }

    const data: Omit<AcademicDoc, "_id" | "createdAt" | "updatedAt"> = {
      kind: "academic",
      slug,
      title,
      course,
      ...(venue ? { venue } : {}),
      year,
      abstract,
      pdfPath,
      authors,
      category,
      order,
      allowDownload,
      ...(tags.length > 0 ? { tags } : {}),
    };
    await createPublication(data);
  }

  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications");
}

export async function updatePublicationAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const existing = await getPublicationById(id);
  if (!existing) redirect("/admin/publications?error=NOT_FOUND");

  const title = asString(formData.get("title"));
  if (!title) failEdit(id, "MISSING_TITLE");

  const slug = asOptionalString(formData.get("slug")) ?? slugify(title);

  const allowDownload = formData.get("allowDownload") === "on";

  if (existing.kind === "book") {
    const subtitle = asString(formData.get("subtitle"));
    const description = asString(formData.get("description"));
    const status = asString(formData.get("status")) as BookStatus;
    const releaseDate = asString(formData.get("releaseDate"));
    const publisher = asOptionalString(formData.get("publisher"));
    const externalUrl = asOptionalString(formData.get("externalUrl"));
    const tags = asCsv(formData.get("tags"));
    const newCoverImage = asString(formData.get("coverImageUrl"));
    const newPdfUrl = asString(formData.get("pdfUrl"));

    if (!subtitle || !description || !status || !releaseDate) {
      failEdit(id, "MISSING_FIELDS");
    }

    let coverImage = existing.coverImage;
    if (newCoverImage && newCoverImage !== existing.coverImage) {
      coverImage = newCoverImage;
      if (isVercelBlobUrl(existing.coverImage)) {
        try {
          await del(existing.coverImage);
        } catch {
          // best-effort blob cleanup
        }
      }
    }

    let pdfUrl: string | undefined = existing.pdfUrl;
    if (newPdfUrl && newPdfUrl !== existing.pdfUrl) {
      pdfUrl = newPdfUrl;
      if (isVercelBlobUrl(existing.pdfUrl)) {
        try {
          await del(existing.pdfUrl as string);
        } catch {
          // best-effort blob cleanup
        }
      }
    }

    await updatePublication(id, {
      slug,
      title,
      subtitle,
      description,
      coverImage,
      status,
      releaseDate,
      publisher,
      externalUrl,
      pdfUrl,
      allowDownload,
      tags: tags.length > 0 ? tags : undefined,
    } as Parameters<typeof updatePublication>[1]);
  } else {
    const course = asString(formData.get("course"));
    const venue = asOptionalString(formData.get("venue"));
    const yearRaw = asString(formData.get("year"));
    const year = Number.parseInt(yearRaw, 10);
    const abstract = asString(formData.get("abstract"));
    const authors = asCsv(formData.get("authors"));
    const category = asString(
      formData.get("category"),
    ) as AcademicDoc["category"];
    const tags = asCsv(formData.get("tags"));
    const newPdfPath = asString(formData.get("pdfUrl"));

    if (
      !course ||
      !abstract ||
      !category ||
      authors.length === 0 ||
      Number.isNaN(year)
    ) {
      failEdit(id, "MISSING_FIELDS");
    }

    let pdfPath = existing.pdfPath;
    if (newPdfPath && newPdfPath !== existing.pdfPath) {
      pdfPath = newPdfPath;
      if (isVercelBlobUrl(existing.pdfPath)) {
        try {
          await del(existing.pdfPath);
        } catch {
          // best-effort blob cleanup
        }
      }
    }

    await updatePublication(id, {
      slug,
      title,
      course,
      venue,
      year,
      abstract,
      pdfPath,
      authors,
      category,
      allowDownload,
      tags: tags.length > 0 ? tags : undefined,
    } as Parameters<typeof updatePublication>[1]);
  }

  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications");
}

export async function reorderPublicationsAction(
  orderedIds: string[],
): Promise<void> {
  await requireAdmin();
  await reorderPublications(orderedIds);
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
}

export async function togglePublicationFeaturedAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const id = asString(formData.get("id"));
  if (!id) redirect("/admin/publications?error=MISSING_ID");
  const next = formData.get("next") === "true";
  if (next) {
    const count = await countFeaturedPublications(id);
    if (count >= PUBLICATION_FEATURED_CAP) {
      redirect(
        `/admin/publications?error=FEATURED_CAP&cap=${PUBLICATION_FEATURED_CAP}`,
      );
    }
  }
  await setPublicationFeatured(id, next);
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  revalidatePath("/");
  redirect("/admin/publications");
}

export async function deletePublicationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  if (!id) redirect("/admin/publications?error=MISSING_ID");

  const { blobsToDelete } = await deletePublication(id);

  const blobUrls = blobsToDelete.filter(isVercelBlobUrl);
  if (blobUrls.length > 0) {
    try {
      await del(blobUrls);
    } catch {
      // best-effort blob cleanup; doc is already gone
    }
  }

  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications");
}
