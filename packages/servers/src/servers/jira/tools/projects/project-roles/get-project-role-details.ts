import { defineTool } from "@usemcpkit/core";

export const projectsProjectRolesGetProjectRoleDetails = defineTool({
  name: "projects:project_roles:get_project_role_details",
  description:
    "Get project role details. Returns all project roles and the details for each role. Note that the list of project roles is common to all projects.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      currentMember: {
        type: "boolean",
        default: false,
        description: "Whether the roles should be filtered to include only those the user is assigned to.",
      },
      excludeConnectAddons: {
        type: "boolean",
        default: false,
      },
      excludeOtherServiceRoles: {
        type: "boolean",
        default: false,
        description:
          "Do not return the default JSM company-managed space from CSM spaces, or the default CSM roles from JSM spaces.",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/roledetails",
    query: ["currentMember", "excludeConnectAddons", "excludeOtherServiceRoles"],
  },
});
