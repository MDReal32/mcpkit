import type { FinalizedTools } from '../types/finalized-tools.ts';
import type { Operation } from '../types/operation.ts';
import type { PlannedTool } from '../types/planned-tool.ts';

export const keepAllTools = <Result extends Operation>(planned: PlannedTool<Result>[]) => {
  const finalized: FinalizedTools = { tools: planned.map(({ tool }) => tool), notes: [] };
  return finalized;
};
