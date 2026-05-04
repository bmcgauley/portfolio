"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { requireAdmin, slugify } from "@/lib/admin-helpers";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
  type ProjectDoc,
} from "@/lib/projects-db";

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

function asFile(v: FormDataEntryValue | null): File | null {
  if (v && typeof v !== "string" && v.size > 0) return v;
  return null;
}

function fileExt(name: string, fallback: string): string {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return fallback;
  return name.slice(dot + 1).toLowerCase() || fallback;
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

async function uploadProjectImage(slug: string, file: File): Promise<string> {
  const ext = fileExt(file.name, "jpg");
  const key = `projects/${slug}-${Date.now()}.${ext}`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
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
  const technologies = asCsv(formData.get("technologies"));
  const folderName = asOptionalString(formData.get("folderName"));
  const demoUrl = asOptionalString(formData.get("demoUrl"));
  const githubUrl = asOptionalString(formData.get("githubUrl"));
  const featured = formData.get("featured") === "on";

  const file = asFile(formData.get("imageFile"));
  const pastedUrl = asOptionalString(formData.get("imageUrl"));

  let imageUrl: string | undefined;
  if (file) {
    imageUrl = await uploadProjectImage(slug, file);
  } else if (pastedUrl) {
    imageUrl = pastedUrl;
  }

  await createProject({
    slug,
    title,
    description,
    tags,
    ...(category ? { category } : {}),
    ...(technologies.length > 0 ? { technologies } : {}),
    ...(imageUrl ? { imageUrl } : {}),
    ...(folderName ? { folderName } : {}),
    ...(demoUrl ? { demoUrl } : {}),
    ...(githubUrl ? { githubUrl } : {}),
    featured,
  });

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
  const technologies = asCsv(formData.get("technologies"));
  const folderName = asOptionalString(formData.get("folderName"));
  const demoUrl = asOptionalString(formData.get("demoUrl"));
  const githubUrl = asOptionalString(formData.get("githubUrl"));
  const featured = formData.get("featured") === "on";

  const file = asFile(formData.get("imageFile"));
  const pastedUrl = asOptionalString(formData.get("imageUrl"));

  let imageUrl: string | undefined = existing.imageUrl;
  if (file) {
    const newUrl = await uploadProjectImage(slug, file);
    const oldUrl = existing.imageUrl;
    imageUrl = newUrl;
    if (oldUrl && oldUrl !== newUrl && isVercelBlobUrl(oldUrl)) {
      try {
        await del(oldUrl);
      } catch {
        // best-effort blob cleanup
      }
    }
  } else if (pastedUrl && pastedUrl !== existing.imageUrl) {
    const oldUrl = existing.imageUrl;
    imageUrl = pastedUrl;
    if (oldUrl && isVercelBlobUrl(oldUrl)) {
      try {
        await del(oldUrl);
      } catch {
        // best-effort blob cleanup
      }
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
    folderName,
    demoUrl,
    githubUrl,
    featured,
  });

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
