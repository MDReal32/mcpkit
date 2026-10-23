import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetProjectUsagesForWorkflowScheme = defineTool({
  name: "workflows:workflow_schemes:get_project_usages_for_workflow_scheme",
  description:
    "Get projects which are using a given workflow scheme. Returns a page of projects using a given workflow scheme.",
  input: {
    type: "object",
    properties: {
      workflowSchemeId: {
        type: "string",
        description: "The workflow scheme ID",
      },
      nextPageToken: {
        type: "string",
        description: "The cursor for pagination",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of results to return. Must be an integer between 1 and 200.",
      },
    },
    required: ["workflowSchemeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme/{workflowSchemeId}/projectUsages",
    query: ["nextPageToken", "maxResults"],
  },
});
