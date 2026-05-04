import { Wordmark } from "@/components/ui/wordmark";
import { Ornament } from "@/components/ui/ornament";

export default function Hero() {
  return (
    <section className="bg-bone py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Ornament />
          <Ornament />
          <Ornament />
        </div>
        <Wordmark variant="primary" as="h1" />
        <p className="font-serif italic text-body-lg text-ink-soft max-w-2xl mt-8">
          MBA candidate, independent consultant, and educator working at the
          intersection of organizational behavior, project management, and
          digital modernization.
        </p>
      </div>
    </section>
  );
}
