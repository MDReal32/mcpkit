import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroupsProjects = defineTool({
  name: "groups:groups:create_groups_projects",
  description: "Transfer a project to a group. Transfers a specified project to another group. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      project_id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id", "project_id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/projects/{project_id}",
  },
});
