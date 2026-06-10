# Motion-3D Landing Page Pipeline — Codex / OpenAI Agents

> Production framework for building motion + 3D landing pages by combining **ui-ux-pro-max** (design system), **Framer Motion** (DOM animation), **React Three Fiber** (real-time 3D), **Remotion** (cinematic pre-renders), and **Higgsfield** (generative assets).

Drop this file into any consumer project's root or under `docs/`. Pair with `CLAUDE.md` (Claude Code variant) in the same directory. This file is platform-agnostic — references CLI commands and primitives, not Anthropic-only skills.

---

## Layer Stack (z-axis, render order)

```
┌──────────────────────────────────────────────────────────┐
│ Layer 4: Framer Motion overlays                          │  cursor, badges, scroll progress, toasts
├──────────────────────────────────────────────────────────┤
│ Layer 3: HTML + Framer Motion                            │  copy, CTAs, sections, forms, transitions
├──────────────────────────────────────────────────────────┤
│ Layer 2: Remotion <video> embeds                         │  cinematic intros, looping hero films
├──────────────────────────────────────────────────────────┤
│ Layer 1: React Three Fiber Canvas                        │  interactive 3D scenes, particles, shaders
├──────────────────────────────────────────────────────────┤
│ Layer 0: Higgsfield generative assets                    │  HDRIs, textures, product shots, faces
└──────────────────────────────────────────────────────────┘
```

Each layer is independently optional. A page can ship with just Layer 3 + Layer 0 and still feel killer. Only stack what the brief demands.

---

## Tool Decision Matrix

| Need | Tool | Why |
|------|------|-----|
| Interactive 3D product | **R3F + drei** | Real-time, GPU, gesture-ready |
| Scroll-tied 3D camera dolly | **R3F + drei `ScrollControls`** | Purpose-built API |
| Particle / shader background | **R3F custom shader** | Cheaper than looping video |
| Hero film (3–8 sec, predictable) | **Remotion → MP4/WebM** | Frame-perfect, cacheable |
| Generative-AI hero video | **Higgsfield generate** | Brand-grade, prompt-driven |
| Animated logo intro | **Remotion** | Predictable, no GPU spike |
| Scroll text reveals | **Framer Motion `whileInView`** | DOM-light, reduced-motion safe |
| Gesture drag / swipe / pinch | **Framer Motion `drag`** | Best-in-class API |
| Page transitions | **Framer Motion `AnimatePresence`** | Layout-safe |
| Magnetic / sticky cursor | **Framer Motion `useMotionValue`** | Pointer-precision |
| Studio product photo | **Higgsfield product-photoshoot `product_shot`** | Brand-grade |
| Hand-with-product photo | **Higgsfield product-photoshoot `closeup_product_with_person`** | Studio realism |
| UGC avatar ad video | **Higgsfield Marketing Studio** | Done-for-you talking head |
| Recurring brand spokesperson | **Higgsfield Soul ID → generate** | Identity-faithful |
| Data viz with motion | **Framer Motion + visx/recharts** | DOM-friendly, accessible |
| 3D data viz | **R3F + three-globe / custom** | Real-time, dimensional |

**Rule of thumb:** deterministic + repeating → **Remotion**. Interactive + reactive → **R3F or Framer Motion**.

---

## 5-Stage Production Pipeline

### Stage 1 — Brief & Brand (lock design system first)

```bash
python3 ~/projects/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py \
  "<product-type> <industry> <tone-keywords>" \
  --design-system --persist -p "<Project Name>"
```

Outputs `design-system/MASTER.md` + `design-system/pages/<page>.md`. All motion timings, palette, and typography derive from these. Re-run with new keywords if the system doesn't fit — cheaper than rebuilding.

### Stage 2 — Asset Generation (Higgsfield)

Generate assets **before** writing R3F/Remotion code so the build is asset-shaped.

```bash
# Auth once per machine
higgsfield auth login

# Studio hero still
higgsfield product-photoshoot run product_shot \
  --prompt "matte black wireless headphones on lacquered onyx pedestal, rim-lit studio, 4k" \
  --output public/assets/generated/hero-shot.png

# Image-to-video — use the still as seed
higgsfield upload image public/assets/generated/hero-shot.png    # → returns upload_id
higgsfield generate create seedance_pro \
  --prompt "slow 360 dolly, dust motes drifting, cinematic, 5s loop" \
  --image <upload_id> \
  --output public/assets/generated/hero-loop.mp4

# Lifestyle / social cut
higgsfield product-photoshoot run closeup_product_with_person \
  --prompt "model's hand cradling the headphones, golden hour window light" \
  --output public/assets/generated/hero-hand.png

# Train recurring spokesperson once, reuse forever
higgsfield soul-id train --images ref/*.jpg                       # → reference_id
higgsfield generate create soul_cinema_studio \
  --soul-id <reference_id> \
  --prompt "founder reads a one-line testimonial to camera, neutral studio" \
  --output public/assets/generated/founder-clip.mp4
```

