import { Check } from "lucide-react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ScrollSection, ScrollItem } from "@/components/motion/ScrollSection";

/**
 * Composition root — 5 scenes wired per docs/motion-3d-pipeline framework.
 *
 *  SCENE 1  Hero          Layer 1: R3F orb (HeroCanvas, ssr:false)
 *                         Layer 3: Framer headline reveal + CTA
 *  SCENE 2  Features      Layer 3: Framer stagger grid
 *  SCENE 3  Cinematic     Layer 2: <HeroCinematic> (Remotion/Higgsfield output)
 *                         Layer 3: Framer quote crossfade
 *  SCENE 4  Pricing       Layer 3: Framer cards
 *  SCENE 5  Footer CTA    Layer 3: Framer pulse
 */
export default function Home() {
  return (
    <main className="relative">
      {/* SCENE 1 — Hero */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 md:px-16">
        <HeroCanvas />
        <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-transparent via-[color:var(--background)]/40 to-[color:var(--background)]" />

        <ScrollSection className="mx-auto grid w-full max-w-6xl gap-8">
          <ScrollItem>
            <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              Motion-3D Pipeline · v1
            </span>
          </ScrollItem>
          <ScrollItem>
            <h1 className="max-w-3xl text-balance bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-5xl font-semibold leading-[1.05] tracking-tight text-transparent md:text-7xl">
              Ship landing pages that look like a senior designer reviewed every pixel.
            </h1>
          </ScrollItem>
          <ScrollItem>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Real-time 3D from R3F. Cinematic renders from Remotion. Generative assets from
              Higgsfield. All locked to a design system you can trust.
            </p>
          </ScrollItem>
          <ScrollItem>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(220,38,38,0.8)]"
              >
                See the pipeline
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href="#cinematic"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:text-white"
              >
                Watch the reel
              </a>
            </div>
          </ScrollItem>
        </ScrollSection>
      </section>

      {/* SCENE 2 — Features */}
      <ScrollSection
        id="features"
        className="mx-auto grid max-w-6xl gap-8 px-6 py-32 md:grid-cols-3 md:px-16"
      >
        {FEATURES.map((f) => (
          <ScrollItem key={f.title}>
            <div className="glass h-full rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-1">
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--accent)]">
                Layer {f.layer}
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">{f.title}</h3>
              <p className="text-base leading-relaxed text-white/65">{f.body}</p>
            </div>
          </ScrollItem>
        ))}
      </ScrollSection>

      {/* SCENE 3 — Cinematic */}
      <ScrollSection
        id="cinematic"
        className="mx-auto grid max-w-6xl gap-12 px-6 py-32 md:grid-cols-2 md:px-16"
      >
        <ScrollItem className="flex flex-col justify-center gap-6">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Pre-render the cinematics. Stream the interactivity.
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            Heavy cinematic moments render once in Remotion. R3F handles only the interactive
            scenes. Your bundle stays small, your hero stays frame-perfect.
          </p>
        </ScrollItem>
        <ScrollItem>
          <div className="glass aspect-video overflow-hidden rounded-2xl">
            <HeroCinematic className="h-full w-full object-cover" />
          </div>
        </ScrollItem>
      </ScrollSection>

      {/* SCENE 4 — Pricing */}
      <ScrollSection
        id="pricing"
        className="mx-auto grid max-w-6xl gap-8 px-6 py-32 md:grid-cols-3 md:px-16"
      >
        {PRICING.map((p) => (
          <ScrollItem key={p.name}>
            <div
              className={`glass h-full rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                p.featured ? "ring-2 ring-[color:var(--accent)]" : ""
              }`}
            >
              <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-white/60">
                {p.name}
              </div>
              <div className="mb-6 text-4xl font-semibold text-white">{p.price}</div>
              <ul className="mb-8 space-y-2 text-sm text-white/70">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                  p.featured
                    ? "bg-[color:var(--accent)] text-white hover:scale-[1.02]"
                    : "glass text-white/90 hover:text-white"
                }`}
              >
                {p.cta}
              </a>
            </div>
          </ScrollItem>
        ))}
      </ScrollSection>

      {/* SCENE 5 — Footer CTA */}
      <ScrollSection className="mx-auto max-w-6xl px-6 py-32 text-center md:px-16">
        <ScrollItem>
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Stop shipping AI-looking pages. Start shipping the bar.
          </h2>
        </ScrollItem>
        <ScrollItem>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_-8px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_48px_-8px_rgba(220,38,38,0.9)]"
          >
            Get the framework
            <span aria-hidden="true">→</span>
          </a>
        </ScrollItem>
      </ScrollSection>
    </main>
  );
}

const FEATURES = [
  {
    layer: "0 + 1",
    title: "Real-time 3D",
    body: "React Three Fiber renders interactive scenes on the GPU. Demand-frame loop keeps idle cost at zero.",
  },
  {
    layer: "2",
    title: "Cinematic renders",
    body: "Remotion bakes deterministic intros and b-roll to MP4. Frame-perfect, cacheable, no jank.",
  },
  {
    layer: "3 + 4",
    title: "Motion you feel",
    body: "Framer Motion drives scroll, gesture, and page transitions. Respects reduced-motion by default.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    features: ["1 landing page", "Framer Motion + R3F", "Community support"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Studio",
    price: "$49/mo",
    features: [
      "Unlimited pages",
      "Remotion render pipeline",
      "Higgsfield asset credits",
      "Email support",
    ],
    cta: "Go studio",
    featured: true,
  },
  {
    name: "Agency",
    price: "Talk to us",
    features: ["White-label", "Priority renders", "Custom 3D scenes", "Dedicated Slack"],
    cta: "Book a call",
    featured: false,
  },
];
