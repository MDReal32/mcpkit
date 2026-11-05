import { defineTool } from "@usemcpkit/core";

export const workflowsTestRunsCancelTestRun = defineTool({
  name: "workflows:test_runs:cancel_test_run",
  description:
    "Cancel a test run. Cancel a running evaluation test run of a workflow. Requires the `workflow:execute` project scope in addition to the `testRun:cancel` API key scope.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      runId: {
        type: "string",
        description: "The ID of the test run.",
      },
    },
    required: ["workflowId", "runId"],
  },
  request: {
    method: "POST",
    path: "/workflows/{workflowId}/test-runs/{runId}/cancel",
  },
});
