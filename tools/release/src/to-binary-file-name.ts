import type { ReleaseTarget } from "./types/release-target.ts";

/** `name` with the executable extension of `target`: `usemcpkit.exe` on Windows, `usemcpkit` elsewhere. */
export const toBinaryFileName = (target: ReleaseTarget, name: string) => (target.os === "win32" ? `${name}.exe` : name);
