import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowsPaginated = defineTool({
  name: "workflows:workflows:get_workflows_paginated",
  description:
    "[Deprecated] Get workflows paginated. This will be removed on June 1, 2026; use Search workflows instead.",
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
      workflowName: {
        type: "string",
        description:
          "The name of a workflow to return. To include multiple workflows, provide an ampersand-separated list. For example, `workflowName=name1&workflowName=name2`. (comma-separated)",
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
        enum: ["name", "-name", "+name", "created", "-created", "+created", "updated", "+updated", "-updated"],
        description: "Order the results by a field:",
      },
      isActive: {
        type: "boolean",
        description: "Filters active and inactive workflows.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflow/search",
    query: ["startAt", "maxResults", "workflowName", "expand", "queryString", "orderBy", "isActive"],
  },
});
