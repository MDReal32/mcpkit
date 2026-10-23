import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetChildByType = defineTool({
  name: "datacenter:content:get_child_by_type",
  description:
    '[Data Center] Get children of content by type. Returns the direct children of a piece of Content, limited to a single child type.The types of the children returned is specified by the "type" path parameter in the request.',
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      type: {
        type: "string",
        description: "a content type to filter children on.",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the children",
      },
      limit: {
        type: "integer",
        description: "how many items should be returned after the start index",
      },
      start: {
        type: "integer",
        description: "the index of the first item within the result set that should be returned",
      },
      parentVersion: {
        type: "integer",
      },
    },
    required: ["id", "type"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/child/{type}",
    query: ["expand", "limit", "start", "parentVersion"],
  },
});
