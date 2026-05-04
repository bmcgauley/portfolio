import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";

type ContactMethod = {
  label: string;
  display: string;
  href: string;
  external?: boolean;
};

const contactMethods: ContactMethod[] = [
  {
    label: "EMAIL",
    display: "bmcgauley44@gmail.com",
    href: "mailto:bmcgauley44@gmail.com",
  },
  {
    label: "LINKEDIN",
    display: "linkedin.com/in/bmcgauley",
    href: "https://www.linkedin.com/in/bmcgauley/",
    external: true,
  },
  {
    label: "GITHUB",
    display: "github.com/bmcgauley",
    href: "https://github.com/bmcgauley",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-bone">
      <header className="bg-bone py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-display-2 font-display uppercase text-ink">
            Contact
          </h1>
          <p className="mt-4 font-serif italic text-body-lg text-ink-soft">
            Reach out by email, or find me on LinkedIn or GitHub.
          </p>
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionDivider />
          <ul className="mt-8">
            {contactMethods.map((method) => (
              <li key={method.label}>
                <a
                  href={method.href}
                  {...(method.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-gold last:border-b-0 group"
                >
                  <span className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep">
                    {method.label}
                  </span>
                  <span className="font-serif text-body-lg text-ink group-hover:text-crimson-deep underline-offset-4 group-hover:underline transition-colors">
                    {method.display}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:bmcgauley44@gmail.com?subject=Scheduling%20a%20call">
                SCHEDULE A CALL
              </a>
            </Button>
            <p className="font-serif italic text-caption text-ink-soft">
              Brief introduction calls are welcome; please send context first.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionDivider />
          <div className="mt-8 text-center">
            <h2 className="font-display uppercase tracking-[0.18em] text-sm text-crimson-deep">
              Prefer a Form?
            </h2>
            <p className="mt-3 font-serif italic text-body text-ink-soft">
              Email is preferred. The form below works if you&apos;d rather not
              open a mail client.
            </p>
          </div>
          <div className="max-w-xl mx-auto mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
