import { defineTool } from "@usemcpkit/core";

export const projectsProjectsDeleteProjectsFork = defineTool({
  name: "projects:projects:delete_projects_fork",
  description: "Delete a fork relationship. Deletes a fork relationship between projects.",
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
    path: "/projects/{id}/fork",
  },
});
