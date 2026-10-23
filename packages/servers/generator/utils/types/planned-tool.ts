import type { GeneratedTool } from './generated-tool';
import type { Operation } from './operation';

export interface PlannedTool<Result extends Operation> {
  operation: Result;
  tool: GeneratedTool;
}
