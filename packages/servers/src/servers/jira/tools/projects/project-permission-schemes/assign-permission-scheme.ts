import { defineTool } from "@usemcpkit/core";

export const projectsProjectPermissionSchemesAssignPermissionScheme = defineTool({
  name: "projects:project_permission_schemes:assign_permission_scheme",
  description:
    "Assign permission scheme. Assigns a permission scheme with a project. See Managing project permissions for more information about permission schemes.",
  input: {
    type: "object",
    properties: {
      projectKeyOrId: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:",
      },
      id: {
        type: "integer",
        description:
          "The ID of the permission scheme to associate with the project. Use the Get all permission schemes resource to get a list of permission scheme IDs.",
      },
    },
    required: ["projectKeyOrId", "id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project/{projectKeyOrId}/permissionscheme",
    query: ["expand"],
    body: ["id"],
  },
});
