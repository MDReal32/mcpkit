import { defineTool } from "@usemcpkit/core";

export const projectsProjectsDeleteProject = defineTool({
  name: "projects:projects:delete_project",
  description: "Delete a project. Delete a project from your instance.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{projectId}",
  },
});
