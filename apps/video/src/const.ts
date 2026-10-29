import type { SpringConfig } from "remotion";

export const VIDEO = {
  fps: 60,
  width: 1920,
  height: 1080,
} as const;

export const COLORS = {
  background: "#08090b",
  surface: "#0f1114",
  surfaceRaised: "#14171c",
  border: "#22262e",
  borderStrong: "#30353f",
  text: "#eef0f4",
  muted: "#8b92a0",
  faint: "#555c69",
  accent: "#6b8cff",
  accentLight: "#a9b8ff",
  accentSoft: "rgba(107, 140, 255, 0.14)",
  accentGlow: "rgba(107, 140, 255, 0.35)",
} as const;

/** Scene lengths in seconds; each includes the transition it shares with the next scene. */
export const SCENE_SECONDS = {
  hook: 3.6,
  problem: 3.4,
  install: 3.9,
  assistant: 5.9,
  clients: 4.3,
  catalog: 4.6,
  credentials: 4.6,
  close: 5,
} as const;

export const TRANSITION_SECONDS = 1 / 3;

/** How much every scene slowly pushes in over its length, so no frame is ever still. */
export const CAMERA_PUSH = 0.04;

export const SMOOTH_SPRING: Partial<SpringConfig> = {
  damping: 200,
  stiffness: 110,
  mass: 0.9,
};

export const LIVELY_SPRING: Partial<SpringConfig> = {
  damping: 18,
  stiffness: 120,
  mass: 0.8,
};

export const SAFE_X = 160;

export const CURSOR_TRAVEL_SECONDS = 0.42;
