import { defineTool } from "@usemcpkit/core";

export const projectsCommitsCreateProjectsRepositoryCommits = defineTool({
  name: "projects:commits:create_projects_repository_commits",
  description: "Create a commit. This feature was introduced in GitLab 8.13",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/repository/commits",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
