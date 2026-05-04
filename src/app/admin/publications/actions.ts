"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { requireAdmin, slugify } from "@/lib/admin-helpers";
import {
  createPublication,
  deletePublication,
  getPublicationById,
  updatePublication,
  type AcademicDoc,
  type DrawnFromDoc,
  type IndependentDoc,
  type PublicationDoc,
} from "@/lib/publications-db";

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

function asFile(v: FormDataEntryValue | null): File | null {
  if (v && typeof v !== "string" && v.size > 0) return v;
  return null;
}

function fileExt(name: string, fallback: string): string {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return fallback;
  return name.slice(dot + 1).toLowerCase() || fallback;
}

async function uploadCover(slug: string, file: File): Promise<string> {
  const ext = fileExt(file.name, "jpg");
  const key = `publications/covers/${slug}-${Date.now()}.${ext}`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
}

async function uploadPdf(slug: string, file: File): Promise<string> {
  const key = `publications/academic/${slug}-${Date.now()}.pdf`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
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
  const title = asString(formData.get("title"));
  if (!title) failNew("MISSING_TITLE");

  const slug =
    asOptionalString(formData.get("slug")) ?? slugify(title);

  if (kind === "drawn-from") {
    const subtitle = asString(formData.get("subtitle"));
    const description = asString(formData.get("description"));
    const status = asString(formData.get("status")) as DrawnFromDoc["status"];
    const releaseDate = asString(formData.get("releaseDate"));
    const externalUrl = asOptionalString(formData.get("externalUrl"));
    const tags = asCsv(formData.get("tags"));
    const file = asFile(formData.get("coverImage"));

    if (!subtitle || !description || !status || !releaseDate || !file) {
      failNew("MISSING_FIELDS");
    }

    const coverImage = await uploadCover(slug, file as File);

    const data: Omit<DrawnFromDoc, "_id" | "createdAt" | "updatedAt"> = {
      kind: "drawn-from",
      slug,
      title,
      subtitle,
      description,
      coverImage,
      status,
      releaseDate,
      ...(externalUrl ? { externalUrl } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    };
    await createPublication(data);
  } else if (kind === "academic") {
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
    const file = asFile(formData.get("pdf"));

    if (
      !course ||
      !abstract ||
      !category ||
      authors.length === 0 ||
      Number.isNaN(year) ||
      !file
    ) {
      failNew("MISSING_FIELDS");
    }

    const pdfPath = await uploadPdf(slug, file as File);

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
      ...(tags.length > 0 ? { tags } : {}),
    };
    await createPublication(data);
  } else if (kind === "independent") {
    const date = asString(formData.get("date"));
    const length = asString(formData.get("length"));
    const url = asString(formData.get("url"));
    const description = asOptionalString(formData.get("description"));

    if (!date || !length || !url) failNew("MISSING_FIELDS");

    const data: Omit<IndependentDoc, "_id" | "createdAt" | "updatedAt"> = {
      kind: "independent",
      slug,
      title,
      date,
      length,
      url,
      ...(description ? { description } : {}),
    };
    await createPublication(data);
  } else {
    failNew("INVALID_KIND");
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
  if (!existing) failEdit(id, "NOT_FOUND");

  const title = asString(formData.get("title"));
  if (!title) failEdit(id, "MISSING_TITLE");

  const slug = asOptionalString(formData.get("slug")) ?? slugify(title);

  if (existing.kind === "drawn-from") {
    const subtitle = asString(formData.get("subtitle"));
    const description = asString(formData.get("description"));
    const status = asString(formData.get("status")) as DrawnFromDoc["status"];
    const releaseDate = asString(formData.get("releaseDate"));
    const externalUrl = asOptionalString(formData.get("externalUrl"));
    const tags = asCsv(formData.get("tags"));
    const file = asFile(formData.get("coverImage"));

    if (!subtitle || !description || !status || !releaseDate) {
      failEdit(id, "MISSING_FIELDS");
    }

    let coverImage = existing.coverImage;
    if (file) {
      const newUrl = await uploadCover(slug, file);
      const oldUrl = existing.coverImage;
      coverImage = newUrl;
      if (oldUrl && oldUrl !== newUrl) {
        try {
          await del(oldUrl);
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
      externalUrl,
      tags: tags.length > 0 ? tags : undefined,
    } as Parameters<typeof updatePublication>[1]);
  } else if (existing.kind === "academic") {
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
    const file = asFile(formData.get("pdf"));

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
    if (file) {
      const newUrl = await uploadPdf(slug, file);
      const oldUrl = existing.pdfPath;
      pdfPath = newUrl;
      if (oldUrl && oldUrl !== newUrl) {
        try {
          await del(oldUrl);
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
      tags: tags.length > 0 ? tags : undefined,
    } as Parameters<typeof updatePublication>[1]);
  } else {
    const date = asString(formData.get("date"));
    const length = asString(formData.get("length"));
    const url = asString(formData.get("url"));
    const description = asOptionalString(formData.get("description"));

    if (!date || !length || !url) failEdit(id, "MISSING_FIELDS");

    await updatePublication(id, {
      slug,
      title,
      date,
      length,
      url,
      description,
    } as Parameters<typeof updatePublication>[1]);
  }

  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications");
}

export async function deletePublicationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  if (!id) redirect("/admin/publications?error=MISSING_ID");

  const { blobsToDelete } = await deletePublication(id);

  if (blobsToDelete.length > 0) {
    try {
      await del(blobsToDelete);
    } catch {
      // best-effort blob cleanup; doc is already gone
    }
  }

  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications");
}
