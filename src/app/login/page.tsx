import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { SectionDivider } from "@/components/ui/section-divider";
import { Button } from "@/components/ui/button";
import { credentialsSignInAction, googleSignInAction } from "./actions";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string; callbackUrl?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  const { error, callbackUrl } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl || "/admin");
  }

  const googleAction = googleSignInAction.bind(null, callbackUrl);
  const credentialsAction = credentialsSignInAction.bind(null, callbackUrl);

  return (
    <main className="bg-bone min-h-screen">
      <section className="max-w-md mx-auto px-6 py-20">
        <header className="text-center mb-10">
          <p className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-3">
            House Office
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink">
            Sign In
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Admin access only.
          </p>
        </header>

        {error ? (
          <div className="bg-vellum border-l-4 border-crimson px-5 py-4 mb-8 rounded-[2px]">
            <p className="font-serif text-body text-ink">
              {error === "CredentialsSignin"
                ? "Email or password is incorrect, or no account exists for that email yet — try registering."
                : error === "AccessDenied"
                  ? "This email is not on the admin allowlist."
                  : "Could not sign in. Try again."}
            </p>
          </div>
        ) : null}

        <form action={googleAction}>
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Continue with Google
          </Button>
        </form>

        <div className="my-8">
          <SectionDivider className="py-2" />
          <p className="text-center font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow -mt-2">
            or
          </p>
        </div>

        <form action={credentialsAction} className="space-y-5">
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
              autoComplete="current-password"
              className="w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
            />
          </div>
          <Button type="submit" variant="default" size="lg" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center font-serif text-caption text-ink-muted mt-8">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-crimson-deep underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
