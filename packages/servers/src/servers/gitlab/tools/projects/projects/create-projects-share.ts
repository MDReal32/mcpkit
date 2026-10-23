import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsShare = defineTool({
  name: "projects:projects:create_projects_share",
  description: "Share a project with a group. Shares a specified project with a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      group_id: {
        type: "integer",
        description: "ID of the group to share the project with.",
      },
      group_access: {
        type: "integer",
        description: "Access level to grant to the invited group. For a list of values, see roles.",
        enum: [10, 15, 20, 25, 30, 40, 50],
      },
      expires_at: {
        type: "string",
        description: "Date when the share expires.",
      },
      member_role_id: {
        type: "integer",
        description: "ID of the member role to assign to the group.",
      },
    },
    required: ["id", "group_id", "group_access"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/share",
    body: ["group_id", "group_access", "expires_at", "member_role_id"],
  },
});
