import type { Operation } from "../../utils/types/operation";
import { RESOURCE_RENAMES } from "./const";
import { splitPath } from "./split-path";
import { toWords } from "./to-words";
import type { SpecSource } from "./types/spec-source";

export const deriveResource = (operation: Operation, source: SpecSource) => {
  const [segment = ""] = splitPath(operation, source);
  const folder = toWords(segment).join("-");
  return RESOURCE_RENAMES[folder] ?? folder;
};
