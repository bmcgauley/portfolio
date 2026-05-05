"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-helpers";
import {
  createAchievement,
  deleteAchievement,
  getMaxAchievementOrder,
  reorderAchievements,
  updateAchievement,
} from "@/lib/achievements-db";

function asString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function asOptionalString(v: FormDataEntryValue | null): string | undefined {
  const s = asString(v);
  return s.length > 0 ? s : undefined;
}

function failNew(reason: string): never {
  redirect(`/admin/achievements/new?error=${encodeURIComponent(reason)}`);
}

function failEdit(id: string, reason: string): never {
  redirect(
    `/admin/achievements/${id}/edit?error=${encodeURIComponent(reason)}`,
  );
}

export async function createAchievementAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const title = asString(formData.get("title"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  const citation = asOptionalString(formData.get("citation"));
  const citationUrl = asOptionalString(formData.get("citationUrl"));

  if (!title || !date || !description) failNew("MISSING_FIELDS");

  const order = (await getMaxAchievementOrder()) + 1;

  await createAchievement({
    title,
    date,
    description,
    ...(citation ? { citation } : {}),
    ...(citationUrl ? { citationUrl } : {}),
    order,
  });

  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function updateAchievementAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const title = asString(formData.get("title"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  const citation = asOptionalString(formData.get("citation"));
  const citationUrl = asOptionalString(formData.get("citationUrl"));

  if (!title || !date || !description) failEdit(id, "MISSING_FIELDS");

  await updateAchievement(id, {
    title,
    date,
    description,
    citation,
    citationUrl,
  });

  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function deleteAchievementAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = asString(formData.get("id"));
  if (!id) redirect("/admin/achievements?error=MISSING_ID");

  await deleteAchievement(id);

  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function reorderAchievementsAction(
  orderedIds: string[],
): Promise<void> {
  await requireAdmin();
  await reorderAchievements(orderedIds);
  revalidatePath("/admin/achievements");
  revalidatePath("/");
}
