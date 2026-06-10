# Motion-3D Landing Page Pipeline — Claude Code

> Production framework for building "god-killer" motion + 3D landing pages by combining **ui-ux-pro-max** (design system), **Framer Motion** (DOM animation), **React Three Fiber** (real-time 3D), **Remotion** (cinematic pre-renders), and **Higgsfield** (generative assets).

Drop this file into any consumer project's root or under `docs/` and reference it from the project's `CLAUDE.md`. Pair with `AGENTS.md` (Codex variant) in the same directory.

---

## Skills you MUST invoke (in this order)

| Order | Skill | When |
|-------|-------|------|
| 1 | `ui-ux-pro-max` | Always — locks design system before pixels |
| 2 | `frontend-design` | Always — enforces distinctive, non-generic aesthetic |
| 3 | `context7-mcp` | Before writing R3F / Framer / Remotion code — fetch current docs |
| 4 | `higgsfield-product-photoshoot` | Hero stills, lifestyle, hand-with-product |
| 5 | `higgsfield-generate` | Hero videos, motion intros, image-to-video |
| 6 | `higgsfield-soul-id` | Recurring on-brand avatars (one-time train, reuse `reference_id`) |
| 7 | `higgsfield-marketplace-cards` | Marketplace listing cards only |
| 8 | `superpowers:brainstorming` | Before any new section — lock concept, not script |
| 9 | `superpowers:verification-before-completion` | Before claiming done — Lighthouse + reduced-motion test |

Skip skill discovery rationalization. If a skill exists, invoke it.

---

## The Layer Stack (z-axis, render order)

```
┌──────────────────────────────────────────────────────────┐
│ Layer 4: Framer Motion overlays                          │  cursor, badges, scroll progress, toasts
├──────────────────────────────────────────────────────────┤
│ Layer 3: HTML + Framer Motion                            │  copy, CTAs, sections, forms, page transitions
├──────────────────────────────────────────────────────────┤
│ Layer 2: Remotion <video> embeds                         │  cinematic intros, looping hero films
├──────────────────────────────────────────────────────────┤
│ Layer 1: React Three Fiber Canvas                        │  interactive 3D scenes, particles, shaders
├──────────────────────────────────────────────────────────┤
│ Layer 0: Higgsfield generative assets                    │  HDRIs, textures, product shots, faces
└──────────────────────────────────────────────────────────┘
```

Each layer is **independently optional**. A page can ship with just Layer 3 + Layer 0 (Framer + Higgsfield stills) and still feel killer. Only stack what the brief demands.

---

## Tool Decision Matrix

Pick by **job-to-be-done**, not by what's cool.

| Need | Tool | Why |
|------|------|-----|
| Interactive 3D product (rotate, zoom, configure) | **R3F + drei** | Real-time, GPU, gesture-ready |
| Scroll-tied 3D camera dolly | **R3F + drei `ScrollControls`** | Purpose-built API |
| Particle / shader background | **R3F custom shader** | Cheaper than looping video, infinite |
| Hero film (3–8 sec, predictable) | **Remotion → MP4/WebM** | Frame-perfect, cacheable, no jank |
| Generative-AI hero video | **Higgsfield generate (seedance / nano banana)** | Brand-grade, prompt-driven |
| Animated logo intro | **Remotion** | Predictable timing, no GPU spike |
| Scroll text reveals | **Framer Motion `whileInView`** | DOM-light, respects reduced-motion |
| Gesture drag / swipe / pinch | **Framer Motion `drag`** | Best API in class |
| Page transitions | **Framer Motion `AnimatePresence`** | Layout-safe |
| Magnetic / sticky cursor | **Framer Motion `useMotionValue`** | Pointer-precision |
| Hand-holding-product photo | **Higgsfield product-photoshoot `closeup_product_with_person`** | Studio realism |
| Studio product hero | **Higgsfield product-photoshoot `product_shot`** | Brand-grade |
| UGC avatar ad video | **Higgsfield Marketing Studio** | Done-for-you talking head |
| Recurring brand spokesperson | **Higgsfield Soul ID → generate** | Identity-faithful across shots |
| HDRI / skybox for reflections | **Higgsfield `conceptual_product`** or polyhaven | One-time asset |
| Data viz with motion | **Framer Motion + recharts/visx** | DOM-friendly, accessible |
| 3D data viz (network, globe, particles) | **R3F + three-globe / custom** | Real-time, dimensional |

