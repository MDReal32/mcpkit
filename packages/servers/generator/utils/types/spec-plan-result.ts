import type { Operation } from './operation.ts';
import type { PlannedTool } from './planned-tool.ts';

export interface SpecPlanResult<Result extends Operation> {
  planned: PlannedTool<Result>[];
  skipped: string[];
}
