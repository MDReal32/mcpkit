import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsUnarchive = defineTool({
  name: "projects:projects:create_projects_unarchive",
  description:
    "Unarchive a project. Unarchives a specified project. You must be an administrator or have the Owner role on the project.",
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
    path: "/projects/{id}/unarchive",
  },
});