**Rule of thumb:** if the motion is **deterministic and repeats**, render it in Remotion. If it's **interactive or reactive**, build it in R3F or Framer Motion.

---

## 5-Stage Production Pipeline

### Stage 1 — Brief & Brand (ui-ux-pro-max)

Lock the design system **before any motion work**.

```bash
python3 ~/projects/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py \
  "<product-type> <industry> <tone-keywords>" \
  --design-system --persist -p "<Project Name>"
```

Output: `design-system/MASTER.md` + `design-system/pages/<page>.md`. All animation timings, palette, and type derive from this. Re-run with new keywords if the system doesn't feel right — cheaper than rebuilding.

**Then run the brainstorming skill** for the page concept. Lock the angle (one line), not the script.

### Stage 2 — Asset Generation (Higgsfield)

Generate all static + cinematic assets **before writing R3F/Remotion code** so the build is asset-shaped, not asset-blocked.

```bash
# Auth once
higgsfield auth login

# Hero still — studio product shot
higgsfield product-photoshoot run product_shot \
  --prompt "matte black wireless headphones on lacquered onyx pedestal, rim-lit studio, 4k, square" \
  --output assets/generated/hero-shot.png

# Hero film — image-to-video (use the still above as seed)
higgsfield upload image assets/generated/hero-shot.png   # → returns upload_id
higgsfield generate create seedance_pro \
  --prompt "slow 360 dolly around headphones, dust motes drifting, cinematic, 5s loop" \
  --image <upload_id> --output assets/generated/hero-loop.mp4

# Lifestyle / hand-held variant for social
higgsfield product-photoshoot run closeup_product_with_person \
  --prompt "model's hand cradling the headphones, soft golden hour window light" \
  --output assets/generated/hero-hand.png

# Recurring spokesperson (one-time train, then reuse)
higgsfield soul-id train --images ref/*.jpg   # → reference_id
higgsfield generate create soul_cinema_studio \
  --soul-id <reference_id> --prompt "founder reads a one-line testimonial to camera, neutral studio" \
  --output assets/generated/founder-clip.mp4
```

Cache everything under `public/assets/generated/` with hashed filenames. **Never** regenerate assets that already pass review.

### Stage 3 — Scene Architecture

Sketch the page as a stack of **scenes**, each labeled with its tool:

```
SCENE 1  [Hero]                Layer 1: R3F (3D product, scroll-driven)
                               Layer 3: Framer (headline reveal, CTA)
                               Layer 2: Remotion (logo intro, 2s)

SCENE 2  [Feature reel]        Layer 3: Framer (sticky scroll + horizontal stack)
                               Layer 0: Higgsfield stills (one per feature)

SCENE 3  [Testimonial]         Layer 2: Remotion (looping b-roll)
                               Layer 3: Framer (quote crossfades)

SCENE 4  [Pricing]             Layer 3: Framer only (cards, hover)

SCENE 5  [Footer CTA]          Layer 1: R3F particle field
                               Layer 3: Framer (CTA pulse)
```

If a scene's only motion is "fade in on scroll" — that's Framer, not R3F. Don't over-engineer.

### Stage 4 — Implementation

Before writing code, **always** pull live docs via context7:

```
Use Context7: query-docs for "@react-three/fiber scroll controls"
Use Context7: query-docs for "framer-motion AnimatePresence layout"
Use Context7: query-docs for "remotion Player embed Next.js"
```

