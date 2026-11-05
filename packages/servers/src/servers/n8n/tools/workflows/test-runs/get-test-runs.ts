import { defineTool } from "@usemcpkit/core";

export const workflowsTestRunsGetTestRuns = defineTool({
  name: "workflows:test_runs:get_test_runs",
  description: "Retrieve test runs. Retrieve the evaluation test runs of a workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
      status: {
        type: "string",
        description: "Status to filter the test runs by.",
        enum: ["new", "running", "completed", "error", "cancelled"],
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}/test-runs",
    query: ["limit", "cursor", "status"],
  },
});
