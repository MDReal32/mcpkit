import { defineTool } from "@usemcpkit/core";

export const workflowsIssueResolutionsSetDefaultResolution = defineTool({
  name: "workflows:issue_resolutions:set_default_resolution",
  description: "Set default resolution. Sets default issue resolution.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default resolution setting.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/resolution/default",
    body: ["id"],
  },
});
