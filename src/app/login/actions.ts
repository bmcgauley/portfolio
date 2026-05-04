"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function googleSignInAction(callbackUrl?: string) {
  try {
    await signIn("google", { redirectTo: callbackUrl || "/admin" });
  } catch (error) {
    // signIn redirects internally on success — that throws a NEXT_REDIRECT
    // error which we MUST re-throw to let Next handle it. Only catch
    // actual AuthError instances.
    if (error instanceof AuthError) {
      redirect(`/login?error=${encodeURIComponent(error.type)}`);
    }
    throw error;
  }
}

export async function credentialsSignInAction(
  callbackUrl: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: callbackUrl || "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/login?error=${encodeURIComponent(error.type)}`);
    }
    throw error;
  }
}
