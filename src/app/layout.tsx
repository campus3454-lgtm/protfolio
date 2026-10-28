import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { meta, site } from "@/data/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PointerLight } from "@/components/pointer-light";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const baseUrl = new URL(configuredUrl || "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: meta.title,
    template: `%s — ${site.name}`,
  },
  description: meta.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Muhammed Hashir",
    "web designer",
    "web developer",
    "portfolio",
    "responsive websites",
    "front-end developer",
    "India",
  ],
  alternates: configuredUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${site.name} — ${site.role}`,
    title: meta.title,
    description: meta.description,
    url: configuredUrl || undefined,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: meta.ogImageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
  colorScheme: "dark light",
};

const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('mh-theme');if(t!=='light'&&t!=='dark'){t='dark'}d.dataset.theme=t;d.style.colorScheme=t}catch(e){d.dataset.theme='dark'}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <PointerLight />
        <ScrollReveal />
      </body>
    </html>
  );
}
