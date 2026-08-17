# Vulpine — Corporate Website

Production Next.js site for **vulpine.llc**. Interior finishes supply, positioned
for procurement audiences: general contractors, developers, builders, ownership
groups, and project teams.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.
Server components by default; client components only where there is real browser
interaction (forms, mobile nav, project filters).

---

## Before you launch — the short list

The site builds and looks complete right now, but four things need real values.
Everything else is done.

### 1. Contact details — `src/data/site.ts`
Email, phone, and address are empty strings. Components **hide** contact blocks
that are not filled in rather than showing invented details. Fill in the public
business contact info and they appear everywhere at once.

### 2. Where form submissions go — environment variables
Forms currently return a clear error instead of pretending to succeed. Set
**one** of these in Vercel and they start working:

- `SUBMISSION_WEBHOOK_URL` — point this at GoHighLevel, n8n, or any CRM endpoint
- or `RESEND_API_KEY` + `SUBMISSION_FROM_EMAIL` + `SUBMISSION_TO_EMAIL`

Set both and submissions go to both. See `.env.example`.

### 3. File uploads
Create a Blob store in Vercel (Storage → Blob), then set
`NEXT_PUBLIC_UPLOADS_ENABLED=true`. `BLOB_READ_WRITE_TOKEN` is injected
automatically on Vercel.

Until then the upload field shows an honest message telling the visitor we will
follow up so they can send documents directly. It does not silently fail.

Files go **browser → Vercel Blob directly**, never through the serverless
function. That is deliberate: routing uploads through the function would cap
them near 4.5 MB, which is smaller than most plan sets. Current limit is 50 MB
per file, 8 files, set in `src/lib/schemas.ts`.

### 4. Brand assets
- `src/app/icon.svg` is a placeholder favicon — replace with the approved fox mark
- `src/components/ui/FoxMark.tsx` is a stand-in seal — replace with the real vector
- Add `src/app/opengraph-image.jpg` (1200x630) for link previews
- See `public/images/README.md` for the photography slots

---

## Content lives in one place

All editable business content is in `src/data/`. Nothing is duplicated in JSX,
so changing a capability description or adding a project is a one-file edit.

| File | Contents |
| --- | --- |
| `site.ts` | Company name, tagline, descriptions, contact, navigation |
| `capabilities.ts` | The nine product categories and their detail pages |
| `industries.ts` | The eight markets served |
| `process.ts` | Five-step process and the full eight-stage sequence |
| `projects.ts` | **Empty.** See below |
| `team.ts` | **Empty.** See below |
| `partners.ts` | Partnership paths and network areas |

### Projects and team are intentionally empty

Nothing is published that has not been verified. The components are built,
tested, and styled — they just have no data yet.

- **Projects:** the projects page shows a designed empty state, and the homepage
  section renders it too. Filters turn on automatically once there are six or
  more projects. Never publish bid amounts, margins, supplier pricing, or
  anything else out of a bid package. A template is commented in the file.
- **Team:** the About page hides the team section entirely while the array is
  empty — no placeholder faces. Daniel Cruz and Mike Musonda are scaffolded in
  comments; fill in approved titles, 2–3 sentence bios, and headshots.

---

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Deploy

Push to a Git repo, import in Vercel, set the environment variables above, and
point `vulpine.llc` at it. `NEXT_PUBLIC_SITE_URL` should be
`https://vulpine.llc` so canonicals, sitemap, and robots resolve correctly.

Note `vulpinehomes.com` is the separate Arizona residential brand. This build
does not touch it.

---

## How things are built

**Design.** Charcoal and warm-white sections alternate so the page never becomes
one long black rectangle. The recurring structural device is drawing-sheet
chrome: mono section references, hairline rules, and sheet numbers. Type is
Archivo for display, Inter for body, IBM Plex Mono for labels and data.

**The elevations.** Rather than fill the site with stock photography, every
image slot falls back to an original SVG line drawing of the actual product
category — a cabinet run, a vanity, a countertop section, a door schedule. The
company sells from drawing sets, so the drawing set is the honest visual
language, and it means the site ships with zero imagery pretending to be a
Vulpine project. Real photography replaces them individually.

**Brand accent.** `#F97316`, carried over from the existing Vulpine site so the
two properties agree. Used sparingly: rules, section numbers, one CTA. Tokens
are in `tailwind.config.ts` and `src/app/globals.css` — change them there and
nowhere else.

**Forms.** Zod schemas in `src/lib/schemas.ts` are shared by client and server,
so validation cannot drift between them. Every route re-validates server-side.
Protection is a honeypot field plus per-IP rate limiting — no CAPTCHA, because
making a GC identify traffic lights before sending a large scope is
self-defeating. Rate limiting is in-memory and therefore per-instance; if real
spam volume shows up, swap `src/lib/rate-limit.ts` for a shared store behind the
same function signature.

**Analytics.** No tracking library installed. `src/lib/analytics.ts` is the
single emit point and feeds `window.dataLayer` (GTM) or `window.va` (Vercel
Analytics) if either is present, and drops events silently if neither is. Events:
`submit_project_click`, `submit_project_started`, `submit_project_completed`,
`contact_completed`, `partner_inquiry_completed`, `invite_to_bid_click`,
`phone_click`, `email_click`.

**SEO.** Per-route metadata and canonicals, `sitemap.xml` and `robots.txt`
generated from the data files (so new capabilities and projects appear
automatically), Organization + WebSite + BreadcrumbList structured data. API
routes are disallowed in robots. No Review or rating schema — there are no
verified reviews to represent.

**Accessibility.** Semantic landmarks, one `h1` per page, visible focus rings,
labelled form controls with `aria-invalid` and `aria-describedby` on errors,
`role="alert"` on validation messages, skip link, and `prefers-reduced-motion`
respected globally.

## Verified before handoff

Production build passes (22 routes), `tsc --noEmit` clean, ESLint clean, zero
browser console errors, every route returns 200, 404 returns 404, mobile nav
opens and closes, form validation and the unconfigured-delivery error path both
behave correctly, and layouts were checked at 390px and 1440px.
