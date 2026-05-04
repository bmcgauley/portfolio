import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { registerAction } from "./actions";

export const metadata = {
  title: "Register",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string }>;

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="bg-bone min-h-screen">
      <section className="max-w-md mx-auto px-6 py-20">
        <header className="text-center mb-10">
          <p className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-3">
            House Office
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink">
            Register
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Account creation is restricted to allowlisted emails.
          </p>
        </header>

        {error ? (
          <div className="bg-vellum border-l-4 border-crimson px-5 py-4 mb-8 rounded-[2px]">
            <p className="font-serif text-body text-ink">
              {error === "EMAIL_EXISTS"
                ? "An account already exists for this email. Sign in instead."
                : error === "NOT_ALLOWED"
                  ? "This email is not on the admin allowlist."
                  : error === "WEAK_PASSWORD"
                    ? "Password must be at least 10 characters."
                    : "Could not create the account. Try again."}
            </p>
          </div>
        ) : null}

        <form action={registerAction} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={10}
              autoComplete="new-password"
              className="w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
            />
            <p className="font-serif italic text-caption text-ink-muted mt-2">
              Minimum 10 characters.
            </p>
          </div>
          <Button type="submit" variant="default" size="lg" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-center font-serif text-caption text-ink-muted mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-crimson-deep underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
