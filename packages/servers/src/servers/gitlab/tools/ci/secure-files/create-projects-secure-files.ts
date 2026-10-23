import { defineTool } from "@usemcpkit/core";

export const ciSecureFilesCreateProjectsSecureFiles = defineTool({
  name: "ci:secure_files:create_projects_secure_files",
  description: "Create a secure file. Creates a secure file in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "The name of the file being uploaded. The filename must be unique within the project",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "name", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/secure_files",
    body: ["name", "file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
