# Joydip Ghosh | Dynamic Portfolio

A responsive single-page portfolio for **Joydip Ghosh**, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

Dark mode is the default. Visitors can switch to light mode, and their choice is saved locally in the browser.

## Features

- Responsive layout for desktop, tablet, and mobile.
- Solid dark/light theme system with no gradient backgrounds.
- Animated role headline in the hero section.
- Profile photo, social links, WhatsApp shortcut, and contact call-to-actions.
- Native download links for the resume and all three education-result PDFs, plus an in-browser resume preview page (`/resume`).
- Skill groups for frontend, backend knowledge, programming, CMS, and digital marketing.
- Curated project showcase with category filters and dedicated project case-study pages (`/projects/[slug]`).
- Certificate viewer powered by PDF.js.
- Contact form (React Hook Form + Zod validation) with client-side EmailJS delivery and clear success/error states.
- Command palette (`Ctrl+K` / `Cmd+K`) for keyboard-driven navigation, with a matching navbar hint.
- Optional custom cursor with contextual hover states on desktop, always falling back to the native cursor on touch, reduced motion, or failure.
- Optional "Fun experiment" Tic-Tac-Toe game against a browser-based AI opponent; scores persist in `localStorage`.
- Accessible keyboard controls, visible focus styles, reduced-motion support, hover effects, tilt cards, magnetic buttons, typewriter animation, and optional UI sound.
- SEO metadata, Open Graph/Twitter metadata, JSON-LD, `robots.txt`, and `sitemap.xml`.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer, custom CSS |
| Animation | Framer Motion, GSAP ScrollTrigger, Lenis smooth scrolling |
| Forms & validation | React Hook Form, Zod |
| Integrations | EmailJS Browser SDK, PDF.js |
| Quality | ESLint (`eslint-config-next`), TypeScript strict mode |

## Quick start

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Install and run

```bash
npm install
npm run dev
```

The development server runs at `http://127.0.0.1:3000` by default.

To enable the contact form, also create a local environment file:

```powershell
Copy-Item .env.example .env
```

Then add the EmailJS values described below.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Ensures dependencies are ready and starts the Next.js dev server. |
| `npm run build` | Creates the production build. |
| `npm run start` | Serves the production build. |
| `npm run lint` | Checks TypeScript/TSX with ESLint. |

## Environment variables

The contact form uses EmailJS. Copy `.env.example` to `.env` and set:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These are client-side EmailJS settings. Do not place private server secrets in any `NEXT_PUBLIC_` variable.

The contact form (`src/components/contact/ContactForm.tsx`) validates input with React Hook Form and a shared Zod schema (`src/lib/validation/contact.ts`), then sends the message directly from the browser using the EmailJS Browser SDK — there is no server-side API route or backend involved.

The EmailJS template receives:

| Template field | Value |
| --- | --- |
| `to_name` | Joydip Ghosh |
| `to_email` | `joydip.work.mail@gmail.com` |
| `from_name` | Visitor name |
| `from_email` / `reply_to` | Visitor email |
| `subject` | Visitor subject |
| `message` | Visitor message |

Without these values, the page still works and the form explains that EmailJS must be configured.

## Project structure

```text
.
├── public/
│   ├── images/, icons/               # Public profile image and favicon
│   ├── resume/Joydip-Ghosh-Resume.pdf
│   ├── Madhyamik-Reasult.pdf
│   ├── Higher-Secondary-Examination-Reasult.pdf
│   ├── B-Tech-Reasult.pdf
├── scripts/
│   └── ensure-dependencies.mjs       # Pre-development dependency check
├── src/
│   ├── app/                          # App Router entry: layout, home page, project case studies, resume preview
│   ├── components/
│   │   ├── animations/                 # Reveal, TextReveal, scroll progress, aurora, cinematic scroll, hero birds, neon project wave
│   │   ├── contact/                    # Contact form
│   │   ├── layout/                     # Navbar, Footer, PortfolioPage composition, ObservedSection
│   │   ├── sections/                   # Page sections (Hero, About, Skills, Projects, ...)
│   │   └── ui/                         # Buttons, cards, badges, command palette, etc.
│   ├── data/                         # Typed content: projects, skills, experience, education, socials, commands
│   ├── hooks/                        # useDesktopMotion, useMagnetic, useMousePosition, useReducedMotion, usePlatformModifierKey
│   ├── lib/                          # publicAssetUrl.ts, cn.ts, commandPalette.ts, validation/ (shared Zod schema)
│   ├── providers/                    # SmoothScrollProvider, ScrollSpyProvider, AppProviders
│   └── types/portfolio.ts
├── .env.example
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Customization guide

Portfolio content is centralised under `src/data/`:

- `projects.ts` — curated project metadata and case-study content.
- `skills.ts` — skill group cards.
- `experience.ts` — work timeline entries.
- `education.ts` — education entries and result PDF filenames.
- `socials.ts` / `navigation.ts` / `profile.ts` — social links, nav items, and profile copy.

Other common updates:

- Replace the profile image at `public/images/joydip-ghosh-profile.png`.
- Update result/resume download paths via `src/lib/publicAssetUrl.ts` if documents change.
- Update `recipientEmail` in `src/components/contact/ContactForm.tsx` if the inbox changes.
- Update colors and shared presentation in `tailwind.config.js` and `src/app/globals.css`.
- Update title, canonical URL, metadata, and JSON-LD in `src/app/layout.tsx` before deploying to another domain.

## Deployment

Run a production build with:

```bash
npm run build
```

### Vercel

In Vercel, use:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** (default, managed by Next.js)

Add the EmailJS variables in the Vercel project settings before deploying if contact delivery is required.

`vercel.json` also sends each education-result PDF with an attachment header, so all three result links download instead of opening inline.

## SEO

SEO metadata is included and should be kept in sync with the deployed domain:

- `src/app/layout.tsx` — global title, description, canonical URL, Open Graph/Twitter tags, and JSON-LD.
- `src/app/robots.ts` — crawler rules and sitemap location.
- `src/app/sitemap.ts` — homepage, resume, and project case-study URLs.
- `src/app/opengraph-image.tsx` — generated social sharing image.

The current canonical and sitemap URL target the production domain:

```text
https://automade.in/
```

When another domain is the public production URL, replace this URL in all files above.

## Maintenance notes

- The projects section uses the public GitHub API. It needs an internet connection and is subject to GitHub rate limits.
- The theme preference is stored under `portfolio-theme` in `localStorage`.
- `.env`, `node_modules`, and build output are ignored by Git. Do not commit credentials or generated files.

## License

No license has been added. All rights are reserved unless the owner adds one.
