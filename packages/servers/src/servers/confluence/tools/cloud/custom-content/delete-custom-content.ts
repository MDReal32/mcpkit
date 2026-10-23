import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentDeleteCustomContent = defineTool({
  name: "cloud:custom_content:delete_custom_content",
  description: "[Cloud] Delete custom content. Delete a custom content by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the custom content to be deleted.",
      },
      purge: {
        type: "boolean",
        description: "If attempting to purge the custom content.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/custom-content/{id}",
    query: ["purge"],
  },
});
