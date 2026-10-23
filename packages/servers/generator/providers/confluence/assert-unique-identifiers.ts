import { findDuplicate } from '../../utils/pipeline/find-duplicate';
import { keepAllTools } from '../../utils/pipeline/keep-all-tools';
import type { Operation } from '../../utils/types/operation';
import type { PlannedTool } from '../../utils/types/planned-tool';

export const assertUniqueIdentifiers = (planned: PlannedTool<Operation>[]) => {
  const duplicate = findDuplicate(planned.map(({ tool }) => tool.identifier));
  if (duplicate !== undefined) {
    throw new Error(`identifier ${duplicate} is used by more than one tool`);
  }
  return keepAllTools(planned);
};
