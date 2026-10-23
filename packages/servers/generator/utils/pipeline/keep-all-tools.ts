import type { FinalizedTools } from '../types/finalized-tools';
import type { Operation } from '../types/operation';
import type { PlannedTool } from '../types/planned-tool';

export const keepAllTools = <Result extends Operation>(planned: PlannedTool<Result>[]) => {
  const finalized: FinalizedTools = { tools: planned.map(({ tool }) => tool), notes: [] };
  return finalized;
};
