import type { ToolAnnotations } from "../types/meta-tool";
import { DESTRUCTIVE_VERBS, SAFE_VERBS } from "./const";

/** A verb that is not known to be safe counts as a write, so the client asks before it runs. */
export const createToolAnnotations = (verb: string): ToolAnnotations => {
  if (SAFE_VERBS.includes(verb)) {
    return { readOnlyHint: true };
  }
  if (DESTRUCTIVE_VERBS.includes(verb)) {
    return { readOnlyHint: false, destructiveHint: true };
  }
  return { readOnlyHint: false };
};
