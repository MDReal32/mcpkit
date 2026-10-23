import { defineTool } from "@usemcpkit/core";

export const datacenterGroupGetMember2 = defineTool({
  name: "datacenter:group:get_member_2",
  description:
    "[Data Center] Get members of group. You need admin permissions to use this endpoint. Get a paginated collection of users in the given group.",
  input: {
    type: "object",
    properties: {
      groupName: {},
      expand: {
        type: "string",
      },
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
    path: "/rest/api/group/{groupName}/member",
    query: ["expand", "limit", "start"],
  },
});
