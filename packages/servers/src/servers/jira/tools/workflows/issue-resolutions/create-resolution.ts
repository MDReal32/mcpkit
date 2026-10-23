import { defineTool } from "@usemcpkit/core";

export const workflowsIssueResolutionsCreateResolution = defineTool({
  name: "workflows:issue_resolutions:create_resolution",
  description: "Create resolution. Creates an issue resolution.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the resolution.",
      },
      name: {
        type: "string",
        description: "The name of the resolution. Must be unique (case-insensitive).",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/resolution",
    body: ["description", "name"],
  },
});
