import { defineTool } from "@usemcpkit/core";

export const projectsProjectCategoriesCreateProjectCategory = defineTool({
  name: "projects:project_categories:create_project_category",
  description: "Create project category. Creates a project category.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the project category.",
      },
      id: {
        type: "string",
        description: "The ID of the project category.",
      },
      name: {
        type: "string",
        description: "The name of the project category. Required on create, optional on update.",
      },
      self: {
        type: "string",
        description: "The URL of the project category.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/projectCategory",
    body: ["description", "id", "name", "self"],
  },
});
