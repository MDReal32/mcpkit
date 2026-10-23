import { defineTool } from "@usemcpkit/core";

export const projectsProjectPermissionSchemesGetProjectIssueSecurityScheme = defineTool({
  name: "projects:project_permission_schemes:get_project_issue_security_scheme",
  description: "Get project issue security scheme. Returns the issue security scheme associated with the project.",
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
    path: "/rest/api/2/project/{projectKeyOrId}/issuesecuritylevelscheme",
  },
});
