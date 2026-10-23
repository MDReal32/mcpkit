import { defineTool } from "@usemcpkit/core";

export const projectsFilesDeleteProjectsRepositoryFiles = defineTool({
  name: "projects:files:delete_projects_repository_files",
  description:
    "Delete a file in a repository. Deletes a specified file in a repository. Use the Commits API to delete multiple files with a single request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      file_path: {
        type: "string",
        description: "URL-encoded full path to the file, for example `lib%2Fclass%2Erb`.",
      },
      branch: {
        type: "string",
        description:
          "Name of the branch to commit the deletion into. Combine with `start_branch` to create a new branch.",
      },
      commit_message: {
        type: "string",
        description: "Commit message.",
      },
      start_branch: {
        type: "string",
        description: "Name of the base branch to create the branch from.",
      },
      author_email: {
        type: "string",
        description: "Email address of the commit author.",
      },
      author_name: {
        type: "string",
        description: "Name of the commit author.",
      },
      last_commit_id: {
        type: "string",
        description: "Last known file commit ID.",
      },
    },
    required: ["id", "file_path", "branch", "commit_message"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/repository/files/{file_path}",
    query: ["branch", "commit_message", "start_branch", "author_email", "author_name", "last_commit_id"],
  },
});
