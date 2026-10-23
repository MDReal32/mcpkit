import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentGetCustomContentOperations = defineTool({
  name: "cloud:custom_content:get_custom_content_operations",
  description:
    "[Cloud] Get permitted operations for custom content. Returns the permitted operations on specific custom content.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the custom content for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/custom-content/{id}/operations",
  },
});
