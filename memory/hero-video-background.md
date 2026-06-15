---
name: hero-video-background
description: How the homepage hero background works and how to plug in a real video
metadata:
  type: project
---

The homepage hero ([components/home/hero.tsx](components/home/hero.tsx)) renders its background through the reusable `HeroVideoBackground` component ([components/home/hero-video-background.tsx](components/home/hero-video-background.tsx)).

- **Video-first.** A real royalty-free AI/tech clip lives at `public/videos/hero.mp4` (Pexels #29717537, "futuristic abstract digital connection"), poster at `public/videos/hero-poster.jpg`. Wired via `HERO_VIDEO_SRC` / `HERO_VIDEO_POSTER` in [components/home/hero.tsx](components/home/hero.tsx). The `<video>` (muted/autoplay/loop/playsInline/object-cover, softly blurred) lazily mounts client-only; on mobile / reduced motion / error / no-src it falls back to the poster image; if neither exists, a cinematic gradient wash.
- Video opacity: light ≈0.16, dark ≈0.5. Overlays: dark = deep navy veil; light = soft ice veil + faint cyan tint. Plus a soft glow behind the headline + very subtle aurora + cursor glow. **No dots/nodes/particles/code-rain** — the user explicitly rejected the decorative neural-network look as childish; keep it video + minimal glow only.
- Fully adaptive light/dark via `dark:` variants. Light mode must stay visibly cinematic — never an empty white page.
- **Dark is the default theme** (no saved pref → dark). Set in [app/[locale]/layout.tsx](app/[locale]/layout.tsx) via `defaultTheme="dark" enableSystem={false}`. Do not re-enable system default.
- No white halos/fog anywhere: orbital slider centre dots and light-mode glass use soft cyan glow / cyan-tinted glass, never `rgba(255,255,255,…)` shadows.

**Why:** The user wants an award-level, cinematic hero and explicitly forbids grid/square backgrounds.
**How to apply:** Keep changes scoped to hero/background/light-mode/shadows; never reintroduce a grid pattern.

Related: project/product card shadows were softened via `.shadow-soft` / `.shadow-soft-image` / `.shadow-soft-hover` utilities in [app/globals.css](app/globals.css) (theme-aware soft cyan glow instead of heavy black). See [[soft-card-shadows]].
