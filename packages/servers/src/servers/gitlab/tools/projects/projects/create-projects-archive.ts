import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsArchive = defineTool({
  name: "projects:projects:create_projects_archive",
  description:
    "Archive a project. Archives a specified project. You must be an administrator or be assigned the Owner role on the project.",
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
    path: "/projects/{id}/archive",
  },
});
