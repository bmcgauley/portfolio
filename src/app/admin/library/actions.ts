"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-helpers";
import {
  addTaxonomy,
  deleteTaxonomy,
  type TaxonomyKind,
} from "@/lib/taxonomy-db";

const VALID_KINDS: readonly TaxonomyKind[] = [
  "skill",
  "technology",
  "hobby",
] as const;

function asString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function asKind(v: FormDataEntryValue | null): TaxonomyKind | null {
  const s = asString(v);
  return (VALID_KINDS as readonly string[]).includes(s)
    ? (s as TaxonomyKind)
    : null;
}

export async function addTaxonomyAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const rawName = asString(formData.get("name"));
  const kind = asKind(formData.get("kind"));
  const category = asString(formData.get("category"));

  if (!rawName || !kind) {
    redirect("/admin/library?error=MISSING_FIELDS");
  }

  // Comma-separated → multiple entries. Single name still works.
  const names = rawName
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const name of names) {
    await addTaxonomy({
      name,
      kind,
      ...(category ? { category } : {}),
    });
  }

  revalidatePath("/admin/library");
  revalidatePath("/admin/projects");
  redirect(`/admin/library#${kind}`);
}

export async function deleteTaxonomyAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  const kind = asKind(formData.get("kind"));

  if (!id) {
    redirect("/admin/library?error=MISSING_ID");
  }

  await deleteTaxonomy(id);

  revalidatePath("/admin/library");
  revalidatePath("/admin/projects");
  redirect(`/admin/library${kind ? `#${kind}` : ""}`);
}
