import { workflowsExecutionsTools } from "./executions";
import { workflowsTagsTools } from "./tags";
import { workflowsTestRunsTools } from "./test-runs";
import { workflowsWorkflowsTools } from "./workflows";

export const workflowsGroupTools = [
  ...workflowsExecutionsTools,
  ...workflowsTagsTools,
  ...workflowsTestRunsTools,
  ...workflowsWorkflowsTools,
];
