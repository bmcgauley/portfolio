"use server";

import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createUserWithPassword } from "@/lib/users";
import { isAdminEmail } from "@/lib/admin-allowlist";

export async function registerAction(formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const password = formData.get("password") as string | null;
  const name = (formData.get("name") as string | null)?.trim() || undefined;

  if (!email || !password) redirect("/register?error=MISSING_FIELDS");
  if (password.length < 10) redirect("/register?error=WEAK_PASSWORD");
  if (!isAdminEmail(email)) redirect("/register?error=NOT_ALLOWED");

  try {
    const passwordHash = await hash(password, 12);
    await createUserWithPassword({ email, name, passwordHash });
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_EXISTS") {
      redirect("/register?error=EMAIL_EXISTS");
    }
    redirect("/register?error=UNKNOWN");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/login?error=${encodeURIComponent(error.type)}`);
    }
    throw error;
  }
}
