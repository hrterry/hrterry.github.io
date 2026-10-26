import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hrterry.github.io"),
  title: { default: "Haron Xu", template: "%s · Haron Xu" },
  description: "Haoran (Haron) Xu — generative models for scientific discovery: spatial omics, computational pathology, RNA and protein design.",
  keywords: ["generative models", "biological foundation models", "AI for science", "spatial omics", "computational pathology", "RNA design"],
  icons: { icon: "/assets/img/favicon.svg", apple: "/assets/img/apple-touch-icon.png" },
  openGraph: { title: "Haron Xu", description: "Generative models for scientific discovery.", url: "https://hrterry.github.io", type: "website", images: ["/assets/img/photo.webp"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f3f4ef" }, { media: "(prefers-color-scheme: dark)", color: "#070f0e" }] };

// Applies the saved theme before paint (no flash).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
