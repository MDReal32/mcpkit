import { defineTool } from "@usemcpkit/core";

export const projectsProjectsDeleteProjects = defineTool({
  name: "projects:projects:delete_projects",
  description: "Delete a project. Deletes a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}",
  },
});
