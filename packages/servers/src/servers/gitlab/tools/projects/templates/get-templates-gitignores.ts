import { defineTool } from "@usemcpkit/core";

export const projectsTemplatesGetTemplatesGitignores = defineTool({
  name: "projects:templates:get_templates_gitignores",
  description: "Retrieve a .gitignore template. Retrieves a specified .gitignore template.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the .gitignore template",
      },
    },
    required: ["name"],
  },
  request: {
    method: "GET",
    path: "/templates/gitignores/{name}",
  },
});
