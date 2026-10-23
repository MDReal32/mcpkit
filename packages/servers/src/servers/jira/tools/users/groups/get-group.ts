import { defineTool } from "@usemcpkit/core";

export const usersGroupsGetGroup = defineTool({
  name: "users:groups:get_group",
  description: "[Deprecated] Get group. This operation is deprecated, use `group/member`.",
  input: {
    type: "object",
    properties: {
      groupname: {
        type: "string",
        description:
          "As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This parameter cannot be used with the `groupId` parameter.",
      },
      groupId: {
        type: "string",
        description: "The ID of the group. This parameter cannot be used with the `groupName` parameter.",
      },
      expand: {
        type: "string",
        description: "List of fields to expand.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/group",
    query: ["groupname", "groupId", "expand"],
  },
});
