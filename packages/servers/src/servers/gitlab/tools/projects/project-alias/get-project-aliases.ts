import { defineTool } from "@usemcpkit/core";

export const projectsProjectAliasGetProjectAliases = defineTool({
  name: "projects:project_alias:get_project_aliases",
  description: "Retrieve a project alias. Retrieves details of a specified project alias.",
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
    method: "GET",
    path: "/project_aliases/{name}",
  },
});
