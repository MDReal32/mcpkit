import { findDuplicate } from '../../utils/pipeline/find-duplicate.ts';
import { keepAllTools } from '../../utils/pipeline/keep-all-tools.ts';
import type { Operation } from '../../utils/types/operation.ts';
import type { PlannedTool } from '../../utils/types/planned-tool.ts';

export const assertUniqueIdentifiers = (planned: PlannedTool<Operation>[]) => {
  const duplicate = findDuplicate(planned.map(({ tool }) => tool.identifier));
  if (duplicate !== undefined) {
    throw new Error(`identifier ${duplicate} is used by more than one tool`);
  }
  return keepAllTools(planned);
};
