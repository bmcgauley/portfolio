import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "House Office",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = (session.user as { role?: string }).role;
  if (role !== "admin") redirect("/");

  const userName = (
    session.user.name ??
    session.user.email ??
    "ADMIN"
  ).toString();

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <AdminShell userName={userName} signOutAction={signOutAction}>
      {children}
    </AdminShell>
  );
}
