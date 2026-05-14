"use client";

import dynamic from "next/dynamic";

/**
 * R3F Canvas wrapper — dynamically imported with ssr:false so three.js never
 * touches the server. The dynamic boundary also lets the rest of the page
 * stream in while the 3D scene loads.
 *
 * The fallback gradient uses CSS variables from globals.css so it stays on
 * the design system instead of hardcoded hex.
 */
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full"
      style={{
        background:
          "linear-gradient(135deg, var(--primary) 0%, var(--background) 50%, var(--primary) 100%)",
      }}
    />
  ),
});

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <HeroScene />
    </div>
  );
}
