# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for **YR System** (`yrsystem.com`, served via GitHub Pages — see `CNAME`). It is **not** a typical Node project: there is no build step, no bundler, no `package.json`, no test framework, and no linter. All JSX is compiled in the browser by Babel Standalone at page load.

Do not try to run `npm`, `vite`, `jest`, `eslint`, etc. — none of them exist here.

## Running it locally

Because `index.html` loads external `.jsx` files via `<script type="text/babel" src="…">`, the page must be served by an HTTP server (opening it via `file://` will fail with CORS errors). From the repo root:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
# or
npx serve
```

Note: the existing `README.md` says to `cd src` first — that is **stale**. All source files live at the repo root, not in a `src/` directory.

## Deployment

GitHub Pages. The `CNAME` file pins the domain to `yrsystem.com`. Pushing to the default branch publishes — no CI, no build artifacts. Everything in the repo ends up live.

## Architecture

### Load order matters

There is no module system. Every `.jsx` file declares globals (`const Hero = …`, `const TRANSLATIONS = …`), and `index.html` loads them one by one via `<script type="text/babel">` tags. **The order in `index.html` is the dependency order** — helpers and components must be loaded before anything that uses them, and `App.jsx` must be last.

If you add a new component file under `components/`, you **must** add a corresponding `<script type="text/babel" src="components/Foo.jsx"></script>` line in `index.html` before the `App.jsx` script tag. Otherwise the component is undefined at render time.

### Prop convention: `T`, `A`, `t`

`App.jsx` is the only stateful root. It reads tweaks, then passes three props down to every section:

- **`T`** — theme tokens (bg, text, dim, line, …) from `THEMES[tweaks.theme]` in `theme.jsx`
- **`A`** — accent palette (`c`, `soft`, `ink`) from `ACCENTS[tweaks.accent]` in `theme.jsx`
- **`t`** — translation dictionary from `window.TRANSLATIONS[lang]` in `i18n.jsx`

Any new component should accept and use these three props rather than reading globals directly. Hardcoded colors / strings break theme switching and i18n.

### The Tweaks panel

`tweaks-panel.jsx` implements a live-editing panel (theme/accent/language/visibility toggles) and **the host protocol that communicates with the Claude Code editor** (postMessage events like `__activate_edit_mode`, `__edit_mode_set_keys`). **Don't edit this file** — it's a shared artifact and the protocol is part of the editor integration.

The defaults the panel mutates live inside the `/*EDITMODE-BEGIN*/{...}/*EDITMODE-END*/` block at the top of `theme.jsx`. That comment marker is parsed by the editor; preserve it exactly.

### i18n

All user-facing text lives in `i18n.jsx` under `TRANSLATIONS.es` and `TRANSLATIONS.en`. Components must reference `t.some_key` rather than literal strings. When adding copy, add **both** language keys; missing keys silently render as `undefined`.

Default language is `es`. The Nav has a toggle; state is in `tweaks.lang`.

### Styling

Inline styles only — no CSS files (apart from one big `<style>` block injected from `App.jsx` for keyframes and shared classes like `.hover-lift`, `.mono`, `.shimmer-text`). Colors use OKLCH. CSS custom properties (`--acc`, `--bg`, `--text`, …) are defined in that injected block and can be referenced from inline styles or class rules.

Respect the `@media (prefers-reduced-motion: reduce)` rule already in `App.jsx` — don't add animations that bypass it.

### Animations

`gsap-animations.jsx` exposes a `GsapUtils` global (`heroTimeline`, `cardHover3D`, `scrollReveal`, `inputGlow`, …). GSAP + ScrollTrigger and AOS are loaded from CDN in `index.html`. Use these helpers instead of re-wiring GSAP from scratch in each component.

### Contact form

`components/Contact.jsx` loads the EmailJS SDK (`@emailjs/browser`) and declares `EMAILJS_*` constants, **but the submit handler actually opens a `wa.me` WhatsApp deep link** with the form contents URL-encoded — EmailJS is currently dead code. If you "fix" the form to send email, remove the WhatsApp branch deliberately rather than assuming it's a bug.

### Section order

The page is composed in `App.jsx` `<main>` in this order: Hero → About → StatusBar → Services → Portfolio → CodeShowcase → Stack → Process → Work → Pricing → FAQ → Contact. Reordering sections is a one-line change in `App.jsx`. `StatusBar` is gated on `tweaks.showStatusBar`.

## Identity / content edit points

- **Logo:** `logo.png` (single source — used in Nav, Hero, Footer)
- **Tagline & all copy:** `i18n.jsx`
- **Email / phone / WhatsApp number:** `components/Contact.jsx` and `components/Footer.jsx` (hardcoded — change in both)
- **SEO meta, OpenGraph, JSON-LD:** `index.html` `<head>`
- **Colors / theme tokens:** `theme.jsx` (`THEMES` and `ACCENTS`)
