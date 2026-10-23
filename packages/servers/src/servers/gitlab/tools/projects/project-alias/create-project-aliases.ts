import { defineTool } from "@usemcpkit/core";

export const projectsProjectAliasCreateProjectAliases = defineTool({
  name: "projects:project_alias:create_project_aliases",
  description: "Create a project alias. Creates a project alias.",
  input: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the alias. Must be unique.",
      },
    },
    required: ["project_id", "name"],
  },
  request: {
    method: "POST",
    path: "/project_aliases",
    body: ["project_id", "name"],
  },
});
