import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProject = defineTool({
  name: "projects:projects:update_project",
  description: "Update a project. Update a project on your instance.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      name: {
        type: "string",
      },
      id: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["projectId", "name"],
  },
  request: {
    method: "PUT",
    path: "/projects/{projectId}",
    body: ["name", "id", "type"],
  },
});
