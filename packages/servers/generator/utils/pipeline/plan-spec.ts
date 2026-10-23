import { toGeneratedTool } from '../naming/to-generated-tool.ts';
import type { Operation } from '../types/operation.ts';
import type { SpecPlan } from '../types/spec-plan.ts';
import type { SpecPlanResult } from '../types/spec-plan-result.ts';

export const planSpec = async <Result extends Operation>(plan: SpecPlan<Result>, localPath: string | undefined) => {
  const document = await plan.readDocument(localPath);
  const supported: Result[] = [];
  const skipped: string[] = [];
  for (const operation of plan.collectOperations(document)) {
    const reason = plan.findUnsupportedReason(operation);
    if (reason) {
      skipped.push(`${plan.describeOperation(operation)}: ${reason}`);
    } else {
      supported.push(operation);
    }
  }
  const names = plan.nameOperations(supported);
  const planned = supported.map((operation, position) => {
    const toolNames = names[position];
    if (!toolNames) {
      throw new Error(`${plan.describeOperation(operation)} was not named`);
    }
    return { operation, tool: toGeneratedTool(toolNames, plan.buildToolDefinition(operation, toolNames.name)) };
  });
  const result: SpecPlanResult<Result> = { planned, skipped };
  return result;
};
