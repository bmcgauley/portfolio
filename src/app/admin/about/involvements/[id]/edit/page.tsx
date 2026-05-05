import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getInvolvementById } from "@/lib/involvements-db";
import { updateInvolvementAction } from "../../../actions";

const LABEL = "block font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2";
const INPUT =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

export default async function EditInvolvementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getInvolvementById(id);
  if (!item) notFound();

  const update = updateInvolvementAction.bind(null, id);

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office &middot; About &middot; Involvements
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Edit Involvement
        </h1>
      </header>

      <form action={update} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="org" className={LABEL}>Organization</label>
          <input id="org" name="org" type="text" required defaultValue={item.org} className={INPUT} />
        </div>
        <div>
          <label htmlFor="date" className={LABEL}>Date</label>
          <input id="date" name="date" type="text" required defaultValue={item.date} className={INPUT} />
        </div>
        <div>
          <label htmlFor="description" className={LABEL}>Description (markdown supported)</label>
          <textarea id="description" name="description" required defaultValue={item.description} className={`${INPUT} min-h-[140px]`} />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit">Save Changes</Button>
          <Link href="/admin/about#involvements" className="font-display uppercase tracking-[0.18em] text-xs text-ink-soft hover:text-crimson-deep">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
