import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsUnstar = defineTool({
  name: "projects:projects:create_projects_unstar",
  description: "Unstar a project. Unstars a specified project.",
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
    path: "/projects/{id}/unstar",
  },
});
