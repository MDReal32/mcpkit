import { defineTool } from "@usemcpkit/core";

export const datacenterGroupGetGroupparent = defineTool({
  name: "datacenter:group:get_groupparent",
  description:
    "[Data Center] Get group parents of a group. Get a collection of the given group's immediate parent groups",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
      },
      groupName: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      start: {
        type: "integer",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/group/groupparent",
    query: ["expand", "groupName", "limit", "start"],
  },
});
