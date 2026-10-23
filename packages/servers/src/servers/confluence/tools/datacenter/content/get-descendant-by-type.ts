import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetDescendantByType = defineTool({
  name: "datacenter:content:get_descendant_by_type",
  description:
    "[Data Center] Get descendants of type. Returns the direct descendants of a piece of Content. The ContentType(s) of the descendants returned is specified by the `type` path parameter in the request. Currently the only supported descendants are comment descendants of non-comment Content.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      type: {
        type: "string",
        description: "content type to filter descendants on.",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the descendants.",
      },
      limit: {
        type: "integer",
        description: "(optional, default: site limit) how many items should be returned after the start index.",
      },
      start: {
        type: "integer",
        description:
          "(optional, default: 0) the index of the first item within the result set that should be returned.",
      },
    },
    required: ["id", "type"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/descendant/{type}",
    query: ["expand", "limit", "start"],
  },
});
