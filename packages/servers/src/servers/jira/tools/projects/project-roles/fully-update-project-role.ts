import { defineTool } from "@usemcpkit/core";

export const projectsProjectRolesFullyUpdateProjectRole = defineTool({
  name: "projects:project_roles:fully_update_project_role",
  description:
    "Fully update project role. Updates the project role's name and description. You must include both a name and a description in the request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
      description: {
        type: "string",
        description:
          "A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role.",
      },
      name: {
        type: "string",
        description:
          "The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/role/{id}",
    body: ["description", "name"],
  },
});
