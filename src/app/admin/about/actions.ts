"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-helpers";
import {
  createEngagement,
  deleteEngagement,
  updateEngagement,
} from "@/lib/engagements-db";
import {
  createInvolvement,
  deleteInvolvement,
  updateInvolvement,
} from "@/lib/involvements-db";
import {
  createCertification,
  deleteCertification,
  updateCertification,
} from "@/lib/certifications-db";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/lib/experiences-db";
import { addManyIfMissing } from "@/lib/taxonomy-db";
import { listEngagements } from "@/lib/engagements-db";
import { listInvolvements } from "@/lib/involvements-db";
import { listCertifications } from "@/lib/certifications-db";
import { listExperiences } from "@/lib/experiences-db";
import {
  experiences as fallbackExperiences,
  skills as fallbackSkills,
} from "@/lib/data";

function asString(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function asOptionalString(v: FormDataEntryValue | null): string | undefined {
  const s = asString(v);
  return s.length > 0 ? s : undefined;
}

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
      // fall through
    }
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function revalidateAbout() {
  revalidatePath("/admin/about");
  revalidatePath("/about");
}

// ---- Engagements ----

export async function createEngagementAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const org = asString(formData.get("org"));
  const role = asString(formData.get("role"));
  const date = asString(formData.get("date"));
  if (!org || !role || !date) {
    redirect("/admin/about?error=ENGAGEMENT_MISSING_FIELDS");
  }
  await createEngagement({ org, role, date });
  revalidateAbout();
  redirect("/admin/about#engagements");
}

export async function updateEngagementAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const org = asString(formData.get("org"));
  const role = asString(formData.get("role"));
  const date = asString(formData.get("date"));
  if (!org || !role || !date) {
    redirect(`/admin/about/engagements/${id}/edit?error=MISSING_FIELDS`);
  }
  await updateEngagement(id, { org, role, date });
  revalidateAbout();
  redirect("/admin/about#engagements");
}

export async function deleteEngagementAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = asString(formData.get("id"));
  if (id) await deleteEngagement(id);
  revalidateAbout();
  redirect("/admin/about#engagements");
}

// ---- Involvements ----

export async function createInvolvementAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const org = asString(formData.get("org"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  if (!org || !date || !description) {
    redirect("/admin/about?error=INVOLVEMENT_MISSING_FIELDS");
  }
  await createInvolvement({ org, date, description });
  revalidateAbout();
  redirect("/admin/about#involvements");
}

export async function updateInvolvementAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const org = asString(formData.get("org"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  if (!org || !date || !description) {
    redirect(`/admin/about/involvements/${id}/edit?error=MISSING_FIELDS`);
  }
  await updateInvolvement(id, { org, date, description });
  revalidateAbout();
  redirect("/admin/about#involvements");
}

export async function deleteInvolvementAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = asString(formData.get("id"));
  if (id) await deleteInvolvement(id);
  revalidateAbout();
  redirect("/admin/about#involvements");
}

// ---- Certifications ----

export async function createCertificationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const title = asString(formData.get("title"));
  const issuer = asString(formData.get("issuer"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  if (!title || !issuer || !date || !description) {
    redirect("/admin/about?error=CERT_MISSING_FIELDS");
  }
  await createCertification({ title, issuer, date, description });
  revalidateAbout();
  redirect("/admin/about#certifications");
}

export async function updateCertificationAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const title = asString(formData.get("title"));
  const issuer = asString(formData.get("issuer"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  if (!title || !issuer || !date || !description) {
    redirect(`/admin/about/certifications/${id}/edit?error=MISSING_FIELDS`);
  }
  await updateCertification(id, { title, issuer, date, description });
  revalidateAbout();
  redirect("/admin/about#certifications");
}

export async function deleteCertificationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const id = asString(formData.get("id"));
  if (id) await deleteCertification(id);
  revalidateAbout();
  redirect("/admin/about#certifications");
}

// ---- Experiences ----

export async function createExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const position = asString(formData.get("position"));
  const company = asString(formData.get("company"));
  const startDate = asString(formData.get("startDate"));
  const endDateRaw = asOptionalString(formData.get("endDate"));
  const description = asString(formData.get("description"));
  const skills = asNameList(formData.get("skills"));

  if (!position || !company || !startDate || !description) {
    redirect("/admin/about?error=EXPERIENCE_MISSING_FIELDS");
  }
  await createExperience({
    position,
    company,
    startDate,
    endDate: endDateRaw ?? null,
    description,
    ...(skills.length > 0 ? { skills } : {}),
  });
  if (skills.length > 0) {
    await addManyIfMissing(skills, "skill");
  }
  revalidateAbout();
  redirect("/admin/about#experiences");
}

export async function updateExperienceAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const position = asString(formData.get("position"));
  const company = asString(formData.get("company"));
  const startDate = asString(formData.get("startDate"));
  const endDateRaw = asOptionalString(formData.get("endDate"));
  const description = asString(formData.get("description"));
  const skills = asNameList(formData.get("skills"));

  if (!position || !company || !startDate || !description) {
    redirect(`/admin/about/experiences/${id}/edit?error=MISSING_FIELDS`);
  }
  await updateExperience(id, {
    position,
    company,
    startDate,
    endDate: endDateRaw ?? null,
    description,
    skills: skills.length > 0 ? skills : undefined,
  });
  if (skills.length > 0) {
    await addManyIfMissing(skills, "skill");
  }
  revalidateAbout();
  redirect("/admin/about#experiences");
}

