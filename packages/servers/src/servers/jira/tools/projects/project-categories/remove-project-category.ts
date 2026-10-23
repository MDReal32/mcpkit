import { defineTool } from "@usemcpkit/core";

export const projectsProjectCategoriesRemoveProjectCategory = defineTool({
  name: "projects:project_categories:remove_project_category",
  description: "Delete project category. Deletes a project category.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project category to delete.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/projectCategory/{id}",
  },
});
