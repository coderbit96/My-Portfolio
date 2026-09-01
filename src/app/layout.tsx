import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.author}`
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  applicationName: siteConfig.name,
  category: "portfolio",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Joydip Ghosh — Full-Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Joydip Ghosh — Full-Stack Developer"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon-16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/icons/favicon-32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/icons/favicon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    shortcut: "/icons/favicon-32.png",
    apple: [
      {
        url: "/images/logo-180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
  colorScheme: "dark"
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author,
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      jobTitle: "Full-Stack Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN"
      },
      sameAs: [siteConfig.github, siteConfig.linkedin],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MERN stack",
        "REST APIs",
        "Tailwind CSS",
        "WordPress",
        "SEO",
        "PHP",
        "Laravel",
        "Java",
        "Python"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@id": `${siteConfig.url}/#person`
      }
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="portfolio-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
