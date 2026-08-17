import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { capabilities } from '@/data/capabilities';
import { projects } from '@/data/projects';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: '', priority: 1 },
    { path: '/capabilities', priority: 0.9 },
    { path: '/industries', priority: 0.8 },
    { path: '/projects', priority: 0.7 },
    { path: '/process', priority: 0.7 },
    { path: '/about', priority: 0.7 },
    { path: '/partners', priority: 0.6 },
    { path: '/submit-project', priority: 0.9 },
    { path: '/contact', priority: 0.6 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
    ...capabilities.map((capability) => ({
      url: `${base}/capabilities/${capability.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
