import { SiteLogo } from "@/components/ui/site-logo";
import { Ornament } from "@/components/ui/ornament";
import { getSiteSettings } from "@/lib/site-settings-db";

export default async function Hero() {
  const settings = await getSiteSettings();
  return (
    <section className="bg-bone py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Ornament />
          <Ornament />
          <Ornament />
        </div>
        <SiteLogo
          logoUrl={settings?.logoUrl}
          variant="primary"
          heroMaxWidth={settings?.logoHeroMaxWidth}
        />
        <p className="font-serif italic text-body-lg text-ink-soft max-w-2xl mt-8">
          Incoming MBA student, independent consultant, and educator working
          at the intersection of organizational behavior, project management,
          and digital modernization.
        </p>
      </div>
    </section>
  );
}