Then invoke `frontend-design` skill for the aesthetic pass. Implement scene-by-scene, ship each behind a feature flag if possible.

### Stage 5 — QA (verification-before-completion)

Non-negotiable checklist before claiming done:

- [ ] Lighthouse mobile ≥ 90 perf, ≥ 95 a11y
- [ ] LCP < 2.5s on simulated 4G
- [ ] CLS < 0.1 (reserve space for R3F canvas + video)
- [ ] `prefers-reduced-motion` swaps R3F → static image, disables Framer animations
- [ ] Reduced-data: don't autoplay Remotion video on `Save-Data: on`
- [ ] R3F Canvas suspended (`frameloop="demand"`) when scrolled out of viewport
- [ ] All Higgsfield outputs have width/height to prevent CLS
- [ ] Keyboard nav reaches every interactive element
- [ ] Tested at 375px, 768px, 1440px

---

## Install Commands (consumer project)

```bash
# Core trio — install in Next.js / Vite / Astro / Remix consumer
pnpm add framer-motion@^12 three @react-three/fiber @react-three/drei @react-three/postprocessing
pnpm add -D @types/three

# Remotion — recommend a sibling workspace for renders, but Player can live in the app
pnpm add remotion @remotion/cli @remotion/player @remotion/transitions @remotion/zod-types

# Optional but recommended
pnpm add lenis              # smooth scroll for R3F + Framer
pnpm add gsap               # only if Framer can't express the timeline (rare)
```

Higgsfield is CLI-only — no package install. Confirm with `higgsfield version`.

For Next.js 16+ App Router, R3F components **must** be client components (`"use client"`) and should be `next/dynamic` imported with `ssr: false` so the Canvas never touches the server.

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
│       ├── variants.ts         # Reusable Framer variants (fade, slide, stagger)
│       └── transitions.ts      # Spring presets per design-system tier
├── _3d/
│   ├── scenes/                 # One file per R3F scene
│   ├── materials/              # Shared materials (MeshTransmissionMaterial wrappers)
│   ├── shaders/                # GLSL files (imported via vite-plugin-glsl or raw-loader)
│   └── primitives/             # <ParticleField/>, <Skybox/>, reusable mesh wrappers
└── _remotion/
    ├── compositions/           # <Composition id="..." /> entries
    ├── Root.tsx                # Remotion root registers all compositions
    └── renders/                # Output MP4/WebM (gitignored)

public/assets/generated/        # Higgsfield outputs — hashed filenames, committed (or LFS)
design-system/
├── MASTER.md                   # ui-ux-pro-max --persist output
└── pages/
    └── <page>.md               # Page-specific overrides
