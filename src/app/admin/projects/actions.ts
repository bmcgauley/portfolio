"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { requireAdmin, slugify } from "@/lib/admin-helpers";
import {
  bumpAllProjectOrders,
  countFeaturedProjects,
  createProject,
  deleteProject,
  getProjectById,
  reorderProjects,
  setProjectFeatured,
  updateProject,
  type ProjectDoc,
} from "@/lib/projects-db";
import { addManyIfMissing } from "@/lib/taxonomy-db";

const FEATURED_CAP = 5;

type Category = NonNullable<ProjectDoc["category"]>;
const CATEGORIES: readonly Category[] = [
  "Consulting",
  "Academic",
  "Volunteer",
  "Personal",
] as const;

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

function asImageList(v: FormDataEntryValue | null): string[] {
  const raw = asString(v);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is string => typeof x === "string" && x.length > 0,
    );
  } catch {
    return [];
  }
}

/**
 * Accepts either a JSON-encoded string array (from ChipMultiSelect) or a
 * legacy comma-separated string. Returns trimmed, non-empty names.
 */
function asNameList(v: FormDataEntryValue | null): string[] {
  const raw = asString(v);
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((x): x is string => typeof x === "string")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
    } catch {
      // fall through to csv parse
    }
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
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

function asCategory(v: FormDataEntryValue | null): Category | undefined {
  const s = asString(v);
  return (CATEGORIES as readonly string[]).includes(s)
    ? (s as Category)
    : undefined;
}

export async function createProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const title = asString(formData.get("title"));
  const description = asString(formData.get("description"));

  if (!title || !description) {
    redirect("/admin/projects/new?error=MISSING_FIELDS");
  }

  const providedSlug = asString(formData.get("slug"));
  const slug = providedSlug ? slugify(providedSlug) : slugify(title);
  const category = asCategory(formData.get("category"));
  const tags = asCsv(formData.get("tags"));
  const technologies = asNameList(formData.get("technologies"));
  const folderName = asOptionalString(formData.get("folderName"));
  const demoUrl = asOptionalString(formData.get("demoUrl"));
  const githubUrl = asOptionalString(formData.get("githubUrl"));
  const featured = formData.get("featured") === "on";

  const uploadedUrl = asOptionalString(formData.get("uploadedImageUrl"));
  const pastedUrl = asOptionalString(formData.get("imageUrl"));
  const galleryImages = asImageList(formData.get("images"));

  // Uploaded file takes precedence over pasted external URL.
  const imageUrl = uploadedUrl ?? pastedUrl;

  await bumpAllProjectOrders();

  await createProject({
    slug,
    title,
    description,
    tags,
    order: 0,
    ...(category ? { category } : {}),
    ...(technologies.length > 0 ? { technologies } : {}),
    ...(imageUrl ? { imageUrl } : {}),
    ...(galleryImages.length > 0 ? { images: galleryImages } : {}),
    ...(folderName ? { folderName } : {}),
    ...(demoUrl ? { demoUrl } : {}),
    ...(githubUrl ? { githubUrl } : {}),
    featured,
  });

  if (technologies.length > 0) {
    await addManyIfMissing(technologies, "technology");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const existing = await getProjectById(id);
  if (!existing) {
    redirect("/admin/projects");
  }

  const title = asString(formData.get("title"));
  const description = asString(formData.get("description"));

  if (!title || !description) {
    redirect(`/admin/projects/${id}/edit?error=MISSING_FIELDS`);
  }

  const providedSlug = asString(formData.get("slug"));
  const slug = providedSlug ? slugify(providedSlug) : slugify(title);
  const category = asCategory(formData.get("category"));
  const tags = asCsv(formData.get("tags"));
  const technologies = asNameList(formData.get("technologies"));
  const folderName = asOptionalString(formData.get("folderName"));
  const demoUrl = asOptionalString(formData.get("demoUrl"));
  const githubUrl = asOptionalString(formData.get("githubUrl"));
  const featured = formData.get("featured") === "on";

  const uploadedUrl = asOptionalString(formData.get("uploadedImageUrl"));
  const pastedUrl = asOptionalString(formData.get("imageUrl"));
  const newImageUrl = uploadedUrl ?? pastedUrl;
  const galleryImages = asImageList(formData.get("images"));

  let imageUrl: string | undefined = existing.imageUrl;
  if (newImageUrl && newImageUrl !== existing.imageUrl) {
    imageUrl = newImageUrl;
    if (existing.imageUrl && isVercelBlobUrl(existing.imageUrl)) {
      try {
        await del(existing.imageUrl);
      } catch {
        // best-effort blob cleanup
      }
    }
  }

  // Delete blobs that were removed from the gallery in the admin UI.
  const removedGalleryBlobs = (existing.images ?? []).filter(
    (url) => !galleryImages.includes(url) && isVercelBlobUrl(url),
  );
  if (removedGalleryBlobs.length > 0) {
    try {
      await del(removedGalleryBlobs);
    } catch {
      // best-effort
    }
  }

  await updateProject(id, {
    slug,
    title,
    description,
    tags,
    category,
    technologies: technologies.length > 0 ? technologies : undefined,
    imageUrl,
    images: galleryImages.length > 0 ? galleryImages : undefined,
    folderName,
    demoUrl,
    githubUrl,
    featured,
  });

  if (technologies.length > 0) {
    await addManyIfMissing(technologies, "technology");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function reorderProjectsAction(
  orderedIds: string[],
): Promise<void> {
  await requireAdmin();
  await reorderProjects(orderedIds);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function toggleProjectFeaturedAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  if (!id) {
    redirect("/admin/projects?error=MISSING_ID");
  }

  // Hidden "next" field carries the desired state. If absent, default to true
  // (unlikely path; guards against a malformed form).
  const next = formData.get("next") === "true";

  if (next) {
    const currentFeatured = await countFeaturedProjects(id);
    if (currentFeatured >= FEATURED_CAP) {
      redirect(
        `/admin/projects?error=FEATURED_CAP&cap=${FEATURED_CAP}`,
      );
    }
  }

  await setProjectFeatured(id, next);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  if (!id) {
    redirect("/admin/projects?error=MISSING_ID");
  }

  const { blobsToDelete } = await deleteProject(id);

  if (blobsToDelete.length > 0) {
    try {
      await del(blobsToDelete);
    } catch {
      // best-effort blob cleanup; doc is already gone
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}
