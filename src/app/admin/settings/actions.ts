"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { requireAdmin } from "@/lib/admin-helpers";
import {
  getSiteSettings,
  unsetSiteSettingField,
  updateSiteSettings,
} from "@/lib/site-settings-db";

function asString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function asOptionalString(v: FormDataEntryValue | null): string | undefined {
  const s = asString(v);
  return s.length > 0 ? s : undefined;
}

function asOptionalNumber(
  v: FormDataEntryValue | null,
  min: number,
  max: number,
): number | undefined {
  const s = asString(v);
  if (!s) return undefined;
  const n = Number.parseInt(s, 10);
  if (Number.isNaN(n)) return undefined;
  return Math.min(Math.max(n, min), max);
}

function isVercelBlobUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function updateSiteSettingsAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const existing = await getSiteSettings();

  const newLogoUrl = asOptionalString(formData.get("logoUrl"));
  const newFaviconUrl = asOptionalString(formData.get("faviconUrl"));
  const navHeight = asOptionalNumber(formData.get("logoNavHeight"), 24, 120);
  const heroMaxWidth = asOptionalNumber(
    formData.get("logoHeroMaxWidth"),
    120,
    1000,
  );

  const patch: {
    logoUrl?: string;
    faviconUrl?: string;
    logoNavHeight?: number;
    logoHeroMaxWidth?: number;
  } = {};

  if (navHeight !== undefined && navHeight !== existing?.logoNavHeight) {
    patch.logoNavHeight = navHeight;
  }
  if (
    heroMaxWidth !== undefined &&
    heroMaxWidth !== existing?.logoHeroMaxWidth
  ) {
    patch.logoHeroMaxWidth = heroMaxWidth;
  }

  if (newLogoUrl && newLogoUrl !== existing?.logoUrl) {
    patch.logoUrl = newLogoUrl;
    if (isVercelBlobUrl(existing?.logoUrl)) {
      try {
        await del(existing!.logoUrl!);
      } catch {
        // best-effort blob cleanup
      }
    }
  }

  if (newFaviconUrl && newFaviconUrl !== existing?.faviconUrl) {
    patch.faviconUrl = newFaviconUrl;
    if (isVercelBlobUrl(existing?.faviconUrl)) {
      try {
        await del(existing!.faviconUrl!);
      } catch {
        // best-effort blob cleanup
      }
    }
  }

  if (Object.keys(patch).length > 0) {
    await updateSiteSettings(patch);
  }

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function clearSiteLogoAction(): Promise<void> {
  await requireAdmin();
  const existing = await getSiteSettings();
  if (isVercelBlobUrl(existing?.logoUrl)) {
    try {
      await del(existing!.logoUrl!);
    } catch {
      // best-effort
    }
  }
  await unsetSiteSettingField("logoUrl");
  revalidatePath("/", "layout");
  redirect("/admin/settings?cleared=logo");
}

export async function clearSiteFaviconAction(): Promise<void> {
  await requireAdmin();
  const existing = await getSiteSettings();
  if (isVercelBlobUrl(existing?.faviconUrl)) {
    try {
      await del(existing!.faviconUrl!);
    } catch {
      // best-effort
    }
  }
  await unsetSiteSettingField("faviconUrl");
  revalidatePath("/", "layout");
  redirect("/admin/settings?cleared=favicon");
}