Cache outputs under `public/assets/generated/` with hashed filenames. Never regenerate assets that already pass review.

### Stage 3 — Scene Architecture

Sketch the page as scenes, each labeled with the layer + tool:

```
SCENE 1  [Hero]            Layer 1: R3F (3D product, scroll-driven)
                           Layer 3: Framer (headline reveal, CTA)
                           Layer 2: Remotion (logo intro, 2s)

SCENE 2  [Feature reel]    Layer 3: Framer (sticky horizontal scroll)
                           Layer 0: Higgsfield stills (one per feature)

SCENE 3  [Testimonial]     Layer 2: Remotion (looping b-roll)
                           Layer 3: Framer (quote crossfades)

SCENE 4  [Pricing]         Layer 3: Framer only

SCENE 5  [Footer CTA]      Layer 1: R3F particle field
                           Layer 3: Framer (CTA pulse)
```

If a scene's only motion is "fade in on scroll" — use Framer, not R3F. Don't over-engineer.

### Stage 4 — Implementation

Pull live docs before coding. The libraries move fast; training-data syntax often lags.

- React Three Fiber: https://r3f.docs.pmnd.rs
- drei (R3F helpers): https://github.com/pmndrs/drei
- Framer Motion: https://www.framer.com/motion
- Remotion: https://www.remotion.dev/docs
- Higgsfield CLI: `higgsfield <command> --help`

Implement scene-by-scene. Ship each scene behind a feature flag where possible.

### Stage 5 — QA

Non-negotiable checklist before merging:

- [ ] Lighthouse mobile ≥ 90 perf, ≥ 95 a11y
- [ ] LCP < 2.5s on simulated 4G
- [ ] CLS < 0.1 (reserve space for R3F canvas + video)
- [ ] `prefers-reduced-motion` swaps R3F → static poster; Framer durations clamped to 0
- [ ] Reduced-data: don't autoplay Remotion video on `Save-Data: on`
- [ ] R3F Canvas suspended (`frameloop="demand"`) when off-screen
- [ ] All Higgsfield outputs have explicit width/height to prevent CLS
- [ ] Keyboard navigation reaches every interactive element
- [ ] Tested at 375px, 768px, 1440px
- [ ] Tested at 6x CPU throttle (low-end device proxy)

---

## Install Commands (consumer project)

```bash
# Core trio — Next.js / Vite / Astro / Remix
pnpm add framer-motion@^12 three @react-three/fiber @react-three/drei @react-three/postprocessing
pnpm add -D @types/three

# Remotion — Player in app, renders in a sibling workspace recommended
pnpm add remotion @remotion/cli @remotion/player @remotion/transitions @remotion/zod-types

# Optional
pnpm add lenis              # smooth scroll for R3F + Framer
pnpm add gsap               # only if Framer can't express the timeline
```

Higgsfield is CLI-only — no package install. Confirm with `higgsfield version`.

For Next.js App Router, R3F components **must** be client components (`"use client"`) and should be `next/dynamic` imported with `ssr: false`.

---

## File Structure (consumer project)

```
app/
├── page.tsx                    # Composition root — orchestrates scenes
├── _components/
│   ├── HeroCanvas.tsx          # R3F scene (dynamic import, ssr: false)
│   ├── HeroCinematic.tsx       # Remotion <Player /> or raw <video>
│   ├── ScrollSection.tsx       # Framer Motion section primitive
│   └── motion/
│       ├── variants.ts         # Reusable Framer variants
│       └── transitions.ts      # Spring presets per design-system tier
├── _3d/
│   ├── scenes/                 # One file per R3F scene
│   ├── materials/              # Shared materials
│   ├── shaders/                # GLSL files
│   └── primitives/             # <ParticleField/>, <Skybox/>, reusable mesh wrappers
└── _remotion/
    ├── compositions/           # <Composition id="..." /> entries
    ├── Root.tsx                # Remotion root registers all compositions
    └── renders/                # Output MP4/WebM (gitignored)

public/assets/generated/        # Higgsfield outputs — hashed filenames
design-system/
├── MASTER.md                   # ui-ux-pro-max --persist output
└── pages/
    └── <page>.md               # Page-specific overrides
```

