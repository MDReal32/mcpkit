import { defineTool } from "@usemcpkit/core";

export const projectsProjectRolesGetProjectRoles = defineTool({
  name: "projects:project_roles:get_project_roles",
  description:
    "Get project roles for project. Returns a list of project roles for the project returning the name and self URL for each role.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/role",
  },
});
