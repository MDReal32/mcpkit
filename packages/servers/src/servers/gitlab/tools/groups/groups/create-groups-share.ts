import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsShare = defineTool({
  name: "groups:groups:create_groups_share",
  description: "Add a group to a group. Adds a group to a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      group_id: {
        type: "integer",
        description: "ID of the group to invite.",
      },
      group_access: {
        type: "integer",
        description: "Access level to grant to the invited group. For a list of values, see roles.",
        enum: [5, 10, 15, 20, 25, 30, 40, 50],
      },
      expires_at: {
        type: "string",
        description: "Date when the share expires.",
      },
      member_role_id: {
        type: "integer",
        description:
          "ID of a custom role to assign to the invited group. If set, `group_access` must match the base role used to create the custom role.",
      },
    },
    required: ["id", "group_id", "group_access"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/share",
    body: ["group_id", "group_access", "expires_at", "member_role_id"],
  },
});
