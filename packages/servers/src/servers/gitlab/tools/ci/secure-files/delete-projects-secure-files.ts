import { defineTool } from "@usemcpkit/core";

export const ciSecureFilesDeleteProjectsSecureFiles = defineTool({
  name: "ci:secure_files:delete_projects_secure_files",
  description: "Delete a secure file. Deletes a specified secure file from a project.",
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
    },
    required: ["id", "secure_file_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/secure_files/{secure_file_id}",
  },
});
