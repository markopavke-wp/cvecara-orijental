import type { Metadata } from "next";
import { Great_Vibes, Outfit, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BodyTheme } from "@/components/BodyTheme";
import { ScrollProgress } from "@/components/ScrollProgress";
import { assets } from "@/lib/assets";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Orijental moja cvećara | Niš",
    template: "%s | Orijental moja cvećara",
  },
  description:
    "Orijental Moja Cvećara u Nišu – porodična cvećara sa tradicijom. Buketi, flower box, 101 ruža, saksijsko i rezano cveće, program za saučešće. Lokacije: Pevac, Novo Groblje i Trg.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orijental moja cvećara",
    description:
      "Cvetna magija za svaki trenutak. Porodična cvećara u Nišu od 1995. godine.",
    url: "/",
    siteName: "Orijental moja cvećara",
    images: [assets.ogImage],
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orijental moja cvećara",
    description:
      "Cvetna magija za svaki trenutak. Porodična cvećara u Nišu od 1995. godine.",
    images: [assets.ogImage],
  },
  icons: {
    icon: assets.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${display.variable} ${script.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <BodyTheme />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
