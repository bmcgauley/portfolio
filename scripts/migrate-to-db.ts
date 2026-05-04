/**
 * One-time migration: seed MongoDB collections from the existing
 * JSON manifests + hardcoded arrays in the public data layer.
 *
 * Idempotent on slug — re-running won't duplicate. Existing docs are
 * left alone; new ones are inserted.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-db.ts
 *
 * Requires MONGODB_URI in env (run `vercel env pull .env.local` first).
 */

import { config } from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";

// Load .env.local if present (for MONGODB_URI), then fall back to .env
config({ path: ".env.local" });
config({ path: ".env" });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

if (!uri) {
  console.error("✗ MONGODB_URI not set. Run `vercel env pull .env.local` first.");
  process.exit(1);
}

const PUBLICATIONS_ROOT = path.join(
  process.cwd(),
  "public",
  "publications",
);

type ManifestArray = unknown[];

async function readManifest(category: string): Promise<ManifestArray> {
  try {
    const raw = await fs.readFile(
      path.join(PUBLICATIONS_ROOT, category, "index.json"),
      "utf-8",
    );
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function migratePublications(client: MongoClient): Promise<void> {
  const col = client.db(dbName).collection("publications");
  const [drawnFrom, academic, groupProjects, external, independent] =
    await Promise.all([
      readManifest("drawn-from"),
      readManifest("academic"),
      readManifest("group-projects"),
      readManifest("external"),
      readManifest("independent"),
    ]);

  let inserted = 0;
  let skipped = 0;
  const now = new Date();

  for (const e of drawnFrom as Record<string, unknown>[]) {
    const slug = e.slug as string;
    if (!slug) continue;
    const existing = await col.findOne({ kind: "drawn-from", slug });
    if (existing) {
      skipped++;
      continue;
    }
    await col.insertOne({
      kind: "drawn-from",
      slug,
      title: e.title,
      subtitle: e.subtitle,
      description: e.description,
      coverImage: e.coverImage,
      status: e.status,
      releaseDate: e.releaseDate,
      externalUrl: e.externalUrl,
      tags: e.tags,
      createdAt: now,
      updatedAt: now,
    });
    inserted++;
  }

  for (const [list, category] of [
    [academic, "academic"],
    [groupProjects, "group-projects"],
    [external, "external"],
  ] as const) {
    for (const e of list as Record<string, unknown>[]) {
      const slug = e.slug as string;
      if (!slug) continue;
      const existing = await col.findOne({ kind: "academic", slug });
      if (existing) {
        skipped++;
        continue;
      }
      const pdfFile = e.pdfFile as string;
      await col.insertOne({
        kind: "academic",
        slug,
        title: e.title,
        course: e.course,
        venue: e.venue,
        year: e.year,
        abstract: e.abstract,
        pdfPath: pdfFile
          ? `/publications/${category}/${pdfFile}`
          : "",
        authors: e.authors ?? [],
        category,
        tags: e.tags,
        createdAt: now,
        updatedAt: now,
      });
      inserted++;
    }
  }

  for (const e of independent as Record<string, unknown>[]) {
    const slug = e.slug as string;
    if (!slug) continue;
    const existing = await col.findOne({ kind: "independent", slug });
    if (existing) {
      skipped++;
      continue;
    }
    await col.insertOne({
      kind: "independent",
      slug,
      title: e.title,
      date: e.date,
      length: e.length,
      url: e.url,
      description: e.description,
      createdAt: now,
      updatedAt: now,
    });
    inserted++;
  }

  console.log(
    `  publications: inserted ${inserted}, skipped ${skipped} (already present)`,
  );
}

async function migrateProjects(client: MongoClient): Promise<void> {
  const { projects } = await import("../src/lib/data");
  const col = client.db(dbName).collection("projects");

  const validCategory = (
    raw: string | undefined,
  ): "Consulting" | "Academic" | "Volunteer" | "Personal" | undefined => {
    if (!raw) return undefined;
    const v = raw.toLowerCase();
    if (v.includes("consult") || v.includes("professional")) return "Consulting";
    if (v.includes("school") || v.includes("academic")) return "Academic";
    if (v.includes("community") || v.includes("volunteer")) return "Volunteer";
    return "Personal";
  };

  let inserted = 0;
  let skipped = 0;
  const now = new Date();

  for (const p of projects) {
    const slug = p.id;
    if (!slug) continue;
    const existing = await col.findOne({ slug });
    if (existing) {
      skipped++;
      continue;
    }
    await col.insertOne({
      slug,
      title: p.title,
      description: p.description,
      tags: p.tags ?? [],
      category: validCategory(p.category),
      technologies: p.technologies,
      imageUrl: p.imageUrl,
      folderName: p.folderName,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      featured: p.featured ?? false,
      createdAt: now,
      updatedAt: now,
    });
    inserted++;
  }

  console.log(
    `  projects:     inserted ${inserted}, skipped ${skipped} (already present)`,
  );
}

async function migrateAchievements(client: MongoClient): Promise<void> {
  const seedAchievements = [
    {
      title: "Re-Entry Student Award",
      date: "May 2026",
      description:
        "Recognized by CSU Fresno for academic achievement among returning students.",
      citation: "Newspaper article reference to come.",
      order: 0,
    },
    {
      title: "Lewis & Virginia Eaton Business Scholarship",
      date: "Fall 2025",
      description:
        "Awarded $2,000 for the 2025–2026 academic year by the Craig School of Business at CSU Fresno.",
      order: 1,
    },
    {
      title: "Phi Kappa Phi & Beta Gamma Sigma Induction",
      date: "May 2025",
      description:
        "Inducted into two honor societies recognizing academic standing in the top tier of the program.",
      order: 2,
    },
    {
      title: "Robotics Competition Initiative",
      date: "Spring 2025",
      description:
        "Helped distribute robotics competition starter sets to elementary schools in Fresno and Clovis through Fresno PAL and Success from Within.",
      order: 3,
    },
  ];

  const col = client.db(dbName).collection("achievements");
  let inserted = 0;
  let skipped = 0;
  const now = new Date();

  for (const a of seedAchievements) {
    const existing = await col.findOne({ title: a.title });
    if (existing) {
      skipped++;
      continue;
    }
    await col.insertOne({ ...a, createdAt: now, updatedAt: now });
    inserted++;
  }

  console.log(
    `  achievements: inserted ${inserted}, skipped ${skipped} (already present)`,
  );
}

async function main(): Promise<void> {
  console.log(`→ Connecting to MongoDB (${dbName})...`);
  const client = new MongoClient(uri!);
  await client.connect();

  console.log(`→ Migrating data...`);
  await migratePublications(client);
  await migrateProjects(client);
  await migrateAchievements(client);

  console.log(`→ Note: Essays not auto-migrated (writing fallback is empty).`);
  console.log(`✓ Done.`);

  await client.close();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
