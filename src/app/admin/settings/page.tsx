import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";
import { getAdminEmails } from "@/lib/admin-allowlist";
import { Ornament } from "@/components/ui/ornament";

async function getSystemStatus() {
  let mongoOk = false;
  let collectionCounts: Record<string, number> = {};
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    mongoOk = true;
    const collections = ["publications", "essays", "achievements", "projects", "users"];
    const counts = await Promise.all(
      collections.map(async (c) => [c, await db.collection(c).countDocuments()] as const),
    );
    collectionCounts = Object.fromEntries(counts);
  } catch {
    mongoOk = false;
  }
  return { mongoOk, collectionCounts };
}

export default async function SettingsPage() {
  const session = await auth();
  const status = await getSystemStatus();
  const adminEmails = getAdminEmails();
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID);

  const userEmail = session?.user?.email ?? "—";
  const userName = session?.user?.name ?? "—";

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Settings
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Settings
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          System status and configuration. Edits happen via Vercel env vars,
          not here.
        </p>
      </header>

      <section className="mb-12">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Account
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Signed In As
          </h2>
        </header>
        <div className="bg-vellum border-l-8 border-parchment rounded-[2px] px-8 py-6">
          <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-3 font-serif text-body text-ink">
            <dt className="font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep self-center">
              Name
            </dt>
            <dd>{userName}</dd>
            <dt className="font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep self-center">
              Email
            </dt>
            <dd>{userEmail}</dd>
            <dt className="font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep self-center">
              Role
            </dt>
            <dd>
              <span className="bg-crimson-deep text-vellum font-mono uppercase tracking-[0.18em] text-[11px] px-2 py-1 rounded-[2px]">
                Admin
              </span>
            </dd>
          </dl>
        </div>
      </section>

      <section className="mb-12">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Allowlist
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Admin Emails
          </h2>
          <p className="font-serif italic text-caption text-ink-muted mt-2">
            Sourced from the <code className="font-mono">ADMIN_EMAILS</code>{" "}
            environment variable. Only these addresses can sign in. Edit via{" "}
            <code className="font-mono">vercel env</code> or the Vercel
            dashboard.
          </p>
        </header>
        <ul className="bg-vellum border-l-8 border-parchment rounded-[2px] px-8 py-6 space-y-2">
          {adminEmails.map((email) => (
            <li
              key={email}
              className="font-mono text-body text-ink flex items-center gap-3"
            >
              <Ornament size="sm" />
              {email}
            </li>
          ))}
          {adminEmails.length === 0 ? (
            <li className="font-serif italic text-ink-muted">
              No admin emails configured.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="mb-12">
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Infrastructure
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Service Status
          </h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatusCard
            label="MongoDB"
            ok={status.mongoOk}
            detail={status.mongoOk ? "Connected" : "Unavailable"}
          />
          <StatusCard
            label="Vercel Blob"
            ok={blobConfigured}
            detail={blobConfigured ? "Configured" : "Missing token"}
          />
          <StatusCard
            label="Google OAuth"
            ok={googleConfigured}
            detail={googleConfigured ? "Configured" : "Missing client"}
          />
        </div>
      </section>

      <section>
        <header className="mb-4">
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
            Storage
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
            Collection Counts
          </h2>
        </header>
        <div className="bg-vellum border-l-8 border-parchment rounded-[2px] px-8 py-6">
          <dl className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-4">
            {Object.entries(status.collectionCounts).map(([name, count]) => (
              <div key={name}>
                <dt className="font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep mb-1">
                  {name}
                </dt>
                <dd className="font-display font-bold text-h2 text-ink">
                  {count}
                </dd>
              </div>
            ))}
            {Object.keys(status.collectionCounts).length === 0 ? (
              <p className="font-serif italic text-ink-muted col-span-full">
                Collections unavailable.
              </p>
            ) : null}
          </dl>
        </div>
      </section>
    </div>
  );
}

function StatusCard({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <div className="bg-vellum border-t-4 border-gold rounded-[2px] p-5">
      <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep mb-2">
        {label}
      </p>
      <p className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink mb-1">
        {ok ? "Ready" : "Issue"}
      </p>
      <p className="font-serif italic text-caption text-ink-muted">{detail}</p>
    </div>
  );
}
