import { defineTool } from "@usemcpkit/core";

export const projectsProjectCategoriesGetProjectCategoryById = defineTool({
  name: "projects:project_categories:get_project_category_by_id",
  description: "Get project category by ID. Returns a project category.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the project category.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/projectCategory/{id}",
  },
});
