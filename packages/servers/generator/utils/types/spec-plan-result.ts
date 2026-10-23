import type { Operation } from "./operation";
import type { PlannedTool } from "./planned-tool";

export interface SpecPlanResult<Result extends Operation> {
  planned: PlannedTool<Result>[];
  skipped: string[];
}