---

## Perf Budgets (non-negotiable)

| Layer | Budget | How to enforce |
|-------|--------|----------------|
| R3F frame time | < 16ms (60fps) | DevTools Performance + `r3f-perf` overlay in dev |
| R3F idle | 0 draw calls | `<Canvas frameloop="demand" />` + `invalidate()` on interaction |
| Framer Motion | only `transform` / `opacity` | Never animate `width`/`height`/`top`/`left` |
| Remotion hero video | ≤ 3 MB | AV1 (or VP9 fallback), 30fps, ≤5s loop |
| Higgsfield stills | ≤ 250 KB each | Pipe through `sharp` → AVIF + WebP, `next/image` |
| Initial JS | ≤ 200 KB gz | Dynamic-import R3F + Remotion Player |
| LCP | < 2.5s on 4G | Preload poster, lazy-init R3F after first paint |
| CLS | < 0.1 | Always set `width`/`height` on `<Canvas>`, `<video>`, `<img>` |

---

## Accessibility Checklist (motion-specific)

- [ ] `prefers-reduced-motion: reduce` → static poster image replaces R3F + Remotion; Framer durations clamped to 0
- [ ] All R3F interactive meshes have an HTML overlay sibling with `aria-label`
- [ ] Remotion `<video>` has `aria-label` + caption track if it carries info
- [ ] Higgsfield-generated photos have `alt` describing the scene, not "generated image"
- [ ] No motion under 150ms (feels broken) or over 400ms for micro-interactions
- [ ] Exit animations 60–70% of enter duration
- [ ] List items staggered 30–50ms each
- [ ] All animations are interruptible — user input cancels in-flight motion

---

## Anti-Patterns (auto-reject in code review)

- ❌ R3F Canvas in SSR path (kills hydration, blocks LCP)
- ❌ Framer Motion animating `box-shadow` / `filter: blur()` per frame
- ❌ Remotion `<Player />` autoplay without `muted` (browsers block)
- ❌ Higgsfield outputs committed without compression
- ❌ Three.js loaded eagerly on routes that don't render 3D
- ❌ Multiple R3F Canvases on one page (composite into one)
- ❌ Scroll-tied animations without `requestAnimationFrame` throttling
- ❌ Skipping `--design-system` lock and freelancing colors per scene
- ❌ Generating Higgsfield assets in CI on every build (cache the outputs)

---

## Quick Start (greenfield Next.js landing page)

```bash
# 1. Scaffold
pnpm create next-app@latest killer-landing --typescript --tailwind --app
cd killer-landing

# 2. Install the stack
pnpm add framer-motion@^12 three @react-three/fiber @react-three/drei @react-three/postprocessing \
         remotion @remotion/cli @remotion/player lenis
pnpm add -D @types/three

# 3. Lock the design system
python3 ~/projects/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py \
  "<your brief>" --design-system --persist -p "<Project>"

# 4. Generate Stage 2 assets
higgsfield auth login
higgsfield product-photoshoot run product_shot --prompt "..." --output public/assets/generated/hero.png

# 5. Implement scenes (Stage 3 → 4)
# 6. Run the QA checklist (Stage 5)
pnpm run build && pnpm run start
# → run Lighthouse, toggle reduced-motion in DevTools, test 375px viewport
```

---

## Codex / OpenAI Agent Operating Rules

1. **Read `design-system/MASTER.md` first** — never freelance colors, type, or spacing
2. **Read `design-system/pages/<page>.md` if it exists** — page overrides win over Master
3. **Pull library docs via web/MCP before coding** — R3F, Framer, Remotion APIs change frequently
4. **Generate assets before code** — Stage 2 must complete before Stage 4
5. **One R3F Canvas per page** — composite scenes inside one Canvas, never stack Canvases
6. **Dynamic-import R3F and Remotion Player** in Next.js to keep them out of the SSR bundle
7. **Run the QA checklist before declaring done** — Lighthouse, reduced-motion, 375px viewport are mandatory
8. **Cache Higgsfield outputs** — never regenerate during CI builds; commit (or use LFS) and reference by hash

---

## Reference

- ui-ux-pro-max repo: `~/projects/ui-ux-pro-max-skill`
- Higgsfield CLI: `/opt/homebrew/bin/higgsfield` — `higgsfield --help`
- React Three Fiber: https://r3f.docs.pmnd.rs
- drei: https://github.com/pmndrs/drei
- Framer Motion: https://www.framer.com/motion
- Remotion: https://www.remotion.dev/docs

Pair this file with `CLAUDE.md` in the same directory for Claude Code skill-driven workflows.
