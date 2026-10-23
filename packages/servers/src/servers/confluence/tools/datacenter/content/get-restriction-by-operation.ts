import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetRestrictionByOperation = defineTool({
  name: "datacenter:content:get_restriction_by_operation",
  description: "[Data Center] Get all restrictions by Operation. Returns info about all restrictions by operation.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      expand: {
        type: "string",
        description: "A comma separated list of properties to expand on the content properties. Default value: group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/restriction/byOperation",
    query: ["expand"],
  },
});