```

---

## Perf Budgets (non-negotiable)

| Layer | Budget | How to enforce |
|-------|--------|----------------|
| R3F frame time | < 16ms (60fps) | Chrome DevTools Performance, `r3f-perf` overlay in dev |
| R3F idle | 0 draw calls | `<Canvas frameloop="demand" />` + `invalidate()` on interaction |
| Framer Motion | only `transform` / `opacity` | Never animate `width`/`height`/`top`/`left` — use `scale` + `x`/`y` |
| Remotion hero video | ≤ 3 MB | Render AV1 (or VP9 fallback), 30fps, max 5s loop |
| Higgsfield stills | ≤ 250 KB each | Pipe through `sharp` → AVIF + WebP, `next/image` |
| Initial JS | ≤ 200 KB gz | Dynamic-import R3F + Remotion Player, code-split per route |
| LCP | < 2.5s on 4G | Preload poster, lazy-init R3F after first paint |
| CLS | < 0.1 | Always set `width`/`height` on `<Canvas>`, `<video>`, `<img>` |

---

## Accessibility Checklist (motion-specific)

Pulled from `ui-ux-pro-max` rules 1 + 7 + 2.

- [ ] `prefers-reduced-motion: reduce` → static poster image replaces R3F + Remotion; Framer animations duration-clamped to 0
- [ ] All R3F interactive meshes have an HTML overlay sibling with `aria-label`
- [ ] Remotion `<video>` has `aria-label` + caption track if it carries info
- [ ] Higgsfield-generated photos have `alt` describing the scene, not "generated image"
- [ ] No motion under 150ms (feels broken) or over 400ms for micro-interactions (feels sluggish)
- [ ] Exit animations are 60–70% of enter duration (`exit-faster-than-enter`)
- [ ] Stagger lists at 30–50ms per item
- [ ] All animations are interruptible — user input cancels in-flight motion immediately

---

## Anti-Patterns (auto-reject)

- ❌ R3F Canvas in SSR path (kills hydration, blocks LCP)
- ❌ Framer Motion animating `box-shadow` / `filter: blur()` per frame (use static or `will-change`)
- ❌ Remotion `<Player />` autoplay without `muted` (browsers block)
- ❌ Higgsfield outputs committed without compression (AVIF/WebP mandatory)
- ❌ Three.js loaded eagerly on routes that don't render 3D
- ❌ Multiple R3F Canvases on one page (composite scenes in one Canvas)
- ❌ Scroll-tied animations without `requestAnimationFrame` throttling (use `useFrame` or `useScroll`)
- ❌ Skipping `--design-system` lock and freelancing colors per scene
- ❌ Generating Higgsfield assets in CI on every build (cache the outputs)

---

## Quick Start (greenfield Next.js landing page)

```bash
# 1. Scaffold
pnpm create next-app@latest killer-landing --typescript --tailwind --app
cd killer-landing

# 2. Install the stack
pnpm add framer-motion@^12 three @react-three/fiber @react-three/drei @react-three/postprocessing remotion @remotion/cli @remotion/player lenis
pnpm add -D @types/three

# 3. Lock design system
python3 ~/projects/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py \
  "<your brief>" --design-system --persist -p "<Project>"

# 4. Generate Stage 2 assets
higgsfield auth login
higgsfield product-photoshoot run product_shot --prompt "..." --output public/assets/generated/hero.png

# 5. Implement scenes (Stage 3 → 4)
# 6. Run the QA checklist (Stage 5)
pnpm run build && pnpm run start
# → run Lighthouse, toggle reduced-motion in DevTools, test 375px
```

---

## When to use which Claude skill (cheat sheet)

| Task | Skill |
|------|-------|
| "Build me a landing page" | `superpowers:brainstorming` → `ui-ux-pro-max` → `frontend-design` |
| "Design the hero scene" | `ui-ux-pro-max` (design-system query) |
| "Create a 3D scene" | `context7-mcp` (R3F docs) → `frontend-design` |
| "Add scroll animation" | `context7-mcp` (Framer Motion docs) |
| "Make a cinematic intro" | `context7-mcp` (Remotion docs) |
| "Generate a hero photo" | `higgsfield-product-photoshoot` |
| "Generate a hero video" | `higgsfield-generate` |
| "Need a consistent avatar across shots" | `higgsfield-soul-id` (train once) → `higgsfield-generate` (reuse) |
| "Review before merge" | `pr-review-toolkit:code-reviewer` + `superpowers:verification-before-completion` |

---

## Reference

- ui-ux-pro-max skill: `/Users/agencyflow/projects/ui-ux-pro-max-skill`
- Higgsfield CLI: `/opt/homebrew/bin/higgsfield` (`higgsfield --help`)
- Higgsfield skills: `~/.claude/skills/higgsfield-{generate,product-photoshoot,soul-id,marketplace-cards}`
- Framer Motion docs: query via context7 — `/framer/motion`
- React Three Fiber docs: query via context7 — `/pmndrs/react-three-fiber`
- Remotion docs: query via context7 — `/remotion-dev/remotion`

Pair this file with `AGENTS.md` in the same directory for Codex / OpenAI agent workflows.
