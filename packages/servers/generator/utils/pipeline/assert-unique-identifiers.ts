import type { Operation } from "../types/operation";
import type { PlannedTool } from "../types/planned-tool";
import { findDuplicate } from "./find-duplicate";
import { keepAllTools } from "./keep-all-tools";

export const assertUniqueIdentifiers = (planned: PlannedTool<Operation>[]) => {
  const duplicate = findDuplicate(planned.map(({ tool }) => tool.identifier));
  if (duplicate !== undefined) {
    throw new Error(`identifier ${duplicate} is used by more than one tool`);
  }
  return keepAllTools(planned);
};
