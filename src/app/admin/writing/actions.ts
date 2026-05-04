"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, slugify } from "@/lib/admin-helpers";
import {
  createEssay,
  deleteEssay,
  getEssayById,
  updateEssay,
} from "@/lib/essays-db";

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createEssayAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const title = str(formData.get("title"));
  const body = str(formData.get("body"));

  if (!title || !body) {
    redirect("/admin/writing/new?error=MISSING_FIELDS");
  }

  const subtitle = str(formData.get("subtitle"));
  const providedSlug = str(formData.get("slug"));
  const slug = providedSlug ? slugify(providedSlug) : slugify(title);
  const date = str(formData.get("date"));
  const readingTime = str(formData.get("readingTime"));
  const excerpt = str(formData.get("excerpt"));
  const tags = parseTags(formData.get("tags"));
  const published = formData.get("published") === "on";

  await createEssay({
    slug,
    title,
    subtitle,
    date,
    readingTime,
    excerpt,
    body,
    tags: tags.length > 0 ? tags : undefined,
    published,
  });

  revalidatePath("/admin/writing");
  revalidatePath("/writing");
  redirect("/admin/writing");
}

export async function updateEssayAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const existing = await getEssayById(id);
  if (!existing) {
    redirect("/admin/writing");
  }

  const title = str(formData.get("title"));
  const body = str(formData.get("body"));

  if (!title || !body) {
    redirect(`/admin/writing/${id}/edit?error=MISSING_FIELDS`);
  }

  const subtitle = str(formData.get("subtitle"));
  const providedSlug = str(formData.get("slug"));
  const slug = providedSlug ? slugify(providedSlug) : slugify(title);
  const date = str(formData.get("date"));
  const readingTime = str(formData.get("readingTime"));
  const excerpt = str(formData.get("excerpt"));
  const tags = parseTags(formData.get("tags"));
  const published = formData.get("published") === "on";

  await updateEssay(id, {
    slug,
    title,
    subtitle,
    date,
    readingTime,
    excerpt,
    body,
    tags: tags.length > 0 ? tags : undefined,
    published,
  });

  revalidatePath("/admin/writing");
  revalidatePath("/writing");
  revalidatePath(`/writing/${slug}`);
  redirect("/admin/writing");
}

export async function deleteEssayAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData.get("id"));
  if (!id) {
    redirect("/admin/writing");
  }

  await deleteEssay(id);

  revalidatePath("/admin/writing");
  revalidatePath("/writing");
  redirect("/admin/writing");
}

export async function togglePublishAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData.get("id"));
  if (!id) {
    redirect("/admin/writing");
  }

  const existing = await getEssayById(id);
  if (!existing) {
    redirect("/admin/writing");
  }

  await updateEssay(id, { published: !existing.published });

  revalidatePath("/admin/writing");
  revalidatePath("/writing");
  revalidatePath(`/writing/${existing.slug}`);
  redirect("/admin/writing");
}
