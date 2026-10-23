import { defineTool } from "@usemcpkit/core";

export const projectsGitlabPagesDeleteProjectsPages = defineTool({
  name: "projects:gitlab_pages:delete_projects_pages",
  description:
    "Unpublish Pages. Unpublishes Pages from a specified project. You must have the Maintainer or Owner role for the project.",
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
    path: "/projects/{id}/pages",
  },
});
