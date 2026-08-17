import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
