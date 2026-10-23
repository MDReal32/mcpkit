import { defineTool } from "@usemcpkit/core";

export const projectsProjectAliasDeleteProjectAliases = defineTool({
  name: "projects:project_alias:delete_project_aliases",
  description: "Delete a project alias. Deletes a specified project alias. Administrators only.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the alias. Must be unique.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "DELETE",
    path: "/project_aliases/{name}",
  },
});
