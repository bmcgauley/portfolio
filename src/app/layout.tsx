import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "Brian McGauley",
  description:
    "Brian McGauley is an MBA candidate, independent consultant, and educator working at the intersection of organizational behavior, project management, and digital modernization.",
  openGraph: {
    title: "Brian McGauley",
    description:
      "MBA candidate, independent consultant, and educator. Imaginarii consulting, Drawn From publishing.",
    url: "https://brianmcgauley.com",
    siteName: "Brian McGauley",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian McGauley",
    description:
      "MBA candidate, independent consultant, and educator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
