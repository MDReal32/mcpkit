import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsGetProjectsSnippetsFilesRaw = defineTool({
  name: "projects:snippets:get_projects_snippets_files_raw",
  description:
    "Retrieve snippet repository file content. Retrieves the raw file content from a snippet repository as plain text.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      ref: {
        type: "string",
        description: "The name of branch, tag or commit",
      },
      file_path: {
        type: "string",
        description: "The URL-encoded path to the file, like lib%2Fclass%2Erb",
      },
      snippet_id: {
        type: "integer",
        description: "ID of the snippet.",
      },
    },
    required: ["id", "ref", "file_path", "snippet_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snippets/{snippet_id}/files/{ref}/{file_path}/raw",
  },
});
