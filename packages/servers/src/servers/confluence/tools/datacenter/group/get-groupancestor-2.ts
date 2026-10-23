import { defineTool } from "@usemcpkit/core";

export const datacenterGroupGetGroupancestor2 = defineTool({
  name: "datacenter:group:get_groupancestor_2",
  description:
    "[Data Center] Get group ancestor of a group. Get a collection of the specified group's direct parent groups and all its ancestors (i.e. the parents of its parents, and so on)",
  input: {
    type: "object",
    properties: {
      groupName: {},
      limit: {
        type: "integer",
      },
      start: {
        type: "integer",
      },
    },
    required: ["groupName"],
  },
  request: {
    method: "GET",
    path: "/rest/api/group/{groupName}/groupancestor",
    query: ["limit", "start"],
  },
});
