import { defineTool } from "@usemcpkit/core";

export const workflowsIssueResolutionsDeleteResolution = defineTool({
  name: "workflows:issue_resolutions:delete_resolution",
  description: "Delete resolution. Deletes an issue resolution.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue resolution.",
      },
      replaceWith: {
        type: "string",
        default: "",
        description: "The ID of the issue resolution that will replace the currently selected resolution.",
      },
    },
    required: ["id", "replaceWith"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/resolution/{id}",
    query: ["replaceWith"],
  },
});
