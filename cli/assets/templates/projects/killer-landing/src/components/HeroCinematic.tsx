"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Cinematic video layer. Reads from /public/assets/generated/hero-loop.mp4
 * (rendered in the sibling ~/my-video Remotion studio, or a Higgsfield
 * generate output). Falls back to a poster when reduced-motion or save-data.
 *
 * Swap the bare <video> for @remotion/player <Player /> when you want
 * runtime composition control (props, scrubbing, programmatic seeks).
 */
export function HeroCinematic({
  src = "/assets/generated/hero-loop.mp4",
  poster = "/assets/generated/hero-shot.png",
  className = "",
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <img
        src={poster}
        alt=""
        className={className}
        loading="eager"
        decoding="async"
        width={1280}
        height={720}
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      className={className}
      width={1280}
      height={720}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
