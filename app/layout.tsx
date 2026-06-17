import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://magas7.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MAGAS7 · Marketing Agents. The agentic OS for marketing teams.",
    template: "%s · MAGAS7",
  },
  description:
    "MAGAS7 is the agentic command center for marketing. Spin up agents that research, write, design, schedule, post, and analyze. They do the work, you give direction.",
  keywords: [
    "marketing agents",
    "AI marketing",
    "agentic marketing",
    "marketing automation",
    "AI marketing tools",
    "marketing OS",
    "agentic AI",
    "AI for marketing teams",
  ],
  authors: [{ name: "MAGAS7" }],
  creator: "MAGAS7",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MAGAS7",
    title: "MAGAS7 · Marketing Agents",
    description:
      "Spin up agents that research, write, design, schedule, post, and analyze. The agentic OS for marketing.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MAGAS7 · Marketing Agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAGAS7 · Marketing Agents",
    description: "The agentic OS for marketing teams. Coming soon.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Geist font from Vercel CDN, modern, OpenAI/Vercel-style */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "MAGAS7",
              alternateName: "Marketing Agents",
              applicationCategory: "BusinessApplication",
              operatingSystem: "macOS, Windows, Linux",
              description:
                "The agentic OS for marketing teams. Spin up agents that research, write, design, schedule, post, and analyze.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-signal focus:px-3 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
