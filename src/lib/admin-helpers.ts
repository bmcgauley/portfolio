import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Call from any admin server action / page that performs DB writes.
 * Redirects unauthenticated requests to /login and non-admins to home.
 * Returns the session for use by the caller.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") redirect("/");
  return session;
}

/**
 * Convert "Some Title" → "some-title". Used for content slugs.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
