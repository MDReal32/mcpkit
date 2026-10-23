import { defineTool } from "@usemcpkit/core";

export const projectsProjectRolesGetProjectRole = defineTool({
  name: "projects:project_roles:get_project_role",
  description:
    "Get project role for project. Returns a project role's details and actors associated with the project. The list of actors is sorted by display name.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
      excludeInactiveUsers: {
        type: "boolean",
        default: false,
        description: "Exclude inactive users.",
      },
    },
    required: ["projectIdOrKey", "id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/role/{id}",
    query: ["excludeInactiveUsers"],
  },
});
