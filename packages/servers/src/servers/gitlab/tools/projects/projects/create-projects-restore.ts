import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsRestore = defineTool({
  name: "projects:projects:create_projects_restore",
  description: "Restore a project marked for deletion. Restores a specified project that was marked for deletion.",
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
    path: "/projects/{id}/restore",
  },
});
