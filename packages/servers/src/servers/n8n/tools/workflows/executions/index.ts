import { workflowsExecutionsDeleteExecution } from "./delete-execution";
import { workflowsExecutionsGetExecution } from "./get-execution";
import { workflowsExecutionsGetExecutionTags } from "./get-execution-tags";
import { workflowsExecutionsGetExecutions } from "./get-executions";
import { workflowsExecutionsRetryExecution } from "./retry-execution";
import { workflowsExecutionsStopExecution } from "./stop-execution";
import { workflowsExecutionsStopManyExecutions } from "./stop-many-executions";
import { workflowsExecutionsUpdateExecutionTags } from "./update-execution-tags";

export const workflowsExecutionsTools = [
  workflowsExecutionsDeleteExecution,
  workflowsExecutionsGetExecution,
  workflowsExecutionsGetExecutionTags,
  workflowsExecutionsGetExecutions,
  workflowsExecutionsRetryExecution,
  workflowsExecutionsStopExecution,
  workflowsExecutionsStopManyExecutions,
  workflowsExecutionsUpdateExecutionTags,
];
