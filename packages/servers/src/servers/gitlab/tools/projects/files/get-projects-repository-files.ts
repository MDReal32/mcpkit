import { defineTool } from "@usemcpkit/core";

export const projectsFilesGetProjectsRepositoryFiles = defineTool({
  name: "projects:files:get_projects_repository_files",
  description:
    "Retrieve a file from a repository. Retrieves information about a specified file in a repository. This includes information like the name, size, and the file contents. File content is Base64 encoded.",
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
      ref: {
        type: "string",
        description: "Commit SHA or name of a repository branch or tag.",
      },
    },
    required: ["id", "file_path", "ref"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/files/{file_path}",
    query: ["ref"],
  },
});
