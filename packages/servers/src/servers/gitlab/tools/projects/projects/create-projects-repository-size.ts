import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsRepositorySize = defineTool({
  name: "projects:projects:create_projects_repository_size",
  description: "Start a task to recalculate repository size for a project. This feature was introduced in GitLab 15.0.",
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
    method: "POST",
    path: "/projects/{id}/repository_size",
  },
});
