import type { Rolldown } from "vite";

export const findEntryFile = (bundle: Rolldown.OutputBundle) => {
  const entry = Object.values(bundle).find((output) => output.type === "chunk" && output.isEntry);
  if (!entry) {
    throw new Error("the build produced no entry chunk to package");
  }
  return entry.fileName;
};
