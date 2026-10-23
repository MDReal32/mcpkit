import { defineTool } from "@usemcpkit/core";

export const projectsFilesGetProjectsRepositoryFilesRaw = defineTool({
  name: "projects:files:get_projects_repository_files_raw",
  description:
    "Retrieve a raw file from a repository. Retrieves the raw file contents for a specified file in a repository.",
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
      lfs: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns the Git LFS file contents instead of the pointer. Ignored if the file isn't tracked by Git LFS.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "file_path", "save_to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/files/{file_path}/raw",
    query: ["ref", "lfs"],
    saveToArg: "save_to",
  },
});
