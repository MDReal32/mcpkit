import type { ToolAnnotations } from "../types/tool-definition";
import { DESTRUCTIVE_VERBS, SAFE_VERBS, WRITE_VERBS } from "./const";

/** A verb in none of the lists gets no annotations, so the client files it under "Other tools". */
export const createToolAnnotations = (verb: string): ToolAnnotations | undefined => {
  if (SAFE_VERBS.includes(verb)) {
    return { readOnlyHint: true };
  }
  if (DESTRUCTIVE_VERBS.includes(verb)) {
    return { readOnlyHint: false, destructiveHint: true };
  }
  if (WRITE_VERBS.includes(verb)) {
    return { readOnlyHint: false };
  }
  return undefined;
};
