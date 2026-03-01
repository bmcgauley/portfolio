import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brian McGauley | Web Developer, IT Consultant & MBA Student",
  description: "Portfolio of Brian McGauley — Web Developer, IT Consultant (Imaginarii), and MBA student at Fresno State. B.S. graduate (Summa Cum Laude, Dec 2025). Specializing in web development, branding, data analytics, and electronic music production.",
  openGraph: {
    title: "Brian McGauley | Web Developer, IT Consultant & MBA Student",
    description: "Web Development, IT Consulting (Imaginarii), Data Analytics, and Music Production Portfolio. B.S. Summa Cum Laude, Dec 2025. MBA student at Fresno State.",
    url: "https://brianmcgauley.com",
    siteName: "Brian McGauley",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian McGauley | Web Developer, IT Consultant & MBA Student",
    description: "Web Development, IT Consulting (Imaginarii), Data Analytics, and Music Production Portfolio.",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="7FR113MWiOJxj46KEYaQkA" async></script>
        <link rel="alternate" type="application/rss+xml" href="/rss" title="Brian McGauley – Projects & Work" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
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
