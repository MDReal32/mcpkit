import { defineTool } from "@usemcpkit/core";

export const datacenterGroupGetGroupancestor = defineTool({
  name: "datacenter:group:get_groupancestor",
  description:
    "[Data Center] Get group ancestor of a group. Get a collection of the specified group's direct parent groups and all its ancestors (i.e. the parents of its parents, and so on)",
  input: {
    type: "object",
    properties: {
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
    path: "/rest/api/group/groupancestor",
    query: ["groupName", "limit", "start"],
  },
});
