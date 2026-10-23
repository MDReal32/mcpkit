import type { GeneratedTool } from './generated-tool.ts';
import type { Operation } from './operation.ts';

export interface PlannedTool<Result extends Operation> {
  operation: Result;
  tool: GeneratedTool;
}
