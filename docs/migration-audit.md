# Migration Audit

This audit documents the current portfolio before the Next.js migration. The current project is not a Next.js app. In this repository, the working version is a Vite-powered React single-page app written in JavaScript/JSX, styled with Tailwind CSS and custom CSS, and animated with Framer Motion, Lenis, CSS animations, and GSAP ScrollTrigger.

## Existing Technology Stack

- Runtime/UI: React 18, React DOM
- Build tool: Vite 6 with `@vitejs/plugin-react`
- Styling: Tailwind CSS 3, PostCSS, Autoprefixer, `src/styles/global.css`
- Animation: Framer Motion, Lenis smooth scrolling, GSAP ScrollTrigger, CSS keyframes, pointer tilt helpers
- Icons: `react-icons`
- PDF rendering: `pdfjs-dist`
- Contact delivery: EmailJS Browser SDK
- Data source: public GitHub REST API
- Deployment: static Vite build, Vercel headers, GitHub Pages base-path support

## Existing Directory Structure

```text
.
├── docs/
├── public/
│   ├── certificates/
│   ├── B-Tech-Reasult.pdf
│   ├── Higher-Secondary-Examination-Reasult.pdf
│   ├── Joydip-Ghosh-Resume.pdf
│   ├── Madhyamik-Reasult.pdf
│   ├── buzzer.mp3
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── ensure-dependencies.mjs
├── src/
│   ├── animations/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── sections/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── eslint.config.js
├── postcss.config.js
├── package.json
└── package-lock.json
```

## HTML, CSS, and JavaScript Files

- HTML entry: `index.html`
- Main React entry: `src/main.jsx`
- App shell: `src/App.jsx`
- CSS: `src/styles/global.css`, Tailwind utilities, Lenis CSS import in `src/components/SmoothScroll.jsx`
- JavaScript/JSX modules: reusable components, sections, hooks, data, services, and utilities under `src/`
- Tailwind config: `tailwind.config.js`
- Vite config: `vite.config.js`

## Existing Sections

- Navbar: theme toggle, active section scrollspy, desktop/mobile navigation, contact CTA
- Hero: profile photo, animated titles, audio mute control, resume/results downloads, social links, scroll cue
- About: profile summary and highlight cards
- Skills: grouped skill cards
- Experience: timeline-style experience cards
- Projects: live GitHub repository list with curated metadata and action links
- Tech Stack: technology grid with icons and hover sound
- Certificates: certificate cards and PDF viewer modal
- Work Process: four-step service process
- FAQ: accordion
- Contact: booking callout and EmailJS form
- Tic Tac Toe: optional browser game with local score persistence
- Footer: brand block, navigation, social links, email CTA, WhatsApp floating CTA

## Existing Functionality

- Dark/light theme toggle stored in `localStorage` as `portfolio-theme`
- Lenis smooth scrolling with anchor offsets
- Scroll progress bar
- Hero typewriter with optional browser audio
- Resume and education-result downloads
- Live GitHub project fetching from `coderbit96`
- Curated project metadata fallback/override
- PDF certificate rendering with PDF.js worker
- EmailJS contact submission with inline status and toast
- Optional booking CTA controlled by environment variable
- WhatsApp link to `https://wa.me/919641212416`
- Lazy-loaded sections via React `lazy` and `Suspense`
- IntersectionObserver-based deferred section mounting
- Responsive navigation menu
- Reduced-motion handling through Framer Motion and CSS
- Tic Tac Toe game with bot opponent and persistent scores in `localStorage`

## Existing Third-Party Dependencies

- `@emailjs/browser`
- `@vitejs/plugin-react`
- `autoprefixer`
- `eslint`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `framer-motion`
- `gsap`
- `lenis`
- `pdfjs-dist`
- `postcss`
- `react`
- `react-dom`
- `react-icons`
- `tailwindcss`
- `vite`

## Existing Assets

- Profile image: `src/assets/joydip-ghosh-profile.png`
- Favicon: `src/assets/favicon.svg`
- Audio: `public/buzzer.mp3`
- Resume: `public/Joydip-Ghosh-Resume.pdf`
- Education PDFs:
  - `public/Madhyamik-Reasult.pdf`
  - `public/Higher-Secondary-Examination-Reasult.pdf`
  - `public/B-Tech-Reasult.pdf`
