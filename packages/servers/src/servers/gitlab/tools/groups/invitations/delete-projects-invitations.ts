import { defineTool } from "@usemcpkit/core";

export const groupsInvitationsDeleteProjectsInvitations = defineTool({
  name: "groups:invitations:delete_projects_invitations",
  description:
    "Delete an invitation to a project. Deletes a pending invitation to a specified email address for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    path: "/projects/{id}/invitations/{email}",
  },
});
