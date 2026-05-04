const credentials = [
  {
    label: "INCOMING MBA STUDENT",
    detail: "Craig School of Business, CSU Fresno · Beginning Spring 2026",
  },
  {
    label: "B.S. SUMMA CUM LAUDE",
    detail:
      "Business Administration, CIS · CSU Fresno · December 2025 · GPA 3.85",
  },
  {
    label: "HONOR SOCIETIES",
    detail: "Phi Kappa Phi · Beta Gamma Sigma · Alpha Gamma Sigma",
  },
];

export default function CredentialStrip() {
  return (
    <section className="bg-parchment py-10 md:py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {credentials.map((c) => (
          <div key={c.label} className="text-center md:text-left">
            <div className="text-[11px] tracking-[0.18em] font-display text-crimson-deep mb-2">
              {c.label}
            </div>
            <div className="font-serif text-body text-ink leading-snug">
              {c.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
