import { defineTool } from "@usemcpkit/core";

export const ciSecureFilesGetProjectsSecureFilesDownload = defineTool({
  name: "ci:secure_files:get_projects_secure_files_download",
  description: "Download a secure file. Downloads the contents of a specified secure file in a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      secure_file_id: {
        type: "integer",
        description: "ID of the secure file.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["id", "secure_file_id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/secure_files/{secure_file_id}/download",
    saveToArg: "save_to",
  },
});
