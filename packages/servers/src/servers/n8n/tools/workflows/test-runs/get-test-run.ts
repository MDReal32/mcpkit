import { defineTool } from "@usemcpkit/core";

export const workflowsTestRunsGetTestRun = defineTool({
  name: "workflows:test_runs:get_test_run",
  description:
    "Retrieve a test run. Retrieve a single evaluation test run of a workflow, including its aggregated metrics and final result.",
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
    method: "GET",
    path: "/workflows/{workflowId}/test-runs/{runId}",
  },
});
