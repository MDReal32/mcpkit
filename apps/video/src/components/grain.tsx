import { AbsoluteFill } from "remotion";

/** Static film grain; it keeps the dark gradients from banding after encoding. */
export const Grain = () => (
  <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%" aria-hidden="true">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);
