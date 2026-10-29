import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

export const SANS = loadGeist("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
}).fontFamily;

export const MONO = loadGeistMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
}).fontFamily;
