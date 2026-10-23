import { defineTool } from "@usemcpkit/core";

export const groupsInvitationsUpdateGroupsInvitations = defineTool({
  name: "groups:invitations:update_groups_invitations",
  description: "Update an invitation to a group. Updates a pending invitation to a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      email: {
        type: "string",
        description: "Email address the invitation was previously sent to.",
      },
      access_level: {
        type: "integer",
        description: "Access level to grant to the invited user. For a list of values, see roles.",
        enum: [10, 15, 20, 25, 30, 40, 50],
      },
      expires_at: {
        type: "string",
        description: "Date when the invitation expires.",
      },
      member_role_id: {
        type: "integer",
        description: "ID of a member role to assign to the invited user. Ultimate only.",
      },
    },
    required: ["id", "email"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/invitations/{email}",
    body: ["access_level", "expires_at", "member_role_id"],
  },
});
