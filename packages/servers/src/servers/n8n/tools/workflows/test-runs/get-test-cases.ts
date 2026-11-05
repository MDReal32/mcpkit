import { defineTool } from "@usemcpkit/core";

export const workflowsTestRunsGetTestCases = defineTool({
  name: "workflows:test_runs:get_test_cases",
  description: "Retrieve test run cases. Retrieve the per-case results of an evaluation test run.",
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
    },
    required: ["workflowId", "runId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}/test-runs/{runId}/test-cases",
    query: ["limit", "cursor"],
  },
});
