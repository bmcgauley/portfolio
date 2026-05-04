const properties = [
  {
    name: "IMAGINARII",
    href: "https://imagi-narii.com",
    description: "Independent consulting practice.",
  },
  {
    name: "DRAWN FROM",
    href: "https://drawnfrom.com",
    description: "Publishing imprint.",
  },
  {
    name: "MCGAULEY LABS",
    href: "https://mcgauleylabs.com",
    description: "AI news & writing.",
  },
  {
    name: "MUSIC",
    href: "https://music.brianmcgauley.com",
    description: "Electronic music releases.",
  },
];

export default function OtherPropertiesStrip() {
  return (
    <section className="bg-vellum border-t border-gold py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.18em] font-display text-crimson-deep uppercase">
            Other Properties
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {properties.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-[2px] transition-colors hover:bg-parchment"
            >
              <div className="font-display uppercase text-sm tracking-[0.05em] text-ink mb-2">
                {p.name}
              </div>
              <div className="font-serif italic text-sm text-ink-muted">
                {p.description}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