- Certificate PDFs:
  - `public/certificates/professional-java-programming.pdf`
  - `public/certificates/developer-internship-certificate.pdf`
  - `public/certificates/developer-internship-performance-letter.pdf`
- SEO files:
  - `public/robots.txt`
  - `public/sitemap.xml`

## Images, Icons, and Fonts

- Images are currently imported from `src/assets/`.
- Icons come from `react-icons/fa`, `react-icons/fa6`, `react-icons/si`, and `react-icons/di`.
- Font stack is CSS-based: Inter/Satoshi fallbacks are declared, but no local font files or external font loader are configured.

## Existing Forms and APIs

- Contact form component: `src/components/ContactForm.jsx`
- Email provider: EmailJS Browser SDK
- Recipient email: `joydip.work.mail@gmail.com`
- GitHub API module: `src/services/githubProjects.js`
- GitHub username: `coderbit96`
- GitHub API version header: `2022-11-28`
- Project refresh interval: 5 minutes
- Max displayed projects: 6

## Environment Variables

Current Vite variables:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_BOOKING_URL`

Next.js migration mapping:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_BOOKING_URL`

These are public browser variables. Do not place private server secrets in them.

## Links

- GitHub profile: `https://github.com/coderbit96`
- GitHub repositories API: `https://api.github.com/users/coderbit96/repos?type=owner&sort=updated&per_page=30`
- LinkedIn: `https://www.linkedin.com/in/joydip-ghosh-83073033a?utm_source=share_via&utm_content=profile&utm_medium=member_android`
- Facebook: `https://www.facebook.com/share/1GfuCcyyhp/`
- Instagram: `https://www.instagram.com/ex.plorer_96?igsh=MW16NDJmOGQzaHc1Yg==`
- WhatsApp: `https://wa.me/919641212416`
- Email: `mailto:joydip.work.mail@gmail.com`
- Current canonical URL in metadata: `https://coderbit96.github.io/Dynamic-Portfolio/`

## Existing SEO Configuration

- `index.html` includes title, description, keywords, author, robots, canonical URL, Open Graph metadata, Twitter card metadata, theme color, favicon, and `Person` JSON-LD.
- `public/robots.txt` allows all crawlers and points to the sitemap.
- `public/sitemap.xml` lists the current GitHub Pages URL.
- SEO URLs should be updated to the production domain `automade.in` during migration if that is the intended canonical domain.

## Existing Analytics and Tracking

- No analytics or tracking script was found in the repository.

## Existing Animations

- Framer Motion reveal variants in `src/animations/variants.js`
- Word reveal, scramble text, typewriter, scroll progress, card tilt, magnetic buttons
- Lenis smooth scrolling in `src/components/SmoothScroll.jsx`
- GSAP ScrollTrigger cinematic hero transition in `src/components/CinematicScroll.jsx`
- CSS keyframes for WhatsApp float/pulse and Tailwind float animation
- Pointer-driven hover cards through `src/utils/hoverCard.js`

## Existing Responsive Behavior

- Tailwind responsive classes across all sections
- Mobile navigation below the `lg` breakpoint
- Lenis smooth wheel disabled on compact viewports
- Pointer-driven effects limited to desktop/fine-pointer devices
- Reduced-motion users avoid heavy animations
- Layouts move from single-column mobile to multi-column desktop grids

## Features That Must Be Preserved

- All content, section order, copy, links, downloads, and assets
- Theme toggle and saved user theme preference
- Responsive layout and mobile menu
- Smooth scrolling and scroll progress
- Hero typewriter and optional audio behavior
- Resume and result downloads
- Live GitHub project list and project metadata mapping
- Certificate PDF viewer
- Contact form validation and EmailJS delivery
- Booking CTA behavior
- Social links, email link, and WhatsApp CTA
- SEO metadata, JSON-LD, robots, and sitemap
- Reduced-motion behavior
- Tic Tac Toe game and persisted score
- Light-mode contrast fixes
- Project-card hover behavior

## Features That Appear Unused or Broken

- The repository has no commits yet, so the initial migration branch preserves a staged working tree rather than a committed baseline.
- Current SEO canonical/sitemap URLs point to GitHub Pages, not `automade.in`.
- Download filenames use `Reasult` instead of `Result`; this is intentional in current code and must not be renamed without updating references.
- No analytics/tracking integration is present.
- EmailJS is disabled until public environment variables are configured.
- GitHub project fetching depends on public API rate limits and client network access.
- The old custom cursor component was removed before this audit per the previous request.