export async function deleteExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = asString(formData.get("id"));
  if (id) await deleteExperience(id);
  revalidateAbout();
  redirect("/admin/about#experiences");
}

// ---- One-time seed ----

const SEED_ENGAGEMENTS: Array<{ org: string; role: string; date: string }> = [
  { org: "Kerman Chamber of Commerce", role: "Web & branding consultant", date: "2024–present" },
  { org: "AJ for City Council", role: "Campaign technology lead", date: "2025" },
  { org: "Success From Within", role: "Brand strategy advisor", date: "2024–present" },
  { org: "Imaginarii", role: "Founder, independent consultant", date: "2023–present" },
  { org: "Drawn From Publishing", role: "Founder, editorial", date: "2024–present" },
];

const SEED_INVOLVEMENTS: Array<{ org: string; date: string; description: string }> = [
  { org: "PMI CCVC Chapter", date: "May 2025 – Present", description: "IT intern; supporting the chapter website overhaul and redesign using systems analysis and design principles." },
  { org: "Fresno PAL", date: "January 2024 – Present", description: "Website upkeep and routine maintenance in support of youth programs." },
  { org: "Success From Within", date: "January 2025 – Present", description: "Website maintenance and occasional event support; brand strategy advisory." },
  { org: "AJ for City Council", date: "August 2024 – December 2024", description: "Volunteer website development for the Fresno District 7 campaign. Continued as paid consultant via Imaginarii from January 2025." },
  { org: "Kerman Chamber of Commerce", date: "February 2026 – Present", description: "Pro-bono technology engagement: branding, website rebuild, domain and hosting migration, accessibility (WCAG), SEO, and light automation." },
  { org: "Central Valley Justice Coalition", date: "August 2024 – December 2024", description: "Marketing and education for community outreach; digital signage and printable materials for volunteer awareness." },
  { org: "Beautify Fresno", date: "March 2023 – Present", description: "Donated time with regular clean-up efforts around the city." },
];

const SEED_CERTIFICATIONS: Array<{ title: string; issuer: string; date: string; description: string }> = [
  { title: "Introduction to Packet Tracer", issuer: "Cisco Networking Academy", date: "September 2021", description: "Network simulation and visualization training covering protocols and configurations." },
];

export async function seedAboutContentAction(): Promise<void> {
  await requireAdmin();

  const [eng, inv, cert, exp] = await Promise.all([
    listEngagements(),
    listInvolvements(),
    listCertifications(),
    listExperiences(),
  ]);

  if (eng.length === 0) {
    for (const e of SEED_ENGAGEMENTS) await createEngagement(e);
  }
  if (inv.length === 0) {
    for (const i of SEED_INVOLVEMENTS) await createInvolvement(i);
  }
  if (cert.length === 0) {
    for (const c of SEED_CERTIFICATIONS) await createCertification(c);
  }
  if (exp.length === 0) {
    for (const e of fallbackExperiences) {
      await createExperience({
        position: e.position,
        company: e.company,
        startDate: e.startDate,
        endDate: e.endDate,
        description: e.description,
        ...(e.skills && e.skills.length > 0 ? { skills: e.skills } : {}),
      });
      if (e.skills && e.skills.length > 0) {
        await addManyIfMissing(e.skills, "skill");
      }
    }
  }

  // Seed skills library with categories carried through.
  const { addTaxonomy } = await import("@/lib/taxonomy-db");
  for (const group of fallbackSkills) {
    for (const item of group.items) {
      await addTaxonomy({ name: item, kind: "skill", category: group.category });
    }
  }

  revalidateAbout();
  revalidatePath("/admin/library");
  redirect("/admin/about?seeded=1");
}
