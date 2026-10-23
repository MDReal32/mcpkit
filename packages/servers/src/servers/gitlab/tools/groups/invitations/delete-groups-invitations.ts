import { defineTool } from "@usemcpkit/core";

export const groupsInvitationsDeleteGroupsInvitations = defineTool({
  name: "groups:invitations:delete_groups_invitations",
  description:
    "Delete an invitation to a group. Deletes a pending invitation to a specified email address for a group.",
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
    },
    required: ["id", "email"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/invitations/{email}",
  },
});
