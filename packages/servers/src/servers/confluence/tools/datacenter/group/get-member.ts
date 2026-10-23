import { defineTool } from "@usemcpkit/core";

export const datacenterGroupGetMember = defineTool({
  name: "datacenter:group:get_member",
  description:
    "[Data Center] Get members of group. You need admin permissions to use this endpoint. Get a paginated collection of users in the given group.",
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
    path: "/rest/api/group/member",
    query: ["expand", "groupName", "limit", "start"],
  },
});
