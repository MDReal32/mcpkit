import { basename } from "node:path";

export const expectedServerName = (dir: string) => basename(dir).replace(/-/g, "_");
