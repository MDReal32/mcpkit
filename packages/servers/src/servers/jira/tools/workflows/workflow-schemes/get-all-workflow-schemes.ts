import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetAllWorkflowSchemes = defineTool({
  name: "workflows:workflow_schemes:get_all_workflow_schemes",
  description:
    "Get all workflow schemes. Returns a paginated list of all workflow schemes, not including draft workflow schemes.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme",
    query: ["startAt", "maxResults"],
  },
});
