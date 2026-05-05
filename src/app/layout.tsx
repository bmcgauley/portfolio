import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { getSiteSettings } from "@/lib/site-settings-db";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Brian McGauley",
    description:
      "Brian McGauley is an incoming MBA student, independent consultant, and educator working at the intersection of organizational behavior, project management, and digital modernization.",
    openGraph: {
      title: "Brian McGauley",
      description:
        "Incoming MBA student, independent consultant, and educator. Imaginarii consulting, Drawn From publishing.",
      url: "https://brianmcgauley.com",
      siteName: "Brian McGauley",
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Brian McGauley",
      description:
        "Incoming MBA student, independent consultant, and educator.",
    },
    ...(settings?.faviconUrl
      ? { icons: { icon: settings.faviconUrl } }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Trajan Pro 3 via Adobe Typekit (Part IV — Display Face) */}
        <link rel="stylesheet" href="https://use.typekit.net/jkj2xou.css" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="7FR113MWiOJxj46KEYaQkA"
          async
        ></script>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss"
          title="Brian McGauley – Projects & Work"
        />
      </head>
      <body
        className={`${cormorant.variable} ${jetbrainsMono.variable} min-h-screen bg-bone text-ink antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar
            logoUrl={settings?.logoUrl}
            navHeight={settings?.logoNavHeight}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
