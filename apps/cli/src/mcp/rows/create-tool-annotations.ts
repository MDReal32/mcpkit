import type { ToolAnnotations } from "../types/meta-tool";
import { DESTRUCTIVE_VERBS, READ_VERBS, WRITE_VERBS } from "./const";

/** A verb that is not in any list says nothing, so the client keeps the tool among the ungrouped ones. */
export const createToolAnnotations = (verb: string): ToolAnnotations | undefined => {
  if (READ_VERBS.includes(verb)) {
    return { readOnlyHint: true };
  }
  if (DESTRUCTIVE_VERBS.includes(verb)) {
    return { readOnlyHint: false, destructiveHint: true };
  }
  if (WRITE_VERBS.includes(verb)) {
    return { readOnlyHint: false, destructiveHint: false };
  }
  return undefined;
};
