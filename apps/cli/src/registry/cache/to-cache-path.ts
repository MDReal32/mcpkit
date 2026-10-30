import { relative, sep } from "node:path";

/** The key of a cached file in the map: its path inside the registry folder, with `/` on every platform. */
export const toCachePath = (dir: string, file: string) => relative(dir, file).split(sep).join("/");
