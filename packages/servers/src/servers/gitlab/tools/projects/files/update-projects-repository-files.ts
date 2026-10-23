import { defineTool } from "@usemcpkit/core";

export const projectsFilesUpdateProjectsRepositoryFiles = defineTool({
  name: "projects:files:update_projects_repository_files",
  description:
    "Update a file in a repository. Updates a specified file in a repository. Use the Commits API to update multiple files with a single request.",
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
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "file_path", "file"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/repository/files/{file_path}",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
