import { defineTool } from "@usemcpkit/core";

export const cloudSpacesGetSpaceOperations = defineTool({
  name: "cloud:spaces:get_space_operations",
  description: "[Cloud] Get permitted operations for space. Returns the permitted operations on specific space.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/spaces/{id}/operations",
  },
});
