import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listEngagements } from "@/lib/engagements-db";
import { listInvolvements } from "@/lib/involvements-db";
import { listCertifications } from "@/lib/certifications-db";
import { listExperiences } from "@/lib/experiences-db";
import {
  createCertificationAction,
  createEngagementAction,
  createInvolvementAction,
  deleteCertificationAction,
  deleteEngagementAction,
  deleteExperienceAction,
  deleteInvolvementAction,
  seedAboutContentAction,
} from "./actions";

const FIELD_LABEL =
  "block font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2";
const FIELD_INPUT =
  "w-full bg-bone border border-gold-shadow rounded-[2px] px-3 py-2 font-serif text-body text-ink focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";
const FIELD_TEXTAREA = `${FIELD_INPUT} min-h-[100px]`;
const SECTION_PANEL =
  "bg-vellum border-l-8 border-parchment rounded-[2px] px-6 py-5";

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams?: Promise<{ seeded?: string }>;
}) {
  const [engagements, involvements, certifications, experiences] = await Promise.all([
    listEngagements(),
    listInvolvements(),
    listCertifications(),
    listExperiences(),
  ]);
  const params = (await searchParams) ?? {};
  const allEmpty =
    engagements.length === 0 &&
    involvements.length === 0 &&
    certifications.length === 0 &&
    experiences.length === 0;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office &middot; About
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          About Page Content
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Edit the sections that appear on the public /about page. Honors &amp;
          Awards are managed via{" "}
          <Link href="/admin/achievements" className="text-crimson-deep hover:underline">
            Achievements
          </Link>
          . Skills and hobbies live in{" "}
          <Link href="/admin/library" className="text-crimson-deep hover:underline">
            Library
          </Link>
          .
        </p>
      </header>

      {params.seeded ? (
        <p className="bg-vellum border-l-4 border-gold rounded-[2px] px-4 py-3 font-serif italic text-body text-ink mb-8">
          Seeded from defaults. You can edit, delete, or add new entries below.
        </p>
      ) : null}

      {allEmpty ? (
        <section className="mb-12 bg-vellum border-l-8 border-crimson-deep rounded-[2px] px-6 py-5">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2">
            First Run
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink mb-2">
            Populate from current site content
          </h2>
          <p className="font-serif italic text-body text-ink-soft mb-4">
            Your about page currently uses hardcoded fallback data. Click below
            to copy that content into the database so you can edit it here.
            Idempotent — only inserts when collections are empty. Also seeds the
            skills library with the existing category groupings.
          </p>
          <form action={seedAboutContentAction}>
            <Button type="submit">Seed from Defaults</Button>
          </form>
        </section>
      ) : null}

      {/* ---------- Engagements ---------- */}
      <section id="engagements" className="mb-16">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Active Work
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Current Engagements
          </h2>
        </header>

        <form action={createEngagementAction} className={`${SECTION_PANEL} mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end`}>
          <div>
            <label htmlFor="eng-org" className={FIELD_LABEL}>Organization</label>
            <input id="eng-org" name="org" type="text" required className={FIELD_INPUT} />
          </div>
          <div>
            <label htmlFor="eng-role" className={FIELD_LABEL}>Role</label>
            <input id="eng-role" name="role" type="text" required className={FIELD_INPUT} />
          </div>
          <div>
            <label htmlFor="eng-date" className={FIELD_LABEL}>Date</label>
            <input id="eng-date" name="date" type="text" required placeholder="2024–present" className={FIELD_INPUT} />
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" size="sm">+ Add Engagement</Button>
          </div>
        </form>

        {engagements.length === 0 ? (
          <p className="font-serif italic text-body text-gold-shadow">No engagements yet.</p>
        ) : (
          <ul className="space-y-3">
            {engagements.map((e) => {
              const id = e._id.toString();
              return (
                <li key={id} className="bg-vellum border-t-2 border-gold rounded-[2px] p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">{e.org}</p>
                    <p className="font-serif italic text-body text-gold-shadow">{e.role} &middot; {e.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/about/engagements/${id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteEngagementAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ---------- Experiences ---------- */}
      <section id="experiences" className="mb-16">
        <header className="mb-4 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
              Professional History
            </p>
            <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
              Experience
            </h2>
          </div>
          <Button asChild size="sm">
            <Link href="/admin/about/experiences/new">+ New Experience</Link>
          </Button>
        </header>

        {experiences.length === 0 ? (
          <p className="font-serif italic text-body text-gold-shadow">No experience entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {experiences.map((x) => {
              const id = x._id.toString();
              return (
                <li key={id} className="bg-vellum border-t-2 border-gold rounded-[2px] p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">{x.position}</p>
                    <p className="font-serif italic text-body text-gold-shadow">{x.company} &middot; {x.startDate}{x.endDate ? ` – ${x.endDate}` : " – Present"}</p>
                    <p className="font-serif text-caption text-ink-soft mt-2 line-clamp-2">{x.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/about/experiences/${id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteExperienceAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ---------- Involvements ---------- */}
      <section id="involvements" className="mb-16">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Community Involvement
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Volunteer &amp; Pro-Bono Work
          </h2>
        </header>

        <form action={createInvolvementAction} className={`${SECTION_PANEL} mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start`}>
          <div>
            <label htmlFor="inv-org" className={FIELD_LABEL}>Organization</label>
            <input id="inv-org" name="org" type="text" required className={FIELD_INPUT} />
          </div>
          <div>
            <label htmlFor="inv-date" className={FIELD_LABEL}>Date</label>
            <input id="inv-date" name="date" type="text" required placeholder="May 2025 – Present" className={FIELD_INPUT} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="inv-desc" className={FIELD_LABEL}>Description (markdown supported)</label>
            <textarea id="inv-desc" name="description" required className={FIELD_TEXTAREA} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm">+ Add Involvement</Button>
          </div>
        </form>

        {involvements.length === 0 ? (
          <p className="font-serif italic text-body text-gold-shadow">No involvements yet.</p>
        ) : (
          <ul className="space-y-3">
            {involvements.map((i) => {
              const id = i._id.toString();
              return (
                <li key={id} className="bg-vellum border-t-2 border-gold rounded-[2px] p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">{i.org}</p>
                    <p className="font-serif italic text-body text-gold-shadow">{i.date}</p>
                    <p className="font-serif text-caption text-ink-soft mt-2 line-clamp-2">{i.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/about/involvements/${id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteInvolvementAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* ---------- Certifications ---------- */}
      <section id="certifications" className="mb-16">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Certifications
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Training &amp; Continuing Education
          </h2>
        </header>

        <form action={createCertificationAction} className={`${SECTION_PANEL} mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start`}>
          <div>
            <label htmlFor="cert-title" className={FIELD_LABEL}>Title</label>
            <input id="cert-title" name="title" type="text" required className={FIELD_INPUT} />
          </div>
          <div>
            <label htmlFor="cert-issuer" className={FIELD_LABEL}>Issuer</label>
            <input id="cert-issuer" name="issuer" type="text" required className={FIELD_INPUT} />
          </div>
          <div>
            <label htmlFor="cert-date" className={FIELD_LABEL}>Date</label>
            <input id="cert-date" name="date" type="text" required placeholder="September 2021" className={FIELD_INPUT} />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="cert-desc" className={FIELD_LABEL}>Description (markdown supported)</label>
            <textarea id="cert-desc" name="description" required className={FIELD_TEXTAREA} />
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" size="sm">+ Add Certification</Button>
          </div>
        </form>

        {certifications.length === 0 ? (
          <p className="font-serif italic text-body text-gold-shadow">No certifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {certifications.map((c) => {
              const id = c._id.toString();
              return (
                <li key={id} className="bg-vellum border-t-2 border-gold rounded-[2px] p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">{c.title}</p>
                    <p className="font-serif italic text-body text-gold-shadow">{c.issuer} &middot; {c.date}</p>
                    <p className="font-serif text-caption text-ink-soft mt-2 line-clamp-2">{c.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/about/certifications/${id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteCertificationAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
