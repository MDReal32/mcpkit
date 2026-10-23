import { defineTool } from "@usemcpkit/core";

export const projectsProjectRoleActorsGetProjectRoleActorsForRole = defineTool({
  name: "projects:project_role_actors:get_project_role_actors_for_role",
  description: "Get default actors for project role. Returns the default actors for the project role.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/role/{id}/actors",
  },
});
