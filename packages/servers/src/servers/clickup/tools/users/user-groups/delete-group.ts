import { defineTool } from "@usemcpkit/core";

export const usersUserGroupsDeleteGroup = defineTool({
  name: "users:user_groups:delete_group",
  description:
    "Delete Group. This endpoint is used to remove a User Group from your Workspace.\\ \\ In our API documentation, `team_id` refers to the id of a Workspace, and `group_id` refers to the id of a user group.",
  input: {
    type: "object",
    properties: {
      group_id: {
        type: "string",
        description: "User Group ID",
      },
    },
    required: ["group_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/group/{group_id}",
  },
});
