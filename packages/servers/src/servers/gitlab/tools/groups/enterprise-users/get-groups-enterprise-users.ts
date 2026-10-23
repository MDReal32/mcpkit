import { defineTool } from "@usemcpkit/core";

export const groupsEnterpriseUsersGetGroupsEnterpriseUsers = defineTool({
  name: "groups:enterprise_users:get_groups_enterprise_users",
  description: "Retrieve an enterprise user. Retrieves a specified enterprise user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/enterprise_users/{user_id}",
  },
});
