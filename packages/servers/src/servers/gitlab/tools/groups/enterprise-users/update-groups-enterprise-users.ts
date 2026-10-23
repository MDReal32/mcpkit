import { defineTool } from "@usemcpkit/core";

export const groupsEnterpriseUsersUpdateGroupsEnterpriseUsers = defineTool({
  name: "groups:enterprise_users:update_groups_enterprise_users",
  description: "Update an enterprise user. Updates a specified enterprise user.",
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
      name: {
        type: "string",
        description: "Name of the user account.",
      },
      email: {
        type: "string",
        description: "Email address of the user account. Must be from a verified group domain.",
      },
      projects_limit: {
        type: "integer",
        description: "Maximum number of projects the user can create.",
      },
      can_create_group: {
        type: "boolean",
        description: "If `true`, the user can create groups.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "PATCH",
    path: "/groups/{id}/enterprise_users/{user_id}",
    body: ["name", "email", "projects_limit", "can_create_group"],
  },
});
