import { BINARY_NAME } from "./const";
import type { Target } from "./types/target";

export const toBinaryFileName = (target: Target) => `${BINARY_NAME}${target.startsWith("windows") ? ".exe" : ""}`;
