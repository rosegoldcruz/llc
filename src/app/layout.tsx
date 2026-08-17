import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/data/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: {
    default: `${site.name} | Interior Finishes Supply`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
    title: `${site.name} | Interior Finishes Supply`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Interior Finishes Supply`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0E1012',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-label focus:text-warm-50"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
