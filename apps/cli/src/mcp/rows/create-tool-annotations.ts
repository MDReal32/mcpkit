import type { ToolAnnotations } from "../types/meta-tool";
import { DESTRUCTIVE_VERBS, READ_VERBS } from "./const";

/** A verb that is not known to read counts as a write, so the client asks before it runs. */
export const createToolAnnotations = (verb: string): ToolAnnotations => {
  if (READ_VERBS.includes(verb)) {
    return { readOnlyHint: true };
  }
  if (DESTRUCTIVE_VERBS.includes(verb)) {
    return { readOnlyHint: false, destructiveHint: true };
  }
  return { readOnlyHint: false };
};
