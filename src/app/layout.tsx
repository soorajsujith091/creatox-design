import type { Metadata } from "next";
import { Inter, Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creatox Designs — Full-Service Digital Agency in Kannur, Kerala",
  description:
    "We blend creativity, strategy, and technology to craft brand identities, websites, and campaigns that look premium and perform with purpose. Based in Kannur, Kerala.",
  keywords: [
    "digital agency",
    "branding",
    "web design",
    "Kannur",
    "Kerala",
    "social media management",
    "Creatox",
  ],
  openGraph: {
    title: "Creatox Designs — Full-Service Digital Agency",
    description:
      "We blend creativity, strategy, and technology to craft brand identities, websites, and campaigns that look premium and perform with purpose.",
    type: "website",
    locale: "en_IN",
    siteName: "Creatox Designs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-black text-white font-body antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <Preloader />
        <CustomCursor />
        <Navbar />

        {/* Noise grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Grid lines overlay */}
        <div className="grid-overlay" aria-hidden="true" />

        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>

        <MobileStickyBar />
      </body>
    </html>
  );
}
