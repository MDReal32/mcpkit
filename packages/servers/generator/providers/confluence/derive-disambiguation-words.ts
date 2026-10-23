import type { Operation } from "../../utils/types/operation";
import { isPathParameter, splitPath } from "./split-path";
import { toWords } from "./to-words";
import type { SpecSource } from "./types/spec-source";

/** `by-<parameter>` for a path that ends in a parameter, added when two operations would share an action. */
export const deriveDisambiguationWords = (operation: Operation, source: SpecSource) => {
  const segments = splitPath(operation, source);
  const last = segments.at(-1);
  return last && segments.length > 1 && isPathParameter(last) ? ["by", ...toWords(last)] : [];
};