## Recommended Next.js Migration Mapping

| Current implementation | Next.js App Router equivalent |
| --- | --- |
| `index.html` metadata and JSON-LD | `src/app/layout.tsx` metadata export plus JSON-LD script |
| `src/main.jsx` | Next.js runtime entry, removed from active app after migration |
| `src/App.jsx` | `src/app/page.tsx` composition |
| `src/styles/global.css` | `src/app/globals.css` |
| `src/components/Navbar.jsx` | `src/components/layout/Navbar.tsx` |
| `src/components/Footer.jsx` currently under sections | `src/components/layout/Footer.tsx` |
| `src/components/SmoothScroll.jsx` | `src/providers/SmoothScrollProvider.tsx` |
| `src/components/CinematicScroll.jsx` | `src/components/animations/CinematicScroll.tsx` |
| `src/components/AuroraBackground.jsx` | `src/components/animations/AuroraBackground.tsx` |
| `src/components/ScrollProgressBar.jsx` | `src/components/animations/ScrollProgressBar.tsx` |
| `src/components/ScrollReveal.jsx` | `src/components/animations/ScrollReveal.tsx` |
| `src/components/WordReveal.jsx` | `src/components/animations/WordReveal.tsx` |
| `src/components/ScrambleText.jsx` | `src/components/animations/ScrambleText.tsx` |
| `src/components/Typewriter.jsx` | `src/components/animations/Typewriter.tsx` |
| `src/components/MagneticButton.jsx` | `src/components/ui/MagneticButton.tsx` |
| `src/components/TiltCard.jsx` | `src/components/ui/TiltCard.tsx` |
| `src/components/SectionHeading.jsx` | `src/components/ui/SectionHeading.tsx` |
| `src/components/BookingCallout.jsx` | `src/components/contact/BookingCallout.tsx` |
| `src/components/ContactForm.jsx` | `src/components/contact/ContactForm.tsx` |
| `src/components/CertificateViewer.jsx` | `src/components/ui/CertificateViewer.tsx` |
| `src/sections/Hero.jsx` | `src/components/sections/Hero.tsx` |
| `src/sections/About.jsx` | `src/components/sections/About.tsx` |
| `src/sections/Skills.jsx` | `src/components/sections/Skills.tsx` |
| `src/sections/Experience.jsx` | `src/components/sections/Experience.tsx` |
| `src/sections/Projects.jsx` | `src/components/sections/Projects.tsx` and `src/components/projects/ProjectCard.tsx` if split later |
| `src/sections/TechStack.jsx` | `src/components/sections/TechStack.tsx` |
| `src/sections/Certificates.jsx` | `src/components/sections/Certificates.tsx` |
| `src/sections/WorkProcess.jsx` | `src/components/sections/WorkProcess.tsx` |
| `src/sections/Faq.jsx` | `src/components/sections/Faq.tsx` |
| `src/sections/Contact.jsx` | `src/components/sections/Contact.tsx` |
| `src/sections/TicTacToe.jsx` | `src/components/sections/TicTacToe.tsx` |
| `src/data/portfolio.js` | Split into `src/data/projects.ts`, `skills.ts`, `experience.ts`, `education.ts`, `socials.ts` |
| `src/services/githubProjects.js` | `src/lib/githubProjects.ts` or server route if private tokens are added later |
| `src/hooks/useDesktopMotion.js` | `src/hooks/useDesktopMotion.ts` |
| `src/utils/hoverCard.js` | `src/lib/hoverCard.ts` or `src/components/animations/hoverCard.ts` |
| `public/*.pdf` | `public/resume/` and existing public PDF paths, with redirects or updated links |
| `src/assets/joydip-ghosh-profile.png` | `public/images/joydip-ghosh-profile.png` or Next image import |
| `src/assets/favicon.svg` | `public/icons/favicon.svg` or `src/app/icon.svg` |
| `vercel.json` PDF headers | Preserve and update paths if public assets are moved |
| `vite.config.js` | `next.config.ts` |

## Step 0 Conclusion

The site has a complete single-page portfolio experience that should be migrated section-by-section into typed React components under the Next.js App Router. The safest path is to first establish a Next.js TypeScript foundation, preserve the current Vite implementation files during transition, then progressively move components into the target folders while keeping all assets and public links available.
