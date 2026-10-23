import { defineTool } from "@usemcpkit/core";

export const cloudEmbedsGetSmartLinkOperations = defineTool({
  name: "cloud:embeds:get_smart_link_operations",
  description:
    "[Cloud] Get permitted operations for a Smart Link in the content tree. Returns the permitted operations on specific Smart Link in the content tree.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the Smart Link in the content tree for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/embeds/{id}/operations",
  },
});
