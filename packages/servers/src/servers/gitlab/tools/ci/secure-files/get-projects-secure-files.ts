import { defineTool } from "@usemcpkit/core";

export const ciSecureFilesGetProjectsSecureFiles = defineTool({
  name: "ci:secure_files:get_projects_secure_files",
  description: "Retrieve details of a secure file. Retrieves details of a specified secure file in a project.",
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
    method: "GET",
    path: "/projects/{id}/secure_files/{secure_file_id}",
  },
});
