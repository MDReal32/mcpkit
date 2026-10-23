import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsSearchWorkflows = defineTool({
  name: "workflows:workflows:search_workflows",
  description:
    "Search workflows. Returns a paginated list of global and project workflows. If workflow names are specified in the query string, details of those workflows are returned. Otherwise, all workflows are returned.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        description: "The maximum number of items to return per page.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      queryString: {
        type: "string",
        description: "String used to perform a case-insensitive partial match with workflow name.",
      },
      orderBy: {
        type: "string",
        description: "Order the results by a field:",
      },
      scope: {
        type: "string",
        description:
          "The scope of the workflow. Global for company-managed projects and Project for team-managed projects.",
      },
      isActive: {
        type: "boolean",
        description: "Filters active and inactive workflows.",
      },
      projectId: {
        type: "integer",
        description:
          "The ID of the project to filter the workflows by. Only workflows associated with the given project are returned.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflows/search",
    query: ["startAt", "maxResults", "expand", "queryString", "orderBy", "scope", "isActive", "projectId"],
  },
});
