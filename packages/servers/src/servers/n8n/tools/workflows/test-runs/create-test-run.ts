import { defineTool } from "@usemcpkit/core";

export const workflowsTestRunsCreateTestRun = defineTool({
  name: "workflows:test_runs:create_test_run",
  description:
    "Trigger a test run. Start a new evaluation test run for a workflow. The workflow must contain a configured evaluation trigger. Requires the `workflow:execute` project scope in addition to the `testRun:create` API key scope.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "POST",
    path: "/workflows/{workflowId}/test-runs",
  },
});
