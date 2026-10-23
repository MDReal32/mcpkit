import { defineTool } from "@usemcpkit/core";

export const datacenterUserUpdateGroup = defineTool({
  name: "datacenter:user:update_group",
  description:
    "[Data Center] Update user group. Add the given User identified by username to the given Group identified by groupName.",
  input: {
    type: "object",
    properties: {
      groupName: {
        type: "string",
        description: "The group name identifying the given group.",
      },
      username: {
        type: "string",
        description: "The username identifying the given user.",
      },
    },
    required: ["groupName", "username"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/user/{username}/group/{groupName}",
  },
});
