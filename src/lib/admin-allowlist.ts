/**
 * Admin allowlist. Only emails in ADMIN_EMAILS env var (comma-separated)
 * are granted role: "admin" by the auth callbacks. Sign-ins from other
 * emails are rejected before any DB write happens.
 *
 * Setting ADMIN_EMAILS is a Vercel env var operation, not a code change,
 * so this file should never need editing.
 */

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
