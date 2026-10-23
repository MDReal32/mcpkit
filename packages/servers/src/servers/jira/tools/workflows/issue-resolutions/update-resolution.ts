import { defineTool } from "@usemcpkit/core";

export const workflowsIssueResolutionsUpdateResolution = defineTool({
  name: "workflows:issue_resolutions:update_resolution",
  description: "Update resolution. Updates an issue resolution.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue resolution.",
      },
      description: {
        type: "string",
        description: "The description of the resolution.",
      },
      name: {
        type: "string",
        description: "The name of the resolution. Must be unique.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/resolution/{id}",
    body: ["description", "name"],
  },
});
