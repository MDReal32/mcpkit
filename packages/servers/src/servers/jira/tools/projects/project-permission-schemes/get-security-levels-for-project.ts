import { defineTool } from "@usemcpkit/core";

export const projectsProjectPermissionSchemesGetSecurityLevelsForProject = defineTool({
  name: "projects:project_permission_schemes:get_security_levels_for_project",
  description:
    "Get project issue security levels. Returns all issue security levels for the project that the user has access to.",
  input: {
    type: "object",
    properties: {
      projectKeyOrId: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
    },
    required: ["projectKeyOrId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectKeyOrId}/securitylevel",
  },
});
