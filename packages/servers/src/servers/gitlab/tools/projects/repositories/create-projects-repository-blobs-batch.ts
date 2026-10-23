import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesCreateProjectsRepositoryBlobsBatch = defineTool({
  name: "projects:repositories:create_projects_repository_blobs_batch",
  description:
    "Get contents of multiple files in a single request. Each blob is truncated to the first 1 MB; the `truncated` field indicates when this happens.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      files: {
        type: "array",
        description: "Array of file objects to retrieve, up to a maximum of 20.",
        items: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Path of the file in the repository.",
            },
            ref: {
              type: "string",
              description: "Branch, tag, or commit to read the file from. Defaults to the default branch.",
            },
          },
          required: ["path"],
        },
      },
    },
    required: ["id", "files"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/repository/blobs/batch",
    body: ["files"],
  },
});
