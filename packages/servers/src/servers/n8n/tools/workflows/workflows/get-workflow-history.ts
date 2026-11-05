import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowHistory = defineTool({
  name: "workflows:workflows:get_workflow_history",
  description:
    "Retrieve workflow version history. Returns a paginated list of workflow versions (version IDs and metadata) for a workflow.",
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
    },
    required: ["workflowId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}/history",
    query: ["limit", "cursor"],
  },
});
