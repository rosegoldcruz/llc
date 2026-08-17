# Image assets

Nothing in this folder is required for the site to build or look finished. Every
image slot falls back to an original line-drawn architectural elevation, which
is a deliberate visual treatment rather than a placeholder. Swap in photography
as it becomes available, one slot at a time.

## How to add an image

1. Drop the file in the matching folder below.
2. Point the `image` (or `heroImage`) field in the matching data file at it.
3. The drawing disappears and `next/image` takes over automatically.

Only use photography Vulpine owns or is licensed to use. No stock imagery
implying it is a Vulpine project.

## Slots

### Capabilities — `src/data/capabilities.ts`
Recommended: 1600x1067 (3:2), JPG or WebP.

| Folder | Shot |
| --- | --- |
| `capabilities/cabinets.jpg` | Installed kitchen cabinetry in a delivered unit |
| `capabilities/vanities.jpg` | Bath vanity with countertop, straight-on |
| `capabilities/countertops.jpg` | Countertop surface and edge over cabinetry |
| `capabilities/doors.jpg` | Doors staged on site or an installed unit entry |
| `capabilities/windows.jpg` | Elevation with installed windows |
| `capabilities/flooring.jpg` | Finished corridor or unit interior |
| `capabilities/wall-panels.jpg` | Amenity or corridor panel installation |
| `capabilities/trim-and-molding.jpg` | Installed base and casing detail |
| `capabilities/interior-finish-packages.jpg` | Completed unit showing several categories |

### Projects — `src/data/projects.ts`
`projects/<slug>/hero.jpg` at 1920x1080, gallery images at 1600x1200.

### Team — `src/data/team.ts`
`team/<name>.jpg`, square, 800x800, consistent background across the team.

### Social share image
Add an approved 1200x630 banner as `src/app/opengraph-image.jpg`. Next.js wires
it into Open Graph and Twitter metadata automatically. Until then, link previews
fall back to title and description text only.
